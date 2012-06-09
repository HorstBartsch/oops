describe
(
	'Globals |', 
	function () 
	{
		it
		(
			'CLS is defined', 
			function () 
			{
				expect(oopsConst.CLS).toBeDefined();
			}
		);
		
		it
		(
			'CLS_NAME is defined', 
			function () 
			{
				expect(oopsConst.CLS_NAME).toBeDefined();
			}
		);
		
		it
		(
			'PKG is defined', 
			function () 
			{
				expect(oopsConst.PKG).toBeDefined();
			}
		);
		
		it
		(
			'PKG_NAME is defined', 
			function () 
			{
				expect(oopsConst.PKG_NAME).toBeDefined();
			}
		);
	}
);