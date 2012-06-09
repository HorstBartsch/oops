describe
(
	'Component |', 
	function () 
	{
		var component;

		beforeEach( function () 
		{
			component = new oopsComponent("testId");
		});
		
		afterEach(function () 
		{
			component = null;
		});

		it
		(
			'get id', 
			function () 
			{
				expect(component.id()).toEqual("testId");
			}
		);
		
		it
		(
			'get parent', 
			function () 
			{
				var composite = new oopsComposite ("composition");
				composite.addChild (component);
				expect(component.parent()).toEqual(composite);
			}
		);
		
		it
		(
			'construct with undefined id argument', 
			function () 
			{
				try
				{
					var comp = new oopsComponent ();		
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