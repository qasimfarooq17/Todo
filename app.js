var mainList = document.getElementById('mainList')
var todoInput = document.getElementById('inp')



firebase.database().ref('todos').on('child_added', function(data){
    var text = document.createTextNode(data.val().value)
    var li = document.createElement('li')
    li.setAttribute('class', 'list')
    li.appendChild(text)
    
    mainList.appendChild(li)
    todoInput.value = ''

    var btnDiv = document.createElement('div')
    //=== Create Delete Button =====
    var deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'btn')
    deleteBtn.setAttribute('id',data.val().key)
    deleteBtn.setAttribute('onClick', 'deletTodo(this)')
    var deleteBtnText = 'Delete Todo'
    var deleteText = document.createTextNode(deleteBtnText)
    deleteBtn.appendChild(deleteText)
    btnDiv.appendChild(deleteBtn)

    //=== Create Edit Button =====
    var editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'btn')
    editBtn.setAttribute('id',data.val().key)
    editBtn.setAttribute('onClick', 'editTodo(this)')
    var editText = document.createTextNode('Edit Todo')
    editBtn.appendChild(editText)
    btnDiv.appendChild(editBtn)

    li.appendChild(btnDiv)
    
})


function addTodo(){
    var inputText = todoInput.value
    
    var database = firebase.database().ref('todos');
    var key = database.push().key;
    var todo = {
        value : todoInput.value,
        key : key
    }

    database.child(key).set(todo)
    todoInput.value = ""
    
    
}

function deletTodo(e) { 
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.parentNode.remove()
}

function editTodo(e) {
       var val = prompt ("Enter update value",e.parentNode.firstChild.nodeValue)
       var editTodo = {
           value : val,
           key : e.id
       } 

       firebase.database().ref('todos').child(e.id).set(editTodo)
       e.parentNode.parentNode.childNodes = val
    
    var listText = e.parentNode.parentNode.firstChild
    listText.nodeValue = val
}

function deleteAll() {
   
    mainList.innerHTML = ""
    firebase.database().ref('todos').remove()
    // e.parentNode.parentNode.remove()
   
}
