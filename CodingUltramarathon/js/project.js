class Project {
    constructor(canvas) {
        this.canvas=canvas;
        this.ctx = canvas.getContext("2d");

        this.addEventListeners();

    }

    drawFrame(){
    }

    showDisabled(){
        this.ctx.fillStyle ="rgba(150,150,150,0.5)"
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)
        this.ctx.font = "10vh Comic Sans MS"
        this.ctx.fillStyle ="orange"
        this.ctx.textAlign ="center"
        this.ctx.textBaseline ="middle"
        this.ctx.fillText(
            this.constructor.name, // ctx 이름 얻어내는 방법!!
            this.canvas.width/2,
            this.canvas.height/2)
    }

    addEventListeners(){
        let me = this; // 대체 왜 이렇게 하는걸까???
        this.canvas.addEventListener('mouseover', function(event){
            if(me.interval == null) {
                me.drawFrame() // 한 프레임을 새로 그려야 깨끗하게 화면에 표시됨
                me.interval=setInterval(()=>{
                    me.drawFrame();
                }, 1000/30) // interval 이후에 다시 시작이기 때문
            }
        }, false)

        this.canvas.addEventListener('mouseout', function(event){
            if(me.interval != null){
                clearInterval(me.interval);
                me.interval=null;
    
                me.showDisabled();
            }
        }, false)

        this.canvas.addEventListener('click', function(event){
            const location = getMousePos(me.canvas, event)
            console.log(location)
        }, false)
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    // 각 좌표를 0부터 1,000까지로 정규화 
    return [
        Math.round(CANVAS_SIZE*(evt.clientX - rect.left)/(rect.right-rect.left)),
        Math.round(CANVAS_SIZE*(evt.clientY - rect.top)/(rect.bottom-rect.top))
    ]
}

function drawDarkBackground(ctx) {
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
}

function clearBackground(ctx) {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
}

function drawColoredBackground(ctx, color) {
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
}

// A will go over B
function addToCanvas(ctxA, ctxB) {
    const imgDataA = ctxA.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)
    const imgDataB = ctxB.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

    //[1r,1g,1b,1a,2r,2g,2b,2a,...] Size: 4*CANVAS_SIZE^2
    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE; x++) {
    		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;
    		// let r=imgData.data[index]
    		// let g=imgData.data[index+1]
    		// let b=imgData.data[index+2]
    		let a=imgDataA.data[index+3]
    		
            // if (r == 255 && g == 255 && b == 255) {
    		if (a>0){
                // imgData.data[index] = 0
    			// imgData.data[index+1] = 255
    			// imgData.data[index+2] = 0
                imgDataB.data[index] = imgDataA.data[index]
    			imgDataB.data[index+1] = imgDataA.data[index+1] 
    			imgDataB.data[index+2] = imgDataA.data[index+2]
    		}
    	}
    }

    ctxB.putImageData(imgDataB,0,0)
}

function copyArr(arr) {
    let newArr=[]
    for (let i=0; i< arr.length; i++) {
        newArr[i]=arr[i]
    }
    return newArr
}