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

  class ojTable1617035741ChangeSelectionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.successionPlanningId
     */
    async run(context, { successionPlanningId }) {
      const { $page, $flow, $application } = context;
      $page.variables.oj_table_161703574_1SelectedId = successionPlanningId;
    }
  }

  return ojTable1617035741ChangeSelectionChain;
});
