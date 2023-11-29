class Webcam extends Project {
    constructor(canvas) {
        super(canvas)

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        if(VIDEO!=null){
			var vw=VIDEO.videoWidth;
			var vh=VIDEO.videoHeight;
			var min=Math.min(vw,vh);
			var sx=(vw-min)/2;
			var sy=(vh-min)/2;
			
			var ctx = this.canvas.getContext("2d");
			ctx.drawImage(VIDEO,sx,sy,min,min,
								0,0,CANVAS_SIZE,CANVAS_SIZE);
		} 
    }   
}
