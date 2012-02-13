/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function( $ ) {
  var makeDfd = function( label, reject ){
    var dfd = $.Deferred();
    setTimeout( function(){
      dfd[ reject ? 'reject' : 'resolve' ]( label );
    },1);
    return dfd.promise();
  };

  // make tests for jQuey and underscore
  $.each( { jQuery: $, Underscore: _ }, function( i, $ ){

    module( i + '.whenSet');

    test( 'present?', 1, function(){
      strictEqual( typeof $.whenSet, 'function', 'should totes be a function' );
    });

    test( 'creates a deferred', 1, function(){
      var prom = $.whenSet( {} );
      strictEqual( typeof prom.promise, 'function', 'is a promise' );
    });

    test( 'deferred works like normal', 1, function() {
      stop(1);
      $.whenSet(  makeDfd( true ),  makeDfd( true ) ).done( function() {
        ok( this.promise, "Resolved" );
        start();
      });
    });

    test( 'deferreds added as array', 2, function() {
      var prom = $.whenSet( makeDfd( true ), makeDfd( false, true ) );
      ok( prom[0].promise, "first element promise" );
      ok( prom[1].promise, "second element promise" );
    });

    test( 'doneEach', 4, function() {
      var foundA, foundB, count = 0,
          prom = $.whenSet( makeDfd( 'a' ), makeDfd( 'b' ) );

      ok( prom.doneEach, "doneEach must be present" );
      stop(3);
      prom.doneEach( function( res ) {
          count++;
          if ( /a/.test( res ) ) {
            foundA = true;
            ok( true, 'a resolved' );
          }
          if ( /b/.test( res ) ) {
            foundB = true;
            ok( true, 'b resolved' );
          }

          if ( count === 2 && foundA && foundB ) {
            ok( true, 'got both deferreds in loop' );
            start();
          }
          start();
        });
    });

    test( 'failEach', 4, function() {
      var foundA, foundB, count = 0,
          prom = $.whenSet( makeDfd( 'a', true ), makeDfd( 'b', true ) );

      ok( prom.failEach, "failEach must be present" );
      stop(3);
      prom.failEach( function( res ) {
          count++;
          if ( /a/.test( res ) ) {
            foundA = true;
            ok( true, 'a resolved' );
          }
          if ( /b/.test( res ) ) {
            foundB = true;
            ok( true, 'b resolved' );
          }

          if ( count === 2 && foundA && foundB ) {
            ok( true, 'got both deferreds in loop' );
            start();
          }
          start();
        });
    });
    test( 'alwaysEach', 4, function() {
      var foundA, foundB, count = 0,
          prom = $.whenSet( makeDfd( 'a', true ), makeDfd( 'b' ) );

      ok( prom.alwaysEach, "alwaysEach must be present" );
      stop(3);
      prom.alwaysEach( function( res ) {
          count++;
          if ( /a/.test( res ) ) {
            foundA = true;
            ok( true, 'a resolved' );
          }
          if ( /b/.test( res ) ) {
            foundB = true;
            ok( true, 'b resolved' );
          }

          if ( count === 2 && foundA && foundB ) {
            ok( true, 'got both deferreds in loop' );
            start();
          }
          start();
        });
    });

    test( 'pipeEach', 4, function() {
      var foundA, foundB, count = 0,
          prom = $.whenSet( makeDfd( 'a' ), makeDfd( 'b' ) );

      ok( prom.pipeEach, "pipeEach must be present" );
      stop(3);
      prom.doneEach( function( res ) {
          count++;
          if ( /a/.test( res ) ) {
            foundA = true;
            ok( true, 'a resolved' );
          }
          if ( /b/.test( res ) ) {
            foundB = true;
            ok( true, 'b resolved' );
          }

          if ( count === 2 && foundA && foundB ) {
            ok( true, 'got both deferreds in loop' );
            start();
          }
          start();
        });
    });
  });

 }( jQuery ));
