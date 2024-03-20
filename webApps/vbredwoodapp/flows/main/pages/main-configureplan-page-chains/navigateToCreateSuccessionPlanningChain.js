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

  class navigateToCreateSuccessionPlanningChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;
      const navigateToPageMainCreateSuccessionPlanningResult = await Actions.navigateToPage(context, {
        page: 'main-create-succession-planning',
        params: {},
      });
    }
  }

  return navigateToCreateSuccessionPlanningChain;
});
