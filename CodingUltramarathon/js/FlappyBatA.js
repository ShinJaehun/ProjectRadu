class FlappyBatA extends Project {
    constructor(canvas) {
        super(canvas)
        canvas.style.background="black"
        canvas.style.cursor="none"

        this.batLocation=[CANVAS_SIZE*0.5, CANVAS_SIZE*0.5]

        this.score=0
        this.gameOver=false
        
		this.fireCanvas = document.createElement('canvas');
		this.fireCanvas.width = CANVAS_SIZE;
		this.fireCanvas.height = CANVAS_SIZE;
		this.fire = new Fire(this.fireCanvas, 30);

        this.startX=CANVAS_SIZE*0.9
		this.startY=CANVAS_SIZE*0.5

		this.fireCtx = this.fireCanvas.getContext("2d")

        this.fire.drawFrame()
        
        this.drawFrame();
        this.showDisabled();
        this.time=0
    }

    drawFrame(){
        // clearBackground(this.ctx)
        drawDarkBackground(this.ctx, "rgb(30,170,240)")
        this.fire.drawFrame()
        addToCanvas(this.fireCtx, this.ctx)

        this.fire.path=getPillerPath([this.startX,this.startY], CANVAS_SIZE*0.15)

        if(this.gameOver==false){
            let amount=(Math.sin(this.time)+1)/2
            drawFlappyBat(this.ctx, this.batLocation, CANVAS_SIZE*0.2, 0, amount)
        } else {
            this.fire.path.push(this.batLocation)
            this.batLocation[1]+=10

            this.ctx.font = "10vh Comic Sans MS"
            this.ctx.fillStyle ="orange"
            this.ctx.textAlign ="center"
            this.ctx.textBaseline ="middle"
            this.ctx.fillText(
                "Click to restart",
                CANVAS_SIZE*0.5,
                CANVAS_SIZE*0.5)
        }

        this.startX-=10
        if(this.startX <0){
            this.startX=CANVAS_SIZE
            this.startY=(Math.random()-0.5)*CANVAS_SIZE*0.6+CANVAS_SIZE/2
            this.score++
        }
                            
        this.ctx.font = "10vh Comic Sans MS"
        this.ctx.fillStyle ="orange"
        this.ctx.textAlign ="left"
        this.ctx.textBaseline ="top"
        this.ctx.fillText(
            this.score,
            0,
            0)

        for(let i=0; i<this.fire.path.length; i++){
            if(distance(this.fire.path[i], this.batLocation)<= CANVAS_SIZE*0.05){
                this.gameOver=true
            }
        }

        this.time+=0.8
    }
    
    
    move(location){
        if(!this.gameOver){
            this.batLocation=location
        }
    }

    click(location){
        if(this.gameOver){
            this.score=0
            this.gameOver=false
        }
    }
}

function getPillerPath(location, radius) {
    let arr=[]
    for(let i=0; i<=CANVAS_SIZE; i+=CANVAS_SIZE*0.05){
        let loc=[location[0],i]
        if(distance(location, loc)>radius){
            arr.push(loc)
        }
        
    }
    return arr
}

function distance(v1, v2){
    let dist=0
    // console.log(v1.length)
    for(let i=0; i<v1.length; i++){
        dist+=Math.pow(v1[i]-v2[i], 2)
    }
    return Math.sqrt(dist)
}


