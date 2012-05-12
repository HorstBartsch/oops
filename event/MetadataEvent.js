//--------------------------------------------------------------------------
//
//  MetadataEvent (observer pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsEvent
 * @class 	Creates a MetadataEvent object that is dispatched when you alter
 * 			metadata properties in a model. (<i>Element</i>)
 * 
 * @param {String}	type	The type of the event. 
 * @param {String}	key		The name of the metadata property.
 * @param {*}		value	The new content of the metadata property.
 * 							The value is optional.
 * 
 * @example	
 * <pre><code>
 * var elem = new oops.model.Element ();
 * elem.addEventListener (oops.event.MetadataEvent.CHANGE, onMetadataChange);
 * elem.addEventListener (oops.event.MetadataEvent.ADD, onMetadataAdd);
 * 			
 * function onMetadataAdd (evt)
 * {
 *  alert ("New metadata available in " + evt.target());
 * }
 * 
 * function onMetadataChange (evt)
 * {
 *  alert ("The value of " + evt.key() + " has changed in " + evt.target());
 * }
 * </code></pre>
 *
 * @see oopsElement
 * @see oopsMetadata
 * @see oopsEventDispatcher
 * @public
 */
function oopsMetadataEvent (type,key,value)
{ 
	/*global oopsRoot*/
	/*global oopsEvent*/
	/*global oopsConst*/
		
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsMetadataEvent);
	this._extends = oopsEvent;
	this._extends (type);
	this._bind (oopsMetadataEvent);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the key of the metadata property.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _key;
	
	/**
	 * @description Holds the content of the metadata property.
	 * 
	 * @default null
	 * @type *
	 * 
	 * @private
	 * @ignore
	 */
	var _value;
    
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
	 * Get the key of the metadata property.
	 * 
	 * @type String
	 * @field
	 * @public
	 */
	this.key = function ()
	{
		return _key;
	};
	
	/**
	 * Get the content of the metadata property.
	 * 
	 * @type String
	 * @field
	 * @public
	 */
	this.value = function ()
	{
		return _value;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Creates a string that reflects the definition of a metadata event.
	 *  
	 * @returns {String}	A string reflection of a metadata event. 
	 * @public
	 */
	this.toString = function ()
	{
		return '['+this._protected.scopeOf(oopsConst.CLS_NAME)+' type="'+this.type()+'" key="'+this.key()+'" value="'+this.value()+'"]';
	};	
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Clone an MetadataEvent.
	 *  
	 * @public
	 */
	this.clone = function ()
	{
		return new oopsMetadataEvent (this.type(),this.key(),this.value());
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  construct
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates a new MetadataEvent. 
	 * 
	 * @param {String}	key		The name of the metadata property.
	 * @param {*}		value	The new content of the metadata property.
	 * 							The value is optional.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>type</i> is undefined.
	 * 
	 * @see oopsEventDispatcher
	 * @private
	 */
	var init = function (key,value)
	{
		self._protected.isOrThrow ("key",key);
		
		_key = key;
		_value = value;
	};
	
	init(key,value);		
}

/**
 * The oopsMetadataEvent.ADD constant defines the value of the type property 
 * of an event object. It is dispatched when a new metadata value becomes defined.
 * 
 * @constant
 * @static
 * @public
 */
oopsMetadataEvent.ADD = "metadata_add";

/**
 * The oopsMetadataEvent.CHANGE constant defines the value of the type property 
 * of an event object. It is dispatched when a metadata value changes.
 * 
 * @constant
 * @static
 * @public
 */
oopsMetadataEvent.CHANGE = "metadata_change";

/**
 * The oopsMetadataEvent.REMOVE constant defines the value of the type property 
 * of an event object. It is dispatched when a metadata value was deleted.
 * 
 * @constant
 * @static
 * @public
 */
oopsMetadataEvent.REMOVE = "metadata_remove";