//--------------------------------------------------------------------------
//
//  EventDispatcher (observer pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class The EventDispatcher class is the base class for all objets that wants to dispatch events. 
 *
 * <p>
 * The EventDispatcher class allows any function on the Javascript environment to be an 
 * event target and as such, to use the methods of the EventDispatcher functionality.
 *
 * In general, the easiest way for a user-defined class to gain event dispatching capabilities is 
 * to extend EventDispatcher. 
 * </p>
 *
 * @example	
 * <font color='#449944'>//The following example uses the base class EventDispatcher,</font>
 * <font color='#449944'>//to show how an event is created and dispatched.</font> 
 *
 * var eventType = "MyEventType";
 * var event = new oops.event.Event (eventType);
 *
 * var dispatcher = new oops.event.EventDispatcher ();
 * dispatcher.addEventListener (eventType, onEventReceived);
 * dispatcher.dispatchEvent (event);
 *			
 * function onEventReceived (evt)
 * {
 *		alert (evt.toString());
 *
 *		<font color='#449944'>// evt.target is the dispatcher reference</font>
 *		evt.target().removeEventListener (evt.type(), onEventReceived); 
 * } 
 * 
 * @requires Event
 * @public
 */
function oopsEventDispatcher()
{
	/*global oopsRoot*/
	/*global Oops*/
	/*global oopsEvent*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsEventDispatcher);
	this._extends = Oops;
	this._extends ();
	this._bind (oopsEventDispatcher);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the added event listeners and their event type link.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	 var events = [];	
	 
	 
	//--------------------------------------------------------------------------
	//
	//  privacy (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Sort event listeners by its priority.
	 * 
	 * @param	{Function} listener1	A Function to sort. 
	 * @param	{Function} listener1	Another Function to sort. 
	 * 
	 * @ignore
	 * @private
	 */
	var sortOnPriority = function(listener1,listener2)
	{
		return listener2.priority - listener1.priority;
	};
	
	/**
	 * @description Get a list of defined event listeners by its event type.
	 * 
	 * @param	{String} type	An event type. 
	 * 
	 * @ignore
	 * @private
	 */
	var getListenerByEventType = function (type)
	{
		var list = [];
		var i;
		
		if (type)
		{
			for (i=0; i<events.length; i+=1)
			{
				if (events[i].type === type){ list.push (events[i]); }
			}
			
			if (list.length > 1){ list.sort(sortOnPriority); }
		}		
		return list;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Registers an event listener object to an EventDispatcher object so that a listener 
	 * 				receives notification of an event. 
	 *
	 * <p>
	 * After you successfully register an event listener, you cannot change its priority through 
	 * additional calls to addEventListener(). To change a listener's priority, you must first call 
	 * removeListener(). Then you can register the listener again with the new priority level.
	 * </p>
	 * 
	 * <p>
	 * If you no longer need an event listener, remove it by calling removeEventListener(), 
	 * or memory problems could result. Event listeners are not automatically removed from memory.
	 * </p>
	 *
	 * <p>
	 * If an event listener is removed from a node while an event is being processed on the node, 
	 * it is still triggered by the current actions. After it is removed, the event listener is 
	 * never invoked again (unless registered again for future processing). 
	 * </p>
	 * 
	 * @param {String}	 type		The type of the Event.
	 * 
	 * @param {Function} listener	The listener function that is triggered by the event. 
	 *								This function must accept an event object as an argument.
	 *
	 * @param {int}      priority	The priority level of the event listener. 
	 *								The priority is designated by a signed 32-bit integer. 
	 *								The higher the number, the higher the priority. All 
	 *								listeners with priority n are processed before listeners 
	 *								of priority n-1. If two or more listeners share the same 
	 *								priority, they are processed in the order in which they 
	 *								were added. The default priority is 0. 
	 * 
	 * @throws {ArgumentError} If the type or listener is undefined.
	 * @see oopsEventDispatcher#removeEventListener
	 *
	 * @public
	 */
	this.addEventListener = function (type,listener,priority)
	{ 
		this._protected.isOrThrow ("type",type);
		this._protected.isOrThrow ("listener",listener);
		
		var registered, i = false;
		
		//check, if the event type to add has already 
		//a relationship to the defined listener
		for (i=0; i<events.length; i+=1)
		{
			if (events[i].type === type && events[i].listener === listener)
			{
				registered = true;
				break;
			}
		}
		
		if (!priority){ priority = 0; }
		if (!registered){ events.push({type:type, listener:listener, priority:priority}); }
	};
	
	/**
	 * @description Removes a listener from the EventDispatcher object. If there is no matching listener 
	 * 				registered with the EventDispatcher object, a call to removeEventListener() has no effect. 
	 * 
	 * @param {String}		type		The type of event. 
	 * @param {Function}	listener	The associated listener function. 
	 * 
	 * @throws {ArgumentError} If the type or listener is null.
	 * @see oopsEventDispatcher#addEventListener
	 * 
	 * @public
	 */
	this.removeEventListener = function (type,listener)
	{
		this._protected.isOrThrow ("type",type);
		this._protected.isOrThrow ("listener",listener);
		
		var i;		
				
		for (i=0; i<events.length; i+=1)
		{
			if (events[i].type === type && events[i].listener === listener)
			{ 
				events.splice (i,1);		
			}
		}
	};
	
	/**
	 * @description	Checks whether the EventDispatcher object has any listeners registered for a specific type of event. 
	 * 
	 * @param {String}	type	The type of event. 
	 * 
	 * @returns {Boolean}		A value of true if a listener of the specified type 
	 *							is registered, false otherwise. 
	 * @type Boolean
	 * @public
	 */
	this.hasEventListener = function (type)
	{
		this._protected.isOrThrow ("type",type);
		
		var listeners = getListenerByEventType (type);
		return (listeners.length > 0);
	};
	
	/**
	 * Dispatches an event into the event flow. The event target is the EventDispatcher object 
	 * upon which the dispatchEvent() method is called. 
	 * 
	 * <p>
	 * After an event is dispatched the chain of the event object is disposed!
	 * In other words you can't simply re-dispatch an event. You have to create a new one
	 * or simply clone it.
	 * </p>
	 * 
	 * @param {Event}	event	The Event object that is dispatched into the event flow. 
	 *							After an event is dispatched, its target property cannot be changed, 
	 *							so you must create a new copy of the event for redispatching to work. 
	 *
	 * @returns {Boolean}		A value of true if the event was successfully dispatched. A value of 
	 *							false indicates a failure. 
	 *
	 * @type Boolean
	 * @throws {TypeError} If the event object isn't from type Event.
	 * @see oopsEvent#clone
	 * @see oopsChainManager#dispose
	 * 
	 * @public
	 */
	this.dispatchEvent = function (event)
	{ 
		this._protected.isOrThrow("event", event, oopsEvent);	
	
		var dispatchState, i = false;
		
		//adding this as the target
		event._internal.setTarget (this);
		
		//get registraded listeners
		var listeners = getListenerByEventType (event.type());
		
		for (i=0; i<listeners.length; i+=1)
		{ 
			listeners[i].listener (event);				
		}			
		
		dispatchState = (listeners.length > 0);
		oopsRoot.dispose (event);
				
		return dispatchState;
	};	
}