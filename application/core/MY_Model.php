<?php

/**
 * Logic layer inherit from CI Model
 *
 * inclulde functions for dev
 *
 */
class MY_Model extends CI_Model {

    /**
     * resulf of method when perform is successful
     *
     */
    const CI_IS_OK = 1;

    const LOG_FOLDER = "LogSql";
    /**
     * resulf of method when perform fail relate to DB Exception
     *
     */
    const CI_ERR_DB_EXCEPTION = -1;

    /**
     * resulf of method when perform fail relate to Exception other DB Exception
     *
     */
    const CI_ERR_EX_OTHER = -2;

    /**
     * resulf of "validate" method
     *
     */
    const CI_ERR_VALIDATION = -2;

    private $_resource;
    private $LastInsertedID;

    /**
     * Class constructor
     */
    function __construct() {
        parent::__construct();

        $this->db_master = $this->load->database('default', TRUE);

        if (!empty($this->models)) {
            foreach ($this->models as $model) {
                $this->load->model($model);
            }
        }
    }

    /**
     * Parse conditions
     *
     * @param <type> $condition
     * @return string
     */
    protected function paserCondition($condition) {
        if (count($condition) > 0) {
            $flag = false;
            $result = array();
            $result['string'] = '';
            if (is_array($condition))
                foreach ($condition as $v) {
                    switch (count($v)) {
                        case 4:
                            if ($v[3] !== null && $v[3] !== '') {
                                if (stripos(strtolower($v[2]), 'in') !== false) {
                                    $result['string'] .= $v[0] . '  ' . $v[1] . ' ' . $v[2] . ' ' . $v[3];
                                } else {
                                    $result['string'] .= $v[0] . '  ' . $v[1] . ' ' . $v[2] . ' ?  ';
                                    $result['value'][] = $v[3];
                                }
                                $flag = true;
                            }
                            break;
                        case 2:
                            if ($v[1] !== null && $v[1] !== '') {
                                $result['string'] .= ' ' . $v[0] . ' ' . $v[1];
                                $flag = true;
                            }

                            break;
                    }
                }
            if ($flag)
                $result['string'] = ' WHERE ' . $result['string'];
            return $result;
        }else {
            return array(
                'string' => '',
                'value' => array()
            );
        }
    }

    /**
     *
     * @param <type> $sql
     * @param <type> $condition
     * @param <type> $result
     * @param <type> $pageKey
     * @param <type> $recordPerPage
     * @return <type>
     */
    public function repeater($sql, $condition, &$result, $pageKey, $recordPerPage = 20) {

        $tmpResult = array();
        $totalRecord = 0;

        $pageIndex = $pageKey;
        $pageIndex = (is_numeric($pageIndex) && $pageIndex > 0) ? $pageIndex : 1;
        $offset = ($pageIndex - 1) * $recordPerPage;

        $condition[] = array(' LIMIT', "$offset,$recordPerPage");
        $flag = $this->select($sql, $condition, $tmpResult);

        if ($flag == self::CI_IS_OK) {
            $flag = $this->totalRecord($sql, $totalRecord);
            $result['totalPage'] = ceil($totalRecord / $recordPerPage);
            $result['totalRecord'] = $totalRecord;
            $result['recordFirst'] = $offset + 1;
            $result['recordLast'] = ($offset + $recordPerPage > $totalRecord) ? $totalRecord : $offset + $recordPerPage;
            $result['data'] = $tmpResult;
            $result['pageIndex'] = $pageIndex;
        }
        return $flag;
    }

    /**
     *
     * @param <type> $sql
     * @param <type> $tmpResult
     * @return <type> 
     */
    public function getRecord($sql, &$tmpResult) {

        $intIsOk = self::CI_IS_OK;

        try {
          
               $sql = 'SELECT ' . mb_substr(trim($sql), 6, mb_strlen(trim($sql), "UTF-8"), "UTF-8");

            // use slave database
                // $this->_resource = $this->db_slave->query($sql);
            // use master database
                $this->_resource = $this->db_master->query($sql);
                if ($this->_resource) {
                    $result = $this->_resource->result_array();
                }else{
                    $this->writeLogSql($result, $sql);
                }
                if ($result) {
                    $tmpResult = $this->_resource->result_array();
                }
                //$this->writeLogSqlTime("END : " . date('Y-m-d H:i:s') ." <-");
            } catch (Exception $ex) {
                //show_error('DB Exception!');
                $intIsOk = self::CI_ERR_DB_EXCEPTION;
            }

        return $intIsOk;
    }

    /**
     * Search DAO
     * 
     */
    public function searchResult($sql, &$result, $pageKey = "pageNo", $recordPerPage = 20, $orderField = null, $orderType = null, $type = 0, $id = null) {
        $tmpResult = array();
        $totalRecord = 0;
        
        // $totalRecord = $this->db_slave->query($sql)->num_rows();
         $totalRecord = $this->db_master->query($sql)->num_rows();
        $pageIndex = $pageKey;
        $pageIndex = (is_numeric($pageIndex) && $pageIndex > 0) ? $pageIndex : 1;
        $offset = ($pageIndex - 1) * $recordPerPage;

        //order if exits
        if ($orderField && $orderType) {
            $order = " ORDER BY $orderField $orderType ";
        } else {
            $order = "";
        }

        $sql .=" $order LIMIT " . $offset . "," . $recordPerPage;

        $flag = $this->getRecord($sql, $tmpResult, $type, $id);

        if ($flag == 1) {
            $result['totalPage'] = ceil($totalRecord / $recordPerPage);
            $result['totalRecord'] = $totalRecord;
            $result['recordFirst'] = $offset + 1;
            $result['recordLast'] = ($offset + $recordPerPage > $totalRecord) ? $totalRecord : $offset + $recordPerPage;
            $result['pageIndex'] = $pageIndex;
            $result['data'] = $tmpResult;
        }
        return $flag;
    }

    /**
     *
     * @param string $sql
     * @return <type> 
     */
    public function querySql($sql) {

        $intIsOk = self::CI_IS_OK;
        try {
  
			// use master database
			$result = $this->_resource = $this->db_master->query($sql);
			// use slave database
			// $result = $this->_resource = $this->db_slave->query($sql);
			
            $this->writeLogSql($result, $sql);
//            if ($result != false) {
//                $tmpResult = $this->_resource->result_array();
//            }
        } catch (Exception $ex) {
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
        }

        return $intIsOk;
    }

    /**
      // Produces: INSERT INTO mytable (title, content, date) VALUES ('My Title', 'My Content', 'My Date')
     *
     * @param <type> $aryData
     */
    public function insert($tableName, $aryData) {
        $intIsOk = self::CI_IS_OK;
       
        try {
            $this->db_master->trans_begin();

            $test = $this->db_master->insert($tableName, $aryData);
            $this->writeLogSql($test, "Insert " . $tableName);
            if ($this->db_master->trans_status() === FALSE) {
                $this->db_master->trans_rollback();
            } else {
                $this->LastInsertedID = $this->db_master->insert_id();
                $this->db_master->trans_commit();
                       
            }
        } catch (Exception $ex) {
            //show_error('DB Exception!');
            //echo $intIsOk;
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
            
        }
      
        return $intIsOk;
    }

    /**
     * Insert multil record to table
     *
     * $data = array(
      array(
      'title' => 'My title' ,
      'name' => 'My Name' ,
      'date' => 'My date'
      ),
      array(
      'title' => 'Another title' ,
      'name' => 'Another Name' ,
      'date' => 'Another date'
      )
      );

      $this->db->insert_batch('mytable', $data);

      // Produces: INSERT INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date'), ('Another title', 'Another name', 'Another date')
     *
     */
    public function insert_multi_record($table, $aryData) {
        $intIsOk = self::CI_IS_OK;
        try {
            $result = $this->db_master->insert_batch($table, $aryData);
            $this->writeLogSql($result, "Insert " . $table);
        } catch (Exception $ex) {
            //show_error('DB Exception!');
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
        }

        return $intIsOk;
    }

    /**
     * Update table record by by condtion
     *
     * $data = array(
      'title' => $title,
      'name' => $name,
      'date' => $date
      );

      $this->db->where('id', $id); OR array('id' => $id)
     *
      $this->db->update('mytable', $data);

      // Produces:
      // UPDATE mytable
      // SET title = '{$title}', name = '{$name}', date = '{$date}'
      // WHERE id = $id
     *
     * @param <type> $table
     * @param <type> $aryData
     */
    public function update($table, $aryData, $aryCondition) {
        $intIsOk = self::CI_IS_OK;
        try {
            $result = $this->db_master->update($table, $aryData, $aryCondition);
            $this->writeLogSql($result, "Update " . $table);
        } catch (Exception $ex) {
            //show_error('DB Exception!');
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
        }
        return $intIsOk;
    }

    /**
     * Delele record on table by condtion OR array Condition
     *
     * @param <type> $table
     * @param <type> $aryCondition 
     */
    public function delete($table, $aryCondition) {
        $intIsOk = self::CI_IS_OK;
        try {
            $result = $this->db_master->delete($table, $aryCondition);
            $this->writeLogSql($result, "Delete " . $table);
            // Produces:
            // DELETE FROM mytable
            // WHERE id = $id
        } catch (Exception $ex) {
            //show_error('DB Exception!');
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
        }
        return $intIsOk;
    }

    /**
     * Delete one record id on multil tables
     *
     * 
     *
     */
    public function deleteRecordOnMultilTable($aryTable, $aryCondtion) {
        $intIsOk = self::CI_IS_OK;
        try {
            $this->db_master->where($aryCondtion);
            $this->db_master->delete($aryTable);
        } catch (Exception $ex) {
            //show_error('DB Exception!');
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
        }
        return $intIsOk;
    }

    /**
     * Simple select
     * 
     */
 /* 
	public function simpleSelect($sql) {
        // use master database
		// $query = $this->db_master->query($sql);
		// use slave database
		$query = $this->db_slave->query($sql);
        $this->writeLogSql($query, $sql);
        return $query->result_array();
    } */

    /**
     *
     * @param type $table
     * @param type $condition
     * @param type $tmpResult
     * @return type 
     */
    public function select($table, $condition, &$tmpResult) {
        $intIsOk = self::CI_IS_OK;
        try {
		// use master database
		 $query = $this->db_master->get_where($table, $condition);
		// use slave database
            // $query = $this->db_slave->get_where($table, $condition);
            $tmpResult = $query->result_array();
            $this->writeLogSql($query, $table);
        } catch (Exception $ex) {
            //show_error('DB Exception!');
            $intIsOk = self::CI_ERR_DB_EXCEPTION;
        }
        return $intIsOk;
    }

    /**
     * Auto generate CSV data
     *
     *
     */
    public function generateCSVData($sql) {
        $this->load->dbutil();
        // $query = $this->db_slave->query($sql);
		  $query = $this->db_master->query($sql);
		
        return $this->dbutil->csv_from_result($query);
    }

    /**
     * Output XML data by sql
     *
     * $aryConfig = array (
      'root'    => 'root',
      'element' => 'element',
      'newline' => "\n",
      'tab'    => "\t"
      );
     *
     * @param <type> $sql
     */
    public function generateXML($sql, $aryConfig) {
        $this->load->dbutil();
        // $query = $this->db_slave->query($sql);
		$query = $this->db_master->query($sql);
        return $this->dbutil->xml_from_result($query, $aryConfig);
    }

    /**
     *
     * @param <type> $total
     * @return <type>
     */
    public function totalRecord(&$totalRecord) {
        
    }

    /**
     * Select lastInserted id
     *
     * @return <type>
     */
    public function selectLastInsertedID() {
        return $this->LastInsertedID;
    }

    /**
     *
     * @param <type> $table
     * @param <type> $listFile
     * @param <type> $aryBeanMerge
     * @return <type> 
     */
    public function insertFileAttachmentList($table, $listFiles, $aryBeanMerge) {
        $intIsOk = 1;
        $n = count($listFiles);
        for ($i = 0; $i < $n; $i++) {
            $row = array();
            $row = array_merge($listFiles[$i], $aryBeanMerge);
            $intIsOk = $this->insert($table, $row);
        }
        return $intIsOk;
    }

    /**
     *
     * @return <type> 
     */
    public function getNextRevision() {
        $old = strtotime('20-9-2012');
        $nowDt = strtotime(date('Y-m-d H:i:s'));
        return ($nowDt - $old);
    }

    function add_date($orgDate, $year, $mth, $day) {
        $cd = strtotime($orgDate);
        $retDAY = date('Y-m-d', mktime(0, 0, 0, date('m', $cd) + $mth, date('d', $cd) + $day, date('Y', $cd) + $year));
        return $retDAY;
    }

    /**
     * Mieng ADD for Write Log
     * @param <type> $flag
     * @param <type> $sql
     */
    private function writeLogSql($flag, $sql) {
        if ($flag == false) {
         // $errMess = $this->db->_error_message();
			$errMess = $this->db_master->_error_message();
            $this->writeLogLog($errMess, $sql);
        }
    }

    /**
     *
     * @param <type> $message
     * @param <type> $sql
     */
    private function writeLogLog($message, $sql) {
        $folder = FCPATH . self::LOG_FOLDER . "/" ;
        if (@is_dir(FCPATH . self::LOG_FOLDER . "/") == false) {
            @mkdir(FCPATH . self::LOG_FOLDER . "/", 0777);
        }
        $pathFile = $folder . "sqlError_" . date('Y_m_d') . ".log";
        $ourFileHandle = @fopen($pathFile, 'a+');
        @fwrite($ourFileHandle, date("Y-m-d H:i:s") . " : " . $sql . "\n");
        @fwrite($ourFileHandle, $message . "\n");
        @fwrite($ourFileHandle, "**************************************************************************" . "\n");
        @fclose($ourFileHandle);
    }

    private function writeLogSqlTime($Title, $sql = "") {
        $folder = FCPATH . self::LOG_FOLDER . "/" ;
        if (@is_dir(FCPATH . self::LOG_FOLDER . "/") == false) {
            @mkdir(FCPATH . self::LOG_FOLDER . "/", "0777");
        }
        $pathFile = $folder . "sqlList_" . date('Y_m_d') . ".txt";
        $ourFileHandle = @fopen($pathFile, 'a+');
        @fwrite($ourFileHandle, date("Y-m-d H:i:s") . " : " . $Title . "\n");
        if($sql == ""){

        }else{
            @fwrite($ourFileHandle, date("Y-m-d H:i:s") . " : " . $sql . "\n");
        }
        @fclose($ourFileHandle);
    }
    public function checkSlaveState(){
        $sql = "SELECT * FROM  INFORMATION_SCHEMA.SESSION_STATUS WHERE VARIABLE_NAME =  'SLAVE_RUNNING'  AND VARIABLE_VALUE = 'OFF'";
        $resultError = $this->db_slave->query($sql)->num_rows();
    return $resultError;
   }
}

?>
