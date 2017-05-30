/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2011 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.7.0-dev
 *
 */



(function($) {

    $.fn.lazyload = function(options) {
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            skip_invisible  : true
        };
                
        if(options) {
            /* Maintain BC for a couple of version. */
            if (null !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            
            $.extend(settings, options);
        }

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if (0 == settings.event.indexOf("scroll")) {
            $(settings.container).bind(settings.event, function(event) {
                var counter = 0;
                elements.each(function() {
                    if (settings.skip_invisible && !$(this).is(":visible")) return;
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                    /* Nothing. */
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                        $(this).trigger("appear");
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });

                /* Remove image from array so it is not looped next time. */
                var temp = $.grep(elements, function(element) {
                    return !element.loaded;
                });
                elements = $(temp);

            });
        }
        
        this.each(function() {
            var self = this;            
            self.loaded = false;
            
            /* When appear is triggered load original image. */
            $(self).one("appear", function() {
                if (!this.loaded) {
                    $("<img />")
                    .bind("load", function() {
                        $(self)
                        .hide()
                        .attr("src", $(self).data("original"))
                        [settings.effect](settings.effectspeed);
                        self.loaded = true;
                    })
                    .attr("src", $(self).data("original"));
                };
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 != settings.event.indexOf("scroll")) {
                $(self).bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });
        
        /* Check if something appears when window is resized. */
        $(window).bind("resize", function(event) {
            $(settings.container).trigger(settings.event);
        });
        
        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);
        
        return this;

    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) {
            return $.belowthefold(a, {
                threshold : 0, 
                container: window
            })
        },
        "above-the-fold" : function(a) {
            return !$.belowthefold(a, {
                threshold : 0, 
                container: window
            })
        },
        "right-of-fold"  : function(a) {
            return $.rightoffold(a, {
                threshold : 0, 
                container: window
            })
        },
        "left-of-fold"   : function(a) {
            return !$.rightoffold(a, {
                threshold : 0, 
                container: window
            })
        }
    });
    
})(jQuery);


$(document).ready(function(){
    $("img").lazyload();
    $('#home').append('<div id="back-top" style="display:none;" title="Lên đầu trang">Lên đầu trang</div>');
    $(window).scroll(function() {
        if($(window).scrollTop() != 0) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });
    $('#back-top').click(function() {
        $('html, body').animate({
            scrollTop:0
        },500);
    });
    
    
});

function scrollDeals(name){    
    $('html,body').animate({
        scrollTop: $("."+name).offset().top
    }, 1000);
}


//slide anh
var currentImage;
var currentIndex = -1;
var interval;
function showImage(index){
    if(index < $('#bigPic img').length){
        var indexImage = $('#bigPic img')[index]
        if(currentImage){
            if(currentImage != indexImage ){
                $(currentImage).css('z-index',2);
                clearTimeout(myTimer);
                $(currentImage).hide(function() {
                    myTimer = setTimeout("showNext()", 4000);
                    $(this).hide().css({
                        'z-index':1
                    });
                });
            }
        }
        $(indexImage).show();
        currentImage = indexImage;
        currentIndex = index;
        $('#thumbs li').removeClass('active');
        $($('#thumbs li')[index]).addClass('active');
    }
}

function showNext(){
    var len = $('#bigPic img').length;
    var next = currentIndex < (len-1) ? currentIndex + 1 : 0;
    showImage(next);
}
var myTimer;

$(document).ready(function() {
    myTimer = setTimeout("showNext()", 6000);
    showNext(); //loads first image
    $('#thumbs li').bind('click',function(e){
        var count = $(this).attr('rel');
        showImage(parseInt(count)-1);
    });
});



(function($) {
    $.fn.jFlow = function(options) {

        var opts = $.extend({}, $.fn.jFlow.defaults, options);

        var randNum = Math.floor(Math.random()*11);

        var jFC = opts.controller;

        var jFS =  opts.slideWrapper;

        var jSel = opts.selectedWrapper;
		
        var cur = 0;

        var timer;

        var maxi = $(jFC).length;

        // sliding function

        var slide = function (dur, i) {

            $(opts.slides).children().css({

                overflow:"hidden"

            });

            $(opts.slides + " iframe").hide().addClass("temp_hide");

            $(opts.slides).animate({

                marginLeft: "-" + (i * $(opts.slides).find(":first-child").width() + "px")

            },

            opts.duration*(dur),

                opts.easing,

                function(){

                    $(opts.slides).children().css({

                        overflow:"hidden"

                    });

                    $(".temp_hide").show();

                }

                );	

        }

        $(this).find(jFC).each(function(i){

            $(this).click(function(){

                dotimer();

                if ($(opts.slides).is(":not(:animated)")) {

                    $(jFC).removeClass(jSel);

                    $(this).addClass(jSel);

                    var dur = Math.abs(cur-i);

                    slide(dur,i);

                    cur = i;

                }

            });

        });	

		

        $(opts.slides).before('<div id="'+jFS.substring(1, jFS.length)+'"></div>').appendTo(jFS);

		

        $(opts.slides).find("div").each(function(){

            $(this).before('<div class="jFlowSlideContainer"></div>').appendTo($(this).prev());

        });

		

        //initialize the controller

        $(jFC).eq(cur).addClass(jSel);

		

        var resize = function (x){

            $(jFS).css({

                position:"relative",

                width: opts.width,

                height: opts.height,

                overflow: "hidden"

            });

            //opts.slides or #mySlides container

            $(opts.slides).css({

                position:"relative",

                width: $(jFS).width()*$(jFC).length+"px",

                height: $(jFS).height()+"px",

                overflow: "hidden"

            });

            // jFlowSlideContainer

            $(opts.slides).children().css({

                position:"relative",

                width: $(jFS).width()+"px",

                height: $(jFS).height()+"px",

                "float":"left",

                overflow:"hidden"

            });

			

            $(opts.slides).css({

                marginLeft: "-" + (cur * $(opts.slides).find(":eq(0)").width() + "px")

            });

        }

		

        // sets initial size

        resize();



        // resets size

        $(window).resize(function(){

            resize();						  

        });

		

        $(opts.prev).click(function(){

            dotimer();

            doprev();
			
        });

		

        $(opts.next).click(function(){

            dotimer();

            donext();		

        });

		

        var doprev = function (x){

            if ($(opts.slides).is(":not(:animated)")) {

                var dur = 1;

                if (cur > 0)

                    cur--;

                else {

                    cur = maxi -1;

                    dur = cur;

                }

                $(jFC).removeClass(jSel);

                slide(dur,cur);

                $(jFC).eq(cur).addClass(jSel);

            }

        }

		

        var donext = function (x){

            if ($(opts.slides).is(":not(:animated)")) {

                var dur = 1;

                if (cur < maxi - 1)

                    cur++;

                else {

                    cur = 0;

                    dur = maxi -1;

                }

                $(jFC).removeClass(jSel);

                //$(jFS).fadeOut("fast");

                slide(dur, cur);

                //$(jFS).fadeIn("fast");

                $(jFC).eq(cur).addClass(jSel);

            }

        }

		

        var dotimer = function (x){

            if((opts.auto) == true) {

                if(timer != null) 

                    clearInterval(timer);

			    

                timer = setInterval(function() {

                    $(opts.next).click();

                }, 8000);
				

            }

        }


        //Pause/Resume function fires at hover

        dotimer();
		
        $(opts.slides).hover(
			
            function() {
		
                clearInterval(timer);
		
            },
		
            function() {
                dotimer();
		
            }
		
            );
    };

	

    $.fn.jFlow.defaults = {

        controller: "#myController", // must be class, use . sign

        slideWrapper : "#mySlides", // must be id, use # sign

        selectedWrapper: ".jFlowSelected",  // just pure text, no sign

        auto: true,

        easing: "swing",

        duration: 400,

        width: "100%",

        prev: ".jFlowPrev", // must be class, use . sign

        next: ".jFlowNext" // must be class, use . sign

    };


})(jQuery);

