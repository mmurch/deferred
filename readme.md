#jQuery Deferred Objects

##Introduction

What do the internets say?

"jQuery.Deferred(), introduced in version 1.5, is a chainable utility object that can register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function." - [jQuery docs][jQuery docs]
 
//not very clear

"One model for understanding Deferred is to think of it as a chain-aware function wrapper." - [jQuery docs][jQuery docs] 

//slightly clearer

"...what they actually mean: the ability to register an interest in the outcome of arbitrary asynchronous behavior, even if the outcome has already occurred. Even better, you can register your interest in the outcome of behavior that may or may not be asynchronous." - [Rebecca Murphey][rmurphey]

//now that's interesting, we'll come back to this

##Building blocks

###Chaining



###Callbacks

The pattern of assigning a function to be executed upon the completion of another function. 

"Hey, do this and when you're done do this". 

	function doStuffWithData(data, callback){
		
		//do stuff with the data

		if (callback){
			callback();
		}
	}

	doStuffWithData({ id: 25, name: 'john'}, function(){
		alert('We made it!');	
	});

This is of even more utility when you are expanding it to...

"Hey, do this and if it works, do this other thing if it fails."

###Ajax

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

What if you want multiple callbacks for success or error?

####Pre 1.5
$.ajax() returned standard XHR object. Not very useful.

####1.5 and beyond
$.ajax() returns deferred object. Opens up a lot.



[stackoverflow]: http://stackoverflow.com/questions/4869609/how-can-jquery-deferred-be-used
[jQuery docs]: http://api.jquery.com/category/deferred-object/
[rmurphey]: http://rmurphey.com/blog/2010/12/25/deferreds-coming-to-jquery/
[annotatedfiddle]: http://jsfiddle.net/Raynos/Hufjr/