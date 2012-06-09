describe
(
	'Composite |', 
	function () 
	{
		var composite;
		var component;

		beforeEach( function () 
		{
			composite = new oopsComposite("composite");
			component = new oopsComponent("component");
		});
		
		afterEach(function () 
		{
			composite = null;
			component = null;
		});

		it
		(
			'get numChildren', 
			function () 
			{
				expect(composite.numChildren()).toEqual(0);
				composite.addChild (component);
				expect(composite.numChildren()).toEqual(1);
			}
		);
		
		it
		(
			'dispose', 
			function () 
			{
				composite.addChild (component);
				composite.addChild (new oopsComponent("component2"));
				
				var numAddresses = oopsRoot.numAddresses();
				expect (composite.qName().indexOf("[composite.Composite@")).toEqual (0);
				expect (composite.getChildAt(0).qName().indexOf("[composite.Component@")).toEqual (0);
				expect (composite.getChildAt(1).qName().indexOf("[composite.Component@")).toEqual (0);
				
				composite.dispose ();
				expect (oopsRoot.numAddresses()).toEqual (numAddresses-3);
				expect (composite.qName()).toEqual ("[composite.Composite]");
				expect (composite.getChildAt(0).qName()).toEqual ("[composite.Component]");
				expect (composite.getChildAt(1).qName()).toEqual ("[composite.Component]");
			}
		);
		
		it
		(
			'get the index', 
			function () 
			{
				composite.addChild (component);
				composite.addChild (new oopsComponent("component2"));
				expect(composite.indexOf(component)).toEqual(0);
				
			}
		);
		
		it
		(
			'get the index with undefined component argument', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.indexOf()).toEqual(0);	
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
			'get the index with invalid component argument type', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.indexOf({})).toEqual(0);	
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
			'get the index with invalid index argument (<0)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.indexOf(component,-1)).toEqual(-1);	
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'get the index with invalid index argument (>numChildren)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.indexOf(component,5)).toEqual(-1);	
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'get the index (last)', 
			function () 
			{
				composite.addChild (component);
				composite.addChild (new oopsComponent("component2"));
				expect(composite.lastIndexOf(component)).toEqual(0);				
			}
		);
		
		it
		(
			'get the index (last) with undefined component argument', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.lastIndexOf()).toEqual(0);	
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
			'get the index (last) with invalid component argument type', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.lastIndexOf({})).toEqual(0);	
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
			'get the index (last) with invalid index argument (<0)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.lastIndexOf(component,-1)).toEqual(-1);	
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'get the index (last) with invalid index argument (>numChildren)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.lastIndexOf(component,5)).toEqual(0);	
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'getChildAt', 
			function () 
			{
				composite.addChild (component);
				expect(composite.getChildAt(0)).toEqual(component);				
			}
		);
		
		it
		(
			'getChildAt with undefined index argument', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.getChildAt()).toEqual(component);
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
			'getChildAt with invalid index argument (<0)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.getChildAt(-1)).toEqual(component);
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'getChildAt with invalid index argument (>numChildren)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.getChildAt(5)).toEqual(component);
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'getChildById', 
			function () 
			{
				composite.addChild (component);
				expect(composite.getChildById("component")).toEqual(component);				
			}
		);
		
		it
		(
			'getChildById in depth', 
			function () 
			{
				var composite2 = new oopsComposite ("composite2");
				composite.addChild (component);
				composite2.addChild (composite);
				expect(composite2.getChildById("component")).toEqual(component);				
			}
		);
		
		it
		(
			'getChildById with undefined id argument', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.getChildById()).toEqual(component);
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
			'addChild', 
			function () 
			{
				composite.addChild (component);
				expect(composite.getChildById("component")).toEqual(component);				
			}
		);
		
		it
		(
			'addChild with undefined component argument', 
			function () 
			{
				try
				{
					composite.addChild ();
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
			'addChild with invalid component argument type', 
			function () 
			{
				try
				{
					composite.addChild ({});
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
			'addChildAt', 
			function () 
			{
				composite.addChild (new oopsComponent("component2"));
				composite.addChildAt (component,0);
				expect(composite.indexOf(component)).toEqual(0);				
			}
		);
		
		it
		(
			'addChildAt with undefined component argument', 
			function () 
			{
				try
				{
					composite.addChildAt ();
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
			'addChildAt with invalid component argument type', 
			function () 
			{
				try
				{
					composite.addChildAt ({});
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
			'addChildAt with undefined index argument', 
			function () 
			{
				try
				{
					composite.addChildAt (component);
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
			'addChildAt with invalid index argument (<0)', 
			function () 
			{
				try
				{
					composite.addChildAt (component,-1);
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}		
			}
		);
		
		it
		(
			'addChildAt with invalid index argument (>numChildren)', 
			function () 
			{
				try
				{
					composite.addChildAt (component,8);
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}		
			}
		);
		
		it
		(
			'removeChild', 
			function () 
			{
				composite.addChild (component);
				expect(composite.removeChild (component)).toEqual(component);	
				expect(composite.indexOf (component)).toEqual(-1);
			}
		);
		
		it
		(
			'removeChild in depth', 
			function () 
			{
				var composite2 = new oopsComposite ("composite2");
				composite.addChild (component);
				composite2.addChild (composite);
				expect(composite2.removeChild (component)).toEqual(component);	
				expect(composite2.indexOf (component)).toEqual(-1);
			}
		);
		
		it
		(
			'removeChild with undefined component argument', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.removeChild ()).toEqual(component);
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
			'removeChild with invalid component argument type', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.removeChild ({})).toEqual(component);
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
			'removeChildAt', 
			function () 
			{
				composite.addChild (component);
				expect(composite.removeChildAt (0)).toEqual(component);	
				expect(composite.indexOf (component)).toEqual(-1);
			}
		);
		
		it
		(
			'removeChildAt with undefined index argument', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.removeChildAt()).toEqual(component);
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
			'removeChildAt with invalid index argument (<0)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.removeChildAt(-1)).toEqual(component);
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'removeChildAt with invalid index argument (>numChildren)', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.removeChildAt(5)).toEqual(component);
				}
				catch (e)
				{
					expect (e.is(oopsRangeError)).toBeTruthy();
					expect (e.id()).toEqual(3000);
				}
			}
		);
		
		it
		(
			'removeChildById', 
			function () 
			{
				composite.addChild (component);
				expect(composite.removeChildById ("component")).toEqual(component);		
				expect(composite.indexOf (component)).toEqual(-1);		
			}
		);
		
		it
		(
			'removeChildById with undefined id argument', 
			function () 
			{
				composite.addChild (component);
				
				try
				{
					expect(composite.removeChildById()).toEqual(component);
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