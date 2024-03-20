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

  class SmartSearchPageTemplateSpSecondaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.actionId 
     */
    async run(context, { actionId }) {
      const { $page, $flow, $application } = context;

      const criticalJob = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_Assignments',
        uriParams: {
          'Assignments_Id': actionId,
        },
      });
    }
  }

  return SmartSearchPageTemplateSpSecondaryActionChain;
});
