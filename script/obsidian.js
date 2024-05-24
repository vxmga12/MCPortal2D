const verifyPortal = {
    corner: {
        topLeft: null,
        topRight: null,
        bottomRight: null,
        bottomLeft: null
    },
    wallCounter: {
        leftWall: 0,
        topWall: 0,
        rightWall: 0,
        bottomWall: 0,
    },
    initialBlockSearch: null,
    structure: {
        horizontal: null,
        vertical: null
    },
    leftWallAdd: function(){
        this.wallCounter.leftWall += 1;
    },
    topWallAdd: function(){
        this.wallCounter.topWall += 1;
    },
    rightWallAdd: function(){
        this.wallCounter.rightWall += 1;
    },
    bottomWallAdd: function(){
        this.wallCounter.bottomWall += 1;
    },
    verifyInital: (elem) => {
        if(elem.blockType === 'obsidian'){
            alert("Can't light it!");
            return true;
        }
    },
    checkLeftBlock: function(idx) {
        return wrapper.children[idx-1].blockType;
    },
    checkUpBlock: function(idx){
        return wrapper.children[idx-64].blockType;
    },
    checkRightBlock: function(idx){
        return wrapper.children[idx+1].blockType;
    },
    checkDownBlock: function(idx){
        return wrapper.children[idx+64].blockType;
    },
    moveUntilFoundWall: function(elem){
        if(Math.floor((elem.index - 1)/64)*64 != Math.floor(elem.index/64)*64){ //verifies if theres is any obsidian on the left of the clicked object
            alert("Not a valid portal");
            return;
        }
        if(elem.blockType === "obsidian"){
            this.leftWallAdd();
            return elem.index + 1;
        }
        
        return this.moveUntilFoundWall(wrapper.children[elem.index - 1]); //returns the index (int) of the first item to hit on the left wall
    },
    moveUp: function(idx){
        if(idx < 0 || idx > 2047){
            alert("Not a valid portal!!");
            return;
        }
        if(this.checkLeftBlock(idx) == "obsidian"){
            if(this.checkUpBlock(idx) != "obsidian"){
                return this.moveUp(idx-64);
            }else if(this.checkUpBlock(idx) == "obsidian"){
                this.corner.topLeft = idx;
                return idx;
            }
        }else{
            alert("Not a valid portal!!");
            return;
        }        
    },
    moveRight: function(idx){
        if(Math.floor(idx/64) != Math.floor((idx + 1)/64)){
            alert("Not a valid portal");
            return;
        }
        if(this.checkUpBlock(idx) == "obsidian"){
            if(this.checkRightBlock(idx) != "obsidian"){
                this.topWallAdd();
                return this.moveRight(idx+1);
            }else if(this.checkRightBlock(idx) == "obsidian"){
                this.corner.topRight = idx;
                return idx;
            }
        }else{
            alert("Not a valid portal!!");
            return; 
        }
    },
    moveDown: function(idx){
        if(idx < 0 || idx > 2047){
            alert("Not a valid portal!!");
            return;
        }
        if(this.checkRightBlock(idx) == "obsidian"){
            if(this.checkDownBlock(idx) != "obsidian"){
                this.rightWallAdd();
                return this.moveDown(idx+64);
            }else if(this.checkDownBlock(idx) == "obsidian"){
                this.corner.bottomRight = idx;
                return idx;
            }
        }else{
            alert("Not a valid portal!!");
            return;
        }
    },
    moveLeft: function(idx){
        if(Math.floor(idx/64) != Math.floor((idx - 1)/64)){
            alert("Not a valid portal");
            return;
        }
        if(this.checkDownBlock(idx) == "obsidian"){
            if(this.checkLeftBlock(idx) != "obsidian"){
                this.bottomWallAdd();
                return this.moveLeft(idx-1);
            }else if(this.checkLeftBlock(idx) == "obsidian"){
                this.corner.bottomLeft = idx;
                return idx;
            }
        }else{
            alert("Not a valid portal!!");
            return;
        }
    },
    moveToTL: function(idx){
        if(idx < 0 || idx > 2047){
            alert("Not a valid portal!!");
            return;
        }
        if(this.checkLeftBlock(idx) == "obsidian"){
            if(this.checkUpBlock(idx) != "obsidian"){
                this.leftWallAdd();
                return this.moveToTL(idx-64);
            }else if(this.checkUpBlock(idx) == "obsidian"){
                if(idx == this.corner.topLeft){
                    return true;
                }else{
                    alert("Not a valid portal!!");
                    return false; 
                }
            }
        }else{
            alert("Not a valid portal!!");
            return;
        } 
    },
    checkPortalStructure: function(){
        this.structure.horizontal = (this.corner.topRight - this.corner.topLeft) + 1;
        this.structure.vertical = ((this.corner.bottomLeft - this.corner.topLeft)/64) + 1;
        if(this.structure.horizontal < 2 || this.structure.vertical < 3){
            return "Not a valid portal";
        }
        for(let i = 0; i < this.structure.horizontal; i++){
            for(let j = 0; j < this.structure.vertical; j++){
                if(wrapper.children[this.corner.topLeft + i + (j * 64)].blockType == "obsidian"){
                    return "not a valid portal";
                }
            }
        }
        for(let i = 0; i < this.structure.horizontal; i++){
            for(let j = 0; j < this.structure.vertical; j++){
                wrapper.children[this.corner.topLeft + i + (j * 64)].classList.add("portalBlock");
            }
        }
        
    }
}


wrapper.addEventListener("click", (e) => { //so everytime i click inside the wrapper div it triggers this event with the object e
    if(e.target == wrapper) {
        return;
    }
    if(MCtoolbar.lastKeyPressed == '1'){ //SELECTS OBSIDIAN ITEM TO PLACE THE BLOCK
        e.target.blockType = 'obsidian'; //define the blockType to obsidian
        e.target.classList.add("obsidian"); //add the image background with obsidian texture
    }
    else if(MCtoolbar.lastKeyPressed == '2'){ //LIGHTS THE PORTAL
        if(verifyPortal.verifyInital(e.target)){ //verifies if its is being lighten up in a valid non obsidian block
            return;
        }
        console.log(verifyPortal.moveToTL(verifyPortal.moveLeft(verifyPortal.moveDown(verifyPortal.moveRight(verifyPortal.moveUp(verifyPortal.moveUntilFoundWall(e.target)))))));
        console.log(verifyPortal.checkPortalStructure());
    }
    else if(MCtoolbar.lastKeyPressed == '3'){ //REMOVES THE OBSIDIAN BLOCK
        e.target.blockType = 'notObsidian';
        e.target.classList.remove("obsidian");
    }
    
})