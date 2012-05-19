//--------------------------------------------------------------------------
//
//  StatusEvent (observer pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsEvent
 * @class 	Creates a StatusEvent object that is dispatched when a
 * 			Statemachine performs a transition to another state.
 * 
 * @param {String}		type	The type of the event. 
 * @param {oopsState}	state	The new state in the state machine.
 * @param {uint}		message	A message you can proof if a state transition
 * 								failes. This value is optional.
 * 
 * @see oopsStateMessage
 * @see oopsStateContext
 * @see oopsState
 * @see oopsEventDispatcher
 * @public
 */
function oopsStatusEvent (type,state,message)
{ 
	/*global oopsRoot*/
	/*global oopsEvent*/
	/*global oopsConst*/
	/*global oopsState*/
	/*global oopsStateMessage*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsStatusEvent);
	this._extends = oopsEvent;
	this._extends (type);
	this._bind (oopsStatusEvent);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the state property.
	 * 
	 * @default null
	 * @type oopsState
	 * 
	 * @private
	 * @ignore
	 */
	var _state;
	
	/**
	 * @description Holds the message.
	 * 
	 * @default oopsStateMessage.VALID
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _message;
    
    /**
	 * @description Holds a reference of itself for access purpose in non-public methods.
	 * 
	 * @default this
	 * @type oopsEvent
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
	 * Get the current state of the related state machine.
	 * 
	 * @type oopsState
	 * @field
	 * @public
	 */
	this.state = function ()
	{
		return _state;
	};
	
	/**
	 * @description Get a message to proof why a state transition
	 * 				has failed.
	 * 
	 * @default oopsStateMessage.VALID
	 * @type uint
	 * 
	 * @public
	 * @field
	 */
	this.message = function ()
	{
		return _message;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Creates a string that reflects the definition of a state event.
	 *  
	 * @returns {String}	A string reflection of a state event. 
	 * @public
	 */
	this.toString = function ()
	{
		return '['+this._protected.scopeOf(oopsConst.CLS_NAME)+' type="'+this.type()+'" state="'+this.state()+'" message="'+this.message()+'"]';
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>override</span>
	 * 				Clone an StatusEvent.
	 *  
	 * @public
	 */
	this.clone = function ()
	{
		return new oopsStatusEvent (this.type(),this.state(),this.message());
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  construct
	//
	//--------------------------------------------------------------------------	
	
	/** 
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>construct</span>
	 * 				Initiates a new StateEvent. 
	 * 
	 * @param {oopsState}	state	The new state in the state machine.
	 * @param {uint}		message	A message you can proof if a state transition
	 * 								failes. This value is optional.
	 * 
	 * @throws 	{oopsArgumentError}	If the argument <i>state</i> is undefined.
	 * 
	 * @see oopsEventDispatcher
	 * @private
	 */
	var init = function (state,message)
	{
		self._protected.isOrThrow ("state",state,oopsState);
		
		_state = state;
		_message = (message) ?message :oopsStateMessage.VALID;
	};
	
	init(state,message);	
}

/**
 * The oopsStatusEvent.FAILED constant defines the value of the type property 
 * of an event object. It is dispatched when a state transition failes.
 * 
 * @constant
 * @static
 * @public
 */
oopsStatusEvent.FAILED = "transition_failed";

/**
 * The oopsStatusEvent.CHANGE constant defines the value of the type property 
 * of an event object. It is dispatched while translating to another state successfully.
 * 
 * @constant
 * @static
 * @public
 */
oopsStatusEvent.CHANGE = "translated";