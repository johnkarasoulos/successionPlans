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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;
            if ($page.variables.selectedCandidate2 === true) {
        $page.variables.selectButtonLabel2 = 'Select';
        $page.variables.selectedCandidate2 = false;

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.candidateEmployeeNbr2',
          ],
        });
      } else {
        $page.variables.selectedCandidate2 = true;
         $page.variables.selectButtonLabel2 = 'Remove';
      }
    }
  }

  return ButtonActionChain1;
});
