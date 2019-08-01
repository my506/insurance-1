
!function(window) {
    "use strict";

    var doc = window.document
      , ydui = {};

    $(window).on('load', function() {});

    var util = ydui.util = {

        parseOptions: function(string) {},

        pageScroll: function() {}(),

        localStorage: function() {}(),

        sessionStorage: function() {}(),

        serialize: function(value) {},

        deserialize: function(value) {}
    };

    function storage(ls) {}

    $.fn.emulateTransitionEnd = function(duration) {}
    ;

    if (typeof define === 'function') {
        define(ydui);
    } else {
        window.YDUI = ydui;
    }

}(window);

!function(window) {
    "use strict";

    function Tab(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Tab.DEFAULTS, options || {});
        this.init();
        this.bindEvent();
        this.transitioning = false;
    }

    Tab.TRANSITION_DURATION = 150;

    Tab.DEFAULTS = {
        nav: '.tab-nav-item',
        panel: '.tab-panel-item',
        activeClass: 'tab-active'
    };

    Tab.prototype.init = function() {
        var _this = this
          , $element = _this.$element;

        _this.$nav = $element.find(_this.options.nav);
        _this.$panel = $element.find(_this.options.panel);
    }
    ;

    Tab.prototype.bindEvent = function() {
        var _this = this;
        _this.$nav.each(function(e) {
            $(this).on('click.ydui.tab', function() {
                _this.open(e);
            });
        });
    }
    ;

    Tab.prototype.open = function(index) {
        var _this = this;

        index = typeof index == 'number' ? index : _this.$nav.filter(index).index();

        var $curNav = _this.$nav.eq(index);

        _this.active($curNav, _this.$nav);

        _this.active(_this.$panel.eq(index), _this.$panel, function() {
            $curNav.trigger({
                type: 'opened.ydui.tab',
                index: index
            });
            _this.transitioning = false;
        });
    }
    ;

    Tab.prototype.active = function($element, $container, callback) {
        var _this = this
          , activeClass = _this.options.activeClass;

        var $avtive = $container.filter('.' + activeClass);

        function next() {
            typeof callback == 'function' && callback();
        }

        $element.one('webkitTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION);

        $avtive.removeClass(activeClass);
        $element.addClass(activeClass);
    }
    ;

    function Plugin(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function() {
            var target = this
              , $this = $(target)
              , tab = $this.data('ydui.tab');

            if (!tab) {
                $this.data('ydui.tab', (tab = new Tab(target,option)));
            }

            if (typeof option == 'string') {
                tab[option] && tab[option].apply(tab, args);
            }
        });
    }

    $(window).on('load.ydui.tab', function() {
        $('[data-ydui-tab]').each(function() {
            var $this = $(this);
            $this.tab(window.YDUI.util.parseOptions($this.data('ydui-tab')));
        });
    });

    $.fn.tab = Plugin;

}(window);

getPrice = function (code){
	var age = $("#age").val();
	var hasSocial = $("input[name='hasSocial']:checked").val();
	if(document.getElementById("coverage")){
		var index1 = document.getElementById("coverage").selectedIndex;
		var coverage = document.getElementById("coverage").options[index1].value;
	} else {
		var coverage = null;
	}
	if(document.getElementById("deadLine")){
		var index2 = document.getElementById("deadLine").selectedIndex;
		var deadLine = document.getElementById("deadLine").options[index2].value; 
	} else {
		var deadLine = null;
	}
	
	$.ajax({
		async: false,
        url: "getPrice.action",
        type: "post",
        data:{"code":JSON.stringify(code),"age":JSON.stringify(age),"hasSocial":JSON.stringify(hasSocial),"coverage":JSON.stringify(coverage),"deadLine":JSON.stringify(deadLine)},
        success: function (msg) {
        	if(msg.status==99999){
        	alert(msg.message);
        	window.location.href= 'productDetail.action?productCode='+code
        	}
        	else {
        		var val= msg.data;
            	document.getElementById("price").value=val;
        	}
        },
        error: function (msg) {
        	if(msg.status==99999){
            	alert(msg.message);
            	window.location.href= 'productDetail.action?productCode='+code
            	}
            	else {
            		var val= msg.data;
                	document.getElementById("price").value=val;
            	}
        }
	});
};
