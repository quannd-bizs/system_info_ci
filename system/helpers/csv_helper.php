<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

// ------------------------------------------------------------------------

/**
 * CSV Helpers
 * Inspiration from PHP Cookbook by David Sklar and Adam Trachtenberg
 * 
 * @author		Jérôme Jaglale
 * @link		http://maestric.com/en/doc/php/codeigniter_csv
 */
// ------------------------------------------------------------------------

/**
 * Array to CSV
 *
 * download == "" -> return CSV string
 * download == "toto.csv" -> download file toto.csv
 */
if (!function_exists('array_to_csv')) {

    function array_to_csv($array, $download = "") {

        if ($download != "") {
            header("Pragma: public");
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: public", false);
            header("Content-Description: File Transfer");
            header("Content-type: application/csv-tab-delimited-table; charset=utf-8");
//            header("Content-Type: text/csv; charset=UTF-8");
            header("Accept-Ranges: bytes");
            header("Content-Disposition: attachment; filename=\"{$download}\";");
            header("Content-Transfer-Encoding: binary");
            //header("Content-Type: text/html; charset=UTF-8");
        }

        ob_start();
        $f = fopen('php://output', 'w') or show_error("Can't open php://output");
        $n = 0;
        foreach ($array as $line) {
            $n++;
            if (!fputcsv($f, $line)) {
                show_error("Can't write line $n: $line");
            }
        }
        fclose($f) or show_error("Can't close php://output");
        $str = ob_get_contents();
        ob_end_clean();

        //$str = mb_convert_encoding($str, 'Shift_JIS', 'UTF-8');
//        mb_language("Japanese");
//        mb_internal_encoding("EUC-JP");
//        mb_detect_order("ASCII,JIS,UTF-8,EUC-JP,SJIS,Shift_JIS");
//       // $str = mb_convert_encoding($str, "shiftWin", mb_detect_encoding($str));
//        //$str = mb_convert_encoding($str, "shiftWin", "JIS, eucjp-win, sjis-win");
        $str = mb_convert_encoding($str, "SJIS", "UTF-8");

        if ($download == "") {
            return $str;
        } else {
            echo $str;
        }
    }

}

// ------------------------------------------------------------------------

/**
 * Query to CSV
 *
 * download == "" -> return CSV string
 * download == "toto.csv" -> download file toto.csv
 */
if (!function_exists('query_to_csv')) {

    function query_to_csv($query, $headers = TRUE, $download = "") {
        if (!is_object($query) OR !method_exists($query, 'list_fields')) {
            show_error('invalid query');
        }

        $array = array();

        if ($headers) {
            $line = array();
            foreach ($query->list_fields() as $name) {
                $line[] = $name;
            }
            $array[] = $line;
        }

        foreach ($query->result_array() as $row) {
            $line = array();
            foreach ($row as $item) {
                $line[] = $item;
            }
            $array[] = $line;
        }

        echo array_to_csv($array, $download);
    }

}

/* End of file csv_helper.php */
/* Location: ./system/helpers/csv_helper.php */