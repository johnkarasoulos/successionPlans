define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class goToSuccessorsSelection extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     * @param {any} params.jobIncumbentPersonNumber 
     */
    async run(context, { rowKey, rowData, jobIncumbentPersonNumber }) {
      const { $page, $flow, $application } = context;

      const assignmentJob = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_Assignments',
        uriParams: {
          'Assignments_Id': rowKey,
        },
      });

      if (assignmentJob.ok) {
        const go2PotentialSuccessors = await Actions.navigateToPage(context, {
          page: 'main-potentiazlsuccessors',
          params: {
            CurrentJob: assignmentJob.body.JobName,
            currentJobID: assignmentJob.body.JobID,
            IncumbentPersonNumber: jobIncumbentPersonNumber,
          },
        });
      
        return;
      } else {
        // Could not get assignment details
        await Actions.fireNotificationEvent(context, {
          summary: "Retrieve assignment details failed with error code:" + assignmentJob.bodyassignmentJob.body.code,
          message: 'assignmentJob.bodyassignmentJob.body.message',
        });
      }
    }
  }

  return goToSuccessorsSelection;
});
