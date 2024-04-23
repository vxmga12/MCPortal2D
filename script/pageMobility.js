const rightSide = wrapper.clientWidth - window.innerWidth;
const moveByRight = rightSide / 2;
const bottomSide = wrapper.clientHeight - window.innerHeight;
const moveByBottom = bottomSide / 2;

let oldXMousePos;
let oldYMousePos;

let zoom = 1;
let zoomDiff = 0.3;
let onZoomXCoord;
let onZoomYCoord;

addEventListener("load", (event) => {
    window.scrollBy(moveByRight, moveByBottom);
});

wrapper.addEventListener("mousemove", (e) => {

    onZoomXCoord = e.pageX;
    onZoomYCoord = e.pageY;
    //console.log(onZoomXCoord, onZoomYCoord);
    console.log(e.clientX, e.clientY);

    if (e.ctrlKey) {
        wrapper.style.cursor = 'none';
        while(document.querySelectorAll(".cellBlock").length){
            document.querySelectorAll(".cellBlock")[0].classList.remove("cellBlock")
        }
        let xDiff = e.clientX - oldXMousePos;
        let yDiff = e.clientY - oldYMousePos;
        
        window.scrollBy(xDiff, yDiff);
        oldXMousePos = e.clientX;
        oldYMousePos = e.clientY;
    }
    else if (!e.ctrlKey){
        for(let i = 1; i < wrapper.childNodes.length; i++){
            wrapper.childNodes[i].classList.add("cellBlock");
        }
        wrapper.style.cursor = 'crosshair';
        xDiff = undefined;
        yDiff = undefined;
        oldXMousePos = undefined;
        oldYMousePos = undefined;
    }

});

wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();

    
    wrapper.style.transformOrigin = onZoomXCoord + "px " + onZoomYCoord + "px";
    
    
    if(e.deltaY > 0){
        zoom = zoom > 1 ? zoom -= zoomDiff : 1;
        wrapper.style.transform = `scale(${zoom = zoom < 1 ? 1 : zoom})`;
    }
    else if(e.deltaY < 0){
        zoom = zoom < 3 ? zoom += zoomDiff : 3;
        wrapper.style.transform = `scale(${zoom = zoom > 3 ? 3 : zoom})`;
    }

});