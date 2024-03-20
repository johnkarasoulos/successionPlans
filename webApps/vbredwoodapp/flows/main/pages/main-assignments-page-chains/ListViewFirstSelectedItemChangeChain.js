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

  class ListViewFirstSelectedItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     * @param {string} params.Incumbent 
     * @param {any} params.incumbentNbr 
     */
    async run(context, { rowKey, rowData, Incumbent, incumbentNbr }) {
      const { $page, $flow, $application, $getAssignedEmployee } = context;

      $page.variables.Job4SuccessionPlan = rowKey;

      $page.variables.rowSelected = true;

      const getAssignedEmployee = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_Assignments',
        uriParams: {
          'Assignments_Id': rowKey,
        },
      });

      if (getAssignedEmployee.ok) {
        $page.variables.IncumbentPersonNumber = getAssignedEmployee.body.EMPLOYEENUMBER;
      
        return;
      }
    }
  }

  return ListViewFirstSelectedItemChangeChain;
});
