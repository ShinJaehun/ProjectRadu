class MultiPendulum extends Project{
	constructor(canvas){
		super(canvas);
		
		this.G=[0,2];
		this.particles=[];
		this.segments=[];
		this.selectedParticle=null;
		
		this.particles.push(new Particle(
			[CANVAS_SIZE*0.5, CANVAS_SIZE*0.2],
			true
		));
		this.particles.push(new Particle(
			[CANVAS_SIZE*0.8, CANVAS_SIZE*0.5]
		));
		this.particles.push(new Particle(
			[CANVAS_SIZE*0.6, CANVAS_SIZE*0.4]
		));
		
		this.segments.push(new Segment(
			this.particles[0],this.particles[1]
		));
		this.segments.push(new Segment(
			this.particles[1],this.particles[2]
		));
	
		this.drawFrame();
		this.showDisabled();
	}
	
	drawFrame(){
		clearBackground(this.ctx);
		updateParticles(this.particles,[this.G]);
		updateSegments(this.segments);
		boundParticles(this.particles);
		drawParticles(this.particles,this.ctx);
		drawSegments(this.segments,this.ctx);
	}
	
	move(location){
		if(this.selectedParticle!=null){
			this.selectedParticle.location=location;
			this.selectedParticle.oldLocation=location;
		}
	}
	down(location){
		this.selectedParticle=
			getNearestParticle(this.particles,location);
		this.selectedParticle.isFixed=true;
		this.selectedParticle.location=location;
		this.selectedParticle.oldLocation=location;
	}
	up(location){
		this.selectedParticle.isFixed=false;
		this.selectedParticle=null;
	}
}

function getNearestParticle(particles, location){
	let minDist=Number.MAX_VALUE;
	let nearestParticle=null;
	for(let i=0;i<particles.length;i++){
		let dist=distance(particles[i].location,
						location);
		if(dist<minDist){
			minDist=dist;
			nearestParticle=particles[i];
		}
	}
	return nearestParticle;
}