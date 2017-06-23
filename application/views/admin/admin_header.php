<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en" xml:lang="en">
    <head>
        <meta name="Description" content="Default Style" />
        <meta name="Version" content="2.1.1" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>BIPVN SERVER INFO System</title>

        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">

        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>www/css/tms/main.css" media="all" />

        <input type="hidden" value="<?php echo base_url(); ?>" name="base_url" id="base_url"/>
        <link rel="shortcut icon" href="<?php echo base_url(); ?>www/images/favicon.ico" type="image/ico" />

        <script type="text/javascript" src="<?php echo base_url(); ?>www/common/ckeditorCustom/ckeditor.js"></script>

        <script type="text/javascript" src="<?php echo base_url(); ?>www/js/admin/admin.js"></script>

        <input type="hidden" name="cal_status" id="cal_status" /> 
        <div id="calContainer" style="display:none;position:absolute;z-index:100000"></div>

        <script src="<?php echo base_url(); ?>www/jquery-ui.js/jquery-1.12.4.min.js"></script>
        <script src="<?php echo base_url(); ?>www/jquery-ui/jquery-ui.min.js"></script>
        <link href="<?php echo base_url(); ?>www/jquery-ui/jquery-ui.min.css" rel="stylesheet">
        
        <script type="text/javascript">
            function updatePresentTime(){
                $.get('<?php echo base_url(); ?>SysInfo_Admin/getDateTime').done(function(dateNow){
                    $('#present_date_time').html("Today: " + dateNow);
                });
            }
            setInterval(updatePresentTime, 5000);
        </script>
    </head>

    <body class="yui-skin-sam">

        <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tbody>
                <tr>
                    <td>
                        <table width="100%" cellspacing="0" cellpadding="3" border="0">
                            <tbody>
                                <tr>
                                    <th class="banner" align="left">
                                        <strong>
                                            <a href="<?php echo base_url(); ?>tms" style="color: white">BIPVN</a>
                                        </strong>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="left" class="nav">
                        <table width="100%" cellspacing="0" cellpadding="3">
                            <tbody>
                                <tr>
                                    <td>
                                        | <a href="<?php echo base_url(); ?>SysInfo_Admin/help_view">Help</a>                                                     
                                        | <a href="<?php echo base_url(); ?>SysInfo_Admin/log_view">Log Bugs</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" cellspacing="0" cellpadding="3" border="0">
                            <tbody>
                                <tr>
                                    <td width="100%">Welcome: <?php echo $user_login ?></td>
                                    <td nowrap="nowrap">
                                        <a id = "present_date_time" href="">Today: <?php echo date('Y-m-d H:i:s'); ?></a> |
                                        <a href="<?php echo base_url(); ?>SysInfo_Admin/logout">Logout</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
