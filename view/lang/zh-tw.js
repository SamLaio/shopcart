var datepickerDef,dataTableDef;
var alert_sub,strLang;
$(window).ready(function(){
	strLang = new Array(
		{'name':'InstallInfo','type':'def','val':'安裝設定'},
		{'name':'AdminName','type':'def','val':'管理員帳號:'},
		{'name':'AdminPw','type':'def','val':'管理員密碼:'},
		{'name':'SiteName','type':'def','val':'網站名稱:'},
		{'name':'SiteUrl','type':'def','val':'網站網址:'},
		{'name':'SiteLang','type':'def','val':'網站語言:'},
		{'name':'DbType','type':'def','val':'資料庫類型:'},
		{'name':'DbName','type':'def','val':'資料庫名稱:'},
		{'name':'DbHost','type':'def','val':'資料庫連線:'},
		{'name':'DbAdame','type':'def','val':'資料庫管理員帳號:'},
		{'name':'DbAdPw','type':'def','val':'資料庫管理員密碼:'},

		{'name':'account','type':'def','val':'帳號:'},
		{'name':'password','type':'def','val':'密碼:'},
		{'name':'captcha','type':'def','val':'驗證碼:'},
		{'name':'ReLoadCapthcha','type':'def','val':'刷新圖片'},
		{'name':'submit','type':'input','val':'送出'},

		{'name':'flow','type':'def','val':'新增'},
		{'name':'plan','type':'def','val':'計劃'},
		{'name':'goIndex','type':'def','val':'首頁'},
		{'name':'login','type':'def','val':'登入'},
		{'name':'logout','type':'def','val':'登出'},

		{'name':'StartDate','type':'def','val':'開始日期:'},
		{'name':'EndDate','type':'def','val':'結束日期:'}
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
			'StNull':'資料不齊!!',
			'StError':'資料錯誤!!',
			'CaptchaNull':'驗證碼空白或錯誤!!'
		}
	};
	datepickerDef={
				dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				dayNamesMin:["日","一","二","三","四","五","六"],
				monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
				monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
				prevText:"上月",
				nextText:"次月",
				weekHeader:"週",
				showMonthAfterYear:true,
				dateFormat:"yy-mm-dd"
			};
	dataTableDef={
			"oLanguage":{
				"sProcessing":"處理中...",
				 "sLengthMenu":"顯示 _MENU_ 項結果",
				 "sZeroRecords":"沒有匹配結果",
				 "sInfo":"顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
				 "sInfoEmpty":"顯示第 0 至 0 項結果，共 0 項",
				 "sInfoFiltered":"(從 _MAX_ 項結果過濾)",
				 "sSearch":"搜索:",
				 "oPaginate":{"sFirst":"首頁","sPrevious":"上頁","sNext":"下頁","sLast":"尾頁"},
			},
			"order": [[ 0, "desc" ]]
		 };
});