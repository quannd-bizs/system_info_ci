/**
 *  @Desc: Images, file on server management 
 *  
 *  @author : haimv@d-hearts.com
 *  @date: 2012.08.20
 *  
 */
var Connect = YAHOO.util.Connect,
Panel = YAHOO.widget.Panel,
KeyListener = YAHOO.util.KeyListener,
Event = YAHOO.util.Event,
Dom = YAHOO.util.Dom,
Json = YAHOO.lang.JSON;

var FileController = {
    openKCFinder:function(field) {
        var base_url = Dom.get('base_url').value;
          
        var div = document.getElementById('kcfinder_div');
        if (div.style.display == "block") {
            div.style.display = 'none';
            div.innerHTML = '';
            return;
        }
        window.KCFinder = {
            callBack: function(url) {
                window.KCFinder = null;
                field.value = url;
                div.style.display = 'none';
                div.innerHTML = '';
            }
        };
        //
        div.innerHTML = '<iframe name="kcfinder_iframe" src="<?echo base_url();?>www/common/ckeditorCustom/kcfinder/browse.php?type=files&dir=files/public" ' +
        'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no" />';
        div.style.display = 'block';
    }
};