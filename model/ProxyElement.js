//--------------------------------------------------------------------------
//
//  ProxyElement (model)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsElement
 * @class 	Creates a new proxy model representation to wrap or decorate other
 * 			element models.
 * 
 * <p style='font-size:14px;'><b>dispatched events:</b></p>
 * <li>oopsTraitEvent.REMOVE - <i>when a new trait was added</i></li>
 * <li>oopsTraitEvent.REMOVE - <i>when a trait was removed</i></li>
 * <li>oopsMetadataEvent.CHANGE - <i>when a value changes</i></li>
 * <li>oopsMetadataEvent.ADD - <i>when a new value was added</i></li>
 * <li>oopsMetadataEvent.REMOVE - <i>when a value was removed</i></li>
 * 
 * @param {oopsElement} proxiedElement	An element to wrap or decorate.
 * 										The value is optional.
 * 
 * @see oopsElement
 * @public
 */
function oopsProxyElement (proxiedElement)
{
	/*global oopsRoot*/
	/*global oopsElement*/
	/*global oopsMetadataEvent*/
	/*global oopsTraitEvent*/
		
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsProxyElement);
	this._extends = oopsElement;
	this._extends ();	
	this._bind(oopsProxyElement);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	var _proxiedElement;	
	var self = this;
	
	
	//--------------------------------------------------------------------------
	//
	//  scope
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Event listener that re-dispatch events from the proxied element.
	 * 
	 * @param	{oopsEvent} event	An event that was dispatched from the proxied element.
	 * 
	 * @private
	 * @ignore
	 */
	var onProxiedEvent = function (event)
	{
		self.dispatchEvent (event.clone());
	};
	
	this._protected.setProtected ("onProxiedEvent",onProxiedEvent);
	
	//public methods are not automaticly defined in the super scope
	//so we have to remind them for further processing
	this._protected.setSuper ("traitTypes",this.traitTypes);
	this._protected.setSuper ("hasTrait",this.hasTrait);
	this._protected.setSuper ("getTrait",this.getTrait);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter) 
	//
	//--------------------------------------------------------------------------	
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Get the resource of the element.
	 * 				The resource becomes defined by factory invokation.
	 * 				If the element wasn't created by a factory it become
	 * 				created by the element itself.
	 * 
	 * <p>
	 * Proxy elements and the main element share the same resource.
	 * </p>
	 * 
	 * @type oopsResource
	 * 
	 * @public  
	 * @field
	 */
	this.resource = function()
	{
		return _proxiedElement.resource();
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Set the resource of an element.
	 * 				Usually this is done by factory invokation.
	 * 
	 * <p>
	 * Proxy elements and the main element share the same resource.
	 * </p>
	 * 
	 * @type oopsResource
	 * 
	 * @public  
	 * @field
	 */
	this.setResource = function (value)
	{ 
		_proxiedElement.setResource(value);
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Get the types of all aligned trait objects. In a proxy element all traits
	 * 				of the proxied elements are merged to a single array.
	 * 
	 * @type Array
	 * 
	 * @public  
	 * @field
	 */
	this.traitTypes = function ()
	{
		return this._super.traitTypes().concat(_proxiedElement.traitTypes());
	};
	
	/**
	 * @description Get the proxied element.
	 * 
	 * @type oopsElement
	 * 
	 * @public  
	 * @field
	 */
	this.proxiedElement = function()
	{
		return _proxiedElement;
	};
	
	/**
	 * @description Set the proxied element.
	 * 				Usually done by a factory instance.
	 * 
	 * <p>
	 * Defining a new proxied element will cut all event listeners from
	 * the old reference and realign them to the new one.
	 * </p>
	 * 
	 * @type oopsElement
	 * @throws 	{oopsArgumentError}	If the argument <i>value</i> is undefined.
	 * 
	 * @public  
	 * @field
	 */
	this.setProxiedElement = function (value)
	{
		this._protected.isOrThrow ("traitType",value);
		
		if (_proxiedElement)
		{
			_proxiedElement.removeEventListener (oopsMetadataEvent.ADD, this._protected.onProxiedEvent);
			_proxiedElement.removeEventListener (oopsMetadataEvent.CHANGE, this._protected.onProxiedEvent);
			_proxiedElement.removeEventListener (oopsMetadataEvent.REMOVE, this._protected.onProxiedEvent);
			_proxiedElement.removeEventListener (oopsTraitEvent.ADD, this._protected.onProxiedEvent);
			_proxiedElement.removeEventListener (oopsTraitEvent.REMOVE, this._protected.onProxiedEvent);
		}
	
		_proxiedElement = value; 		
		_proxiedElement.addEventListener (oopsMetadataEvent.ADD, this._protected.onProxiedEvent);
		_proxiedElement.addEventListener (oopsMetadataEvent.CHANGE, this._protected.onProxiedEvent);
		_proxiedElement.addEventListener (oopsMetadataEvent.REMOVE, this._protected.onProxiedEvent);
		_proxiedElement.addEventListener (oopsTraitEvent.ADD, this._protected.onProxiedEvent);
		_proxiedElement.addEventListener (oopsTraitEvent.REMOVE, this._protected.onProxiedEvent);
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods) 
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Returns a value from the metadata property of the resource object
	 * 				by a key. 
	 * 
	 * <p>
	 * Proxy elements and the main element share the same resource. Because of that
	 * they also share the same metadata.
	 * </p>
	 * 
	 * @param {String} key	The key of the metadata to fetch.
	 * 
	 * @returns {*} The metadata value of the key.
	 * 
	 * @see oopsMetadata
	 * @see oopsResource
	 * @public
	 */
	this.getMetadata = function(key)
	{
		return _proxiedElement.getMetadata(key);
	};
	
	/** 
	 * @description 	<span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 					Add a value to the metadata property of the resource object.
	 * 
	 * @param {String}	key		The key of the metadata to add.
	 * @param {*} 		value	The content of the metadata to add.
	 * 
	 * <p>
	 * Proxy elements and the main element share the same resource. Because of that
	 * they also share the same metadata.
	 * </p>
	 * 
	 * @see oopsMetadata
	 * @see oopsResource
	 * @public
	 */
	this.addMetadata = function(key,value)
	{
		_proxiedElement.addMetadata (key,value);
	};
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Removes a value from the metadata property of the resource object
	 * 				by a key. 
	 * 
	 * <p>
	 * Proxy elements and the main element share the same resource. Because of that
	 * they also share the same metadata.
	 * </p>
	 * 
	 * @param {String} key	The key of the metadata to remove.
	 * 
	 * @see oopsMetadata
	 * @see oopsResource
	 * @public
	 */
	this.removeMetadata = function(key)
	{
		_proxiedElement.removeMetadata (key);
	};
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Proof if an element has a specific trait by the type of the trait.
	 * 
	 * <p>
	 * This will inspect all proxied elements and the called element itself.
	 * </p>
	 * 
	 * @param {String} type	The type of the trait.
	 * @returns {Boolean} True if the trait is available otherwise false.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>type</i> is undefined.
	 * 
	 * @see oopsTrait
	 * @public
	 */
	this.hasTrait = function (type)
	{
		this._protected.isOrThrow("type", type);
		
		var result = false;
		
		if (this._super.hasTrait(type))
		{
			result = true;
		}
		
		else if (_proxiedElement.hasTrait(type))
		{
			result = true;
		}
		
		return result;
	};
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Returns a trait of an element by a trait type.
	 * 				If the trait not exists the return value is <i>null</i>.
	 * 
	 * <p>
	 * This will inspect all proxied elements and the called element itself.
	 * </p>
	 * 
	 * @param {String} type	The type of the trait.
	 * @returns {oopsTrait} The requested trait object if exsists otherwise null.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>type</i> is undefined.
	 * 
	 * @see oopsTrait
	 * @public
	 */
	this.getTrait = function (type)
	{
		this._protected.isOrThrow("type", type);
		
		var result = this._super.getTrait(type);
		
		if (!result)
		{
			result = _proxiedElement.getTrait(type);
		}
		
		return result;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  construct 
	//
	//--------------------------------------------------------------------------
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates a new proxy element. 
	 * 
	 * @param {oopsElement} proxiedElement	An element to wrap or decorate.
	 * 										The value is optional.
	 * 
	 * @private
	 */
	var init = function (proxiedElement)
	{
		self._protected.setType (oopsElementType.PROXY);
		if (proxiedElement)
		{
			self.setProxiedElement (proxiedElement);
		}
	};
	
	init (proxiedElement);	
}