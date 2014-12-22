<?
require("class.phpmailer.php");

$mail = new PHPMailer();
$mail->Encoding = "8bit";
$mail->CharSet = "big5";

$mail->IsSMTP();                                   // send via SMTP
$mail->Host     = "localhost"; // SMTP servers
//$mail->SMTPAuth = true;     // turn on SMTP authentication
//$mail->Username = "jswan";  // SMTP username
//$mail->Password = "secret"; // SMTP password

$mail->From     = "benyan47@yahoo.com.tw";
$mail->FromName = "ªü²Â";
$mail->AddAddress("12116@30888.com.tw","benyan"); 
//$mail->AddAddress("ellen@site.com");               // optional name
$mail->AddReplyTo("ben_re@hotmail.com","ben_reihotmail");

$mail->WordWrap = 50;                              // set word wrap
$mail->AddAttachment("test/test.png");      // attachment
$mail->AddAttachment("test/test.png"); 
$mail->AddEmbeddedImage("test/test.png", "my-attach", "test/test.png","base64", "image/png");

$mail->IsHTML(true);                               // send as HTML

$mail->Subject  =  "Here is the subject´ú¸Õ";
$mail->Body     =  "This is the <b>HTML body´ú¸Õ</b>Embedded Image: <img alt=\"phpmailer\" src=\"cid:my-attach\">Here is an image!</a>";
$mail->AltBody  =  "This is the text-only body";

if(!$mail->Send())
{
   echo "Message was not sent <p>";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
}

echo "Message has been sent";

?>