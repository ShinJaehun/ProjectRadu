class StarryNight extends Project {
    constructor(canvas) {
        super(canvas)

        this.stars=this.getRandomStars(100);

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        drawDarkBackground(this.ctx);

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
}

class Star {
    constructor(location, isLarger){
        this.location=location;
        this.radius=Math.random()*2+2;// star between 2 and 4
        this.isLarger=isLarger
        if(this.isLarger){
            this.radius+=2
        }
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
        if(this.isLarger == true) {
            this.radius+=2;
        }
    }
}