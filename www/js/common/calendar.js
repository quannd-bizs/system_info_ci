/**
 * List  datatable
 * @author Lucdt <lucdt@vnext.vn>
 * @author PhuND <phund@vnext.vn>
 * @last update: 20/3/2010
 */
var CalendarController = {

    Dom : YAHOO.util.Dom,
    Event : YAHOO.util.Event,
    cal1: null,
    /**
     * Thuoc tinh khai bao overlay cua calendar da duoc bat len hay chua
     * - true: dang bat
     * - false: tat
     * @author PhuND
     */
    over_cal : false,
    cur_field : '',
    divCalendar : 'calContainerCalendar',
    init : function() {
        CalendarController.panel = new YAHOO.widget.Overlay(CalendarController.divCalendar, {
            visible: false
        });
        CalendarController.panel.setBody('<div id="calContainer" style="display:none"></div>');

        CalendarController.panel.render(document.body);
        CalendarController.cal1 = new YAHOO.widget.Calendar("cal1","calContainer", {
            START_WEEKDAY: 1,
            MULTI_SELECT:false,
            close:true,
            //change title to japanese text, PhuND 20/3/2010
            title:""
        });
        CalendarController.cal1.cfg.setProperty("MDY_YEAR_POSITION", 1);
        CalendarController.cal1.cfg.setProperty("MDY_MONTH_POSITION", 2);
        CalendarController.cal1.cfg.setProperty("MDY_DAY_POSITION", 3);

        CalendarController.cal1.cfg.setProperty("MY_YEAR_POSITION", 1);
        CalendarController.cal1.cfg.setProperty("MY_MONTH_POSITION", 2);

        /*Date labels for Japanese locale*/
        CalendarController.cal1.cfg.setProperty("MONTHS_SHORT",   ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708",
            "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"]);
        CalendarController.cal1.cfg.setProperty("MONTHS_LONG",    ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708",
            "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"]);
        CalendarController.cal1.cfg.setProperty("WEEKDAYS_1CHAR", ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"]);
        CalendarController.cal1.cfg.setProperty("WEEKDAYS_SHORT", ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"]);
        CalendarController.cal1.cfg.setProperty("WEEKDAYS_MEDIUM",["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"]);
        CalendarController.cal1.cfg.setProperty("WEEKDAYS_LONG",  ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"]);

        // Month/Year label format for Japan
        CalendarController.cal1.cfg.setProperty("MY_LABEL_YEAR_POSITION",  1);
        CalendarController.cal1.cfg.setProperty("MY_LABEL_MONTH_POSITION",  2);
        CalendarController.cal1.cfg.setProperty("MY_LABEL_YEAR_SUFFIX",  "\u5E74");
        CalendarController.cal1.cfg.setProperty("MY_LABEL_MONTH_SUFFIX",  "");

        CalendarController.cal1.selectEvent.subscribe(CalendarController.getDate, CalendarController.cal1, true);
        CalendarController.cal1.renderEvent.subscribe(CalendarController.setupListeners, CalendarController.cal1, true);
        CalendarController.cal1.render();

    // CalendarController.cal1.render(document.body);
    //dp.SyntaxHighlighter.HighlightAll('code');
    } ,

    setupListeners : function() {
        CalendarController.Event.addListener(CalendarController.divCalendar, 'mouseover', function() {
            CalendarController.over_cal = true;
        });
        CalendarController.Event.addListener(CalendarController.divCalendar, 'mouseout', function() {
            CalendarController.over_cal = false;
        });
        //add listener to closed icon by PhuND, 20/3/2010.
        var lnk = Dom.getElementsByClassName("link-close", "a");
        CalendarController.Event.addListener(lnk[0], 'click', function() {
            CalendarController.over_cal = false;
            CalendarController.hideCal_rename();
        });
    },

    getDate : function() {
        var calDate = this.getSelectedDates()[0];

        var month = calDate.getMonth() + 1;
        month = month >= 10 ? month : "0" + month;
        var day = calDate.getDate();
        day = day >= 10 ? day : "0" + day;

        calDate = calDate.getFullYear() + '/' + month + '/' + day;
        CalendarController.cur_field.value = calDate;

        if (CalendarController.cur_field.id == 'issue_broadcast_date')
            IssueController.getDayOfWeek(CalendarController.cur_field);

        CalendarController.over_cal = false;
        CalendarController.hideCal_rename();
    },

    /**
     * Adding onTop for calendar display position
     * @author PhuND, 24/3/2010
     */
    showCal : function(ev,tar, onTop, isLeft) {
        /**
         * set overlay on is true
         * and set init() runing
         */
        if ((Dom.get('calContainer') != null) && (CalendarController.panel != undefined)) {
            //ThanhDH: if open another calendar when one exists -> close before init.
            CalendarController.over_cal = false;
            CalendarController.hideCal_rename();
        }
        CalendarController.over_cal = false;
        CalendarController.init();

        tar = YAHOO.util.Dom.get(tar);
        tar.style.imeMode = "inactive";
        tar.onblur=function (){
            if (CalendarController.over_cal == false){
                CalendarController.hideCal_rename();
            }
        }

        CalendarController.cur_field = tar;
        if (tar.disabled) return;

        var xy = Dom.getXY(ev),
        date = tar.value;
        if (!CalendarController.isDate(tar.value) )  date = '';

        if (date) {
            CalendarController.cal1.cfg.setProperty('selected', date);
            CalendarController.cal1.cfg.setProperty('pagedate', new Date(date), true);
        } else {
            CalendarController.cal1.cfg.setProperty('selected', '');
            CalendarController.cal1.cfg.setProperty('pagedate', new Date(), true);
        }
        CalendarController.cal1.render();

        xy[0] = xy[0] - 180;
        //alert(xy[1]);

        if(isLeft=='left') {
            //alert(xy[0]);
            xy[0] = xy[0] + 100;
        }
        if (onTop == null) {
            xy[1] = xy[1] + 20;
        //alert(xy[1]);
        }
        else if (onTop == true) {
            xy[1] = xy[1] - 300;
        //alert(xy[1]);
        }
        /* ThanhDH added
         * to get browser ident
         * to hack IE6. Fix bug 4474 (at right conner calendar is smaller)
         */
        var b_name = navigator.appName;
        var b_ver = navigator.appVersion;
        var thatIndex = b_ver.indexOf("MSIE 6.");
        if ((b_name == 'Microsoft Internet Explorer') && (thatIndex != -1)) {
            CalendarController.panel.cfg.setProperty('width','200px');
        }

        /*end added Microsoft Internet Explorer
         */
        CalendarController.Dom.setXY(CalendarController.divCalendar, xy);
        //sai thuoc tinh css, fixed by PhuND, 20/3/2010
        //Dom.setStyle(CalendarController.divCalendar, 'z-index', '30000');
        Dom.setStyle(CalendarController.divCalendar, 'zIndex', '30000');
//        Dom.setStyle(CalendarController.divCalendar, 'left', '130px');
       // Dom.setStyle(CalendarController.divCalendar, 'top', '150px');
        Dom.setStyle('calContainer', 'display', 'block');

        CalendarController.panel.show();
    },

    hideCal_rename : function() {
        if (false === CalendarController.over_cal) {
            //Dom.setStyle(CalendarController.divCalendar, 'z-index', '0');
            //sai thuoc tinh css, fixed by PhuND, 20/3/2010
            Dom.setStyle(CalendarController.divCalendar, 'zIndex', '-1');
            Dom.setStyle('calContainer', 'display', 'none');
            CalendarController.panel.hide();
        }
    },
    forceHideCal : function() {
        //if click on calendar (tag A). This trick is used only with IE.
        var focusEl = document.activeElement;
        if (focusEl.tagName == 'A') {
            return;
        } else {
            CalendarController.over_cal = false;
            CalendarController.hideCal_rename();
        }
    },
    isDate : function(strValue){

        var objRegExp  =  /^\d{4}\/\d{1,2}\/\d{1,2}$/;
        //check for Date Format
        if(!objRegExp.test(strValue))return false;
        datebits = strValue.split('/');
        year = parseInt(datebits[0],10);
        month = parseInt(datebits[1],10);
        day = parseInt(datebits[2],10);

        if ((month<1) || (month>12) || (day<1) ||
            ((month==2) && (day>28+(!(year%4))-(!(year%100))+(!(year%400)))) ||
            (day>30+((month>7)^(month&1)))) return false; // date out of range

        return true;

    }
};
/*Comment for moved init() function to show_cal
 by PhuND, 20/3/2010*/
//CalendarController.init();