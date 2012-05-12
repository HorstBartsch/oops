//--------------------------------------------------------------------------
//
//  Resource (value object)
//
//--------------------------------------------------------------------------
//Todo weak

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class 	Creates a new resource object that can be used to create
 * 			objects by a factory.
 * 
 * <p>
 * The base resource object just operates on the the internal <i>Metadata</i> object.
 * Usually you would extend the default resource object to create your specific resources
 * that are later passed to a factory instance.
 * </p>
 * 
 * @see oopsMetadata
 * @see oopsFactory
 * @public
 */
function oopsResource ()
{
	/*global oopsRoot*/
	/*global Oops*/
	/*global oopsMetadata*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	
	this._extends = Oops;
	this._extends (true);
	this._bind (oopsResource);
		
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the metadata object to store key-value pairs.
	 * 
	 * @default oopsMetadata
	 * @type oopsMetadata
	 * 
	 * @private
	 * @ignore
	 */
	var _metadata = new oopsMetadata ();
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods) 
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description Returns a metadata value by a key.
	 * 
	 * @param {String} key	The key of the metadata to fetch.
	 * 
	 * @returns {*} The metadata value of the key.
	 * 
	 * @public
	 */
	this.getValueOf = function(key)
	{
		return _metadata.getValueOf (key);
	};
	
	/** 
	 * @description Add a metadata value.
	 * 
	 * @param {String}	key		The key of the metadata to add.
	 * @param {*} 		value	The content of the metadata to add.
	 * 
	 * @public
	 */
	this.setValue = function(key,value)
	{
		 _metadata.setValue (key,value);
	};
	
	/** 
	 * @description Removes a metadata value by its key. 
	 * 
	 * @param {String} key	The key of the metadata to remove.
	 * 
	 * @public
	 */
	this.removeValueOf = function(key)
	{
		_metadata.removeValueOf (key);
	};
}