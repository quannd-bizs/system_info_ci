<?php
class DataServer extends MY_Model{

const TABLE_SERVER = 'server';
const TABLE_SERVER_INFO = 'server_info';

	/**
     *
     * @param <type> $aryData
     * @return <type> 
     */
    public function SaveServerId($aryData) {
        $intIsOk = self::CI_IS_OK;
        try {
            if (is_array($aryData)) {
                $aryData['update_date'] = date("Y-m-d H:i:s");
                $intIsOk = $this->insert((string)self::TABLE_SERVER, $aryData);
            } else {
                $intIsOk = self::CI_ERR_EX_OTHER;
            }
        } catch (Exception $ex) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $ex;
        }
        //if OK
        return $intIsOk;
    }

   public function SaveServerInfo($aryData) {
        $intIsOk = self::CI_IS_OK;
        try {
            if (is_array($aryData)) {
                $intIsOk = $this->insert((string)self::TABLE_SERVER_INFO, $aryData);
            } else {
                $intIsOk = self::CI_ERR_EX_OTHER;
            }
        } catch (Exception $ex) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $ex;
        }
        //if OK
        return $intIsOk;
    }

     /**
     * 
     * Select ID
     */
     public function SelectServerId($serverId, &$result) {
        $intIsOk = self::CI_IS_OK;
        try {
            $intIsOk = $this->select((string)self::TABLE_SERVER, $serverId, $result);
        } catch (ADODB_Exception $e) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $e;
        }
        //if OK
        return $intIsOk;
    }

    /**
     * Update
     * @param <array> $data
     */
  /*  public function Update($serverId, $data) {
        $intIsOk = 1;
        try {
            if (isset($serverId)) {
                $data['update_date'] = date("Y-m-d H:i:s");
                $condition = array('server_id' => $serverId);
                $intIsOk = $this->update(self::TABLE_SERVER, $data, $condition);
                //echo $intIsOk;
            }
        } catch (ADODB_Exception $ex) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $ex;
        }
        return $intIsOk;
    }*/

 /**
     * get Login infomation
     *
     * @author : Huynv
     * @since 2013/08/23
     * get information of logging system
     */
    public function getLogginUserActionInfo($aryCondition, &$result) {
        $intIsOk = self::CI_IS_OK;
        try {
            $sql = //"select * from
                    //(
                    //select A.*,B.user_name from
                    //(select * from t_log_user_action where stage_del_flag=0) as A left join (select user_name,user_id as user_idb from t_user) as B on A.user_id=B.user_idb
                    //) as C where 1=1";
                    $sql = "SELECT
                                 B.user_name AS user_name,
                                 A.log_user_id AS log_user_id,
                                 A.user_id AS user_id,
                                 A.action AS action,
                                 A.action_id AS action_id,
                                 C.event_name AS event_name,
                                 C.group_name AS group_name,
                                 A.coin AS coin,
                                 A.stone AS stone,
                                 A.stone_present AS stone_present,
                                 A.point AS point,
                                 A.item_hp AS item_hp,
                                 A.item_staminar AS item_staminar,
                                 A.item_count AS item_count,
                                 A.money AS money,
                                 A.mobamon AS mobamon,
                                 A.ranking AS ranking,
                                 A.date_time AS date_time
                            FROM t_log_user_action AS A
                            LEFT JOIN t_user AS B ON A.user_id = B.user_id
                            LEFT JOIN m_log_event_category AS C ON A.action_id = C.action_id
                            WHERE A.stage_del_flag = 0";
            if (trim($aryCondition['log_date_from']) != '' && trim($aryCondition['log_date_to']) != '') {
                $strFromDate = str_replace('/', '-', trim($aryCondition['log_date_from']));
                $str = $aryCondition['log_date_to'];
                $aryCondition['log_date_to'] = $this->add_date($str, 1);
                $strToDate = str_replace('/', '-', trim($aryCondition['log_date_to']));
                $sql .=" and A.date_time BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            } else if (trim($aryCondition['log_date_from']) != '' && trim($aryCondition['log_date_to']) == '') {
                $strFromDate = str_replace('/', '-', trim($aryCondition['log_date_from']));
                $strToDate = '2090-12-12';
                $sql .=" AND A.date_time BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            } else if (trim($aryCondition['log_date_from']) == '' && trim($aryCondition['log_date_to']) != '') {
                $strFromDate = '0000-00-00';
                $str = $aryCondition['log_date_to'];
                $aryCondition['log_date_to'] = $this->add_date($str, 1);
                $strToDate = str_replace('/', '-', trim($aryCondition['log_date_to']));
                $sql .=" AND A.date_time BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            }
            if (trim($aryCondition['action_id']) != '0') {
                $sql .=" and A.action_id=" . $aryCondition['action_id'];
            }
            //by Condition
            if ($aryCondition['user_name']) {
                //if (strcmp($aryCondition['name_group_time'],"n")==0) $aryCondition['name_group_time']="";
                $sql .=" and user_name LIKE  '%{$aryCondition['user_name']}%'";
            }
            $sql .=" order by user_id,action_id,log_user_id desc";
            $intIsOk = $this->getRecord($sql, $result);
        } catch (ADODB_Exception $e) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $e;
        }
        //if OK
        return $intIsOk;
    }

}