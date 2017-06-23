<?php

/**
 * SysInfo Admin System Model
 * 
 * 
 */
class SysInfoAdminModel extends MY_Model {

    const TABLE_MEMBER = 'm_member';
    const TABLE_LOG = 'server_info';
    const TABLE_SERVER = 'server';

    function __construct() {
        // Call the constructor
        parent::__construct();
        $this->load->dbutil();
    }

    /**
     * get Login infomation
     *
     * @param type $loginData
     * @param array $result
     * @return type
     */
    public function selectLoginInfo($loginData, &$result) {
        $intIsOk = self::CI_IS_OK;
        try {
            $sql = "SELECT  M.member_id,
                        M.member_username,
                        M.member_fullname,
                        M.member_username
                       
                FROM " . self::TABLE_MEMBER . " AS M
                WHERE M.member_username = '" . trim($loginData['member_username']) . "'
                AND M.member_password = '" . md5(md5(trim($loginData['member_password']))) . "'
                AND (M.member_del_flag = 0 OR M.member_del_flag is NULL)";
            $intIsOk = $this->getRecord($sql, $result);
        } catch (ADODB_Exception $e) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $e;
        }
        //if OK
        return $intIsOk;
    }

    /**
     * 
     * @param type $id
     * @param type $result
     * @return type
     * @throws ADODB_Exception
     */
    public function get_log_info($id, &$result) {
        $intIsOk = self::CI_IS_OK;
        try {
            if ($id) {
                $sql = "SELECT * FROM m_log
                        WHERE id = {$id}";
                $intIsOk = $this->getRecord($sql, $result);
            } else {
                $intIsOk = self::CI_ERR_EX_OTHER;
            }
        } catch (ADODB_Exception $e) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $e;
        }
        //if OK
        return $intIsOk;
    }

    /**
     * Get Server List
     */
    public function selectServerInfo(&$aryResult) {
        try {
            // $this->select(self::TABLE_SERVER, null, $aryResult);
              $sql = "SELECT 
                        `select`,
                        server_id,
                        name 
                    FROM " . self::TABLE_SERVER . " GROUP BY server_id";
            
            $intIsOk = $this->getRecord($sql, $aryResult);
        } catch (ADODB_Exception $e) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $e;
        }
    }

    /**
     * Search log
     * 
     * @param type $aryCondition
     * @param type $aryResult
     * @param type $pageKey
     * @param type $recordPerPage
     * @return type
     * @throws ADODB_Exception
     */
 public function listInterval($aryCondition, &$aryResult, $pageKey, $recordPerPage) {
        $intIsOk = self::CI_IS_OK;
        try {
            //sql
            $sql = "SELECT 
                           id                   ,
                           cpu                  ,
                           cpu_stolen           ,
                           disk_io              ,
                           memory               ,
                           memory_used          ,
                           memory_total         ,
                           fullest_disk         ,
                           fullest_disk_free    ,
                           health_status        ,
                           DATE_FORMAT(last_reported_at, '%Y/%m/%d') as `date`,
                           DATE_FORMAT(last_reported_at, '%H:%i:%s') as `time`, 
                           DATE_FORMAT(last_reported_at, '%H') as `hour` ";        
            $interval = $aryCondition['interval'];

            $sql .= " FROM server_" . $aryCondition['server_id'];
            $sql .= " WHERE ";
            $groupByHour = false;
            if($interval != 1){
                 if($interval > 60){
                    $groupByHour = true;
                    $interval /= 60;
                    $sql .= "  DATE_FORMAT(last_reported_at, '%H') % " . $interval . ' = 0 AND '; 
                }else{
                    $sql .= "  DATE_FORMAT(last_reported_at, '%i') % " . $interval . ' = 0 AND ';
                }
            }
            $strFromDate = $aryCondition['log_date_from'];
            $strToDate = $aryCondition['log_date_to'];

            if (trim($aryCondition['log_date_from']) != '' && trim($aryCondition['log_date_to']) != '') {
                $strToDate = $this->add_date($strToDate, 1);
                $sql .= "  last_reported_at BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            } else if (trim($aryCondition['log_date_from']) != '' && trim($aryCondition['log_date_to']) == '') {
                $strToDate = $this->add_date($strFromDate, 1);
                $sql .= "  last_reported_at BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            } else if (trim($aryCondition['log_date_from']) == '' && trim($aryCondition['log_date_to']) != '') {
                $strFromDate = $this->add_date($strToDate, -1);
                $strToDate = $this->add_date($strToDate, 1);
                $sql .= "  last_reported_at BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            } else {
                $strFromDate = $this->add_date(date('Y/m/d'), $groupByHour?-7:-1);
                $sql .= "  last_reported_at >= '{$strFromDate}' ";
            }

            if($groupByHour){
                $sql .= " GROUP BY `hour`";
            }else{
                $sql .= " GROUP BY `time`";
            }

            $sql .= " ORDER BY id DESC";
            log_message('debug', $sql);
            $intIsOk = $this->searchResult($sql, $aryResult, $pageKey, $recordPerPage);
        } catch (ADODB_Exception $e) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $e;
        }
        //if OK
        return $intIsOk;
    }

    /* public function add_date($givendate, $day = 0, $mth = 0, $yr = 0) {
      $cd = strtotime($givendate);
      $newdate = date('Y-m-d h:i:s', mktime(date('h', $cd), date('i', $cd), date('s', $cd), date('m', $cd) + $mth, date('d', $cd) + $day, date('Y', $cd) + $yr));
      return $newdate;
      } */

    public function add_date($orgDate, $day, $mth = 0, $yr = 0) {
        $cd = strtotime($orgDate);
        $retDAY = date('Y/m/d', mktime(0, 0, 0, date('m', $cd), date('d', $cd) + $day, date('Y', $cd)));
        return $retDAY;
    }

    public function add_date_full($orgDate, $year, $mth, $day, $hour, $minute, $second) {
        $cd = strtotime($orgDate);
        $retDAY = date('Y/m/d H:i:s', mktime(date('H', $cd) + $hour, date('i', $cd) + $minute, date('s', $cd) + $second, date('m', $cd) + $mth, date('d', $cd) + $day, date('Y', $cd) + $year));
        return $retDAY;
    }

}
