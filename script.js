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

function toggle(item){
    document.getElementById(item).addEventListener('click', () => {
        if(goals[item]["completed"] != "completed"){
            document.getElementById(item).classList.toggle("completed");
            goals[item]["completed"] = "completed";
            goals[item]["times"] = goals[item]["times"]+1;
            goals[item]["day"] = day;
            document.querySelector(`#`+item+` .times`).innerHTML = goals[item]["times"];            
        }
        else{
            document.getElementById(item).classList.toggle("completed");
            goals[item]["completed"] = "";
            goals[item]["times"] = goals[item]["times"]-1;
            document.querySelector(`#`+item+` .times`).innerHTML = goals[item]["times"];            
        }
        localStorage.setItem('data', JSON.stringify(goals));
    });
}

// add item to goals
document.querySelector(".add").addEventListener("click", function() {
    let promp = prompt("Please enter your name", "Type your goal");
    promp = promp.replace(/[^a-zA-Z0-9 ]/g, '');
    if(promp == ""){
        return;
    }
    goals[promp] = ({ title: promp, times: 0, completed: "", day: day });
    localStorage.setItem('data', JSON.stringify(goals));
    document.querySelector("main").insertAdjacentHTML(
        'beforeend', `<section id="`+[promp]+`" class="goal `+goals[promp]["completed"]+`"><p class="task">`+goals[promp]["title"]+`</p>  <p class="times">`+goals[promp]["times"]+`</p></section>`
    );
    toggle(promp)
});

// When click item add completed and increase number
function completed(){
    if(!document.querySelectorAll(".goal")){
        return;
    }
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
        
        toggle(goal.id);

    });
}

completed();