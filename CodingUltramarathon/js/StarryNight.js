class StarryNight {
    constructor(canvas) {
        this.canvas=canvas;
        this.ctx = canvas.getContext("2d");
        this.drawDarkBackground();

        this.stars=this.getRandomStars(100);
        for(let i=0; i<this.stars.length;i++){
            this.stars[i].draw(this.ctx);
        }
        let me=this //이게 뭘까?
        setInterval(function(){
            me.drawFrame() // 왜 이렇게 하는걸까?
        }, 1000/30)
    }

    drawFrame(){
        this.drawDarkBackground();

        for(let i=0; i<this.stars.length;i++){
            this.stars[i].update();
            this.stars[i].draw(this.ctx);
        }
    }

    getRandomStars(N){
        let arr=[];
        for(let i=0;i<N;i++){
            arr.push(
                new Star(
                    [Math.random()*CANVAS_SIZE,
                         Math.random()*CANVAS_SIZE])
            )
        }
        return arr;
    }
    
    drawStars(location) {
        this.ctx.beginPath();
        this.ctx.lineWidth=5;
        this.ctx.fillStyle="white";
        this.ctx.arc(location[0], location[1], 4, 0, Math.PI*2);
        this.ctx.fill();
    }

    drawDarkBackground() {
        this.ctx.beginPath();
        this.ctx.fillStyle="black";

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }


}

class Star {
    constructor(location){
        this.location=location;
        this.radius=Math.random()*2+2;// star between 2 and 4
    }
    draw(ctx){
        ctx.beginPath();
        ctx.lineWidth=5;
        ctx.fillStyle="white";
        ctx.arc(this.location[0], this.location[1], this.radius, 0, Math.PI*2);
        ctx.fill();
    }
    update(){
        this.radius=Math.random()*2+2;
    }
}