class Fire2 extends Project {
    // 마우스를 따라서 불꽃이 움직이는 개쩌는 효과인데
    // 이게 프레임 드랍이 시작됨
    constructor(canvas) {
        super(canvas)

        this.fire=[];

        this.drawFrame();
        this.showDisabled();
        this.canvas=canvas;

    }




    drawFrame(){
        // 이건 안 되는데
        // this.canvas.addEventListener('mousemove', function(event){
        //     const location = getMousePos(this.canvas, event)
        // })

        // 이건 된다??? 왜??? 대체 왜???
        let me=this;
        this.canvas.addEventListener('mousemove', function(event){
            const loc = getMousePos(me.canvas, event)
            me.fire.push(new Flame([loc[0], loc[1]]))

        })

        // this.fire.push(new Flame([CANVAS_SIZE*0.5, CANVAS_SIZE*0.5]))

        drawDarkBackground(this.ctx);
        this.ctx.globalCompositeOperation = "lighter";

        for(let i=0; i<this.fire.length;i++){
            if(this.fire[i].step>=this.fire[i].lifespan) {
                this.fire.splice(i,1);// remove 1 item
                i--; //이거 실수 할 수 있는거!!!
            } else {
                this.fire[i].update();
                this.fire[i].draw(this.ctx);
            }

        }
        this.ctx.globalCompositeOperation = "source-over";

    }
}


class Flame {
    constructor(location){
        this.location=location;
        this.radius=20;
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
    update(){
        this.step++;
        this.radius-=1;
        this.location[1]-=this.speed;
        this.location[0]-=(Math.random()-0.5)*4;

    }
}