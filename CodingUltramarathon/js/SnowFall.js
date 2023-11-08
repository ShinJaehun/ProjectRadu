class SnowFall extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.backgroundColor="black"
        this.snow=this.generateSnowParticles(200);

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        // drawDarkBackground(this.ctx);
        clearBackground(this.ctx)

        for(let i=0; i<this.snow.length;i++){
            this.snow[i].update();
            this.snow[i].draw(this.ctx);
        }
    }

    generateSnowParticles(N){
        let arr=[];
        for(let i=0;i<N;i++){
            arr.push(
                new SnowFlake(
                    [Math.random()*CANVAS_SIZE,
                         Math.random()*CANVAS_SIZE])
            )
        }
        return arr;
    }
}

class SnowFlake {
    constructor(location){
        this.location=location;
        this.radius=Math.random()*2+2;// star between 2 and 4
        this.speed=Math.random()*5+10;
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

        // 좀 더 입체적으로 보여주기 위한 효과
        if (this.radius > 3) {
            // foreground wind
            this.location[0]+=Math.random()*5;
        } else {
            // 멀리 내리는 눈은 반대쪽으로...
            this.location[0]-=Math.random()*5;
        }

        if (this.location[1]>CANVAS_SIZE) {
            this.location[1]=0;
        }
        if (this.location[0]>CANVAS_SIZE) {
            this.location[0]=0;
        }
        if (this.location[0]<0) {
            this.location[0]=CANVAS_SIZE;
        }
    }
}