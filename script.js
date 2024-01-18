
var bigSelect = new Audio('audio/bigSelect.mp3');
var bigDeSelect = new Audio('audio/bigDeSelect.mp3');
var getNewSpecialitem = new Audio('audio/getNewSpecialitem.mp3');
var note = new Audio('audio/note.mp3');
var Pick_Coin15 = new Audio('audio/Pick_Coin15.mp3');
var pickupCoin = new Audio('audio/pickupCoin.mp3');
// --------------------------------------- TO DO LIST CODE ---------------------------------------

// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
});

let lists = [];

function saveToLocalStorage() {
    localStorage.setItem('lists', JSON.stringify(lists));
}

function loadFromLocalStorage() {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
        lists = JSON.parse(storedLists);
        renderLists();
    }
}

document.getElementById('create-list-btn').addEventListener('click', function() {
    let listName = document.getElementById('new-list-name').value;
    if (listName) {
        bigSelect.play();
        createNewList(listName);
        document.getElementById('new-list-name').value = '';
    }
});

function createNewList(name) {
    let newList = {
        name: name,
        tasks: []
    };
    lists.push(newList);
    saveToLocalStorage();
    renderLists();
}

function renderLists() {
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = '';

    lists.forEach((list, listIndex) => {
        let todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');

        let listTitleInput = document.createElement('input');
        listTitleInput.type = 'text';
        listTitleInput.value = list.name;
        listTitleInput.classList.add('list-title');
        todoContainer.appendChild(listTitleInput);

        let todoInput = document.createElement('input');
        todoInput.type = 'text';
        todoInput.classList.add('addtask');
        todoInput.placeholder = 'Add a new task...';
        todoContainer.appendChild(todoInput);

        let addTodoBtn = document.createElement('button');
        addTodoBtn.textContent = '✓';
        addTodoBtn.classList.add('add-btn');
        addTodoBtn.onclick = function() {
            if (todoInput.value) {
                bigSelect.play();
                addTodoItem(todoInput.value, listIndex);
                todoInput.value = '';
            }
        };
        todoContainer.appendChild(addTodoBtn);

        let deleteListBtn = document.createElement('button');
        deleteListBtn.textContent = 'X';
        deleteListBtn.classList.add('delete-list-btn');
        deleteListBtn.onclick = function() {
            if (confirm('Are you sure you want to delete this list?')) {
                bigDeSelect.play();
                lists.splice(listIndex, 1);
                saveToLocalStorage();
                renderLists();
            }
        };
        todoContainer.appendChild(deleteListBtn);

        // Append existing tasks
        list.tasks.forEach(task => {
            let item = createTodoItem(task, listIndex);
            todoContainer.appendChild(item);
        });

        listsContainer.appendChild(todoContainer);
    });
}

    function createTodoItem(taskText, listIndex) {
        let item = document.createElement('li');
        item.textContent
    = taskText;
    item.classList.add('todo-item');


    // Complete task button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = '✓';
    completeBtn.classList.add('complete-btn');
    completeBtn.onclick = function() {{
        getNewSpecialitem.play();
        lists[listIndex].tasks = lists[listIndex].tasks.filter(task => task !== taskText);
        saveToLocalStorage();
        renderLists();
        // earn currency and points function
        earnCurrency();
        earnPoints();
        // congrats model
        showCongrats();
    }
    };

    // Delete task button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() {
        if (confirm('Are you sure you want to delete this task?')) {
            bigDeSelect.play();
            lists[listIndex].tasks = lists[listIndex].tasks.filter(task => task !== taskText);
            saveToLocalStorage();
            renderLists();
        }
    };

    item.appendChild(completeBtn);
    item.appendChild(deleteBtn);

    return item;
    }

function addTodoItem(text, listIndex) {
lists[listIndex].tasks.push(text);
saveToLocalStorage();
renderLists();
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
    note.play();
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
        
    


    






