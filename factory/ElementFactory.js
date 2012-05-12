//--------------------------------------------------------------------------
//
//  Factory (factory method pattern)
//
//--------------------------------------------------------------------------
//TODO implement load method 

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsComponent
 * @augments oopsEventDispatcher
 * @class Creates a new Factory instance to create objects through <i>Creator</i> instances. 
 * The process will check if the object to create can handle the resource at first.
 * After a creator returns <i>true</i> the create method is invoked.
 * The process completes when every creator returns <i>false</i> for <i>canHandle</i>
 * This allows the creation of proxy object. Next steps are binding the resource to the 
 * created element and define the proxied elements in each wrapper.
 * 
 * @param	{oopsResource}  resource	The object that is used to evaluate if the object 
 * 										to create can work with the defined settings in the object.
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
 * @see oopsElementCreator
 * @public
 */
function oopsElementFactory (id)
{
	/*global oopsRoot*/
	/*global oopsEventDispatcher*/
	/*global oopsComposite*/
	/*global oopsComponent*/
	/*global oopsElementCreator*/
	/*global oopsResource*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	
	oopsRoot.register (oopsElementFactory);	
	this._extends = oopsEventDispatcher;
	this._extends ();
	
	this._extends = oopsComposite;
	this._extends (id || oopsElementFactory.name);	
	this._bind(oopsElementFactory);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds a reference of itself for access purpose in non-public methods.
	 * 
	 * @default this
	 * @type oopsElementFactory
	 * 
	 * @private
	 * @ignore
	 */
	var self = this;
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Create the proxy objects by a creator from a resource taht wraps the man object.
	 * 
	 * @param	{oopsResource}  resource	The object that is used to evaluate if the object 
	 * 										to create can work with the defined settings in the object.
	 * 
	 * @param	{Object}		element		The previous created object in the proxy chain.
	 *  
	 * @returns {Object}	The created object.
	 * 
	 * @public
	 * @ignore
	 */
	var createProxyElements = function (resource,element)
	{
		var creator;
		var proxy;
		
		for (var i=0; i<self.numChildren(); i+=1)
		{
			creator = self.getChildAt(i);
			if (creator.canHandle(resource,element))
			{
				proxy = creator.create (resource);
				proxy.setProxiedElement(element);
				element = createProxyElements (resource,proxy);
				break;
			}
		}		

		return element;
	};
	
	/**
	 * Create the main object by a creator from a resource.
	 * 
	 * @param	{oopsResource}  resource	The object that is used to evaluate if the object 
	 * 										to create can work with the defined settings in the object.
	 *  
	 * @returns {Object}	The created object.
	 * 
	 * @public
	 * @ignore
	 */
	var createElementByResource = function (resource)
	{
		var creator;
		var element;
		var product;
		var i;
		
		//find and create the main element
		for (i=0; i<self.numChildren(); i+=1)
		{
			creator = self.getChildAt(i);
			if (creator.canHandle(resource))
			{
				element = creator.create (resource);
				element.setResource(resource);
				break;
			}
		}
		
		if (element) 
        {
            product = createProxyElements(resource,element);
        }
		
		//reset creators
		for (i=0; i<self.numChildren(); i+=1)
		{
			creator = self.getChildAt(i);
			creator._internal.reset();
		}
		
		return product;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  scopes
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override protected</span>
	 * 				A small util to quickly check values and their types.
	 * 				The common usage is for function argument checks. You can simply
	 * 				add this as the first line of your method to enable several checks.
	 * 
	 * <p>
	 * The method is overridden to allow only creator objects to be subordinated in factory objects.
	 * </p>
	 * 
	 * @param	{String}	name		The key of the value.
	 * 									It is used by the Error objects to create
	 * 									a better understanding error description.
	 *  
	 * @param	{Object}	value		The value to check.
	 * 									It can be of any type.
	 * 
	 * @param	{Class}		signature	The supposed signature of the value.
	 * 									If you dont define a signature the
	 * 									type check is skipped.
	 * 									(optional, null)
	 * 
	 * @throws 	{oopsArgumentError}	If a certain value is not defined.
	 * @throws 	{oopsTypeError}		If the type of the value dont match the 
	 * 								supposed signature.
	 *	 
	 * @private
	 */
	var isOrThrow = function (name,value,signature)
	{ 
		if (signature === oopsComponent)
		{
			var caller = self._protected.scopeOf("cls",self._protected.isOrThrow.caller);
			if (caller === oopsComposite)
			{
				//overriding a protected method will align the origin method in the super scope
				self._super.isOrThrow (name,value,oopsElementCreator);
			}
			
			else
			{
				self._super.isOrThrow(name,value,signature);
			}
		}
		
		else
		{
			self._super.isOrThrow(name,value,signature);
		}	
	};
	
	this._protected.setProtected ("isOrThrow", isOrThrow);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Create a new object by a creator.
	 * The process will check if the object to create can handle the resource at first.
	 * After a creator returns <i>true</i> the create method is invoked.
	 * The process completes when every creator returns <i>false</i> for <i>canHandle</i>
	 * This allows the creation of proxy object. Next steps are binding the resource to the 
	 * created element and define the proxied elements in each wrapper.
	 * 
	 * @param	{oopsResource}  resource	The object that is used to evaluate if the object 
	 * 										to create can work with the defined settings in the object.
	 *  
	 * @returns {Object}	The created object.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>resource</i> is undefined.
	 * @throws {oopsTypeError} 		If the argument <i>resource</i> is not from type oopsResource.
	 * 
	 * @see oopsElementCreator#canHandle
	 * @see oopsElementCreator#create
	 * @public
	 */
	this.create = function (resource)
	{
		this._protected.isOrThrow("resource", resource, oopsResource);
		return createElementByResource (resource);
	};
}