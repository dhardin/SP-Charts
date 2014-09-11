var app = app || {};

charts = [
	{
		title: 'Chart 1',
		list_guid: '',
		url: '',
		type: 'Bar',
		rank: '1',
	},
	{
		title: 'Chart 2',
		list_guid: '',
		url: '',
		type: 'Dot',
		rank: '2'
	},
	{
		title: 'Chart 3',
		list_guid: '',
		url: '',
		type: 'Pie',
		rank: '3'
	}
];

var isTesting = false;

if (isTesting){
	spData.getData(app.config.dataArr, 0, function(results){
		app.LibraryCollection = new app.Library(results);
	});
} else {
	app.LibraryCollection = new app.Library(charts);
}