
/**
 *
 *  javascript controller
 *
 *  @author: haimv@d-hearts.com
 *  @since: 2012/05  
 */
var Connect = YAHOO.util.Connect,
    Panel = YAHOO.widget.Panel,
    KeyListener = YAHOO.util.KeyListener,
    Event = YAHOO.util.Event,
    Dom = YAHOO.util.Dom,
    Json = YAHOO.lang.JSON;

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
    showCommonOverlay: function () {

        AdminController.overlayCommon = new YAHOO.widget.Panel('CommonOverlay',
                {
                    fixedcenter: true,
                    constraintoviewport: true,
                    underlay: "none",
                    close: true,
                    visible: false,
                    draggable: true,
                    modal: true,
                    width: "100%",
                    zIndex: 255
                });
        //Bind key to close overlay
        var kt = new KeyListener(document,
                {
                    keys: 27
                },
                {
                    fn: AdminController.closeOverlay,
                    scope: AdminController.overlayCommon,
                    correctScope: true
                },
                "keyup");

        AdminController.overlayCommon.cfg.setProperty("keylisteners", kt);
        // Render the Dialogs
        AdminController.overlayCommon.render(document.body);
        AdminController.overlayCommon.center();
        AdminController.overlayCommon.cfg.setProperty("y", 14);

        document.getElementById('CommonOverlay').style.display = '';
        AdminController.overlayCommon.show();
        var buttonClose = Dom.getElementsByClassName('container-close', 'span');
        YAHOO.util.Event.addListener(buttonClose, "click", AdminController.checkFileError);
    },
    closeOverlay: function () {
        if (confirm(AdminController.CANCEL_CONFIRM)) {
            AdminController.overlayCommon.hide();
            if (errorUploadFile == 1) {
                location.reload(true);
            }
        }
    },
    //Huynv add 2013/07/31
    showStageCatGroupTime: function () {

        AdminController.overlayCommonGT = new YAHOO.widget.Panel('StageCatGroupTime',
                {
                    fixedcenter: true,
                    constraintoviewport: true,
                    underlay: "none",
                    close: true,
                    visible: false,
                    draggable: true,
                    modal: true,
                    width: "100%",
                    zIndex: 255
                });



        // Render the Dialogs
        AdminController.overlayCommonGT.render(document.body);
        AdminController.overlayCommonGT.center();


        document.getElementById('StageCatGroupTime').style.display = '';
        AdminController.overlayCommonGT.show();
        //var buttonClose = Dom.getElementsByClassName('container-close', 'span');
        //YAHOO.util.Event.addListener(buttonClose, "click", AdminController.checkFileError);
    },
    //Huynv added 2013/07/13        
    closeStageCatGroupTime: function () {
        //if( confirm(AdminController.CANCEL_CONFIRM)){
        AdminController.overlayCommonGT.hide();
        if (errorUploadFile == 1) {
            location.reload(true);
        }
        //}
    },
    checkFileError: function () {
        if (errorUploadFile == 1) {
            location.reload(true);
        }
    },
    //return false when request    
    asyncRequestFalse: function () {
        alert('Sorry ! System Error !');
    },
    //Huynv added 23-08-2013
    exportLogUserToExcel: function () {
        //alert("Done Report1");
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/export_log_user_to_excel/?user_name=' + document.getElementById('user_name').value + '&log_date_from=' + document.getElementById('log_date_from').value + '&log_date_to=' + document.getElementById('log_date_to').value;
        strUrl += '&action_id=' + document.getElementById('action_id').value;
        var strPost = '';
//        YAHOO.util.Connect.setForm('FrmSearch');
//        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
//            success: AdminController.exportLogUserToExcelSuccess,
//            failure: AdminController.asyncRequestFalse
//        },strPost);
        window.open(strUrl);
        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    //Huynv added 23/08/2013
    exportLogUserToExcelSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        alert(strJsonData);
        try {
            alert("ok");
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
        } catch (e) {
            //alert("ok");
            alert(e.message);
        }
    },
    //Huynv added 08-08-2013
    searchLogUser: function (orderType, orderField, page, contSearchFilter) {

        var base_url = Dom.get('base_url').value;

        if (orderField == undefined || contSearchFilter != undefined) {
            orderField = 'log_user_id';//'log_user_id';
        }

        if (contSearchFilter == undefined) {
            contSearchFilter = '';
        } else {
            $("#user_name").val(contSearchFilter);
        }

        if (orderType == undefined || orderType == '') {
            //orderType = 'DESC';
            orderType = 'ASC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
//        strPost+= 'orderType='+orderType+'&orderField='+orderField;
        strPost += 'orderType=' + orderType + '&orderField=' + orderField + '&contSearchFilter=' + contSearchFilter;

        var strUrl = base_url + 'SysInfo_Admin/search_log_user/?ajax=1&pageNo=' + page;
        //alert(strUrl);
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.searchLogUserSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 08/08/2013
    searchLogUserSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            //alert(strJsonData);
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            //alert("ok");
            alert(e.message);
        }
    },
    //Huynv added 11-09-2013,//search user and add to list follow
    searchUserToAddListLog: function (orderType, orderField, page) {

        var base_url = Dom.get('base_url').value;
        if (document.getElementById("user_name").value == "") {
            alert('input user name!');
            document.getElementById("user_name").focus();
            return;
        }

        if (orderField == undefined) {
            orderField = 'user_id';
            //'log_user_id';
        }
        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/search_user_to_add_list_log/?user_name=' + document.getElementById("user_name").value;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            success: AdminController.searchUserToAddListLogSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 11/09/2013
    searchUserToAddListLogSuccess: function (xmlhttp) {
        //console.log("vao day");
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        //return;
        try {
            //console.log("vao day1 "+strJsonData);
            //var aryData = Json.parse(strJsonData);
            //Dom.get('listUserToAdd').innerHTML = aryData;
            $('#listUserToAdd').html('');
            $('#listUserToAdd').append('<form id=\"frmUserListToLog\" name=\"frmUserListToLog\" enctype=\"multipart/form-data\" method=\"POST\" action=\"\">');
            $('#listUserToAdd').append('<table width=\"100%\" cellspacing=\"1\" cellpadding=\"0\" border=\"0\" class=\"tbl\">');
            $('#listUserToAdd').append('<tr><th align=\"center\">check all:<input type=\"checkbox\" name=\"chkAll\" value=\"\" onclick=\"AdminController.checkAllUserList(this);\"></th><th align=\"center\">user id</th><th align=\"center\">user name</th><th align=\"center\">coin</th><th align=\"center\">stone</th><th align=\"center\">stone present</th><th align=\"center\">point</th><th align=\"center\">item staminar</th><th align=\"center\">item count</th><th align=\"center\">item hp</th><th align=\"center\">ranking</th><th align=\"center\">rank</th><th align=\"center\">user_exp</th><tr>')
            var rs = '{"rs":' + strJsonData + '}';
            //console.log("vao day2");
            //alert(doing);
            var json_parsed = $.parseJSON(rs);
            for (var u = 0; u < json_parsed.rs.length; u++) {
                var user = json_parsed.rs[u];
                $('#listUserToAdd').append('<tr><td><input type=\"checkbox\" id=\"chk[]\" name=\"chk[]\" value=\"' + user.user_id + '\">&nbsp;</td><td>' + user.user_id + '</td><td>' + user.user_name + '</td><td>' + user.coin + '</td><td>' + user.stone + '</td><td>' + user.stone_present + '</td><td>' + user.point + '</td><td>' + user.item_staminar + '</td><td>' + user.item_count + '</td><td>' + user.item_hp + '</td><td>' + user.ranking + '</td><td>' + user.rank + '</td><td>' + user.user_exp + '</td></tr>');
            }
            $('#listUserToAdd').append('<tr><td colspan=11><input type=button onclick=\"AdminController.addUserCheckedToListLog();\" value=\"add to log list\"><input type=button onclick=\"AdminController.closeListUserToLog();\" value=\"close\"></td></tr>');
            $('#listUserToAdd').append('</table><input type=\"hidden\" id=\"listUserNeedToLog\" value=\"\">');
            $('#listUserToAdd').append('</form>');

            Dom.get('loading').innerHTML = '';
        } catch (e) {
            alert(e.message);
        }
    },
    closeListUserToLog: function () {
        $('#listUserToAdd').html('');
    },
    //Huynv added: 12/09/203, onkeypress="return AdminController.checkAndSearchUserList(event);"  cho vao o user_name
    //Hien chua chay duoc, need develop        
    checkAndSearchUserList: function (e) {
        //alert(e.keyCode);
        if (e.keyCode === 13) {
            AdminController.searchUserToAddListLog(null, null, null);
        }
    },
    //Huynv added 12-09-2013,//search user and add to list follow
    top100UserRankingToLog: function (orderType, orderField, page) {

        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = 'user_id';
            //'log_user_id';
        }
        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/search_top100_user_ranking_to_log/?top=' + page;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            success: AdminController.top100UserRankingToLogSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 12/09/2013, tìm top 100 user
    top100UserRankingToLogSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        //return;
        var i = 0;
        try {
            //var aryData = Json.parse(strJsonData);
            //Dom.get('listUserToAdd').innerHTML = aryData;
            $('#listUserToAdd').html('');
            $('#listUserToAdd').append('<form id=\"frmUserListToLog\" name=\"frmUserListToLog\" enctype=\"multipart/form-data\" method=\"POST\" action=\"\" >');
            $('#listUserToAdd').append('<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"1\" class=\"tbl\" bgcolor=black>');
            $('#listUserToAdd').append('<tr><th align=\"center\">check all:<input type=\"checkbox\" name=\"chkAll\" value=\"\" onclick=\"AdminController.checkAllUserList(this);\"></th><th align=\"center\">user id</th><th align=\"center\">user name</th><th align=\"center\">coin</th><th align=\"center\">stone</th><th align=\"center\">stone present</th><th align=\"center\">point</th><th align=\"center\">item staminar</th><th align=\"center\">item count</th><th align=\"center\">item hp</th><th align=\"center\">ranking</th><th align=\"center\">rank</th><th align=\"center\">user_exp</th><tr>')
            var rs = '{"rs":' + strJsonData + '}';
            //alert(doing);
            var json_parsed = $.parseJSON(rs);
            for (var u = 0; u < json_parsed.rs.length; u++) {
                var user = json_parsed.rs[u];
                i = i + 1;
                $('#listUserToAdd').append('<tr><td><input type=\"checkbox\" id=name=\"chk[]\" name=\"chk[]\" value=\"' + user.user_id + '\">' + i + '</td><td>' + user.user_id + '</td><td>' + user.user_name + '</td><td>' + user.coin + '</td><td>' + user.stone + '</td><td>' + user.stone_present + '</td><td>' + user.point + '</td><td>' + user.item_staminar + '</td><td>' + user.item_count + '</td><td>' + user.item_hp + '</td><td>' + user.ranking + '</td><td>' + user.rank + '</td><td>' + user.user_exp + '</td></tr>');
            }
            $('#listUserToAdd').append('<tr><td colspan=11><input type=button onclick=\"AdminController.addUserCheckedToListLog();\" value=\"add to log list\"><input type=button onclick=\"AdminController.closeListUserToLog();\" value=\"close\"></td></tr>');
            $('#listUserToAdd').append('</table><input type=\"hidden\" id=\"listUserNeedToLog\" value=\"\">');
            $('#listUserToAdd').append('</form>');
            Dom.get('loading').innerHTML = '';
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/09/11
    //Lấy các id của user cần log để chèn vào danh sách theo dõi
    addUserCheckedToListLog: function () {
        var base_url = Dom.get('base_url').value;
        document.getElementById("listUserNeedToLog").value = '-1';
        $("input:checkbox[name='chk[]']:checked").each(function () {
            document.getElementById("listUserNeedToLog").value += "," + $(this).val();
        });
        //alert(document.getElementById("listUserNeedToLog").value);
        var strUrl = base_url + 'SysInfo_Admin/add_user_to_list_log/?ajax=1&listUserNeedToLog=' + document.getElementById("listUserNeedToLog").value;

        YAHOO.util.Connect.setForm('frmUserListToLog', true);
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            upload: AdminController.addUserCheckedToListLogSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
        return true;
    },
    //Huynv added 2013/09/12
    addUserCheckedToListLogSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                $('#listUserToAdd').html('');
                AdminController.searchListUserNeedLog();
                //AdminController.overlayCommon.show();
            } else {
                alert('error :' + aryData.strError);
                return;
            }
        } catch (e) {
            alert('error :' + e.message);
        }
    },
    //Huynv added 2013/09/12
    //remove các user này khỏi danh sách theo dõi
    removeUserCheckedFromListLog: function () {
        var base_url = Dom.get('base_url').value;
        var removeList = '-1';
        $("input:checkbox[name='chkItem[]']:checked").each(function () {
            removeList += "," + $(this).val();
        });
        //alert(removeList);
        var strUrl = base_url + 'SysInfo_Admin/remove_user_from_list_log/?ajax=1&listUserNeedToLog=' + removeList;

        YAHOO.util.Connect.setForm('frmsearch', true);
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            upload: AdminController.removeUserCheckedFromListLogSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
        return true;
    },
    //Huynv added 2013/09/12
    removeUserCheckedFromListLogSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                $('#listUserToAdd').html('');
                AdminController.searchListUserNeedLog();
                //AdminController.overlayCommon.show();
            } else {
                alert('error :' + aryData.strError);
                return;
            }
        } catch (e) {
            alert('error :' + e.message);
        }
    },
    checkAllUserList: function (obj) {
//        alert(obj.checked);
        if (obj.checked) {
            $("input:checkbox[name='chk[]']").each(function () {
                if (this.name == 'chk[]')
                    this.checked = true;
            });
        } else {
            $("input:checkbox[name='chk[]']").each(function () {
                if (this.name == 'chk[]')
                    this.checked = false;
            });
        }
    },
    checkAllUserListItem: function (obj) {
//        alert(obj.checked);
        if (obj.checked) {
            $("input:checkbox[name='chkItem[]']").each(function () {
                if (this.name == 'chkItem[]')
                    this.checked = true;
            });
        } else {
            $("input:checkbox[name='chkItem[]']").each(function () {
                if (this.name == 'chkItem[]')
                    this.checked = false;
            });
        }
    },
    //Huynv added 11-09-2013
    searchListUserNeedLog: function (orderType, orderField, page) {

        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = 'user_id';
            //'log_user_id';
        }
        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/search_list_user_need_log/?ajax=1&pageNo=' + page;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.searchListUserNeedLogSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 11/09/2013
    searchListUserNeedLogSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';
        } catch (e) {

            alert(e.message);
        }
    },
    //Huynv added 30-07-2013
    searchGroupTime: function (orderType, orderField, page) {

        var base_url = Dom.get('base_url').value;
        if (orderField == undefined) {
            orderField = 'group_time_id';
        }
        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/search_group_time/?ajax=1&pageNo=' + page;
        //alert(strUrl);
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.searchGroupTimeSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';

    },
    searchGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            //alert(strJsonData);
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            //alert("ok");
            alert(e.message);
        }
    },
    searchStageCat: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;
        if (orderField == undefined) {
            orderField = 'stage_cat_id';
        }
        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/search_stages_category/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.searchStageCatSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    searchStageCatSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    view_add_stage_cat: function () {

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/load_add_stage_category/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddStagesCateSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    //Huynv add 2013/07/30        
    view_add_group_time: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/load_add_group_time/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddStagesCateSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    //Huynv add 2013/07/31        
    view_add_stage_event_group_time: function () {
        //Nếu load lần đầu tiên
        if (firstTimeClickViewGroupTime == 0)
        {
            var base_url = Dom.get('base_url').value;
            //var token_stage_cat_id=Dom.get('token_stage_cat_id').value;
            //var strUrl = base_url+'../view/overlay_add_stage_event_group_time.php?token_stage_cat_id='+token_stage_cat_id;

            var strUrl = base_url + 'SysInfo_Admin/load_add_stage_event_group_time/?ajax=1';
            //alert(strUrl);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: AdminController.LoadAddStagesCateGroupTimeSuccess,
                failure: AdminController.asyncRequestFalse
            });
            firstTimeClickViewGroupTime = 1;
        } else {
            AdminController.overlayCommonGT.show();
        }
    },
    //Huynv add 2013/08/01        
    view_load_edit_stage_event_group_time: function (stage_cat_id) {
        //Nếu load lần đầu tiên
        if (firstTimeClickViewGroupTime == 0)
        {
            var base_url = Dom.get('base_url').value;
            //var token_stage_cat_id=Dom.get('token_stage_cat_id').value;
            //var strUrl = base_url+'../view/overlay_add_stage_event_group_time.php?token_stage_cat_id='+token_stage_cat_id;

            var strUrl = base_url + 'SysInfo_Admin/load_edit_stage_event_group_time/?ajax=1&stage_cat_id=' + stage_cat_id;
            //alert(strUrl);
            YAHOO.util.Connect.asyncRequest('GET', strUrl, {
                success: AdminController.LoadAddStagesCateGroupTimeSuccess,
                failure: AdminController.asyncRequestFalse
            });
            firstTimeClickViewGroupTime = 1;
        } else {
            AdminController.overlayCommonGT.show();
        }

    },
    LoadAddStagesCateGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            AdminController.showStageCatGroupTime();
            Dom.get('StageCatGroupTime').innerHTML = "";
            Dom.get('StageCatGroupTime').innerHTML = aryData.html;
            //AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    LoadAddStagesCateSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;

        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    //Huynv added 2013/08/02
    //Kiểm tra xem có hàng cột nào chọn quá 5 dòng không?
    checkMaxTotalRowTimeEvent: function (obj) {
        var maxRowSelected = 5;
        var selected = new Array();
        $("input:checkbox[name=chk[]]:checked").each(function () {
            selected.push($(this).val());
            //alert($(this).val());
        });
        var count = 0;
        //Kiểm tra từng cột
        for (var k = 1; k <= 7; k++) {
            count = 0;
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].substr(selected[i].length - 1, 1) == k.toString())
                    count++;
            }
            if (count > maxRowSelected) {
                alert('can not over 5 event time per day!');
                obj.checked = false;
                return false;
            }
        }
        return true;
    },
    //Huynv added 2013/08/01
    update_stage_cat_group_time: function (stage_cat_id) {
        var base_url = Dom.get('base_url').value;
        //Nếu tồn tại ít nhất 1 lần mở cửa sổ để chỉnh thời gian Stage Event Time thì mới cập nhật
        if (firstTimeClickViewGroupTime == 1)
        {
            AdminController.overlayCommonGT.show();
            //alert(stage_cat_id);
            var strUrl = base_url + 'SysInfo_Admin/add_update_stage_cat_group_time/?ajax=1&stage_cat_id=' + stage_cat_id;

            YAHOO.util.Connect.setForm('FrmstagePart', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: AdminController.addNewStageCatGroupTimeSuccess,
                failure: AdminController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    //Huynv added 2013/08/01
    add_stage_cat_group_time: function (stage_cat_id) {
        var base_url = Dom.get('base_url').value;

        if (firstTimeClickViewGroupTime == 1)
            AdminController.overlayCommonGT.show();
        var strUrl = base_url + 'SysInfo_Admin/add_new_stage_cat_group_time/?ajax=1&stage_cat_id=' + stage_cat_id;
        //var strUrl = base_url+'SysInfo_Admin/add_new_stage_cat_group_time/?ajax=1&form_elements='+form_elements;
        //alert('ok');
        YAHOO.util.Connect.setForm('FrmstagePart', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.addNewStageCatGroupTimeSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    //Huynv added 2013/08/01
    addNewStageCatGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommonGT.hide();
                //AdminController.overlayCommon.show();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/30
    add_group_time: function () {
        var base_url = Dom.get('base_url').value;
        if (YAHOO.lang.trim(Dom.get('name_group_time').value) == '') {
            alert("enter group time name!");
            return;
        }

        if (YAHOO.lang.trim(Dom.get('start_time').value) == '') {
            alert("enter start time value!");
            return;
        } else if (!is_A_Valid_Time(Dom.get('start_time').value)) {
            alert("start time must be hh:mm:ss format!");
            return;
        }

        if (YAHOO.lang.trim(Dom.get('end_time').value) == '') {
            alert("enter end time value!");
            return;
        } else if (!is_A_Valid_Time(Dom.get('end_time').value)) {
            alert("end time must be hh:mm:ss format!");
            return;
        }

        var n1 = parseInt(hhmmss_To_Number(Dom.get('start_time').value));
        var n2 = parseInt(hhmmss_To_Number(Dom.get('end_time').value));
        if (n1 >= n2) {
            alert("start time must be smaller than end time");
            return;
        }

        var strUrl = base_url + 'SysInfo_Admin/add_new_group_time';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.addNewGroupTimeSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    //Huynv added 2013/07/30
    addNewGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.searchGroupTime();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv modify 2013/08/01        
    add_stage_category: function () {
        var scTitle = Dom.get('stage_cat_name_vn').value;
        var scTitleEn = Dom.get('stage_cat_name_en').value;
        var scTitleJP = Dom.get('stage_cat_name').value;
        var scStartDate = Dom.get('stage_cat_start_date').value;
        var scExpireDate = Dom.get('stage_cat_finish_date').value;

        //if (!AdminController.checkMaxTotalRowTimeEvent()) return;
        if (scTitle === "" || scTitleEn === "" || scTitleJP === "") {
            alert("There is no 'Title'");
        }
        var patern = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
        if (scStartDate === "" || (scStartDate !== '' && !scStartDate.match(patern))) {
            alert("'Start Date' Invalid date format ");
            return;
        }
        if (scExpireDate === "" || (scExpireDate !== '' && !scExpireDate.match(patern))) {
            alert("'End Date' Invalid date format ");
            return;
        }

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/add_new_stage_category';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.addNewStageCatSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
        //Huynv modify 2013/08/01
        //Sau khi chèn thành công stage cat thì update vào bảng stage_cat_group_time 
        //để cập nhật stage_cat_id 
//        strUrl = base_url+'SysInfo_Admin/update_stage_cat_group_time/&ajax=1&token_stage_cat_id='+token_stage_cat_id+"&stage_cat_id="+aryData.intIsOk;
//        alert("ok2");
//        YAHOO.util.Connect.asyncRequest ('GET', strUrl, {
//            upload: AdminController.updateTokenIdStageCatGroupTimeSuccess,
//            failure: AdminController.asyncRequestFalse
//        });
//        

    },
    updateTokenIdStageCatGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        alert("ok3" + strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                //AdminController.overlayCommon.hide();
                //AdminController.searchStageCat();
            } else {
                alert("loi:" + aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    addNewStageCatSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;

        try {
            var aryData = Json.parse(strJsonData);

            if (aryData.intIsOk >= 1) {
                AdminController.overlayCommon.hide();
                if (firstTimeClickViewGroupTime == 1) {
                    //Huynv added;
                    //Nếu có chọn thời gian cho sự kiện
                    //Sau khi chèn vào bảng m_stage_category thành công thì 
                    //Chèn vào bảng m_stage_cat_group_time
                    document.getElementById('token_stage_cat_id').value = aryData.intIsOk;
                    AdminController.add_stage_cat_group_time(aryData.intIsOk);
                    firstTimeClickViewGroupTime = 0;
                }
                AdminController.searchStageCat();
            } else {
                alert("loi:" + aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/31
    update_stage_event_group_time: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/update_stage_event_group_time';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.updateStateEventGroupTimeSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    //Huynv added 2013/07/31       
    updateStateEventGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            alert(aryData.intIsOk);
            if (aryData.intIsOk < 0) {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    searchStage: function (orderType, orderField, page) {

        var base_url = Dom.get('base_url').value;
        if (orderField == undefined) {
            orderField = '1';
        }

        if (orderType == undefined) {
            orderType = '1';
        }

        if (page == undefined) {
            page = 1;
        }
        //alert(orderType);
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/search_stage/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.searchStageSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    searchStageSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    view_add_stage: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/load_add_stage/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddStagesSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadAddStagesSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_stage: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/add_new_stage';
        YAHOO.util.Connect.setForm('Frmstage');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.addNewStageSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewStageSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.searchStage();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    searchStageBattle: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;


        if (orderField == undefined) {
            orderField = 'stage_battle_id';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/search_stages_battle/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.searchStageBattleSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    searchStageBattleSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    view_add_stage_battle: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/load_add_stage_battle/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddStagesBattleSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadAddStagesBattleSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_stage_battle: function () {

        var leaderPos = Dom.get('team_monter_pos_leader').value;
        var monterPos2 = Dom.get('team_monter_pos_2').value;
        var monterPos3 = Dom.get('team_monter_pos_3').value;
        var monterPos4 = Dom.get('team_monter_pos_4').value;

        if (leaderPos != 0) {
            if (leaderPos == monterPos2 || leaderPos == monterPos3 || leaderPos == monterPos4) {
                alert("モンスターの位置は同じ位置を設定しました。再度設定して下さい");
                return;
            }
        }
        if (monterPos2 != 0) {
            if (leaderPos == monterPos2 || monterPos2 == monterPos3 || monterPos2 == monterPos4) {
                alert("モンスターの位置は同じ位置を設定しました。再度設定して下さい");
                return;
            }
        }
        if (monterPos3 != 0) {
            if (leaderPos == monterPos3 || monterPos2 == monterPos3 || monterPos3 == monterPos4) {
                alert("モンスターの位置は同じ位置を設定しました。再度設定して下さい");
                return;
            }
        }

        if (monterPos4 != 0) {
            if (leaderPos == monterPos4 || monterPos2 == monterPos4 || monterPos3 == monterPos4) {
                alert("モンスターの位置は同じ位置を設定しました。再度設定して下さい");
                return;
            }
        }

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/add_new_stage_battle';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.addNewStageBattleSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewStageBattleSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.searchStageBattle();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    autoCompletedList: function (param) {
        str_param = param;
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/auto_completed_search/?ajax=1&param=' + str_param;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.autoCompletedSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    autoCompletedSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //        alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result_' + str_param).innerHTML = aryData.html;
            //Dom.get('loading').innerHTML ='';
        } catch (e) {
            alert(e.message);
        }
    },
    mobamon_search: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = '';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/mobamon_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.mobamonSearchSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    mobamonSearchSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    mobamon_load_add_view: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/mobamon_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddMobamonSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadAddMobamonSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_mobamon: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/mobamon_addNew';
        YAHOO.util.Connect.setForm('FrmMobamon', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.addNewMobamonSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewMobamonSuccess: function (xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'SysInfo_Admin/mobamon_view';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    skill_search: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = '';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/skill_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.skillSearchSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    pass_skill_search: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = '';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/pass_skill_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.pass_skillSearchSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    pass_skillSearchSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    skillSearchSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    skill_load_add_view: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/skill_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddSkillSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadAddSkillSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_skill: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/skill_addNew';
        YAHOO.util.Connect.setForm('FrmSkill');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.addNewSkillnSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewSkillnSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.skill_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    pass_skill_load_add_view: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/pass_skill_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddPassSkillSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadAddPassSkillSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_pass_skill: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/pass_skill_addNew';
        YAHOO.util.Connect.setForm('FrmSkill');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.addNewPassSkillnSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewPassSkillnSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.pass_skill_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    partner_search: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = '';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/partner_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.searchPartnerSuccess,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    searchPartnerSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    partner_load_add_view: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/partner_load_addNew/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddPartnerSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadAddPartnerSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    partner_save: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/partner_addNew';
        YAHOO.util.Connect.setForm('FrmPartner', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.partner_save_success,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    partner_save_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.partner_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    partner_delete_record: function (partner_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            var strUrl = base_url + 'SysInfo_Admin/partner_delete/?ajax=1&partner_id=' + partner_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: AdminController.delPartnerSuccess,
                failure: AdminController.asyncRequestFalse
            });
        }
    },
    delPartnerSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.partner_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //add by cuongvm
    partner_load_edit: function (partner_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/partner_load_edit/?ajax=1&partner_id=' + partner_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadCategorySuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadCategorySuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    partner_update: function (partner_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/partner_update/?ajax=1&partner_id=' + partner_id;

        YAHOO.util.Connect.setForm('FrmPartner', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.partner_save_success,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    partner_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.partner_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/30        
    groupTime_load_edit: function (group_time_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/groupTime_load_update/?ajax=1&group_time_id=' + group_time_id;
        //alert(strUrl);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadGroupTimeSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    //Huynv added 2013/07/30        
    LoadGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    stageCat_load_edit: function (stageCat_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/stageCat_load_update/?ajax=1&stageCat_id=' + stageCat_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadStageCatSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadStageCatSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    //Huynv added 2013/07/30
    update_group_time: function (group_time_id) {
        var base_url = Dom.get('base_url').value;

        if (group_time_id) {
            var strUrl = base_url + 'SysInfo_Admin/groupTime_update/?ajax=1&group_time_id=' + group_time_id;

            if (YAHOO.lang.trim(Dom.get('name_group_time').value) == '') {
                alert("enter group time name!");
                return;
            }
            if (YAHOO.lang.trim(Dom.get('start_time').value) == '') {
                alert("enter start time value!");
                return;
            } else if (!is_A_Valid_Time(Dom.get('start_time').value)) {
                alert("start time must be hh:mm:ss format!");
                return;
            }

            if (YAHOO.lang.trim(Dom.get('end_time').value) == '') {
                alert("enter end time value!");
                return;
            } else if (!is_A_Valid_Time(Dom.get('end_time').value)) {
                alert("end time must be hh:mm:ss format!");
                return;
            }
            var n1 = parseInt(hhmmss_To_Number(Dom.get('start_time').value));
            var n2 = parseInt(hhmmss_To_Number(Dom.get('end_time').value));
            if (n1 >= n2) {
                alert("start time must be smaller than end time");
                return;
            }
            YAHOO.util.Connect.setForm('Frmstage', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: AdminController.groupTime_update_success,
                failure: AdminController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }

    },
    //Huynv added 2013/07/30        
    groupTime_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.searchGroupTime();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/08/08        
    logUser_delete_record: function (log_user_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (log_user_id) {
                var strUrl = base_url + 'SysInfo_Admin/logUser_delete/?ajax=1&log_user_id=' + log_user_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.delLogUserSuccess,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    //Huynv added 2013/07/31       
    delLogUserSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;

        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                AdminController.searchLogUser();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/31        
    groupTime_delete_record: function (group_time_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (group_time_id) {
                var strUrl = base_url + 'SysInfo_Admin/groupTime_delete/?ajax=1&group_time_id=' + group_time_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.delGroupTimeSuccess,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    //Huynv added 2013/07/31       
    delGroupTimeSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                AdminController.searchGroupTime();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynvd added 02/08/2013
    checkItemStageCategoryGroupTimeCheckBox: function () {
        //if (!AdminController.checkMaxTotalRowTimeEvent()) return;
        AdminController.overlayCommonGT.hide();
        AdminController.overlayCommon.show();
    },
    update_stage_category: function (stageCat_id) {
        var scTitle = Dom.get('stage_cat_name_vn').value;
        var scTitleEn = Dom.get('stage_cat_name_en').value;
        var scTitleJP = Dom.get('stage_cat_name').value;
        var scStartDate = Dom.get('stage_cat_start_date').value;
        var scExpireDate = Dom.get('stage_cat_finish_date').value;

        if (scTitle === "" || scTitleEn === "" || scTitleJP === "") {
            alert("There is no 'Title'");
        }
        var patern = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
        if (scStartDate === "" || (scStartDate !== '' && !scStartDate.match(patern))) {
            alert("'Start Date' Invalid date format ");
            return;
        }
        if (scExpireDate === "" || (scExpireDate !== '' && !scExpireDate.match(patern))) {
            alert("'End Date' Invalid date format ");
            return;
        }
        //if (!AdminController.checkMaxTotalRowTimeEvent()) return;
        if (stageCat_id) {
            if (firstTimeClickViewGroupTime == 1)
                AdminController.overlayCommonGT.show();
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'SysInfo_Admin/stageCat_update/?ajax=1&stageCat_id=' + stageCat_id;
            YAHOO.util.Connect.setForm('Frmstage', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: AdminController.stageCat_update_success,
                failure: AdminController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    stageCat_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                if (firstTimeClickViewGroupTime == 1) {
                    //Huynv added;
                    //Nếu có chọn thời gian cho sự kiện
                    //Sau khi chèn vào bảng m_stage_category thành công thì 
                    //Chèn vào bảng m_stage_cat_group_time
                    //document.getElementById('token_stage_cat_id').value=aryData.intIsOk;
                    AdminController.update_stage_cat_group_time(document.getElementById('token_stage_cat_id').value);

                }
                AdminController.searchStageCat();
            } else {
                alert("loi:" + aryData.strError);
                return;
            }
            firstTimeClickViewGroupTime = 0;
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv add 12/09/2013        
    list_user_need_log_delete_record: function (user_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (user_id) {
                var strUrl = base_url + 'SysInfo_Admin/user_need_log_delete_record/?ajax=1&user_id=' + user_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.delListUserNeedLogDeleteRecordSuccess,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    delListUserNeedLogDeleteRecordSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.searchListUserNeedLog();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stageCat_delete_record: function (stageCat_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (stageCat_id) {
                var strUrl = base_url + 'SysInfo_Admin/stageCat_delete/?ajax=1&stageCat_id=' + stageCat_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.delStageCatSuccess,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    delStageCatSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.searchStageCat();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_delete_record: function (stage_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (stage_id) {
                var strUrl = base_url + 'SysInfo_Admin/stage_delete/?ajax=1&stage_id=' + stage_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.delStageSuccess,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    delStageSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.searchStage();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_load_sort: function (type, sort) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/stage_load_sort/?ajax=1&type=' + type + '&sort=' + sort;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.stage_load_sort_success,
            failure: AdminController.asyncRequestFalse
        });
    },
    stage_load_sort_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    stage_load_update: function (stage_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/stage_load_update/?ajax=1&stage_id=' + stage_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.stage_load_update_success,
            failure: AdminController.asyncRequestFalse
        });
    },
    stage_load_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    update_stage: function (stage_id) {
        var base_url = Dom.get('base_url').value;
        if (stage_id) {
            var strUrl = base_url + 'SysInfo_Admin/stage_update/?ajax=1&stage_id=' + stage_id;
            YAHOO.util.Connect.setForm('Frmstage');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: AdminController.stage_update_success,
                failure: AdminController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    stage_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.searchStage();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_battle_delete_record: function (stage_battle_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (stage_battle_id) {
                var strUrl = base_url + 'SysInfo_Admin/stage_battle_delete/?ajax=1&stage_battle_id=' + stage_battle_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.delStageBattleSuccess,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    delStageBattleSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.searchStageBattle();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_battle_load_update: function (stage_battle_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/stage_battle_load_update/?ajax=1&stage_battle_id=' + stage_battle_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.stage_battle_load_update_success,
            failure: AdminController.asyncRequestFalse
        });
    },
    stage_battle_load_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },

    deleteAttachmentFile: function () {
        Dom.get('img_attachment').innerHTML = '<input type="file" name="avata[]" id="avata"  />';
    },
    deleteImageAttachmentFile: function () {
        Dom.get('img_attachment').innerHTML = '<input type="file" name="partner_avata[]" id="partner_avata"  />';
    },
    deleteFragmentAttachmentFile: function () {
        Dom.get('img_attachment').innerHTML = '<input type="file" name="fragment_avata[]" id="fragment_avata"  />';
    },
    deleteAttFile: function (tag_name) {
        Dom.get('img_attachment_' + tag_name).innerHTML = '<input type="file" name="' + tag_name + '[]" id="' + tag_name + '"  />';
    },
    deleteAttFileIphone: function (tag_name) {
        Dom.get('img_attachment_' + tag_name).innerHTML = '<input type="file" name="' + tag_name + '[]" id="' + tag_name + '"  />';
    },
    login: function () {
        var base_url = Dom.get('base_url').value;

        if (Dom.get('member_username').value == '') {
            alert('Input username plz !');
            Dom.get('member_username').focus();
            return;
        } else if (Dom.get('member_password').value == '') {
            alert('Input Password plz  !');
            Dom.get('member_password').focus();
            return;
        }
        var strUrl = base_url + 'SysInfo_Admin/admin_login/?ajax=1';
        YAHOO.util.Connect.setForm('frmLogin');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.loginSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    loginSuccess: function (xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'SysInfo_Admin/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    skill_delete_record: function (skill_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (skill_id) {
                var strUrl = base_url + 'SysInfo_Admin/skill_delete/?ajax=1&skill_id=' + skill_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.skill_delete_record_success,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    skill_delete_record_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.skill_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    skill_load_edit: function (skill_id) {
        var base_url = Dom.get('base_url').value;
        if (skill_id) {
            var strUrl = base_url + 'SysInfo_Admin/skill_load_update/?ajax=1&skill_id=' + skill_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: AdminController.skill_load_update_success,
                failure: AdminController.asyncRequestFalse
            });
        }
    },
    skill_load_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    update_skill: function (skill_id) {
        var base_url = Dom.get('base_url').value;
        if (skill_id) {
            var strUrl = base_url + 'SysInfo_Admin/skill_update/?ajax=1&skill_id=' + skill_id;
            YAHOO.util.Connect.setForm('FrmSkill');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: AdminController.update_skill_success,
                failure: AdminController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    update_skill_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.skill_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },

    ValidateTypeUpload: function (input) {
        var id_value = document.getElementById(input).value;
        var valid_extensions = /(.jpg|.jpeg|.gif|.png)$/i;
        if (id_value != '')
        {

            if (!valid_extensions.test(id_value))
            {
                alert('Invalid File extension input');
                return false;
            } else {
                return true;
            }
        }
        return true;
    },
    ValidateZiseUpload: function (input, width, height) {
        var img = document.getElementById(input);
        //or however you get a handle to the IMG
        var imgWidth = img.clientWidth;
        var imgHeight = img.clientHeight;
        if (imgWidth != width || imgHeight != height) {
            alert('File uploaded invalid size ,Please upload valid image size Height=' + height + 'And Width=' + width);
            return false;
        } else {
            return true;
        }

    },

    //News
    // - check onload
    checkPresent: function (object, monsterListElement, quantityBoxElement, multiPresentElement1, multiPresentElement2) {
        if (object.selectedIndex == 0)
        {
            AdminController.hideElement(monsterListElement);
            AdminController.hideElement(quantityBoxElement);
            AdminController.hideElement(multiPresentElement1);
            AdminController.hideElement(multiPresentElement2);
        } else if (object.selectedIndex == 1)
        {
            AdminController.showElement(monsterListElement);
            AdminController.hideElement(quantityBoxElement);
            AdminController.hideElement(multiPresentElement1);
            AdminController.hideElement(multiPresentElement2);
        } else if (object.selectedIndex >= 2 && object.selectedIndex <= 8) {
            AdminController.showElement(quantityBoxElement);
            AdminController.hideElement(monsterListElement);
            AdminController.hideElement(multiPresentElement1);
            AdminController.hideElement(multiPresentElement2);
        } else {
            AdminController.hideElement(quantityBoxElement);
            AdminController.showElement(monsterListElement);
            AdminController.showElement(multiPresentElement1);
            AdminController.showElement(multiPresentElement2);

        }
    },
    // - hide n show
    showElement: function (id) {
        Dom.get(id).style.display = '';
    },
    hideElement: function (id) {
        Dom.get(id).style.display = 'none';
    },
    import_data: function () {
        if (Dom.get('skill_file').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(AdminController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'SysInfo_Admin/do_import/?ajax=1';
            YAHOO.util.Connect.setForm('frmUpload', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: AdminController.import_success,
                failure: AdminController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadingSkill').innerHTML = '<span class="status-msg-text">' + AdminController.IMPORTING_TEXT + '</span>';
        }
    },
    import_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                Dom.get('loadingSkill').innerHTML = "";
                if (aryData.flag == 1) {
                    Dom.get('skill_msg').innerHTML = "Imported : " + aryData.counter + ' Records !';
                } else {
                    Dom.get('skill_msg').innerHTML = "Updated : " + aryData.counter + ' Records !';
                }
            } else {
                alert(aryData.strError);
                Dom.get('loadingSkill').innerHTML = "";
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },

    export_mobamon_data: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/export_mobamon_data/?ajax=1';
        //        YAHOO.util.Connect.setForm('frmUpload');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.export_mobamon_success,
            failure: AdminController.asyncRequestFalse
        });

    },
    export_mobamon_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk != 1) {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },

    help_search: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = '';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/help_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.help_search_success,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    help_search_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    help_add: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/help_addNew';
        YAHOO.util.Connect.setForm('FrmAdd', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.help_add_success,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    help_add_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'SysInfo_Admin/help_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    help_update: function (help_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/help_update/?ajax=1&help_id=' + help_id;
        YAHOO.util.Connect.setForm('FrmUpdate', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.help_update_success,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    help_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'SysInfo_Admin/help_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    help_delete_record: function (help_id) {
        var base_url = Dom.get('base_url').value;
        if (help_id) {
            answer = confirm(AdminController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'SysInfo_Admin/help_delete/?ajax=1&help_id=' + help_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.help_delete_success,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    help_delete_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.help_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    news_delete_record: function (news_id) {
        var base_url = Dom.get('base_url').value;
        if (news_id) {
            answer = confirm(AdminController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'SysInfo_Admin/news_delete/?ajax=1&news_id=' + news_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.news_delete_success,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    news_delete_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.news_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    user_news_delete_record: function (news_id) {
        var base_url = Dom.get('base_url').value;
        if (news_id) {
            answer = confirm(AdminController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'SysInfo_Admin/user_news_delete/?ajax=1&news_id=' + news_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.user_news_delete_success,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    user_news_delete_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.userNews_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    // - Topics
    topics_search: function (orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = 'tp_updated_date';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'SysInfo_Admin/topics_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.topics_search_success,
            failure: AdminController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>';
    },
    topics_search_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    topics_add_view: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/overlay_add_topic/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.topics_add_view_success,
            failure: AdminController.asyncRequestFalse
        });
    },
    topics_add_new: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/topics_add_new';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.topics_add_new_success,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();

    },
    topics_add_new_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.topics_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    topics_add_view_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
            AdminController.autoImeOff();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    topics_update_view: function (tp_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/topics_update_view/?ajax=1&tp_id=' + tp_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.topics_update_view_success,
            failure: AdminController.asyncRequestFalse
        });
    },
    topics_update_view_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    topics_update: function (tp_id) {
        var base_url = Dom.get('base_url').value;
        if (tp_id) {
            var strUrl = base_url + 'SysInfo_Admin/topics_update/?ajax=1&tp_id=' + tp_id;
            YAHOO.util.Connect.setForm('Frmstage', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: AdminController.topics_update_success,
                failure: AdminController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    topics_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.overlayCommon.hide();
                AdminController.topics_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    topics_delete_record: function (tp_id) {
        var base_url = Dom.get('base_url').value;
        if (tp_id) {
            answer = confirm(AdminController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'SysInfo_Admin/topics_delete/?ajax=1&tp_id=' + tp_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.topics_delete_success,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    topics_delete_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                AdminController.topics_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },

    sendPushService: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/sendRequestPushService';
        YAHOO.util.Connect.setForm('FrmMobamon', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.pushServiceSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    pushServiceSuccess: function (xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                //window.location = base_url+'SysInfo_Admin/push_service';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    viewMonster: function (tag_name) {
        //        alert(tag_name);
        var Index = document.FrmMobamon.ranking_type_1.selectedIndex;//[document.menuForm.select1.selectedIndex].value
        if (Index == 1) {
            document.getElementById('monster_view_select_1').style.display = '';
        } else {
            Dom.get('monster_view_select_1').innerHTML = '';
        }
    },
    add_ranking_bonus: function () {

        var startRanking = Dom.get('ranking_num_from').value;
        var endRanking = Dom.get('ranking_num_to').value;
        var Index1 = document.FrmMobamon.ranking_type_1.selectedIndex;
        var Index2 = document.FrmMobamon.ranking_type_2.selectedIndex;

        var val1 = Dom.get('value_1').value;
        var val2 = Dom.get('value_2').value;

        if (Number(startRanking) <= 0 || Number(endRanking) <= 0 || Number(startRanking) > Number(endRanking)) {
            alert("ランキングを正しく入力して下さい");
            return;
        }
        if (Number(Index1) == Number(Index2) && Number(Index2) > 0) {
            alert("同じBonus種類を追加できません");
            return;
        }
        if (Number(Index1) == Number(Index2) && Number(Index2) == 0) {
            alert("同じBonus種類を追加できません");
            return;
        }

        if ((Number(val1) <= 0 && Number(Index1) > 0) || (Number(val2) <= 0 && Number(Index2) > 0)) {
            alert("値を正しく入力して下さい");
            return;
        }

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/addRankingBonus';
        YAHOO.util.Connect.setForm('FrmMobamon', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.addNewRankingSuccess,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewRankingSuccess: function (xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'SysInfo_Admin/mobamon_add_ranking_bonus';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    ranking_load_update: function (id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/ranking_load_update/?ajax=1&ranking_id=' + id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.ranking_load_update_success,
            failure: AdminController.asyncRequestFalse
        });
    },
    ranking_load_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    view_add_ranking_bonus: function () {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/load_add_ranking_bonus/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: AdminController.LoadAddRankingSuccess,
            failure: AdminController.asyncRequestFalse
        });
    },
    LoadAddRankingSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            AdminController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    ranking_delete_record: function (ranking_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(AdminController.DELETE_CONFIRM);
        if (answer) {
            if (ranking_id) {
                var strUrl = base_url + 'SysInfo_Admin/ranking_delete/?ajax=1&ranking_id=' + ranking_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.delRankingSuccess,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    delRankingSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = $('#base_url').val();
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'SysInfo_Admin/mobamon_add_ranking_bonus';
            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
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
        var form = $('#frmSearch');
        var from = $('#log_date_from').val();
        var to = $('#log_date_to').val();
        var svid = $('#server_id').val();
        var postData = {log_date_from:from, log_date_to: to, server_id: svid};
        
        $('#loading').html('<span class="status-msg-text">' + AdminController.SEARCHING_TEXT + '</span>');
        $.post(url, postData).done(function(responseData, textStatus, jqXHR) {
            try {
                var aryData = $.parseJSON(responseData);
                $('#result').html(aryData.html);
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

    log_update_stattus: function (log_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm('Are you sure fixed this bug ?');
        if (answer) {
            if (log_id) {
                var strUrl = base_url + 'SysInfo_Admin/log_update_status/?ajax=1&log_id=' + log_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: AdminController.log_update_success,
                    failure: AdminController.asyncRequestFalse
                });
            }
        }
    },
    log_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'SysInfo_Admin/log_view';
            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    select_lang_box: function (lang) {
        alert(lang.value);
        try {
            switch (lang.value) {
                case 0:
                    Dom.get('title_jp').style.display = 'inline';
                    Dom.get('title_vn').style.display = 'none';
                    Dom.get('title_en').style.display = 'none';
                    break;
                case 1:
                    Dom.get('title_jp').style.display = 'none';
                    Dom.get('title_vn').style.display = 'inline';
                    Dom.get('title_en').style.display = 'none';
                    break;
                case 2:
                    Dom.get('title_jp').style.display = 'none';
                    Dom.get('title_vn').style.display = 'none';
                    Dom.get('title_en').style.display = 'inline';
                    break;
                default:
                    Dom.get('title_jp').style.display = 'inline';
                    Dom.get('title_vn').style.display = 'none';
                    Dom.get('title_en').style.display = 'none';
                    break;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    autoImeOff: function () {
        var fields = ['tp_title_vn',
            'tp_title_en',
            'tp_content_vn',
            'tp_content_en'];
        for (var k in fields) {
            Dom.get(fields[k]).style.imeMode = "disabled";
        }

    },
    gacha_banner_update: function (lang) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'SysInfo_Admin/gacha_banner_update/?ajax=1&lang=' + lang;
        YAHOO.util.Connect.setForm('FrmMobamon' + lang, true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: AdminController.gacha_banner_update_success,
            failure: AdminController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    gacha_banner_update_success: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                var base_url = Dom.get('base_url').value;
                window.location = base_url + 'SysInfo_Admin/gacha_banner_load_update/';
                alert(aryData.strError);
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },

    changeMaintenance: function () {

        if (confirm('値を変更しても宜しいですか？')) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'SysInfo_Admin/saveOption/?ajax=1';
            YAHOO.util.Connect.setForm('FrmSearch');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: AdminController.changeMaintenanceSuccess,
                failure: AdminController.asyncRequestFalse
            });

        }
    },
    changeMaintenanceSuccess: function (xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                var base_url = Dom.get('base_url').value;
                window.location = base_url + 'SysInfo_Admin/option/';
            } else {
                alert(aryData.strError);
                return;
            }

        } catch (e) {
            alert(e.message);
        }
    }
};
