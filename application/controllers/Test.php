<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {

/*	function __construct(){
		parent::__construct();
		$this->load->library('javascript');

		$this->load->library(
	        'javascript',
	        array(
	                'js_library_driver' => 'scripto',
	                'autoload' => FALSE
	        )
		);
//		$this->load->library('javascript/jquery');
		// $this->load->library('javascript/jquery', FALSE);
	}*/
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
		// $this->load->view('welcome_message');
		$this->load->view('jquery/test');
	}
    /***************
    /*
    * widget 
    */
    public function weather(){
        $this->load->view('jquery/weather');
    }
    
    public function widget(){
        $this->load->view('widget/test');
    }
    
    /*****************/
}
