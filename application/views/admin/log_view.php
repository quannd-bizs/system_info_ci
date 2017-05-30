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
                                        <td width="10%"><strong>Log Title</strong></td>
                                        <td width="10%">
                                            <input type="text" value="" name="title" id="title" style="width: 200px;"/>
                                        </td>
                                        
                                        <td width="7%"><strong>Range Date</strong></td>
                                        <td width="30%">
                                            <input type="text" value="<?php if(isset($oldCondition['log_date_from']) == true){echo $oldCondition['log_date_from'];}?>" onmouseover="" onclick="" id="log_date_from" name="log_date_from" style="width:55pt;" maxlength="10" />
                                            <img border="0" id="calendar1" src="<?php echo base_url() ?>www/images/tms/cld.gif" style="cursor: pointer;" onclick="CalendarController.showCal(this, 'log_date_from');"/>
                                            ~
                                            <input type="text" value="<?php if(isset($oldCondition['log_date_to']) == true){echo $oldCondition['log_date_to'];}?>" onmouseover="" onclick="" id="log_date_to" name="log_date_to" style="width:55pt"maxlength="10"/>
                                            <img border="0" id="calendar2" src="<?php echo base_url() ?>www/images/tms/cld.gif" style="cursor: pointer;" onclick="CalendarController.showCal(this, 'log_date_to');"/>
                                            <!-- SORT BY  -->
                                        </td>
                                        
                                        <td width="3%"><strong>Os</strong></td>
                                        <td width="10%">
                                            <select style="width:100px" class="SmallCombo" name="device" id="device">
                                                <option value="">All</option>
                                                <option value="1">Android</option>
                                                <option value="2">iPhone</option>
                                            </select>
                                        </td>
                                        <td width="4%"><strong>Status</strong></td>
                                        <td width="10%">
                                            <select style="width:100px" class="SmallCombo" name="status" id="status">
                                                <option value="">All</option>
                                                <option value="1">not fix</option>
                                                <option value="2">Fixed</option>
                                            </select>
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
<script type="text/javascript" >
    window.onload = function (){
        AdminController.log_search();
    }
</script>


<?php include 'admin_footer.php'; ?>
        
