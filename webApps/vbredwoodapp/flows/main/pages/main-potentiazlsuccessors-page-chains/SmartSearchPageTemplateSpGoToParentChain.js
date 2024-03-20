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

  class SmartSearchPageTemplateSpGoToParentChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const back2Main = await Actions.navigateToPage(context, {
        page: 'main-assignments',
      });
    }
  }

  return SmartSearchPageTemplateSpGoToParentChain;
});
