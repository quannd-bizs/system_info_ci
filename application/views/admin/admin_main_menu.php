<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en" xml:lang="en">
    <head>
        <meta name="Description" content="Default Style" />
        <meta name="Version" content="2.1.1" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>BIPVN - SYSTEM</title>
        <style type="text/css" >
            body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td{word-wrap: break-word;margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}q:before,q:after{content:''}abbr,acronym{border:0}hr{display:none}address{display:inline}strong.bbc{font-weight:bold !important}em.bbc{font-style:italic !important}span.bbc_underline{text-decoration:underline !important}div.bbc_center{text-align:center}div.bbc_left{text-align:left}div.bbc_right{text-align:right}div.bbc_indent{margin-left:50px}del.bbc{text-decoration:line-through !important}ul.bbc{list-style:disc outside;margin-left:30px}ul.bbc
            ul.bbc{list-style-type:circle}ul.bbc ul.bbc
            ul.bbc{list-style-type:square}ol.bbc{list-style:decimal outside;margin-left:30px}ol.bbc
            ol.bbc{list-style-type:lower-roman}hr.bbc{display:block;border-top:2px solid #777}div.bbc_spoiler{}div.bbc_spoiler
            span{font-weight:bold}div.bbc_spoiler_wrapper{border:1px
                                                              inset #777;padding:4px}div.bbc_spoiler_content{}input.bbc_spoiler_show{width:45px;font-size: .7em;margin:0px;padding:0px}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td{margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}address,caption,cite,code,dfn,th,var{font-style:normal;font-weight:normal}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}q:before,q:after{content:''}abbr,acronym{border:0}hr{display:none}address{display:inline}body{background:#fff;color:#192b40;font:normal 12px arial,verdana,tahoma,sans-serif;position:relative}h3,h4,h5,h6,strong{font-weight:bold}em{font-style:italic}img,.input_check,.input_radio{vertical-align:middle}legend{display:none}table{width:100%}td{padding:3px}

            body a:hover{text-decoration:underline }.cancel{color:#ad2930;font-size:90%;font-weight:bold}
            h2.secondary{background:#becbdb;color:#1d3652;text-shadow:none}
            h2.secondary a{color:#1d3652}

            body {
                background: url("<?php echo base_url(); ?>www/images/monter/bg.png") repeat scroll 0 0 #EFEFEF;
            }
            #select_city_box {
                width: 100%;
                text-align: center;
                margin: 100px auto;
                position: absolute;
                z-index: 99999;
            }

            #select_city_box_content {
                margin: 0 auto;
                width: 50%;
                background-color: #fff;
                border: 1px #fff solid;
                padding-bottom: 5px;
                border-radius: 5px;
                -moz-border-radius: 5px;
            }

            #select_city_box_content h2.title {
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                padding: 10px 0px;
                background: white url(<?php echo base_url(); ?>www/images/monter/rongbay-btn.png) repeat-x 0px -1569px;

                color: #fff;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                -moz-border-top-left-radius: 5px;
                -moz-border-top-right-radius: 5px;

            }

            #select_city_box_content ul {
                margin-top: 10px;
            }

            #select_city_box_content ul li a {
                background: white url(<?php echo base_url(); ?>www/images/monter/rongbay-split.png) repeat-x 0px -388px;
                border: 1px #d8d8d8 solid;
                border-radius: 5px;
                -moz-border-radius: 5px;
                display: block;
                padding: 8px 5px;
                margin: 5px 10px;
                color: #333;
                text-decoration: none;
            }

            #select_city_box_content ul li a:hover {
                text-decoration: none;
                background: #e2e2e2;
            }

            #select_city_box_content #st-in-so {
                margin: 10px;
            }
        </style>
    </head>

    <div id="select_city_box">
        <div id="select_city_box_content">
            <h2 class="title">BIPVN SYSTEM</h2>
            <ul>
                <li><a href="<?php echo base_url(); ?>SysInfo_Admin/help_view/">HELP</a></li>
                <li><a href="<?php echo base_url(); ?>SysInfo_Admin/log_view/">LOGS MANAGEMENT</a></li>
            </ul>
        </div>
    </div>
</html>