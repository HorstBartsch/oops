//--------------------------------------------------------------------------
//
//  Creator (factory method pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsComponent
 * @class Creates a new Creator object to instantiates objects through a factory instance. 
 * A Creator is simply a delegation object. It takes the request from a factory and send
 * it to the defined functions for evaluation and creation. The logic part of a creator
 * is to check if the object to create was already created. In this case the defined functions
 * are not longer triggered.
 * 
 * @param {Function} canHandle	A method that evaluates if a related object 
 * 								can be created. 
 * 
 * @param {Function} create		A method that creates a related object. 
 * 
 * @param {String} 	id			Set the identifier of a creator component.
 * 								Use the id to fetch a creator from a <i>factory</i>.
 * 								It is optional. If you dont define an id, the id became
 * 								the name of of the class name.
 *
 * @example	
 * <pre><code>
 * <font color='#449944'>//Define the final create and handle method.</font>
 * <font color='#449944'>//designed for clarity, you would define it in a nicer way</font>
 * function handleMain (resource, element)
 * {
 *   <font color='#449944'>//is only triggered one time, we can always return true here</font>
 *   <font color='#449944'>//usually you would inspect the resource too</font>
 *   return true;
 * }
 * 
 * function createMain (resource)
 * {
 *   <font color='#449944'>//create the main element and return it</font>
 *   <font color='#449944'>//the resource becomes aligned to the element by the factory later</font>
 *   return new oops.model.Element();
 * }
 * 
 * function handleProxy (resource, element)
 * {
 *   <font color='#449944'>//only return true, if the main element was created.</font>
 *   if (element) return true;
 *   else return false;
 * }
 * 
 * function createProxy (resource)
 * {
 *   <font color='#449944'>//create the proxy element and return it</font>
 *   return new oops.model.ProxyElement();
 * }
 * 
 * <font color='#449944'>//Create new factory</font>
 * <font color='#449944'>//This is just a showcase. Usually you would inherit from the</font>
 * <font color='#449944'>//factory class and subordinate you creator objects internal.</font>
 * var factory = new oops.factory.ElementFactory();
 * 
 * <font color='#449944'>//add a creator that creates the main object</font>
 * factory.addChild (new oops.factory.ElementCreator(handleMain, createMain));
 * 
 * <font color='#449944'>//add a creator that creates a proxy of main object</font>
 * factory.addChild (new oops.factory.ElementCreator(handleProxy, createProxy));
 *
 * <font color='#449944'>//create the element</font>
 * <font color='#449944'>//in this case we only need an empty resource</font>
 * var elem = factory.create (new oops.vo.Resource());
 * alert (elem.is(oops.model.ProxyElement)); <font color='#449944'>//returns true</font>
 * </code></pre>
 *
 * @see oopsElementFactory
 * @see oopsElement
 * @see oopsProxyElement
 * @public
 */
function oopsElementCreator (canHandle,create,id)
{
	/*global oopsRoot*/
	/*global oopsComponent*/
	/*global oopsResource*/
		
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsElementCreator);
	this._extends = oopsComponent;
	this._extends (id || oopsElementCreator.name);
	this._bind(oopsElementCreator);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the current creation state.
	 * 
	 * @default ready
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _creatorState = "ready";
	
	/**
	 * @description Holds the function to proof if the related object
	 * 				can handle a resource.
	 * 
	 * @default null
	 * @type Function
	 * 
	 * @private
	 * @ignore
	 */
	var _canHandle;
	
	/**
	 * @description Holds the function to create the related object.
	 * 
	 * @default null
	 * @type Function
	 * 
	 * @private
	 * @ignore
	 */
	var _create;
    
    /**
	 * @description Holds a reference of itself for access purpose in non-public methods.
	 * 
	 * @default this
	 * @type oopsElementCreator
	 * 
	 * @private
	 * @ignore
	 */
	var self = this;
	
	
	//--------------------------------------------------------------------------
	//
	//  scopes
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>internal</span>
	 * 				Reset the creation object handling by a factory instance to allow re-invokation
	 * 				of another project. It is called from the factory when a creation cylce completes.
	 * 
	 * @private
	 */
	var reset = function ()
	{
		_creatorState = "ready";
	};
	
	this._protected.setInternal ("reset", reset);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Delegates the <i>create</i> process of a factory <i>create</i> call
	 * to the defined create function. The defined create function is triggered
	 * when the creator hasn't create the related object yet. If the related object
	 * was created the <i>create</i> function is not longer penetrated.
	 * 
	 * @param	{oopsResource}  resource	The object that was used to evaluate if the object 
	 * 										to create can work with the defined settings in the object.
	 *  
	 * @returns {Object}	The created object.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>resource</i> is undefined.
	 * @throws {oopsTypeError} 		If the argument <i>resource</i> is not from type oopsResource.
	 * 
	 * @see oopsElementCreator#canHandle
	 * @public
	 */
	this.create = function (resource)
	{
		var result;
		
		this._protected.isOrThrow("resource", resource, oopsResource);	
		
		if (_creatorState === "handle")
		{
			result = _create (resource);
			_creatorState = "done";
		}
				
		return result;
	};
	
	/**
	 * Delegates the <i>canHandle</i> process of a factory <i>create</i> call
	 * to the defined canHandle function. The defined canHandle function is triggered
	 * when the creator hasn't create the related object yet. If the related object
	 * was created the <i>canHandle</i> function is not longer penetrated.
	 * 
	 * <p>
	 * One thing you should keep in mind when the element argument is defined!
	 * Basicly it says, that you will now create a proxy for this element. If
	 * you created a related object then, make sure it is a proxy object. 
	 * Take a look at the <i>ProxyElement</i> object.
	 * </p>
	 * 
	 * @param	{oopsResource}  resource	An object to evaluate if the object to create
	 * 										can work with the defined settings in the object.
	 * 
	 * @param	{element}		element		Another created object that was previously created
	 * 										by the factory through another creator instance. 							
	 *  
	 * @returns {Boolean}	True if the creator can create the related object 
	 * 						otherwise false. 
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>resource</i> is undefined.
	 * @throws {oopsTypeError} 		If the argument <i>resource</i> is not from type oopsResource.
	 * 
	 * @see oopsElementCreator#create
	 * @see oopsProxyElement
	 * @public
	 */
	this.canHandle = function (resource, element)
	{
		var result = false;
		
		this._protected.isOrThrow("resource", resource, oopsResource);	
		
		//only call canHandle when the related object wasn't created yet
		if (_creatorState === "ready")
		{
			result = _canHandle (resource, element);
			if (result)
			{
				_creatorState = "handle";
			}
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
	 * 				Initiates a new creator. 
	 * 
	 * @param {Function} canHandle	A method that evaluates if a related object 
	 * 								can be created. 
	 * 
	 * @param {Function} create		A method that creates a related object. 
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>canHandle</i> is undefined.
	 * @throws 	{oopsArgumentError}	If the argument <i>create</i> is undefined.
	 * 
	 * @see oopsFactory
	 * @private
	 */
	var init = function (canHandle,create)
	{
		self._protected.isOrThrow ("canHandle",canHandle);
		self._protected.isOrThrow ("create",create);
		
		_canHandle = canHandle;
		_create = create;
	};
	
	init(canHandle,create);	
}