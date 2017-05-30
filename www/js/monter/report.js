
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

var ReportController = {
    SEARCHING_TEXT :"Downloading.....",
    CANCEL_CONFIRM : 'Do you want to cancel ?',
    DELETE_CONFIRM : 'Are you sure delete this record ?',
    DELETE_FILE_CONFIRM : 'Are you sure delete this file ?',
    IMPORTING_TEXT:'Importing data....',
    IMPORTING_CONFIRM:'Are you sure import data from this Excel File ?',
    
    //return false when request
    asyncRequestFalse:function(){
        alert('Sorry ! System Error !');
    },
    
    export_dispersion_csv :function(){        
        var base_url = Dom.get('base_url').value;
        var strUrl = base_url+'monster_report/export_dispersion_csv/';
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.export_dispersion_success,
            failure: ReportController.asyncRequestFalse
        });
        Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ ReportController.SEARCHING_TEXT+'</span>';
    },
    export_dispersion_success:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;   
        alert(strJsonData);
        try{
            var aryData = Json.parse(strJsonData);
          
            Dom.get('loading').innerHTML ='';

        }catch(e){
            alert(e.message);
        }
    },
    searchKpi :function(type,orderType,orderField,page){
        var base_url = Dom.get('base_url').value;
        if(type == undefined){
            type = 0;
        }

        if(orderField == undefined){
            orderField = 'regist_date';
        }
        if(orderType == undefined){
            orderType = 'DESC';
        }

        if(page == undefined){
            page = 1;
        }
        var strPost ='';
        strPost+= 'orderType='+orderType+'&orderField='+orderField + '&type=' + type;

        var strUrl = base_url+'monster_report/searchKpi/?ajax=1&pageNo='+page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.searchKpiSuccess,
            failure: ReportController.asyncRequestFalse
        },strPost);

    //Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ MonterController.SEARCHING_TEXT+'</span>';
    },
    searchKpiSuccess:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;
        try{
            var aryData = Json.parse(strJsonData);
            //alert(aryData.html);
            Dom.get('result').innerHTML = aryData.html;

        }catch(e){
            alert(e.message);
        }
    },
    searchContinuation :function(type,orderType,orderField,page){
        var base_url = Dom.get('base_url').value;
        if(type == undefined){
            type = 0;
        }

        if(orderField == undefined){
            orderField = 'regist_date';
        }
        if(orderType == undefined){
            orderType = 'DESC';
        }

        if(page == undefined){
            page = 1;
        }
        var strPost ='';
        strPost+= 'orderType='+orderType+'&orderField='+orderField + '&type=' + type;

        var strUrl = base_url+'monster_report/searchContinuation/?ajax=1&pageNo='+page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.searchContinuationSuccess,
            failure: ReportController.asyncRequestFalse
        },strPost);

    //Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ MonterController.SEARCHING_TEXT+'</span>';
    },
    searchContinuationSuccess:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;
        try{
            var aryData = Json.parse(strJsonData);
            //alert(aryData.html);
            Dom.get('result').innerHTML = aryData.html;

        }catch(e){
            alert(e.message);
        }
    },    
    dispersion_search :function(){
        var base_url = Dom.get('base_url').value;                
        var strUrl = base_url+'monster_report/search_dispersion/?ajax=1';
        YAHOO.util.Connect.setForm('frmsearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.dispersion_search_success,
            failure: ReportController.asyncRequestFalse
        });

        Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ ReportController.SEARCHING_TEXT+'</span>';
    },
    dispersion_search_success:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;        
        try{
            var aryData = Json.parse(strJsonData);
            if(aryData.intIsOk ==1){
                Dom.get('result').innerHTML = aryData.html;
                Dom.get('result2').innerHTML = aryData.html2;
                Dom.get('loading').innerHTML = "";
            }else{
                alert(aryData.strError);
            }

        }catch(e){
            alert(e.message);
        }
    },
    search_user:function(type){
        if(type == undefined){
            type = 0;
        }
        var base_url = Dom.get('base_url').value;                
        var strUrl = base_url+'monster_report/search_user/?type='+type;
        YAHOO.util.Connect.setForm('frmsearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.search_user_success,
            failure: ReportController.asyncRequestFalse
        });
        Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ ReportController.SEARCHING_TEXT+'</span>';
    },
    search_user_success:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;        
        try{
            var aryData = Json.parse(strJsonData);
            if(aryData.intIsOk ==1){
                Dom.get('result').innerHTML = aryData.html;
                Dom.get('result2').innerHTML = aryData.html2;
                Dom.get('loading').innerHTML = "";
            }else{
                alert(aryData.strError);
            }

        }catch(e){
            alert(e.message);
        }

    },
    searchQuest :function(type,orderType,orderField,page){
        var base_url = Dom.get('base_url').value;
        if(type == undefined){
            type = 0;
        }

        if(orderField == undefined){
            orderField = 'regist_date';
        }
        if(orderType == undefined){
            orderType = 'DESC';
        }

        if(page == undefined){
            page = 1;
        }
        var strPost ='';
        strPost+= 'orderType='+orderType+'&orderField='+orderField + '&type=' + type;

        var strUrl = base_url+'monster_report/searchQuest/?ajax=1&pageNo='+page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.searchQuestSuccess,
            failure: ReportController.asyncRequestFalse
        },strPost);

    //Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ MonterController.SEARCHING_TEXT+'</span>';
    },
    searchQuestSuccess:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;
        try{
            var aryData = Json.parse(strJsonData);
            Dom.get('result').innerHTML = aryData.html;
            Dom.get('result1').innerHTML = aryData.html_event;
            
        }catch(e){
            alert(e.message);
        }
    },
    searchCharges :function(type,orderType,orderField,page){
        var base_url = Dom.get('base_url').value;
        if(type == undefined){
            type = 0;
        }

        if(orderField == undefined){
            orderField = 'regist_date';
        }
        if(orderType == undefined){
            orderType = 'DESC';
        }

        if(page == undefined){
            page = 1;
        }
        var strPost ='';
        strPost+= 'orderType='+orderType+'&orderField='+orderField + '&type=' + type;

        var strUrl = base_url+'monster_report/searchCharges/?ajax=1&pageNo='+page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.searchChargesSuccess,
            failure: ReportController.asyncRequestFalse
        },strPost);

    //Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ MonterController.SEARCHING_TEXT+'</span>';
    },
    searchChargesSuccess:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;
        try{
            var aryData = Json.parse(strJsonData);
            //alert(aryData.html_type1);
            
            Dom.get('result_1').innerHTML = aryData.html;
            Dom.get('result_2').innerHTML = aryData.html_type2;
            Dom.get('result_3').innerHTML = aryData.html_type3;
            Dom.get('result_4').innerHTML = aryData.html_type4;
            Dom.get('result_5').innerHTML = aryData.html_type5;
            Dom.get('result_6').innerHTML = aryData.html_type6;
            Dom.get('result_7').innerHTML = aryData.html_type7;
            Dom.get('result_8').innerHTML = aryData.html_type8;
            Dom.get('result_9').innerHTML = aryData.html_type9;
            Dom.get('result_10').innerHTML = aryData.html_type10;
        }catch(e){
            alert(e.message);
        }
    },
    searchStageEvent :function(type,orderType,orderField,page){
        var base_url = Dom.get('base_url').value;
        if(type == undefined){
            type = 0;
        }

        if(orderField == undefined){
            orderField = 'regist_date';
        }
        if(orderType == undefined){
            orderType = 'DESC';
        }

        if(page == undefined){
            page = 1;
        }
        var strPost ='';
        strPost+= 'orderType='+orderType+'&orderField='+orderField + '&type=' + type;

        var strUrl = base_url+'monster_report/searchEvent/?ajax=1&pageNo='+page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.searchStageEventSuccess,
            failure: ReportController.asyncRequestFalse
        },strPost);

    //Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ MonterController.SEARCHING_TEXT+'</span>';
    },
    searchStageEventSuccess:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;
        try{
            var aryData = Json.parse(strJsonData);
            //alert(aryData.html_type1);

            Dom.get('result').innerHTML = aryData.html;
        }catch(e){
            alert(e.message);
        }
    },
    search_user_social:function(type){
        if(type == undefined){
            type = 0;
        }
        var base_url = Dom.get('base_url').value;                
        var strUrl = base_url+'monster_report/search_user_social/?type='+type;
        YAHOO.util.Connect.setForm('frmsearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.search_user_social_success,
            failure: ReportController.asyncRequestFalse
        });
        Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ ReportController.SEARCHING_TEXT+'</span>';
    },
    search_user_social_success:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;        
        try{
            var aryData = Json.parse(strJsonData);
            if(aryData.intIsOk ==1){
                Dom.get('result').innerHTML = aryData.html;
                Dom.get('loading').innerHTML = "";
            }else{
                alert(aryData.strError);
            }
        }catch(e){
            alert(e.message);
        }
    },
        searchTutorial :function(type,orderType,orderField,page){
        var base_url = Dom.get('base_url').value;
        if(type == undefined){
            type = 0;
        }

        if(orderField == undefined){
            orderField = 'regist_date';
        }
        if(orderType == undefined){
            orderType = 'DESC';
        }

        if(page == undefined){
            page = 1;
        }
        var strPost ='';
        strPost+= 'orderType='+orderType+'&orderField='+orderField + '&type=' + type;

        var strUrl = base_url+'monster_report/searchTutorial/?ajax=1&pageNo='+page;
        YAHOO.util.Connect.setForm('FrmSearch');
        YAHOO.util.Connect.asyncRequest ('POST', strUrl, {
            success: ReportController.TutorialSuccess,
            failure: ReportController.asyncRequestFalse
        },strPost);

    //Dom.get('loading').innerHTML ='<span class="status-msg-text">'+ MonterController.SEARCHING_TEXT+'</span>';
    },
    TutorialSuccess:function(xmlhttp){
        var strJsonData = xmlhttp.responseText;
        try{
            var aryData = Json.parse(strJsonData);
            //alert(aryData.html_type1);

            Dom.get('result').innerHTML = aryData.html;
        }catch(e){
            alert(e.message);
        }
    }

};
