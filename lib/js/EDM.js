var seq = '';
var style = 1;
var defobody = "<table border='0' cellpadding='0' cellspacing='0' class='item_main' style='border-top:1px dashed #999; color:#333; padding-top:10px; width:650px'><tbody><tr><td colspan='2'>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan='2' style='text-align:right'><a href='#' style='text-decoration: underline; color: #39C; font-size:14px;'>&lt;了解詳情&gt;</a></td></tr></tbody></table>";

var $inprt = false, $def_obj = false;
var CkSubEdit = false, InpuSubEdit = false, def_link=false;
$(window).ready(function(){
	CKEDITOR.replace( 'edit_edm_body' );
	CKEDITOR.instances.edit_edm_body.setData(defobody);

	$('#TopImg').on('click',function(){BrowseServer('edm_top_img');});
	if($('#edm_top_img')[0] != null)
		$('#edm_img_src').val($('#edm_top_img')[0].src);
	AddTmp();
	edm_body_set();
});
function AddTmp(){
	if($('#edm_tmp_main').length == 0)
		$('#edm_main_body').append("<div id = 'edm_tmp_main' style='background-color:#efefef;'><h3>暫存區</h3><div id = 'edm_tmp'></div></div>");
}

function BrowseServer(inputId){
	var finder = new CKFinder() ;
	finder.basePath = '<?php echo $_SESSION['SiteUrl'];?>js/ckfinder'; //導入CKFinder的路徑
	finder.selectActionFunction = SetFileField; //設置文件被選中時的函數
	finder.selectActionData = inputId; //接收地址的input ID
	finder .popup();
}
function SetFileField(fileUrl,data){
	$('#' + data["selectActionData"]).val(fileUrl);
	$('#edm_top_img')[0].src=fileUrl;
}
function add_item(){
	AddTmp();
	if($inprt != false){
		$inprt.html(CKEDITOR.instances.edit_edm_body.getData());
		$inprt = false;
	}else{
		$('#edm_tmp').append(CKEDITOR.instances.edit_edm_body.getData());
	}
	CKEDITOR.instances.edit_edm_body.setData(defobody);
	$('#add_item_bu').val('add');
	edm_body_set();
}
function close_item(){
	CKEDITOR.instances.edit_edm_body.setData(defobody);
	$('#add_item_bu').val('add');
	$inprt = false;
}

function edm_body_set(){
	$("#edm_body, #edm_tmp").sortable({connectWith: "#edm_body, #edm_tmp",dropOnEmpty:true,cursor: "move",delay:300});
	$('#edm_view a').bind ('click', function() {
		 return false;
	});
	$('#edm_tmp .item_main, #edm_body .item_main').on('dblclick',function(){
		var body = "<table class = 'item_main' width='650px' border='0' cellspacing='0' cellpadding='0' style='padding-top:10px; border-top:1px dashed #999; color:#333;'>"+
		$(this).html() +
		"</table>";
		CKEDITOR.instances.edit_edm_body.setData(body);
		$inprt = $(this);
		$('#add_item_bu').val('set');
	});
	$('#edm_top_title, #edm_top_note').on('dblclick',function(){
		TmpCkShow($(this));
	});

	$('#edm_body, #edm_tmp,#edm_top_title,#edm_top_note').css({'min-height':'80px'});
	$('.item_main, #edm_top_title,#edm_top_note').mouseover(function(){
		$(this).css('background-color','yellow');
	}).mouseout(function(){
		$(this).css('background-color','#ffffff');
	}).css('background-color','#ffffff');

	$('#edm_item_top td').on('dblclick',function(){
		TmpInpuShow($(this));
	}).mouseover(function(){
		$(this).css('background-color','yellow');
	}).mouseout(function(){
		$(this).css('background-color','#0099CC');
	}).css('background-color','#0099CC');

	$('#no_see').on('dblclick',function(){
		dbclick_link($(this));
	}).mouseover(function(){
		$(this).css('background-color','yellow');
	}).mouseout(function(){
		$(this).css('background-color','');
	}).css('background-color','');
}
function TmpCkShow(obj){
	if(CkSubEdit == false){
		CkSubEdit = obj;
		var OldVal = obj.html();
		obj.html("<textarea id = 'ck_tmp'></textarea><br />[<span id = 'SetCkTmp' class = 'link'>Set</span>]");
		$('#ck_tmp').val(OldVal);
		CKEDITOR.replace('ck_tmp',{toolbar : 'MyToolbar',height:200});
		$('#SetCkTmp').on('click',function(){SetCkTmp();});
	}else{
		SetCkTmp();
		TmpCkShow(obj);
	}
}
function SetCkTmp(){
	CKEDITOR.instances.ck_tmp.destroy();
	CkSubEdit.html(CkSubEdit.find('#ck_tmp').val());
	CkSubEdit = false;
	edm_body_set();
}
function TmpInpuShow(obj){
	if(InpuSubEdit == false){
		InpuSubEdit = obj;
		var OldVal = obj.html();
		obj.html("<input type = 'text' id = 'inpu_tmp' /><br />[<span id = 'SetInpuTmp' class = 'link'>Set</span>]");
		$('#inpu_tmp').val(OldVal);
		$('#SetInpuTmp').on('click',function(){SetInpuTmp();});
	}else{
		SetInpuTmp();
		TmpInpuShow(obj);
	}
}
function SetInpuTmp(){
	InpuSubEdit.html($('#inpu_tmp').val());
	InpuSubEdit = false;
	edm_body_set();
}

function dbclick_link(obj){
	if(def_link == false){
		def_link = obj;
		var ObjText = obj.text();
		var ObjHref = '';
		if(obj.find('a')[0]){
			ObjHref = obj.find('a')[0].href;
		}
		obj.html("文字:<input type = 'text' id = 'def_text' />連結:<input type = 'text' id = 'def_href' />[<span id = 'SetInpuLinkTmp' class = 'link'>Set</span>]");
		$('#def_text').val(ObjText);
		$('#def_href').val(ObjHref);
		$('#SetInpuLinkTmp').on('click',function(){def_reback_link();});
	}else{
		def_reback_link();
		dbclick_link(obj);
	}
}
function def_reback_link(){
	def_link.html("<a href = '"+$('#def_href').val()+"'>"+$('#def_text').val()+"</a>");
	def_link = false;
	edm_body_set();
}

function remove_tmp(){
	$('#edm_tmp_main').remove();
}

function edm_submit(){
	if($('#edm_title').val() != ''){
		remove_tmp();
		$.post('<?php echo $_SESSION['SiteUrl'];?>cgi/edm/EdmSave',{
			'seq' : seq,
			'title' : $('#edm_title').val(),
			'body' : $('#edm_view').html(),
			'style' : style
		},function(e){
			if(e != -1){
				seq = e;
				alert('儲存成功');
			}
		});
	}else{
		alert("title is null");
	}
}
function EdmView(){
	window.open('<?php echo $_SESSION['SiteUrl']; ?>body/edm/EdmView','mywindow');
}
function reEdmView(){
	return $('#edm_view').html();
}