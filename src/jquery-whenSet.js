/*
 * jquery-whenSet
 * https://github.com/danheberden/jquery-whenSet
 *
 * Copyright (c) 2012 Dan Heberden
 * Licensed under the MIT license.
 */
(function($){
  $.whenSet = function(){
    var args = [].slice.call( arguments ),
        promise = $.when.apply( this, args );

    // place the original args onto the set ( [0] => a, [1] => b, etc )
    $.extend( promise, args );

    // add the length property
    promise.length = args.length;

    // add a looping function for the typical promise fn's
    // making doneEach, failEach, alwaysEach, etc
    $.each( ["done", "fail", "always", "pipe"], function( i, f ){
        promise[ f + 'Each' ] = function ( callback ){
            $.each( args, function( h, arg ){
                $.when( arg )[ f ]( callback );
            });
            return promise;
        };
    });
    return promise;
  };
}(jQuery));

