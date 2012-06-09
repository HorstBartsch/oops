describe
(
	'Packages |', 
	function () 
	{
		it
		(
			'Component equals representation class', 
			function () 
			{
				expect(oops.composite.Component).toEqual(oopsComponent);
			}
		);
		
		it
		(
			'Composite equals representation class', 
			function () 
			{
				expect(oops.composite.Composite).toEqual(oopsComposite);
			}
		);
		
		it
		(			
			'ChainManager equals representation class', 
			function () 
			{
				expect(oops.core.ChainManager).toEqual(oopsChainManager.instance());
			}
		);
		
		it
		(		
			'Oops equals representation class', 
			function () 
			{
				expect(oops.core.Oops).toEqual(Oops);
			}
		);
		
		it
		(		
			'Error equals representation class', 
			function () 
			{
				expect(oops.core.Error).toEqual(oopsError);
			}
		);
		
		it
		(			
			'ArgumentError equals representation class', 
			function () 
			{
				expect(oops.error.ArgumentError).toEqual(oopsArgumentError);
			}
		);
		
		it
		(			
			'ErrorMessage equals representation class', 
			function () 
			{
				expect(oops.error.ErrorMessage).toEqual(oopsErrorMessage);
			}
		);
		
		it
		(			
			'IllegalOperationError equals representation class', 
			function () 
			{
				expect(oops.error.IllegalOperationError).toEqual(oopsIllegalOperationError);
			}
		);
		
		it
		(			
			'RangeError equals representation class', 
			function () 
			{
				expect(oops.error.RangeError).toEqual(oopsRangeError);
			}
		);
		
		it
		(			
			'TypeError equals representation class', 
			function () 
			{
				expect(oops.error.TypeError).toEqual(oopsTypeError);
			}
		);
		
		it
		(			
			'Event equals representation class', 
			function () 
			{
				expect(oops.event.Event).toEqual(oopsEvent);
			}
		);
		
		it
		(			
			'EventDispatcher equals representation class', 
			function () 
			{
				expect(oops.event.EventDispatcher).toEqual(oopsEventDispatcher);
			}
		);
		
		it
		(		
			'MetadataEvent equals representation class', 
			function () 
			{
				expect(oops.event.MetadataEvent).toEqual(oopsMetadataEvent);
			}
		);
		
		it
		(			
			'StatusEvent equals representation class', 
			function () 
			{
				expect(oops.event.StatusEvent).toEqual(oopsStatusEvent);
			}
		);
		
		it
		(			
			'TraitEvent equals representation class', 
			function () 
			{
				expect(oops.event.TraitEvent).toEqual(oopsTraitEvent);
			}
		);
		
		it
		(			
			'ElementCreator equals representation class', 
			function () 
			{
				expect(oops.factory.ElementCreator).toEqual(oopsElementCreator);
			}
		);
		
		it
		(			
			'ElementFactory equals representation class', 
			function () 
			{
				expect(oops.factory.ElementFactory).toEqual(oopsElementFactory);
			}
		);
		
		it
		(			
			'Element equals representation class', 
			function () 
			{
				expect(oops.model.Element).toEqual(oopsElement);
			}
		);
		
		it
		(			
			'ElementType equals representation class', 
			function () 
			{
				expect(oops.model.ElementType).toEqual(oopsElementType);
			}
		);
		
		it
		(			
			'ProxyElement equals representation class', 
			function () 
			{
				expect(oops.model.ProxyElement).toEqual(oopsProxyElement);
			}
		);
		
		it
		(			
			'State equals representation class', 
			function () 
			{
				expect(oops.state.State).toEqual(oopsState);
			}
		);
		
		it
		(			
			'StateContext equals representation class', 
			function () 
			{
				expect(oops.state.StateContext).toEqual(oopsStateContext);
			}
		);
		
		it
		(			
			'StateMessage equals representation class', 
			function () 
			{
				expect(oops.state.StateMessage).toEqual(oopsStateMessage);
			}
		);
		
		it
		(			
			'Trait equals representation class', 
			function () 
			{
				expect(oops.trait.Trait).toEqual(oopsTrait);
			}
		);
		
		it
		(		
			'Metadata equals representation class', 
			function () 
			{
				expect(oops.vo.Metadata).toEqual(oopsMetadata);
			}
		);
		
		it
		(			
			'Resource equals representation class', 
			function () 
			{
				expect(oops.vo.Resource).toEqual(oopsResource);
			}
		);
	}
);