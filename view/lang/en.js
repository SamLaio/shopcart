var datepickerDef,dataTableDef;;
var alert_sub,strLang;
$(window).ready(function(){
	strLang = new Array(
		{'name':'InstallInfo','type':'def','val':'Install Info'},
		{'name':'AdminName','type':'def','val':'Administrator Name:'},
		{'name':'AdminPw','type':'def','val':'Administrator Password:'},
		{'name':'SiteName','type':'def','val':'Site Name:'},
		{'name':'SiteUrl','type':'def','val':'Site Url:'},
		{'name':'SiteLang','type':'def','val':'Site Language:'},
		{'name':'DbType','type':'def','val':'DataBase Type:'},
		{'name':'DbName','type':'def','val':'DataBase Name:'},
		{'name':'DbHost','type':'def','val':'DataBase Link:'},
		{'name':'DbAdame','type':'def','val':'DataBase Administrator Name:'},
		{'name':'DbAdPw','type':'def','val':'DataBase Administrator Password:'},
		
		{'name':'account','type':'def','val':'Account:'},
		{'name':'password','type':'def','val':'Password:'},
		{'name':'captcha','type':'def','val':'Captcha:'},
		{'name':'ReLoadCapthcha','type':'def','val':'ReLoadCapthchaImg'},
		{'name':'submit','type':'input','val':'Submit'},
		
		{'name':'flow','type':'def','val':'Flow'},
		{'name':'plan','type':'def','val':'Plan'},
		{'name':'goIndex','type':'def','val':'Index'},
		{'name':'login','type':'def','val':'Login'},
		{'name':'logout','type':'def','val':'Logout'},
		
		{'name':'StartDate','type':'def','val':'StartDate:'},
		{'name':'EndDate','type':'def','val':'EndDate:'}
	);
	for(var i = 0; i < strLang.length; i++){
		var tmp;
		if(strLang[i].type == 'def')
			if($('.Lang_'+strLang[i].name).length > 0) $('.Lang_'+strLang[i].name).html(strLang[i].val);
		if(strLang[i].type == 'input')
			if($('.Lang_'+strLang[i].name).length > 0) $('.Lang_'+strLang[i].name).val(strLang[i].val);
	}
	alert_sub = {
		'Login':{
			'StNull':'Any Info is NULL!!',
			'StError':'Info is ERROR!!',
			'CaptchaNull':'Captcha is NULL or Error!!'
		}
	};
	datepickerDef={showMonthAfterYear:true,dateFormat:"yy-mm-dd"};
	dataTableDef={"order": [[ 0, "desc" ]]};
});