//--------------------------------------------------------------------------
//
//  ChainManager
//
//--------------------------------------------------------------------------

//TODO construct a singleton: new oopsChainManager(); caller == oopsChain.instance ?"ok" :throw exception

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class 	A singleton that holds all constructed chains of your application
 * 			using oops objects. The framework deals with this information to
 * 			resolve dependencies like scopes and inheritance.
 * 
 * <p>
 * The chain is constructed sequential in the head sections of the oops objects.
 * Except from weak reference that aren't aligned to the <i>oopsChainManager</i> all 
 * others will do.
 * Inspecting the head section of a new created instance with inheritance would
 * formally look like this in a sequence:
 * </p>
 * 
 * <font color="#999999">
 * <li>var item = new SubSubClass()</li>
 * <li>add SubSubClass to the construction chain (register)</li>
 * <li>enter extends in SubSubClass</li>
 * <li>construct SubClass()</li>
 * <li>add SubClass to the construction chain (register)</li>
 * <li>enter extends in SubClass</li>
 * <li>construct Oops()</li>
 * <li>add Oops to the construction chain (register)</li>
 * <li>set the name (Oops.name)</li>
 * <li>create address and transfer construction chain to the chain stack (bake)</li>
 * <li>receive address</li>
 * <li>now we go the way backwards</li>
 * <li>back in SubClass the name is overridden (SubClass.name) - (bind)</li>
 * <li>SubClass become packaged in Toplevel if doesn't exsist (by default true)</li>
 * <li>back in SubSubClass the name is overridden (SubSubClass.name) (bind)</li>
 * <li>SubSubClass become packaged in Toplevel if doesn't exsist (by default true)</li>
 * <li>item.doSomething(); (done)</li>
 * </font>
 * 
 * @public 
 */
function oopsChainManager ()
{
	/*global Oops*/
	/*global oopsError*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	this._extends = Oops;
	this._extends (true);	
	this._bind (oopsChainManager);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	var _address, _numAddresses = 0, _currentBuilds = [], _chains = {}, _garbageCollection = {};
		
	
	//--------------------------------------------------------------------------
	//
	//  privacy (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Calculate a address for a new started chain.
	 *
	 * @return {int} The calculated address of a new chain. 
	 * 
	 * @private
	 * @ignore
	 */
	var createAddress = function ()
	{
		_numAddresses += 1;
		
		var token = new Date().getTime().toString().substr(-6);
		var rand  = parseInt(Math.random() * 100, 10).toString(); 
		var index;
		
		for (var i = 0; i< rand.length; i+=1)
		{
			index = parseInt(Math.random() * token.length, 10) - 1;
			
			if (index < 0)
			{
				index = 0;			
			}
			
			token = token.substr(0, index) + rand.charAt(i) + token.substr(index) + _numAddresses;
		}	
		
		return token;
	};
	
	/**
	 * @description Get the position of an oops object in its inheritance chain.
	 *
	 * @param {Oops} obj 	An oops object.
	 * @param {Oops} chain 	The chain where the oops object is aligned to.
	 * 
	 * @return {int} The position of the requested oops object.
	 * 				 The position is <i>-1</i> if the object isn't presented in the chain. 
	 * 
	 * @private
	 * @ignore
	 */
	var indexOf = function (obj,chain)
	{
		var result = false;
		if (!chain)
		{
			chain = _currentBuilds;
		}
		
		for (var i=0; i<chain.length; i+=1)
		{
			if (obj === chain[i])
			{
				result = true;
				break;
			}				
		}
		return result;
	};
	
	/**
	 * @description Remove the items that are marked for garbage collection. 				
	 * 
	 * <p>The following objects are disposed:</p>	
	 * <li>oopsError and subclasses of oopsError</li>	
	 * 
	 * @param	{Oops} obj	An oops object to mark for garbage collection.
	 * 						It is marked when the object is provided in the
	 * 						list above.
	 * 
	 * @private
	 * @ignore
	 */
	var applyGarbageCollection = function (obj)
	{
		//apply garbage collection
		for (var address in _garbageCollection)
		{
			oopsChainManager.instance().dispose (_garbageCollection[address]);
		}		
		_garbageCollection = {};
		
		//mark new object
		try
		{
			if (obj.is (oopsError))
			{
				_garbageCollection[obj.address] = obj;
			}
		} 
		catch (e){}		
	};
	
		
	//--------------------------------------------------------------------------
	//
	//  scopes
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>internal</span>
	 * 				Transfer the current constructed chain to the chain stack. The chain is
	 * 				accessable by the created address.
	 * 				After alignments, the construction chain is cleared and the temporal address
	 * 				become reseted.
	 * 
	 * <p>
	 * Calling this method will invoke the garbage collection.
	 * All <i>Error</i> objects become disposed.
	 * </p>				
	 * 
	 * 
	 * @param	{uint}	address	The address of the oops object in the inheritance chain.
	 *
	 * @returns {Object} 	Returns a new address if the address argument is undefined otherwise
	 * 						the address of the constructed chain is returned.
	 * 
	 * @private
	 */
	var bake = function (address)
	{
		if (!address)
		{
			_address = createAddress();
			_chains[_address] = _currentBuilds;			
			address = _address;			
		}
		else
		{
			var build;
			var chain = _chains[_address];
			
			for (var i=0;i<_currentBuilds.length;i+=1)
			{
				build = _currentBuilds[i];
				if (!indexOf(build,chain))
				{
					chain.push (build);
				}
			}
		}		
		
		return address;
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>internal</span>
	 * 				Completes the creation of a new object.
	 * 
	 * <p>
	 * The complete methods applies the garbage collection.
	 * </p>	
	 * 
	 * @param	{Oops} obj	The object reference that was created.
	 * @private
	 */
	var complete = function (obj)
	{
        _currentBuilds = [];
        
		//free memory and mark a new object to be garbage collected next time.
		applyGarbageCollection (obj);
	};
	
	this._protected.setInternal ("bake", bake);
	this._protected.setInternal ("complete", complete);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the amount of registered chains.
	 * 
	 * @returns {uint} 	Amount of chains. 
	 * @type uint
	 * 
	 * @public 
	 * @field
	 */
	this.numAddresses = function ()
	{
		return _numAddresses;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Align a supclass of an oops object to the
	 * 				chain the chain of this oops object.
	 * 				Every object that is not defined as weak
	 * 				will register to the chain in the head section.
	 *
	 * @param {Oops} obj The oops object to register.
	 * 
	 * @see oopsChain#dispose  
	 * @public
	 */
	this.register = function (obj)
	{ 
		if (! indexOf (obj))
		{
			_currentBuilds.push (obj);
		}
	};
	
	/**
	 * @description Removes one oops object chain from <i>oopsChainManager</i>.
	 * 				In larger application it could be very important to
	 * 				do so. Once an object is not longer needed you should
	 *				dispose it. It wont destroy the whole objects, 
	 *				but the deep dependencies.
	 *
	 * @param {Oops} obj The oops object to dispose.
	 * 
	 * @see oopsChain#destroy  
	 * @public
	 */
	this.dispose = function (obj)
	{ 
		var chain = _chains[obj.address()];
		
		if (chain)
		{
			delete _chains[obj.address()];	
			_numAddresses -=1;
		}
	};
	
	/**
	 * @description Removes all stored chains from <i>oopsChainManager</i>.
	 * 				In larger application it could be very important to
	 * 				do so. Consider lifecycle driven structures. Once a
	 *				lifecycle completes you would destroy all chains before
	 *				an new lifecylce starts.
	 *				It wont destroy the objects, but its deep dependencies.
	 *
	 * @see oopsChainManager#dispose  
	 * @public
	 */
	this.destroy = function ()
	{ 
		_chains = {};
		_numAddresses = 0;
	};
	
	/**
	 * @description Get the complete inheritance chain of an oops object
	 * 				by a given address.
	 * 
	 * @param {uint} address The address of an oops object.
	 *  
	 * @returns {Array}	Inherited objects of the address.
	 * 
	 * @public
	 */
	this.chainOf = function (address)
	{
		return _chains[address];
	};
}
oopsChainManager.reference = null;

/**
 * Get the instance of the chain manager singleton.
 * 
 * @returns {oopsChainManager} A reference to work with addresses of oops objects.
 * 
 * @static
 * @public
 */
oopsChainManager.instance = function ()
{
	if (!oopsChainManager.reference)
	{
		oopsChainManager.reference = new oopsChainManager();
	}
	return oopsChainManager.reference;
};