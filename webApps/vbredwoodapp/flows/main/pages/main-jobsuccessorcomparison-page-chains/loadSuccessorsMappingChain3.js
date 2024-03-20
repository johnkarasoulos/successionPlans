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

  class loadSuccessorsMappingChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.successorsMappingId 
     */
    async run(context, { successorsMappingId }) {
      const { $page, $flow, $application } = context;

      // Test valid input
      if (true && successorsMappingId !== undefined) {
        // Clears successorsMapping data the variable holds
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.successorsMapping3',
          ],
        }, { id: 'resetSuccessorsMappingData' });

        // Initiates REST call loading successorsMapping data
        const callRestGetSuccessorsMappingResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_successorsMapping',
          responseType: 'getSuccessorsMappingResponse3',
          uriParams: {
            'successorsMapping_Id': successorsMappingId,
          },
        }, { id: 'loadSuccessorsMapping' });

        if (callRestGetSuccessorsMappingResult.ok) {
          // Assigns data loaded by the REST call to the successorsMapping variable
          $page.variables.successorsMapping3 = callRestGetSuccessorsMappingResult.body;
        } else {
          // Shows an error message informing about data load failure
          await Actions.fireNotificationEvent(context, {
            summary: 'Could not load data',
            message: `Could not load data: status ${callRestGetSuccessorsMappingResult.status}`,
          }, { id: 'fireErrorNotification' });
        }
      }
    }
  }

  return loadSuccessorsMappingChain3;
});
