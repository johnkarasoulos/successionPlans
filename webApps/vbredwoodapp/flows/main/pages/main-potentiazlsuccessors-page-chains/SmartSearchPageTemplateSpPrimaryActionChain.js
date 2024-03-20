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

  class SmartSearchPageTemplateSpPrimaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.fireNotificationEvent(context, {
        message: "candidate1: "+ $page.variables.candidate1 + ", candidate2: "+ $page.variables.candidate2 + ", candidate3: "+ $page.variables.candidate3 + ", candidate4: "+ $page.variables.candidate4 + ", candidate5: "+ $page.variables.candidate5,
        summary: 'candidateIds',
        displayMode: 'transient',
        type: 'info',
      });

      const getJobDefinition = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_JobDefinition',
        uriParams: {
          'JobDefinition_Id': $page.variables.CurrentJob,
        },
      });

      const go2SuccessorComparaison = await Actions.navigateToPage(context, {
        page: 'main-jobsuccessorcomparison',
        params: {
          parentPage: $application.currentPage.id,
          jobID4Succession: $page.variables.currentJobID,
          rowIndex: $page.variables.currentJobID,
          candidateEmployeeNbr2: $page.variables.candidate2,
          candidateEmployeeNbr3: $page.variables.candidate3,
          candidateEmployeeNbr5: $page.variables.candidate5,
          candidateEmployeeNbr1: $page.variables.candidate1,
          candidateEmployeeNbr4: $page.variables.candidate4,
          IncumbentPersonNumber: $page.variables.IncumbentPersonNumber,
        },
      });
    }
  }

  return SmartSearchPageTemplateSpPrimaryActionChain;
});
