describe
(
	'ElementCreator |', 
	function () 
	{
		var creator;
		var element;

		beforeEach( function () 
		{
			element = new oopsElement();
			creator = new oopsElementCreator(function(r,e){return true;},function(r){return element;});
		});
		
		afterEach(function () 
		{
			creator = null;
		});

		it
		(
			'get id', 
			function () 
			{
				expect(creator.id()).toEqual(oopsElementCreator.name);
			}
		);	
		
		it
		(
			'construct with undefined canHandle argument', 
			function () 
			{				
				try
				{
					creator = new oopsElementCreator();
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
			'construct with undefined create argument', 
			function () 
			{				
				try
				{
					creator = new oopsElementCreator(function(r,e){return true;});
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
				expect (creator.canHandle(new oopsResource())).toBeTruthy();
			}
		);
		
		it
		(
			'canHandle already invoked', 
			function () 
			{				
				expect (creator.canHandle(new oopsResource())).toBeTruthy();
				expect (creator.canHandle(new oopsResource())).toBeFalsy();
			}
		);
				
		it
		(
			'canHandle with undefined resource argument', 
			function () 
			{
				try
				{
					creator.canHandle();
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
			'canHandle with invalid resource argument type', 
			function () 
			{
				try
				{
					creator.canHandle({});
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
			'create', 
			function () 
			{		
				creator.canHandle(new oopsResource());
				expect (creator.create(new oopsResource())).toEqual(element);
			}
		);
		
		it
		(
			'create before canHandle', 
			function () 
			{		
				expect (creator.create(new oopsResource())).toBeUndefined();
			}
		);
		
		it
		(
			'create already invoked', 
			function () 
			{		
				creator.canHandle(new oopsResource());
				expect (creator.create(new oopsResource())).toEqual(element);
				expect (creator.create(new oopsResource())).toBeUndefined();
			}
		);
		
		it
		(
			'create with undefined resource argument', 
			function () 
			{
				creator.canHandle(new oopsResource());
				
				try
				{
					creator.create();
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
			'create with invalid resource argument type', 
			function () 
			{
				creator.canHandle(new oopsResource());
				
				try
				{
					creator.create({});
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
			'reset', 
			function () 
			{	
				var factory = new oopsElementFactory ();
				factory.addChild (creator);
				
				expect (factory.create(new oopsResource())).toEqual(element);
				expect (creator.canHandle(new oopsResource())).toBeTruthy();
			}
		);
	}
);