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

  class CheckboxSetValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      const updateCriticalFlag = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_Assignments',
        uriParams: {
          'Assignments_Id': $page.variables.job4Critical,
        },
        body: {
          critical: $page.variables.setCritical.critical,
        },
      });

      if (updateCriticalFlag.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Flag has been updated',
          displayMode: 'transient',
          type: 'confirmation',
        });
      
        return;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Error on changing critical Flag',
          message: updateCriticalFlag.body.message,
        });
      }
    }
  }

  return CheckboxSetValueChangeChain;
});
