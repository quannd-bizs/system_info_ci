<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2017, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (https://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2017, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	https://codeigniter.com
 * @since	Version 1.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Application Controller Class
 *
 * This class object is the super class that every library in
 * CodeIgniter will be assigned to.
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	Libraries
 * @author		EllisLab Dev Team
 * @link		https://codeigniter.com/user_guide/general/controllers.html
 */
class CI_Controller {

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

		// Assign all the class objects that were instantiated by the
		// bootstrap file (CodeIgniter.php) to local class variables
		// so that CI can run as one big super object.
		foreach (is_loaded() as $var => $class)
		{
			$this->$var =& load_class($class);
		}

		$this->load =& load_class('Loader', 'core');
		$this->load->initialize();
		log_message('info', 'Controller Class Initialized');
	}

	// --------------------------------------------------------------------

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
