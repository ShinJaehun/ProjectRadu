class Asteroids extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.background="black"

        this.movingStars=[]
        for(let i=0; i<100; i++){
            this.movingStars.push(new MovingStar([
                CANVAS_SIZE*Math.random(),
                CANVAS_SIZE*Math.random()
            ]))
        }

        this.startLocation= [CANVAS_SIZE*0.5, CANVAS_SIZE*0.85]

        this.asteroids = []
        this.score = 0
        this.gameOver=false

        this.flare=null

		this.fireCanvas = document.createElement('canvas');
		this.fireCanvas.width = CANVAS_SIZE;
		this.fireCanvas.height = CANVAS_SIZE;
		this.fire = new Fire(this.fireCanvas, 30, true);
        this.fire.path=[this.startLocation]
        this.fireCtx = this.fireCanvas.getContext("2d")

		this.spaceshipCanvas = document.createElement('canvas');
		this.spaceshipCanvas.width = CANVAS_SIZE;
		this.spaceshipCanvas.height = CANVAS_SIZE;
        this.spaceshipCtx = this.spaceshipCanvas.getContext("2d")

		this.asteroidCanvas = document.createElement('canvas');
		this.asteroidCanvas.width = CANVAS_SIZE;
		this.asteroidCanvas.height = CANVAS_SIZE;
        this.asteroidCtx = this.asteroidCanvas.getContext("2d")

        this.fire.drawFrame()

        this.drawFrame();
        this.showDisabled();
    }

    move(location){
        if(!this.gameOver){
            this.startLocation[0] = location[0]
        }
    }

    click(location) {
        if(this.gameOver){
            this.score=0
            this.gameOver=false
            this.flare = null
        }
    }

    drawFrame(){
        // if(this.gameOver){
        //     return
        // }

        if(Math.random()<0.02){
            this.asteroids.push(
                new Rock([CANVAS_SIZE*0.5, 0],
                    [(Math.random()-0.5)*2, 10])
            )
        }
        drawDarkBackground(this.ctx, "rgb(30,170,240)")

        console.log(this.asteroids)

        this.fire.drawFrame()
        this.fire.path=[this.startLocation]

        if(!this.gameOver){
            addToCanvas(this.fireCtx, this.ctx)
        }

        for(let i=0; i<this.movingStars.length; i++){
            this.movingStars[i].update()
            this.movingStars[i].draw(this.ctx)
        }

        if(!this.gameOver){
            drawSpaceShip(this.ctx, this.startLocation, CANVAS_SIZE*0.12, 0)
        } else {
            this.ctx.font = "10vh Comic Sans MS"
            this.ctx.fillStyle ="orange"
            this.ctx.textAlign ="center"
            this.ctx.textBaseline ="middle"
            this.ctx.fillText(
                "Click to restart",
                CANVAS_SIZE*0.5,
                CANVAS_SIZE*0.5)
        }
        

        clearBackground(this.spaceshipCtx)
        drawSpaceShip(this.spaceshipCtx, this.startLocation, CANVAS_SIZE*0.12, 0)
        
        clearBackground(this.asteroidCtx)
        for (let i=0; i<this.asteroids.length; i++){
            // 근데 왜 얘네가 fire 앞에 있을때는 그려지지 않았던 것일까?
            this.asteroids[i].update()
            if(this.asteroids[i].isOffScreen()){
                this.asteroids.splice(i, 1)
                i--
                if(!this.gameOver){
                    this.score++
                }
            } else {
                this.asteroids[i].draw(this.ctx)
                this.asteroids[i].draw(this.asteroidCtx)
            }
        }

        if(isCanvasCollision(this.asteroidCtx, this.spaceshipCtx)){
            if(this.gameOver==false){
                this.flare = new Flare(this.startLocation)
                playExplosionSound(1)
                this.gameOver=true
            }
        }

        if(this.flare!=null){
            this.flare.draw(this.ctx)
        }

        this.ctx.font = "10vh Comic Sans MS"
        this.ctx.fillStyle ="orange"
        this.ctx.textAlign ="left"
        this.ctx.textBaseline ="top"
        this.ctx.fillText(
            this.score,
            0,
            0)

    }   
}

function isCanvasCollision(ctxA, ctxB) {
    const imgDataA = ctxA.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)
    const imgDataB = ctxB.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE; x++) {
    		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;
     		let aA=imgDataA.data[index+3]
     		let aB=imgDataB.data[index+3]
    		
    		if (aA>0 && aB>0){
                return true
    		}
    	}
    }
    return false
}