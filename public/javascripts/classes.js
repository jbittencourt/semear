function BoundaryBox(x,y,w,h) {
    //boundary boxes contatins the real coordinates of the object in the canvas
       
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.isInside = function(point) {
        r = (this.x <= point.x &&
           this.y <= point.y &&
           this.x + this.w >= point.x &&
           this.y + this.h >= point.y
           );
        return r;
    }
}

function clikableLabel(name, x, y) {
    this.name = name;
    this.position = new Point2D();
    this.position.x = x;
    this.position.y = y;
    
    this.box = new BoundaryBox(x,y,0,0);
    
	this.isInside = function(point) {
	    return this.box.isInside(point);
    }    
    
}

function Map() {
    this.seeds = new Object();
    this.connections = new Object();
}

function Seed(name,x,y)
{
    /** This variable represents the state machine for the object visualization.
    *  Valid States are
    *  { ST_VIEW, ST_VIEW_OPTIONS, ST_DRAGGING, ST_EDITING, ST_START_ANIMATION, ST_STOP_ANIMATION, ST_ANIMATION }
    **/
    this.currentState  = "ST_VIEW";
    
    
    //metd-data
    this.name = name;
    
    //graphics properties
    this.position = { x: 0, y: 0 };
	this.position.x = x;
	this.position.y = y;
	this.r = 40;
	this.dx = Math.ceil(Math.random()*7);
	this.dy = Math.ceil(Math.random()*7);
	
	this.box = new BoundaryBox(0,0,0,0);
	
	d = this.r + (this.r*0.01);
	this.options = [ 
	    new clikableLabel("Media", 0, d),
	    new clikableLabel("Edit", 0, -d),
        new clikableLabel("Expand", d, 0),
        new clikableLabel("Tie", -d, 0),
	    ];
	
	this.stdColors = { foreground:"#f5f5f3", background:"#dbdcd8" };
	
	//rotation variables
	this.rotateDelta = 2;
	this.currentAngle = 0;

	this.draw = function()
	{   
	    var defaultAngle = Math.PI * this.currentAngle /180;
	    
	    ctx.save();
        ctx.translate(this.position.x, this.position.y);


        
		if(this.currentState=="ST_START_ANIMATION") {
		    this.currentState="ST_ANIMATION";
		    this.currentAngle = 0;
		}
		
		if(this.currentState=="ST_ANIMATION") {
		    this.currentAngle += this.rotateDelta;
		    ctx.rotate(defaultAngle);
		    
		    if(this.currentAngle>360) {
		        this.currentState="ST_VIEW_OPTIONS";
		    }
		}
		
	    
	    //draws outter circle
		ctx.beginPath();
		ctx.shadowOffsetX = this.r * 0.1;
		ctx.shadowOffsetY = this.r * 0.1;
		ctx.shadowBlur = 30;
		ctx.shadowColor = "#dddddd";
		
		ctx.fillStyle = this.stdColors.background;
		ctx.arc(0, 0, this.r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		
		ctx.shadowColor = "transparent";
		
		if(( this.currentState=="ST_VIEW_OPTIONS" || this.currentState=="ST_ANIMATION" )) {
		    ctx.fillStyle = this.stdColors.background;
    	
    		 for(var i = 0; i < this.options.length;i++) {
    		     op = this.options[i];
    		     ctx.beginPath();
    		     ctx.fillStyle = this.stdColors.background;
    	     	 ctx.arc(op.position.x, op.position.y, (this.r/4), 0, Math.PI*2, true); 
    	     	 ctx.fill();
    	     	 ctx.closePath();
    	     }
    	}
		
		//draws inner circle


		ctx.beginPath();
		ctx.fillStyle = this.stdColors.foreground;
		x = - (this.position.x*0.005);
		y = - (this.position.y*0.005);
		r = this.r * 0.85 ;
		
		ctx.translate(x,y);
		
		ctx.arc(0,0, r , 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		
		this.box.x = this.position.x - this.r;
		this.box.y = this.position.y - this.r;
		this.box.w = this.r * 2;
		this.box.h = this.r * 2;
		
		//Write the labels of the operations
		if(( this.currentState=="ST_VIEW_OPTIONS" || this.currentState=="ST_ANIMATION" )) {
    	     ctx.fillStyle = "#666";
    	     fontSize = 12;
    	     ctx.font = fontSize + "px Arial";
    	     maxTextSize = 0
    	     minP = new Point2D(null, null);
    	     maxP = new Point2D(null, null);
    	     
    		 for(var i = 0; i < this.options.length;i++) {
    		     op = this.options[i];
    		     x = op.position.x*1.3;
    		     y = op.position.y*1.3;

     	     	 if( x > 0) {
     	     	     ctx.textAlign = "start";
     	     	 } else {
     	     	     if( y < 0 )
     	     	      { ctx.textAlign = "start"; }
     	     	      else { ctx.textAlign = "end";}
     	     	 }
    		     
    	     	 ctx.translate( x, y);
    	     	 ctx.rotate(-defaultAngle);
    	     	 ctx.beginPath();
    	     	 ctx.fillText(op.name, 0,0);
    	     	 ctx.closePath(); 
    	     	 ctx.rotate(defaultAngle);
    	     	 ctx.translate(-x,-y);
    	     	 
    	     	 //calculates the text width in pixels
    	     	 textWidth = ctx.measureText(op.name).width;
    	     	 maxTextSize = Math.max(textWidth, maxTextSize);
    	     	 
    	     	 //calculates the real label boundary box
    	     	 var p = new Point2D(x,y);
    	     	 p = translate2D(p ,this.position.x, this.position.y);
    	     	 op.box.x = ctx.textAlign == "start"? p.x: p.x-textWidth;
    	     	 op.box.y = p.y - fontSize;
    	     	 
    	     	 op.box.w = textWidth;
    	     	 op.box.h = fontSize;
    	     	 
    	     	 
    	     	 //gather numbers for the Seed boundary box
    	     	 x += this.position.x;
    	     	 y += this.position.y;
    	     	 
    	     	 
    	     	 maxP.x = (maxP.x==null)? x : Math.max(maxP.x,x);
    	     	 maxP.y = (maxP.y==null)? y : Math.max(maxP.y,y);
    	     	 minP.x = (minP.x==null)? x : Math.min(minP.x,x);
    	     	 minP.y = (minP.y==null)? y : Math.min(minP.y,y);
            }
            
            this.box.x = minP.x- maxTextSize;
            this.box.y = minP.y - fontSize;
            
     	    this.box.w = ( maxP.x+maxTextSize) - this.box.x ;
     	    this.box.h = ( maxP.y+fontSize) - this.box.y ;
            
		}
		

		ctx.restore();


		ctx.save();
		ctx.translate(this.position.x, this.position.y);
	
		if((this.name!=null) ) {
		    ctx.fillStyle = "#8a8a8a";
    	    ctx.font = "22px Arial";
    	    ctx.beginPath();
		    ctx.fillText(this.name, (this.r*0.3), (this.r*-0.3));
		    ctx.closePath(); 
		}
		ctx.restore();
		
	}

	this.getX = function()
	{
		return x;
	}

	this.getY = function()
	{
		return this.y;
	}

	this.update = function()
	{	

	}
	
	this.isInside = function(point) {
	    return this.box.isInside(point);
    }
    
    this.mouseOver= function() {
        this.currentState = "ST_START_ANIMATION";
    }
    
    this.mouseOut = function() {
        this.currentState = "ST_VIEW";
    }
    
    this.isMouseOver = function() {
        return (this.currentState=="ST_ANIMATION" || this.currentState=="ST_VIEW_OPTIONS");
    }
    
    this.onClick = function(ev) {
        point = new Point2D(
            ev.pageX - ev.target.offsetLeft,
            ev.pageY - ev.target.offsetTop
        );
        
		for(var i = 0; i < this.options.length;i++) {
		     var op = this.options[i];
		     if(op.isInside(point)) {
		         alert(op.name);
		     }
        }
    }
	
}