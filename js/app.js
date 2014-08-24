var app = app || {};

charts = [
	{
		title: 'Chart 1',
		settings_guid: 'N/A',
		list_guid: 'N/A',
		type: 'Line',
		rank: '1'
	},
	{
		title: 'Chart 2',
		settings_guid: 'N/A',
		list_guid: 'N/A',
		type: 'Line',
		rank: '2'
	},
	{
		title: 'Chart 3',
		settings_guid: 'N/A',
		list_guid: 'N/A',
		type: 'Pie',
		rank: '3'
	}
];


app.LibraryCollection = new app.Library(charts);
