class Flag extends Project{
	constructor(canvas){
		super(canvas);
		
		this.G=[0,2];
		this.W=[3,-1]

		this.particles=[];
		this.segments=[];
		this.shapes=[];

		this.selectedParticle=null;
		
		this.createFlag([CANVAS_SIZE*0.2, CANVAS_SIZE*0.2])
	
		this.drawFrame();
		this.showDisabled();
	}

	createFlag(location){
		const N=9;

		for (let i=0; i<N; i++){
			for (let j=0; j<N; j++){
				let isStatic=false
				if(i==0 && (j==0 || j==N-1)){
					isStatic=true
				}
				let color="blue"
				if(i>=3){
					color="yellow"
				}
				if(i>=6){
					color="red"
				}
				this.particles.push(
					new Particle([
						location[0]+i*50,
						location[1]+j*50], isStatic, color
					)
				)
			}
		}

		for (let i=1; i<this.particles.length; i++){
			if(i%N!=0){
				this.segments.push(new Segment(
					this.particles[i-1], this.particles[i]
				))
			}
			if(i>=N){
				this.segments.push(new Segment(
					this.particles[i-N], this.particles[i]
				))
			}
		}
	}
	
	drawFrame(){
		clearBackground(this.ctx);
		updateParticles(this.particles,
			[this.G, scale(this.W, Math.random()*2)]);
		for(let i=0; i<10; i++){
			updateSegments(this.segments);
			boundParticles(this.particles);
		}
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
