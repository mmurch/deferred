


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

chainableObject
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


deferred.done(success);

deferred.resolve();

deferred.reject();















