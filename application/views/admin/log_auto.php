<?php include 'admin_header.php'; ?>
<h1>Set Auto Log Interval</h1>
<div id="select_interval">
<fieldset>
        <legend>Monitor Interval </legend>
        <input type="radio" name="radio-interval" id="radio-1" value = 0>
        <label for="radio-1">Every 1 minute</label><br>
        <input type="radio" name="radio-interval" id="radio-1" value = 1 checked="checked">
        <label for="radio-1">Every 2 minute</label><br>
        <input type="radio" name="radio-interval" id="radio-2" value = 2>
        <label for="radio-2">Every 5 minute</label><br>
        <input type="radio" name="radio-interval" id="radio-3" value = 3>
        <label for="radio-3">Every 10 minute</label><br>
</fieldset>
</div>
<br></br>
<div id=timeInterval display="none" value="120000"></div>
<label>Retrieving Server Info</label><br>
<input id=start type=button value="Stopped"> 
<div id=load></div>

<script type="text/javascript">
    $('#input').checkboxradio();
    // $('#input:radio[name=radio-interval]').checkboxradio();
    var timeOutID;
    $('input:radio[name=radio-interval]').click(function(){
        var log_interval = $(this).val();
        var interval = 60000;
        switch (log_interval) {
        case '1':
            interval *= 2;
            break;
        case '2':
            interval *= 5;
            break;
        case '3':
            interval *= 10;
            break;
        default:
            break;
        }
        $('#timeInterval').attr("value", interval);
    });
    $('#start').click(function(){
        if($(this).val() !=="Stopped"){
           $(this).attr("value", "Stopped");
           window.clearTimeout(timeOutID);
        }else{
           $(this).attr("value", "Starting");
           autoGetInfo();
        }
    });
    function autoGetInfo(){
        var timeInterval = $('#timeInterval').attr("value");
        timeOutID = window.setTimeout(autoGetInfo, timeInterval);
        $('#load').html('Retrieving Server Info!');
        $.get("<?php echo base_url(); ?>systeminfo/savedata").done(function(data){
            if(data === ''){
                $('#load').html("Server Info Loaded!");
            }else{
                $('#load').html("Server Info Not Load! <br>" + data);
            }
        }).fail(function(jxqr, status, thrown){
            console.log(thrown);
        });
    }

</script>
<?php include 'admin_footer.php'; ?>