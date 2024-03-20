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

  class loadAssignmentsChain extends ActionChain {

    /**
     * Loads Assignments record data
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.assignmentsId 
     */
    async run(context, { assignmentsId }) {
      const { $page, $flow, $application } = context;

      // Updates form status to Loading.
      $page.variables.assignmentsEditFormStatus = 'loading';

      // Tests the REST call can be initiated
      if (true && assignmentsId !== undefined) {
        // Initiates REST call loading Assignments data
        const callRestGetAssignmentsResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_Assignments',
          responseType: 'getAssignmentsResponse',
          uriParams: {
            'Assignments_Id': assignmentsId,
          },
        }, { id: 'loadAssignments' });

        if (callRestGetAssignmentsResult.ok) {
          // Assigns data loaded by the REST call to the Assignments variable
          $page.variables.fetchedAssignments = callRestGetAssignmentsResult.body;

          // Assigns data loaded by the REST call to the Assignments variable
          $page.variables.assignmentsETag = callRestGetAssignmentsResult.headers.get('ETag');

          // Assigns data loaded by the REST call to the Assignments editable record variable
          $page.variables.assignments = $page.variables.fetchedAssignments;

          // Updates form status to Ready.
          $page.variables.assignmentsEditFormStatus = 'ready';
        } else {
          // Shows an error message informing about data load failure
          await Actions.fireNotificationEvent(context, {
            summary: 'Could not load data',
            message: 'Could not load data: status ' + callRestGetAssignmentsResult.status,
            displayMode: 'persist',
            type: 'error',
          }, { id: 'fireErrorNotification' });
        }
      }
    }
  }

  return loadAssignmentsChain;
});
