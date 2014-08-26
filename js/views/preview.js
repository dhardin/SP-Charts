var app = app || {};

app.PreviewView = Backbone.View.extend({
	events: {

	},

	initialize: function () {
		this.listenTo(app.LibraryCollection, 'change', this.render);
		this.on('chart-change', this.render);
	},

	

	render: function () {
		// Creates canvas 640 × 480 at 10, 50
		
			 _.defer(_.bind(function() {  
			 	var width = this.$el.width(),
			 		height = this.$el.height() * 0.9,
				data_arr = [55, 20, 13, 32, 5, 1, 2],
				legend_arr = [], i;

				for (i = 0; i < data_arr.length; i++){
					legend_arr.push("%%.%%");
				}

				this.graph = this.$el.children().length > 0 ? this.graph : Raphael(this.$el[0], 0, 0);
				this.graph.setSize(width, height);

				this.graph.clear();

				switch(this.model.get('type').toLowerCase()){
					case 'pie':
						// Creates pie chart at with center at 320, 200,
						// radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
						var pie = this.graph.piechart(width/2, height/2, 200, data_arr,  { legend: legend_arr, legendpos: "east"});

		                pie.hover(function () {
		                    this.sector.stop();
		                    this.sector.scale(1.1, 1.1, this.cx, this.cy);

		                    if (this.label) {
		                        this.label[0].stop();
		                        this.label[0].attr({ r: 7.5 });
		                        this.label[1].attr({ "font-weight": 800 });
		                    }
		                }, function () {
		                    this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

		                    if (this.label) {
		                        this.label[0].animate({ r: 5 }, 500, "bounce");
		                        this.label[1].attr({ "font-weight": 400 });
		                    }
		                });
        
						break;
					case 'line':
						this.graph.linechart(0, 0, width, height, [1,2,3,4,5], [[1,2,3,4,5], [1,3,9,16,25], [100,50,25,12,6]], {smooth: true, colors: ['#F00', '#0F0', '#FF0'], symbol: 'circle'});
						break;
					case 'bar':
						this.graph.barchart(0, 0, width, height, data_arr, {})
						break;
					case 'horizontal bar':
						this.graph.hbarchart(0, 0, width, height, data_arr, {})
						break;
					case 'dot':
						//life, expectancy, country and spending per capita (fictional data)
						this.graph.dotchart(0, 0, width, height, [76, 70, 67, 71, 69], [0, 1, 2, 3, 4], [100, 120, 140, 160, 500], {max: 10, axisylabels: ['Mexico', 'Argentina', 'Cuba', 'Canada', 'United States of America'], heat: true, axis: '0 0 1 1'})
						break;
				}
  			}, this));

		
		
		return this;
	}



});
