describe
(
	'Element |', 
	function () 
	{
		var element;

		beforeEach( function () 
		{
			element = new oopsElement();
		});
		
		afterEach(function () 
		{
			element = null;
		});

		it
		(
			'get type', 
			function () 
			{
				expect(element.type()).toEqual(oopsElementType.DEFAULT);
			}
		);
		
		it
		(
			'dispose', 
			function () 
			{
				element.addTrait ("trait1",new oopsTrait ("trait1"));
				element.addTrait ("trait2",new oopsTrait ("trait2"));
				
				var numAddresses = oopsRoot.numAddresses();
				expect (element.qName().indexOf("[model.Element@")).toEqual (0);
				
				element.dispose ();
				expect (oopsRoot.numAddresses()).toEqual (numAddresses-3);
				expect (element.qName()).toEqual ("[model.Element]");
			}
		);
		
		it
		(
			'get and set resource', 
			function () 
			{
				var resource = new oopsResource ();
				element.setResource (resource);
				expect(element.resource()).toEqual(resource);
			}
		);
		
		it
		(
			'get and set resource with undefined resource argument', 
			function () 
			{
				try
				{
					element.setResource ();	
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
			'get and set resource with invalid resource argument type', 
			function () 
			{
				try
				{
					element.setResource ({});	
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
			'get traitTypes', 
			function () 
			{
				element.addTrait ("trait1",new oopsTrait ("trait1"));
				element.addTrait ("trait2",new oopsTrait ("trait2"));
				element.addTrait ("trait3",new oopsTrait ("trait3"));
				
				expect (element.traitTypes()).toEqual(["trait1","trait2","trait3"]);
			}
		);
		
		it
		(
			'hasTrait', 
			function () 
			{
				element.addTrait ("trait1",new oopsTrait ("trait1"));
				expect (element.hasTrait("trait1")).toBeTruthy();
			}
		);
		
		it
		(
			'hasTrait with undefined type argument', 
			function () 
			{
				element.addTrait ("trait1",new oopsTrait ("trait1"));
				
				try
				{
					element.hasTrait();
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
			'getTrait and addTrait', 
			function () 
			{
				var trait = new oopsTrait ("trait1");
				element.addTrait ("trait1",trait);
				expect (element.getTrait("trait1")).toEqual(trait);
				expect (element.traitTypes()).toEqual(["trait1"]);
			}
		);
		
		it
		(
			'getTrait with undefined type argument', 
			function () 
			{
				try
				{
					element.getTrait();
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
			'addTrait with undefined type argument', 
			function () 
			{
				try
				{
					element.addTrait();
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
			'addTrait with undefined trait argument', 
			function () 
			{
				try
				{
					element.addTrait("trait1");
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
			'addTrait with invalid trait argument type', 
			function () 
			{
				try
				{
					element.addTrait("trait1",{});
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
			'addTrait, receive event notification (add)', 
			function () 
			{
				element.addEventListener (oopsTraitEvent.ADD, onEvent);
				var trait = new oopsTrait ("trait1");
				element.addTrait ("trait1",trait);
				
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
						expect (event.target()).toEqual (element);
						expect (event.type()).toEqual (oopsTraitEvent.ADD);
						expect (event.traitType()).toEqual ("trait1");
					}
				);
			}
		);
		
		it
		(
			'removeTrait', 
			function () 
			{
				var trait = new oopsTrait ("trait1");
				element.addTrait ("trait1",trait);
				element.removeTrait ("trait1");
				expect (element.getTrait("trait1")).toBeUndefined;
				expect (element.traitTypes()).toEqual([]);
			}
		);
		
		it
		(
			'removeTrait with undefined type argument', 
			function () 
			{
				try
				{
					element.removeTrait();
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
			'removeTrait, receive event notification (remove)', 
			function () 
			{
				element.addEventListener (oopsTraitEvent.REMOVE, onEvent);
				var trait = new oopsTrait ("trait1");
				element.addTrait ("trait1",trait);
				element.removeTrait ("trait1");
				
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
						expect (event.target()).toEqual (element);
						expect (event.type()).toEqual (oopsTraitEvent.REMOVE);
						expect (event.traitType()).toEqual ("trait1");
					}
				);
			}
		);
		
		it
		(
			'addMetadata and getMetadata', 
			function () 
			{
				element.addMetadata("myKey","myValue");				
				expect (element.getMetadata("myKey")).toEqual("myValue");
			}
		);
		
		it
		(
			'addMetadata, receive event notification (add)', 
			function () 
			{
				element.addEventListener (oopsMetadataEvent.ADD, onEvent);
				element.addMetadata("myKey","myValue");	
				
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
						expect (event.target()).toEqual (element);
						expect (event.type()).toEqual (oopsMetadataEvent.ADD);
						expect (event.key()).toEqual ("myKey");
						expect (event.value()).toEqual ("myValue");
					}
				);
			}
		);
		
		it
		(
			'addMetadata, receive event notification (change)', 
			function () 
			{
				element.addEventListener (oopsMetadataEvent.CHANGE, onEvent);
				element.addMetadata("myKey","myValue");	
				element.addMetadata("myKey","myValue2");	
				
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
						expect (event.target()).toEqual (element);
						expect (event.type()).toEqual (oopsMetadataEvent.CHANGE);
						expect (event.key()).toEqual ("myKey");
						expect (event.value()).toEqual ("myValue2");
					}
				);
			}
		);
		
		it
		(
			'removeMetadata', 
			function () 
			{
				element.addMetadata("myKey","myValue");		
				element.removeMetadata("myKey");		
				expect (element.getMetadata("myKey")).toBeUndefined();
			}
		);
		
		it
		(
			'removeMetadata, receive event notification (remove)', 
			function () 
			{
				element.addEventListener (oopsMetadataEvent.REMOVE, onEvent);
				element.removeMetadata("myKey");	
				
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
						expect (event.target()).toEqual (element);
						expect (event.type()).toEqual (oopsMetadataEvent.REMOVE);
						expect (event.key()).toEqual ("myKey");
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