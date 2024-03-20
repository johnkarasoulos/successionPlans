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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.selectedCandidate1 === true) {
        $page.variables.selectButtonLabel1 = 'Select';
        $page.variables.selectedCandidate1 = false;

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.candidateEmployeeNbr1',
          ],
        });
      } else {
        $page.variables.selectedCandidate1 = true;
         $page.variables.selectButtonLabel1 = 'Remove';
      }

    }
  }

  return ButtonActionChain;
});
