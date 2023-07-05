let addBtn = document.getElementById("add-todo-btn");
let modal = document.getElementById("Addmodal");
let bg = document.getElementById("Addmodal_background");
let manageTodo = document.getElementById("manage-todo");
let manageBtn = document.getElementById("manage-btn");
let addtodoform = document.getElementById("AddTodo_form");
let TodoList = document.getElementById("box1_list");
let manageTable = document.getElementById("todo-list");
let completeList = document.getElementById("box2_list");

addBtn.onclick = function () {
  bg.style.display = "block";
  modal.style.display = "block";
  modal.className = "animate__animated animate__flip";

  addtodoform.onsubmit = function (e) {
    e.preventDefault();
    let todo = document.getElementById("todo");
    if (todo.value.trim() != "") {
      addTodo(todo.value);
    } else {
      toast("Please enter your Todo..!");
    }
  };
};

function addTodo(todo) {
  let li = document.createElement("LI");
  let p = document.createElement("P");
  p.append(document.createTextNode(todo));

  let markBtn = document.createElement("BUTTON");
  markBtn.textContent = "mark";
  markBtn.className = "mark_btn";

  li.append(p);
  li.append(markBtn);

  TodoList.append(li);
  addtodoform.reset();

  toast("Your ToDo is Successfully Added...!");

  addTomanageTodo(todo);
  markTodo(markBtn);
}

function markTodo(markBtn) {
  markBtn.onclick = function () {
    let li = markBtn.parentElement;
    let newli = li;
    li.remove();
    newli.childNodes[1].className = "unmark-btn";
    newli.childNodes[1].textContent = "unmark";
    completeList.append(newli);
    toast("Your Todo is Maked..!");
    unmarkTodo(newli.childNodes[1]);
  };
}

function unmarkTodo(unmarkBtn) {
  unmarkBtn.onclick = function () {
    let li = unmarkBtn.parentElement;
    newli = li;
    li.remove();
    newli.childNodes[1].className = "mark_btn";
    newli.childNodes[1].textContent = "mark";
    TodoList.append(newli);

    markTodo(newli.childNodes[1]);
    toast("Your Todo is Unmaked..!");
  };
}
function addTomanageTodo(todo) {
  let tr = document.createElement("TR");
  let sr_td = document.createElement("TD");
  let todo_td = document.createElement("TD");
  let edit_td = document.createElement("TD");
  let del_td = document.createElement("TD");

  sr_td.textContent = 1;
  todo_td.textContent = todo;

  editBtn = document.createElement("BUTTON");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  delBtn = document.createElement("BUTTON");
  delBtn.textContent = "Delet";
  delBtn.className = "del-btn";

  edit_td.append(editBtn);
  del_td.append(delBtn);

  tr.append(sr_td);
  tr.append(todo_td);
  tr.append(edit_td);
  tr.append(del_td);

  manageTable.append(tr);

  editTodo(editBtn);
  deleteTodo(delBtn);
}
function editTodo(editBtn) {
  let oldTodoname, newTodo;
  editBtn.onclick = function () {
    if (editBtn.className == "edit-btn") {
      editBtn.className = "update-btn";
      editBtn.textContent = "Update";
      let tr = editBtn.parentElement.parentElement;
      let todo_td = tr.childNodes[1];
      oldTodoname = todo_td.textContent;
      todo_td.setAttribute("contenteditable", true);
      todo_td.style.border = "2px dashed blue";
      toast("You can Edit NOW..!");
    } else {
      editBtn.className = "update-btn";
      editBtn.textContent = "Edit";
      let tr = editBtn.parentElement.parentElement;
      let todo_td = tr.childNodes[1];
      newTodo = todo_td.textContent;
      todo_td.setAttribute("contenteditable", false);
      todo_td.style.border = "1px solid black";

      let allLi = document.querySelectorAll("#box1 li");
      for (i = 0; i < allLi.length; i++) {
        if (allLi[1].children[0].textContent.indexOf(oldTodoname) != -1) {
          allLi[1].children[0].textContent = newTodo;
          break;
        }
      }

      toast("You have updated the ToDo..!");

      //  let boxLi = document.querySelectorAll("#box2_list li");
      //  for(i=0;i<boxLi.length;i++){
      //  if(boxLi[1].children[0].textContent.indexOf(oldTodoname) != -1){
      //   boxLi[1].children[0].textContent = newTodo;
      //   break;
      //  }
    }
  };
}
function deleteTodo(delBtn) {
  let oldTodoname;
  delBtn.onclick = function () {
    let tr = delBtn.parentElement.parentElement;
    oldTodoname = tr.childNodes[1].textContent;

    tr.remove();

    let allLi = document.querySelectorAll("#box1_list li");
    for (i = 0; i < allLi.length; i++) {
      if (allLi[i].children[0].innerHTML.indexOf(oldTodoname) != -1) {
        allLi[i].remove();
      }
    }

    let completeallLi = document.querySelectorAll("#box2_list li");
    for (i = 0; i < completeallLi.length; i++) {
      if (completeallLi[i].children[0].innerHTML.indexOf(oldTodoname) != -1) {
        completeallLi[i].remove();
      }
    }
    toast("You have Successfully deleted the ToDo..!");
  };
}

bg.onclick = function () {
  bg.style.display = "none";
  modal.style.display = "none";
  manageTodo.style.left = "-50%";
};

manageBtn.onclick = function () {
  bg.style.display = "block";
  manageTodo.style.left = "30%";
  manageTodo.className = "animate__animated animate__slideInLeft";
};

function toast(msg) {
  let toast = document.getElementById("Toast");
  let toastText = document.getElementById("toast-text");
  toastText.textContent = msg;
  toast.style.display = "block";

  setTimeout(function () {
    toast.style.display = "none";
  }, 2000);
}
