<form name="frmsearch" method="POST" action="">
    <table width="100%" cellspacing="1" cellpadding="0" border="0" class="tbl">   
        <tbody>
            <tr style="height: 20px;">
                <th align="center">ID</th>
                <th align="center">TypeOS</th>
                <th align="center">Device</th>
                <th align="center">Status</th>
                <th align="center">User</th>
                <th align="center">Title</th>
                <th align="center">Date</th>
                <th colspan="2"></th>
            </tr>
            <!-- begin list TMS-->

            <?php if (isset($data[0])) { ?>
                <?php
                $i = 1;
                foreach ($data as $v) {
                    ?>
                    <tr  class="<?php if ($i % 2 == 0) { ?>filter<?php } ?>">
                        <td><?php echo  $v['log_id']; ?></td>
                        <td><?php echo  $v['type_os']; ?></td>
                        <td><?php echo  $v['device']; ?></td>
                        <td><?php echo  $v['status']; ?></td> 
                        <td><?php echo  $v['user_id']; ?></td>
                        <td>
                            <a href="<?php echo base_url() ?>monter_admin/log_detail/<?php echo $v['log_id']; ?>">
                                <?php echo  $v['title']; ?>
                            </a>
                        </td>
                        <td><?php echo  $v['log_date']; ?></td>                                                        
                        <td align="center">
                            <a href="<?php echo base_url() ?>monter_admin/log_detail/<?php echo $v['log_id']; ?>">
                                <img src="<?php echo base_url() ?>www/images/common/icon-edit.gif"/>
                            </a>
                        </td>
                    </tr>
                    <?php $i++; ?>            
                <?php } ?>

            <?php } else { ?>
                <tr><td colspan="15" align="center" style="height: 20px;"> No Data !</td></tr>
            <?php } ?>
            <!-- End list TMS-->
        </tbody>
    </table>
    <div style="clear: both"></div>
    <div id="strPaging2" style="margin: 10px;"></div><br/>
    <table align="center">
        <tr align="center" valign="middle"></tr>
    </table>

</form>
