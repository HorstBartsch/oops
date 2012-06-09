function PauseStateMockup ()
{
	oopsRoot.register (PauseStateMockup);		
	this._extends = oopsState;
	this._extends ();	
	this._bind (PauseStateMockup);
	
	this._protected.addHandler ("pause");
	this._protected.addHandler ("play");
}

function PlayStateMockup ()
{
	oopsRoot.register (PlayStateMockup);		
	this._extends = oopsState;
	this._extends ();	
	this._bind (PlayStateMockup);
	
	this._protected.addHandler ("play");
	this._protected.addHandler ("pause");    
}

function OtherStateMockup ()
{
	oopsRoot.register (OtherStateMockup);		
	this._extends = oopsState;
	this._extends ();	
	this._bind (OtherStateMockup);
	
	this._protected.addHandler ("other");   
}

function Context2Mockup ()
{
	oopsRoot.register (Context2Mockup);
	this._extends = oopsStateContext;
	this._extends ("Context2Mockup");
	this._bind (Context2Mockup);
	
	this._protected.registerState (new PauseStateMockup());
	this._protected.registerState (new PlayStateMockup());
	
	this.test_processSilent = function (stateId)
	{
		try
		{
			this._protected.processSilent (stateId);
		}
		catch (e)
		{
			throw e;
		}
	}
	
	this.test_process = function (stateId)
	{
		try
		{
			this._protected.process (stateId);
		}
		catch (e)
		{
			throw e;
		}
	}
	
	this.test_processTransition = function (stateId)
	{
		try
		{
			this._internal.processTransition (stateId);
		}
		catch (e)
		{
			throw e;
		}
	}
	
	this.test_invalidateTransition = function (message)
	{
		try
		{
			this._internal.invalidateTransition (message);
		}
		catch (e)
		{
			throw e;
		}
	}
	
	this.test_invalidate = function (message)
	{
		try
		{
			this._protected.invalidate (message);
		}
		catch (e)
		{
			throw e;
		}
	}
	
	this.test_registerState = function (state)
	{
		this._protected.registerState (state);
	}
}

describe
(
	'StateContext |', 
	function () 
	{
		var context;

		beforeEach( function () 
		{
			context = new Context2Mockup();
		});
		
		afterEach(function () 
		{
			context = null;
		});

		
		it
		(
			'get state', 
			function () 
			{
				expect(context.state().id()).toEqual("pause");
			}
		);
		
		it
		(
			'hasState', 
			function () 
			{
				expect(context.hasState("pause")).toBeTruthy();
				expect(context.hasState("play")).toBeTruthy();
				expect(context.hasState("anotherStateId")).toBeFalsy();
			}
		);
		
		it
		(
			'dispose', 
			function () 
			{
				var numAddresses = oopsRoot.numAddresses();
				
				context.dispose ();
				expect (oopsRoot.numAddresses()).toEqual (numAddresses-3);
			}
		);
		
		it
		(
			'hasState with undefined statId argument', 
			function () 
			{
				try
				{
					context.hasState();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'canTranslateTo', 
			function () 
			{
				expect(context.canTranslateTo("pause")).toBeFalsy();
				expect(context.canTranslateTo("play")).toBeTruthy();
				expect(context.canTranslateTo("anotherStateId")).toBeFalsy();
			}
		);
		
		it
		(
			'canTranslateTo with undefined statId argument', 
			function () 
			{
				try
				{
					context.canTranslateTo();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'translateTo', 
			function () 
			{
				context.translateTo("play");
				expect(context.state().id()).toEqual("play");
			}
		);
		
		it
		(
			'process (protected)', 
			function () 
			{
				context.test_process("play");
				expect(context.state().id()).toEqual("play");
			}
		);
		
		it
		(
			'processTransition (internal)', 
			function () 
			{
				context.test_processTransition("play");
				expect(context.state().id()).toEqual("play");
			}
		);
		
		it
		(
			'process silent', 
			function () 
			{
				context.test_processSilent("play");
				expect(context.state().id()).toEqual("play");
			}
		);
		
		it
		(
			'translateTo with undefined statId argument', 
			function () 
			{
				try
				{
					context.translateTo();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'process silent with undefined statId argument', 
			function () 
			{
				try
				{
					context.test_processSilent();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'process with undefined statId argument', 
			function () 
			{
				try
				{
					context.test_process();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'processTransition with undefined statId argument', 
			function () 
			{
				try
				{
					context.test_processTransition();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'translateTo, dispatchEvent oopsStatusEvent.CHANGE', 
			function () 
			{
				context.addEventListener (oopsStatusEvent.CHANGE, onEvent);
				context.translateTo("play");
				
				waitsFor 
				(
					function (){ return event; },
					"Event to dispatch.", 250
				);
				
				runs 
				(
					function ()
					{
						expect (event).toBeDefined();
						expect (event.target()).toEqual (context);
						expect (event.type()).toEqual (oopsStatusEvent.CHANGE);
						expect (event.state().id()).toEqual ("play");
						expect (event.message()).toEqual (oopsStateMessage.VALID);
												
						//object was already disposed by chain (250ms timeout)
						var e = event.clone();
						expect (e.is(oopsStatusEvent)).toBeTruthy();
					}
				);
			}
		);
		
		it
		(
			'translateTo, dispatchEvent oopsStatusEvent.FAILED', 
			function () 
			{
				context.addEventListener (oopsStatusEvent.FAILED, onEvent);
				context.translateTo("invalidState");
				
				waitsFor 
				(
					function (){ return event; },
					"Event to dispatch.", 250
				);
				
				runs 
				(
					function ()
					{
						expect (event).toBeDefined();
						expect (event.target()).toEqual (context);
						expect (event.type()).toEqual (oopsStatusEvent.FAILED);
						expect (event.state().id()).toEqual ("pause");
						expect (event.message()).toEqual (oopsStateMessage.UNKNOWN_STATE);
												
						//object was already disposed by chain (250ms timeout)
						var e = event.clone();
						expect (e.is(oopsStatusEvent)).toBeTruthy();
					}
				);
			}
		);
		
		it
		(
			'invalidate (protected)', 
			function () 
			{
				context.addEventListener (oopsStatusEvent.FAILED, onEvent);
				context.test_invalidate("invalid");
				
				waitsFor 
				(
					function (){ return event; },
					"Event to dispatch.", 250
				);
				
				runs 
				(
					function ()
					{
						expect (event).toBeDefined();
						expect (event.target()).toEqual (context);
						expect (event.type()).toEqual (oopsStatusEvent.FAILED);
						expect (event.state().id()).toEqual ("pause");
						expect (event.message()).toEqual ("invalid");
												
						//object was already disposed by chain (250ms timeout)
						var e = event.clone();
						expect (e.is(oopsStatusEvent)).toBeTruthy();
					}
				);
			}
		);
		
		it
		(
			'invalidate with undefined message argument', 
			function () 
			{
				try
				{
					context.test_invalidate();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'invalidateTransition (internal)', 
			function () 
			{
				context.addEventListener (oopsStatusEvent.FAILED, onEvent);
				context.test_invalidateTransition("invalid");
				
				waitsFor 
				(
					function (){ return event; },
					"Event to dispatch.", 250
				);
				
				runs 
				(
					function ()
					{
						expect (event).toBeDefined();
						expect (event.target()).toEqual (context);
						expect (event.type()).toEqual (oopsStatusEvent.FAILED);
						expect (event.state().id()).toEqual ("pause");
						expect (event.message()).toEqual ("invalid");
												
						//object was already disposed by chain (250ms timeout)
						var e = event.clone();
						expect (e.is(oopsStatusEvent)).toBeTruthy();
					}
				);
			}
		);
		
		it
		(
			'invalidateTransition with undefined message argument', 
			function () 
			{
				try
				{
					context.test_invalidateTransition();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'registerState', 
			function () 
			{
				var state = new OtherStateMockup ();
				context.test_registerState (state);
				expect(context.hasState("other")).toBeTruthy();
			}
		);
		
		it
		(
			'registerState with undefined state argument', 
			function () 
			{
				try
				{
					context.test_registerState();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
		
		it
		(
			'registerState with invalid state argument type', 
			function () 
			{
				try
				{
					context.test_registerState({});
				}
				catch (e)
				{
					expect (e.is(oopsTypeError)).toBeTruthy();
					expect (e.id()).toEqual(1000);
				}
			}
		);
	}
);

var event;
function onEvent (evt)
{
	event = evt;
};