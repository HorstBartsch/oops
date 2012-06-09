//--------------------------------------------------------------------------
//
//  TraitEvent (observer pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsEvent
 * @class 	Creates a TraitEvent object that is dispatched when a
 * 			traits are added to or removed from a model.
 * 
 * @param {String}		type		The type of the event. 
 * @param {String}		traitType	The type of the trait.
 * 
 * @example	
 * <pre><code>
 * var elem = new oops.model.Element ();
 * elem.addEventListener (oops.event.TraitEvent.ADD, onTraitAdd);
 * elem.addTrait ("myTrait", new oops.trait.Trait("myTrait"));
 * 			
 * function onTraitAdd (evt)
 * {
 *  alert (evt.traitType() + " added to " + evt.target());
 * }
 * </code></pre>
 * 
 * @see oopsTrait
 * @see oopsElement
 * @see oopsEventDispatcher
 * @public
 */
function oopsTraitEvent (type,traitType)
{ 
	/*global oopsRoot*/
	/*global oopsEvent*/
	/*global oopsConst*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsTraitEvent);
	this._extends = oopsEvent;
	this._extends (type);
	this._bind (oopsTraitEvent);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the type of a trait.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _traitType;
    
    /**
	 * @description Holds a reference of itself for access purpose in non-public methods.
	 * 
	 * @default this
	 * @type oopsEvent
	 * 
	 * @private
	 * @ignore
	 */
	var self = this;
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Get the type of the related trait.
	 * 
	 * @type String
	 * @field
	 * @public
	 */
	this.traitType = function ()
	{
		return _traitType;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Creates a string that reflects the definition of a trait event.
	 *  
	 * @returns {String}	A string reflection of a trait event. 
	 * @public
	 */
	this.toString = function ()
	{
		return '['+this._protected.scopeOf(oopsConst.CLS_NAME)+' type="'+this.type()+'" traitType="'+this.traitType()+'"]';
	};	
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Clone an traitEvent.
	 *  
	 * @public
	 */
	this.clone = function ()
	{
		return new oops.event.TraitEvent (this.type(),this.traitType());
	};
	
	//--------------------------------------------------------------------------
	//
	//  construct
	//
	//--------------------------------------------------------------------------	
	
		
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates a new TraitEvent. 
	 * 
	 * @param {String} traitType	The type of the trait.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>traitType</i> is undefined.
	 * 
	 * @see oopsEventDispatcher
	 * @private
	 */
	var init = function (traitType)
	{
		self._protected.isOrThrow ("traitType",traitType);	
		_traitType = traitType;
	};
	
	init(traitType);
	
}

/**
 * The oopsTraitEvent.ADD constant defines the value of the type property 
 * of an event object. It is dispatched when a trait was added to a model.
 * 
 * @constant
 * @static
 * @public
 */
oopsTraitEvent.ADD = "trait_add";

/**
 * The oopsTraitEvent.REMOVE constant defines the value of the type property 
 * of an event object. It is dispatched when a trait was removed from a model.
 * 
 * @constant
 * @static
 * @public
 */
oopsTraitEvent.REMOVE = "trait_remove";