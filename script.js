var time = new Date();
var day = time.getDate();

if(localStorage.getItem('data')){
    var goals = JSON.parse(localStorage.getItem('data'));
}
else{
    var goals = {};
}

// in beginning add all items
for (item in goals){
    document.querySelector("main").insertAdjacentHTML(
        'beforeend', `<section id="`+[item]+`" class="goal `+goals[item]["completed"]+`"><p class="task">`+goals[item]["title"]+`</p>  <p class="times">`+goals[item]["times"]+`</p></section>`
    );
}

console.log(goals);

// add item to goals
document.querySelector(".add").addEventListener("click", function() {
    let promp = prompt("Please enter your name", "Type your goal");
    goals[promp] = ({ title: promp, times: 0, completed: "", day: day });
    document.querySelector("main").insertAdjacentHTML(
        'beforeend', `<section id="`+[promp]+`" class="goal `+goals[promp]["completed"]+`"><p class="task">`+goals[promp]["title"]+`</p>  <p class="times">`+goals[promp]["times"]+`</p></section>`
    );
    localStorage.setItem('data', JSON.stringify(goals));
    completed();
});

// When click item add completed and increase number
function completed(){
    document.querySelectorAll(".goal").forEach((goal) => {
        if(goals[goal.id]["day"] != day && goals[goal.id]["completed"] != "completed" ){
            goal.remove();
            delete goals[goal.id];
            return;
        }
        if(goals[goal.id]["day"] != day && goals[goal.id]["completed"] == "completed"){
            goals[goal.id]["day"] = day;
            goal.classList.toggle("completed");
            goals[goal.id]["completed"] = "";
        }
        goal.addEventListener('click', () => {
            if(goals[goal.id]["completed"] != "completed"){
                goal.classList.toggle("completed");
                goals[goal.id]["completed"] = "completed";
                goals[goal.id]["times"] = goals[goal.id]["times"]+1;
                goals[goal.id]["day"] = day;
                goal.querySelector(".times").innerHTML = goals[goal.id]["times"];
                completed();
                
            }
            else{
                goal.classList.toggle("completed");
                goals[goal.id]["completed"] = "";
                goals[goal.id]["times"] = goals[goal.id]["times"]-1;
                goal.querySelector(".times").innerHTML = goals[goal.id]["times"];
                completed();
                
            }
            localStorage.setItem('data', JSON.stringify(goals));
        }, {once : true});
    });
}

completed();






// // localStorage.setItem("dayCompleted", 10);
// // localStorage.setItem("level", 5);
// // console.log(localStorage.getItem("level"));


// if(localStorage.getItem("dayCompleted") == day){
//     document.querySelector("div").classList.add("grow2");
//     document.querySelector(".done").classList.add("show2");
// }

// document.querySelector("div").addEventListener("click", function() {
//     if(localStorage.getItem("dayCompleted") == day){    
//         return
//     }
//     this.classList.add("grow");
//     document.querySelector(".done").classList.add("show");
//     localStorage.setItem("dayCompleted", day);
//     console.log(localStorage.getItem("level"));
//     if (localStorage.getItem("level") == null){
//         localStorage.setItem("level", 5);
//         return;
//     }
//     localStorage.setItem("level", parseInt(localStorage.getItem("level")) + 1);
// });



