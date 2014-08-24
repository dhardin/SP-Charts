var app = app || {};

app.ChartEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'chartContainer',
	template: _.template($('#chart-template').html()),

	events:{
		'click #saveBtn':'saveChart'
	},

	initialize: function(){
	},

	render: function () {
		var type = this.model.get('type');
		this.$el.html(this.template((this.model ? this.model.toJSON() : {})));
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

		if (app.LibraryCollection.get({cid: this.model.cid})){
			book = this.model;
			book.set(formData);
		} else {
			book = new app.Book( formData );
			app.LibraryCollection.add(book);
		}
		//save();
		app_router.navigate('edit/' + this.model.cid, { trigger: true });
	
	}

});
