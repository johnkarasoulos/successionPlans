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

  class loadSuccessionPlanningChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestResult = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_SuccessionPlanning',
        responseType: 'getSuccessionPlanningResponse',
        uriParams: {
          'SuccessionPlanning_Id': $page.variables.successionPlanningId,
        },
      }, { id: 'loadSuccessionPlanning' });

      if (!callRestResult.ok) {
        // Create error message
        const errorMessage = callRestResult.body?.detail || callRestResult.body?.['o:errorDetails']?.[0]?.detail || `Could not load data: status ${callRestResult.status}`;
        // Fires a notification event about failed load
        await Actions.fireNotificationEvent(context, {
          summary: 'Could not load data',
          message: errorMessage,
        }, { id: 'fireErrorNotification' });

        return;
      }

      $page.variables.fetchedSuccessionPlanning = callRestResult.body;
      $page.variables.successionPlanning = $page.variables.fetchedSuccessionPlanning;
      $page.variables.successionPlanningETag = callRestResult.headers.get('ETag');
    }
  }

  return loadSuccessionPlanningChain;
});
