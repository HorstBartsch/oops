//--------------------------------------------------------------------------
//
//  Transition descriptions
//
//--------------------------------------------------------------------------

/**
 * @class 	The StateMessage object provides short descriptions for state transitions
 * 			that are dispatched by a <i>StateEvent</i>. 
 * 
 * @name oopsStateMessage
 * @see oopsStatusEvent
 * @see oopsStateContext
 * @see oopsState
 * 
 * @public
 */
var oopsStateMessage =
/** @lends oopsStateMessage# */
{
	/**
	 * @description	VALID defines the message of an state event
	 * 				that declares a successfull state transition.
	 * 				It is the default message of a <i>StatusEvent</i>
	 * 
	 * @constant
	 * @type String
	 */
	VALID: 1,
	
	/**
	 * @description	UNKNOWN_STATE defines the message of an state event
	 * 				that declares a failed state transition. The related
	 * 				<i>State</i> is not presented in the <i>StateContext</i>.
	 * 
	 * @constant
	 * @type String
	 * 
	 * @see oopsContext#translateTo
	 */
	UNKNOWN_STATE: 6001,
	
	/**
	 * @description	UNKNOWN_HANDLE defines the message of an state event
	 * 				that declares a failed state transition. The related
	 * 				<i>State</i> is not allowed to translate in the requested
	 * 				<i>State</i> or is not defined.
	 * 
	 * @constant
	 * @type String
	 * 
	 * @see oopsState#handle
	 */
	UNKNOWN_HANDLE: 6002,
	
	/**
	 * @description	ALREADY_ACTIVE defines the message of an state event
	 * 				that declares a failed state transition. The related
	 * 				<i>State</i> is already active. You can prevent this
	 * 				message when you allow transition to the same state.
	 * 
	 * @constant
	 * @type String
	 * 
	 * @see oopsState#handle
	 * @see oopsState#sameStateIdAllowed
	 */
	ALREADY_ACTIVE: 6003
};
