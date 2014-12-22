var edit_body_def, sub_body_def;
var ObjTmp=false, ObjItem=false, ObjSub=false;
var TagArr;
var seq = '';
$(window).ready(function(){
	edit_body_def="<table width = '450px' style='padding-left:12px;padding-top:8px;'><tr><td class = 'item_title' width = '450px'><h3>標題</h3></td></tr><tr><td class = 'item_body' style = 'word-break: break-all;font-size:14px;' width = '450px'>內文</td></tr><tr><td align='right' style='padding-bottom:20px; padding-right:10px;text-align:right;' class='item_link' width = '450px'><img src='http://www.phitech.com.tw/img/epaper/gif-0511.gif' width='43' height='13' alt='more' /></td></tr></table>";
	sub_body_def = "<table style='width:180px'><tr><td>內文</td></tr><tr><td style='text-align:right'><img src='http://www.phitech.com.tw/img/epaper/gif-0511.gif' width='43' height='13' alt='more' /></td></tr></table>";
	CKEDITOR.replace( 'edit_body' );
	CKEDITOR.instances.edit_body.setData(edit_body_def);
	CKEDITOR.replace( 'sub_edit_b' );
	CKEDITOR.instances.sub_edit_b.setData(sub_body_def);
	tmp_show();
	EditSwich(1);
	$('#EditSwitch1').on('click',function(){EditSwich(1);});
	$('#EditSwitch2').on('click',function(){EditSwich(2);});
	sortable_st();
	$.post('<?php echo $_SESSION['SiteUrl'];?>cgi/epaper/GetTag',function(e){TagArr=e;TagLoad();},'json');
});
function EditSwich(id){
	var ShowTip = $('#EditSwitch1');
	var HideTip = $('#EditSwitch2');

	var ShowSub = $('#main_edit');
	var HideSub = $('#sub_edit');
	if(id == 2){
		ShowTip = $('#EditSwitch2');
		HideTip = $('#EditSwitch1');
		ShowSub = $('#sub_edit');
		HideSub = $('#main_edit');
	}
	ShowTip.css({'background-color':'#00ff00'});
	HideTip.css({'background-color':'#ffffff'});
	ShowSub.show();
	HideSub.hide();
}
function tmp_show(){
	if($("#main_tmp").length == 0 && $(".sortable_sub_tmp").length == 0){
		$('#paper_side').append("<div class = 'sortable_sub_tmp' style = 'min-height: 90px; background-color: #efefef;'><h3>暫存區</h3><div class = 'sub_tmp_main'></div></div>");
		$('.sortable_main').append("<table id = 'main_tmp' width='450px' border='0' cellspacing='0' cellpadding='0' style=' font-size:12pt; color:#333; font-weight:bolder;vertical-align:top;'><tr><td class='main_title' align='left' valign='bottom' style='color: #036; background:#efefef; line-height:25px; border-bottom:#999 1px dashed; border-left:5px #118bd1 solid; padding-left:10px; padding-bottom:5px;padding-top:5px;'>暫存區</td></tr><tr><td class='main_content' style='font-weight:normal; font-size:11pt'><div class = 'sortable'></div></td></tr></table>");
	}
}
function remove_main_tmp(){
	$('#main_tmp').remove();
	$('.sortable_sub_tmp').remove();
}

function sortable_st(){
	$(".sortable_main").sortable({cursor: "move",delay:300});
	$(".sortable").sortable({connectWith: ".sortable",dropOnEmpty:true,cursor: "move",delay:300});
	$(".sortable").css({"min-height":"90px"});
	$('#epaper_side').css({'text-align':'right'});
	$(".sortable_sub, .sub_tmp_main").sortable({connectWith: ".sortable_sub, .sub_tmp_main",cursor: "move",delay:300});
	$(".sortable_sub").css({"min-height":"90px"});
	$(".sortable_sub_tmp,.sub_tmp_main").css({"min-height":"90px","background-color":"#e0e0e0"});

	$("#date, #paper_no, .main_title, .sub_title, .sub_body, .sortable_main .sortable table").mouseover(function(){
		$(this).css("background-color","yellow");
	}).mouseout(function(){
		$("#date, #paper_no, .sortable_main .sortable table, .sub_body").css("background-color",'#ffffff');
		$(".sub_title").css("background-color",'#2f8cc9');
		$(".main_title").css("background-color",'#efefef');
	});
	$("#date, #paper_no, .main_title, .sub_title").on('dblclick',function(){
		if($(this).find('input').length == 0){
			if(ObjTmp == false){
				ObjTmp = $(this);
				$(this).html("<input type = 'text' id = 'TmpInput' value = '"+ObjTmp.html()+"' /><input type = 'button' value = 'set' id = 'TmpSet'>");
				$('#TmpSet').on('click',function(){
					ObjTmp.html($('#TmpInput').val());
					ObjTmp = false;
				});
			}else{
				ObjTmp.html($('#TmpInput').val());
				ObjTmp = $(this);
				$(this).html("<input type = 'text' id = 'TmpInput' value = '"+ObjTmp.html()+"' /><input type = 'button' value = 'set' id = 'TmpSet'>");
				$('#TmpSet').on('click',function(){
					ObjTmp.html($('#TmpInput').val());
					ObjTmp = false;
				});
			}
		}
	});
	$('.sortable_main .sortable table').on('dblclick',function(){
		if(ObjItem == false){
			ObjItem = $(this);
			CKEDITOR.instances.edit_body.setData("<table width = '450px' style='padding-left:12px;padding-top:8px;'>"+$(this).html()+'</table>');
			EditSwich(1);
		}else{
			if(confirm('有尚未儲存的資料，是否放棄?')){
				ObjItem = $(this);
				CKEDITOR.instances.edit_body.setData("<table width = '450px' style='padding-left:12px;padding-top:8px;'>"+$(this).html()+'</table>');
				EditSwich(1);
			}
		}
	});
	$('.sub_body table').on('dblclick',function(){
		if(ObjSub == false){
			ObjSub = $(this);
			CKEDITOR.instances.sub_edit_b.setData("<table style='width:180px'>" + $(this).html() + '</table>');
			EditSwich(2);
		}else{
			if(confirm('有尚未儲存的資料，是否放棄?')){
				ObjSub = $(this);
				CKEDITOR.instances.sub_edit_b.setData("<table style='width:180px'>" + $(this).html() + '</table>');
				EditSwich(2);
			}
		}
	});
	$('#paper_view_sub a').bind ('click', function() {
		 return false;
	});
}

//Tag start
function AddTag(){
	if($('#AddTag').val() != ''){
		var tmp = -1;
		for(var i = 0; i < TagArr.length; i++){
			if(TagArr[i].tag == $('#AddTag').val())
				tmp = i;
		}
		if(tmp == -1){
			var tmp_TagNo = -1;
			for(var i = 0; i < TagArr.length; i++){
				if(parseInt(TagArr[i].no) > tmp_TagNo)
					tmp_TagNo = parseInt(TagArr[i].no);
			}
			var obj = {'no':(tmp_TagNo+1),tag:$('#AddTag').val(),'selected':1};
			$.post('<?php echo $_SESSION['SiteUrl']; ?>cgi/news/AddTag',obj);
			TagArr[TagArr.length] = obj;
		}else{
			TagArr[tmp].selected = 1;
		}
		TagLoad();
	}
}
function TagLoad(){
	$('#UsedTag').html('');
	$('#UnUseTag').html('');
	for(var i = 0; i < TagArr.length; i++){
		var obj = $('#UsedTag');
		var CssSet = "background-color: #00ff00;";
		if(TagArr[i].selected == 0){
			obj = $('#UnUseTag');
			CssSet = "background-color: #dfdfdf;";
		}
		obj.append("<span id = '"+TagArr[i].no+"' class ='link TagItem' style = '"+CssSet+"margin-right: 3px;line-height: 1.5em;'>"+TagArr[i].tag+'</span>');
	}
	$('#UsedTag .TagItem').on('click',function(){
		for(var i = 0; i < TagArr.length; i++){
			if(TagArr[i].no == $(this).attr('id'))
				TagArr[i].selected = 0;
		}
		TagLoad();
	});
	$('#UnUseTag .TagItem').on('click',function(){
		if($('#UsedTag .TagItem').length < 20){
			for(var i = 0; i < TagArr.length; i++){
				if(TagArr[i].no == $(this).attr('id'))
					TagArr[i].selected = 1;
			}
			TagLoad();
		}
	});
}
//Tag end
//主要區域 start
function add_item_main(){
	tmp_show();
	var body = "<table width='450px' border='0' cellspacing='0' cellpadding='0' style=' font-size:12pt; color:#333333; font-weight:bolder;vertical-align:top;'><tr><td class='main_title' align='left' valign='bottom' style='color: #003366; background:#efefef; line-height:25px; border-bottom:#999 1px dashed; border-left:5px #118bd1 solid; padding-left:10px; padding-bottom:5px;padding-top:5px;' width='450px'>"+
	$('#item_main_name').val()
	+"</td></tr><tr><td class='main_content' style='font-weight:normal; font-size:11pt' width='450px'><div class = 'sortable'></div></td></tr></table>";
	if($('#item_main_name').val() != ''){
		$('.sortable_main').append(body);
		$('#item_main_name').val('');
		sortable_st();
	}
}
function add_item(){
	tmp_show();
	var body = CKEDITOR.instances.edit_body.getData();
	if(ObjItem==false){
		if(body != ''){
			$('#main_tmp .sortable').append(body);
			CKEDITOR.instances.edit_body.setData(edit_body_def);
			sortable_st();
			ObjItem=false;
		}else
			alert('input data error');
	}else{
		ObjItem.html(body);
		CKEDITOR.instances.edit_body.setData(edit_body_def);
		ObjItem=false;
	}
}
//主要區域 end
//側邊主題區 start
function add_sub(){
	tmp_show();
	var body = CKEDITOR.instances.sub_edit_b.getData();
	if(ObjSub==false){
		if($('#sub_edit_t').val() != '' && body != ''){
			body = "<table border='0' cellspacing='0' cellpadding='0' style='font-size:10pt;padding:0px 0px 10px 0px;width:210px;'><tr><td width='10' align='left' valign='top' style='color: #000; font-weight:bolder; font-size:12pt;background:#2f8cc9;display:block; position:relative;left:0px;top:0;padding:0;'><img src= 'http://www.phitech.com.tw/img/epaper/titlebox_L.jpg'  width= '10'  height= '30'  /></td><td width='189' align='left' valign='center' style='color: #FFF; font-weight:bolder; font-size:12pt;background:#2f8cc9;padding:0;vertical-align:middle;' class = 'sub_title'>"+$('#sub_edit_t').val()+"</td><td width='11' valign='top' style='color: #000;display:block; background:#2f8cc9;font-weight:bolder; font-size:12pt; position:relative;padding:0;' align='right'><img src= 'http://www.phitech.com.tw/img/epaper/titlebox_R.jpg'  width= '11'  height= '30'  /></td></tr><tr><td width='200px' colspan='4' style='border-bottom:1px solid #ccc; border-right:1px solid #ccc; border-left:1px solid #ccc;font-weight:normal; color:#666; padding:10px 13px 10px 13px;word-wrap: break-word;word-break: break-all;' class = 'sub_body'>"+body+"</td></tr><tr><td height='10px;'colspan='4' id='side_content2'></td></tr></table>";

			$('.sortable_sub').append(body);
			$('#sub_edit_t').val('');
			$('#sub_edit__link').val('');
			CKEDITOR.instances.sub_edit_b.setData(sub_body_def);
			sortable_st();
		}else
			alert('input data error');
	}else{
		ObjSub.html(body);
		CKEDITOR.instances.sub_edit_b.setData(sub_body_def);
		ObjSub=false;
	}
}
//側邊主題區 end
function RPaperSubmit(act){
	if(act == 0)
		remove_main_tmp();
	var SendCk = '';
	if($('#EpaperTitle').val() == ''){
		SendCk += "標題未填\n";
		$('#EpaperTitle').css({'border' : '1px solid #ff0000'});
		$('#EpaperTitle').on('keyup',function(){
			if($(this).val() != '')
				$('#EpaperTitle').css({'border' : '1px solid #000000'});
		});
	}
	if(SendCk == ''){
		var TagTmp = '';
		for(var i = 0; i < TagArr.length; i++){
			if(TagArr[i].selected == 1){
				//alert(TagArr[i].no);
				if(TagTmp != '')
					TagTmp += ',';
				TagTmp += TagArr[i].no;
			}
		}

		var obj = {
			'seq':seq,
			'title':$('#EpaperTitle').val(),
			'class':'1856786358344491080',
			'tag':TagTmp,
			'audit':act,
			'content':$('#paper_view_sub').html()
		};
		$.post('<?php echo $_SESSION['SiteUrl'];?>cgi/news/NewsSend',obj,function(e){
			//seq = e.seq;
		},'json');
	}else{
		alert(SendCk);
	}
}
function EpaperView(){
	window.open('<?php echo $_SESSION['SiteUrl']; ?>body/epaper/EPaperView','mywindow');
}
function reEpaperView(){
	return $('#paper_view_sub').html();
}