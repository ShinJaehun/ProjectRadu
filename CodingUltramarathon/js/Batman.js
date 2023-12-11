class Batman extends Project {
    constructor(canvas) {
		super(canvas);
		canvas.style.background="black";
		this.batLocations=[];
		for(let i=0;i<10;i++){
			this.batLocations.push(
				[CANVAS_SIZE*0.5+
				CANVAS_SIZE*(Math.random()-0.5)*0.5,
				CANVAS_SIZE*0.2+CANVAS_SIZE*
				(Math.random()-0.5)*0.2]);
		}
		
		this.drawFrame();
		this.showDisabled();
		
		this.time=0;
    }

    drawFrame(){
		clearBackground(this.ctx);
		
		drawBatman(this.ctx, 
		[CANVAS_SIZE*0.5,CANVAS_SIZE*0.5]
		,CANVAS_SIZE*0.6, 0);
			
		
		for(let i=0;i<this.batLocations.length;i++){
			let amount=(Math.sin(this.time+i)+1)/2;	
			drawFlappyBat(this.ctx, 
				this.batLocations[i]
				,CANVAS_SIZE*0.2, 0, amount);
		}
			
		this.time+=1.3;

    }   
}

function drawBatman(ctx, location, scaler, angle){
    
	let lPoints=
	[[455,418],[413,361],[393,468],[232,349],[83,431],[190,490],[240,600],[388,560],[510,666]];

	
	for(let i=7;i>=0;i--){
		lPoints.push([
			CANVAS_SIZE-lPoints[i][0],
			lPoints[i][1]	
		]);
	}
		

    ctx.save()
    normalizeArr(lPoints)

    ctx.translate(...location)
    ctx.rotate(angle)
    scaleArr(lPoints, scaler)

    ctx.fillStyle="rgb(100,0,100)"
    

	ctx.beginPath();
	ctx.moveTo(...lPoints[0]);
	ctx.lineTo(...lPoints[1]);
	ctx.lineTo(...lPoints[2]);
	ctx.quadraticCurveTo(
		...lPoints[3],...lPoints[4]);
	ctx.quadraticCurveTo(
		...lPoints[5],...lPoints[6]);
	ctx.quadraticCurveTo(
		...lPoints[7],...lPoints[8]);
	ctx.quadraticCurveTo(
		...lPoints[9],...lPoints[10]);
	ctx.quadraticCurveTo(
		...lPoints[11],...lPoints[12]);
	ctx.quadraticCurveTo(
		...lPoints[13],...lPoints[14]);
	ctx.lineTo(...lPoints[15]);
	ctx.lineTo(...lPoints[16]);
	ctx.lineTo(...lPoints[0]);
	ctx.fill();
	
	ctx.restore();
}
