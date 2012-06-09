function StateMockup ()
{
	oopsRoot.register (StateMockup);		
	this._extends = oopsState;
	this._extends ();	
	this._bind (StateMockup);
	
	this._protected.addHandler ("pause");
    this._protected.addHandler ("play");	
    this._protected.addHandler ("stop");
    
    this.test_setContext = function (value)
    {
    	try
    	{
    		this._internal.setContext (value);
    	}
    	catch (e)
    	{
    		throw e;
    	}
    }
    
    this.test_addHandler = function (stateId)
    {
    	try
    	{
    		this._protected.addHandler (stateId);
    	}
    	catch (e)
    	{
    		throw e;
    	}
    }
    
    this.test_handle = function (stateId)
    {
    	try
    	{
    		this._internal.handle (stateId);
    	}
    	catch (e)
    	{
    		throw e;
    	}
    }
    
    this.allowed = false;
    var self = this;
    var sameStateIdAllowed = function()
    {
    	return self.allowed;
    }
    this._protected.setProtected ("sameStateIdAllowed",sameStateIdAllowed);
}

function ContextMockup ()
{
	oopsRoot.register (ContextMockup);
	this._extends = oopsStateContext;
	this._extends ("ContextMockup");
	this._bind (ContextMockup);
	
	this._protected.registerState (new StateMockup());	
	
	this.transitionState;

	var self = this;
	var processTransition = function (stateId)
	{
		self.transitionState = 1;
	};
	
	var invalidateTransition = function (stateId)
	{
		self.transitionState = stateId;
	};
	
	this._protected.setInternal ("processTransition",processTransition);
	this._protected.setInternal ("invalidateTransition",invalidateTransition);
}

describe
(
	'State |', 
	function () 
	{
		var state;
		var context

		beforeEach( function () 
		{
			state = new StateMockup();
			context = new ContextMockup();
		});
		
		afterEach(function () 
		{
			state = null;
			context = null;
		});

		it
		(
			'get id', 
			function () 
			{
				expect(state.id()).toEqual("pause");
			}
		);
		
		it
		(
			'get context', 
			function () 
			{
				var context = new oopsStateContext("context");
				state.test_setContext (context);
				expect(state.context()).toEqual(context);
			}
		);
		
		it
		(
			'set context with undefined context argument', 
			function () 
			{
				try
				{
					state.test_setContext ();
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
			'set context with invalid context argument type', 
			function () 
			{
				try
				{
					state.test_setContext ({});
				}
				catch (e)
				{
					expect (e.is(oopsTypeError)).toBeTruthy();
					expect (e.id()).toEqual(1000);
				}
			}
		);
		
		it
		(
			'addHandler', 
			function () 
			{
				state.test_addHandler ("seek");
				expect(state.canHandle("seek")).toBeTruthy();
			}
		);
		
		it
		(
			'addHandler with undefined stateId argument', 
			function () 
			{
				try
				{
					state.test_addHandler ();
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
			'canHandle', 
			function () 
			{
				expect(state.canHandle("play")).toBeTruthy();
			}
		);
		
		it
		(
			'canHandle to non supported state id', 
			function () 
			{
				expect(state.canHandle("seek")).toBeFalsy();
			}
		);
		
		it
		(
			'canHandle to the same state id', 
			function () 
			{
				expect(state.canHandle("pause")).toBeFalsy();
			}
		);
		
		it
		(
			'canHandle to the same state id with sameStateIdAllowed set to true', 
			function () 
			{
				state.allowed = true;
				expect(state.canHandle("pause")).toBeTruthy();
			}
		);
		
		it
		(
			'canHandle with undefined stateId argument', 
			function () 
			{
				try
				{
					state.canHandle();
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
			'handle', 
			function () 
			{
				context.state().test_handle("stop");
				expect(context.transitionState).toEqual(1);
			}
		);
		
		it
		(
			'handle to non supported state id', 
			function () 
			{
				context.state().test_handle("seek");
				expect(context.transitionState).toEqual(6002);
			}
		);
		
		it
		(
			'handle to the same state id', 
			function () 
			{
				context.state().test_handle("pause");
				expect(context.transitionState).toEqual(6003);
			}
		);
		
		it
		(
			'handle to the same state id with sameStateIdAllowed set to true', 
			function () 
			{
				context.state().allowed = true;
				context.state().test_handle("pause");
				expect(context.transitionState).toEqual(1);
			}
		);
		
		it
		(
			'handle with undefined stateId argument', 
			function () 
			{
				try
				{
					context.state().test_handle();
				}
				catch (e)
				{
					expect (e.is(oopsArgumentError)).toBeTruthy();
					expect (e.id()).toEqual(2000);
				}
			}
		);
	}
);