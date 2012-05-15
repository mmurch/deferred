(function(app, window, undefined){
	
	app.fetchGoogleMaps = function(){

		var deferred = $.Deferred();

		$.subscribe('mapsLoaded', function(){
			deferred.resolve();
		});

		$.ajax({
			type: 'GET',
			url: 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=googleMapsLoaded',
			dataType: 'script',
			error: function(jqXHR, textStatus, errorThrown){
				deferred.reject();
			}
		});

		return deferred.promise();
	}

	app.fetchFirstMarkerSet = function(){
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
				app.fetchFirstMarkerSet()
					.pipe(app.processMarkers))
			.done(app.makeGoogleMap);
	});

})(ZD.app('multi'), window);