<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//X-Api-Key for Application					16b31a35130b0023a8d49a86551f5bb45a52bf9069bf384																
//X-Api-Key for Server					9cffbfa5d0abad7dff571e5e05119a921a247bac7f5eeaa																
class SystemInfo extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
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
		$this->load->library('my_common');
		$this->load->model('dataserver');
	}

	/**
	* Insert Server Information into DB
	*/
	function SaveData(){
		$html = $this->GetServer(1);
		$ret = (array) json_decode($html, true);
		$in = $ret["servers"];
		// var_dump($ret);
		// $result = array();
		for ($i = 0; $i < count($in); $i++) {
			$serverId = array('server_id' => $in[$i]["id"]);
			$this->dataserver->SelectServerId($serverId, $result);
			if(isset($in[$i]["summary"])){
				$serverInfo = $in[$i]["summary"];
				$serverInfo["server_id"] =  $in[$i]["id"];
				$serverInfo["health_status"] = $in[$i]["health_status"];
				$serverInfo["last_reported_at"] = $in[$i]["last_reported_at"];
				
				if(count($result) < 1){
					$in[$i]["server_id"] = $in[$i]["id"];
					unset($in[$i]["id"]);
					unset($in[$i]["links"]);
					unset($in[$i]["health_status"]);
					unset($in[$i]["summary"]);
					$this->dataserver->SaveServerId($in[$i]);
					
					//If table not Create yet => Add new table Server Infor
					//'SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO"; ==> Invalid query: '-- SET time_zone = "+00:00";
					$dropServerSQL = 'DROP TABLE IF EXISTS `server_'. $in[$i]["server_id"] . '`; '; 
					$this->dataserver->querySql($dropServerSQL);
					
					$createServerSQL= 					
					 'CREATE TABLE IF NOT EXISTS `server_'. $in[$i]["server_id"] . '` (
					  `id` int(11) NOT NULL AUTO_INCREMENT,
					  `cpu` decimal(8,2) DEFAULT NULL,
					  `cpu_stolen` decimal(8,2) DEFAULT NULL,
					  `disk_io` decimal(8,2) DEFAULT NULL,
					  `memory` decimal(8,2) DEFAULT NULL,
					  `memory_used` bigint(20) DEFAULT NULL,
					  `memory_total` bigint(20) DEFAULT NULL,
					  `fullest_disk` decimal(8,2) DEFAULT NULL,
					  `fullest_disk_free` bigint(20) DEFAULT NULL,
					  `health_status` varchar(20) DEFAULT NULL,
					  `last_reported_at` datetime DEFAULT CURRENT_TIMESTAMP,
					  PRIMARY KEY (`id`)
					) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT="Server detail Information realtime" AUTO_INCREMENT=1;';

					$this->dataserver->querySql($createServerSQL);
				}
				$this->dataserver->SaveServerInfo($serverInfo);
			}
		}
	}

	/**
	* GetServer Information 
	*/
	public function GetServer($isShow = Null){

// curl -X GET 'https://api.newrelic.com/v2/servers.json' -H 'X-Api-Key:9cffbfa5d0abad7dff571e5e05119a921a247bac7f5eeaa' -i										
							
	$curl = curl_init();
 	$header[0] = "X-Api-Key: 9cffbfa5d0abad7dff571e5e05119a921a247bac7f5eeaa";	
 	$header[] = "Content-Type: application/json";
 	$header[] = "Accept-Encoding: gzip, deflate";

 	$url = 'https://api.newrelic.com/v2/servers.json';
 	curl_setopt($curl, CURLOPT_URL, $url);
 	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
// Will return the response, if false it print the response
	if($isShow != Null) {
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	}
	// Error: "SSL certificate problem: unable to get local issuer certificate"
	// XXX: This is not a "fix" for your problem, this is a work-around.  You 
 	// should fix your local CAs 
     
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
	curl_setopt($curl, CURLOPT_CAINFO, getcwd() . '\application\config\cert_newrelic_base64.cer');

	$html = curl_exec($curl);
	 if ($html === false) {
        // die('error: ' . curl_error($curl));
        $json = array();
        $this->my_common->echo_result($json, -100, 'Error: ' . curl_error($curl));
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
}