#jQuery Deferred Objects

##To the interwebs!

"jQuery.Deferred(), introduced in version 1.5, is a chainable utility object that can register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function." - [jQuery docs][jQuery docs]
 
Not very helpful. Why do I want to find out more?

"...what they actually mean: the ability to register an interest in the outcome of arbitrary asynchronous behavior, even if the outcome has already occurred. Even better, you can register your interest in the outcome of behavior that may or may not be asynchronous." - [Rebecca Murphey][rmurphey]

Now _that's_ interesting, we'll come back to this...

##Building blocks

Let's quickly review the javascript concepts necessary to understand in order to work with deferred objects.

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

Here's a simple request using jQuery's `$.ajax()`.

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
var resp = $.ajax({
	//ajax options
});
```

####1.5 and beyond
$.ajax() returns a jqXHR object. This is a wrapper of the standard XHR object that implements the deferred interface. This opens up a lot of possibilities.

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

//this will be ignored
promise.done(success);
```

###Wrapping deferreds with $.when()

`$.when()` takes multiple deferred objects and wraps them in a new one to which you can attach callbacks.

```js
$.when($.ajax({}), $('.profile').animate(), deferred)
	.done(function(){ /* success callback */ })
	.fail(function(){ /* fail callback */ })
	.always(function(){ /* regardless callback */ });
```
When _all_ of the deferred objects passed in have been resolved, the success callback(s) passed into `done()` are fired. 

When _any_ of the deferred objects passed in has been rejected, the fail callback(s) passed into `fail()` are fired.

In any case, the callback(s) passed into `always()` are fired.

###Chaining deferreds with `pipe()`

`pipe()` is one of the more difficult parts of the jQuery's deferred implementation to understand. It can help you reduce the nesting of your deferred chains by allowing you to use data from your last deferred in your next one without assigning a callback. 

Typically added onto a chain of deferred function calls, `pipe()` executes the function you pass into it with the results of the previous deferred function in the chain as parameters. `pipe()` breaks the chain of deferreds leading up to it and instead returns (and allows you to chain on) the deferred promise returned by the function you pass into it. WHOA.

```js

app.fetchFirstMarkerSet()
	.pipe(app.processMarkers)
	.done(app.alertSuccess)
	.fail(app.alertFailure);

//is more or less equivalent to (and much prettier than)...

app.fetchFirstMarkerSet()
	.done(function(data){
		app.processMarkers(data)
			.done(app.alertSuccess)
			.fail(app.alertFailure);
	})
	.fail(app.alertFailure);
```

As always, passing a function that doesn't return a deferred promise will be treated as a resolved promise. __Do not__ treat `pipe()` like `when()` and pass it a promise instead of a function, because it will be treated as a resolved promise regardless of its state. 

```js
app.fetchFirstMarkerSet()
			.pipe($.Deferred().reject())
			.done(app.alertSuccess)
			.fail(app.alertFailure);

//app.alertSuccess will be executed

app.fetchFirstMarkerSet()
			.pipe(function(){
				return $.Deferred().reject();
			})
			.done(app.alertSuccess)
			.fail(app.alertFailure);

//app.alertFailure will be executed

```
##`always()`

In the end we have a very helpful set of new tools in jQuery's deferred implementation. The key improvement it provides us is the ability to allow the javascript at our highest levels of abstraction to remain abstract and unmuddled by the implementation details of the code at lower levels of abstraction, even when that lower-level code is asynchronous.

##useful links

[http://stackoverflow.com/questions/4869609/how-can-jquery-deferred-be-used](http://stackoverflow.com/questions/4869609/how-can-jquery-deferred-be-used)

[http://api.jquery.com/category/deferred-object/](http://api.jquery.com/category/deferred-object/)

[http://rmurphey.com/blog/2010/12/25/deferreds-coming-to-jquery/](http://rmurphey.com/blog/2010/12/25/deferreds-coming-to-jquery/)

[http://colonelpanic.net/2011/11/jquery-deferred-objects/](http://colonelpanic.net/2011/11/jquery-deferred-objects/)

[http://msdn.microsoft.com/en-us/magazine/gg723713.aspx](http://msdn.microsoft.com/en-us/magazine/gg723713.aspx)

[http://stackoverflow.com/a/10253290/236974](http://stackoverflow.com/a/10253290/236974)

[stackoverflow]: http://stackoverflow.com/questions/4869609/how-can-jquery-deferred-be-used
[jQuery docs]: http://api.jquery.com/category/deferred-object/
[rmurphey]: http://rmurphey.com/blog/2010/12/25/deferreds-coming-to-jquery/