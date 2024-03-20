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

  class loadJobDefinitionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.jobDefinitionId 
     */
    async run(context, { jobDefinitionId }) {
      const { $page, $flow, $application } = context;

      // Test valid input
      if (true && jobDefinitionId !== undefined) {
        // Clears JobDefinition data the variable holds
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.jobDefinition',
          ],
        }, { id: 'resetJobDefinitionData' });

        // Initiates REST call loading JobDefinition data
        const callRestResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_JobDefinition',
          responseType: 'getJobDefinitionResponse',
          uriParams: {
            'JobDefinition_Id': jobDefinitionId,
          },
        }, { id: 'loadJobDefinition' });

        if (!callRestResult.ok) {
          // Shows an error message informing about data load failure
          await Actions.fireNotificationEvent(context, {
            summary: 'Could not load data',
            message: `Could not load data: status ${callRestResult.status}`,
          }, { id: 'fireErrorNotification' });

          return;
        }

        // Assigns data loaded by the REST call to the JobDefinition variable
        $page.variables.jobDefinition = callRestResult.body;
      }
    }
  }

  return loadJobDefinitionChain;
});
