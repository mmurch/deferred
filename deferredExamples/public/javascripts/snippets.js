
var deferred = $.Deferred();

deferred.resolve();

deferred.resolveWith(context[, args]);

deferred.reject();

deferred.rejectWith(context[, args]);

var chainableObj = {

	doAThing: function(){

		//do the thing

		return this;
	},

	doAnotherThing: function(){

		//do the other thing

		return this;
	}

};

chainableObj
	.doAThing()
	.doAnotherThing();

app.fetchGoogleMaps = function(callback){

	$.subscribe('mapsLoaded', function(){
		if (callback){
			callback();
		}
	});

	$.ajax({
		type: 'GET',
		url: 'http://maps.googleapis.com/maps/api/js' + 
			'?sensor=false&callback=googleMapsLoaded',
		dataType: 'script'
	});
};

app.fetchMarkers1 = function(callback){
	$.ajax({
		type: 'GET',
		url: '/api/markers.json',
		dataType: 'json',
		success: function(resp){
			app.markers = app.markers || [];
			app.markers[0] = resp;

			if (callback){					
				callback();
			}
		}	
	});
};

app.fetchMarkers2 = function(callback){
	$.ajax({
		type: 'GET',
		url: '/api/markers2.json',
		dataType: 'json',
		success: function(resp){
			app.markers = app.markers || [];
			app.markers[1] = resp;

			if (callback){
				callback();
			}
		}	
	});
};


app.fetchGoogleMaps = function(callback){
	var deferred = $.Deferred();

	$.subscribe('mapsLoaded', function(){
		if (callback){
			callback();
		}
		deferred.resolve();
	});

	$.ajax({
		type: 'GET',
		url: 'http://maps.googleapis.com/maps/api/js' + 
			'?sensor=false&callback=googleMapsLoaded',
		dataType: 'script',
		error: function(jqXHR, textStatus, errorThrown){
			deferred.reject();
		}
	});

	return deferred.promise();
};

app.fetchMarkers1 = function(callback){
	return $.ajax({
		type: 'GET',
		url: '/api/markers.json',
		dataType: 'json',
		success: function(resp){
			app.markers = app.markers || [];
			app.markers[0] = resp;

			if (callback){					
				callback();
			}
		}	
	});
};

app.fetchMarkers2 = function(callback){
	return $.ajax({
		type: 'GET',
		url: '/api/markers2.json',
		dataType: 'json',
		success: function(resp){
			app.markers = app.markers || [];
			app.markers[1] = resp;

			if (callback){
				callback();
			}
		}	
	});
};





function doStuffWithData(data, callback){
	
	//do stuff with the data

	if (callback){
		callback();
	}
}

doStuffWithData({ id: 25, name: 'john'}, function(){
	alert('We did it!');	
});




$.ajax({
	data: { id: 25, name: 'john'}, 
	url: '/person/name',
	type: 'POST',
	success: function(response){
		if (response.success){
			alert('We made it!');	
		}
		else {
			alert(response.error);
		}
	},
	error: function(){
		alert('Something went wrong!');	
	}
});


var chainableObj = {

	doAThing: function(){

		//do the thing

		return this;
	},

	doAnotherThing: function(){

		//do the other thing

		return this;
	}

};

chainableObj
	.doAThing()
	.doAnotherThing();

$.ajax({
	//ajax options
});

var resp = $.ajax({
	//ajax options
});



resp.success(function(){
	//success action 1
});

resp.error(function(){
	//business logic failure handler
});

resp.error(function(){
	//generic failure handler
});


resp.done(function(){
	//success action 1
});

resp.fail(function(){
	//business logic failure handler
});

resp.fail(function(){
	//generic failure handler
});



var deferred = $.Deferred();

//register success callback(s)
deferred.done(success);
deferred.done([successA, successB]);

//register failure callback(s)
deferred.fail(error);
deferred.fail([errorA, errorB]);

//register both success and failure callback(s)
deferred.then(successCallback, failureCallback);
deferred.then([successA, successB], [errorA, errorB]);

//register callbacks that get executed
//on success OR failure
deferred.always(alwaysCallback);
deferred.always([alwaysCallbackA, alwaysCallbackB]);


var deferred = $.Deferred(),
	promise = deferred.promise();

//register success callback(s)
promise.done(success);
promise.done([successA, successB]);

//register failure callback(s)
promise.fail(error);
promise.fail([errorA, errorB]);

//register both success and failure callback(s)
promise.then(successCallback, failureCallback);
promise.then([successA, successB], [errorA, errorB]);



deferred.done(success);


var deferred = $.Deferred(),
	promise = deferred.promise();

promise.resolve();

promise.reject();


var deferred = $.deferred();

$.when($.ajax({}), $('.profile').animate(), deferred)
	.done(function(){ /* success callback */ })
	.fail(function(){ /* fail callback */ })
	.always(function(){ /* regardless callback */ });




app.fetchFirstMarkerSet()
	.pipe(app.processMarkers)
	.done(app.alertSuccess)
	.fail(app.alertFailure);




app.fetchFirstMarkerSet()
	.done(function(data){
		app.processMarkers(data)
			.done(app.alertSuccess)
			.fail(app.alertFailure);
	})
	.fail(app.alertFailure);



app.fetchFirstMarkerSet()
			.pipe($.Deferred().reject())
			.done(app.alertSuccess)
			.fail(app.alertFailure);



app.fetchFirstMarkerSet()
			.pipe(function(){
				return $.Deferred().reject();
			})
			.done(app.alertSuccess)
			.fail(app.alertFailure);


























