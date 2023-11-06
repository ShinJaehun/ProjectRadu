class Spruce extends Project{
	constructor(canvas){
		super(canvas);

		this.drawFrame();
		this.showDisabled();
	}
	
	drawFrame(){
		drawColoredBackground(this.ctx,"rgb(0,0,100)");
		this.drawTree(
			[CANVAS_SIZE/2,CANVAS_SIZE*0.9],
			200,
			0,
			8)
	}
	
	drawTree(location, len, angle, branchWidth){
		this.ctx.beginPath()
		this.ctx.save()
		this.ctx.strokeStyle="white"
		this.ctx.lineWidth=branchWidth
		this.ctx.translate(...location)
		this.ctx.rotate(angle)
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(0, -len)
		this.ctx.stroke()

		if (len<25) {
			this.ctx.restore()
			return
		}

		this.drawTree(
			[0, -len],
			len*0.55,
			angle+0.2,
			branchWidth*0.8)		
		this.drawTree(
			[0, -len],
			len*0.55,
			angle-0.2,
			branchWidth*0.8)	
		this.drawTree(
			[0, -len],
			len*0.75,
			angle,
			branchWidth*0.8)			
		this.ctx.restore()

	}
}























