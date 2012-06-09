describe
(
	'MetadataEvent |', 
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
					var evt = new oopsMetadataEvent ();		
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
			'construct with undefined key argument', 
			function () 
			{
				try
				{
					var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD);		
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
				var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD,"MyKey");
				expect (evt.type()).toEqual(oopsMetadataEvent.ADD);	
				
				evt = new oopsMetadataEvent (oopsMetadataEvent.REMOVE,"MyKey");
				expect (evt.type()).toEqual(oopsMetadataEvent.REMOVE);	
				
				evt = new oopsMetadataEvent (oopsMetadataEvent.CHANGE,"MyKey");
				expect (evt.type()).toEqual(oopsMetadataEvent.CHANGE);	
			}
		);
		
		it
		(
			'get key', 
			function () 
			{
				var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD,"MyKey");
				expect (evt.key()).toEqual("MyKey");	
			}
		);
		
		it
		(
			'get value', 
			function () 
			{
				var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD,"MyKey", "MyValue");
				expect (evt.value()).toEqual("MyValue");	
			}
		);
		
		it
		(
			'get target', 
			function () 
			{
				var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD,"MyKey");
				expect (evt.target()).toBeUndefined();				
			}
		);
		
		it
		(
			'clone', 
			function () 
			{
				var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD,"MyKey");
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
				var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD,"MyKey","MyValue");
				var e = '[MetadataEvent type="'+oopsMetadataEvent.ADD+'" key="MyKey" value="MyValue"]';
				expect (evt.toString()).toEqual(e);
			}
		);

		it
		(
			'dispatch by an EventDispatcher', 
			function () 
			{
				var evt = new oopsMetadataEvent (oopsMetadataEvent.ADD,"MyKey","MyValue");
				dispatcher.addEventListener (oopsMetadataEvent.ADD, onEvent);
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
						expect (event.type()).toEqual (oopsMetadataEvent.ADD);
						expect (event.key()).toEqual ("MyKey");
						expect (event.value()).toEqual ("MyValue");
						
						var e = event.clone();
						expect (e.is(oopsMetadataEvent)).toBeTruthy();
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