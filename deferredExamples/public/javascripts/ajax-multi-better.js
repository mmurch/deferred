(function(app, window, undefined){
	
	app.mapsFetched = false;
	app.firstSetFetched = false;
	app.secondSetFetched = false;
	
	app.tryMakeGoogleMap = function(){
		if (!(app.mapsFetched && app.firstSetFetched 
				&& app.secondSetFetched)){
			return;
		}
		app.makeGoogleMap();
	};

	$(function(){

		app.fetchGoogleMaps(function(){
			app.mapsFetched = true;
			app.tryMakeGoogleMap();
		});

		app.fetchMarkers1(function(){
			app.firstSetFetched = true;
			app.tryMakeGoogleMap();
		});
		
		app.fetchMarkers2(function(){
			app.secondSetFetched = true;
			app.tryMakeGoogleMap();
		});

	});

})(ZD.app('multi'), window);