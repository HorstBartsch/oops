//--------------------------------------------------------------------------
//
//  Constants
//
//--------------------------------------------------------------------------

/**
 * @class 	The Toplevel object defines global settings, constants and functions
 * 			of the oops framework. 
 * 
 * <p>The Toplevel ist just an alias.</p>
 * <li>For constants please reference the <i>oopsConst</i> object.</li>
 * <li>For settings and methods focus the <i>oopsRoot</i> object.</li>
 * 
 * @name __Toplevel
 */
var oopsConst = 
/** @lends __Toplevel# */
{
		
	/**
	 * @description	The <i>oopsConst.CLS</i> constant defines a value to fetch
	 * 				the signature of a class in an oops object.
	 * 
	 * @see Oops#scopeOf
	 * 
	 * @constant
	 * @type String
	 */
	CLS: "cls",
	
	/**
	 * @description	The <i>oopsConst.CLS_NAME</i> constant defines a value to fetch
	 * 				the name of a class in an oops object.
	 * 
	 * @see Oops#scopeOf
	 * 
	 * @constant
	 * @type String
	 */
	CLS_NAME: "cls_name",
	
	/**
	 * @description	The <i>oopsConst.PKG</i> constant defines a value to fetch
	 * 				the signature of a package in an oops object.
	 * 
	 * @see Oops#scopeOf
	 * 
	 * @constant
	 * @type String
	 */
	PKG: "pkg",
	
	/**
	 * @description	The <i>oopsConst.PKG_NAME</i> constant defines a value to fetch
	 * 				the name of a package in an oops object.
	 * 
	 * @see Oops#scopeOf
	 * 
	 * @constant
	 * @type String
	 */
	PKG_NAME: "pkg_name"
};