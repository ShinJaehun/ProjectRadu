function lerp(a,b,t){
   return a+(b-a)*t;
}

function vLerp(A,B,t){
   return {
      x: lerp(A.x,B.x,t),
      y: lerp(A.y,B.y,t)
   }
}