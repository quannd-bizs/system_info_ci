<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta name="Description" content="" />
        <meta name="Version" content="2.1.1" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta content="utf-8" http-equiv="encoding"/>
        
        <title>Login</title>

        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/assets/skins/sam/container.css" media="screen"/>
        <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/yahoo-dom-event/yahoo-dom-event.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/json/json-min.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/connection/connection-min.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/container-min.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>www/js/common/yui2.8.2/container/container_core-debug.js"></script>

        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>www/css/tms/main.css" media="all" />

        <input type="hidden" value="<?php echo base_url() ?>" name="base_url" id="base_url"/>
        <link rel="shortcut icon" href="<?php echo base_url() ?>www/images/favicon.ico" type="image/ico" />
        <script type="text/javascript" src="<?php echo base_url() ?>www/js/monter/monter.js"></script>
    </head>

    <body class="yui-skin-sam">
        <div id="wraped" style="margin: 100px;">
            <form name="frmLogin" id="frmLogin" action="" method="post">
                <table align="center" width="250" cellspacing="0" cellpadding="6" border="0" class="std">

                    <tbody>
                        <tr>
                            <th colspan="2" align="center">
                                <em style="color: #ffffff">Server Information System login </em>
                            </th>
                        </tr>
                        <tr>
                            <td align="right" nowrap="">Username:</td>
                            <td align="left" nowrap="">
                                <input type="text" class="text" name="member_username" id="member_username" maxlength="255" size="25"/>
                            </td>
                        </tr>
                        <tr>
                            <td align="right" nowrap="">Password:</td>
                            <td align="left" nowrap="">
                                <input type="password" class="text" name="member_password" id="member_password" maxlength="32" size="25"/>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="bottom" nowrap="" >
                                <input type="button" class="button" value="login" name="login" onclick="AdminController.login();"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div align="center">
                    <span style="font-size:7pt">Version 1.0</span>
                </div>
            </form>
        </div>
    </body>
    <div id="CommonOverlay" style="display:none;"></div>
</html>

<script type="text/javascript">

    function displayunicode(e){
        var unicode=e.keyCode? e.keyCode : e.charCode
        if(unicode == 13){
            AdminController.login();
        }
    }

    document.onkeypress=displayunicode
</script>


