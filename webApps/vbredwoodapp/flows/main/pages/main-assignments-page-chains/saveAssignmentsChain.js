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

  class saveAssignmentsChain extends ActionChain {

    /**
     * Saves Assignments record data
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.assignmentsId 
     */
    async run(context, { assignmentsId }) {
      const { $page, $flow, $application } = context;

      // Updates form status to Saving.
      $page.variables.assignmentsEditFormStatus = 'saving';
      // Initiates REST call saving Assignments data
      const callRestUpdateAssignmentsResult = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_Assignments',
        body: {
          critical: $page.variables.assignments.critical,
        },
        headers: $page.variables.assignmentsETag ? { 'If-Match': $page.variables.assignmentsETag } : null,
        requestType: 'json',
        uriParams: {
          'Assignments_Id': assignmentsId,
        },
      }, { id: 'saveAssignments' });

      if (callRestUpdateAssignmentsResult.ok) {
        // Fires a notification event about successful save
        await Actions.fireNotificationEvent(context, {
          summary: 'Assignments saved',
          message: 'Assignments record successfully updated',
          displayMode: 'transient',
          type: 'confirmation',
        }, { id: 'fireSuccessNotification' });

        // Calls action chain re-loading Assignments data
        await Actions.callChain(context, {
          chain: 'loadAssignmentsChain',
          params: {
            assignmentsId: $page.variables.job4Critical,
          },
        }, { id: 'callLoadAssignmentsChain' });
        // Updates form status to Ready.
        $page.variables.opendrawer = false;
      
        return;
      } else {
        // Create error message
        const errorMessage = callRestUpdateAssignmentsResult.body?.['o:errorDetails']?.[0]?.detail ||
                             `Could not edit Assignments: status ${callRestUpdateAssignmentsResult.status}`;
        // Fires a notification event about failed save
        await Actions.fireNotificationEvent(context, {
          summary: 'Save failed',
          message: errorMessage,
        });
      }
    }
  }

  return saveAssignmentsChain;
});
