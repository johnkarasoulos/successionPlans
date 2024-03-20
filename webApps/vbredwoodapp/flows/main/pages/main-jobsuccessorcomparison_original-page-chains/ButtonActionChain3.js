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

  class ButtonActionChain3 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;
      if ($page.variables.selectedCandidate4 === true) {
        $page.variables.selectButtonLabel4 = 'Select';
        $page.variables.selectedCandidate4 = false;

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.candidateEmployeeNbr4',
          ],
        });
      } else {
        $page.variables.selectedCandidate4 = true;
        $page.variables.selectButtonLabel4 = 'Remove';
      }
    }
  }

  return ButtonActionChain3;
});
