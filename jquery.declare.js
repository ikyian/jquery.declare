(function($){
	/**
	 * Assigns obj to the namespace provided in pathName.
	 * 
	 * @param str_pathName - full name of the variable (it must contain namespace path
	 *                      to the variable (like 'a.b.name') 
	 */
	var setObject = function(pathName, obj){
		/*from: http://pastebin.com/Ra0KLfMU*/
		var arr_path = pathName.split(".");
		var anchor = window;
        for(var j = 0; j < arr_path.length; j++){
        	if(j + 1 < arr_path.length){
//            		console.log("arr_path[j]", arr_path[j]);
                if(anchor[arr_path[j]] == null){
                	anchor[arr_path[j]] = {};
                }else if(typeof anchor[arr_path[j]] == "object"){
                	// Handle if the anchor is already created and an object
                }else{
                	// Anchor has already been created and isn't an object, throw error
                    console.error("invalid namespace",anchor[arr_path[j]]);
                    throw "invalid namespace";     
                }
                anchor = anchor[arr_path[j]];
        	}else{
        		anchor[arr_path[j]] = obj;
        	};
        };
	};
	/**
	 * Creates class with inheritance by merging classes properties
	 * 
	 * @param str_name  - name of the class with namespase (like 'a.b.MyClass')
	 * @param obj_base - base class object created with declare()
	 * @returns function - constructor for the declared class 
	 */
	var declare_class = function(base, props){			
		var f = function(){
			var baseProto0 = (base && typeof(base) != 'undefined') ? new base(arguments[0]) : {};
			var baseProto = {};
			$.extend(baseProto, baseProto0);
			this.__proto__ = baseProto;
			this.super = this.__proto__;
			$.extend(this, props);
			if(this['constructor']){
				this['constructor'].apply(this, arguments);
			}
		};
		f.__class__ = name;
		f.prototype = props;
		return f;
	};
	/**
	 * Creates class with inheritance by merging classes properties and assigns it to
	 * global namespace specified in the class name.
	 * 
	 * If the class has method 'constructor' it is called at the object creation time.
	 * Method 'constructor' of the base class is called before the method of the class itself. 
	 * @param str_name  - name of the class with namespase (like 'a.b.MyClass')
	 * @param obj_base - base class object created with declare() 
	 * @param obj_props - properties and methods of this class.
	 */
	var declare = function(name, base, props){			
		var f = declare_class(base, props);
		setObject(name, f);
		return f;
	};
	$.setObject = setObject;
	$.declare = declare;
})(jQuery);	 
