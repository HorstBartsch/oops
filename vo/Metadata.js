//--------------------------------------------------------------------------
//
//  Metadata (value object)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class 	Creates a new metadata object that can be used as a stack
 * 			of key-value pairs. It is used in <i>resource</i> objects
 * 			to invoke a model by a factory.
 * 
 * @see oopsResource
 * @public
 */
function oopsMetadata ()
{
	/*global Oops*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	this._extends = Oops;
	this._extends (true);
	this._bind(oopsMetadata);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the added metadata key-value pairs.
	 * 
	 * @default {}
	 * @type Object
	 * 
	 * @private
	 * @ignore
	 */
	var _metadata = {};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods) 
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description Returns a metadata value by a key.
     * @param {String} key	The key of the metadata to fetch.
	 * 
	 * @returns {*} The metadata value of the key.
	 *              If no key is defined the return value is null.
	 * 
	 * @public
	 */
	this.getValueOf = function(key)
	{
		return _metadata[key];
	};
	
	/** 
	 * @description Add a metadata value.
	 * 
     * <p>
     * If no key is defined the value is not added to the metadata.
     * </p>
     *
	 * @param {String}	key		The key of the metadata to add.
	 * @param {*} 		value	The content of the metadata to add.
	 * 
	 * @public
	 */
	this.setValue = function(key,value)
	{
        if (key)
        {
            _metadata[key] = value;
        }
	};
	
	/** 
	 * @description Removes a metadata value by its key. 
     *
     * <p>
     * If no key is defined the value is not removed.
     * </p>
	 * 
	 * @param {String} key	The key of the metadata to remove.
	 * 
	 * @public
	 */
	this.removeValueOf = function(key)
	{
		if (key)
        {
            delete _metadata[key];
        }
	};
}