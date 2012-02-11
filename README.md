# $.whenSet

Create a deferred for all arguments independently and exposes iterative methods, such as doneEach and failEach
as well as a deferred for all objects as a set.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/danheberden/jquery-whenSet/master/dist/jquery-whenSet.min.js
[max]: https://raw.github.com/danheberden/jquery-whenSet/master/dist/jquery-whenSet.js

## Example:

```javascript
    $.whenSet( anAsyncFunction, anotherAsyncFunction )
     .doneEach( function( result ){
       console.log( result, ' just finished' );
     })
     .done( function( resultA, resultB ){
       console.log( 'all done!' );
     });
```

The returned promise will has the `doneEach`, `failEach`, `alwaysEach`, `pipeEach` exposed
as well as putting the arguments onto one promise as an array, like [0] => arg1, [1] => arg2,
etc.

Here's  a demo: http://jsfiddle.net/danheberden/YRB4P/

## Contributing
Moar unit tests

## Release History
v1.0.0 - used grunt to make awesome

v0.0.1 - initial release

## License
Copyright (c) 2012 Dan Heberden
Licensed under the MIT license.
