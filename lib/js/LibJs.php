<?php
	if(!isset($_SESSION))
		session_start();
?>
$(document).ready(function(){
	$('#goIndex').on('click', function(){
		PageChange('index');
	});
	$('#login').on('click', function(){
		PageChange('login');
	});
	$('#logout').on('click', function(){
		if(confirm('this click is logout , are you sure?')){
			$.post('<?php echo $_SESSION['SiteUrl'];?>cgi/login/Logout',function(){
				document.location = '<?php echo $_SESSION['SiteUrl'];?>';
			});
		}
	});
});
function Implode(tip, arr){
	var tmp = '';
	for(var i = 0; i < arr.length; i++){
		if(tmp != '')
			tmp += tip;
		tmp += arr[i];
	}
	return tmp;
}
function PageChange(page){
	$.post('<?php echo $_SESSION['SiteUrl'];?>body/'+page,function(e){
		$('#BodyMain').html(e);
		$("head").append("<scr" + "ipt type=\"text/javascript\" src=\"<?php echo $_SESSION['SiteUrl'];?>js/Lang\"></scr" + "ipt>");
	});
}

