
/**
 *
 *  javascript controller
 *
 *  @author: haimv@d-hearts.com
 *  @since: 2012/05  
 */

var firstTimeClickViewGroupTime = 0;

var fragment_width = 60, fragment_height = 60;

var errorUploadFile = 0;

//Huynv added
//2013/08/02
function is_A_Valid_Time(timeString) {
    //return true;
    if (timeString.length != 8)
        return false;
    var pattern = "([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]";
    if (!timeString.match(pattern))
        return false;
    else
        return true;
}
function hhmmss_To_Number(hms) {
    var a = hms.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds;
}
var AdminController = {
    SEARCHING_TEXT: "Downloading.....",
    CANCEL_CONFIRM: 'Do you want to cancel ?',
    DELETE_CONFIRM: 'Are you sure delete this record ?',
    DELETE_FILE_CONFIRM: 'Are you sure delete this file ?',
    IMPORTING_TEXT: 'Importing data....',
    IMPORTING_CONFIRM: 'Are you sure import data from this Excel File ?',
    
    login: function () {
        var base_url = $('#base_url').val();

        if ($('#member_username').val() == '') {
            alert('Input username plz !');
            $('#member_username').focus();
            return;
        } else if ($('#member_password').val() == '') {
            alert('Input Password plz  !');
            $('#member_password').focus();
            return;
        }
        var strPost = {member_username : $('#member_username').val(), member_password : $('#member_password').val()};
        var strUrl = base_url + 'SysInfo_Admin/admin_login/?ajax=1';
        $.post(strUrl, strPost).done(function(strJsonData){
            try {
                var aryData = $.parseJSON(strJsonData);
                if (aryData.intIsOk == 1) {
                    window.location = base_url + 'SysInfo_Admin/';
                } else {
                    alert(aryData.strError);
                    return;
                }
            } catch (e) {
                alert(e.message);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            alert('Sorry ! System Error !');
        });
    },
    log_search: function (orderType, orderField, page) {
        var base_url = $('#base_url').val();

        if (orderField == undefined) {
            orderField = '';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '&orderType=' + orderType + '&orderField=' + orderField;

        var url = base_url + 'SysInfo_Admin/log_search?ajax=1&pageNo=' + page + strPost;
        var form = $('#frmSearch'), from = $('#log_date_from').val(), to = $('#log_date_to').val(), svid = $('#server_id').val();
        var postData = {log_date_from:from, log_date_to: to, server_id: svid};
        
        $('#loading').html('<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>');
        $.post(url, postData).done(function(responseData, textStatus, jqXHR) {
            try {
                var aryData = $.parseJSON(responseData);
                $('#svr_' + svid).html(aryData.html);
                $('#strPaging1').html(aryData.strPaging);
                $('#strPaging2').html(aryData.strPaging);
                $('#loading').html('');
            } catch (e) {
                alert(e.message);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        });
    },
    monitor_list: function (serverId) {
        var base_url = $('#base_url').val();

        if (serverId == undefined) 
        {
            var tabIndex = $('#server_tab').tabs("option", "active");
            var tab = $('.server_tab')[tabIndex];
            serverId = $(tab).attr("value");
        }

        var orderType = 'DESC';
        var orderField = '';
        var page = 1;
        var strPost = '&orderType=' + orderType + '&orderField=' + orderField;

        var url = base_url + 'SysInfo_Admin/monitor_list?ajax=1&pageNo=' + page + strPost;
        var form = $('#frmSearch');
        var from = $('#log_date_from').val();
        var to = $('#log_date_to').val();
//        var svid = $('#server_id').val();
        var postData = {log_date_from:from, log_date_to: to, server_id: serverId};
        
        $('#loading').html('<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>');
        $.post(url, postData).done(function(responseData, textStatus, jqXHR) {
            try {
                var aryData = $.parseJSON(responseData);
                $('#svr_' + serverId).html(aryData.html);
                $('#strPaging1').html(aryData.strPaging);
                $('#strPaging2').html(aryData.strPaging);
                $('#loading').html('');
            } catch (e) {
                alert(e.message);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        });
    }
    
};
