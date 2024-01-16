
// --------------------------------------- TO DO LIST CODE ---------------------------------------

// list name and button 
document.getElementById('create-list-btn').addEventListener('click', function() {
    let listName = document.getElementById('new-list-name').value;
    if (listName) {
        createNewList(listName);
        document.getElementById('new-list-name').value = '';
    }
});

//create list function ( created div - input - list title edit - create list - delete list )
function createNewList(name) {
    let listsContainer = document.getElementById('lists-container');

    // add to do list container
    let todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');

    // input list name 
    let listTitleInput = document.createElement('input');
    listTitleInput.type = 'text';
    listTitleInput.value = name;
    listTitleInput.classList.add('list-title');
    todoContainer.appendChild(listTitleInput);

    // input task name
    let todoInput = document.createElement('input');
    todoInput.type = 'text';
	todoInput.classList.add('addtask');
    todoInput.placeholder = 'Add a new task...';
    todoContainer.appendChild(todoInput);
   
    // create list button
	let addTodoBtn = document.createElement('button');
    addTodoBtn.textContent = '✓';
	addTodoBtn.classList.add('add-btn');
    addTodoBtn.onclick = function() {
        if (todoInput.value) {
            addTodoItem(todoInput.value, todoContainer);
            todoInput.value = '';
        }
    };

    //delete name button
    let deleteListBtn = document.createElement('button');
    deleteListBtn.textContent = 'X';
	deleteListBtn.classList.add('delete-list-btn');
    deleteListBtn.onclick = function() {
        if (confirm('Are you sure you want to delete this list?')) {
        listsContainer.removeChild(todoContainer);
        }
    };

    //terms
    todoContainer.appendChild(todoInput);
    todoContainer.appendChild(addTodoBtn);
    todoContainer.appendChild(deleteListBtn);
    listsContainer.appendChild(todoContainer);
}

// create task function ( create task btn - delete task btn )
function addTodoItem(text, todoList) {
    
    // create task element
    let item = document.createElement('li');
    item.textContent = text;
    item.classList.add('todo-item');

    // complete task button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = '✓';
    completeBtn.classList.add('complete-btn');
    completeBtn.onclick = function() {
        earnPoints();
        earnCurrency();
        showCongrats();
        todoList.removeChild(item);
        
    };

    // delete task button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() {
         if (confirm('Are you sure you want to delete this task?')) {
            todoList.removeChild(item);
        }
    };

    item.appendChild(completeBtn);
    item.appendChild(deleteBtn);
    todoList.appendChild(item);
}

// --------------------------------------- LEVEL, XP, CURRENCY ---------------------------------------


// Initialize points and currency
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let currency = localStorage.getItem('currency') ? parseInt(localStorage.getItem('currency')) : 0;
let level = localStorage.getItem('level') ? parseInt(localStorage.getItem('level')) : 1;;
let xp = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;;
const xpForNextLevel = 100; // XP needed to reach the next level
updateDisplay();

// Function to simulate earning points
function earnPoints() {
    xp += Math.floor(Math.random()*11)+5; // Earn 10 XP
    if (xp >= xpForNextLevel) {
        levelUp();
    }
    updateLocalStorage();
    updateDisplay();
}

function levelUp() {
    level++;
    xp -= xpForNextLevel; // Reset XP to 0 or carry over excess XP
    updateLocalStorage();
    updateDisplay();
}

function earnCurrency() {
    currency += Math.floor(Math.random()*11)+5; // Earn 10 points
    updateLocalStorage();
    updateDisplay();
}

// Update the local storage
function updateLocalStorage() {
    localStorage.setItem('points', xp);
    localStorage.setItem('currency', currency);
    localStorage.setItem('level', level);
}

// Update the display on the webpage
function updateDisplay() {
    document.getElementById('level').textContent = level;
    document.getElementById('currency').textContent = currency;

    // Update points bar
    let barWidth = (xp / xpForNextLevel) * 100;
    document.getElementById('points-bar').style.width = barWidth + '%';
}

// Function to reset points and currency
function resetPointsAndCurrency() {
    level = 1;
    xp = 0;
    currency = 0;
    updateLocalStorage();
    updateDisplay();
}

// Function to show the congratulation popup
function showCongrats(xpEarned, moneyEarned) {
    var modal = document.getElementById("congratsModal");
    var span = document.getElementsByClassName("close")[0];
    document.getElementById("congratsMessage").innerHTML = `Congratulations! You earned ${xp} XP and ${currency} currency.`;

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal
            .style.display = "none";}
        }
}
        
    


    






