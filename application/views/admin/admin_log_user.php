<?php include 'admin_header.php';?>


<script type="text/javascript">

    function openKCFinder(field) {
        window.KCFinder = {
            callBack: function(url) {
                field.value = url;
                window.KCFinder = null;
            }
        };
        window.open('<?php echo base_url(); ?>www/common/ckeditorCustom/kcfinder/browse.php?type=images&dir=files/public', 'kcfinder_textbox',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
            'resizable=1, scrollbars=0, width=800, height=600'
    );
    }

</script>



<table width="100%" cellspacing="1" cellpadding="1" border="0">
    <tbody>
        <tr>
            <td width="42">
                <img border="0" src="<?php echo base_url(); ?>www/images/tms/tms_logo.gif"/>
            </td>
            <td align="left" width="100%" nowrap="nowrap"><h1>Log User View</h1></td>
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
                                        <td><strong>User Name</strong></td>
                                        <td >
                                            <input type="text" value="" name="user_name" id="user_name" style="width: 200px;"/>
                                        </td>
                                        <td width="7%"><strong>Event Name</strong></td>
                                        <td width="20%">
                                            <select id="action_id" name="action_id">
                                                <option value="0" selected>All</option>
                                                <?php
                                                foreach ($event_name as $key => $value) {
                                                    ?>
                                                    <option value = "<?php echo $key; ?>"  ><?php echo $value; ?></option>
                                                <?php }
                                                ?>
                                             </select>
                                        </td>
                                        <td width="7%"><strong>Range Date</strong></td>
                                        <td width="30%">
                                            <input type="text" value="<?php if(isset($oldCondition['log_date_from']) == true){echo $oldCondition['log_date_from'];}?>" onmouseover="" onclick="" id="log_date_from" name="log_date_from" style="width:55pt;" maxlength="10" />
                                            <img border="0" id="calendar1" src="<?php echo base_url() ?>www/images/tms/cld.gif" style="cursor: pointer;" onclick="CalendarController.showCal(this, 'log_date_from');"/>                                            ~
                                            <input type="text" value="<?php if(isset($oldCondition['log_date_to']) == true){echo $oldCondition['log_date_to'];}?>" onmouseover="" onclick="" id="log_date_to" name="log_date_to" style="width:55pt"maxlength="10"/>
                                            <img border="0" id="calendar2" src="<?php echo base_url() ?>www/images/tms/cld.gif" style="cursor: pointer;" onclick="CalendarController.showCal(this, 'log_date_to');"/>
                                            <!-- SORT BY  -->
                                        </td>
                                    </tr>                                    
                                </tbody>
                            </table>
                        </div>

                        <div class="clearfix"></div>
                        <div align="center">
                            <table align="center">
                                <td><input type="button" onclick="MonterController.searchLogUser();" class="button" value="  Search " name="cmdSearch" style="width: 100px;"/></td>
                                <td><input type="button" onclick="MonterController.exportLogUserToExcel();" class="button" value="  Export to Excel " name="cmdExport" style="width: 120px;"/></td>
                                

                            </table>
                        </div>                            
                    </form>


                    <div id="loading" class="searching-msg"></div>
                    <!-- Begin list tms -->
                    <div id="strPaging1" style="margin: 10px;"></div>
                    <div style="clear: both;padding-top: 10px;"></div>
                    <div id="result">
                        <?php include 'admin_list_group_time.php'; ?>
                    </div>
                    <div style="clear: both"></div>
                    <div id="strPaging2" style="margin: 10px;"></div>
                    <!--  end list tms-->

                </td>
            </tr>
        </tbody>
    </table>



</div>


<script type="text/javascript">
    function openKCFinder_multipleFiles() {
        var base_url = Dom.get('base_url').value;
        window.KCFinder = {};
        window.KCFinder.callBackMultiple = function(files) {
            for (var i; i < files.length; i++) {
                // Actions with files[i] here
                
            }
            window.KCFinder = null;
        };
        window.open(base_url+'www/common/ckeditorCustom/kcfinder/browse.php', 'kcfinder_single');
    }
</script>

<script type="text/javascript" >
    window.onload = function (){
        MonterController.searchLogUser();
    }
</script>


<?php include 'admin_footer.php'; ?>
        
