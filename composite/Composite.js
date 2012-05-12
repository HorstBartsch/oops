//--------------------------------------------------------------------------
//
//  Composite (composite pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsComponent
 * @class 	Represents a collection of components in the composite pattern.
 * 			 A composite pattern helps you to build complex hierachies.
 * 
 * @param {String} id	Set the identifier of a composite.
 * 						Use the id to fetch a composition in superordinated
 * 						<i>composition</i>.
 * 
 * @public  
 */
function oopsComposite (id)
{
	/*global oopsRoot*/
	/*global oopsComponent*/
	/*global oopsRangeError*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
		
	oopsRoot.register (oopsComposite);	
	this._extends = oopsComponent;
	this._extends (id);
	this._bind (oopsComposite);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds all subordinated components.
	 * 
	 * @default this
	 * @type oopsComponent
	 * 
	 * @private
	 * @ignore
	 */
	var _components = [];
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the amount of subordianted components.
	 * 
	 * @returns {uint}	The amount of subordianted components.
	 * @type uint
	 * 
	 * @public  
	 * @field
	 */
	this.numChildren = function ()
	{
		return _components.length;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Returns the position of a component in a composition.
	 * 
	 * @param {oopsComponent}	component	The component to identify.
	 * 
	 * @param {fromIndex} 		fromIndex	The location in the composition 
	 * 										from which to start searching for 
	 * 										the component. (default 0) 
	 * 
	 * @returns {int} 	The position of the requested component in the 
	 * 					composition. If the component is not found the 
	 * 					return value is -1.
	 * 
	 * @throws 	{oopsTypeError}	If the component is not from
	 * 							type oopsComponent.
	 * 
	 * @throws 	{oopsArgumentError}	If the component is not undefined.
	 * 
	 * @throws 	{oopsRangeError}	If the fromIndex argument is out 
	 * 								of range.
	 * 
	 * @see oopsComposite#lastIndexOf
	 * @public
	 */
	this.indexOf = function (component, fromIndex)
	{		
		this._protected.isOrThrow("component", component, oopsComponent);		
		
		if (fromIndex === undefined || fromIndex < 0)
		{			
			throw new oopsRangeError (3000,fromIndex);
		}
		
		return _components.indexOf(component,fromIndex)	;
	};
	
	/**
	 * @description Returns the position of a component in a composition.
	 * 				Unlike <i>indexOf</i> this working backwards through
	 * 				the collection.
	 * 
	 * @param {oopsComponent}	component	The component to identify.
	 * 
	 * @param {fromIndex} 		fromIndex	The location in the composition 
	 * 										from which to start searching for 
	 * 										the component. (default length-1) 
	 * 
	 * @returns {int} 	The position of the requested component in the 
	 * 					composition. If the component is not found the 
	 * 					return value is -1.
	 * 
	 * @throws 	{oopsTypeError}		If the component is not from
	 * 								type oopsComponent.
	 * 
	 * @throws 	{oopsArgumentError}	If the component is not undefined.
	 * 
	 * @throws 	{oopsRangeError}	If the fromIndex argument is out 
	 * 								of range.
	 * 
	 * @see oopsComposite#indexOf
	 * @public
	 */
	this.lastIndexOf = function (component, fromIndex)
	{
		this._protected.isOrThrow("component", component, oopsComponent);	
		
		if (fromIndex === undefined || fromIndex < 0)
		{
			throw new oopsRangeError (3000,fromIndex);
		}
		
		return  _components.lastIndexOf(component,fromIndex);
	};
	
	/**
	 * @description Returns the component at the specified index.
	 * 
	 * @param {uint} index	The position of the component. 
	 * 
	 * @returns {oopsComponent} 	The component at the specified
	 * 								position. 
	 * 
	 * @throws 	{oopsRangeError}	If the fromIndex argument is out 
	 * 								of range.
	 * 
	 * @see oopsComposite#getChildById
	 * @public
	 */
	this.getChildAt = function (index)
	{
		if (index >= this.numChildren() || index < 0)
		{
			throw new oopsRangeError (3000, "index");
		}
		
		return _components[index];
	};
	
	/**
	 * @description Returns the component by the specified identifier.
	 * 
	 * @param {String} id	The indentifier of the component. 
	 * 
	 * @returns {oopsComponent} 	The component with the specified
	 * 								identifier. 
	 * 
	 * @throws 	{oopsArgumentError}	If the id argument is undefined.
	 * 
	 * @see oopsComposite#getChildAt
	 * @public
	 */
	this.getChildById = function (id)
	{
		var result = null;
		var component;
		var childComponent;
		
		this._protected.isOrThrow ("id",id);
		
		//the id argument is this id
		if (this.id() === id)
		{
			result = this;
		}
		
		//search in subordinates
		else
		{
			for (var i=0; i<_components.length; i+=1)
			{
				component = _components[i];
				
				//the subordinate is an oopsComponent
				if (component.id() === id)
				{
					result = component;
					break;
				}
				
				//the subordinate is an oopsComposite
				//we have to search in this object too!
				else if (component.is(oopsComposite))
				{
					childComponent = component.getChildById (id);
					
					if (childComponent)
					{
						result = childComponent;
						break;
					}
				}
			}
		}
		
		return result;
	};
	
	/**
	 * @description Add a component to the composition.
	 * 
	 * @param {oopsComponent} component	The component to add. 
	 * 
	 * @returns {oopsComponent} The added component.
	 * 
	 * @throws 	{oopsArgumentError}	If the component argument is undefined.
	 * 
	 * @throws 	{oopsTypeError}		If the component is not from type
	 * 								oopsComponent.
	 * 
	 * @see oopsComposite#addChildAt
	 * @public
	 */
	this.addChild = function (component)
	{ 
		this._protected.isOrThrow("component", component, oopsComponent);	
		component._internal.setParent (this);
		_components.push(component);
		return component;
	};
	
	/**
	 * @description Add a component to the composition at a specific position.
	 * 
	 * @param {oopsComponent} 	component	The component to add. 
	 * @param {int} 			index		The position of the component. 
	 * 
	 * @returns {oopsComponent} The added component.
	 * 
	 * @throws 	{oopsArgumentError}	If the component argument is undefined.
	 * @throws 	{oopsTypeError}		If the component is not from type
	 * 								oopsComponent.
	 * @throws 	{oopsRangeError}	If the index argument is out 
	 * 								of range.
	 * 
	 * @see oopsComposite#addChild
	 * @public
	 */
	this.addChildAt = function (component,index)
	{
		this._protected.isOrThrow("component", component, oopsComponent);	
			
		if (index >= this.numChildren || index < 0)
		{
			throw new oopsRangeError (3000, "index");
		}
		
		component._internal.setParent (this);
		_components.splice(index, 0, component);
		return component;			
	};
	
	/**
	 * @description Remove a component from the composition.
	 * 
	 * @param {oopsComponent} component	The component to remove. 
	 * 
	 * @returns {oopsComponent} The removed component.
	 * 
	 * @throws 	{oopsArgumentError}	If the component argument is undefined.
	 * 
	 * @throws 	{oopsTypeError}		If the component is not from type
	 * 								oopsComponent.
	 * 
	 * @see oopsComposite#removeChildAt
	 * @see oopsComposite#removeChildById
	 * @public
	 */
	this.removeChild = function (component)
	{
		var result = null;
		var comp;
		var compChild;
		
		this._protected.isOrThrow("component", component, oopsComponent);	
		
		//the requested component is this object
		if (component === this)
		{
			result = this;
		}	
		
		//search in subordinates
		else
		{
			for (var i=0;i<_components.length; i++)
			{
				comp = _components[i];
				
				//the subordinate is an oopsComposite
				//we have to search in this object too!
				if (comp.is(oopsComposite))
				{
					compChild = comp.removeChild (component);
					
					if (compChild)
					{
						if (this.indexOf(compChild) > -1)
						{
							_components.splice(i,1);
						}
						
						result = compChild;
						break;
					}
				}
				
				//the subordinate is an oopsComponent, just proof
				else if (component == comp)
				{
					result = comp;
					_components.splice(i,1);
					break;
				}
			}
		}
				
		if (result)
		{
			result._internal.setParent(null);
		}
		
		return result;
	};
	
	/**
	 * @description Remove a component from the composition at a specific position.
	 * 
	 * @param {int} index		The position of the component. 
	 * 
	 * @returns {oopsComponent} The removed component.
	 * 
	 * @throws 	{oopsRangeError}			If the index argument is out 
	 * 										of range.
	 * 
	 * @see oopsComposite#removeChild
	 * @see oopsComposite#removeChildById
	 * @public
	 */
	this.removeChildAt = function (index)
	{
		var result;
		
		try
		{
			result = this.getChildAt (index);
			if (result)
			{
				this.removeChild (result);
			}
		}
		catch (e)
		{
			throw e;
		}

		return result;
	};
	
	/**
	 * @description Remove a component from the composition by a specific identifier.
	 * 
	 * @param {String} id		The identifier of the component. 
	 * 
	 * @returns {oopsComponent} The removed component.
	 * 
	 * @throws 	{oopsArgumentError}	If the id argument is undefined.
	 * 
	 * @see oopsComposite#removeChild
	 * @see oopsComposite#removeChildAt
	 * @public
	 */
	this.removeChildById = function (id)
	{
		var result;
		
		try
		{
			result = this.getChildById (id);
			if (result) 
			{
				this.removeChild (result);
			}
		}
		catch (e)
		{
			throw e;
		}

		return result;
	};
}