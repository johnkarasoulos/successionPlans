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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.PlanCandidatePerson1  !== null) {

        const getSuccessor1 = await Actions.callRest(context, {
          endpoint: 'businessObjects/get_candidatesForSuccessors',
          uriParams: {
            'candidatesForSuccessors_Id': $page.variables.PlanCandidatePerson1,
          },
        });

        if (getSuccessor1.ok) {
        
          $page.variables.IncumbentPersonNumber = getSuccessor1.body.eMPLOYEENUMBER;

          const getIncubentName = await Actions.callRest(context, {
            endpoint: 'businessObjects/get_WorkersInfo2',
            uriParams: {
              'WorkersInfo2_Id': $page.variables.IncumbentPersonNumber,
            },
          });
          $page.variables.IncumbentFullName = getIncubentName.body.eMPNAME;

          const getCandidate1 = await Actions.callRest(context, {
            endpoint: 'businessObjects/get_candidatesForSuccessors',
            uriParams: {
              'candidatesForSuccessors_Id': $page.variables.PlanCandidatePerson1,
            },
          });

          const getCandidate2 = await Actions.callRest(context, {
            endpoint: 'businessObjects/get_candidatesForSuccessors',
            uriParams: {
              'candidatesForSuccessors_Id': $page.variables.PlanCandidatePerson2,
            },
          });

          const getCandidate3 = await Actions.callRest(context, {
            endpoint: 'businessObjects/get_candidatesForSuccessors',
            uriParams: {
              'candidatesForSuccessors_Id': $page.variables.PlanCandidatePerson3,
            },
          });

          const getCandidate4 = await Actions.callRest(context, {
            endpoint: 'businessObjects/get_candidatesForSuccessors',
            uriParams: {
              'candidatesForSuccessors_Id': $page.variables.PlanCandidatePerson4,
            },
          });

          if (getCandidate1.ok) {
            $page.variables.PlanCandidatePerson1 = getCandidate1.body.eMPLOYEENUMBER;
          }

          if (getCandidate2.ok) {
            $page.variables.PlanCandidatePerson2 = getCandidate2.body.eMPLOYEENUMBER;
          }

          if (getCandidate3.ok) {
            $page.variables.PlanCandidatePerson3 = getCandidate3.body.eMPLOYEENUMBER;
          }

          if (getCandidate4.ok) {
            $page.variables.PlanCandidatePerson4 = getCandidate4.body.eMPLOYEENUMBER;
          }

          return;
        }
      }

    }
  }

  return PageVbEnterChain;
});
