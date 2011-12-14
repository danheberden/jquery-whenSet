$.whenSet = function(){
    var args = [].slice.call( arguments ),
        promise = $.when.apply( this, args );

    // place the original args onto the set ( [0] => a, [1] => b, etc )
    $.extend( promise, args );

    // add a looping function for the typical promise fn's
    // making doneEach, failEach, alwaysEach, etc
    $.each( ["done", "fail", "always", "pipe"], function( i, f ){
        promise[ f + 'Each' ] = function ( callback ){
            $.each( args, function( h, arg ){
                $.when( arg )[ f ]( callback );
            });
            return promise;
        }
    });
    return promise;
};
