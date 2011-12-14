# $.whenSet

Lets you create a set with $.whenSet and make independant deferreds as
well as a complete one. 

For example:

    $.whenSet( anAsyncFunction, anotherAsyncFunction )
     .doneEach( function( result ){
       console.log( result, ' just finished' );
     })
     .done( function( resultA, resultB ){
       console.log( 'all done!' );
     });

It has `doneEach`, `failEach`, `alwaysEach`, `pipeEach` as well as
putting the arguments onto the promise, like [0] => arg1, [1] => arg2,
etc. 
