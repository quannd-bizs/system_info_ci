<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 *  
 */
set_error_handler('exceptions_error_handler');

function exceptions_error_handler($severity, $message, $filename, $lineno) {
    if (error_reporting() == 0) {
        
    }
    if (error_reporting() & $severity) {
        throw new ErrorException($message, 0, $severity, $filename, $lineno);
    }
}

require_once APPPATH.'core/MY_ControllerAdmin.php';

//require_once 'KLogger.php';

class SysInfo_Admin extends MY_ControllerAdmin {

    public $login_name = null;
    public $imagePath = "";
    protected $reviser = null;
    protected $pageKey = 1;
    protected $orderType = "ASC";

    
    public function __construct() {
        parent::__construct();
        $this->load->model('sysinfo_admin_model');        

        $aryMemberSession = array();
        $aryMemberSession = $this->session->userdata('member_session');
        $this->login_name = $aryMemberSession['member_username'];
     
        /// For sort
        if (isset($_GET['pageNo'])) {
            $this->pageKey = $_GET['pageNo'];
        } else {
            $this->pageKey = 1;
        }

        if (isset($_POST['orderType'])) {
            if ($_POST['orderType'] == "ASC") {
                $this->orderType = "DESC";
            } else {
                $this->orderType = "ASC";
            }
        } else {
            $orderType = "ASC";
        }
    }

    /**
     * Default view
     * 
     * @author : Haimv
     * @since 2012/02/01
     */
    public function index() {
       
        $aryMemberSession = $this->session->userdata('member_session');
        if ($aryMemberSession) {
            redirect(base_url() . 'sysinfo_admin/admin_main_menu');
        } else {
            redirect(base_url() . 'sysinfo_admin/logout');
        }
    }

    /**
     * 
     */
    public function admin_main_menu() {
        $this->load->view('admin/admin_main_menu');
    }

    /**
     * Login screen
     *
     */
    public function admin_login() {
        $loginData = array();
        $aryError = array();
        $loginData = $this->getAllPostParams();
        $intIsOk = $this->sysinfo_admin_model->selectLoginInfo($loginData, $result);
        if ($intIsOk == 1 && true == isset($result[0])) {
            $this->session->set_userdata('member_session', $result[0]);
            $this->login_name = $result[0]['member_username'];
        } else {
            $intIsOk = -2;
        }

        $aryResult['intIsOk'] = $intIsOk;
        $aryResult ['strError'] = is_array($aryError) ? join("\n", $aryError) : (String) $aryError;
        header("Content-Type: text/html; charset=UTF-8");
        echo json_encode($aryResult);
    }

    /**
     * Logout action
     *
     */
    public function logout() {
        $this->session->unset_userdata('member_session');
        $this->session->sess_destroy();
        $this->load->view('admin/admin_login');
    }

    /**
     *
     * @return boolean 
     */
    public function checkLogin() {
        $aryMemberSession = $this->session->userdata('member_session');
        if ($aryMemberSession) {
            $this->login_name = $aryMemberSession['member_username'];
            return true;
        } else {
            $this->load->view('admin/admin_login');
            return false;
        }
    }
public function log_view() {
        if ($this->checkLogin() == false) {
            return;
        }

//check member session the access data
        $aryData = array();
        $aryData['user_login'] = $this->login_name;
//to client
        $this->load->view('admin/log_view', $aryData);
    }

    public function log_search() {
//check member session the access data
        $aryData = array();
        $aryData['user_login'] = $this->login_name;
        if (isset($_GET['pageNo'])) {
            $pageKey = $_GET['pageNo'];
        } else {
            $pageKey = 1;
        }
//order column
        $aryCondition = array();
        $aryError = array();
//get condtion for search
        $aryCondition = $this->getAllPostParams();
//get result from search
        $record_per_page = 100;
        $intIsOk = $this->sysinfo_admin_model->search_log($aryCondition, $aryData, $pageKey, $record_per_page);
//        var_dump($aryCondition);
//throw client
       $aryResult = array();
       $aryResult['strPaging'] = $this->load->view('admin/log_paging', $aryData, true);
       $aryResult['html'] = $this->load->view('admin/log_list', $aryData, true);
       $aryResult['intIsOk'] = $intIsOk;
       header("Content-Type: text/html; charset=UTF-8");
       echo json_encode($aryResult);
    }

    /**
     * Detail log info
     */
    public function log_detail() {
        if ($this->checkLogin() == false) {
            return;
        }
        $intIsOk = self::CI_OK;
        $aryData = array();
        $aryLogs = array();
        $aryData['user_login'] = $this->login_name;

        $id = $this->uri->segment(3, 0);
        if ($id) {
            $intIsOk = $this->sysinfo_admin_model->get_log_info($id, $aryLogs);
            if ($intIsOk == 1) {
                $aryData['aryLogs'] = $aryLogs[0];
                $this->load->view('admin/log_detail', $aryData);
            } else {
                $this->error_view();
            }
        }
    }

    /**
     * 
     */
    public function log_update_status() {
        if ($this->checkLogin() == false) {
            return;
        }

        $aryError = array();
        $log_id = $_GET['log_id'];

        if ($log_id) {
            $data = array(
                'status' => 2
            );
            $condition = array('log_id' => $log_id);
            $intIsOk = $this->sysinfo_admin_model->update(SysInfo_Admin_Model::TABLE_LOG, $data, $condition);
            if ($intIsOk == -2) {
                $aryError[] = 'update error';
            }
        } else {
            $intIsOk = -2;
            $aryError[] = 'ID not match ';
        }

        $aryResult = array();
        $aryResult['intIsOk'] = $intIsOk;
        $aryResult ['strError'] = is_array($aryError) ? join("\n", $aryError) : (String) $aryError;
        header("Content-Type: text/html; charset=UTF-8");
        echo json_encode($aryResult);
    }

    /**
     * view script error dialog
     * 
     */
    public function error_view() {
        header("Content-Type: text/html; charset=UTF-8");
        echo "
                    <script>                        
                          alert('System Error。');
                          history.go(-1);
                    </script>
                    ";
    }
}
