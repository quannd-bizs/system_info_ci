<?php include 'admin_header.php'; ?>

<table width="100%" cellspacing="1" cellpadding="1" border="0">
    <tbody>
        <tr>
            <td width="42">
                <img border="0" src="<?php echo base_url() ?>www/images/tms/tms_logo.gif"/>
            </td>
            <td align="left" width="100%" nowrap="nowrap"><h1>Logs Management System</h1></td>            
        </tr>
    </tbody>
</table>

<div id="contents">
    <table width="100%" cellspacing="0" cellpadding="4" border="0" class="tbl">
        <tbody>
            <tr>
                <td align="left" width="98%" valign="top">

                    <form style="margin:0px" action="" method="POST" id="FrmSearch" name="FrmSearch">
                        <div class="condition" style="">
                            <table align="center" width="100%" cellspacing="0" cellpadding="3" border="0">
                                <tbody>
                                    <tr>
                                        <td width="10%"><strong>Server ID</strong></td>
                                        <td width="10%">
                                            <input type="text" value="" name="server_id" id="server_id" style="width: 200px;"/>
                                        </td>
                                        
                                        <td width="7%"><strong>Range Date</strong></td>
                                        <td width="30%">
                                            <input type="text" value="<?php if(isset($aryCondition['log_date_from']) == true){echo $oldCondition['log_date_from'];}?>" onmouseover="" onclick="" id="log_date_from" name="log_date_from" style="width:55pt;" maxlength="10" />
                                            <img border="0" id="calendar1" src="<?php echo base_url() ?>www/images/tms/cld.gif" style="cursor: pointer;" onclick="CalendarController.showCal(this, 'log_date_from');"/>
                                            ~
                                            <input type="text" value="<?php if(isset($aryCondition['log_date_to']) == true){echo $oldCondition['log_date_to'];}?>" onmouseover="" onclick="" id="log_date_to" name="log_date_to" style="width:55pt"maxlength="10"/>
                                            <img border="0" id="calendar2" src="<?php echo base_url() ?>www/images/tms/cld.gif" style="cursor: pointer;" onclick="CalendarController.showCal(this, 'log_date_to');"/>
                                        </td>
                                    </tr>                                    
                                </tbody>
                            </table>
                        </div>

                        <div class="clearfix"></div>
                        <div align="center">
                            <table align="center">
                                <td><input type="button" onclick="AdminController.log_search();" class="button" value="  Search " name="cmdSearch" style="width: 100px;"/></td>
                            </table>
                        </div>                            
                    </form>


                    <div id="loading" class="searching-msg"></div>
                    <!-- Begin list tms -->
                    <div id="strPaging1" style="margin: 10px;"></div>
                    <div style="clear: both;padding-top: 10px;"></div>
                    <div id="result">
                        <?php include 'log_list.php'; ?>
                    </div>
                    <div style="clear: both"></div>
                    <div id="strPaging2" style="margin: 10px;"></div>
                    <!--  end list tms-->

                </td>
            </tr>
        </tbody>
    </table>



</div>
<script type="text/javascript" src="<?php echo base_url() ?>www/js/common/jquery/jquery-3.2.1.min.js"></script>
<script type="text/javascript" >
    window.onload = AdminController.log_search();
//var url = '<?php // echo base_url() . 'sysinfo_admin/log_search';?>';
//    window.onload = $.post(url,  function (data) {
//        try {
//            var aryData = $.parseJSON(data);
//            $('#result').html = aryData.html;
//            $('#strPaging1').html = aryData.strPaging;
//            $('#strPaging2').html = aryData.strPaging;
//            $('#loading').html = '';
//
//        } catch (e) {
//            alert(e.message);
//        }
//    });
    /*function log_search(orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = '';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/log_search/?ajax=1&pageNo=' + page;
        
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.log_search_success,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    }
    function log_search_success (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    }
     //return false when request    
    function asyncRequestFalse() {
        alert('Sorry ! System Error !');
    }*/
</script>


<?php include 'admin_footer.php'; ?>
        
