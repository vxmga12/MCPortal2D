wrapper.addEventListener("click", (e) => { //so everytime i click inside the wrapper div it triggers this event with the object e
    if(e.target == wrapper) {
        return;
    }
    console.log(e.target.blockID); //returns blockID
    if(MCtoolbar.lastKeyPressed == '1'){ //if last item selected on toolbar is obsidian then...
        e.target.blockType = 'obsidian'; //define the blockType to obsidian
        e.target.classList.add("obsidian"); //add the image background with obsidian texture
    }
    else if(MCtoolbar.lastKeyPressed == '2'){
        console.log("lightning...");
    }
    else if(MCtoolbar.lastKeyPressed == '3'){
        e.target.blockType = 'notObsidian';
        e.target.classList.remove("obsidian");
    }
    
})