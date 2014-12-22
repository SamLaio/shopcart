<?php
class LibDataBase {
	public $dbtype, $dbhost,$dbuser,$dbpass,$dbname,$table;
	public $count = 0;
	public $install = false;

	//共用function
	function __construct() {
		$this->dbtype = DbType;
		if (DbType == 'mysql') {
			if($this->chkservice(DbHost,3306)){
				$this->dbhost = DbHost;
				$this->dbuser = DbUser;
				$this->dbpass = DbPw;
				$this->dbname = DbName;
			}else{
				$this->dbhost = BDbHost;
				$this->dbuser = BDbUser;
				$this->dbpass = BDbPw;
				$this->dbname = BDbName;
			}
		}
		if (DbType == 'sqlite') {
			$this->dbname = DbName;
		}
	}

	public function Link() {
		//test link add by Sam 20140805
		$link = false;
		if ($this->dbtype == 'mysql'){
			$link = new PDO(
					"mysql:host=$this->dbhost;dbname=$this->dbname",
					$this->dbuser,
					$this->dbpass,
					array(
						PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
						PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
					)
			);
		}
		if ($this->dbtype == 'sqlite') {
			$link = new PDO("sqlite:" . $this->dbname);
			if (!$link) die ($error);
		}
		//test link add by Sam 20140805
		if($link)
			return $link;
		else{
			echo 'DB link is false.';
			exit;
		}
	}

	//測試連線
	private function chkservice($host, $port) {
		$ch_ini_display = (ini_get('display_errors') == 1);
		if ($ch_ini_display) //判斷ini的display errors的設定
			ini_set('display_errors', 0); //設定連線錯誤時不要display errors
		$x = fsockopen(gethostbyname($host), $port, $errno, $errstr, 1);
		if ($ch_ini_display)
			ini_set('display_errors', 1); //將ini的display error設定改回來
		if (!$x)//測試連線
			return false;
		else {
			fclose($x);
			return true;
		}
	}
	//共用function end
	//語法組合
	public function Select($table, $field, $req = false, $other = false/*$or_by = false, $limit = false*/) {
		$table = $this->comb(',',$table);
		$field = $this->comb(',', $field);
		$req = ($req)?'where ' . $req:'';
		$or_by = '';
		$limit = '';
		if($other){
			$or_by = (isset($other['order_by']))?" order by " . $this->comb(',',$other['order_by']):'';
			$limit = (isset($other['limit']))?" limit " . $other['limit']:'';
		}
		/*$or_by = ($or_by)?" order by " . $this->comb(',',$or_by):'';
		$limit = ($limit)?" limit " . $limit:'';*/
		$sql = "select $field from $table $req $or_by $limit;";
		// echo $sql;
		return $sql;
	}

	public function In($table, $arr) {
		// print_r($arr);exit;
		if(isset($arr['F']) and isset($arr['V'])){
			$field = '(' . $this->comb(',',array_values($arr['F'])). ')';
			$value = $this->combTip(array_values($arr['V']));
		}else{
			$field = '(' . $this->comb(',',array_keys($arr)). ')';
			$value = "(" . $this->comb(',',$this->ValAddTip(array_values($arr))) . ')';
		}

		$sql = "insert into $table $field values $value;";
		return $sql;
	}

	public function Del($table, $req = '') {
		//DELETE FROM [TABLE NAME] WHERE 條件;
		$table = $this->comb(',',$table);
		if ($req != '')
			$req = 'where ' . $req;
		$sql = "DELETE FROM $table $req;";
		return $sql;
	}

	public function Up($table, $arr,$req = '') {
		//UPDATE [TABLE NAME] SET [欄名1]=值1, [欄名2]=值2, …… WHERE 條件;
		foreach($arr as $key => $value){
			$toV[] = "`$key`='$value'";
		}
		$value = $this->comb(",",$toV);
		$req = ($req != '')?'where ' . $req:'';
		$sql = "update $table set $value $req;";
		return $sql;
	}
	//語法組合 end
	//sql執行
	public function Query($sql) {
		$link = $this->Link();
		$link->query($sql);
		$link = null;
	}

	public function Fetch($sql) {
		$link = $this->Link();
		$this->count = 0;
		$query = $link->query($sql);
		$this->count = count($query);
		$query = $query->fetchAll();
		$link = null;
		return $this->ValDecode(query);
	}

	public function Assoc($sql,$field = false, $req = false, $or_by = false, $limit = false) {
		if($field){
			$toArr = false;
			if($or_by)
				$toArr['order_by'] = $or_by;
			if($limit)
				$toArr['limit'] = $limit;
			$sql = $this->Select($sql,$field, $req, $toArr);
		}
		// echo $sql;
		$link = $this->Link();
		$re = $link->query($sql);
		//print_r($re);
		$re->setFetchMode(PDO::FETCH_ASSOC);
		$re = $re->fetchAll();
		$this->count = count($re);
		$link = null;
		return $this->ValDecode($re);
	}
	//sql執行

	public function ValAddTip($arr,$tip="'"){
		foreach($arr as $key =>$value){
			$arr[$key] = "$tip$value$tip";
		}
		return $arr;
	}
	protected function comb($sub2,$arr) {
		$re = false;
		if (is_array($arr)) {
			$re = implode($sub2,array_values($arr));
		} else {
			$re = $arr;
		}
		return $re;
	}

	protected function combTip($arr) {
		foreach($arr as $key => $value){
			$arr[$key] = '('.implode(',',$this->ValAddTip($value)).')';
		}
		return implode(',',$arr);
	}

	public function ValEncode($value) {
		if (is_array($value)) {
			foreach ($value as $key2 => $value2)
				$value[$key2] = $this->ValEncode($value2);
		} else {
			$value = str_replace(array("&", "'", '"', "<", ">"), array('@&5', '@&1', '@&2', '@&3', '@&4'), $value);
		}
		return $value;
	}
	public function ValDecode($arr){
		if(is_array($arr)){
			foreach($arr as $key2 => $value2)
				$arr[$key2] = $this->ValDecode($value2);
		}else{
			//$arr = stripslashes($arr);
			$arr = str_replace( array('@&4', '@&3', '@&2', '@&1', '@&5'),array(">", "<", '"', "'", "&"), stripslashes($arr));
		}
		return $arr;
	}

	public function Json2Array( $jsonObj ) {
		$result = array();
		foreach ( $jsonObj as $key => $val ) {
			if ( is_object( $val ) || is_array( $val ) ) {
				$result[$key] = $this->Json2Array( $val );
			}else {
				$result[$key] = $val;
			}
		}
		return $result;
	}

	public function EmailCk ($email, $checkDNS = false) {
	/*
	Copyright 2009 Dominic Sayers
	(dominic_sayers@hotmail.com)
	(http://www.dominicsayers.com)

	This source file is subject to the Common Public Attribution License Version 1.0 (CPAL) license.
	The license terms are available through the world-wide-web at http://www.opensource.org/licenses/cpal_1.0
	 */
		$index = strrpos($email,'@');

		if ($index === false)       return false;   //  No at-sign
		if ($index === 0)           return false;   //  No local part
		if ($index > 64)            return false;   //  Local part too long

		$localPart      = substr($email, 0, $index);
		$domain         = substr($email, $index + 1);
		$domainLength   = strlen($domain);

		if ($domainLength === 0)    return false;   //  No domain part
		if ($domainLength > 255)    return false;   //  Domain part too long

		//  Let's check the local part for RFC compliance...
		//
		//  Period (".") may...appear, but may not be used to start or end the
		//  local part, nor may two or more consecutive periods appear.
		//      (http://tools.ietf.org/html/rfc3696#section-3)
		if (preg_match('/^\\.|\\.\\.|\\.$/', $localPart) > 0)               return false;   //  Dots in wrong place

		//  Any ASCII graphic (printing) character other than the
		//  at-sign ("@"), backslash, double quote, comma, or square brackets may
		//  appear without quoting.  If any of that list of excluded characters
		//  are to appear, they must be quoted
		//      (http://tools.ietf.org/html/rfc3696#section-3)
		if (preg_match('/^"(?:.)*"$/', $localPart) > 0) {
			//  Local part is a quoted string
			if (preg_match('/(?:.)+[^\\\\]"(?:.)+/', $localPart) > 0)   return false;   //  Unescaped quote character inside quoted string
		} else {
			if (preg_match('/[ @\\[\\]\\\\",]/', $localPart) > 0)
				//  Check all excluded characters are escaped
				$localPart = preg_replace('/\\\\[ @\\[\\]\\\\",]/', '', $localPart);
			if (preg_match('/[ @\\[\\]\\\\",]/', $localPart) > 0)        return false;   //  Unquoted excluded characters
		}

		//  Now let's check the domain part...

		//  The domain name can also be replaced by an IP address in square brackets
		//      (http://tools.ietf.org/html/rfc3696#section-3)
		//      (http://tools.ietf.org/html/rfc5321#section-4.1.3)
		//      (http://tools.ietf.org/html/rfc4291#section-2.2)
		if (preg_match('/^\\[(.)+]$/', $domain) === 1) {
			//  It's an address-literal
			$addressLiteral = substr($domain, 1, $domainLength - 2);
			$matchesIP      = array();

			//  Extract IPv4 part from the end of the address-literal (if there is one)
			if (preg_match('/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/', $addressLiteral, $matchesIP) > 0) {
				$index = strrpos($addressLiteral, $matchesIP[0]);

				if ($index === 0) {
					//  Nothing there except a valid IPv4 address, so...
					return true;
				} else {
					//  Assume it's an attempt at a mixed address (IPv6 + IPv4)
					if ($addressLiteral[$index - 1] !== ':')            return false;   //  Character preceding IPv4 address must be ':'
					if (substr($addressLiteral, 0, 5) !== 'IPv6:')      return false;   //  RFC5321 section 4.1.3

					$IPv6 = substr($addressLiteral, 5, ($index ===7) ? 2 : $index - 6);
					$groupMax = 6;
				}
			} else {
				//  It must be an attempt at pure IPv6
				if (substr($addressLiteral, 0, 5) !== 'IPv6:')          return false;   //  RFC5321 section 4.1.3
				$IPv6 = substr($addressLiteral, 5);
				$groupMax = 8;
			}

			$groupCount = preg_match_all('/^[0-9a-fA-F]{0,4}|\\:[0-9a-fA-F]{0,4}|(.)/', $IPv6, $matchesIP);
			$index      = strpos($IPv6,'::');

			if ($index === false) {
				//  We need exactly the right number of groups
				if ($groupCount !== $groupMax)                          return false;   //  RFC5321 section 4.1.3
			} else {
				if ($index !== strrpos($IPv6,'::'))                     return false;   //  More than one '::'
				$groupMax = ($index === 0 || $index === (strlen($IPv6) - 2)) ? $groupMax : $groupMax - 1;
				if ($groupCount > $groupMax)                            return false;   //  Too many IPv6 groups in address
			}

			//  Check for unmatched characters
			array_multisort($matchesIP[1], SORT_DESC);
			if ($matchesIP[1][0] !== '')                                    return false;   //  Illegal characters in address

			//  It's a valid IPv6 address, so...
			return true;
		} else {
			//  It's a domain name...

			//  The syntax of a legal Internet host name was specified in RFC-952
			//  One aspect of host name syntax is hereby changed: the
			//  restriction on the first character is relaxed to allow either a
			//  letter or a digit.
			//      (http://tools.ietf.org/html/rfc1123#section-2.1)
			//
			//  NB RFC 1123 updates RFC 1035, but this is not currently apparent from reading RFC 1035.
			//
			//  Most common applications, including email and the Web, will generally not permit...escaped strings
			//      (http://tools.ietf.org/html/rfc3696#section-2)
			//
			//  Characters outside the set of alphabetic characters, digits, and hyphen MUST NOT appear in domain name
			//  labels for SMTP clients or servers
			//      (http://tools.ietf.org/html/rfc5321#section-4.1.2)
			//
			//  RFC5321 precludes the use of a trailing dot in a domain name for SMTP purposes
			//      (http://tools.ietf.org/html/rfc5321#section-4.1.2)
			$matches    = array();
			$groupCount = preg_match_all('/(?:[0-9a-zA-Z][0-9a-zA-Z-]{0,61}[0-9a-zA-Z]|[a-zA-Z])(?:\\.|$)|(.)/', $domain, $matches);
			$level      = count($matches[0]);

			if ($level == 1)                                            return false;   //  Mail host can't be a TLD

			$TLD = $matches[0][$level - 1];
			if (substr($TLD, strlen($TLD) - 1, 1) === '.')              return false;   //  TLD can't end in a dot
			if (preg_match('/^[0-9]+$/', $TLD) > 0)                     return false;   //  TLD can't be all-numeric

			//  Check for unmatched characters
			array_multisort($matches[1], SORT_DESC);
			if ($matches[1][0] !== '')                          return false;   //  Illegal characters in domain, or label longer than 63 characters

			//  Check DNS?
			if ($checkDNS && function_exists('checkdnsrr')) {
				if (!(checkdnsrr($domain, 'A') || checkdnsrr($domain, 'MX'))) {
					return false;   //  Domain doesn't actually exist
				}
			}

			//  Eliminate all other factors, and the one which remains must be the truth.
			//      (Sherlock Holmes, The Sign of Four)
			return true;
		}
	}
}