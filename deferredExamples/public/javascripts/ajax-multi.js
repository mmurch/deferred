(function(app, window, undefined){

	$(function(){

		app.fetchGoogleMaps();

	});

	app.fetchGoogleMaps = function(){
		$.subscribe('mapsLoaded', function(){
			fetchFirstMarkerSet();
		});

		$.ajax({
			type: 'GET',
			url: 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=maps',
			dataType: 'script',
			error: function(jqXHR, textStatus, errorThrown){
				alert(textStatus);
			}
		});
	}

	app.fetchFirstMarkerSet = function(){
		$.ajax({
			type: 'GET',
			url: '/api/markers.json',
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown){
				alert(textStatus);
			},
			success: function(resp){
				app.markers = app.markers || [];
				app.markers[0] = resp;
				app.fetchSecondMarkerSet();
			}	
		})
	};

	app.fetchSecondMarkerSet = function(){
		$.ajax({
			type: 'GET',
			url: '/api/markers2.json',
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown){
				alert(textStatus);
			},
			success: function(resp){
				app.markers = app.markers || [];
				app.markers[1] = resp;
				app.makeGoogleMap();
			}	
		})
	};

})(ZD.app('multi'), window)

