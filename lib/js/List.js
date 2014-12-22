<?php
	$isAdmin = isset($_SESSION['user']['jur']['admin']);
	echo "var userid = '".$_SESSION['user']['UserId']."';\n";
?>
function GetNews(){
	var obj = {'audit':list_item};
	if($('#class').val() != '')
		obj = {'audit':list_item,'class':$('#class').val()};
	$.post('<?php echo $_SESSION['SiteUrl']; ?>cgi/news/GetNews',obj,function(e){
		NewsClass = e['NewsClass'];
		NewsArr = e['News'];
		$('#NewsTableMain').html("<table id = 'NewsTable'><thead><tr><td>審核日期</td><td width = '30%'>標題</td><td>類別</td><td>撰寫人</td><td>審核人</td><td>撰寫日期</td><td>工具</td></tr></thead><tbody></tbody></table>");
		SetNewsTable();
		if(ck){
			ck = !ck;
			for(var i = 0; i < NewsClass.length; i++){
				$('#class').append("<option value = '"+ NewsClass[i].class +"'>"+NewsClass[i].name+"</option>");
			}
		}
	},'json');
}
function SetNewsTable(){
	for(var i = 0; i < NewsArr.length; i++){
		var tmp = '';
		tmp = "<tr>"+
			"	<td>"+NewsArr[i].audit_date+"</td>"+
			"	<td width = '30%'>"+NewsArr[i].title+"</td>"+
			"	<td>"+NewsArr[i].class +"</td>"+
			"	<td>"+NewsArr[i].author+"</td>"+
			"	<td>"+NewsArr[i].reviewer+"</td>"+
			"	<td>"+NewsArr[i].post_date+"</td>"+
			"	<td>"+
			"		[<span class = 'link' onclick = 'view("+NewsArr[i].seq+");'>查看</span>]";
<?php
	if(isset($_SESSION['user']['jur']['news_post_online']) or isset($_SESSION['user']['jur']['admin'])){
?>
		if(NewsArr[i].audit == '通過審核'){
			tmp += 
			"		[<span class = 'link' onclick = 'post("+NewsArr[i].seq+");'>發佈</span>]";
		}
<?php
	}
?>
		if(NewsArr[i].audit == '草稿'){
			tmp += 
			"		[<span class = 'link' onclick = 'send("+NewsArr[i].seq+");'>送審</span>]";
		}
		tmp += 
			"		[<span class = 'link' onclick = 'edit("+NewsArr[i].seq+");'>編輯</span>]"+
			"		[<span class = 'link' onclick = 'del("+NewsArr[i].seq+");'>刪除文章</span>]"+
			"	</td>"+
			"</tr>";
		$("#NewsTable").append(tmp);
	}
	$("#NewsTable").dataTable(dataTableDef);
}
function del(no){
	if(confirm('該文章確認後，將會被刪除\n確定要送出?')){
		$.post('<?php echo $_SESSION['SiteUrl']; ?>cgi/news/NewsDel', {'id':no},function(e){
			if(e == 1){
				GetNews();
			}
		});
	}
}
function view(id){
	PageChange('news/NewsView?seq='+ id);
}
function edit(id){
	PageChange('news/NewsEdit?seq='+ id);
}
function send(id){
	// alert(id);
	if(confirm('該文章確認後，將會直接送審\n確定要送出?')){
		$.post('<?php echo $_SESSION['SiteUrl']; ?>cgi/news/SendCk',{'seq':id});
		PageChange('news/NewsDraftList');
	}
}
function post(id){
	//alert(id);
	$.post('<?php echo $_SESSION['SiteUrl'];?>cgi/news/NewsPost',{'seq':id},function(e){
		if(e == 1){
			alert('發佈完成');
		}
	});
}
$(window).ready(function(){
	GetNews();
	$('#class').on('change',function(){
		GetNews();
	});
});