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

  class InputTextValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      const callRestBusinessObjectsVersionRepresentationResult = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_WorkersInfo',
        uriParams: {
          'WorkersInfo_Id': value,
        },
      });

      if (callRestBusinessObjectsVersionRepresentationResult.ok) {
        $page.variables.IncumbentFullName = callRestBusinessObjectsVersionRepresentationResult.body.eMPNAME;
      
        return;
      }
    }
  }

  return InputTextValueChangeChain;
});
