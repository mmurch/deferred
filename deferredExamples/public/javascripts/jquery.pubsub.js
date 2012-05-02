/*!
 * jQuery Tiny Pub/Sub - v0.X - 11/18/2010
 * http://benalman.com/
 * 
 * Original Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * Made awesome by Rick Waldron
 *
 */
 
(function(jQuery){
  var o = jQuery({});
  jQuery.each({ 
    "subscribe" : "bind", 
    "unsubscribe" : "unbind", 
    "publish" : "trigger" 
  }, function ( fn, api ) {
    jQuery[ fn ] = function() {
      o[ api ].apply( o, arguments );
    };
  });
})(jQuery);

