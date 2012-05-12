//--------------------------------------------------------------------------
//
//  RangeError (exception)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsError
 * @class 	An error object that become created on specific oops exceptions.
 * 			The range error is commonly created when you work with numbers
 * 			that are out of specified boundaries.
 * 			It is abstract and not thrown normally but its subclasses.
 * 			Error objects are defined as <i>weak</i> in the oops chain. 
 * 			They dont have an address. 
 * 
 * @param {uint}	id		The error id that represents the range error.
 * 							It has to be defined.
 * 
 * @param {String}	message	A short description or a part of a description that
 * 							describes the range error in more detail.
 * 							If your error id is represented in <i>oopsErrorMessage</i>
 * 							you can define a dynamic part in the message. It is
 * 							merged with the description of the error id.
 * 
 * @public 
 */
function oopsRangeError (id,message)
{
	/*global oopsError*/
	/*global oopsRoot*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsError);
	this._extends = oopsError;
	this._extends (id,message);
	this._bind (oopsRangeError);
}