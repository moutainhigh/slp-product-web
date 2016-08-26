define('app/jsp/prodcat/catadd', function (require, exports, module) {
    'use strict';
    var $=require('jquery'),
	    Widget = require('arale-widget/1.2.0/widget'),
		Validator = require("arale-validator/0.10.2/index"),
	    Dialog = require("optDialog/src/dialog"),
	    AjaxController = require('opt-ajax/1.0.0/index');
    require("jsviews/jsrender.min");
    require("jsviews/jsviews.min");
    require("bootstrap-paginator/bootstrap-paginator.min");
    require("app/util/jsviews-ext");

	//require("jquery-validation/1.15.1/jquery.validate");
	//require("jquery-validation/1.15.1/additional-methods");
	//require("jquery-validation/1.15.1/localization/messages_zh");
	require("arale-validator/0.10.2/alice.components.ui-button-orange-1.3-full.css");
	require("arale-validator/0.10.2/alice.components.ui-form-1.0-src.css");
    var SendMessageUtil = require("app/util/sendMessage");

    //实例化AJAX控制处理对象
    var ajaxController = new AjaxController();
	Validator.addRule('upperCaseRule', /^[A-Z]{1}$/, '请输入大写字母');
    //定义页面组件类
    var catAddPager = Widget.extend({
    	
    	Implements:SendMessageUtil,
    	//属性，使用时由类的构造函数传入
    	attrs: {
    		clickId:""
    	},
    	Statics: {
    		DEFAULT_PAGE_SIZE: 10
    	},
    	//事件代理
    	events: {
			"click #addCatBtn":"_addCatTemp",
			"click #submitAddBtn":"_submitCatList"
            },
    	//重写父类
    	setup: function () {
			catAddPager.superclass.setup.call(this);
    	},
		//添加输入验证
		_addValidator:function(validator){
			validator.addItem({
				element: "input[name=productCatName]",
				required: true,
				errormessageRequired:"类目名称不能为空"
			}).addItem({
				element: "input[name=firstLetter]",
				required: true,
				rule:'upperCaseRule',
				errormessage:'请输入名称首字母(大写)',
			}).addItem({
				element: "input[name=serialNumber]",
				required: true,
				rule:'number min{min:1} max{max:10000}',
				errormessage:'请输入1至10000的数字',
			});
		},
		//增加类目
		_addCatTemp:function(){
			catNum['num']=catNum['num']+1;
			var template = $.templates("#catAddTemplate");
			var htmlOutput = template.render(catNum);
			$("#subDiv").before(htmlOutput);
		},
		//提交添加
		_submitCatList:function() {
			var _this= this;
			//父类目
			var parentCatId = $('#parentProductCatId').val();
			var catArr = [];
			var hasError = false;
			//获取所有的form-label下的input
			$("#addViewDiv > .form-label.bd-bottom ").each(function (index, form) {
				var validator = new Validator({
					element: $(this)
				});
				_this._addValidator(validator);
				validator.execute(function(error, results, element) {
					if (error){
						hasError = true;
					}
				});
				var catObj = {};
				console.log(index + " form-label");
				if (parentCatId != null & parentCatId != '')
					catObj['parentProductCatId'] = parentCatId;
				//类目名
				var catName = $(this).find("input[name='productCatName']")[0];
				catObj['productCatName'] = catName.value;
				//首字母
				var fLetter = $(this).find("input[name='firstLetter']")[0];
				catObj['firstLetter'] = fLetter.value;
				//排序
				var sn = $(this).find("input[name='serialNumber']")[0];
				catObj['serialNumber'] = sn.value;
				//是否有子分类
				var isChild = $(this).find("input[type='radio']:checked")[0];
				catObj['isChild'] = isChild.value;
				catArr.push(catObj);
			});
			console.log("No error");
			if (hasError)
				return;
			console.log("cat arr lengeth " + catArr.length);
			ajaxController.ajax({
				type: "post",
				processing: true,
				message: "保存中，请等待...",
				url: _base + "/cat/edit/create",
				data: {'catListStr': JSON.stringify(catArr)},
				success: function (data) {
					if ("1" === data.statusCode) {
						//alert("保存成功");
						//保存成功,回退到进入的列表页
						window.history.go(-1)
					}
				}
			});
		}
    });
    
    module.exports = catAddPager;
});

