

/*

$(window).responsive([
	{500: function() {
		console.log(500);
	}},
	{700: function() {
		console.log(700);
	}},	
	{1000: function() {
		console.log(1000);
	}}
]);

*/
(function ($) {   

	'use strict';
	
    $.fn.breakpoints = function (config) {
	
		var min = 0;
		var max = 0;				
		var previousBreakpoint = null;
		var breakpoints = []; 
		var callbacks = {}; 
		var currentWidth = null;
		
		if (options && Object.keys(options).length > 0) {						
			$.each(options, function(breakpoint, func){				
				if (!isNaN(breakpoint) && typeof options[breakpoint] === 'function') {
					breakpoints.push(breakpoint);
					callbacks[breakpoint] = func;					
				}			
			});
		}		
		
		console.log(breakpoints);
		console.log(callbacks);
		
		if (breakpoints.length > 0) {
			currentWidth = $(window).width();
			tryCallback(currentWidth);
			$(window).on('resize orientationchange', function () {			
				tryCallback(currentWidth);
			});
		}
		
		function tryCallback(width) {	
			
			// is this the same breakpoint
			if ((width != 0 && max != 0) && (width > min && width <= max)) {
				// callback already run for this breakpoint. do nothing				
				return;
			}		
			
			// figure out the min and max widths
			for (var i = 0, l = breakpoints.length; i < l; i++) {
				if (width > breakpoints[i]) {					
					// min is the Math.max() of the larger numbers
					min = (0 == min) ? (breakpoints[i - 1] || 0) : Math.max(breakpoints[i], min);					
				}				
				if (width < breakpoints[i]) {				
					// max is the Math.min() of the larger numbers
					max = (0 == max) ? breakpoints[i] : Math.min(breakpoints[i], max);
				}				
			}
			
			// see if the min/max have gone up or down. thus entering or exiting
			if (null == previousBreakpoint) {
				previousBreakpoint = max;
				if (typeof callbacks[previousBreakpoint]['enter'] === 'function') {
					callbacks[previousBreakpoint].enter.call();	
				}
				else if (typeof callbacks[previousBreakpoint] === 'function') {
					callbacks[(width > previousBreakpoint ? max : min)].call();
				}
			}
			/*
			else if (width > previousBreakpoint) {
				// gone up in size. call the lower exit and the higher enter
				if (typeof callbacks[previousBreakpoint].exit === 'function') {
					callbacks[previousBreakpoint].exit.call();
				}
				if (typeof callbacks[previousBreakpoint].enter === 'function') {
					callbacks[max].enter.call();
				}
			}
			else if (width < previousBreakpoint) {
				// gone down in size. call the higher exit and the lower enter
				if (typeof callbacks[previousBreakpoint].exit === 'function') {
					callbacks[previousBreakpoint].exit.call();
				}
				if (typeof callbacks[previousBreakpoint].enter === 'function') {
					callbacks[min].enter.call();
				}
			}*/
			else {
				// gone down in size. call the higher exit and the lower enter
				if (typeof callbacks[previousBreakpoint]['exit'] === 'function') {
					callbacks[previousBreakpoint].exit.call();
				}
				if (typeof callbacks[previousBreakpoint]['enter'] === 'function') {
					callbacks[(width > previousBreakpoint ? max : min)].enter.call();
				}
				else if (typeof callbacks[previousBreakpoint] === 'function') {
					callbacks[(width > previousBreakpoint ? max : min)].call();
				}
			}
			
			// call the current breakpoints enter
			
			
			// if there is an 'exit' function for the previous breakpoint then call it
			// if there is an 'enter' function for the current breakpoint then call it
			
			//console.log(min);
			//console.log(max);
			//console.log('looking for breakpoint ...');
			
			// seek the current breakpoint and run callback
			/*for (var i = 0, l = breakpoints.length; i < l; i++) {
				
				console.log('compare w:' + width + ' with bp:' + breakpoints[i]);
				//console.log(breakpoints[i]);
			
				if (breakpoints[i] == width) {
					min = breakpoints[i-1] || 0;
					max = breakpoints[i];
					
					console.log('current callback is ' + breakpoints[i]);
					
					// try to run the callback for this breakpoint
					console.log(callbacks[breakpoints[i]]);
					callbacks[breakpoints[i]].call();
					
					break;
				}
			}	*/		        
        }
    };
 
})(jQuery);