(function(app, window, undefined){

	$(function(){

		$.when(app.fetchGoogleMaps(), 
				app.fetchMarkers1(), 
				app.fetchMarkers2())
			.done(app.makeGoogleMap)
			.fail(function(){
				alert('something went wrong')
			});
	});

})(ZD.app('multi'), window);