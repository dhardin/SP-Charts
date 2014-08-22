var app = app || {};

app.DesignView = Backbone.View.extend({
	tagName: 'div',
	template: _.template($('#design-template').html()),

	events: {},
	initialize: function () {
		this.on('renderComplete', this.onRenderComplete);
	},

	render: function () {
		this.$el.html(this.template());

		return this.trigger('renderComplete');
	},

	onRenderComplete: function () {
		this.$info_bar = this.$('#info-bar');
		this.$preview =this.$('#preview');
		this.$chart_collection =this.$('#chart_collection');
		this.libraryView = new app.LibraryView({
			charts: charts
		});
		this.chartView = new app.ChartEditView({
			model: (this.libraryView.collection.length > 0 ? this.libraryView.collection.at(0) : new app.Chart()),
		});

		this.libraryView.$el = this.$chart_collection;
		this.chartView.$el = this.$info_bar;

		this.libraryView.render();
		this.chartView.render();
	}



});
