describe
(
	'StatusEvent |', 
	function () 
	{
		var dispatcher;

		beforeEach( function () 
		{
			dispatcher = new oopsEventDispatcher();
		});
		
		afterEach(function () 
		{
			dispatcher = null;
			event = null;
		});
		
		it
		(
			'construct with undefined type argument', 
			function () 
			{
				try
				{
					var evt = new oopsStatusEvent ();		
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
			'construct with undefined traitType argument', 
			function () 
			{
				try
				{
					var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE);		
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
			'get type', 
			function () 
			{
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,new oopsState());
				expect (evt.type()).toEqual(oopsStatusEvent.CHANGE);	
				
				evt = new oopsStatusEvent (oopsStatusEvent.FAILED,new oopsState());
				expect (evt.type()).toEqual(oopsStatusEvent.FAILED);	
			}
		);
		
		it
		(
			'get state', 
			function () 
			{
				var state = new oopsState();
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,state);
				expect (evt.state()).toEqual(state);	
			}
		);
		
		it
		(
			'get message (valid)', 
			function () 
			{
				var state = new oopsState();
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,state);
				expect (evt.message()).toEqual(1);	
			}
		);
		
		it
		(
			'get message (other)', 
			function () 
			{
				var state = new oopsState();
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,state,6001);
				expect (evt.message()).toEqual(6001);	
			}
		);
		
		it
		(
			'get target', 
			function () 
			{
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,new oopsState());
				expect (evt.target()).toBeUndefined();				
			}
		);
		
		it
		(
			'clone', 
			function () 
			{
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,new oopsState());
				var e = evt.clone();
				expect (e.type()).toEqual(evt.type());
				expect (e.toString()).toEqual(evt.toString());
			}
		);
		
		it
		(
			'toString', 
			function () 
			{
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,new oopsState());
				var e = '[StatusEvent type="'+oopsStatusEvent.CHANGE+'" state="[State]" message="1"]';
				expect (evt.toString()).toEqual(e);
			}
		);

		it
		(
			'dispatch by an EventDispatcher', 
			function () 
			{
				var evt = new oopsStatusEvent (oopsStatusEvent.CHANGE,new oopsState());
				dispatcher.addEventListener (oopsStatusEvent.CHANGE, onEvent);
				dispatcher.dispatchEvent(evt);
				
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
						expect (event.target()).toEqual (dispatcher);
						expect (event.type()).toEqual (oopsStatusEvent.CHANGE);
						
						var e = event.clone();
						expect (e.is(oopsStatusEvent)).toBeTruthy();
					}
				);
			}
		);		
	}
);

var event;
function onEvent (evt)
{
	event = evt;
};