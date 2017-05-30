<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en" xml:lang="en">
    <head>
        <meta name="Description" content="Default Style" />
        <meta name="Version" content="2.1.1" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>D-Hearts Monter Management System</title>

        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
            <meta content="utf-8" http-equiv="encoding">



                <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/assets/skins/sam/container.css" media="screen"/>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/yahoo-dom-event/yahoo-dom-event.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/json/json-min.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/connection/connection-min.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/container-min.js"></script>
                <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/container_core-debug.js"></script>
                <script type="text/javascript" src="<?php echo base_url() ?>www/js/common/jquery/jquery-1.6.1.min.js"></script>
                <script type="text/javascript" src="<?php echo base_url() ?>www/js/common/calendar.js"></script>
                <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>www/js/common/yui2.8.2/calendar/assets/skins/sam/calendar.css" media="all" />

                <script type="text/javascript" src="<?php echo base_url() ?>www/js/common/calendar-min.js"></script>

                <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>www/css/tms/main.css" media="all" />


                <script type="text/javascript" src="<?php echo base_url() ?>www/js/monter/jquery-1.6.4.min.js"></script>
                <link rel="stylesheet"  type="text/css" href="<?php echo base_url(); ?>www/js/monter/forms.css">
                    <script type="text/javascript" src="<?php echo base_url() ?>www/js/monter/forms.js"></script>

                    <input type="hidden" value="<?php echo base_url(); ?>" name="base_url" id="base_url"/>
                    <link rel="shortcut icon" href="<?php echo base_url() ?>www/images/favicon.ico" type="image/ico" />

<!--            <script type="text/javascript" src="<?= base_url() ?>www/js/my_admin/ckeditor/ckeditor.js"></script>-->

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
                        jQuery(document).ready(function($) {
                            $('a').smoothScroll({
                                speed: 1000,
                                easing: 'easeInOutCubic'
                            });

                            $('.showOlderChanges').on('click', function(e){
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
                                                            <a href="<?php echo base_url() ?>tms" style="color: white">DHearts VN</a>
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
                                                        <a href="<?php echo base_url() ?>monter_admin/stage_category_view">Stage Category</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/stage_view">Stage</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/stage_battle_view">Stage Battle</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/mobamon_view">Mobamon</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/skill_view">Skill</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/pass_skill_view">Pass Skill</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/fragment_view">Fragment</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/growth_view">Growth</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/news_view">News</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/user_news_view">User News</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/import_view">Data Management</a>                                        
<!-- Mieng Comment                                      | <a href="<?php echo base_url() ?>monter_admin/images_management_view">FileManagement</a>-->
                                                        | <a href="<?php echo base_url() ?>monter_admin/gacha_banner_load_update">Gacha Banner</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/help_view">Help</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/topics_view">Topics</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/push_service">PushService</a>
                                                        | <a href="<?php echo base_url() ?>monster_report/index">Report</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/mobamon_add_ranking_bonus">RankingBonus</a>                                                        
                                                        | <a href="<?php echo base_url() ?>monter_admin/log_view">Log Bugs</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/present_code_view">Present Code</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/option">Option</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/group_time_view">Group Time</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/log_user_view">Log Users Action</a>
                                                        | <a href="<?php echo base_url() ?>monter_admin/list_user_need_log_view">List Users Need Log</a>

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
                                                        <a href="<?php echo base_url() ?>monter_admin/logout">Logout</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
