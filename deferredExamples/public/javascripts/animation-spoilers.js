app.eachLeftRight = function(squares){
	$(squares).each(function(){
		this.goLeft().done(this.goRight);
	});
};

app.batchLeftRight = function(squares){
	var arrayOfDeferreds = $.map(squares, function(s){
		return s.goLeft();
	});

	$.when.apply(null, arrayOfDeferreds)
		.done(function(){
			$.each(squares, function(){
				this.goRight();
			});
		});
};