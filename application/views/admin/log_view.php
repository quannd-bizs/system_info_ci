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
                                        <td width="10%"  style="width: 70px;">  <strong>Server ID</strong> </td>
                                <td>
                                    <select id="server_id" name="server_id" value ='' width="10%" onchange="selectServerId(this)">
                                    <?php foreach($arrayServerId as $value) { ?>
                                        <option value=<?php echo $value['server_id'] . " selected = " . (($value['select']==true)? "selected" : "") ?> > <?php echo $value['name'] ?></option>
                                    <?php } ?>
                                    </select>
                                </td>
                                <td width = "7%"><strong>Range Date</strong></td>
                                <td width = "30%">
                                    <input type = "text" value = "<?php
                                    if (isset($oldCondition['log_date_from']) == true) {
                                        echo $oldCondition['log_date_from'];
                                    }
                                    ?>" onmouseover = "" onclick = "" id = "log_date_from" name = "log_date_from" style = "width:55pt;" maxlength = "10" />
                                    <img border = "0" id = "calendar1" src = "<?php echo base_url() ?>www/images/tms/cld.gif" style = "cursor: pointer;" onclick = "CalendarController.showCal(this, 'log_date_from');"/>
                                    ~
                                    <input type = "text" value = "<?php
                                    if (isset($oldCondition['log_date_to']) == true) {
                                        echo $oldCondition['log_date_to'];
                                    }
                                    ?>" onmouseover = "" onclick = "" id = "log_date_to" name = "log_date_to" style = "width:55pt"maxlength = "10"/>
                                    <img border = "0" id = "calendar2" src = "<?php echo base_url() ?>www/images/tms/cld.gif" style = "cursor: pointer;" onclick = "CalendarController.showCal(this, 'log_date_to');"/>
                                </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class = "clearfix"></div>
                        <div align = "center">
                            <table align = "center">
                                <td><input type = "button" onclick = "AdminController.log_search()" class = "button" value = "  List All " name = "cmdSearch" style = "width: 100px;"/></td>
                           
                                <td><input type = "button" onclick = "AdminController.monitor_list()" class = "btn_monitor_list" value = "  Monitor List " name = "monitor_list" style = "width: 100px;"/></td>
                            </table>
                        </div>
                    </form>


                    <div id = "loading" class = "searching-msg"></div>
                    <!--Begin list tms -->
                    <div id = "strPaging1" style = "margin: 10px;"></div>
                    <div style = "clear: both;padding-top: 10px;"></div>
        
                <div id = "result">
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
//    $('#server_id').click(selectServerId(this));
    function selectServerId(select){
        $('#server_id').attr('value', select.selectedOptions[0].value);
        AdminController.monitor_list();
    }
    window.onload = AdminController.monitor_list();
</script>


<?php include 'admin_footer.php'; ?>
        
