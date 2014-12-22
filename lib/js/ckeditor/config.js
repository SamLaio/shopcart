/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	//對DIV標籤自動進行格式化 plugins/format/plugin.js
	config.format_div = { element : 'div', attributes : { class : 'normalDiv' } };
	//對H1標籤自動進行格式化 plugins/format/plugin.js
	config.format_h1 = { element : 'h1', attributes : { class : 'contentTitle1' } };
	//對H2標籤自動進行格式化 plugins/format/plugin.js
	config.format_h2 = { element : 'h2', attributes : { class : 'contentTitle2' } };
	//對H3標籤自動進行格式化 plugins/format/plugin.js
	config.format_h1 = { element : 'h3', attributes : { class : 'contentTitle3' } };
	//對H4標籤自動進行格式化 plugins/format/plugin.js
	config.format_h1 = { element : 'h4', attributes : { class : 'contentTitle4' } };
	//對H5標籤自動進行格式化 plugins/format/plugin.js
	config.format_h1 = { element : 'h5', attributes : { class : 'contentTitle5' } };
	//對H6標籤自動進行格式化 plugins/format/plugin.js
	config.format_h1 = { element : 'h6', attributes : { class : 'contentTitle6' } };
	//對P標籤自動進行格式化 plugins/format/plugin.js
	config.format_p = { element : 'p', attributes : { class : 'normalPara' } };
	config.forcePasteAsPlainText =false;
	config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftEnterMode = CKEDITOR.ENTER_BR;
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection'/*, 'spellchecker'*/ ] },
		{ name: 'links' },
		{ name: 'insert' },
		//{ name: 'forms' },
		//{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
		{ name: 'styles' },
		{ name: 'colors' }
	];
	config.toolbar_MyToolbar =
	[
		['Cut','Copy','Paste','PasteText','PasteFromWord'],
		['Undo','Redo'],
		['Image','Table'],
		['Link','Unlink'],
		['Source'],
		'/',
		['FontSize','-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ,'-','TextColor', 'BGColor' ] ,
		['Outdent','Indent'],
		'/',
		['NumberedList', 'BulletedList', '-','Bold','Italic','Strike']
	];
	config.toolbar_EpaperSub =
	[
		['Cut','Copy','Paste','PasteText'],
		['Image','Table'],
		[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight'],
		['Link','Unlink'],
		'/',
		['FontSize','-','TextColor', 'BGColor' ]
	];
	config.toolbarCanCollapse = true;
	config.height = 400;
	config.removeButtons = 'Underline,Subscript,Superscript';
	config.filebrowserBrowseUrl = window.CKFINDER_BASEPATH+'ckfinder.html';
	config.filebrowserImageBrowseUrl = window.CKFINDER_BASEPATH+'ckfinder.html?Type=Images';
	config.filebrowserFlashBrowseUrl = window.CKFINDER_BASEPATH+'ckfinder.html?Type=Flash';
	config.filebrowserUploadUrl = window.CKFINDER_BASEPATH+'core/connector/php/connector.php?command=QuickUpload&type=Files'; //可上傳一般檔案
	config.filebrowserImageUploadUrl = window.CKFINDER_BASEPATH+'core/connector/php/connector.php?command=QuickUpload&type=Images';//可上傳圖檔
	config.filebrowserFlashUploadUrl = window.CKFINDER_BASEPATH+'connector/php/connector.php?command=QuickUpload&type=Flash';//可上傳Flash檔案

};
