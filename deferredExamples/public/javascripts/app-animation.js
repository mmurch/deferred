(function(app, window, undefined){

	app.playground = $('.playground');

	app.playgroundWidth = 1000;	
	app.playgroundHeight = 800;
	app.playgroundPadding = 14;

	app.nextY = 14;

	app.Square = function(opts){
		var self = this,
			defaults = {
				size: 150
			};

		self.config = $.extend({}, defaults, opts);

		self.$el = $('<div class="square"></div>').css({
			'background-color': app.picker.next(),
			'height': self.config.size,
			'width': self.config.size,
			'left': (app.playgroundWidth / 2) - (self.config.size / 2),
			'top': app.nextY
		});

		self.goLeft = function(){	
			return self.$el.animate({
				left: app.playgroundPadding
			}, self.$el.width() * 5).promise();
		};

		self.goRight = function(){
			return self.$el.animate({
				left: app.playgroundWidth - self.$el.width() 
						+ app.playgroundPadding
			}, self.$el.width() * 5).promise();
		};

		app.nextY = app.nextY + self.config.size + 14;
		app.playground.append(self.$el);

		return self;
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

	app.picker = new app.ColorPicker();

})(ZD.app('animation'), window);