<?php

/**
 * SysInfo Admin System Model
 * 
 * 
 */
class SysInfo_Admin_Model extends MY_Model {

     const TABLE_MEMBER = 'm_member';
     const TABLE_LOG = 'server_info';

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
     * Search log
     * 
     * @param type $aryCondition
     * @param type $aryResult
     * @param type $pageKey
     * @param type $recordPerPage
     * @return type
     * @throws ADODB_Exception
     */
    public function search_log($aryCondition, &$aryResult, $pageKey, $recordPerPage) {
        $intIsOk = self::CI_IS_OK;
        try {
            //sql
            $sql = "SELECT *
                    FROM " . self::TABLE_LOG . " WHERE 1=1 ";
            // By condtion
//            if ($aryCondition['server_id']) {
//                $sql .=" AND server_id = '%{$aryCondition['server_id']}%'";
//            }

            if (trim($aryCondition['log_date_from']) != '' && trim($aryCondition['log_date_to']) != '') {
                $strFromDate = str_replace('/', '-', trim($aryCondition['log_date_from']));
                $str = $aryCondition['log_date_to'];
                $aryCondition['log_date_to'] = $this->add_date($str, 1);
                $strToDate = str_replace('/', '-', trim($aryCondition['log_date_to']));
                $sql .=" AND last_reported_at BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            } else if (trim($aryCondition['log_date_from']) != '' && trim($aryCondition['log_date_to']) == '') {
                $strFromDate = str_replace('/', '-', trim($aryCondition['log_date_from']));
                $strToDate = '2090-12-12';
                $sql .=" AND last_reported_at BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            } else if (trim($aryCondition['log_date_from']) == '' && trim($aryCondition['log_date_to']) != '') {
                $strFromDate = '0000-00-00';
                $str = $aryCondition['log_date_to'];
                $aryCondition['log_date_to'] = $this->add_date($str, 1);
                $strToDate = str_replace('/', '-', trim($aryCondition['log_date_to']));
                $sql .=" AND last_reported_at BETWEEN '{$strFromDate}' AND '{$strToDate}' ";
            }


            $sql .= " ORDER BY id DESC";
            $intIsOk = $this->searchResult($sql, $aryResult, $pageKey, $recordPerPage);
        } catch (ADODB_Exception $e) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            throw $e;
        }
        //if OK
        return $intIsOk;
    }
}
