describe
(
	'Event |', 
	function () 
	{
		var dispatcher;
		var myEvent;

		beforeEach( function () 
		{
			dispatcher = new oopsEventDispatcher();
			myEvent = new oopsEvent ("TestEvent");
		});
		
		afterEach(function () 
		{
			dispatcher = null;
			event = null;
			myEvent = null
		});
		
		it
		(
			'construct with undefined type argument', 
			function () 
			{
				try
				{
					var evt = new oopsEvent ();		
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
				expect (myEvent.type()).toEqual("TestEvent");				
			}
		);
		
		it
		(
			'get target', 
			function () 
			{
				expect (myEvent.target()).toBeUndefined();				
			}
		);
		
		it
		(
			'clone', 
			function () 
			{
				var e = myEvent.clone();
				expect (e.type()).toEqual(myEvent.type());
				expect (e.toString()).toEqual(myEvent.toString());
			}
		);
		
		it
		(
			'toString', 
			function () 
			{
				var e = '[Event type="TestEvent"]';
				expect (myEvent.toString()).toEqual(e);
			}
		);

		it
		(
			'dispatch by an EventDispatcher', 
			function () 
			{
				dispatcher.addEventListener ("TestEvent", onEvent);
				dispatcher.dispatchEvent(myEvent);
				
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
						expect (event.type()).toEqual ("TestEvent");
						
						var e = event.clone();
						expect (e.is(oopsEvent)).toBeTruthy();
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