var app = app || {};

app.ChartEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'chartContainer',
	template: _.template($('#chart-template').html()),

	events:{
		'click #saveChartBtn':'saveChart'
	},

	render: function () {
		this.$el.html(this.template((this.model ? this.model.toJSON() : {})));

		return this;
	},

	saveChart: function( e ) {
		e.preventDefault();
		var formData = {}, chart,
		data;


		$( '#toolbar' ).find( 'input, select' ).each( function( i, el ) {
			if( $( el ).val() != '' ){
				formData[ el.id ] = $( el ).val();
			}
		});

		if (app.LibraryCollection.get({cid: this.model.cid})){
			book = this.model;
			book.set(formData);
		} else {
			book = new app.Book( formData );
			app.LibraryCollection.add(book);
		}
		save();
		app_router.navigate('edit', { trigger: true });
	
	}

});
