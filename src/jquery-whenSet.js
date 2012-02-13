/*
 * jquery-whenSet
 * https://github.com/danheberden/jquery-whenSet
 *
 * Copyright (c) 2012 Dan Heberden
 * Licensed under the MIT license.
 */
(function( window ){
  var lib = window.jQuery || window._;
  if ( !lib.when ) {
    throw new Error( "jQuery or underscore.Deferred missing" );
  }
  lib.whenSet = function(){
    var args = [].slice.call( arguments ),
        promise = lib.when.apply( this, args );

    // place the original args onto the set ( [0] => a, [1] => b, etc )
    lib.extend( promise, args );

    // add the length property
    promise.length = args.length;

    // add a looping function for the typical promise fn's
    // making doneEach, failEach, alwaysEach, etc
    lib.each( ["done", "fail", "always", "pipe"], function( a, b ){
      // jQ and _ flip the args, so get the non-numeric one.
      var fn = +a + 1 ? b : a;
      promise[ fn + 'Each' ] = function ( callback ){
          for ( var i = 0; i < args.length; i++ ) {
            // make a new dfd with when for the one arg
            // with the right fn called
            lib.when( args[i] )[ fn ]( callback );
          }
          return promise;
      };
     });

     return promise;
   };
}(this));

