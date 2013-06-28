/*
 * File: app/view/MyTabPanel.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('C.view.MyTabPanel', {
	extend: 'Ext.tab.Panel',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			defaults: {
				autoScroll: true
			},
			listeners: {
				tabchange: {
					fn: me.onMainTabPanelTabChange,
					scope: me
				},
				beforerender: {
					fn: me.onTabpanelBeforeRender,
					scope: me
				}
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top'
				}
			]
		});

		me.callParent(arguments);
	},

	onMainTabPanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
		var activeTab = tabPanel.getActiveTab();
		if (C.dbname) {
			if (Ext.getClassName(activeTab) != 'C.view.ResultsGraphForm') {	
				activeTab.query('.button').forEach(function(c){if (c.xtype!='tab')c.setDisabled(true);});
				activeTab.query('.field').forEach(function(c){c.readOnly = true;});
				activeTab.query('.grid').forEach(function(c){
					c.view.plugins.forEach(function(plugin){
						if (plugin.ptype == 'gridviewdragdrop') {
							plugin.dragZone.locked = true;
							plugin.dropZone.locked = true;
						}
					});
				});

				Ext.getCmp('uiNavigationTreePanel').view.plugins.forEach(function(plugin){
					if (plugin.ptype == 'treeviewdragdrop')
					plugin.dragZone.locked = true;
				});
			}
			else {
				Ext.getCmp('uiNavigationTreePanel').view.plugins.forEach(function(plugin){
					if (plugin.ptype == 'treeviewdragdrop')
					plugin.dragZone.locked = false;
					plugin.dropZone.locked = true;
				});
			}
		}

		var breadcrumb = C.app.setBreadcrumb(activeTab.corresponding_node);
		tabPanel.dockedItems.items[0].removeAll();
		tabPanel.dockedItems.items[0].add(breadcrumb);
	},

	onTabpanelBeforeRender: function(component, eOpts) {

	}

});