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

			// var oModel = new JSONModel();
			// this.setModel(oModel);

			var oOwnerComponent = this.getOwnerComponent();
			var oModel = new JSONModel();
			oOwnerComponent.setModel(oModel, "fundings");
			
		},


		_onObjectMatched: function (oEvent) {

			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			var oModel = this.getModel("fundings");

			var url = "http://localhost:3000/unicorns/" + oArgs.objectId;
	  
			
			$.ajax({
				url: url,
				type: "GET",
				contentType: "application/json",
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					oModel.setData(data);
				}
			});
			
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress : function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser history
		 * @public
		 */
		onNavBack : function() {
			history.go(-1);
		},


		onSearch : function (oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var aTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					aTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(aTableSearchState);
			}

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh : function () {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject : function (oItem) {
			// this.getRouter().navTo("funding");

			//  alert(oItem.getBindingContext("fundings").getProperty("uuid"));

			this.getRouter().navTo("funding", {

				objectId: oItem.getBindingContext("fundings").getProperty("/name"),
				
				uuid: oItem.getBindingContext("fundings").getProperty("uuid")
			});

			
		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
		 * @private
		 */
		_applySearch: function(aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		}
	});

});