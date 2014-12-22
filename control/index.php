<?php
class index {
	private $db;
	function __construct() {
		include 'model/index.php';
		$this->db = new ModelIndex;
	}
	public function GetFlow($arr=false){
		if($arr['post']){
			$arr = $arr['post'];
			$where = array();
			$where['group'] = $arr['group'];
			if($arr['s_date'] != 'All')
				$where[] = "in_date >= '".$arr['s_date']."'";
			if($arr['e_date'] != 'All')
				$where[] = "in_date <= '".$arr['e_date']."'";
			echo json_encode($this->db->GetFlow($where));
		}
	}
	public function GroupOut($arr=false){
		if($arr['post']['group']){
			$group = explode(',',$arr['post']['group']);
		}else{
			$group = ($_SESSION['group']!='')?explode(',',$_SESSION['group']):array();
			$group[] = $_SESSION['token'];
		}
		$arr = array();
		foreach($this->db->GroupOut($group) as $value){
			$arr[] = array('name'=>$value['name'], 'token'=>$value['token']);
		}
		echo json_encode($arr);
	}

	public function GetNewsCount(){
			$re = array(
				'NewsList'=>$this->db->GetNewsCount(array('R'=>array('audit'=>1),'F'=>array('seq','title','audit_date'))),
				'NewsPostList'=>$this->db->GetNewsCount(array('R'=>array('audit'=>4),'F'=>array('seq','title','audit_date'))),
				'NewsNopassLise'=>$this->db->GetNewsCount(array('R'=>array('audit'=>2),'F'=>array('seq','title','audit_date'))),
				'NewsNoseeLise'=>$this->db->GetNewsCount(array('R'=>array('audit'=>0),'F'=>array('seq','title','audit_date'))),
				'NewsDraftList'=>$this->db->GetNewsCount(array('R'=>array('audit'=>3),'F'=>array('seq','title','audit_date')))
			);
			foreach($re as $RK => $RV){
				$toR[$RK]['count']=count($RV);
				$toR[$RK]['arr'] = array();
				for($i = 1; $i <= 5; $i++){
					$toId = count($RV) - $i;
					if($toId > -1){
						$toR[$RK]['arr'][] = array('seq'=>$re[$RK][$toId]['seq'],'title'=>$re[$RK][$toId]['title'],'audit_date'=>$re[$RK][$toId]['audit_date']);
					}
				}
			}
			echo json_encode($toR);
	}
}