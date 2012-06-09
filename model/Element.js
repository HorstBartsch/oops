//--------------------------------------------------------------------------
//
//  Element (model)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsEventDispatcher
 * @class Creates a new model representation in the oops framework.
 * 
 * <p>
 * There are some basic features an element model implements:
 * </p>
 * 
 * <li>it can dispatch events</li>
 * <li>you can work with traits</li>
 * <li>while you can work with traits you can also work with states</li>
 * <li>you can wrap and decorate them</li>
 * <li>you can easily create them through factories</li>
 * <li>you can listen to metadata changes</li>
 * 
 * <p style='font-size:14px;'><b>dispatched events:</b></p>
 * <li>oopsTraitEvent.REMOVE - <i>when a new trait was added</i></li>
 * <li>oopsTraitEvent.REMOVE - <i>when a trait was removed</i></li>
 * <li>oopsMetadataEvent.CHANGE - <i>when a value changes</i></li>
 * <li>oopsMetadataEvent.ADD - <i>when a new value was added</i></li>
 * <li>oopsMetadataEvent.REMOVE - <i>when a value was removed</i></li>
 * 
 * @see oopsElementFactory Create an element by a factory and using a proxy.
 * @see oopsTrait Working with traits.
 * @see oopsState Working with states.
 * @see oopsMetadataEvent Working with metadata.
 *
 * @see oopsTrait
 * @see oopsElementType
 * @see oopsProxyElement
 * @public
 */
function oopsElement ()
{
	/*global oopsRoot*/
	/*global oops*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------	
	
	oopsRoot.register (oopsElement);
	this._extends = oopsEventDispatcher;
	this._extends ();	
	this._bind(oopsElement);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the resource that was used by factory invokation.
	 * 				If the element wasn't created by a factory it become
	 * 				created by the element itself.
	 * 
	 * @default null
	 * @type oopsResource
	 * 
	 * @private
	 * @ignore
	 */
	var _resource;
	
	/**
	 * @description Holds the type of the element.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _type;
	
	/**
	 * @description Holds the aligned trait objects.
	 * 
	 * @default {}
	 * @type Object
	 * 
	 * @private
	 * @ignore
	 */
	var _traits = {};
	
	/**
	 * @description Holds the types of the aligned trait objects.
	 * 
	 * @default []
	 * @type Array
	 * 
	 * @private
	 * @ignore
	 */
	var _traitTypes = [];
	
	
	//--------------------------------------------------------------------------
	//
	//  scopes
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Set the type of an element.
	 * 
	 * @param	{String} value	The type of the element.
	 * 
	 * @see oopsElementType
	 * @private
	 * @field
	 */
	var setType = function (value)
	{ 
		_type = value;
	};
	
	this._protected.setProtected ("setType", setType);
	this._protected.setType (oops.model.ElementType.DEFAULT);	
	this._protected.setSuper ("dispose", this.dispose);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the type of an element.
	 * 
	 * @type String
	 * 
	 * @public  
	 * @field
	 */
	this.type = function ()
	{
		return _type;
	};
	
	/**
	 * @description Get the resource of an element.
	 * 				The resource becomes defined by factory invokation.
	 * 				If the element wasn't created by a factory it become
	 * 				created by the element itself.
	 * 
	 * @type oopsResource
	 * 
	 * @public  
	 * @field
	 */
	this.resource = function ()
	{
		if (!_resource)
		{
			_resource = new oops.vo.Resource();
		}
		return _resource;
	};
	
	/**
	 * @description Set the resource of an element.
	 * 				Usually this is done by factory invokation.
	 *
	 * <p>
	 * If you use proxy elements keep in mind that all elements
	 * share the same resource.
	 * </p>
	 * 
	 * @type oopsResource
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>value</i> is undefined.
	 * @throws 	{oopsTypeError}		If the argument <i>value</i> is not from type oopsResource.
	 * 
	 * @public  
	 * @field
	 */
	this.setResource = function (value)
	{
		this._protected.isOrThrow("resource", value, oopsResource);		
		_resource = value;	
	};
	
	/**
	 * @description Get the types of all aligned trait objects.
	 * 
	 * @type Array
	 * 
	 * @public  
	 * @field
	 */
	this.traitTypes = function ()
	{
		return _traitTypes.concat();
	};
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods, overridden Oops)
	//
	//--------------------------------------------------------------------------
	
		
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Deconstruct the chain dependencies of an Element reference 
	 * 				and the attached traits. The related resource and metadata 
	 * 				are not disposed!
	 * 
	 * @public
	 */
	this.dispose = function ()
	{
		for (var prop in _traits)
		{
			if (_traits.hasOwnProperty (prop))
			{
				_traits[prop].dispose ();
			}			
		}
		
		this._super.dispose ();		
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description Returns a value from the metadata property of the resource object
	 * 				by a key. 
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
		return this.resource().getValueOf(key);
	};
	
	/** 
	 * @description Add a value to the metadata property of the resource object.
	 * 				<p style='font-size:14px;'><b>dispatched events:</b></p>
	 * 				<li>oopsMetadataEvent.CHANGE - <i>when a value changes</i></li>
	 * 				<li>oopsMetadataEvent.ADD - <i>when a new value was added</i></li>
	 * 
	 * @param {String}	key		The key of the metadata to add.
	 * @param {*} 		value	The content of the metadata to add.
	 * 
	 * @see oopsMetadata
	 *  @see oopsMetadataEvent
	 * @see oopsResource
	 * @public
	 */
	this.addMetadata = function(key,value)
	{
		var type = oops.event.MetadataEvent.ADD;
		
		if (this.resource().getValueOf(key))
		{
			type = oops.event.MetadataEvent.CHANGE;
		}
		
		this.resource().setValue (key,value);
		this.dispatchEvent (new oops.event.MetadataEvent(type,key,value));
	};
	
	/** 
	 * @description Removes a value from the metadata property of the resource object
	 * 				by a key. 
	 * 				<p style='font-size:14px;'><b>dispatched events:</b></p>
	 * 				<li>oopsMetadataEvent.REMOVE - <i>when a value was removed</i></li>
	 * 
	 * @param {String} key	The key of the metadata to remove.
	 * 
	 * @see oopsMetadata
	 * @see oopsResource
	 * @public
	 */
	this.removeMetadata = function(key)
	{
		this.resource().removeValueOf (key);
		this.dispatchEvent (new oops.event.MetadataEvent(oops.event.MetadataEvent.REMOVE,key));
	};
	
	/** 
	 * @description Proof if an element has a specific trait by
	 * 				the type of the trait.
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
		return (_traits[type] !== null);
	};
	
	/** 
	 * @description Returns a trait of an element by a trait type.
	 * 				If the trait not exists the return value is <i>null</i>.
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
		return _traits[type];
	};
	
	/** 
	 * @description Add a new trait.
	 * 				<p style='font-size:14px;'><b>dispatched events:</b></p>
	 * 				<li>oopsTraitEvent.ADD - <i>when a new trait was added</i></li>
	 *  
	 * @param {String} 		type	The type of the trait.
	 * @param {oopsTrait} 	trait	The reference of the trait.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>type</i> is undefined.
	 * @throws 	{oopsArgumentError}	If the argument <i>trait</i> is undefined.
     * @throws 	{oopsTypeError}	If the argument <i>trait</i> is not type of oopsTrait.
	 * 
	 * @see oopsTrait
	 * @public
	 */
	this.addTrait = function (type,trait)
	{
		this._protected.isOrThrow("type", type);
		this._protected.isOrThrow("trait", trait, oopsTrait);
		
		_traits[type] = trait;
		_traitTypes.push (type);
		
		this.dispatchEvent (new oops.event.TraitEvent(oops.event.TraitEvent.ADD, type));
	};
	
	/** 
	 * @description Remove a trait.
	 * 				<p style='font-size:14px;'><b>dispatched events:</b></p>
	 * 				<li>oopsTraitEvent.REMOVE - <i>when a trait was removed</i></li>
	 * 
	 * @param {String} type	The type of the trait.
	 * @returns {oopsTrait} The removed trait object if exsists otherwise null.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>type</i> is undefined.
	 * @throws 	{oopsArgumentError}	If the argument <i>trait</i> is undefined.
	 * 
	 * @see oopsTrait
	 * @public
	 */
	this.removeTrait = function (type)
	{
		this._protected.isOrThrow("type", type);
		
		var trait;

		if (_traits[type])
		{
			trait = _traits[type];
			trait.dispose();
			
			_traitTypes.splice(_traitTypes.indexOf(type),1);
			delete _traits[type];
			
			this.dispatchEvent (new oops.event.TraitEvent(oops.event.TraitEvent.REMOVE, type));			
		}	
		
		return trait;
	};
}