(function(app, window, undefined){

	app.fetchGoogleMaps = function(callback){
		var deferred = $.Deferred();

		$.subscribe('mapsLoaded', function(){
			if (callback){
				callback();
			}
			deferred.resolve();
		});

		$.ajax({
			type: 'GET',
			url: 'http://maps.googleapis.com/maps/api/js' + 
				'?sensor=false&callback=googleMapsLoaded',
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

				if (callback){					
					callback();
				}
			}	
		});
	};

	app.fetchMarkers2 = function(callback){
		return $.ajax({
			type: 'GET',
			url: '/api/markers2.json',
			dataType: 'json',
			success: function(resp){
				app.markers = app.markers || [];
				app.markers[1] = resp;

				if (callback){
					callback();
				}
			}	
		});
	};


	//helper functions - pay no attention to the man behind the curtain
	app.makeGoogleMap = function(){

		$.get('/javascripts/StyledMarker.js')
			.done(function(){
				var myOptions = {
		            center: new google.maps.LatLng(40.724250, -73.997781),
		            zoom: 15,
		            mapTypeId: google.maps.MapTypeId.ROADMAP
			    }, i, max;
			    
			    app.googleMap = new google.maps.Map(
			    	document.getElementById('googleMap'),
		            myOptions
		        );

			    for (i = 0, max = app.markers[0].length; i < max; i++) {
			    	app.makeMarker(
			    		'fe812e', 
			    		app.markers[0][i].lat, 
			    		app.markers[0][i].long
		    		);
			    }
		    	if (app.markers[1]){
				    for (i = 0, max = app.markers[1].length; i < max; i++) {
						app.makeMarker(
				    		'00bb41', 
				    		app.markers[1][i].lat, 
				    		app.markers[1][i].long
			    		);
				    }
				}
			});
	};

	app.makeMarker = function(color, lat, long){
		new StyledMarker({
			styleIcon: new StyledIcon(StyledIconTypes.MARKER, { color: color }),
			position: new google.maps.LatLng(lat,long),
			map: app.googleMap
		});
	};

})(ZD.app('multi'), window);

function googleMapsLoaded(){
	$.publish('mapsLoaded');
}