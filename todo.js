//variables

let todoItems=[]
const todoInput = document.querySelector('.todo-input');
const completedTodosDiv = document.querySelector('.completed-todos');
const uncompletedTodosDiv = document.querySelector('.uncompleted-todos');
 

//Get todo list on first boot

window.onload=()=>{
    let storagetodoitems= localStorage.getItem('todoItems');
    if(storagetodoitems !== null){
        todoItems = JSON.parse(storagetodoitems)
    }
    render()
}

//Get the content type into the input
todoInput.onkeyup = ((e)=>{
let value = e.target.value.replace(/^\s+/,"")
if(value && e.keyCode === 13){
    addTodo(value)
    todoInput.value= ''
    todoInput.focus()
}
})

//Add todo
function addTodo(text){
todoItems.push({
    id:Date.now(),
    text,
    completed:false
})
saveandRender()
}

//Remove todo
function removeTodo(id){
todoItems = todoItems.filter(todo => todo.id !== Number(id))
saveandRender()
}

//Mark as completed

function markasCompleted(id){
    todoItems = todoItems.filter(todo =>{
        if(todo.id === Number(id)){
            todo.completed = true
        }
        return todo;
    })
   saveandRender();
}

function marksaUncompleted(id){
    todoItems = todoItems.filter(todo =>{
        if(todo.id === Number(id)){
            todo.completed = false
        }
        return todo;
    })
    saveandRender();
    
}

//save in local storage
function save(){
    localStorage.setItem('todoItems',JSON.stringify(todoItems))
}

//Render
function render(){
    let uncompletedTodos = todoItems.filter(item => !item.completed)
    let completedTodos = todoItems.filter(item => item.completed)

    completedTodosDiv.innerHTML = ''
    uncompletedTodosDiv.innerHTML= ''

    if(uncompletedTodos.length > 0){
        uncompletedTodos.forEach(todo =>{
            uncompletedTodosDiv.append(createtodoElement(todo))
        })
    }else{
        uncompletedTodosDiv.innerHTML = `<div class='empty'> No incompleted mission </div>`  
    }

    if(completedTodos.length > 0){
        completedTodosDiv.innerHTML = `<div class= 'completed-title'> Completed(${completedTodos.length} / ${todoItems.length})</div>`

        completedTodos.forEach(todo =>{
            completedTodosDiv.append(createtodoElement(todo))
        })
    }
}

//save and render
function saveandRender(){
    save()
    render()
}

//create todo item
function createtodoElement(todo){
    //create todo list container
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id',todo.id)
    todoDiv.className = 'todo-item'

    //create todo item text
    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    //checkbox for list
   
    const todoInputCheckbox = document.createElement('input')
   todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.completed
    todoInputCheckbox.onclick = (e) =>{
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markasCompleted(id) : marksaUncompleted(id)
    }

    //Delete button for list

    const todoRemoveBtn = document.createElement('a')
    todoRemoveBtn.href='#'
    todoRemoveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>`;

    todoRemoveBtn.onclick= (e) => {
        let id = e.target.closest('.todo-item').dataset.id ;
        removeTodo(id)
    }
    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)
    
    return todoDiv
}