var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'editChart',
		'main': 'main',
		'edit': 'editChart',
		'edit/:id': 'editChart'
	},

	 initialize: function(options){
	    this.AppView = options.AppView;
	  },
	
	main: function  () {
		var designView = new app.DesignView();
		   this.AppView.showView(designView);
		/* var libraryView = new app.LibraryView(charts);
	    this.AppView.showView(libraryView);*/
	},

	editChart: function(id){

		var designView = new app.DesignView({chart_id: id});
		
 		this.AppView.showView(designView);
		
		//var chartEditView = new app.ChartEditView({model: chart});
		//this.AppView.showView(chartEditView);
	}
});


var app_router = new Router({AppView: app.AppView});

Backbone.history.start();
