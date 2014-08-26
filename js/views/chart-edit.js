var app = app || {};

app.ChartEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'chartContainer',
	template: _.template($('#chart-template').html()),

	events:{
		'click .saveBtn':'saveChart',
		'click .newBtn': 'newChart',
		'change #type': 'onSelectChange'
	},

	initialize: function(){

	},

	render: function () {
		var type = this.model.get('type');
		this.$el.html(this.template((this.model ? this.model.toJSON() : {})));
		this.$menu = this.$('#menu');
		
		//initialize and bind events to the menu plugin
		this.$menu.menu();
 
		this.$select = this.$('#type');
		this.$select.val(type)
		return this;
	},

	saveChart: function( e ) {
		e.preventDefault();
		var formData = {}, chart,
		data;


		$( '#info-bar' ).find( 'input, select' ).each( function( i, el ) {
			if( $( el ).val() != '' ){
				formData[ el.id ] = $( el ).val();
			}
		});

		chart = this.model;
		

		if (!app.LibraryCollection.get({cid: this.model.cid})){
			formData['rank'] = app.LibraryCollection.length + 1;
			chart.set(formData);
			app.LibraryCollection.add(chart);
		} else {
			chart.set(formData);
		}
 
		app_router.navigate('edit/' + this.model.cid, { trigger: true });
	
	},

	newChart: function (e) {
		app_router.navigate('edit', {trigger: true});
	},

	onSelectChange: function(e){
		this.saveChart(e);
		this.trigger('chart-change');
	}

});
