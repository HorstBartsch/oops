describe
(
	'TraitEvent |', 
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
					var evt = new oopsTraitEvent ();		
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
					var evt = new oopsTraitEvent (oopsTraitEvent.ADD);		
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
				var evt = new oopsTraitEvent (oopsTraitEvent.ADD,"MyType");
				expect (evt.type()).toEqual(oopsTraitEvent.ADD);	
				
				evt = new oopsTraitEvent (oopsTraitEvent.REMOVE,"MyType");
				expect (evt.type()).toEqual(oopsTraitEvent.REMOVE);	
			}
		);
		
		it
		(
			'get traitType', 
			function () 
			{
				var evt = new oopsTraitEvent (oopsTraitEvent.ADD,"MyType");
				expect (evt.traitType()).toEqual("MyType");	
			}
		);
		
		it
		(
			'get target', 
			function () 
			{
				var evt = new oopsTraitEvent (oopsTraitEvent.ADD,"MyType");
				expect (evt.target()).toBeUndefined();				
			}
		);
		
		it
		(
			'clone', 
			function () 
			{
				var evt = new oopsTraitEvent (oopsTraitEvent.ADD,"MyType");
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
				var evt = new oopsTraitEvent (oopsTraitEvent.ADD,"MyType");
				var e = '[TraitEvent type="'+oopsTraitEvent.ADD+'" traitType="MyType"]';
				expect (evt.toString()).toEqual(e);
			}
		);

		it
		(
			'dispatch by an EventDispatcher', 
			function () 
			{
				var evt = new oopsTraitEvent (oopsTraitEvent.ADD,"MyType");
				dispatcher.addEventListener (oopsTraitEvent.ADD, onEvent);
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
						expect (event.type()).toEqual (oopsTraitEvent.ADD);
						expect (event.traitType()).toEqual ("MyType");
						
						var e = event.clone();
						expect (e.is(oopsTraitEvent)).toBeTruthy();
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