describe
(
	'Resource |', 
	function () 
	{
		var resource;

		beforeEach( function () 
		{
			resource = new oopsResource();
		});
		
		afterEach(function () 
		{
			resource = null;
		});

		it
		(
			'addValue and getValueOf', 
			function () 
			{
				resource.setValue ("testKey","testValue");
				expect(resource.getValueOf("testKey")).toEqual("testValue");
			}
		);
		
		it
		(
			'removeValueOf', 
			function () 
			{
				resource.setValue ("testKey","testValue");
				resource.removeValueOf ("testKey");
				expect(resource.getValueOf("testKey")).toBeUndefined();
			}
		);
	}
);