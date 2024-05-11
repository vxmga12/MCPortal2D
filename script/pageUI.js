//Welcome screen

const bodyElement = document.getElementsByTagName('body')[0];

const welcomeScreen = document.createElement("div");
welcomeScreen.setAttribute("id", "welcome");

const anonDiv = document.createElement("div");
const spanOne = document.createElement("span");
const spanTwo = document.createElement("span");
const divConfirm = document.createElement("div");
divConfirm.setAttribute("class", "confirm");
const confirmButton = document.createElement("button");
confirmButton.setAttribute("onclick", "document.getElementById('welcome').style.display = 'none';");
confirmButton.innerText = "Confirm";
spanOne.innerText = "Use CTRL + Mouse to move around.";
spanTwo.innerText = "Use scroll wheel to zoom.";

divConfirm.appendChild(confirmButton);
anonDiv.appendChild(spanOne);
anonDiv.appendChild(spanTwo);
anonDiv.appendChild(divConfirm);
welcomeScreen.appendChild(anonDiv);




//Verify session

if(sessionStorage.length === 0){ //Verify if there's any data the sessionStorage object. If it isn't then it means that its the first time loading the seassion
    bodyElement.insertBefore(welcomeScreen, bodyElement.firstChild); //Inserts the Welcome screen
}

sessionStorage.setItem("insertKey", "sampleValue"); //This is just a random data that only serves to fill the sessionStorage oject so that the length property is different than 0.


// centering anonDiv

const middleOfScreen = (welcomeScreen.clientHeight / 2) - (anonDiv.clientHeight / 2);
welcomeScreen.style.paddingTop = `${middleOfScreen}px`;