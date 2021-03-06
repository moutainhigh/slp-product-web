<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<title>运营管理</title>
	<%@ include file="/inc/inc.jsp" %>
</head>

<body>

<div class="content-wrapper-iframe"><!--右侧灰色背景-->
	<div class="row"><!--外围框架-->
		<div class="col-lg-12"><!--删格化-->
			<div class="row"><!--内侧框架-->
				<div class="col-lg-12"><!--删格化-->
					<div class="main-box clearfix"><!--白色背景-->
					<form id="prodAttrValueForm" action="${_base}/attrManage/saveAttrValue" method="post">
						<div id="addViewDiv" class="main-box-body clearfix">
                            <!-- 查询条件 -->
                            <div class="form-label bd-bottom ui-form" data-widget="validator">
                            	<input type="hidden" id="attrId" name="attrId" value="${attrId}"/>
								<ul>
					                <li class="col-md-12 ui-form-item">
					                    <p class="word"><span>*</span>属性值名称</p>
					                    <p><input name="attrValueName0" type="text" 
					                    class="int-text int-medium" maxlength="20" 
					                    required data-msg-required="属性值名称不能为空"
                                                  val-tag="attrValueName"
                                                  commonText="/^[a-zA-Z_()0-9\u4e00-\u9fa5\-]+$/"
                                                  onblur="this.value=this.value.replace(/^\s+|\s+$/g,'')"></p>
					                </li>
					                <li class="col-md-12 ui-form-item">
										<p class="word"><span>*</span>名称首字母(大写)</p>
										<p><input  name="firstLetter0" type="text" class="int-text int-medium" 
										     maxlength="1" 
										     required data-msg-required="名称首字母不能为空" regexp="[A-Z]{1}"
                                             data-msg-regexp="请输入大写的名称首字母" val-tag="firstLetter"
                                             onblur="this.value=this.value.replace(/^\s+|\s+$/g,'')"></p>
									</li>
					             </ul>
					             
					             <!-- <div class="title-right">
					             	<p id="addAttrBtn" class="plus-word btn-primary" >
					             		 <a href="javaScript:void(0);"><i class="fa fa-plus"></i>新  增</a>
					             	</p>
					             </div> -->
                            </div> 
                            <div id="subDiv" class="form-label">
                            <div class="left row title-right">
                                <p id="addAttrBtn" class="plus-word btn-primary">
                                    <a href="javaScript:void(0);"><i class="fa fa-plus"></i>新  增</a></p>
                            </div>
                            </div>
                            <div  class="row pt-30">
                            	<p class="center pr-30 mt-30">
                            		<input id="submitAddBtn" type="button" 
                            		class="biu-btn  btn-primary  btn-small  ml-5"
                                           value="提  交">
                                    <input id="goBackBtn" type="button" class="biu-btn  btn-primary  btn-small  ml-5"
                                           value="返  回" onclick="javaScript:window.history.go(-1);">
                            	</p>
                            </div>
                            
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script id="attrAddTemplate"  type="text/template">
	 <!-- 查询条件 -->
                            <div class="form-label bd-bottom ui-form" data-widget="validator">
								<input type="hidden" name="attrId" value="${attrId}"/>
								<div class="title-right">
                                   <p class="plus-word btn-primary">

                                     <a href="javaScript:void(0);" name="delBtn"><i class="fa fa-times"></i>删  除</a> 
									
									</p>
                                </div>
								<ul>
					                <li class="col-md-12 ui-form-item">
					                    <p class="word"><span>*</span>属性值名称</p>
					                    <p><input name="attrValueName{{:num}}" type="text" class="int-text int-medium" 
											maxlength="20" 
					                        required data-msg-required="属性值名称不能为空"
											commonText="/^[a-zA-Z_()0-9\u4e00-\u9fa5\-]+$/"
                                            val-tag="attrValueName" onblur="this.value=this.value.replace(/^\s+|\s+$/g,'')"></p>
					                </li>
					                <li class="col-md-12 ui-form-item">
										<p class="word"><span>*</span>名称首字母(大写)</p>
										<p><input  name="firstLetter{{:num}}" type="text" class="int-text int-medium" 
											 maxlength="1" 
											 required data-msg-required="名称首字母不能为空" regexp="[A-Z]{1}"
                                             data-msg-regexp="请输入大写的名称首字母" val-tag="firstLetter" onblur="this.value=this.value.replace(/^\s+|\s+$/g,'')"></p>
									</li>
					             </ul>
							</div>
</script>


</body>
<script type="text/javascript">
    var pager;
    var attrNum = {'num':0};
    (function () {
        <%-- 删除按钮 --%>
        $('#addViewDiv').delegate("a[name='delBtn']", 'click', function () {
			if (window.console) {
				console.log("删除");
			}
            $(this).parent().parent().parent().remove();
        });
        
        seajs.use('app/jsp/prodAttr/addAttrValue', function (attrValueAddPager) {
            pager = new attrValueAddPager({element: document.body});
            pager.render();
        });
    })();
</script>

</html>