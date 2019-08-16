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
			oRouter.getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			var oModel = new JSONModel();
			this.setModel(oModel);
			
		},


		_onObjectMatched: function (oEvent) {

			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			var oModel = this.getModel();

			var url = "http://49.234.230.70:3000/unicorns/" + oArgs.objectId;
	  
			
			$.ajax({
				url: url,
				type: "GET",
				contentType: "application/json",
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					oModel.setData(data);
				}
			});
			
		}
	});

});