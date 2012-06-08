//--------------------------------------------------------------------------
//
//  State (state machine pattern)
//
//--------------------------------------------------------------------------

/**
 * @author <a href="mailto:tbusse@poppy-circus.de">Tobias Busse</a>
 * 
 * @augments Oops
 * @class Creates a new state that can be aligned to a state machine (context).
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
 * @see oopsStateContext
 * @see oopsStateMessage
 * @public
 */
function oopsState ()
{
	/*global oopsRoot*/
	/*global Oops*/
	/*global oopsStateMessage*/
	/*global oopsStateContext*/
	
	//--------------------------------------------------------------------------
	//
	//  head
	//
	//--------------------------------------------------------------------------
		
	oopsRoot.register (oopsState);		
	this._extends = Oops;
	this._extends ();	
	this._bind (oopsState);
	
	
	//--------------------------------------------------------------------------
	//
	//  privacy (properties)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Holds the id of a state.
	 * 
	 * @default null
	 * @type String
	 * 
	 * @private
	 * @ignore
	 */
	var _id;
	
	/**
	 * @description Holds the state machine where a state is aligned to.
	 * 
	 * @default null
	 * @type oopsStateContext
	 * 
	 * @private
	 * @ignore
	 */
	var _context;
	
	/**
	 * @description Holds the id's of other states to allow transition between them.
	 * 
	 * @default null
	 * @type Array
	 * 
	 * @private
	 * @ignore
	 */
	var _handles;
	
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
	 * 				Adds the superordinated state machine (context) to a state.
	 * 
	 * @param {oopsStateContext} value	The superordianted state machine.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>value</i> is undefined.
	 * 
	 * @private
	 * @field
	 */
	var setContext = function (value)
	{
		self._protected.isOrThrow ("value",value,oopsStateContext);
		_context = value;
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Allow the transition to the same state id. The default is <i>false</i>.
	 * 				A use case could be the transition to another volume.
	 * 
	 * @private
	 */
	var sameStateIdAllowed = function ()
	{
		return false;
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>protected</span>
	 * 				Adds a new handler to the state. If a state has no handlers it can't perfom any
	 * 				transitions. By defining a handler you define the allowed transitions to other states.
	 * 
	 * @param {String} stateId	The id of a state.
	 * 							The first time you call addHandler will define the own id of the state.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @private
	 */
	var addHandler = function (stateId)
	{
		self._protected.isOrThrow ("stateId",stateId);
		
		if (!_handles)
		{
			_handles = [];
			_id = stateId;
		}
		
		//always add a stateId to handle (also the initial one)
		_handles.push (stateId);
	};
	
	/**
	 * @description <span style='font-size:14px;font-style:italic;font-weight:bold'>internal</span>
	 * 				Called from the state machine reference (context) to perform a transition.
	 * 
	 * <p>
	 * By default the transition does not perform if the state is already active or the target
	 * state is not defined as a handler. If the transition is capable the method
	 * <i>processTransition</i> otherwise <i>invalidateTransition</i> is called in the context.
	 * </p>
	 * 
	 * @param {String} stateId The id of a state the state machine wants to tranlate to.
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @see oopsState#addHandler
	 * @see oopsContext#processTransition
	 * @see oopsContext#invalidateTransition
	 * @see oopsStateMessage#UNKNOWN_HANDLE
	 * @see oopsStateMessage#ALREADY_ACTIVE
	 * @private
	 */
	var handle = function (stateId)
	{
		self._protected.isOrThrow ("stateId",stateId);
		
		//It is not possible to use canHandle() here because
		//we want to devide the occurance of the invalidation result.
		
		//no transition to a state with the same type or the transition is explicit allowed
		//otherwise process invalidation 			
		if (stateId !== _id || self._protected.sameStateIdAllowed())
		{
			//requested state type is allowed to translate --> process
			//otherwise process invalidation 	
			if (_handles.indexOf(stateId) > -1)
			{
				_context._internal.processTransition(stateId);
			}
			else
			{
				_context._internal.invalidateTransition(oopsStateMessage.UNKNOWN_HANDLE);
			}
		}
		else
		{
			_context._internal.invalidateTransition(oopsStateMessage.ALREADY_ACTIVE);
		}
	};
	
	this._protected.setInternal ("setContext", setContext);	
	this._protected.setInternal ("handle", handle);	
	this._protected.setProtected ("sameStateIdAllowed", sameStateIdAllowed);	
	this._protected.setProtected ("addHandler", addHandler);
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (getter / setter)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * @description Get the id of a state.
	 * 
	 * @type String
	 * 
	 * @public  
	 * @field
	 */
	this.id = function ()
	{
		return _id;
	};
	
	/**
	 * @description Get the state machine (context) where a state is aligned to.
	 * 
	 * @type oopsStateContext
	 * 
	 * @public  
	 * @field
	 */
	this.context = function ()
	{
		return _context;
	};
	
	
	//--------------------------------------------------------------------------
	//
	//  publicity (methods)
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Proof if the transition from one state to another can perform on <i>state</i> level.
	 * Typically you would do the check in the <i>StateContext</i>
	 * 
	 * <p>
	 * By default you can't translate to the same state. If you want to so you can override
	 * the <i>sameStateIdAllowed</i> getter and return true. A use case could be the transition
	 * to another volume.
	 * </p>
	 * 
	 * @param	{String}  stateId	The state id to tranlate to. 							
	 *  
	 * @returns {Boolean}	True if the transition can perform otherwise false. 
	 * 
	 * @throws {oopsArgumentError} 	If the argument <i>stateId</i> is undefined.
	 * 
	 * @see oopsStateContext#canTranslateTo
	 * @public
	 */
	this.canHandle = function(stateId)
	{
		this._protected.isOrThrow ("stateId",stateId);
		var result=true;

		//no transition to a state with the same type or the transition is explicit allowed
		if (stateId !== _id || this._protected.sameStateIdAllowed())
		{
			//requested state type is allowed to translate
			if (_handles.indexOf(stateId) === -1)
			{
				result=false;
			}
		}
		else
		{
			result=false;
		}
		
		return result;
	};
}