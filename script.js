const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const search=document.getElementById("search");
const filters=document.querySelectorAll(".filter");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
let currentFilter="all";

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayTasks(){

taskList.innerHTML="";

let keyword=search.value.toLowerCase();

tasks.filter(task=>{

const matchSearch=task.text.toLowerCase().includes(keyword);

const matchFilter=
currentFilter==="all"||
(currentFilter==="completed"&&task.completed)||
(currentFilter==="pending"&&!task.completed);

return matchSearch&&matchFilter;

}).forEach((task,index)=>{

const li=document.createElement("li");

if(task.completed) li.classList.add("completed");

li.innerHTML=`

<span>${task.text}</span>

<div class="actions">

<button class="done">✔</button>

<button class="edit">Edit</button>

<button class="delete">Delete</button>

</div>

`;

const buttons=li.querySelectorAll("button");

buttons[0].onclick=()=>{
task.completed=!task.completed;
saveTasks();
displayTasks();
};

buttons[1].onclick=()=>{
let updated=prompt("Edit Task",task.text);

if(updated){
task.text=updated;
saveTasks();
displayTasks();
}
};

buttons[2].onclick=()=>{
tasks.splice(index,1);
saveTasks();
displayTasks();
};

taskList.appendChild(li);

});

}

addBtn.onclick=()=>{

const text=taskInput.value.trim();

if(text==="") return;

tasks.push({
text:text,
completed:false
});

taskInput.value="";

saveTasks();

displayTasks();

};

search.addEventListener("input",displayTasks);

filters.forEach(btn=>{

btn.onclick=()=>{

filters.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

currentFilter=btn.dataset.filter;

displayTasks();

}

});

displayTasks();