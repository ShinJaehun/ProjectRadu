class Aurora extends Project{
	constructor(canvas){
		super(canvas);
		this.step=0;
		this.shape=[];
		this.shape.push([-CANVAS_SIZE*0.1,CANVAS_SIZE*0.5]);
		this.shape.push([CANVAS_SIZE*0.5,CANVAS_SIZE*0.2]);
		this.shape.push([CANVAS_SIZE*1.1,CANVAS_SIZE*0.5]);
		
		this.drawFrame();
		this.showDisabled();
	}
	
	drawFrame(){
		drawColoredBackground(this.ctx,"rgb(0,0,100)");
		this.drawAurora(this.shape);
		this.step+=0.03;
		this.shape[2][1]+=Math.sin(this.step+Math.PI);
		this.shape[1][1]+=Math.sin(this.step);
		this.shape[0][1]+=Math.cos(this.step);
	}
	
	drawAurora(shape){
		for(let i=1;i<=100;i++){
			const dif=CANVAS_SIZE*0.2*(i/100);
			this.ctx.beginPath();
			this.ctx.moveTo(shape[0][0],shape[0][1]-dif*0.4);
			this.ctx.strokeStyle="rgba(0,255,0,0.005)";
			this.ctx.lineWidth=dif;
			this.ctx.quadraticCurveTo(
				shape[1][0],shape[1][1]-dif*0.4,
				shape[2][0],shape[2][1]-dif*0.4);
			this.ctx.stroke();
		}
		
	}
}























