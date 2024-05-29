const wrapper = document.getElementById("wrapper");

for (let i = 1; i <= 2048; i++) {
    const div = document.createElement('div');
    div.classList.add("cellBlock");
    if(i <= 1024){
        div.classList.add("skyBlock");
    }
    else if (i > 1024 && i <= 1088) {
        div.classList.add("grassBlock");
    }
    else if ( i > 1088 && i <= 2048){
        div.classList.add("dirtBlock");
    }
    div.blockID = i;
    div.index = i - 1; 
    div.blockType = 'notObsidian';
    div.innerHTML = i;

    wrapper.appendChild(div);
}
