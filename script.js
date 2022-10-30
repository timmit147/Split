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
    const id = item["id"];
    document.querySelector("main").insertAdjacentHTML(
        'beforeend', `<section id="`+[id]+`" class="goal `+goals[item]["completed"]+`"><p class="task">`+goals[item]["title"]+`</p>  <p class="times">`+goals[item]["times"]+`</p></section>`
    );
}

// add item to goals
document.querySelector(".add").addEventListener("click", function() {
    var promp = prompt("Please enter your name", "Type your goal");
    promp = promp.split(/[^a-zA-Z0-9 ]/g).join("");
    promp = promp.replace(/[0-9]/g, '');

    if(promp == ""){
        return;
    }
    const title = promp;
    const id = promp.split(" ").join("_");
    goals[id] = ({ title: title, times: 0, completed: "", day: day });
    localStorage.setItem('data', JSON.stringify(goals));
    document.querySelector("main").insertAdjacentHTML(
        'beforeend', `<section id="`+id+`" class="goal `+goals[id]["completed"]+`"><p class="task">`+goals[id]["title"]+`</p>  <p class="times">`+goals[id]["times"]+`</p></section>`
    );
    toggle(id);
});

// When click item add completed and increase number
function completed(){
    if(!document.querySelectorAll(".goal")){
        return;
    }
    document.querySelectorAll(".goal").forEach((goal) => {
        if(goals[goal.id["day"]] != day && goals[goal.id["completed"]] != "completed" ){
            goal.remove();
            delete goals[goal.id];
            return;
        }
        if(goals[goal.id["day"]] != day && goals[goal.id["completed"]] == "completed"){
            goals[goal.id["day"]] = day;
            goal.classList.toggle("completed");
            goals[goal.id["completed"]] = "";
        }
        toggle(goal.id);

    });
}

function toggle(item){
    document.getElementById(item).addEventListener('click', () => {
        if(goals[item]["completed"] != "completed"){
            document.getElementById(item).classList.toggle("completed");
            goals[item]["completed"] = "completed";
            goals[item]["times"] = goals[item]["times"]+1;
            goals[item]["day"] = day;
            document.querySelector(`#`+item+` .times`).textContent = goals[item]["times"];            
        }
        else{
            document.getElementById(item).classList.toggle("completed");
            goals[item]["completed"] = "";
            goals[item]["times"] = goals[item]["times"]-1;
            document.querySelector(`#`+item+` .times`).textContent  = goals[item]["times"];            
        }
        localStorage.setItem('data', JSON.stringify(goals));
    });
}

completed();
