class Oak extends Project{
	constructor(canvas){
		super(canvas);

		this.drawFrame();
		this.showDisabled();
	}
	
	drawFrame(){
		drawColoredBackground(this.ctx,"rgb(0,0,100)");
		// this.drawTree(location, len, angle, branchWidth)		
		this.drawTree(
			[CANVAS_SIZE/2,CANVAS_SIZE*0.9],
			200,
			0,
			8)
	}
	
	// angle is in radians
	drawTree(location, len, angle, branchWidth){
		this.ctx.beginPath()
		this.ctx.save()
		this.ctx.strokeStyle="white"
		this.ctx.lineWidth=branchWidth
		this.ctx.translate(...location) // canvas 이동
		this.ctx.rotate(angle)
		this.ctx.moveTo(0, 0) // canvas를 이동했기 때문에 항상 0,0부터 시작해도 연결이 된다!
		this.ctx.lineTo(0, -len)
		this.ctx.stroke()

		if (len<5) {
			this.ctx.restore()
			return
		}

		this.drawTree(
			[0, -len],
			len*0.75,
			angle+0.1,
			branchWidth*0.8)		
		this.drawTree(
			[0, -len],
			len*0.75,
			angle-0.1,
			branchWidth*0.8)	
			
		this.ctx.restore()

	}
}























