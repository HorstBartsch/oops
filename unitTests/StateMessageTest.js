describe
(
	'StateMessage |', 
	function () 
	{
		it
		(
			'VALID is defined', 
			function () 
			{
				expect(oopsStateMessage.VALID).toBeDefined();
			}
		);
		
		it
		(
			'UNKNOWN_STATE is defined', 
			function () 
			{
				expect(oopsStateMessage.UNKNOWN_STATE).toBeDefined();
			}
		);
		
		it
		(
			'ALREADY_ACTIVE is defined', 
			function () 
			{
				expect(oopsStateMessage.ALREADY_ACTIVE).toBeDefined();
			}
		);
		
		it
		(
			'UNKNOWN_HANDLE is defined', 
			function () 
			{
				expect(oopsStateMessage.UNKNOWN_HANDLE).toBeDefined();
			}
		);
	}
);