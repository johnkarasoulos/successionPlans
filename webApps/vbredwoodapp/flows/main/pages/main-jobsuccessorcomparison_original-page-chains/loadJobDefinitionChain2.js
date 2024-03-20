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

  class loadJobDefinitionChain2 extends ActionChain {

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
            '$page.variables.jobDefinition2',
          ],
        }, { id: 'resetJobDefinitionData' });

        // Initiates REST call loading JobDefinition data
        const callRestResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_JobDefinition',
          responseType: 'getJobDefinitionResponse2',
          uriParams: {
            'JobDefinition_Id': $page.variables.rowIndex,
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
        $page.variables.jobDefinition2 = callRestResult.body;
      }
    }
  }

  return loadJobDefinitionChain2;
});
