#jQuery Deferred Objects

##Introduction

What do the internets say?

"jQuery.Deferred(), introduced in version 1.5, is a chainable utility object that can register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function." - [jQuery docs][jQuery docs]
 
not very clear

"...what they actually mean: the ability to register an interest in the outcome of arbitrary asynchronous behavior, even if the outcome has already occurred. Even better, you can register your interest in the outcome of behavior that may or may not be asynchronous." - [Rebecca Murphey][rmurphey]

now that's interesting, we'll come back to this

##Building blocks

###Chaining

The pattern of executing a function immediately on the result of another function. Usually achieved by returning the object the method belongs to.

```js
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
```

###Callbacks

The pattern of assigning a function to be executed upon the completion of another function. 

"Hey, do this and when you're done do this". 
```js
	function doStuffWithData(data, callback){
		
		//do stuff with the data

		if (callback){
			callback();
		}
	}

	doStuffWithData({ id: 25, name: 'john'}, function(){
		alert('We made it!');	
	});
```
This is of even more utility when you are expanding it to...

"Hey, do this and if it works then do this, but if it fails do this other thing."

###Ajax
```js
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
```
What if you want multiple callbacks for success or error?

####Pre 1.5
$.ajax() returned standard XHR object. Not very useful.

```js
$.ajax({
	//ajax options
});
```

####1.5 and beyond
$.ajax() returns deferred object. Opens up a lot of possibilities.

```js
var resp = $.ajax({
	//ajax options
});

resp.success(function(){
	//success handler
});

resp.error(function(){
	//failure handler
});

//which is the same as our new tools:

resp.done(function(){
	//success handler
});

resp.fail(function(){
	//failure handler
});
```
##Anatomy of a deferred obj

###States
_See keynote for diagram_

###Registering Callbacks

```js
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
```
###Promises

A restricted version of a deferred object. You can register callbacks, but can't resolve it's state.

```js
var deferred = $.Deferred(),
	promise = deferred.promise();

//register success callback(s)
promise.done(success);

//resolve
~~promise.done(success);~~
```

[stackoverflow]: http://stackoverflow.com/questions/4869609/how-can-jquery-deferred-be-used
[jQuery docs]: http://api.jquery.com/category/deferred-object/
[rmurphey]: http://rmurphey.com/blog/2010/12/25/deferreds-coming-to-jquery/
[annotatedfiddle]: http://jsfiddle.net/Raynos/Hufjr/