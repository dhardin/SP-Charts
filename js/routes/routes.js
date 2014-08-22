var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'main',
		'main': 'main',
		'edit': 'editChart',
		'edit/:id': 'editChart'
	},

	 initialize: function(options){
	    this.AppView = options.AppView;
	  },
	
	main: function  () {
		 var libraryView = new app.LibraryView(charts);
	    this.AppView.showView(libraryView);
	},

	editChart: function(id){
		var chart = (id ? app.LibraryCollection.get({cid: id}) : new app.Chart());
		var chartEditView = new app.ChartEditView({model: chart});
		this.AppView.showView(chartEditView);
	}
});

var app_router = new Router({AppView: app.AppView});

Backbone.history.start();