class Rainbow extends Project{
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
		// this.ctx.filter="blur(4px)"
		this.drawRainbow(this.shape);
		// this.ctx.filter="blur(0px)"

	}

	getColor(index){
		switch(index) {
			case 1: return "purple"; break;
			case 2: return "darkblue"; break;
			case 3: return "blue"; break;
			case 4: return "green"; break;
			case 5: return "yellow"; break;
			case 6: return "orange"; break;
			case 7: return "red"; break;
		}
	}
	
	drawRainbow(shape){
		for(let i=7;i>=1;i--){
			const dif=CANVAS_SIZE*0.2*(i/7);
			this.ctx.beginPath();
			this.ctx.moveTo(shape[0][0],shape[0][1]-dif*0.5);
			this.ctx.strokeStyle=this.getColor(i);
			this.ctx.lineWidth=dif;
			this.ctx.quadraticCurveTo(
				shape[1][0],shape[1][1]-dif*0.5,
				shape[2][0],shape[2][1]-dif*0.5);
			this.ctx.stroke();
		}
	}
}























