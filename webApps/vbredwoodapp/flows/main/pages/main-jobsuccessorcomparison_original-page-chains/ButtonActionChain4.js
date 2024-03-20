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

  class ButtonActionChain4 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const go2ConfigureSuccessorPlan = await Actions.navigateToPage(context, {
        page: 'main-configureplan',
        params: {
          IncumbentPersonNumber: $page.variables.IncumbentPersonNumber,
          PlanCandidatePerson1: $page.variables.candidateEmployeeNbr1,
          PlanCandidatePerson2: $page.variables.candidateEmployeeNbr2,
          PlanCandidatePerson3: $page.variables.candidateEmployeeNbr3,
          PlanCandidatePerson4: $page.variables.candidateEmployeeNbr4,
        },
      });
    }
  }

  return ButtonActionChain4;
});
