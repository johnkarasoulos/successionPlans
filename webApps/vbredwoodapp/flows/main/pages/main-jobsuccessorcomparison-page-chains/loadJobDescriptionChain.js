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

  class loadJobDescriptionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.jobDescriptionId 
     */
    async run(context, { jobDescriptionId }) {
      const { $page, $flow, $application } = context;

      // Test valid input
      if (true && jobDescriptionId !== undefined) {
        // Clears JobDescription data the variable holds
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.jobDescription',
          ],
        }, { id: 'resetJobDescriptionData' });

        // Initiates REST call loading JobDescription data
        const callRestGetJobDescriptionResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_JobDefinition',
          uriParams: {
            'JobDefinition_Id': jobDescriptionId,
          },
        }, { id: 'loadJobDescription' });

        if (callRestGetJobDescriptionResult.ok) {
          // Assigns data loaded by the REST call to the JobDescription variable
          $page.variables.jobDescription = callRestGetJobDescriptionResult.body;
        } else {
          // Shows an error message informing about data load failure
          await Actions.fireNotificationEvent(context, {
            summary: 'Could not load data',
            message: `Could not load data: status ${callRestGetJobDescriptionResult.status}`,
          }, { id: 'fireErrorNotification' });
        }
      }
    }
  }

  return loadJobDescriptionChain;
});
