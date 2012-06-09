describe
(
	'Trait |', 
	function () 
	{
		var trait;

		beforeEach( function () 
		{
			trait = new oopsTrait("test");
		});
		
		afterEach(function () 
		{
			trait = null;
		});

		it
		(
			'get type', 
			function () 
			{
				expect(trait.type()).toEqual("test");
			}
		);
	}
);