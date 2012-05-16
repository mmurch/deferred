//scratch file for playing with .pipe()

(function(app, window, undefined){

	app.fetchFirstMarkerSet = function(){
		return $.ajax({
			type: 'GET',
			url: '/api/markers.json',
			dataType: 'json'	
		});
	};

	app.processMarkers = function(data){
		$('body').append('<h2>pre-processing</h2>')
				.append(JSON.stringify(data));

		return $.ajax({
			url: '/api/manifestDestiny',
			type: 'POST',
			data: { data: data }
		})
		.done(function(resp){
			$('body').append('<h2>post-processing</h2>')
				.append(JSON.stringify(resp));
			app.markers = app.markers || [];
			app.markers[0] = resp;
		});
	};

	app.alertSuccess = function(){
		$('body').append(
			$('<h2>success</h2>')
				.css({color: 'green'}));
	};

	app.alertFailure = function(){
		$('body').append(
			$('<h2>failure</h2>')
				.css({color: 'red'}));
	};

	app.getRejected = function(){
		var deferred = $.Deferred();
		setTimeout(deferred.reject, 1000);
		return deferred.promise();
	};
	
	app.getResolved = function(){
		var deferred = $.Deferred();
		setTimeout(deferred.resolve, 1000);
		return deferred.promise();
	};

	$(function(){
		// using pipe() to chain
		// app.fetchFirstMarkerSet()
		// 	.pipe(app.processMarkers)
		// 	.done(app.alertSuccess)
		// 	.fail(app.alertFailure);

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
			
			
	});

})(ZD.app('multi'), window);