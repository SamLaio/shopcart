<?php
ini_set('display_errors',1);
if(!isset($_SESSION))
	session_start();
include_once 'lib/LibBoot.php';
include_once 'lib/LibDataBase.php';
if(!isset($_SESSION['SiteUrl'])){
	$port = ($_SERVER['SERVER_PORT'] == 80)?'http://':'https://';
	$_SESSION['SiteUrl'] = explode('load.php',$_SERVER['PHP_SELF']);
	$_SESSION['SiteUrl'] = $port . $_SERVER['HTTP_HOST'] . $_SESSION['SiteUrl'][0];
}
if(
	!file_exists('lib/Config.php') and
	!strpos($_SERVER['REQUEST_URI'],'install') and
	!strpos($_SERVER['REQUEST_URI'],'js')
){
	header('Location: '.$_SESSION['SiteUrl'].'install');
}else if(!file_exists('lib/Config.php') and strpos($_SERVER['REQUEST_URI'],'install')){
	$_SESSION['SiteName'] = 'MyMVC';
}else if(file_exists('lib/Config.php')){
	include 'lib/Config.php';
	if(isset($DbType))
		define('DbType', $DbType);
	//主要連線mysql
	if(isset($DbHost))
		define('DbHost', $DbHost);
	if(isset($DbUser))
		define('DbUser', $DbUser);
	if(isset($DbPw))
		define('DbPw', $DbPw);
	if(isset($DbName))
		define('DbName', $DbName);

	//備援連線mysql
	if(isset($BDbHost))
		define('BDbHost', $BDbHost);
	if(isset($BDbUser))
		define('BDbUser', $BDbUser);
	if(isset($BDbPw))
		define('BDbPw', $BDbPw);
	if(isset($BDbName))
		define('BDbName', $BDbName);

	include 'model/load.php';
	$Load = new Load;
	if(strpos($_SERVER['REQUEST_URI'],'install')){
		header('Location: index');
	}
}
$baseUrl = explode('/',$_SERVER['PHP_SELF']);
$ck = false;
$url = array();
foreach($baseUrl as $baseK => $baseV){
	if($ck)
		$url[] = $baseV;
	if($baseV == 'load.php')
		$ck = true;
}
// print_r($url);
$boot = new LibBoot($url);
