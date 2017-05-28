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
	 * Class constructor
	 *
	 * @return	void
	 */

	public function __construct()
	{
		 parent::__construct();
		$this->load->library('common');
	}

function SaveData(){
	$html = $this->GetServer();
	// RetrieveData(SERVER_INFO, $html,);
}
/**
GetServer Information 
*/
	public function GetServer(){

// curl -X GET 'https://api.newrelic.com/v2/servers.json' -H 'X-Api-Key:16b31a35130b0023a8d49a86551f5bb45a52bf9069bf384' -i																									
	$curl = curl_init();
 	$header[0] = "X-Api-Key: 16b31a35130b0023a8d49a86551f5bb45a52bf9069bf384";	
 	$header[] = "Content-Type: application/json";
 	$header[] = "Accept-Encoding: gzip, deflate";

 	$url = 'https://api.newrelic.com/v2/servers.json';
 	curl_setopt($curl, CURLOPT_URL, $url);
 	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

	/*Error: "SSL certificate problem: unable to get local issuer certificate"
     * XXX: This is not a "fix" for your problem, this is a work-around.  You 
     * should fix your local CAs 
     */
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
	curl_setopt($curl, CURLOPT_CAINFO, getcwd() . '\application\config\cert_newrelic_base64.cer');

	$html = curl_exec($curl);
	 if ($html === false) {
        // die('error: ' . curl_error($curl));
        $json = array();
        $this->common->echo_result($json, -100, 'Error: ' . curl_error($curl));
        exit();
    }
    // curl_close($curl);
    $response = curl_getinfo($curl);

    if($response['http_code'] == 403){
        // Access Forbidden
        return -1; 
    }else{
            return $html;
    }

	}

    /*function RetrieveData($type, $store_id, $html) {
	    $d = new DOMDocument();
	    @$d->loadHTML($html);
	    $x = new DOMXPath($d);
	    $output = array();
	    switch_type($type, $x, $output);
	    if(count($output) > 0){
	    // SAVE SERVER DATA
	        if ($type == SERVER_INFO) {
	            return save_data_download($store_id, $output);
	        } else{
	    // SAVE APPLICATION DATA
	        // if ($type == APPLICATION_INFO) {
	            return save_data_earning($store_id, $output);
	        }
	    }else{
	        // No Data
	        return 2;
	    }
	}*/
}