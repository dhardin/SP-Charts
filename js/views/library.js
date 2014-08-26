var app = app || {};

app.LibraryView = Backbone.View.extend({
	template: _.template($('#chart-collection-template').html()),

	events: {
		'keyup #search-input' : 'search',
		'update-sort': 'updateSort'
	},

	initialize: function (){
		this.collection = app.LibraryCollection;
		//this.render();
		this.listenTo(this.collection, 'add, reset, change', function(){ this.render(this.collection);});
	},

	render: function (collection, isFiltered) {
		if(!collection){
			this.$el.html(this.template());
			this.$charts = this.$el.find('#charts'); 	
			this.$filter = this.$el.find('#search-input');
		}

		collection = collection || this.collection;
		this.$charts.html('');

		if (!isFiltered){
			if (collection.length > 0){
				collection.each(function(item){	
					this.renderChart(item);

				}, this);
				this.$charts.sortable({
					stop: function (event, ui) {
						ui.item.trigger('drop', ui.item.index());
					}
				});
				this.$charts.disableSelection();
			} else {
				this.$charts.html($('#noChartsTemplate').html());
			}
		} else {
			var totalItems = this.collection.length,
			numItemsDisplayed = collection.toArray().length;
			this.$charts.html('Displaying ' + numItemsDisplayed + ' out of ' + totalItems);
			collection.each(function(item){
				this.renderChart(item);
			}, this);
		}
	},

	renderChart : function(item){
		var chartView = new app.ChartView({
			model: item
		});
		this.$charts.append(chartView.render().el);
	},

	 updateSort: function(event, model, position){
    	this.collection.remove(model);

    	this.collection.each(function(model, index){
    			var ordinal = index;
    			if (index >= position){
    				ordinal += 1;
    			}
    			model.set('rank', ordinal + 1);
    	});
    	model.set('rank', position + 1);
    	this.collection.add(model, {at: position});

    	this.render(this.collection);
    },

	search: function(e){
		var text = this.$filter.val();
		if (text.length > 0){
			this.render(this.collection.search(text), true);
		} else {
			this.render(this.collection);
		}
	}
});