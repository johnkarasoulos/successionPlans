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

  class ListViewSelectedChangeChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.keys 
     */
    async run(context, { keys }) {
      const { $page, $flow, $application } = context;

      await Actions.fireNotificationEvent(context, {
        summary: 'xListViewSelectedChangeChain3',
        message: keys[0],
      });
    }
  }

  return ListViewSelectedChangeChain3;
});
