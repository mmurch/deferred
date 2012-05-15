(function(app, window, undefined){

	$(function(){

		var picker = new app.ColorPicker(),
			squares = [];

		squares.push(app.addNewSquare({ picker: picker }));
		squares.push(app.addNewSquare({ picker: picker, size: 90 }));
		squares.push(app.addNewSquare({ picker: picker, size: 220 }));

		setTimeout(function(){
		
			//do a thing!
			app.batchLeftRight(squares);
		}, 1000);
	});

	app.eachLeftRight = function(squares){
		$(squares).each(function(){
			app.sendSquareLeftThenRight(this);
		});
	};

	app.batchLeftRight = function(squares){
		var arrayOfDeferreds = $.map(squares, function(s){
			return app.sendSquareLeft(s);
		});

		$.when.apply(null, arrayOfDeferreds)
			.done(function(){
				$.each(squares, function(){
					app.sendSquareRight(this);
				});
			});
	}

	app.sendSquareLeft = function($square){	
		return $square.animate({
			left: app.playgroundPadding
		}, $square.width() * 5).promise();
	};

	app.sendSquareRight = function($square){
		return $square.animate({
			left: app.playgroundWidth - $square.width() + app.playgroundPadding
		}, $square.width() * 5).promise();
	};

	app.sendSquareLeftThenRight = function($square){
		app.sendSquareLeft($square)
			.done(function(){
				app.sendSquareRight($square);
			});
	};

})(ZD.app('animation'), window);