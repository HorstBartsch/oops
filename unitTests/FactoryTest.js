describe
(
	'ElementFactory |', 
	function () 
	{
		var creator;
		var proxyCreator;
		var element;
		var proxy;
		var factory;
		var resource;

		beforeEach( function () 
		{
			element = new oopsElement();
			proxy = new oopsProxyElement();
			resource = new oopsResource();
			creator = new oopsElementCreator(function(r,e){return true;},function(r){return element;});
			proxyCreator = new oopsElementCreator(function(r,e){return (e!==null);},function(r){return proxy;});
			factory = new oopsElementFactory();
		});
		
		afterEach(function () 
		{
			creator = null;
			proxyCreator = null;
			element = null;
			proxy = null;
			factory = null;
			resource = null;
		});

		it
		(
			'get id', 
			function () 
			{
				expect(factory.id()).toEqual(oopsElementFactory.name);
			}
		);	
		
		it
		(
			'create', 
			function () 
			{		
				factory.addChild (creator);
				expect (factory.create(resource)).toEqual(element);
			}
		);
		
		it
		(
			'create, check element resource', 
			function () 
			{		
				factory.addChild (creator);
				var elem = factory.create(resource);
				expect (elem).toEqual(element);
				expect (elem.resource()).toEqual(resource);
			}
		);
		
		it
		(
			'create multiple', 
			function () 
			{		
				factory.addChild (creator);
				expect (factory.create(resource)).toEqual(element);
				expect (factory.create(resource)).toEqual(element);
			}
		);
		
		it
		(
			'create proxy', 
			function () 
			{		
				factory.addChild (creator);
				factory.addChild (proxyCreator);
				expect (factory.create(resource)).toEqual(proxy);
			}
		);
		
		it
		(
			'create proxy, check proxy resource', 
			function () 
			{		
				factory.addChild (creator);
				factory.addChild (proxyCreator);
				var elem = factory.create(resource);
				expect (elem).toEqual(proxy);
				expect (elem.resource()).toEqual(resource);
			}
		);
		
		it
		(
			'create proxy, check proxied element', 
			function () 
			{		
				factory.addChild (creator);
				factory.addChild (proxyCreator);
				var elem = factory.create(resource);
				expect (elem).toEqual(proxy);
				expect (elem.proxiedElement()).toEqual(element);
			}
		);
		
		it
		(
			'create proxy, check shared resource', 
			function () 
			{		
				factory.addChild (creator);
				factory.addChild (proxyCreator);
				var elem = factory.create(resource);
				expect (elem).toEqual(proxy);
				expect (elem.proxiedElement().resource()).toEqual(resource);
				expect (elem.proxiedElement().resource()).toEqual(elem.resource());
			}
		);
		
		it
		(
			'create proxy multiple', 
			function () 
			{		
				factory.addChild (creator);
				factory.addChild (proxyCreator);
				expect (factory.create(resource)).toEqual(proxy);
				expect (factory.create(resource)).toEqual(proxy);
			}
		);
		
		it
		(
			'create with undefined resource argument', 
			function () 
			{
				factory.addChild (creator);
				
				try
				{
					factory.create();
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
				factory.addChild (creator);
				
				try
				{
					factory.create({});
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
			'create with invalid resource argument type (oopsComponent)', 
			function () 
			{
				factory.addChild (creator);
				
				try
				{
					factory.create(new oopsComponent("component"));
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