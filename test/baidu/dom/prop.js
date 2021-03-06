module("baidu.dom.prop",{});

var bareObj = function(value) { return value; };
var functionReturningObj = function(value) { return (function() { return value; }); };

test('prepareTest',function(){
	expect(1);
	stop();
	ua.importsrc("baidu.dom.append,baidu.each,baidu.dom.each,baidu.dom.trigger,baidu.dom.find,baidu.dom.appendTo,baidu.dom.attr,baidu.dom.removeAttr,baidu.dom.insertAfter,baidu.dom.html,baidu.dom.eq,baidu.dom.remove,baidu.dom.removeProp,baidu.dom.contents", function(){
		start();
		prepareTest();
		ok(true,'ok');
	}, "baidu.dom.contents", "baidu.dom.prop");
});


test("attr(String, Function)", function() {
	expect(2);
	equal( baidu("#text1").attr("value", function() { return this.id; })[0].value, "text1", "Set value from id" );
	equal( baidu("#text1").attr("title", function(i) { return i; }).attr("title"), "0", "Set value with an index");
});

test("attr(Hash)", function() {
	expect(3);
	var pass = true;
	baidu("div").attr({"foo": "baz", "zoo": "ping"}).each(function(){
		if ( this.getAttribute("foo") != "baz" && this.getAttribute("zoo") != "ping" ) {
			pass = false;
		}
	});
	ok( pass, "Set Multiple Attributes" );
	equal( baidu("#text1").attr({"value": function() { return this["id"]; }})[0].value, "text1", "Set attribute to computed value #1" );
	equal( baidu("#text1").attr({"title": function(i) { return i; }}).attr("title"), "0", "Set attribute to computed value #2");
});

test("attr(String, Object)", function() {
	expect(33);
	//修改
	//expect(81);

	var div = baidu("div").attr("foo", "bar"),
		fail = false;

	for ( var i = 0; i < div.size(); i++ ) {
		if ( div.get(i).getAttribute("foo") != "bar" ){
			fail = i;
			break;
		}
	}

	equal( fail, false, "Set Attribute, the #" + fail + " element didn't get the attribute 'foo'" );
	ok( baidu("#foo").attr({ "width": null }), "Try to set an attribute to nothing" );

	baidu("#name").attr("name", "something");
	equal( baidu("#name").attr("name"), "something", "Set name attribute" );
	baidu("#name").attr("name", null);
	equal( baidu("#name").attr("name"), undefined, "Remove name attribute" );
	var $input = $("<input>", { name: "something", id: "specified" });
	$input = baidu($input[0]);
	equal( $input.attr("name"), "something", "Check element creation gets/sets the name attribute." );
	equal( $input.attr("id"), "specified", "Check element creation gets/sets the id attribute." );

	baidu("#check2").prop("checked", true).prop("checked", false).attr("checked", true);
	equal( document.getElementById("check2").checked, true, "Set checked attribute" );
	equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );
	equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );
	baidu("#check2").attr("checked", false);
	equal( document.getElementById("check2").checked, false, "Set checked attribute" );
	equal( baidu("#check2").prop("checked"), false, "Set checked attribute" );
	equal( baidu("#check2").attr("checked"), undefined, "Set checked attribute" );
	baidu("#text1").attr("readonly", true);
	equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );
	equal( baidu("#text1").prop("readOnly"), true, "Set readonly attribute" );
	equal( baidu("#text1").attr("readonly"), "readonly", "Set readonly attribute" );
	baidu("#text1").attr("readonly", false);
	equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );
	equal( baidu("#text1").prop("readOnly"), false, "Set readonly attribute" );
	equal( baidu("#text1").attr("readonly"), undefined, "Set readonly attribute" );

	baidu("#check2").prop("checked", true);
	equal( document.getElementById("check2").checked, true, "Set checked attribute" );
	equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );
	equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );
	baidu("#check2").prop("checked", false);
	equal( document.getElementById("check2").checked, false, "Set checked attribute" );
	equal( baidu("#check2").prop("checked"), false, "Set checked attribute" );
	equal( baidu("#check2").attr("checked"), undefined, "Set checked attribute" );

	baidu("#check2").attr("checked", "checked");
	equal( document.getElementById("check2").checked, true, "Set checked attribute with 'checked'" );
	equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );
	equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );

	QUnit.reset();

	var $radios = $("#checkedtest").find("input[type='radio']");
	$radios.eq(1).click();
	var $radios2 = baidu($radios.eq(1));	
	equal( $radios2.prop("checked"), true, "Second radio was checked when clicked");
	
	//修改
	//equal( $radios.attr("checked"), $radios[0].checked ? "checked" : undefined, "Known booleans do not fall back to attribute presence (#10278)");

	baidu("#text1").prop("readOnly", true);
	equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );
	equal( baidu("#text1").prop("readOnly"), true, "Set readonly attribute" );
	equal( baidu("#text1").attr("readonly"), "readonly", "Set readonly attribute" );
	baidu("#text1").prop("readOnly", false);
	equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );
	equal( baidu("#text1").prop("readOnly"), false, "Set readonly attribute" );
});

test("prop(String, Object)", function() {
	//修改
	//expect(31);
	//expect(29);

	equal( baidu("#text1").prop("value"), "text1", "Check for value attribute" );
	
	//equal( baidu("#text1").prop("value", "Test2").prop("defaultValue"), "text1", "Check for defaultValue attribute" );
	
	equal( baidu("#select2").prop("selectedIndex"), 3, "Check for selectedIndex attribute" );
	equal( baidu("#foo").prop("nodeName").toUpperCase(), "DIV", "Check for nodeName attribute" );
	equal( baidu("#foo").prop("tagName").toUpperCase(), "DIV", "Check for tagName attribute" );
	equal( baidu("<option/>").prop("selected"), false, "Check selected attribute on disconnected element." );	
	equal( baidu("#listWithTabIndex").prop("tabindex"), 5, "Check retrieving tabindex" );
	baidu("#text1").prop("readonly", true);
	equal( document.getElementById("text1").readOnly, true, "Check setting readOnly property with 'readonly'" );
	equal( baidu("#label-for").prop("for"), "action", "Check retrieving htmlFor" );
	baidu("#text1").prop("class", "test");
	equal( document.getElementById("text1").className, "test", "Check setting className with 'class'" );
	equal( baidu("#text1").prop("maxlength"), 30, "Check retrieving maxLength" );
	baidu("#table").prop("cellspacing", 1);
	equal( baidu("#table").prop("cellSpacing"), "1", "Check setting and retrieving cellSpacing" );
	baidu("#table").prop("cellpadding", 1);
	equal( baidu("#table").prop("cellPadding"), "1", "Check setting and retrieving cellPadding" );
	baidu("#table").prop("rowspan", 1);
	equal( baidu("#table").prop("rowSpan"), 1, "Check setting and retrieving rowSpan" );
	baidu("#table").prop("colspan", 1);
	equal( baidu("#table").prop("colSpan"), 1, "Check setting and retrieving colSpan" );
	baidu("#table").prop("usemap", 1);
	equal( baidu("#table").prop("useMap"), 1, "Check setting and retrieving useMap" );
	baidu("#table").prop("frameborder", 1);
	equal( baidu("#table").prop("frameBorder"), 1, "Check setting and retrieving frameBorder" );
	QUnit.reset();

	var body = document.body,
		$body = baidu( body );

	ok( $body.prop("nextSibling") === null, "Make sure a null expando returns null" );
	body["foo"] = "bar";
	equal( $body.prop("foo"), "bar", "Make sure the expando is preferred over the dom attribute" );
	body["foo"] = undefined;
	ok( $body.prop("foo") === undefined, "Make sure the expando is preferred over the dom attribute, even if undefined" );

	var select = document.createElement("select"), optgroup = document.createElement("optgroup"), option = document.createElement("option");
	optgroup.appendChild( option );
	select.appendChild( optgroup );

	//equal( baidu(option).prop("selected"), true, "Make sure that a single option is selected, even when in an optgroup." );
	equal( baidu(document).prop("nodeName"), "#document", "prop works correctly on document nodes (bug #7451)." );

	var attributeNode = document.createAttribute("irrelevant"),
		commentNode = document.createComment("some comment"),
		textNode = document.createTextNode("some text"),
		obj = {};
	baidu.each( [document, attributeNode, commentNode, textNode, obj, "#firstp"], function(  ele,i ) {
		strictEqual( typeof baidu(ele).prop("nonexisting").prop, 'function', "prop works correctly for non existing attributes (bug #7500)." );
	});

	obj = {};
	//修改
	// baidu.each( [document, obj], function( ele,i ) {
	// 	var $ele = baidu( ele );
	// 	$ele.prop( "nonexisting", "foo" );
	// 	equal( $ele.prop("nonexisting"), "foo", "prop(name, value) works correctly for non existing attributes (bug #7500)." );
	// });
	//baidu( document ).removeProp("nonexisting");

	var $form = baidu("#form").prop("enctype", "multipart/form-data");
	equal( $form.prop("enctype"), "multipart/form-data", "Set the enctype of a form (encoding in IE6/7 #6743)" );
});

test("prop('tabindex')", function() {
	expect(8);

	// elements not natively tabbable
	equal(baidu("#listWithTabIndex").prop("tabindex"), 5, "not natively tabbable, with tabindex set to 0");
	equal(baidu("#divWithNoTabIndex").prop("tabindex"), undefined, "not natively tabbable, no tabindex set");

	// anchor with href
	equal(baidu("#linkWithNoTabIndex").prop("tabindex"), 0, "anchor with href, no tabindex set");
	equal(baidu("#linkWithTabIndex").prop("tabindex"), 2, "anchor with href, tabindex set to 2");
	equal(baidu("#linkWithNegativeTabIndex").prop("tabindex"), -1, "anchor with href, tabindex set to -1");

	// anchor without href
	equal(baidu("#linkWithNoHrefWithNoTabIndex").prop("tabindex"), undefined, "anchor without href, no tabindex set");
	equal(baidu("#linkWithNoHrefWithTabIndex").prop("tabindex"), 1, "anchor without href, tabindex set to 2");
	equal(baidu("#linkWithNoHrefWithNegativeTabIndex").prop("tabindex"), -1, "anchor without href, no tabindex set");
});

test("prop('tabindex', value)", function() {
	expect(9);

	var element = baidu("#divWithNoTabIndex");
	equal(element.prop("tabindex"), undefined, "start with no tabindex");

	// set a positive string
	element.prop("tabindex", "1");
	equal(element.prop("tabindex"), 1, "set tabindex to 1 (string)");

	// set a zero string
	element.prop("tabindex", "0");
	equal(element.prop("tabindex"), 0, "set tabindex to 0 (string)");

	// set a negative string
	element.prop("tabindex", "-1");
	equal(element.prop("tabindex"), -1, "set tabindex to -1 (string)");

	// set a positive number
	element.prop("tabindex", 1);
	equal(element.prop("tabindex"), 1, "set tabindex to 1 (number)");

	// set a zero number
	element.prop("tabindex", 0);
	equal(element.prop("tabindex"), 0, "set tabindex to 0 (number)");

	// set a negative number
	element.prop("tabindex", -1);
	equal(element.prop("tabindex"), -1, "set tabindex to -1 (number)");

	element = baidu("#linkWithTabIndex");
	equal(element.prop("tabindex"), 2, "start with tabindex 2");

	element.prop("tabindex", -1);
	equal(element.prop("tabindex"), -1, "set negative tabindex");
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").prop('type');
    equal(typeof result.prop, 'function','get方法');
    var result = baidu("#baidujsxiaozu").prop('type','wlkafjl');
    ok(result,'有东西就行');
});

//准备工序
function prepareTest(){
	var html = "<div id='body'>"+
	"<!-- Test HTML -->"+
	"<div id='nothiddendiv' style='height:1px;background:white;' class='nothiddendiv'>"+
		"<div id='nothiddendivchild'></div>"+
	"</div>"+
	"<!-- this iframe is outside the #qunit-fixture so it won't reload constantly wasting time, but it means the tests must be 'safe' and clean up after themselves -->"+
	"<iframe id='loadediframe' name='loadediframe' style='display:none;'>"+
	"<html>"+
	  "<head>"+
	    "<title>iframe</title>"+
	  "</head>"+
	  "<body>"+
	    "<div><span>span text</span></div>"+
	  "</body>"+
	"</html>"+
	"</iframe>"+
	"<dl id='dl' style='position:absolute;top:-32767px;left:-32767px;width:1px'>"+
	"<div id='qunit-fixture'>"+
		"<p id='firstp'>See <a id='simon1' href='http://simon.incutio.com/archive/2003/03/25/#getElementsBySelector' rel='bookmark'>this blog entry</a> for more information.</p>"+
		"<p id='ap'>"+
			"Here are some links in a normal paragraph: <a id='google' href='http://www.google.com/' title='Google!'>Google</a>,"+
			"<a id='groups' href='http://groups.google.com/' class='GROUPS'>Google Groups (Link)</a>."+
			"This link has <code><a href='http://smin' id='anchor1'>class='blog'</a></code>:"+
			"<a href='http://diveintomark.org/' class='blog' hreflang='en' id='mark'>diveintomark</a>"+

		"</p>"+
		"<div id='foo'>"+
			"<p id='sndp'>Everything inside the red border is inside a div with <code>id='foo'</code>.</p>"+
			"<p lang='en' id='en'>This is a normal link: <a id='yahoo' href='http://www.yahoo.com/' class='blogTest'>Yahoo</a></p>"+
			"<p id='sap'>This link has <code><a href='#2' id='anchor2'>class='blog'</a></code>: <a href='http://simon.incutio.com/' class='blog link' id='simon'>Simon Willison's Weblog</a></p>"+

		"</div>"+
		"<span id='name+value'></span>"+
		"<p id='first'>Try them out:</p>"+
		"<ul id='firstUL'></ul>"+
		"<ol id='empty'></ol>"+
		"<form id='form' action='formaction'>"+
			"<label for='action' id='label-for'>Action:</label>"+
			"<input type='text' name='action' value='Test' id='text1' maxlength='30'/>"+
			"<input type='text' name='text2' value='Test' id='text2' disabled='disabled'/>"+
			"<input type='radio' name='radio1' id='radio1' value='on'/>"+

			"<input type='radio' name='radio2' id='radio2' checked='checked'/>"+
			"<input type='checkbox' name='check' id='check1' checked='checked'/>"+
			"<input type='checkbox' id='check2' value='on'/>"+

			"<input type='hidden' name='hidden' id='hidden1'/>"+
			"<input type='text' style='display:none;' name='foo[bar]' id='hidden2'/>"+

			"<input type='text' id='name' name='name' value='name' />"+
			"<input type='search' id='search' name='search' value='search' />"+

			"<button id='button' name='button' type='button'>Button</button>"+

			"<textarea id='area1' maxlength='30'>foobar</textarea>"+

			"<select name='select1' id='select1'>"+
				"<option id='option1a' class='emptyopt' value=''>Nothing</option>"+
				"<option id='option1b' value='1'>1</option>"+
				"<option id='option1c' value='2'>2</option>"+
				"<option id='option1d' value='3'>3</option>"+
			"</select>"+
			"<select name='select2' id='select2'>"+
				"<option id='option2a' class='emptyopt' value=''>Nothing</option>"+
				"<option id='option2b' value='1'>1</option>"+
				"<option id='option2c' value='2'>2</option>"+
				"<option id='option2d' selected='selected' value='3'>3</option>"+
			"</select>"+
			"<select name='select3' id='select3' multiple='multiple'>"+
				"<option id='option3a' class='emptyopt' value=''>Nothing</option>"+
				"<option id='option3b' selected='selected' value='1'>1</option>"+
				"<option id='option3c' selected='selected' value='2'>2</option>"+
				"<option id='option3d' value='3'>3</option>"+
				"<option id='option3e'>no value</option>"+
			"</select>"+
			"<select name='select4' id='select4' multiple='multiple'>"+
				"<optgroup disabled='disabled'>"+
					"<option id='option4a' class='emptyopt' value=''>Nothing</option>"+
					"<option id='option4b' disabled='disabled' selected='selected' value='1'>1</option>"+
					"<option id='option4c' selected='selected' value='2'>2</option>"+
				"</optgroup>"+
				"<option selected='selected' disabled='disabled' id='option4d' value='3'>3</option>"+
				"<option id='option4e'>no value</option>"+
			"</select>"+
			"<select name='select5' id='select5'>"+
				"<option id='option5a' value='3'>1</option>"+
				"<option id='option5b' value='2'>2</option>"+
				"<option id='option5c' value='1' data-attr=''>3</option>"+
			"</select>"+

			"<object id='object1' codebase='stupid'>"+
				"<param name='p1' value='x1' />"+
				"<param name='p2' value='x2' />"+
			"</object>"+

			"<span id='台北Táiběi'></span>"+
			"<span id='台北' lang='中文'></span>"+
			"<span id='utf8class1' class='台北Táiběi 台北'></span>"+
			"<span id='utf8class2' class='台北'></span>"+
			"<span id='foo:bar' class='foo:bar'></span>"+
			"<span id='test.foo[5]bar' class='test.foo[5]bar'></span>"+

			"<foo_bar id='foobar'>test element</foo_bar>"+
		"</form>"+
		"<b id='floatTest'>Float test.</b>"+
		"<iframe id='iframe' name='iframe'></iframe>"+
		"<form id='lengthtest'>"+
			"<input type='text' id='lenght123' name='test'/>"+
			"<input type='text' id='idTest' name='id'/>"+
		"</form>"+
		"<table id='table'></table>"+

		"<form id='name-tests'>"+
			"<!-- Inputs with a grouped name attribute. -->"+
			"<input name='types[]' id='types_all' type='checkbox' value='all' />"+
			"<input name='types[]' id='types_anime' type='checkbox' value='anime' />"+
			"<input name='types[]' id='types_movie' type='checkbox' value='movie' />"+
		"</form>"+

		"<form id='testForm' action='#' method='get'>"+
			"<textarea name='T3' rows='2' cols='15'>?"+
"Z</textarea>"+
			"<input type='hidden' name='H1' value='x' />"+
			"<input type='hidden' name='H2' />"+
			"<input name='PWD' type='password' value='' />"+
			"<input name='T1' type='text' />"+
			"<input name='T2' type='text' value='YES' readonly='readonly' />"+
			"<input type='checkbox' name='C1' value='1' />"+
			"<input type='checkbox' name='C2' />"+
			"<input type='radio' name='R1' value='1' />"+
			"<input type='radio' name='R1' value='2' />"+
			"<input type='text' name='My Name' value='me' />"+
			"<input type='reset' name='reset' value='NO' />"+
			"<select name='S1'>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
			"</select>"+
			"<select name='S2' multiple='multiple' size='3'>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
			"</select>"+
			"<select name='S3'>"+
				"<option selected='selected'>YES</option>"+
			"</select>"+
			"<select name='S4'>"+
				"<option value='' selected='selected'>NO</option>"+
			"</select>"+
			"<input type='submit' name='sub1' value='NO' />"+
			"<input type='submit' name='sub2' value='NO' />"+
			"<input type='image' name='sub3' value='NO' />"+
			"<button name='sub4' type='submit' value='NO'>NO</button>"+
			"<input name='D1' type='text' value='NO' disabled='disabled' />"+
			"<input type='checkbox' checked='checked' disabled='disabled' name='D2' value='NO' />"+
			"<input type='radio' name='D3' value='NO' checked='checked' disabled='disabled' />"+
			"<select name='D4' disabled='disabled'>"+
				"<option selected='selected' value='NO'>NO</option>"+
			"</select>"+
			"<input id='list-test' type='text' />"+
			"<datalist id='datalist'>"+
				"<option value='option'></option>"+
			"</datalist>"+
		"</form>"+
		"<div id='moretests'>"+
			"<form>"+
				"<div id='checkedtest' style='display:none;'>"+
					"<input type='radio' name='checkedtestradios' checked='checked'/>"+
					"<input type='radio' name='checkedtestradios' value='on'/>"+
					"<input type='checkbox' name='checkedtestcheckboxes' checked='checked'/>"+
					"<input type='checkbox' name='checkedtestcheckboxes' />"+
				"</div>"+
			"</form>"+
			"<div id='nonnodes'><span>hi</span> there <!-- mon ami --></div>"+
			"<div id='t2037'>"+
				"<div><div class='hidden'>hidden</div></div>"+
			"</div>"+
			"<div id='t6652'>"+
				"<div></div>"+
			"</div>"+
			"<div id='no-clone-exception'><object><embed></embed></object></div>"+
		"</div>"+

		"<div id='tabindex-tests'>"+
			"<ol id='listWithTabIndex' tabindex='5'>"+
				"<li id='foodWithNegativeTabIndex' tabindex='-1'>Rice</li>"+
				"<li id='foodNoTabIndex'>Beans</li>"+
				"<li>Blinis</li>"+
				"<li>Tofu</li>"+
			"</ol>"+

			"<div id='divWithNoTabIndex'>I'm hungry. I should...</div>"+
			"<span>...</span><a href='#' id='linkWithNoTabIndex'>Eat lots of food</a><span>...</span> |"+
			"<span>...</span><a href='#' id='linkWithTabIndex' tabindex='2'>Eat a little food</a><span>...</span> |"+
			"<span>...</span><a href='#' id='linkWithNegativeTabIndex' tabindex='-1'>Eat no food</a><span>...</span>"+
			"<span>...</span><a id='linkWithNoHrefWithNoTabIndex'>Eat a burger</a><span>...</span>"+
			"<span>...</span><a id='linkWithNoHrefWithTabIndex' tabindex='1'>Eat some funyuns</a><span>...</span>"+
			"<span>...</span><a id='linkWithNoHrefWithNegativeTabIndex' tabindex='-1'>Eat some funyuns</a><span>...</span>"+
		"</div>"+

		"<div id='liveHandlerOrder'>"+
			"<span id='liveSpan1'><a href='#' id='liveLink1'></a></span>"+
			"<span id='liveSpan2'><a href='#' id='liveLink2'></a></span>"+
		"</div>"+

		"<div id='siblingTest'>"+
			"<em id='siblingfirst'>1</em>"+
			"<em id='siblingnext'>2</em>"+
		"</div>"+
	"</div>"+
	"</dl>"+
	"<div id='fx-test-group' style='position:absolute;width:1px;height:1px;overflow:hidden;'>"+
		"<div id='fx-queue' name='test'>"+
			"<div id='fadein' class='chain test' name='div'>fadeIn<div>fadeIn</div></div>"+
			"<div id='fadeout' class='chain test out'>fadeOut<div>fadeOut</div></div>"+

			"<div id='show' class='chain test'>show<div>show</div></div>"+
			"<div id='hide' class='chain test out'>hide<div>hide</div></div>"+

			"<div id='togglein' class='chain test'>togglein<div>togglein</div></div>"+
			"<div id='toggleout' class='chain test out'>toggleout<div>toggleout</div></div>"+


			"<div id='slideup' class='chain test'>slideUp<div>slideUp</div></div>"+
			"<div id='slidedown' class='chain test out'>slideDown<div>slideDown</div></div>"+

			"<div id='slidetogglein' class='chain test'>slideToggleIn<div>slideToggleIn</div></div>"+
			"<div id='slidetoggleout' class='chain test out'>slideToggleOut<div>slideToggleOut</div></div>"+

			"<div id='fadetogglein' class='chain test'>fadeToggleIn<div>fadeToggleIn</div></div>"+
			"<div id='fadetoggleout' class='chain test out'>fadeToggleOut<div>fadeToggleOut</div></div>"+

			"<div id='fadeto' class='chain test'>fadeTo<div>fadeTo</div></div>"+
		"</div>"+

		"<div id='fx-tests'></div>"+
	"</div>"+
	"</div>";

	var body = $('body');
	temp = body.html();
	body.html(html+temp)
	body.prop('id','body');

};
