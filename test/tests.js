test('no-base-classes', function(){
	$.declare('my1test.My', null,{
		constructor : function(args){
			this.a = args.a;
			this.b = args.b;
		},
		say_a : function(){
			return this.a;
		}
	});
	
	var my = new my1test.My({a:1, b:3});
	var my1 = new my1test.My({a:10, b:30});
	ok(my.say_a() === 1);
	ok(my.b === 3);
	ok(typeof(my.c) === 'undefined');
});

test('one-level-inheritance', function(){
	$.declare('my2test.Base', null,{
		constructor : function(args){
			this.a = args.a;
			this.b = args.b;
		},
		say_a : function(){
			return this.a;
		},
		say_other : function(){
			return this.say_a();
		}
	});
	$.declare('my2test.Child', my2test.Base,{
		constructor : function(args){
//			this.super.constructor(args);
			this.c = args.c;
		},
		say_b : function(){
			return this.b;
		},
		say_a : function(){
			return 'redefined';
		}
	});
	var my0 = new my2test.Base({a:10, b:30});
	
	var my = new my2test.Child({a:1, b:3, c: 4});

	ok(my0.a === 10);
	ok(my0.b === 30);
	ok(my0.say_a() === 10);
	ok(my0.say_other() === 10);
	
	ok(my.say_a() === 'redefined');
	ok(my.say_b() === 3);
	ok(my.c === 4);
	ok(my.super.say_a() === 1);
	ok(my.say_other() === 'redefined');
});

test('two-levels-inheritance', function(){
	$.declare('my3test.Base', null,{
		constructor : function(args){
			this.a = args.a;
			this.b = args.b;
		},
		say_a : function(){
			return this.a;
		},
		say_other : function(){
			return this.say_a();
		},
		
	});
	$.declare('my3test.Child', my3test.Base,{
		constructor : function(args){
			this.c = args.c;
		},
		say_b : function(){
			return this.b;
		},
		say_a : function(){
			return 'redefined';
		}
	});
	$.declare('my3test.Grandchild', my3test.Child,{
		constructor : function(args){
			this.d = args.d;
		},
		say_d : function(){
			return this.d;
		},
		say_a : function(){
			return 'redefined-a';
		}
	});
	var my0 = new my3test.Child({a:10, b:30, c: 40, d: 50});
	var my1 = new my3test.Child({a:110, b:130, c: 140, d: 150});
	var my = new my3test.Grandchild({a:1, b:3, c: 4, d: 5});
	
	ok(my0.say_a() === 'redefined');
	ok(my0.a === 10);
	ok(my0.b === 30);
	ok(my0.say_b() === 30);
	ok(my0.c === 40);
	ok(my0.super.say_a() === 10);
	ok(my0.say_other() === 'redefined');

	ok(my1.say_a() === 'redefined');
	ok(my1.a === 110);
	ok(my1.b === 130);
	ok(my1.say_b() === 130);
	ok(my1.c === 140);
	ok(my1.super.say_a() === 110);
	ok(my1.say_other() === 'redefined');
	
	ok(my.say_a() === 'redefined-a');
	ok(my.say_b() === 3);
	ok(my.c === 4);
	ok(my.super.say_a() === 'redefined');
	ok(my.super.super.say_a() === 1);
	ok(my.say_other() === 'redefined-a');
});

test('one-levels-2-branches-inheritance', function(){
	$.declare('my4test.Base', null,{
		constructor : function(args){
			this.a = args.a;
			this.b = args.b;
		},
		say_a : function(){
			return this.a;
		},
		say_other : function(){
			return this.say_a();
		},
		
	});
	$.declare('my4test.Child1', my4test.Base,{
		constructor : function(args){
			this.c = args.c;
		},
		say_b : function(){
			return this.b;
		},
		say_a : function(){
			return 'redefined';
		}
	});
	$.declare('my4test.Child2', my4test.Base,{
		constructor : function(args){
			this.d = args.d;
		},
		say_d : function(){
			return this.d;
		},
		say_a : function(){
			return 'redefined-a';
		}
	});
	var my1 = new my4test.Child1({a:1, b:3, c: 4, d: 5});
	var my2 = new my4test.Child2({a:6, b:7, c: 8, d: 9});

	ok(my1.a === 1);
	ok(my1.say_a() === 'redefined');
	ok(my1.say_b() === 3);
	ok(my1.c === 4);
	ok(my1.super.say_a() === 1);
	ok(my1.say_other() === 'redefined');
	
	ok(my2.a === 6);
	ok(my2.say_a() === 'redefined-a');
	ok(my2.d === 9);
	ok(my2.super.say_a() === 6);
	ok(my2.say_other() === 'redefined-a');
});
