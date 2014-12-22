<?php
include 'lib/phpmailer/class.phpmailer.php';
class SendMail extends PHPMailer {
	function __construct($arr = false) {
		$this->CharSet = "utf-8";
		$this->Encoding = "base64";
		$this->SetLanguage('zh',dirname(__FILE__) . '/phpthiser/language/');
		$this->IsSMTP();                                   // send via SMTP
		$this->Host     = "192.168.248.7";                     // SMTP servers
		$this->SMTPAuth = true; // turn on SMTP authentication
		$this->WordWrap = 50;                              // set word wrap
		$this->IsHTML(true);
		$this->AltBody  =  "";
		if($arr)
			$this->toSend($arr);
	}
	public function toSend($arr){
		// print_r($arr);exit;
	//function sand_mail($mail_add, $title, $body, $mail_title,$mail_from='news', $file = null){
		if(isset($arr['addr']) and isset($arr['subject']) and isset($arr['body'])){
			$from_arr = array('news' => '1qaz@WSX','training' => '1qaz@WSX');
			$mail_from = 'news';
			if(isset($arr['from']) and in_array($arr['from'], array_keys($from_arr)))
				$mail_from = $arr['from'];
			$this->Username =  "$mail_from@phitech.com.tw";
			$this->Password = $from_arr[$mail_from];

			$this->From     = $this->Username;
			$this->FromName = (isset($arr['FromName']))?$arr['FromName']:'懇懋科技';

			if(!is_array($arr['addr']))
				$this->AddAddress($arr['addr']);
			else{
				foreach($arr['addr'] as $value)
					$this->AddBCC($value);
			}

			if(isset($arr['file'])){
				foreach($arr['file'] as $file_name => $file_path){
					$this->AddAttachment($file_path,$file_name);
				}
			}
			$this->Subject  = $arr['subject'];
			$this->Body     = $arr['body'];
			$this->AltBody  =  "";
			if(!$this->Send()) {
				return $this->ErrorInfo;
			}else{
				return 1;
			}
		}
	}
}