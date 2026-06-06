let total = 0;
let completed = 0;

function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value === ""){
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = input.value + " ";

    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";

    doneBtn.onclick = function(){
        if(!li.classList.contains("completed")){
            li.classList.add("completed");
            completed++;
            document.getElementById("completed").innerText = completed;
        }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = " Delete";

    deleteBtn.onclick = function(){
        li.remove();
    };

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    total++;
    document.getElementById("total").innerText = total;

    input.value = "";
}