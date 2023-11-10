class LaserSound extends Project {
    constructor(canvas) {
        super(canvas)

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
               
        drawDarkBackground(this.ctx);
        this.ctx.font = "10vh Comic Sans MS"
        this.ctx.fillStyle ="orange"
        this.ctx.textAlign ="center"
        this.ctx.textBaseline ="middle"
        this.ctx.fillText(
            "Click for piano Laser Sound", // ctx 이름 얻어내는 방법!!
            this.canvas.width/2,
            this.canvas.height*0.3)
    }

    click(location){
        playLaser()
    }
}

function playLaser(){
    var osc=AUDIO_CONTEXT.createOscillator()
    var gainNode = AUDIO_CONTEXT.createGain()

    gainNode.gain.setValueAtTime(0, AUDIO_CONTEXT.currentTime)

    osc.connect(gainNode)
    gainNode.connect(AUDIO_CONTEXT.destination)

    osc.frequency.value=800
    osc.type="sine"

    let duration=0.6
    osc.start(AUDIO_CONTEXT.currentTime)
    osc.stop(AUDIO_CONTEXT.currentTime+duration)

    gainNode.gain.linearRampToValueAtTime(1,
        AUDIO_CONTEXT.currentTime+0.1)
    gainNode.gain.linearRampToValueAtTime(0.5,
        AUDIO_CONTEXT.currentTime+0.2)
    gainNode.gain.exponentialRampToValueAtTime(0.001,
        AUDIO_CONTEXT.currentTime+duration)

    osc.frequency.linearRampToValueAtTime(200,
        AUDIO_CONTEXT.currentTime+duration)

    setTimeout(function(){
        osc.disconnect();
    }, (duration)*1000)
}