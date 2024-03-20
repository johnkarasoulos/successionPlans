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

  class createSPPKGSPCREATEPLAN010000Chain extends ActionChain {

    /**
     * Saves changes and creates new SP_PKG/SP_CREATEPLAN|01.00.0000 record.
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      // Sets the progress variable to true
      $page.variables.createSPPKGSPCREATEPLAN010000ChainInProgress = true;

      try {
        // Validates SP_PKG/SP_CREATEPLAN|01.00.0000 form
        const validateFormResult = await Actions.callChain(context, {
          chain: 'flow:validateFormChain',
          params: {
            validationGroupId: 'sPPKGSPCREATEPLAN010000-validation-group--1354937896-1',
          },
        }, { id: 'validateSPPKGSPCREATEPLAN010000' });

        if (!validateFormResult) {
          return;
        }

        $page.variables.SuccessioPlan.IncumbentPersonNumber = $page.variables.IncumbentPersonNumber;
        $page.variables.SuccessioPlan.OwnerTypeCode = "Administrator";
        $page.variables.SuccessioPlan.planName = $page.variables.PlanName;
        $page.variables.SuccessioPlan.PlanOwnerPersonNumber = $page.variables.PlanOwnerPersonNumber;

        // Call REST creating new SP_PKG/SP_CREATEPLAN|01.00.0000 record
        const callRestResult = await Actions.callRest(context, {
          endpoint: 'createSuccessorPlan/postSP_CREATEPLAN1_0',
          body: $page.variables.SuccessioPlan,
        }, { id: 'saveSPPKGSPCREATEPLAN010000' });

        if (!callRestResult.ok) {
          // Create error message
          const errorMessage = `Could not create new SP_PKG/SP_CREATEPLAN|01.00.0000: status ${callRestResult.status}`;
          // Fires a notification event about failed save
          await Actions.fireNotificationEvent(context, {
              summary: 'Save failed',
              message: errorMessage,
          }, { id: 'fireErrorNotification' });

          return;
        } else {
          // Successful submission
          await Actions.fireNotificationEvent(context, {
            summary: 'Successful submission',
            message: callRestResult.body,
            displayMode: 'transient',
            type: 'confirmation',
          });
        }

        // Fires a notification event about successful save
        await Actions.fireNotificationEvent(context, {
          summary: 'SP_PKG/SP_CREATEPLAN|01.00.0000 saved',
          message: 'SP_PKG/SP_CREATEPLAN|01.00.0000 record successfully created',
          displayMode: 'transient',
          type: 'confirmation',
        }, { id: 'fireSuccessNotification' });

        // Resets sPPKGSPCREATEPLAN010000 variable to the default state
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.sPPKGSPCREATEPLAN010000',
          ],
        }, { id: 'resetSPPKGSPCREATEPLAN010000' });
      } finally {
        // Sets the progress variable to false
        $page.variables.createSPPKGSPCREATEPLAN010000ChainInProgress = false;
      }
    }
  }

  return createSPPKGSPCREATEPLAN010000Chain;
});
