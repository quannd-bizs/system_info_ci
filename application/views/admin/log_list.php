<form name="frmsearch" method="POST" action="">
    <table width="100%" cellspacing="1" cellpadding="0" border="0" class="tbl">   
        <tbody>
            <tr style="height: 20px;">
                <th align="center">ID</th>
                <th align="center">Server ID</th>
                <th align="center">CPU %</th>
                <th align="center">Memory %</th>
                <th align="center">Memory Total (Byte)</th>
                <th align="center">Disk%</th>
                <th align="center">Disk Free (Byte)</th>
                <th align="center">DiskIO Utilize %</th>
                <th align="center">Time</th>
                <th colspan="2">Edit</th>
            </tr>
            <!-- begin list TMS-->

            <?php if (isset($data[0])) { ?>
                <?php
                $i = 1;
                foreach ($data as $v) {
                    ?>
                    <tr  class="<?php if ($i % 2 == 0) { ?>filter<?php } ?>">
                        <td><?php echo  $v['id']; ?></td>     
                        <td><?php echo  $v['server_id']; ?></td>     
                        <td><?php echo  $v['cpu']; ?></td>     
                        <td><?php echo  $v['memory_used']; ?></td> 
                        <td><?php echo  $v['memory_total']; ?></td> 
                        <td><?php echo  $v['fullest_disk']; ?></td> 
                        <td><?php echo  $v['fullest_disk_free']; ?></td> 
                        <td><?php echo  $v['disk_io']; ?></td> 
                        
                        <td><?php echo  $v['last_reported_at']; ?></td>                                                        
                        <td align="center">
                            <a href="<?php echo base_url() ?>SysInfo_Admin/log_detail/<?php echo $v['id']; ?>">
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
