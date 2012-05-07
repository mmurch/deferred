
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'jQuery Deferred'
  });
});

app.get('/ajax-multi', function(req, res){
  res.render('ajax-multi', {
    title: 'Multiple Ajax Calls'
  });
});

app.get('/ajax-multi-better', function(req, res){
  res.render('ajax-multi-better', {
    title: 'Multiple Ajax Calls - Better'
  });
});

app.get('/ajax-multi-best', function(req, res){
  res.render('ajax-multi-best', {
    title: 'Multiple Ajax Calls - Best'
  });
});

app.get('/api/markers.json', function(req, res){

});

app.get('/api/markers2.json', function(req, res){
  
});

app.get('/animation', function(req, res){
  res.render('animation', {
    title: 'Animation'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
