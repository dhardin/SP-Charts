var app = app || {};

app.ChartEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'chartContainer',
	template: _.template($('#chart-template').html()),

	events:{
		'click #saveBtn':'onSaveChartClick',
		'click #newBtn': 'onNewBtnClick',
		'click #fetchBtn': 'onFetchBtnClick',
		'change #type': 'onSelectChange',
		'keyup #list_guid': 'onInputFieldChange',
		'keyup #url': 'onInputFieldChange'
	},

	initialize: function(){
	},

	render: function () {
		var type = this.model.get('type');
		this.$el.html(this.template((this.model ? this.model.toJSON() : {})));
		this.$menu = this.$('#menu');
		this.$fetchBtn = this.$('#fetchBtn');
		this.$saveBtn = this.$('#saveBtn');


		
		//initialize and bind events to the menu plugin
		this.$menu.menu();
 
		this.$select = this.$('#type');
		this.$list_guid = this.$('#list_guid');
		this.$url = this.$('#url');
		this.$select.val(type)
		return this;
	},


    getListItems: function(url, guid, type, callback) {
        var results = [], soapEnv, body;

        soapEnv =
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
                <soap:Body>\
                    <GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
                        <listName>' + guid + '</listName>\
                    </GetListItems>\
                </soap:Body>\
            </soap:Envelope>';



        $.ajax({
            url: url + "/_vti_bin/lists.asmx",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/GetListItems');
            },
            type: "POST",
            dataType: "xml",
            data: soapEnv,
            tryCount: app.config.tryCount,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                this.printError(XMLHttpRequest, textStatus, errorThrown);
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                } else if (callback) {
                    callback(textStatus);
                }
            },
            complete: function (xData, status) {
                var responseProperty = (type == app.config.type_map.document_library ? 'responseText' : 'responseXML'),
                 results = $(xData[responseProperty]).find('z\\:row');

                if (callback) {
                    callback(results);
                }
            },
            contentType: 'text/xml; charset="utf-8"'
        });
    },

   updateListItems: function(url, soap_env, callback){
	   var results = [];


        $.ajax({
            url: url + "/_vti_bin/lists.asmx",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems');
            },
            type: "POST",
            dataType: "xml",
            data: soap_env,
            tryCount: 3,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                this.printError(XMLHttpRequest, textStatus, errorThrown)
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                } else if (callback) {
                    callback(textStatus);
                }
            },
            complete: function (xData, status) {
                 results = $(xData.responseText).find('z\\:row');

                if (callback) {
                    callback(results);
                }
            },
            contentType: 'text/xml; charset="utf-8"'
        });
	},



    processData: function(results) {
    	var data = [],
    		attrObj = {},
    		i, j, 
    		chart = this.model;


    	//repackage data into an array which each index
    	//is an object with key value pairs
    	for (i = 0; i < results.length; i++){
    		attrObj = {};
    		for (j = 0; j < results[i].length; j++){
    			attrObj[results[i].attributes.name] = results[i].attributes.value;
			}
			data.push(attrObj);
    	}

    	chart.set('data', data);
    },

    printError: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log(XMLHttpRequest + '\n' + textStatus + '\n' + errorThrown);
	},

	save: function(){
		this.updateListItems(url, soap_env, function(){
			alert('Save Complete!');
		});
	},

	onSaveChartClick: function( e ) {
		e.preventDefault();
		var formData = {}, chart,
		data;


		$( '#info-bar' ).find( 'input, select' ).each( function( i, el ) {
			if( $( el ).val() != '' ){
				formData[ el.id ] = $( el ).val();
			}
		});

		chart = this.model;
		

		if (!app.LibraryCollection.get({cid: this.model.cid})){
			formData['rank'] = app.LibraryCollection.length + 1;
			chart.set(formData);
			app.LibraryCollection.add(chart);
		} else {
			chart.set(formData);
		}
 
		app_router.navigate('edit/' + this.model.cid, { trigger: true });
	
	},

	onNewBtnClick: function (e) {
		app_router.navigate('edit', {trigger: true});
	},

	onFetchBtnClick: function (e){
		//trigger chart save btn click
		this.$saveBtn.click();

		//make a web service on an the provided list guid
		var list_guid = this.model.get('list_guid'),
			url = this.model.get('url');

		this.getListItems(url, list_guid, app.config.type_map.list, this.processData);
	},

	onSelectChange: function(e){
		//trigger chart save btn click
		this.$saveBtn.click();
		this.trigger('chart-change');
	},

	onInputFieldChange: function(e){
		var regexGUID = /^\{[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{8}\}$/i,
			regexURL = /https?:\/\/.+/,
			guidVal = this.$list_guid.val(),
			urlVal = this.$url.val();


		if(regexGUID.test(guidVal) && regexURL.test(urlVal)){
			this.$fetchBtn.removeClass('disabled');
		} else{
			this.$fetchBtn.addClass('disabled');
		}
	}

});
