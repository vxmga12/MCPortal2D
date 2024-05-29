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

        return new Promise((resolve, reject) => {
            if(Math.floor((elem.index - 1)/64)*64 != Math.floor(elem.index/64)*64){ //verifies if theres is any obsidian on the left of the clicked object
                alert("Not a valid portal");
                reject(new Error('Not a portal!'));
                return;
            }

            if(elem.blockType === "obsidian"){
                this.leftWallAdd();
                resolve(elem.index + 1);
                return;
            }

            this.moveUntilFoundWall(wrapper.children[elem.index - 1])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.log(error);
            }); 

        });

        
        
        
        
    },
    moveUp: function(idx){

        return new Promise((resolve, reject) => {

            if(idx < 0 || idx > 2047){
                alert("Not a valid portal!!");
                reject(new Error('Not a valid Portal!'));
                return;
            }

            if(this.checkLeftBlock(idx) == "obsidian"){
                if(this.checkUpBlock(idx) != "obsidian"){
                    this.moveUp(idx-64)
                    .then((value) => {
                        resolve(value);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                }else if(this.checkUpBlock(idx) == "obsidian"){
                    this.corner.topLeft = idx;
                    resolve(idx);
                    return;
                }
            }else{
                alert("Not a valid portal!!");
                reject(new Error('Not a valid Portal!'));
                return;
            }

        });            
    },
    moveRight: function(idx){

        return new Promise((resolve, reject) => {
            if(Math.floor(idx/64) != Math.floor((idx + 1)/64)){
                alert("Not a valid portal");
                reject(new Error("Not a valid Portal!"));
                return;
            }
            if(this.checkUpBlock(idx) == "obsidian"){
                if(this.checkRightBlock(idx) != "obsidian"){
                    this.topWallAdd();
                    this.moveRight(idx+1)
                    .then((value) => resolve(value))
                    .catch((error) => reject(error));
                }else if(this.checkRightBlock(idx) == "obsidian"){
                    this.corner.topRight = idx;
                    resolve(idx);
                    return;
                }
            }else{
                alert("Not a valid portal!!");
                reject(new Error("Not a valid Portal!"));
                return; 
            }
        });
    },
    moveDown: function(idx){
        return new Promise((resolve, reject) => {
            if(idx < 0 || idx > 2047){
                alert("Not a valid portal!!");
                reject(new Error("Not a valid Portal!"));
                return;
            }
            if(this.checkRightBlock(idx) == "obsidian"){
                if(this.checkDownBlock(idx) != "obsidian"){
                    this.rightWallAdd();
                    this.moveDown(idx+64)
                    .then(value => resolve(value))
                    .catch(error => reject(error));
                }else if(this.checkDownBlock(idx) == "obsidian"){
                    this.corner.bottomRight = idx;
                    resolve(idx);
                    return;
                }
            }else{
                alert("Not a valid portal!!");
                reject(new Error("Not a valid Portal!"));
                return;
            }
        });
        
    },
    moveLeft: function(idx){
        return new Promise((resolve, reject) => {
            if(Math.floor(idx/64) != Math.floor((idx - 1)/64)){
                alert("Not a valid portal");
                reject(new Error("Not a valid Portal!"));
                return;
            }
            if(this.checkDownBlock(idx) == "obsidian"){
                if(this.checkLeftBlock(idx) != "obsidian"){
                    this.bottomWallAdd();
                    this.moveLeft(idx-1)
                    .then(value => resolve(value))
                    .catch(error => reject(error));
                }else if(this.checkLeftBlock(idx) == "obsidian"){
                    this.corner.bottomLeft = idx;
                    resolve(idx);
                    return;
                }
            }else{
                alert("Not a valid portal!!");
                reject(new Error("Not a valid Portal!"));
                return;
            }
        });
        
    },
    moveToTL: function(idx){

        return new Promise((resolve, reject) => {
            if(idx < 0 || idx > 2047){
                alert("Not a valid portal!!");
                reject(new Error("Not a valid Portal!"));
                return;
            }
            if(this.checkLeftBlock(idx) == "obsidian"){
                if(this.checkUpBlock(idx) != "obsidian"){
                    this.leftWallAdd();
                    this.moveToTL(idx-64)
                    .then(value => resolve(value))
                    .catch(error => reject(error));
                }else if(this.checkUpBlock(idx) == "obsidian"){
                    if(idx == this.corner.topLeft){
                        resolve(true);
                        return;
                    }else{
                        alert("Not a valid portal!!");
                        reject(new Error("Not a valid Portal!"));
                        return; 
                    }
                }
            }else{
                alert("Not a valid portal!!");
                reject(new Error("Not a valid Portal!"));
                return;
            }
        });

        
         
    },
    checkPortalStructure: function(check){
        if(check != true){
            alert("Invalid coordinates");
            return;
        }

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

        verifyPortal.moveUntilFoundWall(e.target)
        .then(value => verifyPortal.moveUp(value))
        .then(value => verifyPortal.moveRight(value))
        .then(value => verifyPortal.moveDown(value))
        .then(value => verifyPortal.moveLeft(value))
        .then(value => verifyPortal.moveToTL(value))
        .then(value => verifyPortal.checkPortalStructure(value))
        .catch((error) => {
            console.log(error);
        });

        //console.log(verifyPortal.moveToTL(verifyPortal.moveLeft(verifyPortal.moveDown(verifyPortal.moveRight(verifyPortal.moveUp(verifyPortal.moveUntilFoundWall(e.target)))))));
        //console.log(verifyPortal.checkPortalStructure());
    }
    else if(MCtoolbar.lastKeyPressed == '3'){ //REMOVES THE OBSIDIAN BLOCK
        e.target.blockType = 'notObsidian';
        e.target.classList.remove("obsidian");
    }
    
})