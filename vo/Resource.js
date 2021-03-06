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
 * @param {Boolean} weak	If the dependency is weak, no registration to the oops chain
 * 							is made. When doing so, you can't use the inheritance, scope and
 * 							type features not as well as you would setup the weak property
 * 							to false. 
 * 							In some cases it is a good idea to do so, eg. for exceptions 
 * 							beause the lifetime of those objects are quit short.
 * 							(optional, default: true)
 * 
 * @see oopsMetadata
 * @see oopsFactory
 * @public
 */
function oopsResource (weak)
{
	/*global oopsRoot*/
	/*global Oops*/
	/*global oops*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsResource);
	this._extends = Oops;
	this._extends ((weak===undefined)?true:weak);
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
	var _metadata = new oops.vo.Metadata ();
	
	
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