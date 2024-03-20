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

  class IconClickChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const go2SetUpSuccessionPlan = await Actions.navigateToPage(context, {
        page: 'main-setupsuccessionplan',
      });
    }
  }

  return IconClickChain;
});
