<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP 5.1.6 or newer
 *
 * @package		CodeIgniter
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc.
 * @license		http://codeigniter.com/user_guide/license.html
 * @link		http://codeigniter.com
 * @since		Version 1.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * CodeIgniter Application Controller Class
 *
 * This class object is the super class that every library in
 * CodeIgniter will be assigned to.
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	Libraries
 * @author		ExpressionEngine Dev Team
 * @link		http://codeigniter.com/user_guide/general/controllers.html
 */
class CI_Controller {

	private static $instance;
    private $_paramsByUrl = array();

	/**
	 * Constructor
	 */
	public function __construct()
	{
		self::$instance =& $this;

		// Assign all the class objects that were instantiated by the
		// bootstrap file (CodeIgniter.php) to local class variables
		// so that CI can run as one big super object.
		foreach (is_loaded() as $var => $class)
		{
			$this->$var =& load_class($class);
		}

		$this->load =& load_class('Loader', 'core');

		$this->load->initialize();

		log_message('debug', "Controller Class Initialized");
	}

	public static function &get_instance()
	{
		return self::$instance;
	}

    /**
     *
     * @return <type> 
     */
    public function getAllPostParams() {
        return $_POST;
    }

    /**
     *
     * @param <type> $paramName
     * @return <type> 
     */
    public function getPostParam($key) {
        if (isset($_POST[$key])) {
            return $_POST[$key];
        }

        return null;
    }

    /**
     *
     * @param <type> $key
     * @return <type> 
     */
    public function getParam($key) {
        if (isset($_GET[$key])) {
            return $_GET[$key];
        }
    }

    /**
     *
     * @param <type> $paramKey
     * @return <type> 
     */
    public function getParamOnUrlByKey($paramKey) {
        if (isset($this->_paramsByUrl[$paramKey]) && $this->_paramsByUrl[$paramKey] != '?ajax=1') {
            return $this->_paramsByUrl[$paramKey];
        }
    }

    /**
     *
     * @param <type> $key
     * @param <type> $value 
     */
    public function setSession($key, $value) {
        $_SESSION[$key] = & $value;
    }

    /**
     *
     * @param <type> $key
     * @return <type> 
     */
    public function getSession($key) {
        if ($this->hasSession($key)) {
            return $_SESSION[$key];
        }
    }

    /**
     *
     * @param <type> $key 
     */
    public function clearSession($key = '') {
        if ($key == '') {
            $_SESSION = array();
            unset($_SESSION);
            @session_destroy();
        } else {
            unset($_SESSION[$key]);
        }
    }

    public function getSessionId() {
        return session_id();
    }

    public function setCookieData($key, $value, $lifeTime = 0) {
        if ($lifeTime <= 0) {
            $lifeTime = (3600 * 24 * 30); //30 day
        }
        setcookie($key, $value, time() + $lifeTime, '/', '', 0);
    }

    public function clearCookie($key) {
        setcookie($key, "", -3600);
}

    public function getCookieData($key) {
        $value = $_COOKIE[$key];
        return $value;
    }

    public function hasCookie($key) {
        return isset($_COOKIE[$key]);
    }

    public function startSession() {
        session_cache_expire(10000);
        ini_set('session.gc_maxlifetime', 10000 * 60);
        session_start();
    }

    public function hasSession($key) {
        return isset($_SESSION[$key]);
    }

    public function redirectURL($url, $delayTime = 0) {
        // prevent header injections
        $url = str_replace(array("\n", "\r"), '', $url);

        if (!headers_sent()) {
            if ((int) $delayTime < 1) {
                header("Location: {$url}");
            } else {
                header("Refresh: {$delayTime}; URL={$url}");
            }
        }

        $html = '<html>' .
                '<head>' .
                '<meta http-equiv="refresh" content="%d;url=%s"/>' .
                '</head>' .
                '</html>';

        $html = sprintf($html, $delayTime, $url);
        echo $html;
        exit;
    }

}

// END Controller class

/* End of file Controller.php */
/* Location: ./system/core/Controller.php */