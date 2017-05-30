<?php
/**
* 
*/
class Common
{
		/**
	 * Reference to the CI singleton
	 *
	 * @var	object
	 */
	private static $instance;

	/**
	 * Class constructor
	 *
	 * @return	void
	 */
	public function __construct()
	{
		self::$instance =& $this;
	}

	/**
	 * Get the CI singleton
	 *
	 * @static
	 * @return	object
	 */
	public static function &get_instance()
	{
		return self::$instance;
	}

 	function init_result(&$json){
	    $json['ret'] = False;
	    $json['dat'] = array('err_code' => 1, 'err_msg' => 'Error');
	}

	function set_result(&$json, $err_code, $error_message){
	    $json['dat']['err_code'] = $err_code;
	    $json['dat']['err_msg'] = $error_message;
	}

	function get_err_msg($json){
	    return $json['dat']['err_msg'];
	}

	function echo_result(&$json, $err_code, $error_message){
	    $json['ret'] = (($err_code == 0 || $err_code == 2) ? True : False);
	    $json['dat']['err_code'] = $err_code;
	    $json['dat']['err_msg'] = $error_message;
	    echo json_encode($json);
	}
}