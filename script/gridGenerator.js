const wrapper = document.getElementById("wrapper");

for (let i = 1; i <= 2048; i++) {
    const div = document.createElement('div');
    div.classList.add("cellBlock");
    //div.innerHTML = i;

    wrapper.appendChild(div);
}

console.log(wrapper);
