function drawTrain() {
   drawWheelPairs(0.72);
   drawWheelPairs(0.76);
   drawWheelPairs(0.83);
   drawWheelPairs(0.87);
   drawCar(0.66, 0.88, carFill, carOutline);

   drawWheelPairs(0.49);
   drawWheelPairs(0.53);
   drawWheelPairs(0.6);
   drawWheelPairs(0.64);
   drawCar(0.43, 0.65, carFill, carOutline);

   drawWheelPairs(0.36);
   drawWheelPairs(0.4);
   drawLocomotiveCabin();
   drawFrontCilinder();
   drawChimney();
   drawWheelPairs(0.215);
   drawWheelPairs(0.255);
   drawWheelPairs(0.295, true);
}

function drawCar(fromPercent, toPercent, fill, outline) {
   const f = vLerp(trackLeft, trackRight, fromPercent);
   const b = vLerp(trackLeft, trackRight, toPercent);
   f.y -= vOffsetCabin;
   b.y -= vOffsetCabin;
   const cabinFrontLeft = {
      x: f.x + Math.cos(trackAngle) * trackThickness,
      y: f.y + Math.sin(trackAngle) * trackThickness + cilinderSize * 0.3,
   };
   const cabinFrontRight = {
      x: f.x - Math.cos(trackAngle) * (trackThickness / 2),
      y: f.y - Math.sin(trackAngle) * (trackThickness / 2) + cilinderSize * 0.5,
   };
   const cabinBackLeft = {
      x: b.x + Math.cos(trackAngle) * (trackThickness / 2),
      y: b.y + Math.sin(trackAngle) * trackThickness + cilinderSize * 0.3,
   };
   const cabinBackRight = {
      x: b.x - Math.cos(trackAngle) * trackThickness,
      y: b.y - Math.sin(trackAngle) * (trackThickness / 2) + cilinderSize * 0.5,
   };

   const topOffset = -cilinderSize * 1.5;

   ctx.strokeStyle = outline;
   ctx.fillStyle = fill;
   ctx.beginPath();
   ctx.moveTo(cabinFrontLeft.x, cabinFrontLeft.y);
   ctx.lineTo(cabinFrontRight.x, cabinFrontRight.y);
   ctx.lineTo(cabinFrontRight.x, cabinFrontRight.y + topOffset);
   ctx.lineTo(cabinFrontLeft.x, cabinFrontLeft.y + topOffset);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(cabinFrontLeft.x, cabinFrontLeft.y);
   ctx.lineTo(cabinBackLeft.x, cabinBackLeft.y);
   ctx.lineTo(cabinBackLeft.x, cabinBackLeft.y + topOffset);
   ctx.lineTo(cabinFrontLeft.x, cabinFrontLeft.y + topOffset);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(cabinFrontLeft.x, cabinFrontLeft.y + topOffset);
   ctx.lineTo(cabinFrontRight.x, cabinFrontRight.y + topOffset);
   ctx.lineTo(cabinBackRight.x, cabinBackRight.y + topOffset);
   ctx.lineTo(cabinBackLeft.x, cabinBackLeft.y + topOffset);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();
}

function drawFrontCilinder() {
   ctx.fillStyle = cilinderFill;
   ctx.strokeStyle = cilinderOutline;

   const yOffset = 10;
   ctx.beginPath();
   ctx.ellipse(
      mid.x,
      mid.y + yOffset,
      cilinderSize * 0.4,
      cilinderSize / 2,
      0,
      0,
      Math.PI * 2
   );
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(mid.x, mid.y - cilinderSize / 2 + yOffset);
   ctx.lineTo(front.x, front.y - cilinderSize / 2 + yOffset);
   ctx.lineTo(front.x, front.y + cilinderSize / 2 + yOffset);
   ctx.lineTo(mid.x, mid.y + cilinderSize / 2 + yOffset);

   ctx.fill();
   ctx.stroke();
   ctx.beginPath();
   ctx.ellipse(
      front.x,
      front.y + yOffset,
      cilinderSize * 0.4,
      cilinderSize / 2,
      0,
      0,
      Math.PI * 2
   );

   ctx.fill();
   ctx.stroke();
}

function drawChimney() {
   ctx.fillStyle = cabinFill;
   ctx.strokeStyle = cabinOutline;

   const yOffset = 10;
   ctx.beginPath();
   ctx.ellipse(
      front.x + cilinderSize * 0.3,
      front.y - cilinderSize * 0.52 + yOffset,
      cilinderSize / 8,
      cilinderSize / 16,
      0,
      0,
      Math.PI * 2
   );
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(
      front.x + cilinderSize * 0.3 - cilinderSize / 8,
      front.y - cilinderSize * 0.52 + yOffset
   );
   ctx.lineTo(
      front.x + cilinderSize * 0.25 - cilinderSize / 2,
      front.y - cilinderSize * 1.3 + yOffset
   );
   ctx.lineTo(
      front.x + cilinderSize * 0.25 + cilinderSize / 2,
      front.y - cilinderSize * 1.3 + yOffset
   );
   ctx.lineTo(
      front.x + cilinderSize * 0.3 + cilinderSize / 8,
      front.y - cilinderSize * 0.52 + yOffset
   );
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   ctx.ellipse(
      front.x + cilinderSize * 0.25,
      front.y - cilinderSize * 1.3 + yOffset,
      cilinderSize / 2,
      cilinderSize / 5,
      0,
      0,
      Math.PI * 2
   );

   ctx.fill();
   ctx.stroke();
}
function drawLocomotiveCabin() {
   const cabinFrontLeft = {
      x: mid.x + Math.cos(trackAngle) * trackThickness,
      y: mid.y + Math.sin(trackAngle) * trackThickness + cilinderSize * 0.3,
   };
   const cabinFrontRight = {
      x: mid.x - Math.cos(trackAngle) * (trackThickness / 2),
      y:
         mid.y -
         Math.sin(trackAngle) * (trackThickness / 2) +
         cilinderSize * 0.5,
   };
   const cabinBackLeft = {
      x: back.x + Math.cos(trackAngle) * (trackThickness / 2),
      y: back.y + Math.sin(trackAngle) * trackThickness + cilinderSize * 0.3,
   };
   const cabinBackRight = {
      x: back.x - Math.cos(trackAngle) * trackThickness,
      y:
         back.y -
         Math.sin(trackAngle) * (trackThickness / 2) +
         cilinderSize * 0.5,
   };

   const topOffset = -cilinderSize * 1.5;

   ctx.strokeStyle = cabinOutline;
   ctx.fillStyle = cabinFill;
   ctx.beginPath();
   ctx.moveTo(cabinFrontLeft.x, cabinFrontLeft.y);
   ctx.lineTo(cabinFrontRight.x, cabinFrontRight.y);
   ctx.lineTo(cabinFrontRight.x, cabinFrontRight.y + topOffset);
   ctx.lineTo(cabinFrontLeft.x, cabinFrontLeft.y + topOffset);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(cabinFrontLeft.x, cabinFrontLeft.y);
   ctx.lineTo(cabinBackLeft.x, cabinBackLeft.y);
   ctx.lineTo(cabinBackLeft.x, cabinBackLeft.y + topOffset);
   ctx.lineTo(cabinFrontLeft.x, cabinFrontLeft.y + topOffset);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(cabinFrontLeft.x, cabinFrontLeft.y + topOffset);
   ctx.lineTo(cabinFrontRight.x, cabinFrontRight.y + topOffset);
   ctx.lineTo(cabinBackRight.x, cabinBackRight.y + topOffset);
   ctx.lineTo(cabinBackLeft.x, cabinBackLeft.y + topOffset);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();
}
function drawWheelPairs(atPercent, showConnector = false) {
   const wheelSize = trackThickness * 1;
   const frontWheels = vLerp(trackLeft, trackRight, atPercent);
   const frontWheelLeft = {
      x: frontWheels.x + Math.cos(trackAngle) * (trackThickness - wheelSize),
      y: frontWheels.y + Math.sin(trackAngle) * (trackThickness - wheelSize),
   };
   const frontWheelRight = {
      x:
         frontWheels.x -
         Math.cos(trackAngle) * (trackThickness + wheelSize / 2),
      y:
         frontWheels.y -
         Math.sin(trackAngle) * (trackThickness + wheelSize / 2),
   };
   //ctx.ellipse(frontWheelRight.x,frontWheelRight.y,
   //   wheelSize*0.4,wheelSize/2,0,0,Math.PI*2);

   drawWheel(
      frontWheelLeft.x,
      frontWheelLeft.y,
      wheelSize / 2,
      ctx,
      showConnector
   );
}

function drawWheel(x, y, rad, ctx, showConnector = false) {
   ctx.save();
   ctx.translate(x, y);
   ctx.scale(0.8, 1);

   ctx.beginPath();
   ctx.strokeStyle = wheelOutline;
   ctx.fillStyle = wheelFill;
   ctx.lineWidth = 2;
   ctx.arc(0, 0, rad, 0, Math.PI * 2);
   ctx.fill();
   ctx.stroke();

   ctx.beginPath();
   for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI * 0.2) {
      var angle = alpha - new Date().getTime() / 300;
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
      ctx.stroke();
   }

   if (showConnector) {
      ctx.beginPath();
      ctx.moveTo((Math.cos(angle) * rad) * 0.6, (Math.sin(angle) * rad) * 0.6);
      ctx.lineTo(
         (Math.cos(angle) * rad) *0.6 - rad * 4.7,
         (Math.sin(angle) * rad) *0.6 + rad * 0.5
      );
      ctx.lineWidth = 5;
      ctx.strokeStyle = connectorColor;
      ctx.stroke();
   }

   ctx.restore();
}
