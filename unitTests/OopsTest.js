function OopsMockup1 ()
{
	oopsRoot.register (OopsMockup1);		
	this._extends = Oops;
	this._extends ();	
	this._bind (OopsMockup1);

	this.test_scopeOf = function (mode)
	{
		return this._protected.scopeOf (mode);
	}
	
	this.test_isOrThrow = function (name,value,signature)
	{
		try
		{
			this._protected.isOrThrow (name,value,signature);
		}
		catch (e)
		{
			throw e;
		}
	}
}

function OopsMockup2 ()
{
	oopsRoot.register (OopsMockup2);		
	this._extends = Oops;
	this._extends ();	
	this._bind (OopsMockup2);

	this.test_scopeOf = function (mode)
	{
		return this._protected.scopeOf (mode);
	}
}

function OopsMockup3 ()
{
	oopsRoot.register (OopsMockup3);		
	this._extends = Oops;
	this._extends ();	
	this._bind (OopsMockup3);

	this.test_scopeOf = function (mode)
	{
		return this._protected.scopeOf (mode);
	}
}

describe
(
	'Oops |', 
	function () 
	{
		afterEach(function () 
		{
			oopsRoot.autoPackage = true;
		});
		
		it
		(
			'get name', 
			function () 
			{
				var elem = new Oops ();
				expect(elem.name).toEqual(Oops.name);
				
				elem = new oops.model.Element ();
				expect(elem.name).toEqual(oops.model.Element.name);
			}
		);
		
		it
		(
			'get qName', 
			function () 
			{
				var elem = new oops.model.Element ();
				expect(elem.qName()).toEqual("[model.Element@"+elem.address()+"]");
			}
		);
		
		it
		(
			'toString', 
			function () 
			{
				var elem = new oops.model.Element ();
				expect(elem.toString()).toEqual("[Element]");
				
				oopsRoot.autoPackage = false;
				elem = new OopsMockup3 ();
				expect(elem.toString()).toEqual("[OopsMockup3]");
			}
		);
		
		it
		(
			'get address', 
			function () 
			{
				var elem = new oops.model.Element ();
				var address = elem.address();
				expect(address).toBeDefined();
			}
		);
		
		it
		(
			'protected is defined', 
			function () 
			{
				var elem = new Oops ();
				expect(elem._protected).toBeDefined();
			}
		);
		
		it
		(
			'scopeOf (protected)', 
			function () 
			{
				var elem = new OopsMockup1 ();
				
				expect(elem.test_scopeOf(oopsConst.CLS_NAME)).toEqual(OopsMockup1.name);
				expect(elem.test_scopeOf(oopsConst.CLS)).toEqual(OopsMockup1);
				
				// FIXME
				//expect(elem.test_scopeOf(oopsConst.PKG_NAME)).toEqual("composite");
				//expect(elem.test_scopeOf(oopsConst.PKG)).toEqual(oops.composite);
			}
		);
		
		it
		(
			'scopeOf with predefined packaging (protected)', 
			function () 
			{
				oops.event.Dispatcher = OopsMockup2;
				var elem = new oops.event.Dispatcher ();
				
				expect(elem.test_scopeOf(oopsConst.CLS_NAME)).toEqual("Dispatcher");
				expect(elem.test_scopeOf(oopsConst.CLS)).toEqual(OopsMockup2);
				expect(elem.test_scopeOf(oopsConst.PKG_NAME)).toEqual("event");
				expect(elem.test_scopeOf(oopsConst.PKG)).toEqual(oops.event);
			}
		);
		
		it
		(
			'scopeOf with autoPackage=false (protected)', 
			function () 
			{
				oopsRoot.autoPackage = false;
				var elem = new OopsMockup3 ();
				
				expect(elem.test_scopeOf(oopsConst.CLS_NAME)).toBeUndefined();
				expect(elem.test_scopeOf(oopsConst.CLS)).toBeUndefined();
				expect(elem.test_scopeOf(oopsConst.PKG_NAME)).toBeUndefined();
				expect(elem.test_scopeOf(oopsConst.PKG)).toBeUndefined();
			}
		);
		
		it
		(
			'isOrThrow, value evaluation (protected)', 
			function () 
			{
				var elem = new OopsMockup1 ();
				
				try
				{
					elem.test_isOrThrow ("key","value");
					expect(true).toBeTruthy();
				}
				catch (e)
				{
					expect(false).toBeTruthy();
				}
			}
		);
		
		it
		(
			'isOrThrow, state evaluation (protected)', 
			function () 
			{
				var elem = new OopsMockup1 ();
				
				try
				{
					elem.test_isOrThrow ("key",new oopsElement(),oopsElement);
					expect(true).toBeTruthy();
				}
				catch (e)
				{
					expect(false).toBeTruthy();
				}
			}
		);
		
		it
		(
			'isOrThrow with undefined value argument (protected)', 
			function () 
			{
				var elem = new OopsMockup1 ();
				
				try
				{
					elem.test_isOrThrow ("key");
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
			'isOrThrow with invalid signature argument type (protected)', 
			function () 
			{
				var elem = new OopsMockup1 ();
				
				try
				{
					elem.test_isOrThrow ("key",new oopsElement(),oopsProxyElement);
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
			'internal is defined', 
			function () 
			{
				var elem = new Oops ();
				expect(elem._internal).toBeDefined();
			}
		);
		
		it
		(
			'super is defined', 
			function () 
			{
				var elem = new Oops ();
				expect(elem._super).toBeDefined();
			}
		);
		
		it
		(
			'is', 
			function () 
			{
				var elem1 = new Oops();
				var elem2 = new Oops(true);
				var elem3 = new oopsElement();
				
				expect(elem1.is(Oops)).toBeTruthy();
				expect(elem2.is(Oops)).toBeTruthy();
				
				// FIXME negative Test not possible
				//expect(elem3.is(oopsProxyElement)).toBeFalsy();
			}
		);
		
		it
		(
			'dispose', 
			function () 
			{
				var elem = new oopsElement();
				var numAddresses = oopsRoot.numAddresses ();
				
				elem.dispose ();
				expect(oopsRoot.numAddresses()).toEqual(numAddresses-1);
				
			}
		);
	}
);