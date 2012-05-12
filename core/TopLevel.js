//--------------------------------------------------------------------------
//
//  Toplevel
//
//--------------------------------------------------------------------------

var oopsRoot = 
/** @lends __Toplevel# */
{
	/*global oopsChainManager*/
	/*global alert*/
	
	/**
	 * @description	Controls the object registration handling in packages.
	 * 				Turning it to false from default true will skip adding
	 * 				non-packaged classes to <i>oops</i>.
	 * 
	 * @type Boolean
	 * @default true
	 * 
	 * @see Oops#bind
	 * 
	 * @public 
	 * @field
	 */
	autoPackage: true
	
	/**
	 * @description	Operates on the <i>ChainManager</i> object to 
	 *				Align a supclass of an oops object to the chain 
	 *				the chain of this oops object.
	 *
	 * @param {Oops} obj The oops object to register.
	 * @see oopsChainManager#register
	 */
	,register: function (obj)
	{ 
		oopsChainManager.instance().register (obj);
	}
	
	/**
	 * @description	Operates on the <i>ChainManager</i> object to 
	 *				get the amount of registered chains.
	 * 
	 * @returns {uint} 	Amount of chains. 
	 * @type uint
	 * 
	 * @see oopsChainManager#numAddresses
	 * 
	 * @public 
	 * @field
	 */
	,numAddresses: function ()
	{
		return oopsChainManager.instance().numAddresses();
	}
	
	/**
	 * @description	Operates on the <i>ChainManager</i> object to 
	 *				remove one oops object chain.
	 * 
	 * @param {Oops} obj The oops object to dispose. 
	 * @see oopsChainManager#dispose
	 */
	,dispose: function (obj)
	{
		return oopsChainManager.instance().dispose(obj);
	}
	
	/**
	 * @description	Operates on the <i>ChainManager</i> object to 
	 *				removes all stored chains.
	 *
	 * @see oopsChainManager#destroy
	 */
	,destroy: function ()
	{
		return oopsChainManager.instance().destroy();
	}
	
	/**
	 * @description	Operates on the <i>ChainManager</i> object to 
	 *				get the complete inheritance chain of an oops object
	 * 				by a given address.
	 * 
	 * @param {uint} address The address of an oops object.
	 *  
	 * @returns {Array}	Inherited objects of the address.
	 * @see oopsChainManager#chainOf
	 */
	,chainOf: function (address)
	{
		return oopsChainManager.instance().chainOf(address);
	}	
	
	/**
	 * @description A simple alert wrapper that allows multiple arguments.
	 * 
	 * @example
	 * <pre><code>
	 * oopsRoot.trace ("arg1", "arg2", "arg3");
	 * </code></pre>
	 */
	,trace: function ()
	{
		var output = "";
		
		for (var i=0; i<arguments.length; i+=1)
		{
			if (i>0)
			{
				output += ", ";
			}
			
			output += arguments[i];
		}
		
		alert (output);
	}			
};