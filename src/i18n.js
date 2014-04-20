// !requires jquery
var I18N = ( function() {
	// Get source
	var me = $( '#i18n' );
	var default_locale = "EN";

	if( me.length ) {
		// Get I18n file
		var src = me.attr( 'i18n-src' );
		if( !src ) { throw new Error( 'No i18n file given.' ); }
		// Get locale
		var locale = me.attr( 'i18n-locale' );
		if( !locale ) { console.log( 'No i18n locale given. Using "' + default_locale +'" as default.' ); locale = default_locale }
		var i18n = {};
		var full_i18n = {};
		// Load I18N data.
		$.get( src ).done( function( data ) {
			full_i18n = data;
			// Get the data from the locale
			setLocale( locale );
		} ).fail( function( error, errorMessage ) {
			throw new Error( 'Error retrieving the i18n JSON file: ' + errorMessage + '.' );
		} );

	} else {
		throw new Error( 'No i18n script object found.' );
	}

	var setLocale = function( locale ) {
		i18n_tmp = full_i18n[ locale ];
		if( i18n_tmp ) {
			i18n = i18n_tmp;
			apply();
		} else {
			throw new Error( 'Locale ' + locale + ' not supported.' );
		}
	};

	var apply = function() {
		// Get all elements to apply I18N
		var elems = $( "*[i18n-text]");
		elems.each( function( index, object ) {
			var i18n_id = $( object ).attr( 'i18n-text' );
			// Get value
			var i18n_val = I18N.resolve( i18n_id );
			// Set the HTML text
			$( object ).text( i18n_val );
		} );
	};

	var resolve = function( id ) {
		return recursiveResolve( id, i18n ) || id;
	};

	var recursiveResolve = function( id, root ) {
		if( !root ) {
			return undefined;
		}
		var val = root[ id ];
		if( !val && root ) {
			if( id.indexOf( '.' ) > 1 ) {
				var sp = id.split( '.' );
				val = recursiveResolve( id.substring( id.indexOf( '.' ) + 1 ), root[ sp[ 0 ] ] );
			}
		}
		return val;
	}

	return {
		resolve: resolve,
		setLocale: setLocale
	};
} )();