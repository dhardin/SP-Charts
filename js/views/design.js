var app = app || {};

app.DesignView = Backbone.View.extend({
	tagName: 'div',
	template: _.template($('#design-template').html()),

	events: {
	},
	initialize: function (options) {
		this.chart_id = options.chart_id || false;
		this.libraryView =  new app.LibraryView();

		this.on('renderComplete', this.onRenderComplete);

	},

	render: function () {
		this.$el.html(this.template());

		return this.trigger('renderComplete');
	},

	onRenderComplete: function () {
		var chart;

		this.$info_bar = this.$('#info-bar');
		this.$preview =this.$('#preview');
		this.$chart_collection = this.$('#chart_collection');

		chart =  (this.chart_id ?  this.libraryView.collection.get({cid: this.chart_id}) 
					: (this.libraryView.collection.length > 0 
						? this.libraryView.collection.at(0) 
						: new app.Chart()));

		this.chartView = new app.ChartEditView({
			model: chart
		});

		this.previewView = new app.PreviewView({model: chart});

		this.libraryView.setElement(this.$chart_collection);
		this.chartView.setElement(this.$info_bar);
		this.previewView.setElement(this.$preview);
		this.previewView.render();
		this.libraryView.render();
		this.chartView.render();
		
	}



});