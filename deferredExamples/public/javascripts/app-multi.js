(function(app, window, undefined){
	app.makeGoogleMap = function(){

		$.get('/javascripts/StyledMarker.js')
			.done(function(){
				var myOptions = {
		            center: new google.maps.LatLng(40.724250, -73.997781),
		            zoom: 15,
		            mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			    
			    app.googleMap = new google.maps.Map(
			    	document.getElementById('googleMap'),
		            myOptions
		        );

			    for (var i = 0, max = app.markers[0].length; i < max; i++) {
			    	new google.maps.Marker({
			    		clickable: false,
			    		map: app.googleMap,
			    		position: new google.maps.LatLng(
			    			app.markers[0][i].lat,
			    			app.markers[0][i].long)
			    	});
			    }

			    for (var j = 0, max = app.markers[1].length; j < max; j++) {
					new StyledMarker({
						styleIcon: new StyledIcon(
							StyledIconTypes.MARKER,
							{
								color:"66FF33"
							}),
						position: new google.maps.LatLng(
			    			app.markers[1][j].lat,
			    			app.markers[1][j].long),
						map: app.googleMap
					});
			    }
			});
	};
})(ZD.app('multi'), window);

function googleMapsLoaded(){
	$.publish('mapsLoaded');
}