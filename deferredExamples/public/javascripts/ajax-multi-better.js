(function(app, window, undefined){
	
	app.mapsFetched = false;
	app.firstSetFetched = false;
	app.secondSetFetched = false;
	
	app.fetchGoogleMaps = function(){
		$.subscribe('mapsLoaded', function(){
			app.mapsFetched = true;
			app.tryMakeGoogleMap();
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
				app.firstSetFetched = true;
				app.tryMakeGoogleMap();
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
				app.secondSetFetched = true;
				app.tryMakeGoogleMap();
			}	
		})
	};

	app.tryMakeGoogleMap = function(){
		if (!(app.mapsFetched && app.firstSetFetched && app.secondSetFetched)){
			return;
		}

		app.makeGoogleMap();
	};

	$(function(){

		app.fetchGoogleMaps();
		app.fetchFirstMarkerSet();
		app.fetchSecondMarkerSet();

	});

})(ZD.app('multi'), window);