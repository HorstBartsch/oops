//--------------------------------------------------------------------------
//
//  Packages
//
//--------------------------------------------------------------------------

/**
 * @class	The Packages object list all available base classes and their related packages.
 * 			It is allowed to add further object during runtime. Every class that is added
 * 			should inherit from <i>Oops</i>.
 * 
 * @name __Packages
 * @see Oops
 */
var oops = 
/** @lends __Packages# */
{
	
	/**
	 * @description	Defines an oops package that holds composite releated objects.
	 * 				You can add more classes by referencing <i>oops.composite</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see Component
	 * @see Composite
	 *  
	 * @type Package
	 */
	composite:
	{
		/*global oopsComponent*/
		Component: 	oopsComponent,
		/*global oopsComposite*/
		Composite: 	oopsComposite
	}
	
	/**
	 * @description	Defines an oops package that holds core releated objects.
	 * 				You shouldn't add further objects to the core package.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see ChainManager
	 * @see Error
	 * @see Oops
	 *  
	 * @type Package
	 */
	, core:
	{
		/*global oopsChainManager*/
		ChainManager: 	oopsChainManager.instance(),
		/*global oopsError*/
		Error: 			oopsError,
		/*global Oops*/
		Oops: 			Oops
	}
	
	/**
	 * @description	Defines an oops package that holds error releated objects.
	 * 				You can add more classes by referencing <i>oops.error</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see ArgumentError
	 * @see ErrorMessage
	 * @see IllegalOperationError
	 * @see RangeError
	 * @see TypeError
	 *  
	 * @type Package
	 */
	, error:
	{
		/*global oopsArgumentError*/
		ArgumentError: 			oopsArgumentError,
		/*global oopsErrorMessage*/
		ErrorMessage: 			oopsErrorMessage,
		/*global oopsIllegalOperationError*/
		IllegalOperationError: 	oopsIllegalOperationError,
		/*global oopsRangeError*/
		RangeError: 			oopsRangeError,
		/*global oopsTypeError*/
		TypeError: 				oopsTypeError
	}
	
	/**
	 * @description	Defines an oops package that holds event releated objects.
	 * 				You can add more classes by referencing <i>oops.event</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see Event
	 * @see EventDispatcher
	 * @see MetadataEvent
	 * @see StatusEvent
	 * @see TraitEvent
	 *  
	 * @type Package
	 */
	, event:
	{
		/*global oopsEvent*/
		Event: 				oopsEvent,
		/*global oopsEventDispatcher*/
		EventDispatcher:	oopsEventDispatcher,
		/*global oopsMetadataEvent*/
		MetadataEvent: 		oopsMetadataEvent,
		/*global oopsStatusEvent*/
		StatusEvent: 		oopsStatusEvent,
		/*global oopsTraitEvent*/
		TraitEvent: 		oopsTraitEvent		
	}
	
	/**
	 * @description	Defines an oops package that holds factory releated objects.
	 * 				You can add more classes by referencing <i>oops.factory</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see ElementCreator
	 * @see ElementFactory
	 *  
	 * @type Package
	 */
	, factory:
	{
		/*global oopsElementCreator*/
		ElementCreator: oopsElementCreator,
		/*global oopsElementFactory*/
		ElementFactory: oopsElementFactory
	}	

	/**
	 * @description	Defines an oops package that holds model releated objects.
	 * 				You can add more classes by referencing <i>oops.model</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see Element
	 * @see ElementType
	 * @see ProxyElement
	 *  
	 * @type Package
	 */
	, model:
	{
		/*global oopsElement*/
		Element: 		oopsElement,
		/*global oopsElementType*/
		ElementType: 	oopsElementType,
		/*global oopsProxyElement*/
		ProxyElement: 	oopsProxyElement
	}
	
	/**
	 * @description	Defines an oops package that holds state releated objects.
	 * 				You can add more classes by referencing <i>oops.state</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see State
	 * @see StateContext
	 * @see StateMessage
	 *  
	 * @type Package
	 */
	,state:
	{
		/*global oopsState*/
		State: 			oopsState,
		/*global oopsStateContext*/
		StateContext: 	oopsStateContext,
		/*global oopsStateMessage*/
		StateMessage: 	oopsStateMessage
	}
	
	/**
	 * @description	Defines an oops package that holds trait releated objects.
	 * 				You can add more classes by referencing <i>oops.trait</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see Trait
	 *  
	 * @type Package
	 */
	, trait:
	{
		/*global oopsTrait*/
		Trait: oopsTrait
	}
	
	/**
	 * @description	Defines an oops package that holds vo releated objects.
	 * 				You can add more classes by referencing <i>oops.vo</i>.<br/><br/>  
	 * 
	 * The base setup includes the following classes:
	 * @see Metadata
	 * @see Resource
	 *  
	 * @type Package
	 */
	, vo: 
	{
		/*global oopsMetadata*/
		Metadata: 	oopsMetadata,
		/*global oopsResource*/
		Resource: 	oopsResource
	}
};