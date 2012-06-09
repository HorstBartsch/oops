//--------------------------------------------------------------------------
//
//  Event (observer pattern)
//
//--------------------------------------------------------------------------
//TODO make weak
	
/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class Creates an Event object to pass as a parameter to event listeners. 
 *
 * <p>
 * The Event class is used as the base class for the creation of Event objects, 
 * which are passed as parameters to event listeners when an event occures.
 * The properties of the Event class carry basic information about an event, such as the event's type.
 * For many events, such as the events represented by the Event class constants, this basic information 
 * is sufficient. Other events, however, may require more detailed information.  
 * You can pass additional information to event listeners by extending the Event class. 
 * </p> 
 * 
 * @param {String}	type	The type of the event. 
 *
 * @example	
 * <pre><code>
 * var eventType = "MyEventType";
 * var event = new oops.event.Event (eventType);
 *
 * var dispatcher = new oops.event.EventDispatcher ();
 * dispatcher.addEventListener (eventType, onEventReceived);
 * dispatcher.dispatchEvent (event);
 *			
 * function onEventReceived (evt)
 * {
 *  alert (evt.toString());
 *
 *  <font color='#449944'>// evt.target is the dispatcher reference</font>
 *  evt.target().removeEventListener (evt.type(), onEventReceived); 
 * } 
 * </code></pre>
 *
 * @see oopsEventDispatcher
 * @public
 */
function oopsEvent (type)
{
	
	/*global oopsRoot*/
	/*global oopsConst*/
	/*global Oops*/
		
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsEvent);
	this._extends = Oops;
	this._extends ();
	this._bind (oopsEvent);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the event type.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _type;
	
	/**
	 * @description Holds the event dispatcher.
	 * 
	 * @default null
	 * @type oopsEventDispatcher
	 * 
	 * @private
	 * @ignore
	 */
	var _target;
	
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
	//  scopes
	//
	//--------------------------------------------------------------------------	
		
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>internal</span>
	 * 				Set the reference object that dispatches the event. 
	 * 
	 * @param	{oopsEventDispatcher} value	The reference object that dispatches the event. 
	 * @requires oopsEventDispatcher
	 * @private
	 */
	var setTarget = function (value)
	{ 
		_target = value;
	};
	
	this._protected.setInternal ("setTarget", setTarget);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * The type of an event. The type is case-sensitive. 
	 * 
	 * @type String
	 * @field
	 * @public
	 */
	this.type = function ()
	{
		return _type;
	};
	
	/**
	 * Get the reference that dispatch an event.
	 * 
	 * @type oopsEventDispatcher
	 * 
	 * @public
	 * @field
	 */
	this.target = function ()
	{
		return _target;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Creates a string that reflects the definition of an event object.
	 *  
	 * @returns {String}	A string reflection of an event object. 
	 * @public
	 */
	this.toString = function ()
	{
		return '['+this._protected.scopeOf(oopsConst.CLS_NAME)+' type="'+this.type()+'"]';
	};
	
	/**
	 * @description Clone an event.
	 *  
	 * @public
	 */
	this.clone = function ()
	{
		return new oops.event.Event (this.type());
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  construct
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates a new event. 
	 * 
	 * @param {String} type	The type of the event. 
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>type</i> is undefined.
	 * 
	 * @see oopsEventDispatcher
	 * @private
	 */
	var init = function (type)
	{
		self._protected.isOrThrow ("type",type);
		_type = type;
	};
	
	init(type);	
}