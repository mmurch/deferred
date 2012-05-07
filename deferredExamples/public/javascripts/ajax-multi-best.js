(function(app, window, undefined){
	
	app.fetchGoogleMaps = function(){

		var deferred = $.Deferred();

		$.subscribe('mapsLoaded', function(){
			deferred.resolve();
		});

		$.ajax({
			type: 'GET',
			url: 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=maps',
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
			dataType: 'json',
			success: function(resp){
				app.markers[0] = resp;
			}	
		});
	};

	app.fetchSecondMarkerSet = function(){
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

	$(function(){

		$.when(app.fetchGoogleMaps(), app.fetchFirstMarkerSet(), app.fetchSecondMarkerSet())
			.done(app.makeGoogleMap)
			.fail(function(){
				alert('something went wrong')
			});
	});

})(ZD.app('multi'), window);