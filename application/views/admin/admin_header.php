<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en" xml:lang="en">
    <head>
        <meta name="Description" content="Default Style" />
        <meta name="Version" content="2.1.1" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>BIPVN SERVER INFO System</title>

        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
            <meta content="utf-8" http-equiv="encoding">



                <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/assets/skins/sam/container.css" media="screen"/>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/yahoo-dom-event/yahoo-dom-event.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/json/json-min.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/connection/connection-min.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/container-min.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/container_core-debug.js"></script>
                <script type="text/javascript" src="<?php echo base_url() ?>www/js/common/calendar.js"></script>
                <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>www/js/common/yui2.8.2/calendar/assets/skins/sam/calendar.css" media="all" />

                <script type="text/javascript" src="<?php echo base_url() ?>www/js/common/calendar-min.js"></script>

                <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>www/css/tms/main.css" media="all" />


                <script type="text/javascript" src="<?php echo base_url() ?>www/js/monter/jquery-1.6.4.min.js"></script>
                <link rel="stylesheet"  type="text/css" href="<?php echo base_url(); ?>www/js/monter/forms.css">
                    <script type="text/javascript" src="<?php echo base_url() ?>www/js/monter/forms.js"></script>

                    <input type="hidden" value="<?php echo base_url(); ?>" name="base_url" id="base_url"/>
                    <link rel="shortcut icon" href="<?php echo base_url() ?>www/images/favicon.ico" type="image/ico" />

                    <script type="text/javascript" src="<?php echo base_url() ?>www/common/ckeditorCustom/ckeditor.js"></script>

                    <script type="text/javascript" src="<?php echo base_url() ?>www/js/monter/monter.js"></script>

                    <input type="hidden" name="cal_status" id="cal_status" />
                    <div id="calContainer" style="display:none;position:absolute;z-index:100000"></div>


                    <link rel="stylesheet" href="<?php echo base_url(); ?>www/lightbox/lightbox.css" type="text/css" media="screen" />
                    <script type="text/javascript" src="<?php echo base_url(); ?>www/lightbox/jquery-1.7.2.min.js"></script>
                    <script type="text/javascript" src="<?php echo base_url(); ?>www/lightbox/lightbox.js"></script>
                    <script type="text/javascript" src="<?php echo base_url(); ?>www/lightbox/jquery-ui-1.8.18.custom.min.js"></script>
                    <script type="text/javascript" src="<?php echo base_url(); ?>www/lightbox/jquery.smooth-scroll.min.js"></script>
                    <script >
                        jQuery(document).ready(function ($) {
                            $('a').smoothScroll({
                                speed: 1000,
                                easing: 'easeInOutCubic'
                            });

                            $('.showOlderChanges').on('click', function (e) {
                                $('.changelog .old').slideDown('slow');
                                $(this).fadeOut();
                                e.preventDefault();
                            })
                        });

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
                                                            <a href="<?php echo base_url() ?>tms" style="color: white">BIPVN</a>
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
                                                        | <a href="<?php echo base_url() ?>SysInfo_Admin/help_view">Help</a>                                                     
                                                        | <a href="<?php echo base_url() ?>SysInfo_Admin/log_view">Log Bugs</a>
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
                                                        <!--                                        <a href="#">Help</a> |
                                                                                                <a style="cursor: pointer;" onclick="">My Info</a> |
                                                                                                <b><a href="">MyTask</a></b> |
                                                                                                <a href="">Today</a> |-->
                                                        <a href="<?php echo base_url() ?>SysInfo_Admin/logout">Logout</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
