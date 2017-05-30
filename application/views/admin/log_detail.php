<?php include 'admin_header.php'; ?>

<table width="100%" cellspacing="1" cellpadding="1" border="0">
    <tbody>
        <tr>
            <td width="42">
                <img border="0" src="<?php echo base_url() ?>www/images/tms/tms_logo.gif"/>
            </td>
            <td align="left" width="100%" nowrap="nowrap"><h1>Growth Management System</h1></td>
            <td>
                <input type="button" onclick="MonterController.log_update_stattus('<?php echo $aryLogs['log_id']; ?>');" value="Fixed" class="button" width="200"/>
            </td>
        </tr>
    </tbody>
</table>

<div id="contents">
    <table width="100%" cellspacing="0" cellpadding="4" border="0" class="tbl">
        <tbody>
            <tr>
                <td align="left" width="98%" valign="top">
                    <div style="text-align: center">
                        <h3><?php echo $aryLogs['title']; ?></h3>
                        <p style="padding: 10px; "><?php echo  nl2br($aryLogs['content']); ?></p>
                    </div>
                    <div style="clear: both"></div>
                    <div style="text-align: center">
                        <input type="button" onclick="history.back(-1);" value="Back" class="button" width="200"/>                        
                    </div>

                </td>
            </tr>
        </tbody>
    </table>



</div>

<?php include 'admin_footer.php'; ?>
        
