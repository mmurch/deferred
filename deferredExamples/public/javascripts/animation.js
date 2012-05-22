(function(app, window){

	$(function(){

		var squares = [];

		squares.push(new app.Square());
		squares.push(new app.Square({ size: 90 }));
		squares.push(new app.Square({ size: 60 }));
		squares.push(new app.Square({ size: 300 }));

		setTimeout(function(){
			//do a thing!
			// app.eachLeftRight(squares);
			// app.batchLeftRight(squares);
		}, 1000);
	});

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

})(ZD.app('animation'), window);
