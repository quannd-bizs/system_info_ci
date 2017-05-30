//$(document).ready(function() {
//    //    var base_url = AdminController.getBaseURL();
//    //    var url= base_url+'index.php/system/plugins/tiny_mce/tiny_mce_jquery.js';
//    //    alert(url);
//    alert($('textarea[name=news_content]').val());
////    alert($('textarea#tinymce'));return;
//    if($('textarea#tinymce').val){
//        tinyMCE.init({
//            // General options
//            mode : "textareas",
//            theme : "advanced",
//            plugins : "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
//
//            // Theme options
//            theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
//            theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
//            theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
//            theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",
//            theme_advanced_toolbar_location : "top",
//            theme_advanced_toolbar_align : "left",
//            theme_advanced_statusbar_location : "bottom",
//            theme_advanced_resizing : true,
//
//            // Skin options
//            skin : "o2k7",
//            skin_variant : "silver"
//        });
//    }
//});
//
//
//
//
//$(document).ready(function() {
//    $('textarea.news_content').tinymce({
//        // Location of TinyMCE script
//        script_url : '/tiny_mce_jquery.js',
//        theme : "advanced",
//        language : "vi",
//        width:"100%",
//        height:"500",
//        plugins : "advimage,safari,pagebreak,layer,table,save,advimage,advlink,emotions,eBizIcon,eBizIcon2,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
//
//        // Theme options
//        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
//        theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,search,replace,bullist,numlist,blockquote,undo,redo,link,unlink,anchor,image,cleanup,insertdate,inserttime,preview,forecolor,backcolor",
//        theme_advanced_buttons3 : "tablecontrols,hr,removeformat,visualaid,sub,sup,charmap,emotions,eBizIcon,eBizIcon2,print,fullscreen",
//        //theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
//        theme_advanced_toolbar_location : "top",
//        theme_advanced_toolbar_align : "left",
//        theme_advanced_statusbar_location : "bottom",
//        theme_advanced_path : false,
//        theme_advanced_resize_horizontal : false,
//        theme_advanced_resizing : true,
//        forced_root_block : false,
//        force_br_newlines : true,
//        force_p_newlines : true,
//
//
//        // Example content CSS (should be your site CSS)
//        content_css : "/public/css/admin/blackadmin/form/tinymce.css",
//        // Replace values for the template plugin
//        template_replace_values : {
//            username : "Some User",
//            staffid : "991234"
//        }
//    });
//});

/*
$(document).ready(function() {
    $('textarea.product_highlight').tinymce({
        // Location of TinyMCE script
        script_url : '/system/plugins/tiny_mce/tiny_mce_jquery.js',
        theme : "advanced",
        language : "vi",
        width:"100%",
        height:"200",
        plugins : "advimage,safari,pagebreak,layer,table,save,advimage,advlink,emotions,eBizIcon,eBizIcon2,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

        // Theme options
        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect,undo,redo,link,unlink,anchor",
        theme_advanced_buttons2 : "",
        theme_advanced_buttons3 : "",
        theme_advanced_buttons4 : "",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_statusbar_location : "bottom",
        theme_advanced_path : false,
        theme_advanced_resize_horizontal : false,
        theme_advanced_resizing : true,
        forced_root_block : false,
        force_br_newlines : true,
        force_p_newlines : true,
        // Example content CSS (should be your site CSS)
        content_css : "/public/css/admin/blackadmin/form/tinymce.css"
    });
});
$(document).ready(function() {
    $('textarea.product_promotional').tinymce({
        // Location of TinyMCE script
        script_url : '/public/js/extension/tiny_mce/tiny_mce_jquery.js',
        theme : "advanced",
        language : "vi",
        width:"100%",
        height:"200",
        plugins : "advimage,safari,pagebreak,layer,table,save,advimage,advlink,emotions,eBizIcon,eBizIcon2,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

        // Theme options
        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect,undo,redo,link,unlink,anchor",
        theme_advanced_buttons2 : "",
        theme_advanced_buttons3 : "",
        theme_advanced_buttons4 : "",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_statusbar_location : "bottom",
        theme_advanced_path : false,
        theme_advanced_resize_horizontal : false,
        theme_advanced_resizing : true,
        forced_root_block : false,
        force_br_newlines : true,
        force_p_newlines : true,
        // Example content CSS (should be your site CSS)
        content_css : "/public/css/admin/blackadmin/form/tinymce.css"
    });
});

  
$(document).ready(function() {
    $("#uploadify").uploadify({
        'uploader'       : '/public/js/extension/uploadify.swf',
        'script'         : '/admin/procesMultiUpload/?ajax=1',
        'cancelImg'      : '/public/images/form/cancel.png',
        'folder'         : '/public/images/upload',
        'queueID'        : 'fileQueue',
        'queueSizeLimit' : 10,
        'fileDataName'   : 'test[]',
        'fileDesc'       : 'Image Files',
        'fileExt'        : '*.jpg;*.jpeg;*.gif;*.png',
        //'buttonText'     : 'Chon anh',
        'buttonImg'     : '/public/images/form/chonanh.png',
        'sizeLimit'      : 512000,
        'multi'          : true,
        onComplete: function (evt, queueID, fileObj, response, data) {
            //                             alert(response);
            //            var content= tinyMCE.get('member_post_content').getContent();
            //            tinyMCE.get('member_post_content').setContent(content+response);
            //            tinyMCE.execCommand('mceInsertContent', false, '<br>'+response+'<br>');
            //            tinyMCE.execInstanceCommand(tinyMCE.getEditorId('product_content'), 'mceInsertContent', false, '<br>'+response+'<br>', true);
            tinyMCE.getInstanceById('product_content').getWin().focus();
            tinyMCE.execCommand('mceInsertContent',false,'<br>'+response+'<br>');
        }
    });
});

$(document).ready(function() {
    $("#uploadifyNews").uploadify({
        'uploader'       : '/public/js/extension/uploadify.swf',
        'script'         : '/admin/procesMultiUpload/?ajax=1',
        'cancelImg'      : '/public/images/form/cancel.png',
        'folder'         : '/public/images/upload',
        'queueID'        : 'fileQueueNews',
        'queueSizeLimit' : 10,
        'fileDataName'   : 'test[]',
        'fileDesc'       : 'Image Files',
        'fileExt'        : '*.jpg;*.jpeg;*.gif;*.png',
        //'buttonText'     : 'Chon anh',
        'buttonImg'     : '/public/images/form/chonanh.png',
        'sizeLimit'      : 512000,
        'multi'          : true,
        onComplete: function (evt, queueID, fileObj, response, data) {
            //                             alert(response);
            //            var content= tinyMCE.get('member_post_content').getContent();
            //            tinyMCE.get('member_post_content').setContent(content+response);
            //            tinyMCE.execCommand('mceInsertContent', false, '<br>'+response+'<br>');
            //            tinyMCE.execInstanceCommand(tinyMCE.getEditorId('product_content'), 'mceInsertContent', false, '<br>'+response+'<br>', true);
            tinyMCE.getInstanceById('news_content').getWin().focus();
            tinyMCE.execCommand('mceInsertContent',false,'<br>'+response+'<br>');
        }
    });
});
*/