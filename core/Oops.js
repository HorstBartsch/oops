//--------------------------------------------------------------------------
//
//  Oops (base object)
//
//--------------------------------------------------------------------------

//TODO Command Pattern
//TODO Dependency Injection
//TODO MVCS Pattern
	
/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @class 	Oops is a micro architecture framework written in javascript.
 * 			It has no dependencies to other frameworks and works on a very
 * 			low level to enlarge support on several devices.
 * 
 * 			The main focus of oops is to provide a solid object orientated
 * 			framework which implements common design patterns for loose coupled
 * 			objects.
 * 
 * <p>
 * <b> What oops can do for you? </b>
 * 
 * <li> Observer Pattern 		</li>
 * <li> Factory Method Pattern 	</li>
 * <li> Composite Pattern		</li>
 * <li> Trait Pattern			</li> 
 * <li> State Pattern 			</li>
 * <li> Proxy Pattern (acts also used as adapter, mediator or decorator) </li>
 * 
 * <br/>
 * 
 * <li> protected scope			</li>
 * <li> internal scope			</li>
 * <li> super statement			</li> 
 * <li> type safety				</li> 
 * <li> packages				</li> 
 * <li> inheritance and polymorphism	</li> 
 * <li> prevent namespace conflicts		</li> 
 * </p>
 * 
 * <br/>
 * 
 * <p>
 * <b> How to work with oops? </b> <br/>
 * 
 * Of course there are some restriction to take care of.
 * An oops object is splitted into five parts. One of them
 * is required, the others are optional but best practices.
 * 
 * The example of MyClass will give a short
 * instruction how the five sections of an 
 * oops object works.
 * </p>
 * 
 * @example
 * <pre><code>
 * function MyClass (id)
 * {
 *    <font color='#4444CC'>// Section 1 - head (required)</b>
 *    // In the head you register the object and do the inheritance.</font>
 * 
 *    <font color='#449944'>// register to the inheritance chain
 *    // You can read more about it in oopsChainManager.</font>
 *    oopsRoot.register (MyClass);
 * 
 *    <font color='#449944'>// make the inheritance
 *    // Keep in mind that you can inherit from multiple objects!
 *    // In this case we only inherit from the base oops object.</font>
 *    this._extends = Oops;
 *    this._extends ();
 *
 *    <font color='#449944'>// basicly set the name of the instance
 *    // For a correct workflow this has to be exaclty match the class reference
 *    // More details are available at bind().</font>
 *    this._bind(MyClass);
 *    
 *    
 *    
 *    <font color='#4444CC'>// Section 2 - privacy (optional)
 *    // In this section you define your private properties and methods.</font>
 * 
 *    <font color='#449944'>// remind this object for private method processing
 *    // Its almost a good idea to do so.</font>
 *    var self = this;		
 * 
 *    <font color='#449944'>// define a property</font>
 *    var _id = "myProperty";
 * 
 *    <font color='#449944'>// define a method</font>
 *    var _getId = function ()
 *    {
 *        return _id;
 *    }
 * 
 *    <font color='#449944'>// define another method</font>
 *    var _setId = function (value)
 *    {
 *        <font color='#449944'> // make sure value is defined otherwise throw an exception</font>
 *        self._protected.isOrThrow ("value", value);
 *        _id = value;
 *    }
 *    
 *     
 *     
 *    <font color='#4444CC'>// Section 3 - scope (optional)
 *    // In this section you define your internal and protected methods.
 *    // You also define your super 'reminder' here.
 *    // Take a closer look at setSuper, setInteral and setProtected for details.</font>
 *
 *    <font color='#449944'>// make _setId available by the protected scope
 *    // notice that you can use alternative naming</font>
 *    this._protected.setProtected ("setId",_setId);
 *
 *    <font color='#449944'>// make _getId available by the internal scope
 *    // inherited objects can now get the id and all classes
 *    // in the same package can read it.</font>
 *    this._protected.setInternal ("getId",_getId);
 *
 *    <font color='#449944'>// define another protected method
 *    // you can also reference an anonymous function</font>
 *    this._protected.setProtected ("dispose", function ()
 *    { 
 *        _id = null;
 *    });
 *
 *    <font color='#449944'>// remind the Oops.is() method by the super scope
 *    // We override this method later but want to keep the basic functionality
 *    // You can also do this with internal and protected methods. (see setSuper)</font>
 *    this._protected.setSuper ("is",this.is);
 *    
 *    
 *    
 *    <font color='#4444CC'>// Section 4 - publicity (optional)
 *    // In this section you define your public properties and methods
 *    // May this optional but what would you without it?</font>
 *
 *    <font color='#449944'>// In this example we have only one public method.
 *    // It overrides the Oops.is() function.</font>
 *    this.is = function (signature)
 *    {
 *        var result;
 *
 *        <font color='#449944'>// We want the id to be defined for a valid result
 *        // otherwise it should follow the regular behavior.</font>
 *        if (!_id)
 *        {
 *            result = false;
 *        }
 *        else
 *        {
 *            result = this._super.is (signature);
 *        }
 *
 *        return result;
 *    }
 *
 *
 *
 *    <font color='#4444CC'>// Section 5 - construct (optional)
 *    // Initiate MyClass</font>
 *		
 *    var init = function (id)
 *    { 			
 *        _setId (id);
 *    }
 *     
 *    init(id);
 * }
 * </code></pre>
 * 
 * @param {Boolean}	weak	If the dependency is weak, no registration to the oops chain
 * 							is made. When doing so, you can't use the inheritance, scope and
 * 							type features not as well as you would setup the weak property
 * 							to false. 
 * 							In some cases it is a good idea to do so, eg. for exceptions 
 * 							beause the lifetime of those objects are quit short.
 * 							(optional, default: false) 
 * 
 * @requires __Toplevel
 * @requires oopsConst
 * @requires oopsRoot
 * @requires oops
 * @requires oopsIllegalOperationError
 * @requires oopsArgumentError
 * @requires oopsTypeError
 * @requires oopsChainManager
 * @public  
 */
function Oops (weak)
{
	/*global oopsRoot*/
	/*global oopsArgumentError*/
	/*global oopsConst*/
	/*global oops*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	//can't be defined in the construct because the object must be registrated before
	//setting the name
	if (!weak)
	{
		oopsRoot.register (Oops);
	}
	
	/**
	 * @description Holds the name of an oops object.
	 * 				The name or instance name is always the same as the name of the class.
	 * 				It is very important for internal processing in the oops framework to
	 * 				hold 'name' in the public scope.
	 *  
	 * @type String
	 * 
	 * @example
	 * <pre><code>
	 * new Oops ().name == Oops.name
	 * </code></pre>
	 * 
	 * @see Oops#qName
	 * @see Oops#toString  
	 * 
	 * @constant 
	 * @private  
	 * @ignore
	 */
	this.name = Oops.name;
		
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds a reference of itself for access purpose in non-public methods.
	 * 
	 * @default this
	 * @type Oops
	 * 
	 * @private
	 * @ignore
	 */
	var self = this;
	
	/**
	 * @description Holds the unique address of this object.
	 * 
	 * @default 0
	 * @type uint
	 * 
	 * @see Oops#address
	 * 
	 * @private
	 * @ignore
	 */
	var _address = 0;
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Clean a string by removing linebreaks, whitespaces etc.
	 * 
	 * @param	{String}	str	A string to clean.
	 * @return	A clean string.
	 * 
	 * @private
	 * @ignore
	 */
	var trim = function (str)
	{
		return str.replace(/\s+/g,'');
	};
	
	/**
	 * @description Scan an object signature by a pattern. 
	 * 
	 * @param	{Object}	obj			The object reference to scan. 
	 * @param	{String}	namespace	The pattern to search for.						 
	 * 
	 * @returns {Boolean} 	True, if the namespace was found in the object or
	 * 						false if not.
	 * 
	 * @private
	 * @ignore
	 */
	var evalScope = function (obj,namespace)
	{
		var objStr = trim(obj.toString());
		return (objStr.indexOf(namespace) > -1);
	};
	
	/**
	 * @description Get the details of an object.
	 * 				Basicly it is used to find the environment of a caller object.
	 * 
	 * @param	{String}	mode		Controls the return type of 'getScope'.
	 * 									Allowed values are pkgKey, clsKey, pkg, cls.
	 * 
	 * @param	{String}	pattern		In common cases the signature of a caller
	 * 									to proof. (optional, default null)	
	 * 
	 * @param	{uint}		index		The amount of retries. The default is 0.
	 * 									When proofing on protected or super scope 
	 * 									we have to make sure that the caller inherits
	 * 									from the specified object. In some cases objects
	 * 									have the same signature (trait.init and and event.init).
	 * 									In this case we have to to retry getScope with the next
	 * 									index.				 
	 * 
	 * @returns {Object} 	Based on the mode it returns:
	 * 						- pkgKey, the name of the package
	 * 						- clsKey, the nice name of the class
	 * 						- cls, the signature of the class
	 * 						- pkg, the signature of the package
	 * 
	 * @requires oops (Toplevel)
	 * 
	 * @private
	 * @ignore
	 */
	var getScope = function (mode,pattern,index)
	{
		var result;
		var scope;
		var obj;
		var count = 0;
		if (!index) index = 0;
		
		for (var pkg in oops)
		{
			for (var cls in oops[pkg])
			{
				//scope not found yet
				if (!scope)
				{
					obj = oops[pkg][cls]; 
					result = (pattern) ?evalScope (obj,pattern) :(obj.name === self.name);
					
					if (result)
					{
						//retry mechanism (isMemberOf) reached
						if (count === index)
						{
							//return the package signature
							if (mode===oopsConst.PKG)
							{
								scope = oops[pkg];
							}
							
							//return the class signature
							else if (mode===oopsConst.CLS)
							{
								scope = oops[pkg][cls];
							}
							
							//return the nice name of the class
							else if (mode===oopsConst.CLS_NAME)
							{
								scope = cls;
							}
							
							//return the name of the package
							else if (mode===oopsConst.PKG_NAME)
							{
								scope = pkg;
							}
						}
						
						//retry mechanism (isMemberOf) not reached
						else 
						{
							count +=1;
						}
					}
				}
			}			
		}
		return scope;
	};
	
	/**
	 * Proof, if a preotected or super scope invokation is allowed.
	 * 
	 * @param	{String}	mode		Controls the return type of 'getScope'.
	 * 									Allowed values are pkgKey, clsKey, pkg, cls.
	 * 
	 * @param	{String}	pattern		In common cases the signature of a caller
	 * 									to proof. (optional, default null)
	 */
	var isMemberOfScope = function (mode,pattern)
	{
		var chain = chain=oopsRoot.chainOf(_address);
		var count = 0;
		var scope = self;
		var match = false;
	
		while (!match && scope)
		{
			scope = getScope (mode,pattern,count);
		
			if(chain.indexOf(scope) > -1)
			{
				match = true;			
			}
			else
			{
				count +=1;
			}
		}
		return match;
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				A small util to serve the environment of an oops object quickly.
	 * 
	 * @param	{String}	mod	Controls the return type of 'scopeOf'.
	 * 							Allowed values are pkgKey, clsKey, pkg, cls.
	 * 
	 * @param	{Object}	obj	The oops object to inspect.					 
	 * 
	 * @returns {Object} 	Based on the mode it returns:
	 * 						- pkgKey, the name of the package
	 * 						- clsKey, the nice name of the class
	 * 						- cls, the signature of the class
	 * 						- pkg, the signature of the package
	 * 
	 * @example
	 * <pre><code>
	 * function MyClass ()
	 * {
	 *    oopsRoot.register (MyClass);
	 *    this._extends = Oops;
	 *    this._extends ();	
	 *    this._bind(MyClass);
	 *
	 *    this.init = function ()
	 *    { 			
	 *        alert (this._protected.scopeOf(oopsConst.CLS_NAME),this); <font color='#449944'>//"YourClass"</font>
	 *        alert (this._protected.scopeOf(oopsConst.PKG_NAME),this); <font color='#449944'>//"model"</font>
	 *        alert (this._protected.scopeOf(oopsConst.PKG),this); <font color='#449944'>//Object (model, package of MyClass)</font>
	 *        alert (this._protected.scopeOf(oopsConst.CLS),this); <font color='#449944'>//Object (MyClass)</font>
	 *    }
	 * }
	 * 
	 * <font color='#449944'>//align MyClass in the oops package</font>
	 * oops.model.YourClass = MyClass
	 * new MyClass().init();
	 * </code></pre>
	 * 
	 * @see Oops#_protected
	 * @see Oops#getScope
	 * @private
	 */
	var scopeOf = function (mode,obj)
	{ 
		if (obj)
		{
			obj = trim(obj.toString());
		}
		return getScope (mode,obj);
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				A small util to quickly check values and their types.
	 * 				The common usage is for function argument checks. You can simply
	 * 				add this as the first line of your method to enable several checks.
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
	 * @example
	 * <pre><code>
	 * function MyClass ()
	 * {
	 *    oopsRoot.register (MyClass);
	 *    this._extends = Oops;
	 *    this._extends ();	
	 *    this._bind(MyClass);
	 *
	 *    this.execute = function (v1)
	 *    {
	 *        return this._protected.isOrThrow ("v1", v1, Oops);
	 *    }
	 * }
	 * 
	 * var obj = new MyClass ();
	 * obj.execute ();  <font color='#449944'>//fails with oopsArgumentError</font>
	 * obj.execute ("my command");  <font color='#449944'>//fails with oopsTypeError</font>
	 * obj.execute (new Oops());  <font color='#449944'>//returns true</font>
	 * </code></pre>
	 * 
	 * @throws 	{oopsArgumentError}	If a certain value is not defined.
	 * @throws 	{oopsTypeError}		If the type of the value dont match the 
	 * 								supposed signature.
	 * 
	 * @see Oops#is
	 * @see Oops#_protected
	 * 
	 * @requires oopsArgumentError
	 * @requires oopsTypeError 
	 * @private
	 */
	var isOrThrow = function (name,value,signature)
	{
		if (value === undefined)
		{
			throw new oopsArgumentError (2000, name);
		}
		
		if (signature)
		{
			try
			{
				if (!value.is (signature))
				{
					throw new oopsTypeError (1000, signature.name + " in " + name);
				}
			}
			
			catch (e)
			{
				throw new oopsTypeError (1000, signature.name + " in " + name);
			}
		}
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Allows you to define a method in the <i>protected</i> scope.
	 * 				You can access the <i>setProtected</i> method through the <i>protected</i> 
	 * 				namespace. 
	 * 				You can only define a protected method in the same class. It is not allowed
	 * 				to define it in depending objects. To enable a protected method you have to
	 * 				define it in the region of a class. Do not capsulate it in a function!
	 * 
	 * @param {String}		name	The identifier of the protected method to access
	 * 								from other objects.
	 * 
	 * @param {Function}	func	The method to invoke.
	 * 
	 * @example
	 * <pre><code>
	 * function MyClass ()
	 * {
	 *    oopsRoot.register (MyClass);
	 *    this._extends = Oops;
	 *    this._extends ();	
	 *    this._bind(MyClass);
	 *
	 *    <font color='#449944'>//define a private function</font>
	 *    var myProtected = function ()
	 *    {
	 *        alert ("Call me from a subClass.");
	 *    }
	 *
	 *    <font color='#449944'>//set the private to protected</font>
	 *    this._protected.setProtected ("myProtected", myProtected);
	 * }
	 * </code></pre>
	 * 
	 * @throws 	{oopsIllegalOperationError}	If the caller object is not the same instance.
	 * @see Oops#_protected
	 * 
	 * @requires oopsIllegalOperationError
	 * @private
	 */
	var setProtected = function (name,func)
	{ 
		var method;
		
		if (self._protected.setProtected.caller && self._protected.setProtected.caller.name==self.name)
		{
			method = defineScope(4000,name,func);
			if (self._protected[name] && !self._super[name])
			{
				self._super[name] = defineScope(4002,name,self._protected[name]);
			}
			
			self._protected[name] = method;
		}
		else 
		{
			throw new oopsIllegalOperationError (4100, "setProtected");
		}
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Allows you to define a method in the 'internal' scope.
	 * 				You can only define an internal method in the same class. It is not allowed
	 * 				to define it in depending objects. To enable an internal method you have to
	 * 				define it in the region of a class. Do not capsulate it in a function!
	 * 
	 * @param {String}		name	The identifier of the internal method to access
	 * 								from other objects.
	 * 
	 * @param {Function}	func	The method to invoke.
	 * 
	 * @example
	 * <pre><code>
	 * function MyClass ()
	 * {
	 *    oopsRoot.register (MyClass);
	 *    this._extends = Oops;
	 *    this._extends ();	
	 *    this._bind(MyClass);
	 *
	 *    <font color='#449944'>//make a private function for clarity</font>
	 *    var myInternal = function ()
	 *    {
	 *        alert ("Call me from a class inside my package.");
	 *    }
	 *
	 *    <font color='#449944'>//set the private to internal</font>
	 *    this._protected.setInternal ("myInternal", myInternal);
	 * }
	 * </code></pre>
	 * 
	 * @throws 	{oopsIllegalOperationError}	If the caller object is not the same instance. 
	 * @see Oops#_protected 
	 * @see Oops#_internal
	 * 
	 * @requires oopsIllegalOperationError
	 * @private
	 */
	var setInternal = function (name,func)
	{
		var method;
		
		if (self._protected.setInternal.caller && self._protected.setInternal.caller.name==self.name)
		{
			method = defineScope(4001,name,func);
			if (self._internal[name] && !self._super[name])
			{
				self._super[name] = defineScope(4002,name,self._internal[name]);
			}
			
			self._internal[name] = method;
		}
		else 
		{
			throw new oopsIllegalOperationError (4100, "setInternal");
		}
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Allows you to define a method in the 'super' scope.
	 * 				You can only define a super method in the same class. It is not allowed
	 * 				to define it in depending objects. To enable a super method you have to
	 * 				define it in the region of a class. Do not capsulate it in a function!
	 * 
	 * @param {String}		name	The identifier of the super method to access
	 * 								from other objects.
	 * 
	 * @param {Function}	func	The method to invoke.
	 * 
	 * @example
	 * <pre><code>
	 * function MyClass ()
	 * {
	 *    oopsRoot.register (MyClass);
	 *    this._extends = Oops;
	 *    this._extends ();	
	 *    this._bind(MyClass);
	 *
	 *    <font color='#449944'>//set an already exsisting Oops method to super.</font>
	 *    this._protected.setSuper ("toString", this.toString);
	 *
	 *    <font color='#449944'>//proceed to override</font>
	 *    this.toString = function ()
	 *    {
	 *        return "This is MyClass - " + this._super.toString();
	 *    }
	 * }
	 * </code></pre>
	 * 
	 * @throws 	{oopsIllegalOperationError}	If the caller object is not the same instance. 
	 * @see Oops#_super
	 * @see Oops#_protected 
	 * 
	 * @requires oopsIllegalOperationError
	 * @private
	 */
	var setSuper = function (name,func)
	{ 
		if (self._protected.setSuper.caller && self._protected.setSuper.caller.name==self.name)
		{
			self._super[name] = defineScope(4002,name,func);
		}
		else 
		{
			throw new oopsIllegalOperationError (4100, "setSuper");
		}
	};	
	
	/**
	 * @description Evaluates a caller object of the protected and super scope.
	 * 				It fixes an issue when you try to enter these scopes from a class
	 * 				that is not in the inheritance chain.
	 * 				
	 * <p>
	 * Without doing so it is possible to invoke a scope method from another 
	 * object with the same signature. To avoid this, the 'evalCaller' proofs
	 * if the caller object uses the 'this' prefix. To allow private functions
	 * entering scope methods the 'self' prefix is available too.	 * 
	 * Sure it is a backdoor but in case of avoiding strict constraints it is 
	 * necessary evil.
	 * </p>
	 * 
	 * @param	{Object}	caller		The object which calls a method in a 
	 * 									scope.
	 * 
	 * @param	{String}	namespace	Represents the key in a scope to invoke a 
	 * 									method with the namespace super, internal
	 * 									or protected.
	 * 
	 * @param	{String}	scope		The appropriate scope.
	 * 									(protected, super or internal) 
	 * 
	 * @see Oops#evalInternalScope
	 * @see Oops#evalProtectedScope
	 * 
	 * @private
	 * @ignore
	 */
	var evalCaller = function (caller,namespace,scope)
	{
		var callerSignature = trim(caller.toString());
		var result = false;
		
        //method was called from an exsiting scope
        result = trim(defineScope.toString()).indexOf(callerSignature) > 0;        
		
		if (!result)
		{
            //method should be called with this statement
            result = callerSignature.indexOf("this."+scope+"."+namespace) > 0;
            
            if (!result)
            {     
                //backdoor: can be called with self method for private methods
                result = callerSignature.indexOf("self."+scope+"."+namespace) > 0;
            }
		}
		return result;
	};
	
	
	/**
	 * @description Assembles the method that become aligned to the oops scopes.
	 * 				This occures by calling the 'setSuper', 'setInternal' or 'setProtected' method. 
	 * 				Defining a method for a scope is not directly aligned to it. 
	 * 				We need to wrap it into another function, which evaluates the
	 * 				capabilities of the caller to access the scope method.
	 * 
	 * @param	{int}		scope	The id of the scope whether its internal 
	 * 								(4001), protected (4000) or super (4002).
	 * 								A scope id is lated used as the 'errorId'
	 * 								of a maybe occured 'oopsIllegalOperationError'. 
	 * 
	 * @param	{String}	name	Represents the key in a scope to invoke a 
	 * 								method with the namespace super, internal
	 * 								or protected.
	 * 
	 * @param	{Function}	func	The method to invoke after evaluationg the
	 * 								capability of the caller. 							 
	 * 
	 * @returns {Function} 	The reassembled method of a scope.
	 * 
	 * @example
	 * There can by trouble defining an event listener from a scope method.
	 * In this case you should use something similar to the following syntax:
	 * 
	 * <pre><code>
	 * <font color='#449944'>//the regular event listener</font>
	 * var onEvent = function (event)
	 * {
	 *    self.dispatchEvent (event);
	 * }
	 * 
	 * <font color='#449944'>//make it protected</font>
	 * this._protected.setProtected ("onEvent",onEvent);
	 * 
	 * <font color='#449944'>//the dispatcher can enter the protected scope</font>
	 * <font color='#449944'>//because you set it up with 'function(event)'</font>
	 * _dispatcher.addEventListener ("MyEvent", this._protected.onEvent);
	 * </code></pre>
	 * 
	 * @see Oops#setProtected
	 * @see Oops#setInternal
	 * @see Oops#setSuper 
	 * 
	 * @requires oopsIllegalOperationError
	 * @private
	 */
	var defineScope = function (scope,name,func)
	{ 
		var evalFunc;
		var resultFunc;
		
		//define the evaluation method for the scopy
		switch (scope)
		{
			case 4000: evalFunc = evalProtectedScope; break;
			case 4001: evalFunc = evalInternalScope;  break;
			case 4002: evalFunc = evalSuperScope;	  break;	
		}
		
		//allow event listeners access
		if (trim(func.toString()).indexOf("function(event)") === 0)
		{
			resultFunc = func;
		}
		
		//assemble final method for the scope
		else
		{ 
			/**ignore*/
			resultFunc = function ()
			{ 
				var result;
				
				//caller allowed to call
				if (evalFunc(name,resultFunc.caller))
				{
					result = func.apply(self,resultFunc.arguments);
				}
				
				//caller not allowed to call
				else
				{
					throw new oopsIllegalOperationError (scope,name);
				}
				
				//return the processed result of the nested method if exisits
				return result;
			};		
		}
		
		return resultFunc;
	};
	
		
	
	/**
	 * @description Checks the authorization of a caller while it operates on the 'internal' scope.
	 * 				The internal scope method can perform, when the package of the caller matches
	 * 				the package of the called object.
	 * 
	 * @param	{String}	namespace	Represents the key in a scope to invoke a 
	 * 									method with the namespace super, internal
	 * 									or protected.
	 * 
	 * @param	{Object}	caller		The object which calls a method in the 
	 * 									super scope.						 
	 * 
	 * @returns {Boolean} 	Whether the method is accessable by the caller or not.
	 * 
	 * @see Oops#setInternal 
	 * @requires oopsConst
	 * @requires oopsRoot
	 * @requires __Toplevel
	 * 
	 * @private
	 * @ignore
	 */
	var evalInternalScope = function (namespace,caller)
	{ 
		var result = false;
		var issue;		
		var pkgOfCaller;
		var chain;
		
		// only objects with caller can access internal namespace
		if (caller)
		{	
			// performance purpose: if caller and this object has same signature
			if (caller.name == self.name)
			{
				result = true;
			}			
			else
			{
				//get the package from the caller
				pkgOfCaller  = getScope(oopsConst.PKG,trim(caller.toString()));				
				
				if (pkgOfCaller)
				{
					//eval if this class (nice name in oops) relates to the package 
					//of the caller and proof the signature
					issue = pkgOfCaller[getScope(oopsConst.CLS_NAME)];					
					if (issue && self.is(issue))
					{
						result = true;
					}					
					else
					{
						//get the class chain of this object
						chain = oopsRoot.chainOf(_address);
						if (chain)
						{
							//eval if a class in this chain has access
							//to the internal scope of the caller 
							for (var i=0; i<chain.length; i++)
							{
								for (issue in pkgOfCaller)
								{
									if (chain[i] == pkgOfCaller[issue])
									{
										result = true;
										break;
									}
								}								
							}
						}
					}
				}
			}			
		}		
		return result;
	};
	
	/**
	 * @description Checks the authorization of a caller while it operates on the 'protected' scope.
	 * 				The protected scope method can perform, when the signature of the caller matches
	 * 				the signature of an inherited oops object in its chain.
	 * 
	 * @param	{String}	namespace	Represents the key in a scope to invoke a 
	 * 									method with the namespace super, internal
	 * 									or protected.
	 * 
	 * @param	{Object}	caller		The object which calls a method in the 
	 * 									super scope.						 
	 * 
	 * @returns {Boolean} 	Whether the method is accessable by the caller or not.
	 * 
	 * @requires oopsConst
	 * @requires oopsRoot
	 * @requires __Toplevel
	 * @see Oops#setProtected
	 * 
	 * @private
	 * @ignore
	 */
	var evalProtectedScope = function (namespace,caller)
	{ 
		var result = false;
		
		// only objects with caller can access internal namespace
		if (caller)
		{
			//invoke a protected functions have to use the 'this' or 'self' prefix
			//this omits entering the protected scope from another object with the same signature
			if (evalCaller(caller,namespace,"_protected"))
			{
				// performance purpose: if caller and this object has same signature
				if (caller.name == self.name)
				{
					result = true;
				}
				
				else
				{
					result = isMemberOfScope(oopsConst.CLS,trim(caller.toString()));
				}
			}
		}
		return result;
	};
	
	/**
	 * @description Checks the authorization of a caller while it operates on the 'super' scope.
	 * 				The super scope method can perform, when the name of the caller matches
	 * 				the name of an inherited oops object in its chain.
	 * 
	 * @param	{String}	namespace	Represents the key in a scope to invoke a 
	 * 									method with the namespace super, internal
	 * 									or protected.
	 * 
	 * @param	{Object}	caller		The object which calls a method in the 
	 * 									super scope.						 
	 * 
	 * @returns {Boolean} 	Whether the method is accessable by the caller or not.
	 * 
	 * @see Oops#setSuper 
	 * @requires oopsConst
	 * @requires oopsRoot
	 * @requires __Toplevel
	 * 
	 * @private
	 * @ignore
	 */
	var evalSuperScope = function (namespace,caller)
	{
		var result = false;
		
		//no caller - no access
		if (caller)
		{
			//invoke a protected functions have to use the 'this' or 'self' prefix
			//this omits entering the protected scope from another object with the same signature
			if (evalCaller(caller,namespace,"_super"))
			{
				result  = isMemberOfScope(oopsConst.CLS,trim(caller.toString()));
			}
		}
		
		return result;
	};
	
		
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the unique id of the oops object instance.
	 * 				It is used to get the inherited objects form a reference.
	 * 				To learn more about it, take a look at the top level methods or
	 * 				browse the 'Chain' object.
	 * 
	 * @default 0
	 * @returns {uint} 	The address of an oops object. 
	 * @type uint
	 * 
	 * @see Chain
	 * @see oops 
	 * 
	 * @public 
	 * @field
	 */
	this.address = function ()
	{
		return _address;
	};
	
	/**
	 * @description Get the qualified name that reflects the oops object.
	 * 				This works similar to the toString() method but delivers
	 * 				full informations about the oops object. 
	 * 				The shape looks like [package].[class]@[address]
	 * 
	 * @returns {String}	A qualified string reflection of an oops object.
	 * @type String
	 * 
	 * @example
	 * <pre><code>
	 * var elem = new oops.model.Element();
	 * alert (elem.qName()); <font color='#449944'>//[model.Element@3081852522]</font>
	 * </code></pre>
	 * 
	 * @see Oops#toString
	 * @see Oops#name 
	 * 
	 * @requires oopsConst
	 * @requires __Toplevel
	 * @public  
	 * @field
	 */
	this.qName = function ()
	{
		var result;
		var p = getScope(oopsConst.PKG_NAME);
		var n = getScope(oopsConst.CLS_NAME);
		
		if (p && n)
		{
			result = "["+p+"."+n+"@"+_address+"]";
		}
		else if (n)
		{
			result = "["+n+"]";
		}
		else
		{
			result = "["+this.name+"]";
		}
		
		return result;
	};
	
	/**
	 * @description <span style='font-size:16px;font-weight:bold'>Protected scope</span>
	 * 				A collection of methods that represents the protected scope of an oops object.
	 * 				Within the protected scope you can define methods which are only accessable from
	 * 				subclasses of an instance who defined that method.
	 * 
	 * <p>
	 * You can add methods to the protected scope by using </i>_protected.setProtected(name, func)</i>.
	 * As you notice the method to declare a new protected function is also protected.
	 * The raw oops objects defines itself 5 methods in the protected scope.
	 * </p>
	 * 
	 * @returns {Object} 	A collection of methods that are available in the protected
	 * 						scope.
	 * 
	 * @throws 	{oopsIllegalOperationError}	If the caller object has no access to the 
	 * 										aligned methods of the protected scope.
	 * 
	 * @see Oops#scopeOf
	 * @see Oops#isOrThrow
	 * @see Oops#setProtected
	 * @see Oops#setInternal
	 * @see Oops#setSuper 
	 * 
	 * @public
	 */
	this._protected = 
	{
		scopeOf: 		defineScope(4000,"scopeOf",scopeOf),
		isOrThrow: 		defineScope(4000,"isOrThrow",isOrThrow),
		setProtected: 	defineScope(4000,"setProtected",setProtected),
		setInternal: 	defineScope(4000,"setInternal",setInternal),
		setSuper: 		defineScope(4000,"setSuper",setSuper)
	};
	
	/**
	 * @description <span style='font-size:16px;font-weight:bold'>Internal scope</span>
	 * 				A collection of methods that represents the internal scope of an oops object.
	 * 				Within the internal scope you can define methods which are only accessable from
	 * 				classes that shares in the same package of an instance who defined that method. 
	 * 				You can add methods to the internal scope by using '_protected.setInternal(name, func)'.
	 * 
	 * @returns {Object} 	A collection of methods that are available in the internal
	 * 						scope.
	 * 
	 * @throws 	{oopsIllegalOperationError}	If the caller object has no access to the 
	 * 										aligned methods of the internal scope.
	 * 
	 * @see Oops#setProtected
	 * @see Oops#setInternal
	 * 
	 * @public 
	 */
	this._internal = {};
	
	/**
	 * @description <span style='font-size:16px;font-weight:bold'>Super scope</span>
	 * 				A collection of methods that represents the super scope of an oops object.
	 * 				Within the super scope you can define methods which were previously defined 
	 * 				by superclasses. 
	 * 				You can add methods to the super scope by using '_protected.setSuper(name, func)'.
	 * <p>
	 * Why to do that? 
	 * When you start to override methods from a superclass you loose the access to
	 * the super functionality. Now you need to write parts of the superclass code 
	 * again. This is the point when the super scope comes in. Take a look at the
	 * example below.
	 * </p>
	 * 
	 * <p>
	 * There is still more. 
	 * If you override an internal or protected method, the origin method is first declared 
	 * in the super scope and after that is aligned to the internal or protected to scope.
	 * You dont have to care about super declaration in this habit.
	 * The origin method wont take place in the super scope when a method with the same
	 * name already exists.
	 * </p>
	 * 
	 * @see Oops#setProtected
	 * @see Oops#setInternal
	 * @see Oops#setSuper
	 * 
	 * @returns {Object} 	A collection of methods that are available in the super
	 * 						scope.
	 * 
	 * @throws 	{oopsIllegalOperationError}	If the caller object has no access to the 
	 * 										aligned methods of the super scope.
	 * @example
	 * <pre><code>
	 * <font color='#449944'>//method in super class</font>
	 * this.sum = function (v1, v2)
	 * {
	 *    return v1+v2;
	 * }
	 * 
	 * <font color='#449944'>//mark as super in subclass</font>
	 * this._protected.setSuper ("origSum", this.sum);
	 * 
	 * <font color='#449944'>//override method in sub class</font>
	 * this.sum = function (v1, v2, v3)
	 * {
	 *    return this._super.origSum (v1,v2) + v3;
	 * }
	 * </code></pre>
	 * 
	 * @public
	 */
	this._super = {};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Set the final name of the object and bind unpackaged objects.
	 * 
	 * <p>
	 * The first thing to bind is the final name.
	 * The name or instance name is always the same as the name of the class.
	 * It become always defined.
	 * </p>
	 * 
	 * <p>
	 * The second exercise is to align unpackaged classes to the oops packages.
	 * This is done by the inheritance chain lookup. The package of the first 
	 * super class in the chain that is already aligned to the oops framework
	 * become the package of the class. First come, first serve.
	 * </p>
	 * 
	 * <p>
	 * You have serveral controls to do that to alter auto packaging.
	 * <li> Define your class and the inhritance chain as 'weak'.
	 *      This will skip auto packaging. </li>
	 * <li> There is a global variable 'autoPackage' in the toplevel definition
	 *      Turning it to false from default true will skip auto packaging. </li>
	 * <li> If you want auto packaging but inherit from multiple classes
	 *      you can sort the extends() in the head section to point to the
	 *      desired package. Take a look at the example. </li>
	 * </p>
	 * 
	 * <p>
	 * It is very important for internal workflow in the oops framework to
	 * hold 'bind' in the public scope.
	 * </p>
	 * 
	 * @param	{Class}	signature	The class to bind.
	 * 								This is always that class which defines the 
	 * 								head section otherwise you run into unwanted 
	 * 								and uncaptured results.
	 * @example
	 * <pre><code>
	 * <font color='#449944'>//become aligned to the model package</font>
	 * function MyClass ()
	 * {
	 *    oopsRoot.register (MyClass);
	 *    this._extends = oopsElement;
	 *    this._extends ();
	 *
	 *    this._extends = oopsComposite;
	 *    this._extends ("list");	
	 *    this._bind(MyClass);
	 * }
	 * 
	 * <font color='#449944'>//become aligned to the composite package</font>
	 * function MyClass ()
	 * {
	 *    oopsRoot.register (MyClass);
	 *    this._extends = oopsComposite;
	 *    this._extends ("list");
	 *
	 *    this._extends = oopsElement;
	 *    this._extends ();			
	 *    this._bind(MyClass);
	 * }
	 * </code></pre>
	 * 
	 * @see oopsRoot#autoPackage
	 * @see __Toplevel#autoPackage
	 * @see Oops#init
	 * @public
	 */
	this._bind = function (signature)
	{
		this.name = signature.name;
		
		if (_address > 0)
		{	
			//package unknown objects
			if (oopsRoot.autoPackage)
			{
				var pkg = getScope(oopsConst.PKG);
				var chain;
				
				if (!pkg)
				{
					chain = oopsRoot.chainOf(_address);
					
					for (var i=0; i<chain.length; i++)
					{
						pkg = getScope(oopsConst.PKG, chain[i].name);
						
						if (pkg)
						{
							pkg[this.name] = signature;
							break;
						}
					}
				}				
			}
			
			//complete the creation process
			if (this.name == oopsRoot.chainOf(_address)[0].name)
			{
				oopsChainManager.instance()._internal.complete(this);	
			}
		}		
	};
	
	/**
	 * @description Check if a class signature matches the signature of an opps object instance.
	 * 				By using the <i>is</i> functionality you can work with type-safed objects in an
	 * 				application.
	 * 
	 * @param	{Class}	signature	A class definition to proof.
	 * 
	 * @returns {Boolean} 	Returns true if the object is a type of 
	 * 						the requested signature or false if not.
	 * 
	 * @throws 	{oopsIllegalOperationError}	If an oops object has no chain.
	 * 
	 * @example
	 * <pre><code>
	 * var elem = new oops.model.ProxyElement();
	 * alert (elem.is (oops.model.ProxyElement)); <font color='#449944'>//true</font>
	 * alert (elem.is (oops.trait.Trait)); <font color='#449944'>//false</font>
	 * alert (elem.is (oops.model.Element)); <font color='#449944'>//true</font>
	 * alert (elem.is (oops.event.EventDispatcher)); <font color='#449944'>//true</font>
	 * </code></pre>
	 * 
	 * @requires oopsIllegalOperationError
	 * @public
	 */
	this.is = function (signature)
	{ 
		var result = false;
		var chain  = (_address) ?oopsRoot.chainOf(_address) :[this]; 
		
		if (chain)
		{
			for (var i=0; i<chain.length; i++)
			{
				if (signature.name == chain[i].name)
				{
					result = true;
					break;
				}
			}
		}
		
		else
		{
			throw new oopsIllegalOperationError (4010, this);
		}
		
		return result;
	};
	
	/**
	 * @description Creates a string that reflects the name of a oops object.
	 * 				If the instance has an address which means it is registrated
	 * 				in a chain, it will reflect the nice name.
	 * 				The nicename is the key in the package declaration.
	 *  
	 * @returns {String}	A string reflection of an oops object.
	 * 
	 * @example
	 * <pre><code>
	 * var elem = new oops.model.Element();
	 * alert (elem.toString()); <font color='#449944'>//[Element]</font>
	 * alert (elem); <font color='#449944'>//[Element]</font>
	 * alert (elem.name); <font color='#449944'>//oopsElement</font>
	 * </code></pre>
	 *  
	 * @see Oops#name
	 * @see Oops#qName
	 * 
	 * @requires oops (Toplevel)
	 * @public
	 */
	this.toString = function ()
	{
		var result;
		var n = getScope(oopsConst.CLS_NAME);
		
		if (n)
		{
			result = "["+n+"]";
		}
		else
		{
			result = "["+this.name+"]";
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
	 * 				Initiates a new oops object chain.
	 * 				By registering to the oops chain it is allows to target the extended classes 
	 * 				of an oops object and the package location otherwise you dont. 
	 * <p>				
	 * Be careful while you try to set the init method to a scope like super or protected.
	 * That can cause unwanted results!
	 * 
	 * Keep in mind that in large applications you should care about cleaning up
	 * the chain from unused objects.
	 * </p>
	 * 
	 * @param {Boolean}	weak	If the dependency is weak, no registration to the oops chain
	 * 							is made. When doing so, you can't use the inheritance, scope and
	 * 							type features not as well as you would setup the weak property
	 * 							to false. 
	 * 							In some cases it is a good idea to do so, eg. for exceptions 
	 * 							beause the lifetime of those objects are quit short.
	 * 							(optional, default: false)
	 * 
	 * @requires oopsChainManager
	 * 
	 * @private
	 */
	var init = function (weak)
	{
		if (!weak)
		{
			_address = oopsChainManager.instance()._internal.bake(_address);			
		}
	};	
	
	init (weak);
}