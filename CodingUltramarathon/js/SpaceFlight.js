class SpaceFlight extends Project {
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

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        clearBackground(this.ctx)
        
        for(let i=0; i<this.movingStars.length; i++){
            this.movingStars[i].update()
            this.movingStars[i].draw(this.ctx)
        }
        drawSpaceShip(this.ctx, [CANVAS_SIZE*0.5, CANVAS_SIZE*0.85], CANVAS_SIZE*0.12, 0)

    }   
}

class MovingStar {
    constructor(location){
        this.location=location;
        this.radius=Math.random()*2+2
        this.speed=CANVAS_SIZE*0.02
    }
    draw(ctx){
        ctx.beginPath();
        ctx.lineWidth=5;
        ctx.fillStyle="white";
        ctx.arc(this.location[0], this.location[1], this.radius, 0, Math.PI*2);
        ctx.fill();
    }
    update(){
        this.location[1]+=this.speed;
        if (this.location[1]>CANVAS_SIZE) {
            this.location[1]=0
        }
    }
}