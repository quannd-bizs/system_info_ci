
<?php if ($totalRecord > 0) { ?>
    <table cellpadding="0" cellspacing="0" border="0" align="right">
        <tr valign="middle">
            <td align="right">
                <?php echo $totalRecord; ?> Records <?php echo $recordFirst; ?> - <?php echo $recordLast; ?> Displaying
            </td>
            <td>&nbsp;</td>
            <td>
                <img class="cpointer" src="<?php echo base_url() ?>www/images/common/paging/btn_first<?php if ($pageIndex == 1) { ?>_off<?php } ?>.png" <?php if ($pageIndex > 1) { ?> onclick="AdminController.log_search('','',1);" <?php } ?> />
                <img class="cpointer" src="<?php echo base_url() ?>www/images/common/paging/btn_prev<?php if ($recordFirst == 1) { ?>_off<?php } ?>.png" <?php if ($pageIndex > 1) { ?> onclick="AdminController.log_search('','',<?php echo ($pageIndex - 1) ?>);" <?php } ?> />
                <img class="cpointer" src="<?php echo base_url() ?>www/images/common/paging/btn_next<?php if ($recordLast == $totalRecord) { ?>_off<?php } ?>.png" <?php if ($pageIndex < $totalPage) { ?> onclick="AdminController.log_search('','',<?php echo ($pageIndex + 1) ?>);" <?php } ?> />
                <img class="cpointer" src="<?php echo base_url() ?>www/images/common/paging/btn_last<?php if ($pageIndex == $totalPage) { ?>_off<?php } ?>.png" <?php if ($pageIndex < $totalPage) { ?> onclick="AdminController.log_search('','',<?php echo $totalPage ?>);" <?php } ?> />
            </td>
            <td>&nbsp;</td>
            <td align="right">
                &nbsp; <?php echo $pageIndex; ?> / <?php echo $totalPage; ?> Pages
            </td>
        </tr>
    </table>
<?php } ?>
