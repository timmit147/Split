var time = new Date();
var day = time.getDate();

localStorage.setItem("dayCompleted", 10);
// localStorage.setItem("level", 5);
// console.log(localStorage.getItem("level"));


if(localStorage.getItem("dayCompleted") == day){
    document.querySelector("div").classList.add("grow2");
    document.querySelector(".done").classList.add("show2");
}

if (localStorage.getItem("level") > 15){
    document.querySelector("div").classList.add("habbitCompleted");
    document.querySelector(".done").textContent = "You completed your habbit";
}

document.querySelector("div").addEventListener("click", function() {
    if(localStorage.getItem("dayCompleted") == day){    
        return
    }
    this.classList.add("grow");
    document.querySelector(".done").classList.add("show");
    localStorage.setItem("dayCompleted", day);
    console.log(localStorage.getItem("level"));
    if (localStorage.getItem("level") == null){
        localStorage.setItem("level", 5);
        return;
    }
    localStorage.setItem("level", parseInt(localStorage.getItem("level")) + 1);
});



