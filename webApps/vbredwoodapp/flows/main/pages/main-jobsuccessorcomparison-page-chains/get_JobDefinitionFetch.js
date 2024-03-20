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

  class get_JobDefinitionFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_JobDefinition',
        uriParams: {
          'JobDefinition_Id': $page.variables.rowIndex,
        },
        responseType: 'get_AllJobDetails',
        requestTransformOptions: {
          filter: {
            op: '$co',
            attribute: 'uniqueJobID',
            value: $page.variables.rowIndex,
          },
        },
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return get_JobDefinitionFetch;
});
