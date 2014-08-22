var app = app || {};

app.DesignView = Backbone.View.extend({
	tagName: 'div',
	template: _.template($('#design-template').html()),

	events: {},
	initialize: function () {
		this.on('render', this.onRender);
	},

	render: function () {
		this.$el.html(this.template());

		return this.trigger('render');
	},

	onRender: function () {
		this.$info_bar = $('#info-bar');
		this.$preview = $('#preview');
		this.$chart_collection = $('#chart_collection');
		this.libraryView = new app.LibraryView({el: this.$chart_collection.selector, charts: charts});
		this.chartView = new app.ChartView({
			model: (this.libraryView.collection.length > 0 ? this.libraryView.collection.at(0) : new app.Chart()),
			el: this.$preview.selector
		});
	}



});
