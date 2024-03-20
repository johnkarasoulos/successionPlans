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

  class loadAssignementsInfoChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.assignementsInfoId 
     */
    async run(context, { assignementsInfoId }) {
      const { $page, $flow, $application } = context;

      // Test valid input
      if (true && assignementsInfoId !== undefined) {
        // Clears Assignements_info data the variable holds
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.assignementsInfo',
          ],
        }, { id: 'resetAssignementsInfoData' });

        // Initiates REST call loading Assignements_info data
        const callRestGetAssignementsInfoResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_Assignements_info',
          responseType: 'getAssignementsInfoResponse',
          uriParams: {
            'Assignements__info_Id': assignementsInfoId,
          },
        }, { id: 'loadAssignementsInfo' });

        if (callRestGetAssignementsInfoResult.ok) {
          // Assigns data loaded by the REST call to the Assignements_info variable
          $page.variables.assignementsInfo = callRestGetAssignementsInfoResult.body;
        } else {
          // Shows an error message informing about data load failure
          await Actions.fireNotificationEvent(context, {
            summary: 'Could not load data',
            message: `Could not load data: status ${callRestGetAssignementsInfoResult.status}`,
          }, { id: 'fireErrorNotification' });
        }
      }
    }
  }

  return loadAssignementsInfoChain;
});
