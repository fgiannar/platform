/*
 * File: app/view/TypesPieChart.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('C.view.TypesPieChart', {
	extend: 'Ext.chart.Chart',

	border: '1px',
	height: 300,
	width: 350,
	shadow: true,
	autoSize: true,
	animate: true,
	insetPadding: 25,
	store: 'PersonTypesStore',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			series: [
				{
					type: 'pie',
					highlight: {
						segment: {
							margin: 20
						}
					},
					label: {
						field: 'type',
						display: 'rotate',
						contrast: true,
						font: '12px Arial'
					},
					showInLegend: true,
					tips: {
						trackMouse: true,
						width: 140,
						height: 28,
						renderer: function(storeItem, item) {
						//calculate percentage.
						var total = 0;
						storeItem.store.each(function(rec) {
							total += rec.get('count');
						});
						this.setTitle(storeItem.get('type') + ': ' + Math.round(storeItem.get('count') / total * 100) + '%');
					  }
					},
					angleField: 'count',
					highlightDuration: 200
				}
			],
			legend: {
				position: 'right'
			}
		});

		me.callParent(arguments);
	}

});