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

  class ListViewSelectedChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.keys 
     */
    async run(context, { keys }) {
      const { $page, $flow, $application } = context;

      await Actions.fireNotificationEvent(context, {
        summary: 'ListViewSelectedChangeChain1',
        message: keys[0],
        displayMode: 'transient',
        type: 'confirmation',
      });

      $page.variables.candidate1 = keys[0];
      $page.variables.candidate2 = keys[1];
      $page.variables.candidate3 = keys[2];
      $page.variables.candidate4 = keys[3];
      $page.variables.candidate5 = keys[4];
    }
  }

  return ListViewSelectedChangeChain1;
});
