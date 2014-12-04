var WebPaneViewer = WebPaneViewer || function (object) 
{
	
	var root = this;
	this.object	= object;
		
	this.settings = {
		object_top: "0px",
		object_left: "0px",
		object_width: 1688,
		object_height: 1125,
		mouse_x: 0,
		mouse_y: 0,
		window_width: 0,
		window_height: 0
	}
	
	WebPaneViewer.prototype.update_css = function ()
	{
		
		root.object.style.position = "absolute";		
		
	}
		
	WebPaneViewer.prototype.update_dimensions = function ()
	{

		var e = window.event;
		
		root.settings.window_width = window.innerWidth;
		root.settings.window_height = window.innerHeight;		
		
		diff_x = (root.settings.window_width - root.settings.object_width),
		perc_x = (root.settings.mouse_x / root.settings.window_width);
		diff_y = (root.settings.window_height - root.settings.object_height),
		perc_y = (root.settings.mouse_y / root.settings.window_height);
		
		root.settings.mouse_x = e.clientX;
		root.settings.mouse_y = e.clientY;
		
		root.settings.object_left = (perc_x * diff_x) + "px";
		root.settings.object_top = (perc_y * diff_y) + "px";

		root.update_object();
		
	}
	
	WebPaneViewer.prototype.update_object = function ()
	{
		
		var tween = TweenMax.to(root.object, 3, {left: root.settings.object_left, top: root.settings.object_top, ease: Cubic.easeOut});
		
	}

	WebPaneViewer.prototype.mouse_move = function ()
	{
		
		var e = window.event, 
		diff_x = (root.settings.window_width - root.settings.object_width),
		perc_x = (root.settings.mouse_x / root.settings.window_width);
		
		root.settings.mouse_x = e.clientX;
		root.settings.mouse_y = e.clientY;
		
		root.settings.object_left = (perc_x * diff_x) + "px";
		root.settings.object_top = (perc_y * diff_y) + "px";
		
		root.update_dimensions();
		root.update_object();
				
	}

	WebPaneViewer.prototype.resize = function ()
	{
				
		root.update_dimensions();
		root.update_object();

	}
		
	window.addEventListener("mousemove", root.mouse_move);
	window.addEventListener("resize", root.resize);

	WebPaneViewer.prototype.init = function () 
	{
		
		root.update_css();	
		root.update_dimensions();	
			
	}
	
	root.init();
	
};