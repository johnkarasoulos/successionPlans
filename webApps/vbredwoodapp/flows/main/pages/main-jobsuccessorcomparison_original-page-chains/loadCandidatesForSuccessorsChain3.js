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

  class loadCandidatesForSuccessorsChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.candidatesForSuccessorsId 
     */
    async run(context, { candidatesForSuccessorsId }) {
      const { $page, $flow, $application } = context;

      // Test valid input
      if (true && candidatesForSuccessorsId !== undefined) {
        // Clears candidatesForSuccessors data the variable holds
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.candidatesForSuccessors3',
          ],
        }, { id: 'resetCandidatesForSuccessorsData' });

        // Initiates REST call loading candidatesForSuccessors data
        const callRestResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_candidatesForSuccessors',
          responseType: 'getCandidatesForSuccessorsResponse3',
          uriParams: {
            'candidatesForSuccessors_Id': candidatesForSuccessorsId,
          },
        }, { id: 'loadCandidatesForSuccessors' });

        if (!callRestResult.ok) {
          // Shows an error message informing about data load failure
          await Actions.fireNotificationEvent(context, {
            summary: 'Could not load data',
            message: `Could not load data: status ${callRestResult.status}`,
          }, { id: 'fireErrorNotification' });

          return;
        }

        // Assigns data loaded by the REST call to the candidatesForSuccessors variable
        $page.variables.candidatesForSuccessors3 = callRestResult.body;
      }
    }
  }

  return loadCandidatesForSuccessorsChain3;
});
