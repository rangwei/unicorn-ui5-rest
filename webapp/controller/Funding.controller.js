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
            // alert(oRouter.oArgs.object);
            // alert(oRouter.oEvent.object);
			var oModel = new JSONModel();
            this.setModel(oModel);
            
            
            
			
        },
        _onObjectMatched: function (oEvent) {

			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			var oModel = this.getModel();

			var url = "http://49.234.230.70:3000/unicorns/" + oArgs.objectId;
	  
            var uuid = oArgs.uuid;
            
			$.ajax({
				url: url,
				type: "GET",
				contentType: "application/json",
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
                    oModel.setData(data);
                    
                    
                    

                    var fundings = oModel.getProperty('/funding_rounds');
                   
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
                    // var investorModel = new JSONModel();
                    oModel.setProperty("/investors", investors);
                    // oView.setModel(investorModel);

                    var leadInvestors =  funding.lead_investor.map(
                        item => (
                            {"name": item}
                        )
                    );
                    // var leadModel = new JSONModel();
                    oModel.setProperty("/lead_investor", leadInvestors);
                    // oView.setModel(leadModel);


				}
			});
			
		}
	});

});