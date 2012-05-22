(function(app, window, undefined){

	$(function(){

		app.fetchGoogleMaps(function(){
			app.fetchMarkers1(function(){
				app.fetchMarkers2(function(){
					app.makeGoogleMap();
				});
			});
		});

	});

})(ZD.app('multi'), window)

