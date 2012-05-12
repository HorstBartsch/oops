//--------------------------------------------------------------------------
//
//  Trait (trait pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsEventDispatcher
 * @class 	Represents a trait of a model.
 * 			The main idea is to encapsulate functionality of a model. 			
 * 
 * <p>
 * This ofters you some possiblities:
 * </p>
 * 
 * <li>you can switch behavior during runtime</li>
 * <li>you can block processing for a time period during runtime, eg playing a video while an ad is displayed</li>
 * <li>you can implement new functionality without affecting the live version</li>
 * <li>unit tests are quit easier to handle</li>
 * <li>your model keeps very clean</li>
 * 
 * @param {String} type	The type of the trait.
 * 						Use the type to fetch a trait from a <i>element</i>.
 * 
 * @example	
 * <pre><code>
 * <font color='#449944'>//Bind a trait</font>
 * var elem = new oops.model.Element ();
 * elem.addEventListener (oops.event.TraitEvent.ADD, onTraitAdd);
 * elem.addTrait ("myTrait", new oops.trait.Trait("myTrait"));
 * 
 * <font color='#449944'>//A new trait was added</font>	
 * function onTraitAdd (evt)
 * {
 *  alert (evt.traitType() + " added to " + evt.target());
 * }
 * 
 * <font color='#449944'>//Execute trait functionality</font>
 * <font color='#449944'>//its just a showcase - you should extend oopsTrait</font>
 * <font color='#449944'>//and provide an <i>execute</i> function in this case</font>
 * var trait = elem.getTrait ("myTrait");
 * trait.execute();
 * </code></pre>
 * 
 * @see oopsElement
 * @public  
 */
function oopsTrait (type)
{
	/*global oopsRoot*/
	/*global oopsEventDispatcher*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsTrait);
	this._extends = oopsEventDispatcher;
	this._extends ();	
	this._bind (oopsTrait);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------	
	
	/**
	 * @description Holds the type of a trait.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _type;
	
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
    
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the type of a trait.
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
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (method)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Dispose a trait.
	 * 				This method is called when you remove a trait from a model.
	 * 				The default trait object does nothing in this case.
	 * 				You should inherit from a <i>trait</i> to create your
	 * 				own specific trait.
	 * 
	 * @see oopsElement
	 * @public 
	 */
	this.dispose = function ()
	{
		
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  construct
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates a new trait. 
	 * 
	 * @param {String} type	The type of the trait.
	 * 						Use the type to fetch a trait from a <i>element</i>.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>type</i> is undefined.
	 * 
	 * @see oopsElement
	 * @private
	 */
	var init = function (type)
	{
		self._protected.isOrThrow("type", type);	
		_type = type;
	};
	
	init (type);
}