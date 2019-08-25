sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"../model/formatter"
], function (BaseController, JSONModel, History, formatter) {
	"use strict";

	return BaseController.extend("sap.ui.demo.worklist.controller.Object", {
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("funding").attachPatternMatched(this._onObjectMatched, this);

            
            var funding = new JSONModel();
            this.setModel(funding);
            
			
        },
        _onObjectMatched: function (oEvent) {

			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
            oView = this.getView();
            
            var oModel = this.getModel();

            var fModel = this.getModel("fundings");

            var uuid = oArgs.uuid;

            var fundings = fModel.getProperty('/funding_rounds');
                   
                    var funding = fundings.find(
                        item => 
                            item.uuid == uuid
                        
                    );
                    
                    oModel.setProperty("/short_name", funding.short_name);
                    oModel.setProperty("/date", funding.date);
                    oModel.setProperty("/valuation", funding.valuation);    

                    var investors = funding.investors.map(
                        item => (
                            {"name": item}
                        )
                    );
                   
                    oModel.setProperty("/investors", investors);
                    

                    var leadInvestors =  funding.lead_investor.map(
                        item => (
                            {"name": item}
                        )
                    );
                    
                    oModel.setProperty("/lead_investor", leadInvestors);


			
		}
	});

});