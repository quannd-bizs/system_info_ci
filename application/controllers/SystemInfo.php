<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//X-Api-Key					16b31a35130b0023a8d49a86551f5bb45a52bf9069bf384																

class SystemInfo extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('welcome_message');
	}

/**

*/
	public function GetServer(){

// curl -X GET 'https://api.newrelic.com/v2/servers.json' -H 'X-Api-Key:{api_key}' -i																									
	$curl = curl_init();
 	$header[0] = "X-Api-Key:16b31a35130b0023a8d49a86551f5bb45a52bf9069bf384";	
 	$header[] = "Content-Type:application/json";
 	$url = 'https://api.newrelic.com/v2/servers.json';
 	curl_setopt($curl, CURLOPT_URL, $url);
 	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_POST, false);

	$ret = curl_exec($curl);
	
    // curl_close($curl);
    $response = curl_getinfo($curl);
    
    echo json_encode($ret);

    if($response['http_code'] == 403){
        // Access Forbidden
        // echo "Access Forbidden";
        return -1; 
    }else{
    	// echo "TEST";
        echo json_encode($ret);
        // return $ret;
    }

	}

	public function echo_result(&$json, $err_code, $error_message){
	    $json['ret'] = (($err_code == 0 || $err_code == 2) ? True : False);
	    $json['dat']['err_code'] = $err_code;
	    $json['dat']['err_msg'] = $error_message;
	    echo json_encode($json);
	}  

	/* Check Html format
	if ($html === false) {
        // die('error: ' . curl_error($curl));
        $json = array();
        // echo_result($json, -100, 'Error: ' . curl_error($curl));
        echo "Error";
        exit();
    }*/
}