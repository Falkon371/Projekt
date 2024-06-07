const optionMenu = document.querySelector(".select-menu"),
selectBtn = optionMenu.querySelector(".select-btn"),
options = optionMenu.querySelectorAll(".option"),
sBtn_text = optionMenu.querySelector(".sBtn-text");
const startDate = document.getElementById("start");
const addBtn = document.getElementById("addBtn");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

let indexCounter = document.querySelectorAll('.task').length + 1;


const opis = document.getElementById("opis");
const nz = document.getElementById("nz");
const tasks = document.querySelector(".tasks")

function updateTasksState(){
  const tasksHTML = tasks.innerHTML;
  localStorage.setItem("tasksState", tasksHTML);
}

function loadTasksState(){
  const tasksHTML = localStorage.getItem("tasksState");
  if(tasksHTML){
      if(window.location.pathname.endsWith("past.html")){
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tasksHTML;

        const allTasks = tempDiv.querySelectorAll("li");
        const currentDate = new Date();

        tasks.innerHTML = "";
        allTasks.forEach((task) =>{
          const dateElement = task.querySelector("#dm");
          if(dateElement){
            const taskDate = new Date(dateElement.textContent);
            if(taskDate <= currentDate){
              tasks.appendChild(task);
            }
          }
        });

      }else if(window.location.pathname.endsWith("future.html")){
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tasksHTML;

        const allTasks = tempDiv.querySelectorAll("li");
        const currentDate = new Date();

        tasks.innerHTML = "";
        allTasks.forEach((task) =>{
          const dateElement = task.querySelector("#dm");
          if(dateElement){
            const taskDate = new Date(dateElement.textContent);
            if(taskDate >= currentDate){
              tasks.appendChild(task);
            }
          }
        });
      }else{
        tasks.innerHTML = tasksHTML;
      }


  }
}

addBtn.addEventListener("click", () =>{

    const counter = tasks.childElementCount.length + 1; 

    const loli = document.createElement("li")
    loli.classList.add("task")
    loli.setAttribute("draggable", true); 
    indexCounter++;


    const dateMonth = document.createElement("div")
    dateMonth.classList.add("date-month");
    
    const cal = document.createElement("i")
    cal.classList.add("icon-calendar-empty")

    const dm = document.createElement("p");
    dm.setAttribute("id", "dm")
    dateMonth.appendChild(cal)

    const chosenDate = document.getElementById('start').value;
    const currentDate = new Date();
    const dateToSet = chosenDate ? new Date(chosenDate) : currentDate;
    const day = dateToSet.getDate();
    const month = dateToSet.toLocaleString('default', {month: 'long'});
    dm.innerText = chosenDate;

    const spa = document.createElement("span");
    spa.classList.add("checkbox_inner");

    const checkboxColor = selectColor ? selectColor : "gray";
    const checkboxBorder = selectBorder ? selectBorder : "1px solid black";

    spa.style.backgroundColor = checkboxColor;
    spa.style.border = checkboxBorder;

    if(dateToSet < currentDate){
      dm.style.color = 'red';
    }else if(dateToSet > currentDate){
      dm.style.color = 'blue';
    }else{
      dm.style.color = 'green';
    }

    dateMonth.appendChild(dm)


    const lab = document.createElement("label");
    lab.classList.add("checkbox");

    const divText = document.createElement("div");
    divText.classList.add("text")

    const check = document.createElement("INPUT");
    check.setAttribute("type","checkbox")
    check.classList.add("checkbox_input")

    check.setAttribute("onclick", "removeParentLi(this)")

    lab.appendChild(check);
    lab.appendChild(spa);

    loli.appendChild(lab)

    tasks.appendChild(loli);

    let p1 = document.createElement("p");
    p1.setAttribute("id", "p1")
    let p2 = document.createElement("p");
    p2.setAttribute("id", "p2")

    const existingText = nz.value;
    const drugiExistingText = opis.value;

    p1.textContent = existingText;
    p2.textContent = drugiExistingText;

    divText.appendChild(p1);
    divText.appendChild(p2);

    divText.appendChild(dateMonth)

    loli.appendChild(divText);

 
    document.getElementById('iloscZadan').innerText = countTasks();
    updateTasksState();
})



let selectColor = "";
let selectBorder = "";


options.forEach( (option, index) =>{
    option.addEventListener("click", () =>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;

        let selectedColor = option.querySelector(".icon-flag").getAttribute("style");
        let selectedIcon = option.querySelector(".icon-flag").cloneNode(true);

        let selectBtnIcon = document.querySelector(".select-btn i");
        selectBtnIcon.setAttribute("style", selectedColor);

        selectColor = "";
        selectBorder = "";

        if(index === 0){
          selectColor = "rgb(255, 88, 61)";
          selectBorder = "3px solid red"
        }else if(index === 1){
          selectColor = "rgb(255, 190, 93)";
          selectBorder = "3px solid orange"
        }else if(index === 2){
          selectColor = "rgb(255, 250, 178)";
          selectBorder = "3px solid yellow"
        }else if(index === 3){
          selectColor = "rgb(71, 160, 255)";
          selectBorder = "3px solid blue"
        }
       
        optionMenu.classList.remove("active");
    });
});

function removeParentLi(checkbox) {

  setTimeout(() =>{
    const parentLi = checkbox.closest('.task');
    parentLi.style.opacity = 0;
  },200)

  setTimeout(() => {
      const parentLi = checkbox.closest('.task');
      parentLi.remove();
      document.getElementById('iloscZadan').innerText = countTasks();
      updateTasksState();
  }, 1000);
}

let loadTasksFlag = true;

document.addEventListener("DOMContentLoaded", () =>{
  loadTasksState()
})

function ukryjDiv(){
    const div = document.querySelector(".Pudlo");
    div.classList.toggle("hidden");
}

window.onload = function() {
  ukryjDiv();
};

function ukryjUL(){
  const ul = document.querySelector(".liZadan");
  const icon = document.querySelector(".zaległe i");

  ul.classList.toggle("hidden")

  if(ul.classList.contains("hidden")){
    icon.classList.remove("icon-down-open");
    icon.classList.add("icon-right-open");
  }else{
    icon.classList.remove("icon-right-open");
    icon.classList.add("icon-down-open");
  }

}


function countTasks(){
  const ul = document.querySelector(".tasks");
  const task = ul.querySelectorAll(".task");
  return `${task.length} zadań`;
}

window.onload = function() {
  document.getElementById('iloscZadan').innerText = countTasks();
};


const taski = document.querySelectorAll('.task');

// Dodaj obsługę zdarzenia dla rozpoczęcia przeciągania
taski.forEach(task => {
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragover', handleDragOver);
    task.addEventListener('drop', handleDrop);
});

// Funkcja obsługująca zdarzenie rozpoczęcia przeciągania
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index);
}

// Funkcja obsługująca zdarzenie przeciągania nad elementem
function handleDragOver(event) {
    event.preventDefault();
}

// Funkcja obsługująca zdarzenie upuszczenia elementu
function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const draggedIndex = parseInt(data);
    const dropTarget = event.target.closest('.task');

    if (dropTarget) {
        const dropIndex = parseInt(dropTarget.dataset.index);
        const draggedElement = document.querySelector(`[data-index="${draggedIndex}"]`);

        if (draggedElement) {
            if (draggedIndex < dropIndex) {
                dropTarget.parentElement.insertBefore(draggedElement, dropTarget.nextSibling);
            } else {
                dropTarget.parentElement.insertBefore(draggedElement, dropTarget);
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Znajdź wszystkie elementy o klasie "icon-th-list"
    var elements = document.querySelectorAll('.icon-th-list');
    
    // Iteruj przez wszystkie znalezione elementy
    elements.forEach(function(element) {
      // Dodaj zdarzenie do każdego z nich
      element.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('hidden');
      });
    });
  });


  const draggableList = document.querySelector('.tasks'); // Zmiana na klasę 'tasks'
      
  let dragItem = null;

  draggableList.addEventListener('dragstart', (e) => {
    // Find the closest parent <li> element
    dragItem = e.target.closest('.task');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragItem.innerHTML);
  });

  draggableList.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  draggableList.addEventListener('drop', (e) => {
    if (e.target.tagName === 'P') {
      // Find the closest parent <li> element
      const dropItem = e.target.closest('.task');
      e.preventDefault();
      const temp = dropItem.innerHTML;
      dropItem.innerHTML = e.dataTransfer.getData('text/html');
      dragItem.innerHTML = temp;
    }
  });



  function getDateInWords(date) {
    const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
    const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
  
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
  
    return `${day}, ${dayOfMonth} ${month} ${year}`;
  }
  
  const currentDate = new Date();
  
  document.getElementById('currentDate').innerText = getDateInWords(currentDate);
