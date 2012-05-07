(function(app, window, undefined){

	app.playground = $('.playground');

	app.playgroundWidth = 1000;	
	app.playgroundHeight = 800;
	app.playgroundPadding = 14;

	app.nextY = 14;

	app.addNewSquare = function(opts){
		var defaults = {
			size: 150,
			picker: new app.ColorPicker() 
		},
		config = $.extend({}, defaults, opts);

		var square = $('<div class="square"></div>').css({
			'background-color': config.picker.next(),
			'height': config.size,
			'width': config.size,
			'left': (app.playgroundWidth / 2) - (config.size / 2),
			'top': app.nextY
		});

		app.nextY = app.nextY + config.size + 14;

		app.playground.append(square);

		return square;
	};

	app.ColorPicker = function(){
		var currentColor = -1,
			maxColor = app.colors.length;

		this.next = function(){
			currentColor++;
			if (currentColor == maxColor){
				currentColor = 0;
			}	

			return app.colors[currentColor];
		};
	};

	app.colors = ['#fe812e', '#00bb41', '#d8362e', '#734889'];

})(ZD.app('animation'), window);