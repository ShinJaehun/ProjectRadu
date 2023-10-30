class Tree{
   constructor(x,y){
      this.x=x;
      this.y=y;
      this.color="#720";
      this.reset();
   }
   reset(){
      this.size=this.y*0.3;
      this.branches=[];
      let side=1
      for(let t=0;t<this.size*0.9;t+=Math.random()*5){
         side*=-1;
         const offset=Math.random()*15;
         this.branches.push({t,side,offset});
      }
   }
   update(){
      const ar=0.64/5;
      const speed=0.03*this.size;
      this.x+=speed;
      this.y-=speed*ar;
   }
   draw(ctx){
      ctx.beginPath();
      ctx.strokeStyle=this.color;
      ctx.lineWidth=this.size*0.12;
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(this.x,this.y-this.size*0.7);
      ctx.stroke();
      ctx.strokeStyle="darkgreen";
      ctx.lineWidth=3;
      for(const b of this.branches){
         const y=this.y-this.size+b.t;
         const x=b.side*b.t/2;
         ctx.beginPath();
         ctx.moveTo(this.x,y);
         ctx.lineTo(this.x+x,y+10+b.offset);
         ctx.stroke();
      }
   }
}