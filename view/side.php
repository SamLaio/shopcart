<script>
	$(window).ready(function(){
		$('.mu_sliber').on('click',function(){
			$(this).next().slideToggle('20');
			if($(this).find('.tg_cg').html() == "＋")
				$(this).find('.tg_cg').html("－");
			else
				$(this).find('.tg_cg').html("＋");
		});
		// user
		$('#UserList,#ResetInfo,#ReSetPw').on('click', function(){
			PageChange('user/' + $(this)[0].id );
		});
		// user
	});
	$(window).ready(function(){
		sideCount();
		ref1 = setInterval(function(){
			sideCount();
		},600000);
	});
	function sideCount(){
		var ListItem = ['NewsList','NewsPostList','NewsNopassLise','NewsNoseeLise','NewsDraftList'];
		$.post('<?php echo $_SESSION['SiteUrl']; ?>cgi/index/GetNewsCount',function(e){
			for(var i = 0; i < ListItem.length;i++){
				if($('#'+ListItem[i]).length > 0){
					$('.'+ListItem[i]+'Count').html(e[ListItem[i]].count);
					if($('#Index'+ListItem[i]).length > 0){
						SetIndexTable(e[ListItem[i]].arr,$('#Index'+ListItem[i]));
					}
				}
			}
		},'json');
	}
</script>
<?php
	$isAdmin = isset($_SESSION['user']['jur']['admin']);
	if(isset($_SESSION['user']['jur'])){
?>
<div class = 'side'>
	<div><?php echo $_SESSION['user']['name'];?></div>
	<div class = 'side_sub'>
	<!--帳號功能-->
		<span id = "ResetInfo" class = 'link'>修改資料</span><br />
		<span id = "ReSetPw" class = 'link'>密碼重設</span>
	</div>
<?php
		if(
			$isAdmin or
			isset($_SESSION['user']['jur']['user_list']) or
			isset($_SESSION['user']['jur']['group_set'])
		){
?>
	<script>
		$(window).ready(function(){
			// user
			$('#UserList,#GroupSet,#AdmJur').on('click', function(){
				PageChange('user/' + $(this)[0].id );
			});
			// user
		});
	</script>
	<div class = 'side_sub'>
		<!--admin區塊-->
		<span class = 'mu_sliber link'>
			<span class = 'tg_cg'>＋</span>使用者設定
		</span>
		<div class = 'list' style = "display:none;">
<?php
			if($isAdmin or isset($_SESSION['user']['jur']['user_list'])){
?>
					<span id = "UserList" class = 'link'>使用者列表</span><br />
<?php
			}
			if($isAdmin or isset($_SESSION['user']['jur']['group_set'])){
?>
					<span id = "GroupSet" class = 'link'>群組</span>
<?php
			}
?>
		</div>
		<br />
	</div>
<?php
		}
?>
	<script>
		$(window).ready(function(){
			// user
			$('#TagEdit,#NewsList,#NewsPostList,#NewsNopassLise,#NewsNoseeLise,#NewsDraftList,#NewsEdit').on('click', function(){
				PageChange('news/' + $(this)[0].id);
			});
			$('#FormList').on('click', function(){
				PageChange('form/' + $(this)[0].id);
			});
			$('#EPaperAdd,#EPaperEdit').on('click', function(){
				PageChange('epaper/' + $(this)[0].id);
			});
			$('#EdmAdd,#EdmAddFree,#EdmEdit').on('click', function(){
				PageChange('edm/' + $(this)[0].id);
			});
			$('#EmailType,#EmailList,#EmailTag').on('click', function(){
				PageChange('postmail/' + $(this)[0].id);
			});
			$('#FlowList').on('click', function(){
				PageChange('flow/' + $(this)[0].id);
			});
			// user
		});
	</script>
	<div class = 'side_sub'>
<?php
		if($isAdmin or isset($_SESSION['user']['jur']['tag_mang'])){
?>
			<span id = "TagEdit" class = 'link'>標籤管理</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['news_list'])){
?>
			<span id = "NewsList" class = 'link'>已發佈的稿件(<span class = 'NewsListCount'></span>)</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['news_post_list'])){
?>
			<span id = "NewsPostList" class = 'link'>已通過的稿件(<span class = 'NewsPostListCount'></span>)</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['news_no_post'])){
?>
			<span id = "NewsNopassLise" class = 'link'>未通過的稿件(<span class = 'NewsNopassLiseCount' ></span>)</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['news_no_see'])){
?>
			<span id = "NewsNoseeLise" class = 'link'>待審核的稿件(<span class = 'NewsNoseeLiseCount' ></span>)</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['news_draft_list'])){
?>
			<span id = "NewsDraftList" class = 'link'>草稿夾(<span class = 'NewsDraftListCount'></span>)</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['news_add'])){
?>
			<span id = "NewsEdit" class = 'link'>撰寫新文章</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['form_list'])){
?>
			<span id = "FormList" class = 'link'>報名系統</span><br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['e_paper'])){
?>
			<span class='mu_sliber link'>
				<span class = 'tg_cg'>＋</span>電子報
			</span>
			<div class = 'list' style = "display:none;">
				<span id = "EPaperAdd" class = 'link'>新增</span><br />
				<span id = "EPaperEdit" class = 'link'>編輯</span>
			</div>
			<br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['edm'])){
?>
			<span class='mu_sliber link'>
				<span class = 'tg_cg'>＋</span>EDM
			</span>
			<div class = 'list' style = "display:none;">
				<span id = "EdmAdd" class = 'link'>新增</span><br />
				<span id = "EdmAddFree" class = 'link'>新增(自由編輯)</span><br />
				<span id = "EdmEdit" class = 'link'>編輯</span>
			</div>
			<br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['post_mail'])){
?>
			<span class = 'mu_sliber link'>
				<span class = 'tg_cg'>＋</span>信件系統
			</span>
			<div class = 'list' style = "display:none;">
				<span id = "EmailType" class = 'link'>信件寄送</span><br />
				<span id = "EmailList" class = 'link'>名單</span><br />
				<span id = "EmailTag" class = 'link'>編輯標籤</span>
			</div>
			<br />
<?php
		}
		if($isAdmin or isset($_SESSION['user']['jur']['flow'])){
?>
			<span id = "FlowList" class = 'link'>流量</span><br />
<?php
		}
?>
	</div>
</div>
<?php
	}
?>
