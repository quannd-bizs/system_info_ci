         <table width="100%" cellspacing="1" cellpadding="0" border="0" class="tbl">   
            <tbody>
                <tr style="height: 20px;">
                    <th align="center">ID</th>
    <!--                <th align="center">Server ID</th>-->
                    <th align="center">Status</th>
                    <th align="center">CPU %</th>
                    <th align="center">Memory %</th>
                    <th align="center">Memory Used (MB)</th>
                    <th align="center">Memory Total (MB)</th>
                    <th align="center">Disk%</th>
                    <th align="center">Disk Free (MB)</th>
                    <th align="center">DiskIO Utilize %</th>
                    <th align="center">Date</th>
                    <th align="center">Time</th>
                </tr>
            <?php if (isset($data[0])) { ?>
                <?php
                $i = 1;
                foreach ($data as $v) {
                    ?>
                    <tr  class="<?php if ($i % 2 == 0) { ?>filter<?php } ?>">
                        <td><?php echo $v['id']; ?></td>     
                        <td  align="center"><img src ="../../www/images/common/signal/<?php echo $v['health_status'].'.png"'; ?>/></td>     
                        <td><?php echo $v['cpu']; ?></td>     
                        <td><?php echo $v['memory']; ?></td> 
                        <td><?php echo $v['memory_used']; ?></td> 
                        <td><?php echo $v['memory_total']; ?></td> 
                        <td><?php echo $v['fullest_disk']; ?></td> 
                        <td><?php echo $v['fullest_disk_free']; ?></td> 
                        <td><?php echo $v['disk_io']; ?></td> 
                        <td><?php echo $v['date']; ?></td>
                        <td><?php echo $v['time']; ?></td>
                    </tr>
                    <?php $i++; ?>            
                <?php } ?>

            <?php } else { ?>
                <tr><td colspan="15" align="center" style="height: 20px;"> No Data !</td></tr>
            <?php } ?>
     </tbody>
        </table>
        <div style="clear: both"></div>
    <table align="center"> <tr align="center" valign="middle"></tr> </table>