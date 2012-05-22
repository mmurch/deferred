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
	};

	app.fetchMarkers1 = function(callback){
		return $.ajax({
			type: 'GET',
			url: '/api/markers.json',
			dataType: 'json',
			success: function(resp){
				app.markers = app.markers || [];
				app.markers[0] = resp;
			}	
		})
	};

	app.fetchMarkers2 = function(callback){
		return $.ajax({
			type: 'GET',
			url: '/api/markers2.json',
			dataType: 'json',
			success: function(resp){
				app.markers = app.markers || [];
				app.markers[1] = resp;
			}	
		})
	};

})(ZD.app('multi'), window);