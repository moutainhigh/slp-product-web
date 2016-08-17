define('app/jsp/prodAttr/attrManage', function (require, exports, module) {
    'use strict';
    var $=require('jquery'),
    Widget = require('arale-widget/1.2.0/widget'),
    Dialog = require("optDialog/src/dialog"),
    Paging = require('paging/0.0.1/paging-debug'),
    AjaxController = require('opt-ajax/1.0.0/index');
require("jsviews/jsrender.min");
require("jsviews/jsviews.min");
require("my97DatePicker/WdatePicker");
require("bootstrap-paginator/bootstrap-paginator.min");
require("app/util/jsviews-ext");
require("opt-paging/aiopt.pagination");
require("twbs-pagination/jquery.twbsPagination.min");
    
    var SendMessageUtil = require("app/util/sendMessage");
    
    //实例化AJAX控制处理对象
    var ajaxController = new AjaxController();
    var clickId = "";
    //定义页面组件类
    var attrlistPager = Widget.extend({
    	
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
    		//查询
            "click #selectAttrValueList":"_selectAttrValueList",
            "click #increase-close":"_closeEditDiv",
            "click #upAttrValueBtn":"_updateAttr",
            "click #delAttrValueBtn":"_delAttr",
            "click #aband-close":"_closeDelConf"
            },
    	//重写父类
    	setup: function () {
    		attrlistPager.superclass.setup.call(this);
    		this._selectAttrValueList();
    	},
    	
    	//查询列表
    	_selectAttrValueList:function(){
    		var _this = this;
    		
    		var attrvalueDefId = $("#attrvalueDefId").val().trim();
    		var attrValueName = $("#attrValueName").val().trim();
    		
    		$("#pagination-ul").runnerPagination({
	 			url: _base+"/attrManage/getAttrLis",
	 			method: "POST",
	 			dataType: "json",
	 			renderId:"searchAttrData",
	 			messageId:"showMessageDiv",
	 			
	 			data: {"attrvalueDefId":attrvalueDefId,"attrValueName":attrValueName},
	 			
	           	pageSize: attrlistPager.DEFAULT_PAGE_SIZE,
	           	visiblePages:5,
	            render: function (data) {
	            	if(data != null && data != 'undefined' && data.length>0){
	            		var template = $.templates("#searchAttrTemple");
	            	    var htmlOutput = template.render(data);
	            	    $("#searchAttrData").html(htmlOutput);
	            	}
	            	_this._returnTop();
	            }
    		});
    	},
    	//滚动到顶部
    	_returnTop:function(){
    		var container = $('.wrapper-right');
    		container.scrollTop(0);//滚动到div 顶部
    	},
    	
    	//弹出编辑框
    	_showAttr:function(attrvalueDefId){
			//后台获取数据,
			ajaxController.ajax({
				type: "get",
				processing: true,
				message: "数据获取中,请等待...",
				url: _base+"/attrManage/"+attrvalueDefId,
				success: function(data){
					//获取数据成功
					if("1"===data.statusCode){
						var attrValueInfo = data.data;
						$("#upAttrvalueDefId").val(attrValueInfo.attrvalueDefId);
						$("#upAttrValueName").val(attrValueInfo.attrValueName);
						
						$('#eject-mask').fadeIn(100);
						$('#increase-samll').slideDown(200);
					}
				}
			});

		},
		//关闭编辑页面弹出
		_closeEditDiv:function(){
			$('#eject-mask').fadeOut(100);
			$('#increase-samll').slideUp(150);
			//清空数据
			$("#upAttrvalueDefId").val("");
			$("#upAttrValueName").val("");
		},
		//提交更新
		_updateAttr:function(){
			var _this = this;
			var attrvalueDefId = $("#upAttrvalueDefId").val();
			var attrName = $("#upAttrValueName").val();
			this._closeEditDiv();
			ajaxController.ajax({
				type: "post",
				processing: true,
				message: "数据更新中,请等待...",
				
				url: _base+"/attrEdit/updateAttr",
				
				data:{"attrvalueDefId":attrvalueDefId,"attrName":attrName,"valueWay":valueWay},
				success: function(data){
					//获取数据成功
					if("1"===data.statusCode){
						//刷新当前数据
						//$("#pagination-ul .page .active").trigger("click");
						window.location.reload();
					}
				}
			});
		},
		
		//删除确认提示框
		_showDelConf:function(attrvalueDefId){
			$('#eject-mask').fadeIn(100);
			$('#aband-small').slideDown(200);
			console.log("del attr id is "+ attrvalueDefId);
			$("#delAttrValueId").val(attrvalueDefId);
		},
		//删除类目
		_delAttr:function(){
			var _this = this;
			var attrvalueDefId = $("#delAttrValueId").val();//类目标识
			this._closeDelConf();
			ajaxController.ajax({
				type: "get",
				processing: true,
				message: "数据删除中,请等待...",
				url: _base+"/attrValueEdit/delAttrValue/"+attrvalueDefId,
				success: function(data){
					//获取数据成功
					if("1"===data.statusCode){
						//刷新当前数据
						//$("#pagination-ul .page .active").trigger("click");
						window.location.reload();
					}
				}
			});
		},
		//关闭确认提示框
		_closeDelConf:function(){
			$('#eject-mask').fadeOut(100);
			$('#aband-small').slideUp(150);
			$("#delAttrValueId").val('');
		}
    	
    });
    
    module.exports = attrlistPager
});
