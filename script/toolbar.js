let press = false;
let previousActiveItem = 1;

const itemSelection = document.createElement("div");
itemSelection.setAttribute("class", "itemSelected");

document.addEventListener("keydown", (e) => {
    if(!press){
        press = true;
        if(e.key != previousActiveItem){
            document.querySelectorAll("#item" + previousActiveItem +" .itemSelected")[0].remove(); // removes the big selected image
            document.querySelectorAll("#item" + previousActiveItem)[0].style.background = ''; //resets to base image
            if(e.key === '1'){
                item1.style.background = 'none'; //removes the small item image of the selected key
                item1.appendChild(itemSelection);
                previousActiveItem = 1;            
            }
            else if(e.key === '2'){
                item2.style.background = 'none';
                item2.appendChild(itemSelection);
                previousActiveItem = 2;              
            }
            else if(e.key === '3'){
                item3.style.background = 'none';                   
                item3.appendChild(itemSelection);
                previousActiveItem = 3;
            }
            else if(e.key === '4'){
                item4.style.background = 'none';
                item4.appendChild(itemSelection);
                previousActiveItem = 4;
            }
            else if(e.key === '5'){
                item5.style.background = 'none';
                item5.appendChild(itemSelection);
                previousActiveItem = 5;
            }
            else if(e.key === '6'){
                item6.style.background = 'none';
                item6.appendChild(itemSelection);
                previousActiveItem = 6;               
            }
            else if(e.key === '7'){
                item7.style.background = 'none';     
                item7.appendChild(itemSelection);
                previousActiveItem = 7;
            }
            else if(e.key === '8'){
                item8.style.background = 'none';   
                item8.appendChild(itemSelection);
                previousActiveItem = 8;
            }
            else if(e.key === '9'){
                item9.style.background = 'none';
                item9.appendChild(itemSelection);
                previousActiveItem = 9;
            }

        }
        
        
    }
});

document.addEventListener("keyup", (e) => {
    press = false;
})