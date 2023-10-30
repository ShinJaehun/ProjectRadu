
function drawTrack(){
   
   ctx.moveTo(trackLeft.x,trackLeft.y);
   ctx.lineTo(trackRight.x,trackRight.y);
   //ctx.strokeStyle="gray";
   //ctx.stroke();


   ctx.beginPath();
   ctx.moveTo(trackLeft.x,trackLeft.y-trackThickness/6);
   ctx.lineTo(trackRight.x,trackRight.y-trackThickness/6);

   ctx.moveTo(trackLeft.x,trackLeft.y+trackThickness/2);
   ctx.lineTo(trackRight.x,trackRight.y+trackThickness/2);
   ctx.strokeStyle="black";
   ctx.lineWidth=10;
   ctx.lineCap="round";
   ctx.stroke();

   ctx.strokeStyle="gray";
   ctx.lineWidth=2;

   const barThickness=trackThickness*2;
   const barWidth=14;
   const barHeight=6;
   for(let t=new Date().getTime()%invSpeed/invSpeed-1;t<1.5;t+=0.05){
      const p=vLerp(trackLeft,trackRight,t);
      const top=p.y-Math.sin(trackAngle)*barThickness/5;
      const left=p.x-Math.cos(trackAngle)*barThickness/5;
      const bottom=p.y+Math.sin(trackAngle)*barThickness/2;
      const right=p.x+Math.cos(trackAngle)*barThickness/2;
      
      ctx.beginPath();
      ctx.moveTo(left,top);
      ctx.lineTo(right,bottom);
      ctx.lineTo(right+barWidth,bottom);
      ctx.lineTo(right+barWidth,bottom-barHeight);
      ctx.lineTo(left+barWidth,top-barHeight);
      ctx.lineTo(left,top-barHeight);
      ctx.closePath();
      ctx.fillStyle="gray";
      ctx.fill();
      ctx.stroke();
   }
}