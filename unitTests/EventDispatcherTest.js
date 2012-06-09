describe
(
	'EventDispatcher |', 
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
			'hasEventListener', 
			function () 
			{
				dispatcher.addEventListener ("TestEvent", function(){});
				expect(dispatcher.hasEventListener("TestEvent")).toBeTruthy();
			}
		);
		
		it
		(
			'hasEventListener with undefined type argument', 
			function () 
			{
				try
				{
					dispatcher.hasEventListener ();			
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
			'addEventListener', 
			function () 
			{
				dispatcher.addEventListener ("TestEvent", function(){});
				expect(dispatcher.hasEventListener("TestEvent")).toBeTruthy();
			}
		);
		
		it
		(
			'addEventListener with undefined type argument', 
			function () 
			{
				try
				{
					dispatcher.addEventListener ();			
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
			'addEventListener with undefined listener argument', 
			function () 
			{
				try
				{
					dispatcher.addEventListener ("MyEvent");			
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
			'removeEventListener', 
			function () 
			{
				var func = function(){};
				dispatcher.addEventListener ("TestEvent", func);
				expect(dispatcher.hasEventListener("TestEvent")).toBeTruthy();
				dispatcher.removeEventListener ("TestEvent", func);
				expect(dispatcher.hasEventListener("TestEvent")).toBeFalsy();
			}
		);
		
		it
		(
			'removeEventListener with undefined type argument', 
			function () 
			{
				try
				{
					dispatcher.removeEventListener ();			
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
			'removeEventListener with undefined listener argument', 
			function () 
			{
				try
				{
					dispatcher.removeEventListener ("MyEvent");			
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
			'dispatchEvent', 
			function () 
			{
				dispatcher.addEventListener ("TestEvent", onEvent);
				dispatcher.dispatchEvent(new oopsEvent("TestEvent"));
				
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
						
						//object was already disposed by chain (250ms timeout)
						var e = event.clone();
						expect (e.is(oopsEvent)).toBeTruthy();
					}
				);
			}
		);
		
		it
		(
			'dispatchEvent with undefined event argument', 
			function () 
			{
				try
				{
					dispatcher.dispatchEvent ();			
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
			'dispatchEvent with invalid event type argument', 
			function () 
			{
				try
				{
					dispatcher.dispatchEvent ({});			
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