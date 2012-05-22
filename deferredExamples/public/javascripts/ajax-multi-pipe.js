(function(app, window, undefined){

	app.fetchMarkersToProcess = function(callback){
		return $.ajax({
			type: 'GET',
			url: '/api/markers.json',
			dataType: 'json'
		});
	};

	app.processMarkers = function(data){
		return $.ajax({
			url: '/api/manifestDestiny',
			type: 'POST',
			data: { data: data }
		})
		.done(function(resp){
			app.markers = app.markers || [];
			app.markers[0] = resp;
		});
	};

	$(function(){
		$.when(app.fetchGoogleMaps(), 
				app.fetchMarkersToProcess()
					.pipe(app.processMarkers))
			.done(app.makeGoogleMap);
	});

})(ZD.app('multi'), window);