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

  class navigateToEditSuccessionPlanningChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.successionPlanningId
     */
    async run(context, { successionPlanningId }) {
      const { $page, $flow, $application } = context;
      const navigateToPageMainEditSuccessionPlanningResult = await Actions.navigateToPage(context, {
        page: 'main-edit-succession-planning',
        params: {
          successionPlanningId: successionPlanningId,
        },
      });
    }
  }

  return navigateToEditSuccessionPlanningChain;
});
