class Pendulum extends Project {
    constructor(canvas) {
        super(canvas)

		this.G=[0, 2]
		this.particles=[]
		this.segments=[]

		this.particles.push(new Particle(
			[CANVAS_SIZE*0.5, CANVAS_SIZE*0.2], true
		))
		this.particles.push(new Particle(
			[CANVAS_SIZE*0.4, CANVAS_SIZE*0.7]
		))
		// this.particles.push(new Particle(
		// 	[CANVAS_SIZE*0.6, CANVAS_SIZE*0.4]
		// ))

		this.segments.push(new Segment(
			this.particles[0], this.particles[1]
		))
		// this.segments.push(new Segment(
		// 	this.particles[1], this.particles[2]
		// ))
		// this.segments.push(new Segment(
		// 	this.particles[0], this.particles[2]
		// ))

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
		clearBackground(this.ctx)
		updateParticles(this.particles, this.G)
		updateSegments(this.segments)
		boundParticles(this.particles)
		drawParticles(this.particles, this.ctx)
		drawSegments(this.segments, this.ctx)
    }
}

class Segment{
	constructor(particleA, particleB){
		this.particleA=particleA
		this.particleB=particleB
		this.length=distance(particleA.location, particleB.location)
	}
	update(){
		let newLength=
			subtract(this.particleA.location, this.particleB.location)
		let magn=maginitude(newLength)
		let diff=magn-this.length
		let norm=normalize(newLength)
		if(!this.particleA.isFixed && !this.particleB.isFixed){
			this.particleA.location=
				add(this.particleA.location, scale(norm, -diff*0.5))
			this.particleB.location=
				add(this.particleB.location, scale(norm, diff*0.5))
		} else if(!this.particleA.isFixed){
			this.particleA.location=
				add(this.particleA.location, scale(norm, -diff))
		} else {
			this.particleB.location=
				add(this.particleB.location, scale(norm, diff))
		}
		
	}
	draw(ctx){
		ctx.beginPath()
		ctx.strokeStyle="blue"
		ctx.moveTo(...this.particleA.location)
		ctx.lineTo(...this.particleB.location)
		ctx.stroke()
	}
}

// verlet integration... euler integration
class Particle{
	constructor(location, isFixed){
		this.isFixed=isFixed
		this.location=location
		this.oldLocation=location
		this.radius=10
	}
	update(forces){
		if(this.isFixed){
			return
		}
		let vel=subtract(this.location, this.oldLocation)
		let newLocation=add(this.location, vel)

		for(let i=0; i<forces.length; i++){
			newLocation=add(newLocation, forces[i])
		}

		this.oldLocation=this.location
		this.location=newLocation
	}
	draw(ctx){
		ctx.beginPath()
		ctx.fillStyle="black"
		ctx.arc(...this.location,this.radius,0,Math.PI*2)
		ctx.fill()
	}
}

function boundParticles(particles, G){
	for(let i=0; i<particles.length; i++){
		if(particles[i].location[1]>CANVAS_SIZE){
			particles[i].location[1]=CANVAS_SIZE
		}
	}
}

function updateSegments(segments){
	for(let i=0; i<segments.length; i++){
		segments[i].update() // 이렇게 하는게 맞는가?
	}
}

function drawSegments(segments, ctx){
	for(let i=0; i<segments.length; i++){
		segments[i].draw(ctx)
	}
}

function updateParticles(particles, G){
	for(let i=0; i<particles.length; i++){
		particles[i].update([G]) // 이렇게 하는게 맞는가?
	}
}

function drawParticles(particles, ctx){
	for(let i=0; i<particles.length; i++){
		particles[i].draw(ctx)
	}
}

function subtract(v1, v2){
	let newV = []
	for(let i=0; i<v1.length; i++){
		newV[i]=v1[i]-v2[i]
	}
	return newV
}

function maginitude(v){
	let magn=0
	for(let i=0; i<v.length; i++){
		magn+=v[i]*v[i]
	}
	return Math.sqrt(magn)
}

function normalize(v){
	return scale(v, 1/maginitude(v))
}