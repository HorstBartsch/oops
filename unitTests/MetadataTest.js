describe
(
	'Metadata |', 
	function () 
	{
		var metadata;

		beforeEach( function () 
		{
			metadata = new oopsMetadata();
		});
		
		afterEach(function () 
		{
  			metadata = null;
		});

		it
		(
			'setValue and getValueOf', 
			function () 
			{
				metadata.setValue ("testKey","testValue");
				expect(metadata.getValueOf("testKey")).toEqual("testValue");
			}
		);
		
		it
		(
			'removeValueOf', 
			function () 
			{
				metadata.setValue ("testKey","testValue");
				metadata.removeValueOf ("testKey");
				expect(metadata.getValueOf("testKey")).toBeUndefined();
			}
		);
	}
);