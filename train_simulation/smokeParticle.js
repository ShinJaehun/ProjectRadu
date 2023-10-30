class SmokeParticle {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.intensity = Math.random() * 100 + 50;
   }
   update() {
      const ar = 0.64 / 5;
      const speed = 3;
      this.x += speed + Math.random() * 3;
      this.y -=
         speed * ar +
         Math.random() * 0.003 * Math.pow((2000 - this.x) / 500, 6);
   }
   draw(ctx) {
      ctx.beginPath();
      const rad = (2000 - this.x) / 40;
      ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
      const alpha = rad / 200;

      const grd = ctx.createRadialGradient(
         this.x,
         this.y,
         0,
         this.x,
         this.y,
         rad
      );
      grd.addColorStop(
         0,
         "rgba(" +
            this.intensity +
            "," +
            this.intensity +
            "," +
            this.intensity +
            "," +
            alpha +
            ")"
      );
      grd.addColorStop(
         1,
         "rgba(" +
            this.intensity +
            "," +
            this.intensity +
            "," +
            this.intensity +
            "," +
            0 +
            ")"
      );
      ctx.fillStyle = grd;
      ctx.fill();
   }
}
