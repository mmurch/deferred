(function(app, window, undefined){
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