const rightSide = wrapper.clientWidth - window.innerWidth;
const moveByRight = rightSide / 2;
const bottomSide = wrapper.clientHeight - window.innerHeight;
const moveByBottom = bottomSide / 2;

let oldXMousePos;
let oldYMousePos;

let zoom = 1;
const zoomDiff = 0.2;
let onZoomXCoord;
let onZoomYCoord;


const zoomer = {
    scaleAmount: 1,
    zoomIn(mouseX, mouseY) {
                
    }
};

addEventListener("load", (event) => {
    window.scrollBy(moveByRight, moveByBottom);
});

wrapper.addEventListener("mousemove", (e) => {
    //console.log(e.pageX, e.pageY);

    onZoomXCoord = e.pageX;
    onZoomYCoord = e.pageY;

    //Panning
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
    

    //Scroll Up
    if(e.deltaY < 0){
        let xDifferencePos = (e.pageX * 1.2) - e.pageX;//-24
        let yDifferencePos = (e.pageY * 1.2) - e.pageY;//-24
        wrapper.style.width = `${wrapper.clientWidth * 1.2}px`;
        scrollBy(xDifferencePos, yDifferencePos);
    }
    else if(e.deltaY > 0){
        wrapper.style.width = `${wrapper.clientWidth / 1.2}px`;
    }

});
