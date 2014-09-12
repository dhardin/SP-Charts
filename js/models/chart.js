var app = app || {};

app.Chart = Backbone.Model.extend({
    defaults: {
        title: '',
        url: '',
        list_guid: '',
        type: '',
        rank: '1',
        data: [],
        dataColumn1: '',
        dataColumn2: '',
        nameColumn: '',
        label_one: {
        	title: '',
        	units: ''
        },
        label_two: {
        	title: '',
        	units: ''
        }
    }
});
