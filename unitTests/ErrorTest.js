describe
(
	'Error (and subclasses) |', 
	function () 
	{
		it
		(
			'get id', 
			function () 
			{
				var error = new oopsError (666666,"test error");
				expect(error.id()).toEqual (666666);
			}
		);	
		
		it
		(
			'get message', 
			function () 
			{
				var error = new oopsError (666666,"test error");
				expect(error.message()).toEqual ("test error");
			}
		);	
		
		it
		(
			'get message from ErrorMessage with pattern', 
			function () 
			{
				oopsErrorMessage.e6666661 = "%msg% triggered";
				var error = new oopsError (6666661,"test error");
				expect(error.message()).toEqual ("test error triggered");
			}
		);	
		
		it
		(
			'get message from ErrorMessage without pattern', 
			function () 
			{
				oopsErrorMessage.e6666662 = "test exception";
				var error = new oopsError (6666662,"test error");
				expect(error.message()).toEqual ("test exception - test error");
			}
		);
		
		it
		(
			'no message', 
			function () 
			{
				var error = new oopsError (666666);
				expect(error.message()).toBeUndefined();
			}
		);	
		
		it
		(
			'toString', 
			function () 
			{
				var error = new oopsError (666666,"test error");
				expect(error.toString()).toEqual ('[Error id="666666" message="test error"]');
			}
		);
		
		it
		(
			'1000, TypeError', 
			function () 
			{
				var id = 1000;
				var error = new oopsTypeError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[TypeError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'1001, TypeError', 
			function () 
			{
				var id = 1001;
				var error = new oopsTypeError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[TypeError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'2000, ArgumentError', 
			function () 
			{
				var id = 2000;
				var error = new oopsArgumentError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[ArgumentError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'3000, RangeError', 
			function () 
			{
				var id = 3000;
				var error = new oopsRangeError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[RangeError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'4000, IllegalOperationError', 
			function () 
			{
				var id = 4000;
				var error = new oopsIllegalOperationError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[IllegalOperationError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'4001, IllegalOperationError', 
			function () 
			{
				var id = 4001;
				var error = new oopsIllegalOperationError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[IllegalOperationError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'4002, IllegalOperationError', 
			function () 
			{
				var id = 4002;
				var error = new oopsIllegalOperationError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[IllegalOperationError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'4010, IllegalOperationError', 
			function () 
			{
				var id = 4010;
				var elem = new oopsElement();
				var error = new oopsIllegalOperationError (id,elem);
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", elem.name+"@"+elem.address());
				expect(error.toString()).toEqual ('[IllegalOperationError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'4100, IllegalOperationError', 
			function () 
			{
				var id = 4100;
				var error = new oopsIllegalOperationError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[IllegalOperationError id="'+id+'" message="'+msg+'"]');
			}
		);
		
		it
		(
			'4200, IllegalOperationError', 
			function () 
			{
				var id = 4200;
				var error = new oopsIllegalOperationError (id,"value");
				var msg = oopsErrorMessage["e"+id].replace ("%msg%", "value");
				expect(error.toString()).toEqual ('[IllegalOperationError id="'+id+'" message="'+msg+'"]');
			}
		);
	}
);