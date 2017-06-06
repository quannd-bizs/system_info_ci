<?php

/**
 * Description of MY_ControllerAdmin
 *
 */
class MY_ControllerAdmin extends CI_Controller {

    //put your code here
    /**
     * resulf of method when perform is successful
     *
     */
    const CI_OK = 1;

    /**
     * resulf of method when perform fail relate to DB Exception
     *
     */
    const CI_ERR_DB_EXCEPTION = -1;

    /**
     * resulf of method when perform fail relate to Exception other DB Exception
     *
     *
     */
    const CI_ERR_EX_OTHER = -2;

    /**
     * resulf of "validate" method
     *
     */
    const CI_ERR_VALIDATION = -2;

    private $_get_args = array();
    private $_post_args = array();

    public function __construct() {
        parent::__construct();

        $this->_get_args = array_merge($this->_get_args, $this->uri->ruri_to_assoc());
        $this->_post_args = $this->getAllPostParams();
    }

    /**
     *
     * @param <type> $key
     * @return <type>
     */
    public function get($key = NULL) {
        if ($key === NULL) {
            return $this->_get_args;
        }

        return array_key_exists($key, $this->_get_args) ? $this->_get_args[$key] : false;
    }

    public function getAllGet() {
        return $this->_get_args;
    }

    public function post($key = NULL) {
        if ($key === NULL) {
            return $this->_post_args;
        }

        return array_key_exists($key, $this->_post_args) ? $this->_post_args[$key] : false;
    }

    public function postAllGet() {
        return $this->_post_args;
    }

    /**
     * Get File Name
     *
     * @param <type> $name
     * @return <type>
     */
    public function getFileName($name) {
        if (isset($_FILES[$name]['name'])) {
            return $_FILES[$name]['name'];
        }
    }

    /**
     * Get TempFile Name
     *
     * @param <type> $name
     * @return <type>
     */
    public function getTempFile($name) {
        if (isset($_FILES[$name]['tmp_name'])) {
            return $_FILES[$name]['tmp_name'];
        }
    }

    /**
     *
     * Get getFileType Name
     *
     * @param <type> $name
     * @return <type>
     */
    public function getFileType($name) {
        if (isset($_FILES[$name]['type'])) {
            return $_FILES[$name]['type'];
        }
    }

    /**
     * get File Size
     *
     * @param <type> $name
     * @return <type>
     */
    public function getFileSize($name) {
        if (isset($_FILES[$name]['size'])) {
            return $_FILES[$name]['size'];
        }
    }

    /**
     *
     * @param <type> $fieldName
     * @param <type> $maxFileSize
     * @return <type>
     */
    public function checkFileSizeUpload($fieldName, $maxFileSize) {
        $aryFileSize = $this->getFileSize($fieldName);
        if (isset($aryFileSize[0]) && $aryFileSize[0] != '') {
            foreach ($aryFileSize as $key => $value) {
                if ($value > $maxFileSize) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Check Empty file
     *
     * @param <type> $fieldName
     * @return <type>
     */
    public function checkEmptyFile($fieldName) {
        $aryFile = $this->getFileName($fieldName);
        if (isset($aryFile[0]) == false || $aryFile[0] == '') {
            return true;
        }
        return false;
    }

    /**
     * Check Allow image
     *
     * @param <type> $fieldName
     * @return <type>
     */
    public function checkAllowImage($fieldName) {
        $aryFile = $this->getFileName($fieldName);
        if (isset($aryFile[0]) && $aryFile[0] != '') {
            foreach ($aryFile as $key => $fileName) {
                if ($fileName != '') {
                    if ($this->check_allow_file($fileName) == false) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * Check allow file
     *
     * @param <type> $fileName
     * @return <type>
     */
    public function check_allow_file($fileName) {
        $allowed_filetypes = array('.jpg', '.JPG', '.gif', '.GIF', '.jpeg', '.JPEG', '.png', '.PNG');
        $ext = substr($fileName, strpos($fileName, '.'), strlen($fileName) - 1);
        if (!in_array($ext, $allowed_filetypes)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Resize image
     *
     * @param <type> $image
     * @param <type> $width
     * @param <type> $height
     * @param <type> $scale
     * @return <type>
     */
    public function resizeImage($image, $width, $height, $scale) {
        $image_data = getimagesize($image);
        $imageType = image_type_to_mime_type($image_data[2]);
        $newImageWidth = ceil($width * $scale);
        $newImageHeight = ceil($height * $scale);
        $newImage = imagecreatetruecolor($newImageWidth, $newImageHeight);
        switch ($imageType) {
            case "image/gif":
                $source = imagecreatefromgif($image);
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                $source = imagecreatefromjpeg($image);
                break;
            case "image/png":
            case "image/x-png":
                $source = imagecreatefrompng($image);
                break;
        }
        imagecopyresampled($newImage, $source, 0, 0, 0, 0, $newImageWidth, $newImageHeight, $width, $height);
        switch ($imageType) {
            case "image/gif":
                imagegif($newImage, $image);
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                imagejpeg($newImage, $image, 90);
                break;
            case "image/png":
            case "image/x-png":
                imagepng($newImage, $image);
                break;
        }

        return $image;
    }

    /**
     * Get height image
     *
     * @param <type> $image
     * @return <type>
     */
    public function getHeight($image) {
        $size = getimagesize($image);
        $height = $size[1];
        return $height;
    }

    /**
     * Get Width iamge
     *
     * @param <type> $image
     * @return <type>
     */
    public function getWidth($image) {
        $size = getimagesize($image);
        $width = $size[0];
        return $width;
    }

    /**
     *
     * @param <type> $attachmentId
     * @param <type> $attachmentDir
     */
    public function checkExitsFile($attachmentId, $attachmentDir) {
        
    }

    /**
     *
     * @param <type> $attachmentId
     * @param <type> $attachmentDir
     */
    public function downloadFile($attachmentId, $attachmentDir) {
        
    }

    /**
     * Upload file
     *
     * @param <type> $fieldName
     * @param <type> $dirUpload
     * @param <type> $resultFileUpLoaded
     * @param <type> $checkType
     */
    public function uploadFile($fieldName, $dirUpload, &$resultFileUpLoaded, $checkType = null) {

        $intIsOk = 1;
        // Get array from $fileName
        $aryFile = $this->getFileName($fieldName);

        $aryTempFile = $this->getTempFile($fieldName);
        $aryFileType = $this->getFileType($fieldName);
        $aryFileSize = $this->getFileSize($fieldName);

        //ThanhDH: check type $aryFile
        if (true == isset($checkType) && (trim($checkType) != '')) {
            foreach ($aryFile as $key => $value) {
                if (substr($value, strripos($value, '.') + 1) != $checkType) {
                    $intIsOk = 0;
                    break;
                }
            }
        }


        //end check Type
        // Check url
        if (substr($dirUpload, -1) != DIRECTORY_SEPARATOR)
            $dirUpload .= DIRECTORY_SEPARATOR;
        if (!file_exists($dirUpload)) {
            @mkdir($dirUpload, 0777, true);
        }
        // Check file
        if (($intIsOk == 1) && is_array($aryFile) && count($aryFile) > 0) {
            $index = 0;
            //var_dump($aryFile);die();
            foreach ($aryFile as $key => $fileName) {
                // Check isUpload
                if (is_uploaded_file($aryTempFile[$key]) && is_file($aryTempFile[$key])) {
                    // Miengtq MOD 2012/02/13
                    //$realFileName = number_format(microtime(true), 4, '', '') . md5($fileName) . '.ci';
//                    $realFileName = number_format(microtime(true), 4, '', '') . md5($fileName) . '.' . substr($fileName, strripos($fileName, '.') + 1);
                    $realFileName = substr($fileName, 0, strripos($fileName, '.', -1)) . "_" . date('Ymd_H_i_s') . '.' . substr($fileName, strripos($fileName, '.') + 1);
                    // Check copy file to folder
                    if (@copy($aryTempFile[$key], $dirUpload . $realFileName)) {
                        $fileUpload = array();
                        // Get data to fileUpload
                        $fileUpload["attachment_filename"] = substr($fileName, 0, strripos($fileName, '.'));
                        $fileUpload["attachment_hash_name"] = $realFileName;
                        $fileUpload["attachment_file_type"] = substr($fileName, strripos($fileName, '.') + 1);
                        $fileUpload["attachment_file_size"] = (int) $aryFileSize[$index];
                        $fileUpload["attachment_mime_type"] = $aryFileType[$index];


                        // Return file upload to result
                        $resultFileUpLoaded[] = $fileUpload;
                    } else {
                        $intIsOk = 0;
                        break;
                    }
                }

                $index++;
            }
        }

        // Log function
        return $intIsOk;
    }

    public function uploadFileTemp($fieldName) {
        // Set to param.
        $fileList = array();
        $fileList["File"] = getFileName($fieldName);
        $fileList["tempFileList"] = $this->getTempFile($fieldName);
        $fileList["fileTypeList"] = $this->getFileType($fieldName);
        $fileList["fileSizeList"] = $this->getFileType($fieldName);

        return $fileUploated;
    }

    /**
     * Multil upload file
     *
     * @param <type> $fieldName
     * @param string $dirUpload
     * @param <type> $resultFileUpLoaded
     * @param <type> $max_width
     * @return int
     */
    public function multiUploadFile($fieldName, $dirUpload, &$resultFileUpLoaded, $max_width = null) {

        $intIsOk = 1;
        $resultFileUpLoaded = array();
        //Get array from $fileName
        $aryFile = $this->getFileName($fieldName);

        $aryTempFile = $this->getTempFile($fieldName);
//        $aryFileType = $this->getFileType($fieldName);
//        $aryFileSize = $this->getFileSize($fieldName);
        // Check url
        if (substr($dirUpload, -1) != DIRECTORY_SEPARATOR)
            $dirUpload .= DIRECTORY_SEPARATOR;
        if (!file_exists($dirUpload)) {
            @mkdir($dirUpload, 0777, true);
        }
        // Check file
        if (true == isset($aryFile[0]) && $aryFile[0] != '') {

            foreach ($aryFile as $key => $fileName) {
                // Check isUpload
                if (is_uploaded_file($aryTempFile[$key]) && is_file($aryTempFile[$key])) {
                    // $imageName = microtime() . $fileName; //change image name
                    $imageName = $fileName;
                    $replace = array(' ', '~', '!', '$', '%', '^', '(', ')', ';', '\'', ',');
                    $imageName = str_replace($replace, '_', $imageName);
                    $aryFileUpload = array();
                    $aryFileUpload['image_name'] = $imageName;
                    $resultFileUpLoaded[] = $aryFileUpload;
                    $imageLocation = $dirUpload . $imageName;
                    if(!@copy($aryTempFile[$key], $imageLocation)) {
						$intIsOk = 0;
					}
                    if (isset($max_width) && is_numeric($max_width)) {
                        $width = $this->getWidth($imageLocation);
                        $height = $this->getHeight($imageLocation);
                        //Scale the image if it is greater than the width set above
                        if ($width > $max_width) {
                            if ($height < $max_width) {
                                $scale = $max_width / $width;
                                $uploaded = $this->resizeImage($imageLocation, $width, $height, $scale);
                            } else if ($height > $max_width) {
                                if ($height > $width) {
                                    $scale = $max_width / $height;
                                    $uploaded = $this->resizeImage($imageLocation, $width, $height, $scale);
                                } else {
                                    $scale = $max_width / $width;
                                    $uploaded = $this->resizeImage($imageLocation, $width, $height, $scale);
                                }
                            }
                        } else {
                            if ($height < $max_width) {
                                $scale = 1;
                                $uploaded = $this->resizeImage($imageLocation, $width, $height, $scale);
                            } else {
                                $scale = $max_width / $height;
                                $uploaded = $this->resizeImage($imageLocation, $width, $height, $scale);
                            }
                        }
                    }
                }
            }
        }

        return $intIsOk;
    }

    /**
     *
     * @param <type> $attachmentId
     * @param <type> $attachmentDir
     */
    public function deleteFile($attachmentId, $attachmentDir) {
        
    }

    /**
     * Filter Unicode for url
     *
     * @param <type> $str
     * @return <type>
     */
    public function filterUnicode($str) {
        $marTViet = array("à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă",
            "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề"
            , "ế", "ệ", "ể", "ễ",
            "ì", "í", "ị", "ỉ", "ĩ",
            "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ"
            , "ờ", "ớ", "ợ", "ở", "ỡ",
            "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ",
            "ỳ", "ý", "ỵ", "ỷ", "ỹ",
            "đ",
            "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă"
            , "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
            "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
            "Ì", "Í", "Ị", "Ỉ", "Ĩ",
            "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ"
            , "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
            "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ",
            "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ",
            "Đ");

        $marKoDau = array("a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"
            , "a", "a", "a", "a", "a", "a",
            "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
            "i", "i", "i", "i", "i",
            "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"
            , "o", "o", "o", "o", "o",
            "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
            "y", "y", "y", "y", "y",
            "d",
            "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"
            , "a", "a", "a", "a", "a",
            "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
            "i", "i", "i", "i", "i",
            "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"
            , "o", "o", "o", "o", "o",
            "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
            "y", "y", "y", "y", "y",
            "d");
        $str = str_replace($marTViet, $marKoDau, $str);

        $str = str_replace(' ', '-', trim(str_replace(' +', ' ', preg_replace('/[^a-zA-Z0-9@\s]/', '', strtolower($str)))));

        return $str;
    }

    public function encodingUnicode($str) {
        $marTViet = array("à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă",
            "ằ", "ắ", "ặ", "ẳ", "ẵ",
            "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ",
            "ì", "í", "ị", "ỉ", "ĩ",
            "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ"
            , "ờ", "ớ", "ợ", "ở", "ỡ",
            "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ",
            "ỳ", "ý", "ỵ", "ỷ", "ỹ",
            "đ",
            "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă"
            , "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
            "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
            "Ì", "Í", "Ị", "Ỉ", "Ĩ",
            "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ"
            , "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
            "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ",
            "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ",
            "Đ");

        $marKoDau = array("a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11"
            , "a12", "a13", "a14", "a15", "a16", "a17",
            "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11",
            "i1", "i2", "i3", "i4", "i5",
            "o1", "o2", "o3", "o4", "o5", "o6", "o7", "o8", "o9", "o10", "o11", "o12"
            , "o13", "o14", "o15", "o16", "o17",
            "u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8", "u9", "u10", "u11",
            "y1", "y2", "y3", "y4", "y5",
            "d1",
            "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12"
            , "a13", "a14", "a15", "a16", "a17",
            "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11",
            "i1", "i2", "i3", "i4", "i5",
            "o1", "o2", "o3", "o4", "o5", "o6", "o7", "o8", "o9", "o10", "o11", "o12"
            , "o13", "o14", "o15", "o16", "o17",
            "u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8", "u9", "u10", "u11",
            "y1", "y2", "y3", "y4", "y5",
            "d1");
        $str = str_replace($marTViet, $marKoDau, $str);

        $str = str_replace(' ', '-', trim(str_replace(' +', ' ', preg_replace('/[^a-zA-Z0-9@\s]/', '', strtolower($str)))));

        return $str;
    }

    public function removeHTML($str) {
        return preg_replace('/<([\/\w]+)[^>]*>/si', '', $str);
    }

    public function removeSearhKeyword($str) {
        $str = mb_strtolower($str, 'utf-8');

//        $str = strip_tags($str);

        $str = trim(preg_replace('/[\@\^\,\*\?\(\)\{\}\=\!\<\>\|\%\#\&\$\'\"\;\:\-\_\+\/]+/', '', $str));

        return $str;
    }

    public function cutString($str, $n = 500) {

        $str = $this->removeHTML($str);

        $str = addslashes($str);

        if (strlen($str) < $n)
            return $str;

        $html = substr($str, 0, $n);

        $html = substr($html, 0, strrpos($html, ' '));

        return $html . '...';
    }

    public function convertUnicode($string) {
        $utf8string = html_entity_decode(preg_replace("/U\+([0-9A-F]{4})/", "&#\\1;", $string), ENT_NOQUOTES, 'UTF-8');
        return $utf8string;
    }

    /**
     *
     * @param <type> $fromMail
     * @param <type> $fromName
     * @param <type> $toMail
     * @param <type> $email
     * chu y $attachFile la mang va filepath la duong dan tuyet doi ko phai duong dan URL
     * @author : miengtq@d-hearts.com
     * @since 2012/02/10
     */
    public function sendMail($toMail, $email, $subject = "", $attachFile = null, $ccMail = null, $fromMail = "", $passMail = "", $fromName = "") {

        $mod = $this->config->item('send_mail');

        if ($toMail == null || $mod == 1)
            return;

        $this->load->config('tms_config');
        $config = $this->config->item('mail_conf');

        if (isset($fromMail) == true && isset($passMail) == true && $fromMail != "" && $passMail != "") {
            $config['smtp_user'] = $fromMail;
            $config['smtp_pass'] = $passMail;
        }

        if (isset($fromName) == true && $fromName != "") {
            $config['name'] = $fromName;
        }
        if (isset($subject) == true && $subject != "") {
            $config['subject'] = $subject;
        }

        $this->load->library('email');
        $this->email->initialize($config);
        $this->email->set_newline("\r\n");
        $this->email->from($config['from'], $config['name']);
        $this->email->subject($config['subject']);
        $this->email->message($email);
        $this->email->to($toMail);
        if ($ccMail != null) {
            $this->email->cc($ccMail);
        }

        if ($attachFile != null) {
            foreach ($attachFile as $value) {
                $this->email->attach($value);
            }
        }
        $result = $this->email->send();
        $this->email->print_debugger();
        return $result;
    }

    /**
     *
     * @return string
     * @author : miengtq@d-hearts.com
     * @since 2012/02/01
     */
    public function genRandomString() {
        $length = 10;
        $characters = "0123456789abcdefghijklmnopqrstuvwxyz";
        $real_string_legnth = strlen($characters) - 1;
        $string = "";

        for ($p = 0; $p < $length; $p++) {
            $string .= $characters[mt_rand(0, $real_string_legnth)];
        }
        return $string;
    }

    /**
     *
     * @param <type> $message
     * @param <type> $id
     * @param <type> $type
     */
    public function writeLog($message, $id = "", $type = 0) {

        if (is_dir(FCPATH . "log") == false) {
            mkdir(FCPATH . "log", 0700);
        }
        $pathFile = FCPATH . "log/" . date('Y_m_d') . $id . ".log";
        if ($type == 1) {
            $pathFile = FCPATH . "log/" . "Isuue_" . $id . ".log";
        }
        $ourFileHandle = fopen($pathFile, 'a+');
        fwrite($ourFileHandle, date("Y-m-d H:i:s") . " : " . $message . "\n");
        fclose($ourFileHandle);
    }

    public function getImageType($itemsFolder, $item_name) {

        $fullPath = $itemsFolder . $item_name;
        $result = "";
        if (file_exists($fullPath . ".jpg")) {
            $result = "jpg";
        } else if (file_exists($fullPath . ".gif")) {
            $result = "gif";
        } else if (file_exists($fullPath . ".png")) {
            $result = "png";
        }

        return $result;
    }

    public function write($str) {
        static $firstTime = true;
        if ($firstTime) {
            ob_start();
            ob_implicit_flush(false);
            $firstTime = false;
            $this->write(str_repeat(' ', 1024 * 4));
        }
        ob_get_clean();
        flush();
    }

    public function bench($callback, $time = 12) {
        $result = new StdClass;
        $result->all = array();
        for (
        $i = 0,
        $length = $time; $i < $length; ++$i
        ) {
            $time = microtime(true);
            $callback();
            $time = microtime(true) - $time;
            $result->all[] = $time;
        }
        $result->max = 0;
        foreach ($result->all as $time)
            $result->max = max($result->max, $time);
        $result->min = $result->max;
        foreach ($result->all as $time)
            $result->min = min($result->min, $time);
        if ($length < 3)
            $result->avg = sprintf('%.2f', (($result->max + $result->min) / 2) * 1000);
        else {
            $i = 0;
            while ($length)
                $i += $result->all[--$length];
            $i -= $result->max + $result->min;
            $i /= count($result->all) - 2;
            $result->avg = sprintf('%.2f', $i * 1000);
        }

        return $result;
    }

    public function size($bytes) {
        static $size = array('bytes', 'Kb', 'Mb', 'Gb');
        $i = 0;
        while (1023 < $bytes) {
            $bytes /= 1024;
            ++$i;
        }
        return sprintf('%.2f', $bytes) . ' ' . $size[$i];
    }

//    /**
//     * Convert file name to download
//     *
//     * @param string $fileName
//     * @return string
//     */
//    public static function convertFileNameToDownload($fileName) {
//        $items = self::getUserBrowser();
//        switch ($items['browser']) {
//            case 'ie':
//            case 'chrome':
//                $fileName = self::UTF8toShiftJIS($fileName);
//                break;
//
//            case 'firefox':
//            case 'safari':
//            default:
//                break;
//        }
//        return $fileName;
//    }
//
//    public function UTF8toShiftJIS($str, $fromEncoding = "UTF-8") {
//        return self::convertEncoding($str, "Shift_JIS", $fromEncoding);
//    }

    public function formatDate($strDate) {
        if ($strDate == '0000-00-00') {
            $strDate = '';
        } else {
            $strDate = str_replace('-', '/', $strDate);
        }
        return $strDate;
    }

    function add_date($orgDate, $year, $mth, $day) {
        $cd = strtotime($orgDate);
        $retDAY = date('Y-m-d', mktime(0, 0, 0, date('m', $cd) + $mth, date('d', $cd) + $day, date('Y', $cd) + $year));
        return $retDAY;
    }

    public function setRsyncUpdateImage() {
        $pathFile = FCPATH . "/" . "rsync";
        $ourFileHandle = @fopen($pathFile, 'w');
        @fwrite($ourFileHandle, "2");
        @fclose($ourFileHandle);
    }

}

?>
