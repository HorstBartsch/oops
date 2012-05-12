//--------------------------------------------------------------------------
//
//  StateContext (state machine pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments oopsTrait
 * @class 	Creates a new state machine that can be aligned 
 * 			to a model by its trait functionality. 
 * 
 * <p style='font-size:14px;'><b>dispatched events:</b></p>
 * <li>oopsStatusEvent.FAILED - <i>the transition failes</i></li>
 * <li>oopsStatusEvent.CHANGE - <i>the state was changed</i></li>
 *
 * @example	
 * <pre><code>
 * <font color='#449944'>//This example represents a simple example of pause, stop</font>
 * <font color='#449944'>//and play buttons for a video player that uses a state machine.</font>
 * 
 * <font color='#449944'>//create the state objects.</font>
 * <font color='#449944'>//we skip the head section - all of them extends from oopsState</font>
 * 
 * function PauseState ()
 * {
 *   <font color='#449944'>//define this state id</font>
 *   this._protected.addHandler ("pause");
 *   
 *   <font color='#449944'>//define allowed state ids</font>
 *   this._protected.addHandler ("play");	
 *   this._protected.addHandler ("stop");	
 * }
 * 
 * function PlayState ()
 * {
 *   this._protected.addHandler ("play");
 *   this._protected.addHandler ("pause");	
 * }
 * 
 * function StopState ()
 * {
 *   this._protected.addHandler ("stop");
 *   this._protected.addHandler ("play");	
 * }
 * 
 * <font color='#449944'>//create the statemachine.</font>
 * function PlayerStatus ()
 * {
 *   oopsRoot.register (PlayerStatus);
 *   this._extends = oopsStateContext;
 *   this._extends ("playerState");
 *   this._bind (PlayerStatus);
 *   
 *   <font color='#449944'>//defines the initial state</font>
 *   this._protected.registerState (new StopState());
 *   
 *   <font color='#449944'>//other states</font>
 *	 this._protected.registerState (new PlayState());
 *	 this._protected.registerState (new PauseState());	
 * }
 * 
 * <font color='#449944'>//the player model (simple)</font>
 * function Player ()
 * {
 *   oopsRoot.register (Player);
 *   this._extends = oopsElement;
 *   this._extends ();
 *   this._bind (Player);
 *   
 *   this.addTrait ("playerState", new PlayerStatus());
 * }
 * 
 * var player = new Player ();
 * <font color='#449944'>//While the state machine is simply a trait</font>
 * <font color='#449944'>//you can temporary remove the state to block transitions!</font>
 * <font color='#449944'>//in this case we asume that it is presented</font>
 * var state = player.getTrait ("playerState");
 * state.addEventListener (oops.event.StatusEvent.FAILED, onTransition);
 * state.addEventListener (oops.event.StatusEvent.CHANGE, onTransition);
 * 
 * function onTransition (evt)
 * {
 *   alert (evt.toString()); 
 * }
 * 
 * state.translateTo ("pause"); <font color='#449944'>//would fail because you can't translate from stop to pause</font>
 * state.translateTo ("seek");  <font color='#449944'>//would fail because seek is not defined</font>
 * state.translateTo ("play");  <font color='#449944'>//ok</font>
 * state.translateTo ("stop");  <font color='#449944'>//would fail because you have to pause previously</font>
 * state.translateTo ("pause"); <font color='#449944'>//ok</font>
 * state.translateTo ("stop");  <font color='#449944'>//ok</font>
 * </code></pre>
 *
 * @see oopsState
 * @see oopsStateMessage
 * @public
 */
function oopsStateContext (type)
{
	/*global oopsRoot*/
	/*global oopsTrait*/
	/*global oopsState*/
	/*global oopsStateMessage*/
	/*global oopsStatusEvent*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
	
	oopsRoot.register (oopsStateContext);
	this._extends = oopsTrait;
	this._extends (type);
	this._bind (oopsStateContext);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the current state of the state machine.
	 * 
	 * @default oopsState
	 * @type oopsState
	 * 
	 * @private
	 * @ignore
	 */
	var _currentState;
	
	/**
	 * @description Holds all registered states.
	 * 
	 * @default {}
	 * @type Object
	 * 
	 * @private
	 * @ignore
	 */
	var _states = {};
	
	/**
	 * @description Holds a reference of itself for access purpose in non-public methods.
	 * 
	 * @default this
	 * @type oopsState
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
	 * 				Called from a state object to perform a transition to another state. 
	 * 
	 * @param {String} stateId	The id of the state to translate to.
	 * 
	 * @private
	 */
	var processTransition = function (stateId)
	{
		self._protected.isOrThrow ("stateId",stateId);
		self._protected.process (stateId);
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>internal</span>
	 * 				Called from a state object to invalidate a transition request.
	 * 
	 * @param {String} message	A short description why the transition failes.
	 * 
	 * @private
	 */
	var invalidateTransition = function (message)
	{
		self._protected.isOrThrow ("message",message);
		self._protected.invalidate (message);
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Align a new state to the state machine. If a context has no states it can't perfom any
	 * 				transitions.
	 * 
	 * @param {oopsState} state		A state to align.
	 * 								The first time you call registerState will define the initial state.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>state</i> is undefined.
	 * @throws {oopsTypeError} 		If the argument <i>state</i> is not from type oopsState.
	 * 
	 * @private
	 */
	var registerState = function (state)
	{
		self._protected.isOrThrow ("state",state,oopsState);
		
		state._internal.setContext (self);
		_states[state.id()] = state;
		
		if (!_currentState)
		{
			_currentState = state;
		}
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Perform a transition to another state. Unlike <i>translateTo</i> this does the real
	 * 				job without any conditional evaluations.
	 * 				<p style='font-size:14px;'><b>dispatched events:</b></p>
	 * 				<li>oopsStatusEvent.CHANGE - <i>the state was changed</i></li>
	 * 
	 * @param {String} stateId	The id of the state to translate to.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @private
	 */
	var process = function (stateId)
	{
		self._protected.isOrThrow ("stateId",stateId);
		
		_currentState = _states[stateId];
		self.dispatchEvent(new oopsStatusEvent(oopsStatusEvent.CHANGE,_currentState));	
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Perform a transition to another state without dispatching an event.
	 * 
	 * @param {String} stateId	The id of the state to translate to.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @private
	 */
	var processSilent = function (stateId)
	{
		self._protected.isOrThrow ("stateId",stateId);		
		_currentState = _states[stateId];
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Can be called from subclasses to invalidate a transition request.
	 * 				<p style='font-size:14px;'><b>dispatched events:</b></p>
	 * 				<li>oopsStatusEvent.FAILED - <i>the transition failes</i></li>
	 * 
	 * @param {String} message	A short description why the transition failes.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>message</i> is undefined.
	 * 
	 * @private
	 */
	var invalidate = function (message)
	{
		self._protected.isOrThrow ("message",message);		
		self.dispatchEvent(new oopsStatusEvent(oopsStatusEvent.FAILED,_currentState,message));	
	};	
	
	this._protected.setInternal ("processTransition", processTransition);	
	this._protected.setInternal ("invalidateTransition", invalidateTransition);	
	this._protected.setProtected ("registerState", registerState);	
	this._protected.setProtected ("process", process);	
	this._protected.setProtected ("processSilent", processSilent);	
	this._protected.setProtected ("invalidate", invalidate);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the current state from the state machine.
	 * 
	 * @type oopsState
	 * 
	 * @public  
	 * @field
	 */
	this.state = function ()
	{
		return _currentState;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (method)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Proof if a state machine has a specific state registered.
	 * 
	 * @param	{String}  stateId	The state id to proof. 							
	 *  
	 * @returns {Boolean}	True if the state exists otherwise false. 
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @public
	 */
	this.hasState = function(stateId)
	{
		this._protected.isOrThrow ("stateId",stateId);
		return (_states[stateId] !== null);
	};
	
	/**
	 * Proof if the transition from one state to another can perform.
	 * 
	 * <p>
	 * By default you can't translate to the same state. If you want to so you can override
	 * the <i>sameStateIdAllowed</i> getter in a state and return true. A use case could be 
	 * the transition to another volume.
	 * </p>
	 * 
	 * @param	{String}  stateId	The state id to tranlate to. 							
	 *  
	 * @returns {Boolean}	True if the transition can perform otherwise false. 
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @see oopsState#canHandle
	 * @see oopsState#sameStateIdAllowed
	 * @public
	 */
	this.canTranslateTo = function(stateId)
	{	
		this._protected.isOrThrow ("stateId",stateId);
		var result = true;
		
		if(_states[stateId])
		{
			//its not enough to check if a state is aligned in a context
			//we have to proof if the state can switch to the requested state
			result = _currentState.canHandle(stateId);
		}
		else
		{
			result = false;
		}
		
		return result;
	};
	
	/**
	 * @description Perform a transition to another state.
	 * 
	 * <p>
	 * By default the transition does not perform if the state is already active, the target
	 * state is not defined as a handler or the state is not registered in the context. 
	 * If the transition is capable the method <i>processTransition</i> otherwise 
	 * <i>invalidateTransition</i> is called.
	 * </p>
	 * 
	 * @param {String} stateId The id of a state to translate to.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @see oopsState#addHandler
	 * @see oopsContext#processTransition
	 * @see oopsContext#invalidateTransition
	 * @see oopsStateMessage#UNKNOWN_STATE
	 * @public
	 */
	this.translateTo = function(stateId)
	{
		this._protected.isOrThrow ("stateId",stateId);
		if(_states[stateId])
		{
			_currentState._internal.handle(stateId);
		}
		else
		{
			this._internal.invalidateTransition(oopsStateMessage.UNKNOWN_STATE);
		}
	};
}