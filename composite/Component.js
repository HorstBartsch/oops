//--------------------------------------------------------------------------
//
//  Component (composite pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class 	Represents a component of a composition in the composite pattern.
 * 			 A composite pattern helps you to build complex hierachies.
 * 
 * @param {String} id	Set the identifier of a component.
 * 						Use the id to fetch a component from a <i>composition</i>.
 * 
 * @requires oopsComposite
 * @public  
 */
function oopsComponent (id)
{
	/*global oopsRoot*/
	/*global Oops*/
	/*global oopsComposite*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsComponent);
	this._extends = Oops;
	this._extends ();
	this._bind (oopsComponent);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds a reference of itself for access purpose in non-public methods.
	 * 
	 * @default this
	 * @type oopsComponent
	 * 
	 * @private
	 * @ignore
	 */
	var self = this;
	
	/**
	 * @description Holds the identifier of the component.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _id;
	
	/**
	 * @description Holds the composition where the component is aligned to.
	 * 
	 * @default null
	 * @type oopsComposite
	 * 
	 * @private
	 * @ignore
	 */
	var _parent;
	
	
	//--------------------------------------------------------------------------
	//
	//  scopes
	//
	//--------------------------------------------------------------------------
		
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>internal</span>
	 * 				Set the reference of the superordinated composition. The setter is
	 * 				commonly called by the composition object directly.
	 * 
	 * @param	{oopsComposte} value	The reference of the superordinated composition.
	 * @requires oopsComposite
	 * @private
	 */
	var setParent = function (value)
	{
		self._protected.isOrThrow ("value",value);
		_parent = value;
	};
	
	this._protected.setInternal ("setParent", setParent);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the id of a component.
	 * 
	 * @returns {String}	The id of a component.
	 * @type String
	 * 
	 * @public  
	 * @field
	 */
	this.id = function ()
	{
		return _id;
	};
	
	/**
	 * @description Get the composition object where a component is aligned to.
	 * 
	 * @returns {oopsComposite}	The parent composition object.
	 * @type oopsComposite
	 * 
	 * @public  
	 * @field
	 */
	this.parent = function ()
	{
		return _parent;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  construct
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates a new component. 
	 * 
	 * @param {String} id	Set the identifier of a component.
	 * 						Use the id to fetch a component from a <i>copmosition</i>.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>id</i> is undefined.
	 * 
	 * @see oopsComposite 
	 * @private
	 */
	var init = function (id)
	{
		self._protected.isOrThrow ("id",id);
		_id = id;
	};
	
	init(id);
}