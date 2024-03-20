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

  class createSuccessionPlanningChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      // Sets the progress variable to true
      $page.variables.createSuccessionPlanningChainInProgress = true;

      try {
        // Validates SuccessionPlanning form
        const validateFormResult = await Actions.callChain(context, {
          chain: 'flow:validateFormChain',
          params: {
            validationGroupId: 'validation-group',
          },
        }, { id: 'validateSuccessionPlanning' });

        if (!validateFormResult) {
          return;
        }

        const callRestResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_SuccessionPlanning',
          body: $page.variables.successionPlanning,
        }, { id: 'createSuccessionPlanning' });

        if (!callRestResult.ok) {
          // Create error message
          const errorMessage = callRestResult.body?.detail || callRestResult.body?.['o:errorDetails']?.[0]?.detail || `Could not create new SuccessionPlanning: status ${callRestResult.status}`;
          // Fires a notification event about failed save
          await Actions.fireNotificationEvent(context, {
              summary: 'Save failed',
              message: errorMessage,
          }, { id: 'fireErrorNotification' });

          return;
        }

        await Actions.fireNotificationEvent(context, {
          summary: 'SuccessionPlanning saved',
          message: 'SuccessionPlanning record successfully created',
          displayMode: 'transient',
          type: 'confirmation',
        }, { id: 'fireSuccessNotification' });

        await Actions.navigateBack(context, {}, { id: 'navigateBack' });
      } finally {
        // Sets the progress variable to false
        $page.variables.createSuccessionPlanningChainInProgress = false;
      }
    }
  }

  return createSuccessionPlanningChain;
});
