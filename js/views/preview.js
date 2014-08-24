var app = app || {};

app.PreviewView = Backbone.View.extend({
	events: {

	},

	initialize: function () {
		this.type = this.model.get('type').toLowerCase();
		this.listenTo(app.LibraryCollection, 'change', this.render);
	},

	

	render: function () {
		// Creates canvas 640 × 480 at 10, 50
		
			 _.defer(_.bind(function() {  
			 	var width = $('#preview').width(),
			 		height = $('#preview').height() * 0.9,
				data_arr = [55, 20, 13, 32, 5, 1, 2];

				this.graph = $('#preview').children().length > 0 ? this.graph : Raphael($('#preview')[0], 0, 0);
				this.graph.setSize(width, height);

				this.graph.clear();

				switch(this.type.value.toLowerCase()){
					case 'pie':
						// Creates pie chart at with center at 320, 200,
						// radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
						this.graph.piechart(width/2, height/2, 200, data_arr);
						break;
					case 'line':
						this.graph.linechart(0, 0, width, height, [1,2,3,4,5], [[1,2,3,4,5], [1,3,9,16,25], [100,50,25,12,6]], {smooth: true, colors: ['#F00', '#0F0', '#FF0'], symbol: 'circle'});
						break;
					case 'bar':
						this.graph.barchart(0, 0, width, height, data_arr, {})
						break;
					case 'hbar':
						this.graph.hbarchart(0, 0, width, height, data_arr, {})
						break;
					case 'dot':
						//life, expectancy, country and spending per capita (fictional data)
						this.graph.dotchart(0, 0, width, height, [76, 70, 67, 71, 69], [0, 1, 2, 3, 4], [100, 120, 140, 160, 500], {max: 10, axisylabels: ['Mexico', 'Argentina', 'Cuba', 'Canada', 'United States of America'], heat: true, axis: '0 0 1 1'})
						break;
				}
  			}), this);

		
		
		return this;
	}



});
