class Fire extends Project {
    constructor(canvas, size, upSideDown) {
        super(canvas)

        this.fire=[];
        this.path=[[CANVAS_SIZE*0.5, CANVAS_SIZE*0.5]];

        this.size=80
        if(size!=null){
            this.size=size
        }

        this.upSideDown=false
        if(upSideDown!=null){
            this.upSideDown=upSideDown
        }

        if(upSideDown==null){
			this.drawFrame();
		}

        this.showDisabled();
    }

    drawFrame(){
        // this.fire.push(new Flame(this.path))
        for(let i=0; i < this.path.length; i++) {
            this.fire.push(new Flame(this.path[i], this.size))
        }
        
        drawDarkBackground(this.ctx);
        this.ctx.globalCompositeOperation = "lighter";

        for(let i=0; i<this.fire.length;i++){
            if(this.fire[i].step>=this.fire[i].lifespan) {
                this.fire.splice(i,1);// remove 1 item
                i--; //이거 실수 할 수 있는거!!!
            } else {
                this.fire[i].update(this.upSideDown);
                this.fire[i].draw(this.ctx);
            }

        }
        this.ctx.globalCompositeOperation = "source-over";
    }
}

class Flame {
    constructor(location, size){
        this.location=copyArr(location);
        // this.radius=20;
        this.radius=size;
        this.speed=Math.random()*4+4;
        this.step=0
        this.lifespan=20;
        this.green=Math.round(Math.random()*150);
    }

    draw(ctx){
        ctx.beginPath();
        // ctx.fillStyle="rgba(255,"+this.green+",0,"+(1-this.step/this.lifespan)+")";
        // ctx.fillStyle="rgba(255,"+this.green+",0,"+"0.3"+")";
        // ctx.fillStyle="rgba(255,"+this.green+",0,"+(1-this.step/this.lifespan)*0.5+")";

        var gradient = ctx.createRadialGradient(
            this.location[0],
            this.location[1],
            0,
            this.location[0],
            this.location[1],
            this.radius);
        
        ctx.fillStyle=gradient;

        // Add three color stops
        gradient.addColorStop(0, "rgba(255,"+this.green+",0,1)");
        gradient.addColorStop(1, "rgba(255,"+this.green+",0,0)");

        ctx.arc(this.location[0], this.location[1], this.radius, 0, Math.PI*2);
        ctx.fill();
    }
    update(upSideDown){
        this.step++;
        this.radius-=1;

        if(upSideDown){
            this.location[1]+=this.speed
        } else {
            this.location[1]-=this.speed;
        }
        this.location[0]-=(Math.random()-0.5)*4;

    }
}