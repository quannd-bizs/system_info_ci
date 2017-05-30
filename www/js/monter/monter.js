
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

//monter_avata = 80X80, 50X50
//full 240X240
//fragment 60X60
//Huynv added
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
var MonterController = {
    SEARCHING_TEXT: "Downloading.....",
    CANCEL_CONFIRM: 'Do you want to cancel ?',
    DELETE_CONFIRM: 'Are you sure delete this record ?',
    DELETE_FILE_CONFIRM: 'Are you sure delete this file ?',
    IMPORTING_TEXT: 'Importing data....',
    IMPORTING_CONFIRM: 'Are you sure import data from this Excel File ?',
    showCommonOverlay: function() {

        MonterController.overlayCommon = new YAHOO.widget.Panel('CommonOverlay',
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
            fn: MonterController.closeOverlay,
            scope: MonterController.overlayCommon,
            correctScope: true
        },
        "keyup");

        MonterController.overlayCommon.cfg.setProperty("keylisteners", kt);
        // Render the Dialogs
        MonterController.overlayCommon.render(document.body);
        MonterController.overlayCommon.center();
        MonterController.overlayCommon.cfg.setProperty("y", 14);

        document.getElementById('CommonOverlay').style.display = '';
        MonterController.overlayCommon.show();
        var buttonClose = Dom.getElementsByClassName('container-close', 'span');
        YAHOO.util.Event.addListener(buttonClose, "click", MonterController.checkFileError);
    },
    closeOverlay: function() {
        if (confirm(MonterController.CANCEL_CONFIRM)) {
            MonterController.overlayCommon.hide();
            if (errorUploadFile == 1) {
                location.reload(true);
            }
        }
    },
    //Huynv add 2013/07/31
    showStageCatGroupTime: function() {

        MonterController.overlayCommonGT = new YAHOO.widget.Panel('StageCatGroupTime',
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
        MonterController.overlayCommonGT.render(document.body);
        MonterController.overlayCommonGT.center();


        document.getElementById('StageCatGroupTime').style.display = '';
        MonterController.overlayCommonGT.show();
        //var buttonClose = Dom.getElementsByClassName('container-close', 'span');
        //YAHOO.util.Event.addListener(buttonClose, "click", MonterController.checkFileError);
    },
    //Huynv added 2013/07/13        
    closeStageCatGroupTime: function() {
        //if( confirm(MonterController.CANCEL_CONFIRM)){
        MonterController.overlayCommonGT.hide();
        if (errorUploadFile == 1) {
            location.reload(true);
        }
        //}
    },
    checkFileError: function() {
        if (errorUploadFile == 1) {
            location.reload(true);
        }
    },
    //return false when request    
    asyncRequestFalse: function() {
        alert('Sorry ! System Error !');
    },
    //Huynv added 23-08-2013
    exportLogUserToExcel: function() {
        //alert("Done Report1");
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/export_log_user_to_excel/?user_name=' + document.getElementById('user_name').value + '&log_date_from=' + document.getElementById('log_date_from').value + '&log_date_to=' + document.getElementById('log_date_to').value;
        strUrl += '&action_id=' + document.getElementById('action_id').value;
        var strPost = '';
//        YAHOO.util.Connect.setForm('FrmSearch');
//        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
//            success: MonterController.exportLogUserToExcelSuccess,
//            failure: MonterController.asyncRequestFalse
//        },strPost);
        window.open(strUrl);
        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    //Huynv added 23/08/2013
    exportLogUserToExcelSuccess: function(xmlhttp) {
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
    searchLogUser: function(orderType, orderField, page, contSearchFilter) {

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

        var strUrl = base_url + 'monter_admin/search_log_user/?ajax=1&pageNo=' + page;
        //alert(strUrl);
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchLogUserSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 08/08/2013
    searchLogUserSuccess: function(xmlhttp) {
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
    searchUserToAddListLog: function(orderType, orderField, page) {

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

        var strUrl = base_url + 'monter_admin/search_user_to_add_list_log/?user_name=' + document.getElementById("user_name").value;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            success: MonterController.searchUserToAddListLogSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 11/09/2013
    searchUserToAddListLogSuccess: function(xmlhttp) {
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
            $('#listUserToAdd').append('<tr><th align=\"center\">check all:<input type=\"checkbox\" name=\"chkAll\" value=\"\" onclick=\"MonterController.checkAllUserList(this);\"></th><th align=\"center\">user id</th><th align=\"center\">user name</th><th align=\"center\">coin</th><th align=\"center\">stone</th><th align=\"center\">stone present</th><th align=\"center\">point</th><th align=\"center\">item staminar</th><th align=\"center\">item count</th><th align=\"center\">item hp</th><th align=\"center\">ranking</th><th align=\"center\">rank</th><th align=\"center\">user_exp</th><tr>')
            var rs = '{"rs":' + strJsonData + '}';
            //console.log("vao day2");
            //alert(doing);
            var json_parsed = $.parseJSON(rs);
            for (var u = 0; u < json_parsed.rs.length; u++) {
                var user = json_parsed.rs[u];
                $('#listUserToAdd').append('<tr><td><input type=\"checkbox\" id=\"chk[]\" name=\"chk[]\" value=\"' + user.user_id + '\">&nbsp;</td><td>' + user.user_id + '</td><td>' + user.user_name + '</td><td>' + user.coin + '</td><td>' + user.stone + '</td><td>' + user.stone_present + '</td><td>' + user.point + '</td><td>' + user.item_staminar + '</td><td>' + user.item_count + '</td><td>' + user.item_hp + '</td><td>' + user.ranking + '</td><td>' + user.rank + '</td><td>' + user.user_exp + '</td></tr>');
            }
            $('#listUserToAdd').append('<tr><td colspan=11><input type=button onclick=\"MonterController.addUserCheckedToListLog();\" value=\"add to log list\"><input type=button onclick=\"MonterController.closeListUserToLog();\" value=\"close\"></td></tr>');
            $('#listUserToAdd').append('</table><input type=\"hidden\" id=\"listUserNeedToLog\" value=\"\">');
            $('#listUserToAdd').append('</form>');

            Dom.get('loading').innerHTML = '';
        } catch (e) {
            alert(e.message);
        }
    },
    closeListUserToLog: function() {
        $('#listUserToAdd').html('');
    },
    //Huynv added: 12/09/203, onkeypress="return MonterController.checkAndSearchUserList(event);"  cho vao o user_name
    //Hien chua chay duoc, need develop        
    checkAndSearchUserList: function(e) {
        //alert(e.keyCode);
        if (e.keyCode === 13) {
            MonterController.searchUserToAddListLog(null, null, null);
        }
    },
    //Huynv added 12-09-2013,//search user and add to list follow
    top100UserRankingToLog: function(orderType, orderField, page) {

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

        var strUrl = base_url + 'monter_admin/search_top100_user_ranking_to_log/?top=' + page;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            success: MonterController.top100UserRankingToLogSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 12/09/2013, tìm top 100 user
    top100UserRankingToLogSuccess: function(xmlhttp) {
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
            $('#listUserToAdd').append('<tr><th align=\"center\">check all:<input type=\"checkbox\" name=\"chkAll\" value=\"\" onclick=\"MonterController.checkAllUserList(this);\"></th><th align=\"center\">user id</th><th align=\"center\">user name</th><th align=\"center\">coin</th><th align=\"center\">stone</th><th align=\"center\">stone present</th><th align=\"center\">point</th><th align=\"center\">item staminar</th><th align=\"center\">item count</th><th align=\"center\">item hp</th><th align=\"center\">ranking</th><th align=\"center\">rank</th><th align=\"center\">user_exp</th><tr>')
            var rs = '{"rs":' + strJsonData + '}';
            //alert(doing);
            var json_parsed = $.parseJSON(rs);
            for (var u = 0; u < json_parsed.rs.length; u++) {
                var user = json_parsed.rs[u];
                i = i + 1;
                $('#listUserToAdd').append('<tr><td><input type=\"checkbox\" id=name=\"chk[]\" name=\"chk[]\" value=\"' + user.user_id + '\">' + i + '</td><td>' + user.user_id + '</td><td>' + user.user_name + '</td><td>' + user.coin + '</td><td>' + user.stone + '</td><td>' + user.stone_present + '</td><td>' + user.point + '</td><td>' + user.item_staminar + '</td><td>' + user.item_count + '</td><td>' + user.item_hp + '</td><td>' + user.ranking + '</td><td>' + user.rank + '</td><td>' + user.user_exp + '</td></tr>');
            }
            $('#listUserToAdd').append('<tr><td colspan=11><input type=button onclick=\"MonterController.addUserCheckedToListLog();\" value=\"add to log list\"><input type=button onclick=\"MonterController.closeListUserToLog();\" value=\"close\"></td></tr>');
            $('#listUserToAdd').append('</table><input type=\"hidden\" id=\"listUserNeedToLog\" value=\"\">');
            $('#listUserToAdd').append('</form>');
            Dom.get('loading').innerHTML = '';
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/09/11
    //Lấy các id của user cần log để chèn vào danh sách theo dõi
    addUserCheckedToListLog: function() {
        var base_url = Dom.get('base_url').value;
        document.getElementById("listUserNeedToLog").value = '-1';
        $("input:checkbox[name='chk[]']:checked").each(function() {
            document.getElementById("listUserNeedToLog").value += "," + $(this).val();
        });
        //alert(document.getElementById("listUserNeedToLog").value);
        var strUrl = base_url + 'monter_admin/add_user_to_list_log/?ajax=1&listUserNeedToLog=' + document.getElementById("listUserNeedToLog").value;

        YAHOO.util.Connect.setForm('frmUserListToLog', true);
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            upload: MonterController.addUserCheckedToListLogSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
        return true;
    },
    //Huynv added 2013/09/12
    addUserCheckedToListLogSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                $('#listUserToAdd').html('');
                MonterController.searchListUserNeedLog();
                //MonterController.overlayCommon.show();
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
    removeUserCheckedFromListLog: function() {
        var base_url = Dom.get('base_url').value;
        var removeList = '-1';
        $("input:checkbox[name='chkItem[]']:checked").each(function() {
            removeList += "," + $(this).val();
        });
        //alert(removeList);
        var strUrl = base_url + 'monter_admin/remove_user_from_list_log/?ajax=1&listUserNeedToLog=' + removeList;

        YAHOO.util.Connect.setForm('frmsearch', true);
        YAHOO.util.Connect.asyncRequest('GET', strUrl, {
            upload: MonterController.removeUserCheckedFromListLogSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
        return true;
    },
    //Huynv added 2013/09/12
    removeUserCheckedFromListLogSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                $('#listUserToAdd').html('');
                MonterController.searchListUserNeedLog();
                //MonterController.overlayCommon.show();
            } else {
                alert('error :' + aryData.strError);
                return;
            }
        } catch (e) {
            alert('error :' + e.message);
        }
    },
    checkAllUserList: function(obj) {
//        alert(obj.checked);
        if (obj.checked) {
            $("input:checkbox[name='chk[]']").each(function() {
                if (this.name == 'chk[]')
                    this.checked = true;
            });
        } else {
            $("input:checkbox[name='chk[]']").each(function() {
                if (this.name == 'chk[]')
                    this.checked = false;
            });
        }
    },
    checkAllUserListItem: function(obj) {
//        alert(obj.checked);
        if (obj.checked) {
            $("input:checkbox[name='chkItem[]']").each(function() {
                if (this.name == 'chkItem[]')
                    this.checked = true;
            });
        } else {
            $("input:checkbox[name='chkItem[]']").each(function() {
                if (this.name == 'chkItem[]')
                    this.checked = false;
            });
        }
    },
    //Huynv added 11-09-2013
    searchListUserNeedLog: function(orderType, orderField, page) {

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

        var strUrl = base_url + 'monter_admin/search_list_user_need_log/?ajax=1&pageNo=' + page;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchListUserNeedLogSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';

    },
    //Huynv added 11/09/2013
    searchListUserNeedLogSuccess: function(xmlhttp) {
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
    searchGroupTime: function(orderType, orderField, page) {

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

        var strUrl = base_url + 'monter_admin/search_group_time/?ajax=1&pageNo=' + page;
        //alert(strUrl);
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchGroupTimeSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';

    },
    searchGroupTimeSuccess: function(xmlhttp) {
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
    searchStageCat: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/search_stages_category/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchStageCatSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    searchStageCatSuccess: function(xmlhttp) {
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
    view_add_stage_cat: function() {

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/load_add_stage_category/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddStagesCateSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    //Huynv add 2013/07/30        
    view_add_group_time: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/load_add_group_time/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddStagesCateSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    //Huynv add 2013/07/31        
    view_add_stage_event_group_time: function() {
        //Nếu load lần đầu tiên
        if (firstTimeClickViewGroupTime == 0)
        {
            var base_url = Dom.get('base_url').value;
            //var token_stage_cat_id=Dom.get('token_stage_cat_id').value;
            //var strUrl = base_url+'../view/overlay_add_stage_event_group_time.php?token_stage_cat_id='+token_stage_cat_id;

            var strUrl = base_url + 'monter_admin/load_add_stage_event_group_time/?ajax=1';
            //alert(strUrl);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.LoadAddStagesCateGroupTimeSuccess,
                failure: MonterController.asyncRequestFalse
            });
            firstTimeClickViewGroupTime = 1;
        } else {
            MonterController.overlayCommonGT.show();
        }
    },
    //Huynv add 2013/08/01        
    view_load_edit_stage_event_group_time: function(stage_cat_id) {
        //Nếu load lần đầu tiên
        if (firstTimeClickViewGroupTime == 0)
        {
            var base_url = Dom.get('base_url').value;
            //var token_stage_cat_id=Dom.get('token_stage_cat_id').value;
            //var strUrl = base_url+'../view/overlay_add_stage_event_group_time.php?token_stage_cat_id='+token_stage_cat_id;

            var strUrl = base_url + 'monter_admin/load_edit_stage_event_group_time/?ajax=1&stage_cat_id=' + stage_cat_id;
            //alert(strUrl);
            YAHOO.util.Connect.asyncRequest('GET', strUrl, {
                success: MonterController.LoadAddStagesCateGroupTimeSuccess,
                failure: MonterController.asyncRequestFalse
            });
            firstTimeClickViewGroupTime = 1;
        } else {
            MonterController.overlayCommonGT.show();
        }

    },
    LoadAddStagesCateGroupTimeSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            MonterController.showStageCatGroupTime();
            Dom.get('StageCatGroupTime').innerHTML = "";
            Dom.get('StageCatGroupTime').innerHTML = aryData.html;
            //MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    LoadAddStagesCateSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;

        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    //Huynv added 2013/08/02
    //Kiểm tra xem có hàng cột nào chọn quá 5 dòng không?
    checkMaxTotalRowTimeEvent: function(obj) {
        var maxRowSelected = 5;
        var selected = new Array();
        $("input:checkbox[name=chk[]]:checked").each(function() {
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
    update_stage_cat_group_time: function(stage_cat_id) {
        var base_url = Dom.get('base_url').value;
        //Nếu tồn tại ít nhất 1 lần mở cửa sổ để chỉnh thời gian Stage Event Time thì mới cập nhật
        if (firstTimeClickViewGroupTime == 1)
        {
            MonterController.overlayCommonGT.show();
            //alert(stage_cat_id);
            var strUrl = base_url + 'monter_admin/add_update_stage_cat_group_time/?ajax=1&stage_cat_id=' + stage_cat_id;

            YAHOO.util.Connect.setForm('FrmstagePart', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.addNewStageCatGroupTimeSuccess,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    //Huynv added 2013/08/01
    add_stage_cat_group_time: function(stage_cat_id) {
        var base_url = Dom.get('base_url').value;

        if (firstTimeClickViewGroupTime == 1)
            MonterController.overlayCommonGT.show();
        var strUrl = base_url + 'monter_admin/add_new_stage_cat_group_time/?ajax=1&stage_cat_id=' + stage_cat_id;
        //var strUrl = base_url+'monter_admin/add_new_stage_cat_group_time/?ajax=1&form_elements='+form_elements;
        //alert('ok');
        YAHOO.util.Connect.setForm('FrmstagePart', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.addNewStageCatGroupTimeSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    //Huynv added 2013/08/01
    addNewStageCatGroupTimeSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommonGT.hide();
                //MonterController.overlayCommon.show();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/30
    add_group_time: function() {
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

        var strUrl = base_url + 'monter_admin/add_new_group_time';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.addNewGroupTimeSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    //Huynv added 2013/07/30
    addNewGroupTimeSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.searchGroupTime();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv modify 2013/08/01        
    add_stage_category: function() {
        var scTitle = Dom.get('stage_cat_name_vn').value;
        var scTitleEn = Dom.get('stage_cat_name_en').value;
        var scTitleJP = Dom.get('stage_cat_name').value;
        var scStartDate = Dom.get('stage_cat_start_date').value;
        var scExpireDate = Dom.get('stage_cat_finish_date').value;

        //if (!MonterController.checkMaxTotalRowTimeEvent()) return;
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
        var strUrl = base_url + 'monter_admin/add_new_stage_category';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.addNewStageCatSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
        //Huynv modify 2013/08/01
        //Sau khi chèn thành công stage cat thì update vào bảng stage_cat_group_time 
        //để cập nhật stage_cat_id 
//        strUrl = base_url+'monter_admin/update_stage_cat_group_time/&ajax=1&token_stage_cat_id='+token_stage_cat_id+"&stage_cat_id="+aryData.intIsOk;
//        alert("ok2");
//        YAHOO.util.Connect.asyncRequest ('GET', strUrl, {
//            upload: MonterController.updateTokenIdStageCatGroupTimeSuccess,
//            failure: MonterController.asyncRequestFalse
//        });
//        

    },
    updateTokenIdStageCatGroupTimeSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        alert("ok3" + strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                //MonterController.overlayCommon.hide();
                //MonterController.searchStageCat();
            } else {
                alert("loi:" + aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    addNewStageCatSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;

        try {
            var aryData = Json.parse(strJsonData);

            if (aryData.intIsOk >= 1) {
                MonterController.overlayCommon.hide();
                if (firstTimeClickViewGroupTime == 1) {
                    //Huynv added;
                    //Nếu có chọn thời gian cho sự kiện
                    //Sau khi chèn vào bảng m_stage_category thành công thì 
                    //Chèn vào bảng m_stage_cat_group_time
                    document.getElementById('token_stage_cat_id').value = aryData.intIsOk;
                    MonterController.add_stage_cat_group_time(aryData.intIsOk);
                    firstTimeClickViewGroupTime = 0;
                }
                MonterController.searchStageCat();
            } else {
                alert("loi:" + aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/31
    update_stage_event_group_time: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/update_stage_event_group_time';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.updateStateEventGroupTimeSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    //Huynv added 2013/07/31       
    updateStateEventGroupTimeSuccess: function(xmlhttp) {
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
    searchStage: function(orderType, orderField, page) {

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

        var strUrl = base_url + 'monter_admin/search_stage/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchStageSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    searchStageSuccess: function(xmlhttp) {
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
    view_add_stage: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/load_add_stage/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddStagesSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadAddStagesSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_stage: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/add_new_stage';
        YAHOO.util.Connect.setForm('Frmstage');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.addNewStageSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewStageSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.searchStage();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    searchStageBattle: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/search_stages_battle/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchStageBattleSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    searchStageBattleSuccess: function(xmlhttp) {
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
    view_add_stage_battle: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/load_add_stage_battle/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddStagesBattleSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadAddStagesBattleSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_stage_battle: function() {

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
        var strUrl = base_url + 'monter_admin/add_new_stage_battle';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.addNewStageBattleSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewStageBattleSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.searchStageBattle();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    autoCompletedList: function(param) {
        str_param = param;
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/auto_completed_search/?ajax=1&param=' + str_param;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.autoCompletedSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    autoCompletedSuccess: function(xmlhttp) {
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
    mobamon_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/mobamon_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.mobamonSearchSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    mobamonSearchSuccess: function(xmlhttp) {
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
    mobamon_load_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/mobamon_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddMobamonSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadAddMobamonSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_mobamon: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/mobamon_addNew';
        YAHOO.util.Connect.setForm('FrmMobamon', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.addNewMobamonSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewMobamonSuccess: function(xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/mobamon_view';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    skill_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/skill_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.skillSearchSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    pass_skill_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/pass_skill_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.pass_skillSearchSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    pass_skillSearchSuccess: function(xmlhttp) {
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
    skillSearchSuccess: function(xmlhttp) {
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
    skill_load_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/skill_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddSkillSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadAddSkillSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_skill: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/skill_addNew';
        YAHOO.util.Connect.setForm('FrmSkill');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.addNewSkillnSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewSkillnSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.skill_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    pass_skill_load_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/pass_skill_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddPassSkillSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadAddPassSkillSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    add_pass_skill: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/pass_skill_addNew';
        YAHOO.util.Connect.setForm('FrmSkill');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.addNewPassSkillnSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewPassSkillnSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.pass_skill_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    partner_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/partner_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchPartnerSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    searchPartnerSuccess: function(xmlhttp) {
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
    partner_load_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/partner_load_addNew/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddPartnerSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadAddPartnerSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        }
        catch (e) {
            alert(e.message);
            return;
        }
    },
    partner_save: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/partner_addNew';
        YAHOO.util.Connect.setForm('FrmPartner', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.partner_save_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    partner_save_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.partner_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    partner_delete_record: function(partner_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            var strUrl = base_url + 'monter_admin/partner_delete/?ajax=1&partner_id=' + partner_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.delPartnerSuccess,
                failure: MonterController.asyncRequestFalse
            });
        }
    },
    delPartnerSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.partner_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //add by cuongvm
    partner_load_edit: function(partner_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/partner_load_edit/?ajax=1&partner_id=' + partner_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadCategorySuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadCategorySuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    partner_update: function(partner_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/partner_update/?ajax=1&partner_id=' + partner_id;

        YAHOO.util.Connect.setForm('FrmPartner', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.partner_save_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    partner_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.partner_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/30        
    groupTime_load_edit: function(group_time_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/groupTime_load_update/?ajax=1&group_time_id=' + group_time_id;
        //alert(strUrl);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadGroupTimeSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    //Huynv added 2013/07/30        
    LoadGroupTimeSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    stageCat_load_edit: function(stageCat_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/stageCat_load_update/?ajax=1&stageCat_id=' + stageCat_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadStageCatSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadStageCatSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    //Huynv added 2013/07/30
    update_group_time: function(group_time_id) {
        var base_url = Dom.get('base_url').value;

        if (group_time_id) {
            var strUrl = base_url + 'monter_admin/groupTime_update/?ajax=1&group_time_id=' + group_time_id;

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
                upload: MonterController.groupTime_update_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }

    },
    //Huynv added 2013/07/30        
    groupTime_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.searchGroupTime();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/08/08        
    logUser_delete_record: function(log_user_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (log_user_id) {
                var strUrl = base_url + 'monter_admin/logUser_delete/?ajax=1&log_user_id=' + log_user_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delLogUserSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    //Huynv added 2013/07/31       
    delLogUserSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;

        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                MonterController.searchLogUser();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynv added 2013/07/31        
    groupTime_delete_record: function(group_time_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (group_time_id) {
                var strUrl = base_url + 'monter_admin/groupTime_delete/?ajax=1&group_time_id=' + group_time_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delGroupTimeSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    //Huynv added 2013/07/31       
    delGroupTimeSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            //alert(aryData.intIsOk);
            if (aryData.intIsOk == 1) {
                MonterController.searchGroupTime();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //Huynvd added 02/08/2013
    checkItemStageCategoryGroupTimeCheckBox: function() {
        //if (!MonterController.checkMaxTotalRowTimeEvent()) return;
        MonterController.overlayCommonGT.hide();
        MonterController.overlayCommon.show();
    },
    update_stage_category: function(stageCat_id) {
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
        //if (!MonterController.checkMaxTotalRowTimeEvent()) return;
        if (stageCat_id) {
            if (firstTimeClickViewGroupTime == 1)
                MonterController.overlayCommonGT.show();
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/stageCat_update/?ajax=1&stageCat_id=' + stageCat_id;
            YAHOO.util.Connect.setForm('Frmstage', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.stageCat_update_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    stageCat_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                if (firstTimeClickViewGroupTime == 1) {
                    //Huynv added;
                    //Nếu có chọn thời gian cho sự kiện
                    //Sau khi chèn vào bảng m_stage_category thành công thì 
                    //Chèn vào bảng m_stage_cat_group_time
                    //document.getElementById('token_stage_cat_id').value=aryData.intIsOk;
                    MonterController.update_stage_cat_group_time(document.getElementById('token_stage_cat_id').value);

                }
                MonterController.searchStageCat();
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
    list_user_need_log_delete_record: function(user_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (user_id) {
                var strUrl = base_url + 'monter_admin/user_need_log_delete_record/?ajax=1&user_id=' + user_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delListUserNeedLogDeleteRecordSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    delListUserNeedLogDeleteRecordSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.searchListUserNeedLog();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stageCat_delete_record: function(stageCat_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (stageCat_id) {
                var strUrl = base_url + 'monter_admin/stageCat_delete/?ajax=1&stageCat_id=' + stageCat_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delStageCatSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    delStageCatSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.searchStageCat();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_delete_record: function(stage_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (stage_id) {
                var strUrl = base_url + 'monter_admin/stage_delete/?ajax=1&stage_id=' + stage_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delStageSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    delStageSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.searchStage();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_load_sort: function(type, sort) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/stage_load_sort/?ajax=1&type=' + type + '&sort=' + sort;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.stage_load_sort_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    stage_load_sort_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    stage_load_update: function(stage_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/stage_load_update/?ajax=1&stage_id=' + stage_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.stage_load_update_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    stage_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    update_stage: function(stage_id) {
        var base_url = Dom.get('base_url').value;
        if (stage_id) {
            var strUrl = base_url + 'monter_admin/stage_update/?ajax=1&stage_id=' + stage_id;
            YAHOO.util.Connect.setForm('Frmstage');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.stage_update_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    stage_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.searchStage();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_battle_delete_record: function(stage_battle_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (stage_battle_id) {
                var strUrl = base_url + 'monter_admin/stage_battle_delete/?ajax=1&stage_battle_id=' + stage_battle_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delStageBattleSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    delStageBattleSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.searchStageBattle();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    stage_battle_load_update: function(stage_battle_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/stage_battle_load_update/?ajax=1&stage_battle_id=' + stage_battle_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.stage_battle_load_update_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    stage_battle_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    update_stage_battle: function(stage_battle_id) {
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
        if (stage_battle_id) {
            var strUrl = base_url + 'monter_admin/stage_battle_update/?ajax=1&stage_battle_id=' + stage_battle_id;
            YAHOO.util.Connect.setForm('Frmstage', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.stage_battle_update_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    stage_battle_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.searchStageBattle();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    mobamon_delete_record: function(mobamon_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (mobamon_id) {
                var strUrl = base_url + 'monter_admin/mobamon_delete/?ajax=1&mobamon_id=' + mobamon_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.mobamon_delete_record_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    mobamon_delete_record_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.mobamon_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    mobamon_load_edit: function(mobamon_id) {
        var base_url = Dom.get('base_url').value;
        if (mobamon_id) {
            var strUrl = base_url + 'monter_admin/mobamon_load_update/?ajax=1&mobamon_id=' + mobamon_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.mobamon_load_update_success,
                failure: MonterController.asyncRequestFalse
            });
        }
    },
    mobamon_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    update_mobamon: function(mobamon_id) {
        var base_url = Dom.get('base_url').value;
        if (mobamon_id) {
            var strUrl = base_url + 'monter_admin/mobamon_update/?ajax=1&mobamon_id=' + mobamon_id;
            YAHOO.util.Connect.setForm('FrmMobamon', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.update_mobamon_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    update_mobamon_success: function(xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/mobamon_view/';

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    deleteAttachmentFile: function() {
        Dom.get('img_attachment').innerHTML = '<input type="file" name="avata[]" id="avata"  />';
    },
    deleteImageAttachmentFile: function() {
        Dom.get('img_attachment').innerHTML = '<input type="file" name="partner_avata[]" id="partner_avata"  />';
    },
    deleteFragmentAttachmentFile: function() {
        Dom.get('img_attachment').innerHTML = '<input type="file" name="fragment_avata[]" id="fragment_avata"  />';
    },
    deleteAttFile: function(tag_name) {
        Dom.get('img_attachment_' + tag_name).innerHTML = '<input type="file" name="' + tag_name + '[]" id="' + tag_name + '"  />';
    },
    deleteAttFileIphone: function(tag_name) {
        Dom.get('img_attachment_' + tag_name).innerHTML = '<input type="file" name="' + tag_name + '[]" id="' + tag_name + '"  />';
    },
    login: function() {
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
        var strUrl = base_url + 'monter_admin/admin_login/?ajax=1';
        YAHOO.util.Connect.setForm('frmLogin');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.loginSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    loginSuccess: function(xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    skill_delete_record: function(skill_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (skill_id) {
                var strUrl = base_url + 'monter_admin/skill_delete/?ajax=1&skill_id=' + skill_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.skill_delete_record_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    skill_delete_record_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.skill_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    skill_load_edit: function(skill_id) {
        var base_url = Dom.get('base_url').value;
        if (skill_id) {
            var strUrl = base_url + 'monter_admin/skill_load_update/?ajax=1&skill_id=' + skill_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.skill_load_update_success,
                failure: MonterController.asyncRequestFalse
            });
        }
    },
    skill_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    update_skill: function(skill_id) {
        var base_url = Dom.get('base_url').value;
        if (skill_id) {
            var strUrl = base_url + 'monter_admin/skill_update/?ajax=1&skill_id=' + skill_id;
            YAHOO.util.Connect.setForm('FrmSkill');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.update_skill_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    update_skill_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.skill_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    pass_skill_delete_record: function(pass_skill_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (pass_skill_id) {
                var strUrl = base_url + 'monter_admin/pass_skill_delete/?ajax=1&pass_skill_id=' + pass_skill_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.pass_skill_delete_record_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    pass_skill_delete_record_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.pass_skill_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    pass_skill_load_edit: function(pass_skill_id) {
        var base_url = Dom.get('base_url').value;
        if (pass_skill_id) {
            var strUrl = base_url + 'monter_admin/pass_skill_load_update/?ajax=1&pass_skill_id=' + pass_skill_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.pass_skill_load_update_success,
                failure: MonterController.asyncRequestFalse
            });
        }
    },
    pass_skill_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    pass_update_skill: function(pass_skill_id) {
        var base_url = Dom.get('base_url').value;
        if (pass_skill_id) {
            var strUrl = base_url + 'monter_admin/pass_skill_update/?ajax=1&pass_skill_id=' + pass_skill_id;
            YAHOO.util.Connect.setForm('FrmSkill');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.pass_update_skill_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    pass_update_skill_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.pass_skill_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    /**
     * Search fragment
     */
    fragment_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/fragment_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchFragmentSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    searchFragmentSuccess: function(xmlhttp) {
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
    fragment_load_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/fragment_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadFragmentSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadFragmentSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    fragment_add_new: function() {
        //    if(this.ValidateUpload('fragment_avata') == false) return;
        // if(this.ValidateZiseUpload('fragment_avata',this.fragment_width,this.fragment_height) == false) return;

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/fragment_addNew';
        YAHOO.util.Connect.setForm('FrmFragment', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.fragmentAddSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    fragmentAddSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.fragment_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    fragment_load_edit: function(fragment_id) {
        var base_url = Dom.get('base_url').value;
        if (fragment_id) {
            var strUrl = base_url + 'monter_admin/fragment_load_edit/?ajax=1&fragment_id=' + fragment_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.fragment_load_update_success,
                failure: MonterController.asyncRequestFalse
            });
        }
    },
    fragment_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    fragment_update: function(fragment_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/fragment_update/?ajax=1&fragment_id=' + fragment_id;
        YAHOO.util.Connect.setForm('FrmFragment', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.fragment_save_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    fragment_save_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.fragment_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    ValidateTypeUpload: function(input) {
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
    ValidateZiseUpload: function(input, width, height) {
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
    fragment_delete_record: function(fragment_id) {
        var base_url = Dom.get('base_url').value;
        if (fragment_id) {
            answer = confirm(MonterController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'monter_admin/fragment_delete/?ajax=1&fragment_id=' + fragment_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delFragmentSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    delFragmentSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.fragment_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    news_search: function(orderType, orderField, page) {

        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = 'news_updated_date';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'monter_admin/news_search/?ajax=1&pageNo=' + page;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.newsSearchSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    newsSearchSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;

        try {
            var aryData = Json.parse(strJsonData);
            //            alert(aryData.html);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    news_add: function() {
        var num = Dom.get('news_present_content2').value;
        var presentSelected = Dom.get('news_present').selectedIndex;

        if (presentSelected <= 1)
        {

        } else if (isNaN(num) && presentSelected != 1)
        {
            alert("'Present Content' must be a NUMBER.");
            return;
        }

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/news_addNew';
        YAHOO.util.Connect.setForm('FrmNews', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.newsAddSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    newsAddSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {

                window.location = base_url + 'monter_admin/news_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    news_update: function(news_id, news_created_date, news_present) {
        var num = Dom.get('news_present_content2').value;
        var presentSelected = Dom.get('news_present').selectedIndex;

        if (presentSelected <= 1)
        {

        } else if (isNaN(num) && presentSelected != 1 && presentSelected != 9)
        {
            alert("'Present Content' must be a NUMBER.");
            return;
        }
        if (news_present != 9 && presentSelected == 9) {
            alert("'Single Present' can not change to 'MultiPresent'!");
            return;
        }
        if (news_present == 9 && presentSelected != 9) {
            alert(" 'MultiPresent' can not change to 'Single Present'!");
            return;
        }
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/news_update/?ajax=1&news_id=' + news_id + '&news_created_date=' + news_created_date;
        YAHOO.util.Connect.setForm('FrmNews', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.newsUpdateSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    newsUpdateSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/news_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
//    User News
    userNews_search: function(orderType, orderField, page) {

        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = 'news_updated_date';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'monter_admin/user_news_search/?ajax=1&pageNo=' + page;

        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.userNewsSearchSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    userNewsSearch_userID: function(orderType, orderField, page, user_id) {

        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = 'news_updated_date';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }


        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;
        var strUrl = '';
        if (user_id !== undefined) {
            strPost += '&user_id=' + user_id;
        }
		strUrl = base_url + 'monter_admin/user_news_search_user/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch1');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.userNewsSearchSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    userNewsSearchSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            //            alert(aryData.html);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            Dom.get('loading').innerHTML = '';

        } catch (e) {
            alert(e.message);
        }
    },
    userNews_add: function() {
        var num = Dom.get('news_present_content2').value;
        var presentSelected = Dom.get('news_present').selectedIndex;

        if (presentSelected <= 1)
        {

        } else if (isNaN(num) && presentSelected != 1 && presentSelected != 9)
        {
            alert("'Present Content' must be a NUMBER.");
            return;
        }

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/user_news_addNew';
        YAHOO.util.Connect.setForm('FrmNews', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.userNewsAddSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    userNewsAddSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {

                window.location = base_url + 'monter_admin/user_news_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    userNews_update: function(news_id, news_created_date, news_present) {
        var num = Dom.get('news_present_content2').value;
        var presentSelected = Dom.get('news_present').selectedIndex;

        if (presentSelected <= 1)
        {

        } else if (isNaN(num) && presentSelected != 1 && presentSelected != 9)
        {
            alert("'Present Content' must be a NUMBER.");
            return;
        }
        if (news_present != 9 && presentSelected == 9) {
            alert("'Single Present' can not change to 'MultiPresent'!");
            return;
        }
        if (news_present == 9 && presentSelected != 9) {
            alert(" 'MultiPresent' can not change to 'Single Present'!");
            return;
        }
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/user_news_update/?ajax=1&news_id=' + news_id + '&news_created_date=' + news_created_date;
        YAHOO.util.Connect.setForm('FrmNews', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.userNewsUpdateSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    userNewsUpdateSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/user_news_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //News
    // - check onload
    checkPresent: function(object, monsterListElement, quantityBoxElement, multiPresentElement1, multiPresentElement2) {
        if (object.selectedIndex == 0)
        {
            MonterController.hideElement(monsterListElement);
            MonterController.hideElement(quantityBoxElement);
            MonterController.hideElement(multiPresentElement1);
            MonterController.hideElement(multiPresentElement2);
        } else if (object.selectedIndex == 1)
        {
            MonterController.showElement(monsterListElement);
            MonterController.hideElement(quantityBoxElement);
            MonterController.hideElement(multiPresentElement1);
            MonterController.hideElement(multiPresentElement2);
        } else if (object.selectedIndex >= 2 && object.selectedIndex <= 8) {
            MonterController.showElement(quantityBoxElement);
            MonterController.hideElement(monsterListElement);
            MonterController.hideElement(multiPresentElement1);
            MonterController.hideElement(multiPresentElement2);
        } else {
            MonterController.hideElement(quantityBoxElement);
            MonterController.showElement(monsterListElement);
            MonterController.showElement(multiPresentElement1);
            MonterController.showElement(multiPresentElement2);

        }
    },
    // - hide n show
    showElement: function(id) {
        Dom.get(id).style.display = '';
    },
    hideElement: function(id) {
        Dom.get(id).style.display = 'none';
    },
    import_data: function() {
        if (Dom.get('skill_file').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(MonterController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/do_import/?ajax=1';
            YAHOO.util.Connect.setForm('frmUpload', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.import_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadingSkill').innerHTML = '<span class="status-msg-text">' + MonterController.IMPORTING_TEXT + '</span>';
        }
    },
    import_success: function(xmlhttp) {
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
    import_mobamon: function() {
        if (Dom.get('mobamon_file').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(MonterController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/do_import_mobamon/?ajax=1';
            YAHOO.util.Connect.setForm('frmUploadMobamon', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.import_mobamon_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadingMobamon').innerHTML = '<span class="status-msg-text">' + MonterController.IMPORTING_TEXT + '</span>';
        }
    },
    import_mobamon_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //        alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                Dom.get('loadingMobamon').innerHTML = "";
                if (aryData.flag == 1) {
                    Dom.get('Mobamon_msg').innerHTML = "Imported : " + aryData.counter + ' Records !';
                } else {
                    Dom.get('Mobamon_msg').innerHTML = "Updated : " + aryData.counter + ' Records !';
                }

            } else {
                alert(aryData.strError);
                Dom.get('loadingMobamon').innerHTML = "";
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    export_mobamon_data: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/export_mobamon_data/?ajax=1';
        //        YAHOO.util.Connect.setForm('frmUpload');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.export_mobamon_success,
            failure: MonterController.asyncRequestFalse
        });

    },
    export_mobamon_success: function(xmlhttp) {
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
    growth_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/growth_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.growth_search_success,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    growth_search_success: function(xmlhttp) {
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
    growth_load_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/growth_load_add_view/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.growth_load_add_view_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    growth_load_add_view_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    growth_add: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/growth_addNew';
        YAHOO.util.Connect.setForm('FrmGrowth');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.growth_add_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    growth_add_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.growth_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    growth_load_edit: function(growth_id) {
        var base_url = Dom.get('base_url').value;
        if (growth_id) {
            var strUrl = base_url + 'monter_admin/growth_load_update/?ajax=1&growth_id=' + growth_id;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.growth_load_update_success,
                failure: MonterController.asyncRequestFalse
            });
        }
    },
    growth_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    growth_update: function(growth_id) {
        var base_url = Dom.get('base_url').value;
        if (growth_id) {
            var strUrl = base_url + 'monter_admin/growth_update/?ajax=1&growth_id=' + growth_id;
            YAHOO.util.Connect.setForm('FrmGrowth');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.growth_update_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    growth_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.growth_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    growth_delete: function(growth_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (growth_id) {
                var strUrl = base_url + 'monter_admin/growth_delete/?ajax=1&growth_id=' + growth_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.growth_delete_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    growth_delete_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.growth_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    getMonterLv: function(monter_id, monter_lv_field) {
        ////alert(monter_id+'xxx'+monter_lv_field);
        var base_url = Dom.get('base_url').value;
        if (monter_id) {
            var strUrl = base_url + 'monter_admin/getMonterLv/?ajax=1&monter_id=' + monter_id + '&monter_lv_field=' + monter_lv_field;
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.getMonterLvSuccess,
                failure: MonterController.asyncRequestFalse
            });
        } else {
            alert('Plz choice monter ..!');
            return;
        }

    },
    getMonterLvSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            var field = aryData.monter_lv_field;
            if (aryData.intIsOk == 1) {
                Dom.get(field).innerHTML = aryData.html;
            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    help_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/help_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.help_search_success,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    help_search_success: function(xmlhttp) {
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
    help_add: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/help_addNew';
        YAHOO.util.Connect.setForm('FrmAdd', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.help_add_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    help_add_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/help_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    help_update: function(help_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/help_update/?ajax=1&help_id=' + help_id;
        YAHOO.util.Connect.setForm('FrmUpdate', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.help_update_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    help_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/help_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    help_delete_record: function(help_id) {
        var base_url = Dom.get('base_url').value;
        if (help_id) {
            answer = confirm(MonterController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'monter_admin/help_delete/?ajax=1&help_id=' + help_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.help_delete_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    help_delete_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.help_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    news_delete_record: function(news_id) {
        var base_url = Dom.get('base_url').value;
        if (news_id) {
            answer = confirm(MonterController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'monter_admin/news_delete/?ajax=1&news_id=' + news_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.news_delete_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    news_delete_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.news_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    user_news_delete_record: function(news_id) {
        var base_url = Dom.get('base_url').value;
        if (news_id) {
            answer = confirm(MonterController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'monter_admin/user_news_delete/?ajax=1&news_id=' + news_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.user_news_delete_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    user_news_delete_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.userNews_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    // - Topics
    topics_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/topics_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.topics_search_success,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    topics_search_success: function(xmlhttp) {
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
    topics_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/overlay_add_topic/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.topics_add_view_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    topics_add_new: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/topics_add_new';
        YAHOO.util.Connect.setForm('Frmstage', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.topics_add_new_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();

    },
    topics_add_new_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.topics_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    topics_add_view_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
            MonterController.autoImeOff();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    topics_update_view: function(tp_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/topics_update_view/?ajax=1&tp_id=' + tp_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.topics_update_view_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    topics_update_view_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    topics_update: function(tp_id) {
        var base_url = Dom.get('base_url').value;
        if (tp_id) {
            var strUrl = base_url + 'monter_admin/topics_update/?ajax=1&tp_id=' + tp_id;
            YAHOO.util.Connect.setForm('Frmstage', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.topics_update_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    topics_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.topics_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    topics_delete_record: function(tp_id) {
        var base_url = Dom.get('base_url').value;
        if (tp_id) {
            answer = confirm(MonterController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'monter_admin/topics_delete/?ajax=1&tp_id=' + tp_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.topics_delete_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    topics_delete_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.topics_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    /*
     * Present Code
     */
    present_code_add_view: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/overlay_add_present_code/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.present_code_add_view_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    present_code_add_view_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
            //MonterController.autoImeOff();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    present_code_add: function() {
        var monster = Dom.get('pc_present_content1').value;
        var num = Dom.get('pc_present_content2').value;
        var presentSelected = Dom.get('pc_type').value;
        var maxAvailable = Dom.get('pc_max_available').value;
        var pcTitle = Dom.get('pc_title').value;
        var pcStartDate = Dom.get('pc_start_date').value;
        var pcExpireDate = Dom.get('pc_expire_date').value;

        if (pcTitle == null || pcTitle === "")
        {
            alert("Please Input Title.");
            return;
        }

        if ((isNaN(num) || num < 1) && presentSelected != 1 && presentSelected != 9)
        {
            alert("'Present Content' must be a NUMBER.");
            return;
        }
        if ((isNaN(monster) || monster < 1) && presentSelected == 1)
        {
            alert("'Monster ID' must greater than 0!");
            return;
        }
        if (isNaN(maxAvailable) || maxAvailable < 1)
        {
            alert("'Max. Players' must be a NUMBER.");
            return;
        }
        var re = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
        if (pcStartDate === "" || (pcStartDate !== '' && !pcStartDate.match(re))) {
            alert("'Start Date' Invalid date format ");
            return;
        }
        if (pcExpireDate === "" || (pcExpireDate !== '' && !pcExpireDate.match(re))) {
            alert("'End Date' Invalid date format ");
            return;
        }

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/present_code_add';
        YAHOO.util.Connect.setForm('FormPresentCode');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.presentCodeAddSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    presentCodeAddSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            MonterController.overlayCommon.hide();
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/present_code_view/';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    present_code_update: function(pc_id, pc_type) {
        var monster = Dom.get('pc_present_content1').value;
        var num = Dom.get('pc_present_content2').value;
        var presentSelected = Dom.get('pc_type').value;
        var maxAvailable = Dom.get('pc_max_available').value;
        var pcTitle = Dom.get('pc_title').value;
        var pcStartDate = Dom.get('pc_start_date').value;
        var pcExpireDate = Dom.get('pc_expire_date').value;

        if (pcTitle == null || pcTitle === "")
        {
            alert("Please Input Title.");
            return;
        }

        if ((isNaN(num) || num < 1) && presentSelected != 1 && presentSelected != 9)
        {
            alert("'Present Content' must be a NUMBER.");
            return;
        }
        if ((isNaN(monster) || monster < 1) && presentSelected == 1)
        {
            alert("'Monster ID' must greater than 0!");
            return;
        }
        if (pc_type != 9 && presentSelected == 9) {
            alert("'Single Present' can not change to 'MultiPresent'!");
            return;
        }
        if (pc_type == 9 && presentSelected != 9) {
            alert(" 'MultiPresent' can not change to 'Single Present'!");
            return;
        }
        if (isNaN(maxAvailable) || maxAvailable < 1)
        {
            alert("'Max. Players' must be a NUMBER.");
            return;
        }
        var re = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
        if (pcStartDate === "" || (pcStartDate !== '' && !pcStartDate.match(re))) {
            alert("'Start Date' Invalid date format ");
            return;
        }
        if (pcExpireDate === "" || (pcExpireDate !== '' && !pcExpireDate.match(re))) {
            alert("'End Date' Invalid date format ");
            return;
        }

        var base_url = Dom.get('base_url').value;
        if (pc_id) {
            var strUrl = base_url + 'monter_admin/present_code_update/?ajax=1&pc_id=' + pc_id;
            YAHOO.util.Connect.setForm('Frmstage');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.present_code_update_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
        }
    },
    present_code_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.overlayCommon.hide();
                MonterController.present_code_search();
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    //
    present_code_search: function(orderType, orderField, page) {
        var base_url = Dom.get('base_url').value;

        if (orderField == undefined) {
            orderField = 'pc_updated_date';
        }

        if (orderType == undefined) {
            orderType = 'DESC';
        }

        if (page == undefined) {
            page = 1;
        }
        var strPost = '';
        strPost += 'orderType=' + orderType + '&orderField=' + orderField;

        var strUrl = base_url + 'monter_admin/present_code_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.topics_search_success,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    present_code_search_success: function(xmlhttp) {
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
    present_code_delete_record: function(pc_id) {
        var base_url = Dom.get('base_url').value;
        if (pc_id) {
            answer = confirm(MonterController.DELETE_CONFIRM);
            if (answer) {
                var strUrl = base_url + 'monter_admin/present_code_delete/?ajax=1&pc_id=' + pc_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.present_code_delete_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    present_code_delete_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                MonterController.present_code_search();

            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    present_code_update_view: function(pc_id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/present_code_update_view/?ajax=1&pc_id=' + pc_id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.topics_update_view_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    // - check onload
    pc_check_present_add: function(object) {
        if (object.selectedIndex == 0) {
            MonterController.showElement('monsterList1');
            MonterController.hideElement('quantityBox1');
            MonterController.hideElement('multiPresent1');
            MonterController.hideElement('multiPresent2');
        } else if (object.selectedIndex < 8) {
            MonterController.hideElement('monsterList1');
            MonterController.showElement('quantityBox1');
            MonterController.hideElement('multiPresent1');
            MonterController.hideElement('multiPresent2');
        } else {
            MonterController.showElement('monsterList1');
            MonterController.hideElement('quantityBox1');
            MonterController.showElement('multiPresent1');
            MonterController.showElement('multiPresent2');
        }
    },
    pc_check_present_update: function(object) {
        if (object.selectedIndex == 0) {
            MonterController.showElement('monsterList1');
            MonterController.hideElement('quantityBox1');
            MonterController.hideElement('multiPresent1');
            MonterController.hideElement('multiPresent2');
        } else if (object.selectedIndex < 8) {
            MonterController.hideElement('monsterList1');
            MonterController.showElement('quantityBox1');
            MonterController.hideElement('multiPresent1');
            MonterController.hideElement('multiPresent2');
        } else {
            MonterController.showElement('monsterList1');
            MonterController.hideElement('quantityBox1');
            MonterController.showElement('multiPresent1');
            MonterController.showElement('multiPresent2');
        }
    },
    import_stage_cat: function() {
        if (Dom.get('stage_cat').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(MonterController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/do_import_stage_cat/?ajax=1';
            YAHOO.util.Connect.setForm('frmUploadStageCat', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.import_stage_cat_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadingMobamon').innerHTML = '<span class="status-msg-text">' + MonterController.IMPORTING_TEXT + '</span>';
        }
    },
    import_stage_cat_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //        alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                Dom.get('loadingMobamon').innerHTML = "";
                if (aryData.flag == 1) {
                    Dom.get('Mobamon_msg').innerHTML = "Imported : " + aryData.counter + ' Records !';
                } else {
                    Dom.get('Mobamon_msg').innerHTML = "Updated : " + aryData.counter + ' Records !';
                }

            } else {
                alert(aryData.strError);
                Dom.get('loadingMobamon').innerHTML = "";
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    import_stage: function() {
        if (Dom.get('stage').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(MonterController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/do_import_stage/?ajax=1';
            YAHOO.util.Connect.setForm('frmUploadStage', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.import_stage_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadingMobamon').innerHTML = '<span class="status-msg-text">' + MonterController.IMPORTING_TEXT + '</span>';
        }
    },
    import_stage_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //        alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                Dom.get('loadingMobamon').innerHTML = "";
                if (aryData.flag == 1) {
                    Dom.get('Mobamon_msg').innerHTML = "Imported : " + aryData.counter + ' Records !';
                } else {
                    Dom.get('Mobamon_msg').innerHTML = "Updated : " + aryData.counter + ' Records !';
                }

            } else {
                alert(aryData.strError);
                Dom.get('loadingMobamon').innerHTML = "";
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    import_stage_battle: function() {
        if (Dom.get('stage_battle').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(MonterController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/do_import_stage_battle/?ajax=1';
            YAHOO.util.Connect.setForm('frmUploadStageBattle', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.import_stage_battle_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadingMobamon').innerHTML = '<span class="status-msg-text">' + MonterController.IMPORTING_TEXT + '</span>';
        }
    },
    import_stage_battle_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //        alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                Dom.get('loadingMobamon').innerHTML = "";
                if (aryData.flag == 1) {
                    Dom.get('Mobamon_msg').innerHTML = "Imported : " + aryData.counter + ' Records !';
                } else {
                    Dom.get('Mobamon_msg').innerHTML = "Updated : " + aryData.counter + ' Records !';
                }

            } else {
                alert(aryData.strError);
                Dom.get('loadingMobamon').innerHTML = "";
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    import_passive_skill: function() {
        if (Dom.get('pass_skill_file').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(MonterController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/do_import_passive_skill/?ajax=1';
            YAHOO.util.Connect.setForm('frmPassive', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.import_passive_skill_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadingMobamon').innerHTML = '<span class="status-msg-text">' + MonterController.IMPORTING_TEXT + '</span>';
        }
    },
    import_passive_skill_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //        alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                Dom.get('loadingMobamon').innerHTML = "";
                if (aryData.flag == 1) {
                    Dom.get('Mobamon_msg').innerHTML = "Imported : " + aryData.counter + ' Records !';
                } else {
                    Dom.get('Mobamon_msg').innerHTML = "Updated : " + aryData.counter + ' Records !';
                }

            } else {
                alert(aryData.strError);
                Dom.get('loadingMobamon').innerHTML = "";
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    import_growth_data: function() {
        if (Dom.get('growth_file').value == '') {
            alert(' Please Input Excel Data File !');
            return;
        }
        answer = confirm(MonterController.IMPORTING_CONFIRM);
        if (answer) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/do_import_growth_data/?ajax=1';
            YAHOO.util.Connect.setForm('frmUploadGrowthData', true);
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                upload: MonterController.import_growth_success,
                failure: MonterController.asyncRequestFalse
            });
            YAHOO.util.Connect.resetFormState();
            Dom.get('loadinggrowth').innerHTML = '<span class="status-msg-text">' + MonterController.IMPORTING_TEXT + '</span>';
        }
    },
    import_growth_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //        alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                Dom.get('loadinggrowth').innerHTML = "";
                if (aryData.flag == 1) {
                    Dom.get('growth_msg').innerHTML = "Imported : " + aryData.counter + ' Records !';
                } else {
                    Dom.get('growth_msg').innerHTML = "Updated : " + aryData.counter + ' Records !';
                }

            } else {
                alert(aryData.strError);
                Dom.get('loadinggrowth').innerHTML = aryData.strError;
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    sendPushService: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/sendRequestPushService';
        YAHOO.util.Connect.setForm('FrmMobamon', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.pushServiceSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    pushServiceSuccess: function(xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                //window.location = base_url+'monter_admin/push_service';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    viewMonster: function(tag_name) {
        //        alert(tag_name);
        var Index = document.FrmMobamon.ranking_type_1.selectedIndex;//[document.menuForm.select1.selectedIndex].value
        if (Index == 1) {
            document.getElementById('monster_view_select_1').style.display = '';
        } else {
            Dom.get('monster_view_select_1').innerHTML = '';
        }
    },
    add_ranking_bonus: function() {

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
        var strUrl = base_url + 'monter_admin/addRankingBonus';
        YAHOO.util.Connect.setForm('FrmMobamon', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.addNewRankingSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    addNewRankingSuccess: function(xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/mobamon_add_ranking_bonus';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    ranking_load_update: function(id) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/ranking_load_update/?ajax=1&ranking_id=' + id;
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.ranking_load_update_success,
            failure: MonterController.asyncRequestFalse
        });
    },
    ranking_load_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var aryData = Json.parse(strJsonData);
        try {
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    view_add_ranking_bonus: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/load_add_ranking_bonus/?ajax=1';
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.LoadAddRankingSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    LoadAddRankingSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    ranking_delete_record: function(ranking_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm(MonterController.DELETE_CONFIRM);
        if (answer) {
            if (ranking_id) {
                var strUrl = base_url + 'monter_admin/ranking_delete/?ajax=1&ranking_id=' + ranking_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.delRankingSuccess,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    delRankingSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/mobamon_add_ranking_bonus';
            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    update_ranking_bonus: function(ranking_id) {

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
        var strUrl = base_url + 'monter_admin/updateRankingBonus/?ajax=1&ranking_id=' + ranking_id;

        YAHOO.util.Connect.setForm('FrmMobamon', true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.updateRankingSuccess,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    updateRankingSuccess: function(xmlhttp) {
        var base_url = Dom.get('base_url').value;
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/mobamon_add_ranking_bonus';
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    log_search: function(orderType, orderField, page) {
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

        var strUrl = base_url + 'monter_admin/log_search/?ajax=1&pageNo=' + page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.log_search_success,
            failure: MonterController.asyncRequestFalse
        }, strPost);

        Dom.get('loading').innerHTML = '<span class="status-msg-text">' + MonterController.SEARCHING_TEXT + '</span>';
    },
    log_search_success: function(xmlhttp) {
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
    log_update_stattus: function(log_id) {
        var base_url = Dom.get('base_url').value;
        answer = confirm('Are you sure fixed this bug ?');
        if (answer) {
            if (log_id) {
                var strUrl = base_url + 'monter_admin/log_update_status/?ajax=1&log_id=' + log_id;
                YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                    success: MonterController.log_update_success,
                    failure: MonterController.asyncRequestFalse
                });
            }
        }
    },
    log_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        var base_url = Dom.get('base_url').value;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                window.location = base_url + 'monter_admin/log_view';
            } else {
                alert(aryData.strError);
            }
        } catch (e) {
            alert(e.message);
        }
    },
    select_lang_box: function(lang) {
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
    autoImeOff: function() {
        var fields = ['tp_title_vn',
            'tp_title_en',
            'tp_content_vn',
            'tp_content_en'];
        for (var k in fields) {
            Dom.get(fields[k]).style.imeMode = "disabled";
        }

    },
    gacha_banner_update: function(lang) {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/gacha_banner_update/?ajax=1&lang='+lang;
        YAHOO.util.Connect.setForm('FrmMobamon'+lang, true);
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            upload: MonterController.gacha_banner_update_success,
            failure: MonterController.asyncRequestFalse
        });
        YAHOO.util.Connect.resetFormState();
    },
    gacha_banner_update_success: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                var base_url = Dom.get('base_url').value;
                window.location = base_url + 'monter_admin/gacha_banner_load_update/';
				alert(aryData.strError);
            } else {
                alert(aryData.strError);
                return;
            }
        } catch (e) {
            alert(e.message);
        }
    },
    searchRankingbonus: function() {

        var base_url = Dom.get('base_url').value;
        //alert(orderType);
        var strPost = '';

        var strUrl = base_url + 'monter_admin/mobamon_add_ranking_bonus/?ajax=1';
        YAHOO.util.Connect.setForm('frmsearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.searchRankingbonusSuccess,
            failure: MonterController.asyncRequestFalse
        }, strPost);

    },
    searchRankingbonusSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            //            var aryData = Json.parse(strJsonData);
            //            Dom.get('result').innerHTML = aryData.html;
            //            Dom.get('strPaging1').innerHTML = aryData.strPaging;
            //            Dom.get('strPaging2').innerHTML = aryData.strPaging;
            //            Dom.get('loading').innerHTML ='';

        } catch (e) {
            alert(e.message);
        }
    },
    changeMaintenance: function() {

        if (confirm('値を変更しても宜しいですか？')) {
            var base_url = Dom.get('base_url').value;
            var strUrl = base_url + 'monter_admin/saveOption/?ajax=1';
            YAHOO.util.Connect.setForm('FrmSearch');
            YAHOO.util.Connect.asyncRequest('POST', strUrl, {
                success: MonterController.changeMaintenanceSuccess,
                failure: MonterController.asyncRequestFalse
            });

        }
    },
    changeMaintenanceSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                var base_url = Dom.get('base_url').value;
                window.location = base_url + 'monter_admin/option/';
            } else {
                alert(aryData.strError);
                return;
            }

        } catch (e) {
            alert(e.message);
        }
    },
    addBlackList: function() {

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/addBlackList/?ajax=1';
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.addBlackListSuccess,
            failure: MonterController.asyncRequestFalse
        });

    },
    addBlackListSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                var base_url = Dom.get('base_url').value;
                window.location = base_url + 'monter_admin/option/';
            } else {
                alert(aryData.strError);
                return;
            }

        } catch (e) {
            alert(e.message);
        }
    },
    delBlackList: function() {

        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/delBlackList/?ajax=1';
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.delBlackListSuccess,
            failure: MonterController.asyncRequestFalse
        });

    },
    delBlackListSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        //alert(strJsonData);
        try {
            var aryData = Json.parse(strJsonData);
            if (aryData.intIsOk == 1) {
                var base_url = Dom.get('base_url').value;
                window.location = base_url + 'monter_admin/option/';
            } else {
                alert(aryData.strError);
                return;
            }

        } catch (e) {
            alert(e.message);
        }
    },
    viewListGacha: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/viewListGacha/?ajax=1';
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.viewListGachaSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    viewListGachaSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    viewListCheckRank: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/viewListCheckRank/?ajax=1';
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.viewListCheckRankSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    viewListCheckRankSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    },
    viewMonster6star: function() {
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url + 'monter_admin/viewMonster6star/?ajax=1';
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest('POST', strUrl, {
            success: MonterController.viewMonster6starSuccess,
            failure: MonterController.asyncRequestFalse
        });
    },
    viewMonster6starSuccess: function(xmlhttp) {
        var strJsonData = xmlhttp.responseText;
        try {
            var aryData = Json.parse(strJsonData);
            Dom.get('CommonOverlay').innerHTML = aryData.html;
            MonterController.showCommonOverlay();
        } catch (e) {
            alert(e.message);
            return;
        }
    }



};
