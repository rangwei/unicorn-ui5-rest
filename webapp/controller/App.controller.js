sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.demo.worklist.controller.App", {

		onInit : function () {
			
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
	});

});