const rightSide = wrapper.clientWidth - window.innerWidth;
const moveByRight = rightSide / 2;
const bottomSide = wrapper.clientHeight - window.innerHeight;
const moveByBottom = bottomSide / 2;

let oldXMousePos;
let oldYMousePos;

let onZoomXCoord;
let onZoomYCoord;

let scrolled = 0;

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

//Scrolling feature
wrapper.addEventListener("wheel", (e) => {
    //Scroll Up
    if(e.deltaY < 0 && scrolled < 5){
        scrolled++;
        console.log(scrolled);
        let xDifferencePos = (e.pageX * 1.2) - e.pageX;
        let yDifferencePos = (e.pageY * 1.2) - e.pageY;
        wrapper.style.width = `${wrapper.clientWidth * 1.2}px`;
        scrollBy(xDifferencePos, yDifferencePos);
    } //Scroll down
    else if(e.deltaY > 0 && scrolled > 0){
        scrolled--;
        let xDifferencePos = (e.pageX / 1.2) - e.pageX;
        let yDifferencePos = (e.pageY / 1.2) - e.pageY;
        wrapper.style.width = `${wrapper.clientWidth / 1.2}px`;
        scrollBy(xDifferencePos, yDifferencePos);
    }
});
