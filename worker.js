
onmessage = function( e ) {

  if ( e.data === 'lamp' ) {

    for ( i = -2500 ; i <= 2500 ; i += 5000 ) {

      for ( j = -2500 ; j <= 2500 ; j += 5000 ) {

        position = [ ]
        position.push( {
          x : i , z : j } )
        postMessage( position )
        close( )

      }

    }

  }

  if ( e.data === 'lighting' ) {

    for ( i = -2500 ; i <= 2500 ; i += 5000 ) {

      for ( j = -2500 ; j <= 2500 ; j += 5000 ) {

        position = [ ]
        position.push( {
          x : i , z : j } )
        postMessage( position )
        close( )

      }

    }

  }

}
