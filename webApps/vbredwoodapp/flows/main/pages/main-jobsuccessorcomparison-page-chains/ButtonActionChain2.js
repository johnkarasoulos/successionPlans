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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;
      if ($page.variables.selectedCandidate3 === true) {
        $page.variables.selectButtonLabel3 = 'Select';
        $page.variables.selectedCandidate3 = false;

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.candidateEmployeeNbr3',
          ],
        });
      } else {
        $page.variables.selectedCandidate3 = true;
        $page.variables.selectButtonLabel3 = 'Remove';
      }
    }
  }

  return ButtonActionChain2;
});
