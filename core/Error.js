//--------------------------------------------------------------------------
//
//  Error (exception)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class 	An error object that become created on specific oops exceptions.
 * 			It is abstract and not thrown normally but its subclasses.
 * 			Error objects are defined as <i>weak</i> in the oops chain. 
 * 			They dont have an address. 
 * 
 * @param {uint}	id		The error id that represents the concrete error.
 * 							It has to be defined. Keep in mind that oops can't
 * 							throw an <i>ArgumentError</i> in this situation.
 * 
 * @param {String}	message	A short description or a part of a description that
 * 							describes the error in more detail.
 * 							If your error id is represented in <i>oopsErrorMessage</i>
 * 							you can define a dynamic part in the message. It is
 * 							merged with the description of the error id.
 * 
 * @requires __Toplevel
 * @requires oopsConst
 * @requires oopsErrorMessage 
 * @public 
 */
function oopsError (id, message)
{
	/*global oopsRoot*/
	/*global Oops*/
	/*global oopsConst*/
	/*global oopsErrorMessage*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
		
	oopsRoot.register (oopsError);
	this._extends = Oops;
	this._extends ();
	this._bind (oopsError);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the error identifier.
	 * 
	 * @default 0
	 * @type uint
	 * 
	 * @private
	 * @ignore
	 */
	var _id;
	
	/**
	 * @description Holds the error description.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _message;
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the id of the thrown error.
	 * 
	 * @returns {uint} 	The error id. 
	 * @type uint
	 * 
	 * @public 
	 * @field
	 */
	this.id = function ()
	{
		return _id;
	};
	
	/**
	 * @description Get a short description of the occured error.
	 * 				Default messages are defined in <i>oopsErrorMessage</i>.
	 * 
	 * @returns {String} 	A short error description. 
	 * @type String
	 * 
	 * @see oopsErrorMessage 
	 * @public 
	 * @field
	 */
	this.message = function ()
	{
		return _message;
	};
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Creates a string that reflects the error details.
	 * 				Unlike the <i>Oops.toString()</i> method it includes
	 * 				also the <i>id</i> and the <i>message</i> for a quick
	 * 				overview.
	 *  
	 * @returns {String}	A string reflection of an error object.
	 * 
	 * @example
	 * <pre><code>
	 * var elem = new oops.model.Element();
	 * alert (elem.toString()); <font color='#449944'>//[Element]</font>
	 * alert (elem); <font color='#449944'>//[Element]</font>
	 * alert (elem.name); <font color='#449944'>//oopsElement</font>
	 * </code></pre>
	 *  
	 * @requires __Toplevel
	 * @requires oopsConst
	 * @public
	 */
	this.toString = function ()
	{
		return '['+this._protected.scopeOf(oopsConst.CLS_NAME)+' id="'+_id+'" message="'+_message+'"]';
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  construct
	//
	//--------------------------------------------------------------------------	
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates an error object.
	 *  
	 * @param {uint}	id		The error id that represents the concrete error.
	 * 							It has to be defined. Keep in mind that oops can't
	 * 							throw an <i>ArgumentError</i> in this situation.
	 * 
	 * @param {String}	message	A short description or a part of a description that
	 * 							describes the error in more detail.
	 * 							If your error id is represented in <i>oopsErrorMessage</i>
	 * 							you can define a dynamic part in the message. It is
	 * 							merged with the description of the error id.
	 * 
	 * @see oopsErrorMessage  
	 * @private
	 */
	var init = function (id, message)
	{
		var msg = oopsErrorMessage["e"+id];
		
		if (msg)
		{
			if (message)
			{
				if (msg.indexOf("%msg%") > -1)
				{
					msg = msg.replace ("%msg%", message);
				}
				else
				{
					msg += " - " + message;
				}
			}
		}
		else
		{
			msg = message;
		}
		
		_id = id;
		_message = msg;
	};	
	
	init (id, message);
}