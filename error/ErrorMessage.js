//--------------------------------------------------------------------------
//
//  Error descriptions
//
//--------------------------------------------------------------------------

/**
 * @class 	The ErrorMessage object provides short descriptions for error objects
 * 			that are thrown on exceptions.
 * 
 * @name oopsErrorMessage
 * @see oopsError
 */
var oopsErrorMessage =
/** @lends oopsErrorMessage# */
{
	/**
	 * @description	e1000 defines the id of an error that is thrown 
	 * 				on actions with invalid signature handling.
	 * 
	 * @see oopsTypeError
	 * 
	 * @constant
	 * @type String
	 */
	e1000: "Invalid signature, %msg% expected.",
	
	/**
	 * @description	e1001 defines the id of an error that is thrown 
	 * 				on actions with invalid signature handling.
	 * 				Unlike e1000 where the super class has to match
	 * 				the type, e1001 needs to be exactly this type.
	 * 
	 * @see oopsTypeError
	 * 
	 * @constant
	 * @type String
	 */
	e1001: "Invalid signature, strict %msg% expected.",
		
	/**
	 * @description	e2000 defines the id of an error that is thrown 
	 * 				on actions with invalid arguments.
	 * 
	 * @see oopsArgumentError
	 * 
	 * @constant
	 * @type String
	 */
	e2000: "Missing argument, %msg% is undefined.",
		
	/**
	 * @description	e3000 defines the id of an error that is thrown 
	 * 				on actions with invalid ranges.
	 * 
	 * @see oopsRangeError
	 * 
	 * @constant
	 * @type String
	 */
	e3000: "%msg% is out of range.",
		
	/**
	 * @description	e4000 defines the id of an error that is thrown 
	 * 				on actions with invalid protected scope handling.
	 * 
	 * @see oopsInvalidOperationError
	 * 
	 * @constant
	 * @type String
	 */
	e4000: "%msg% is protected.",
		
	/**
	 * @description	e4001 defines the id of an error that is thrown 
	 * 				on actions with invalid internal scope handling.
	 * 
	 * @see oopsInvalidOperationError
	 * 
	 * @constant
	 * @type String
	 */
	e4001: "%msg% is internal.",
		
	/**
	 * @description	e4002 defines the id of an error that is thrown 
	 * 				on actions with invalid super scope handling.
	 * 
	 * @see oopsInvalidOperationError
	 * 
	 * @constant
	 * @type String
	 */
	e4002: "%msg% not defined in super.",
		
	/**
	 * @description	e4010 defines the id of an error that is thrown 
	 * 				on actions with disposed oops objects.
	 * 
	 * @see oopsInvalidOperationError
	 * @see oopsChainManager
	 * 
	 * @constant
	 * @type String
	 */
	e4010: "%msg% disposed.",
		
	/**
	 * @description	e4100 defines the id of an error that is thrown 
	 * 				on actions that tries to define method scopes.
	 * 
	 * @see oopsInvalidOperationError
	 * @see Oops
	 * 
	 * @constant
	 * @type String
	 */
	e4100: "%msg% must be invoked within the instance."
};