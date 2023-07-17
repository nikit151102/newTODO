start()
//---------------------------------------------------------------------Вывод
function start(){
    var length = window.localStorage.length
    for(var i=0; i< length; i++ ){
        console.log(length)
        let items = "item"+ i
        if(window.localStorage.getItem(items) !=null){
            addItems(items) 
        }else{
            length=length+1
        }  
    }
    if(window.innerWidth<=1025){
        valueSelect()
        var select = document.querySelector('.selection')
        findOption(select)
    }else{
        var label = document.querySelector(".titleblock");
        label.textContent = "Активные";
    }
}



//---------------------------------------------------------------------Выбор задач
function findOption(select) {
    const option = select.querySelector(`option[value="${select.value}"]`)

    switch(option.value){

         case "All":
            console.log(option.value);
            expandAllChildren()
            valueSelect()
            break;

         case "Completed":
            expandAllChildren()
            hideCheckedBlocks('notchecked')
            console.log(option.value);
            valueSelect()
            break;

         case "Unfulfilled":
            expandAllChildren()
            hideCheckedBlocks('checked')
            console.log(option.value);
            valueSelect()
            break;
    }
}



//---------------------------------------------------------------------Изменение загаловка
function valueSelect(){
    var label = document.querySelector(".titleblock");
    var selectElement = document.querySelector(".selection");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedText = selectedOption.text;
    label.textContent = selectedText;
}


//---------------------------------------------------------------------Отображение всех задач
function expandAllChildren() {
    var parentBlock = document.getElementById("activeContainer");
    var children = parentBlock.querySelectorAll(".item");
  
    for (var i = 0; i < children.length; i++) {
      children[i].style.display = "flex";
    }
  }


//---------------------------------------------------------------------Скрытие задач исходя от выбора
function hideCheckedBlocks(hideChecked) {
    var container = document.getElementById("activeContainer");
    var children = container.querySelectorAll(".item");
  
    for (var i = 0; i < children.length; i++) {
      var checkbox = children[i].getElementsByClassName("checkboxitem")[0];
        switch(hideChecked){
            case "checked":
                if (checkbox.checked) {
                    children[i].style.display = "none";
                }
            break;
            
            case "notchecked":
            if (!checkbox.checked) {
                children[i].style.display = "none";
            }
        break;
        }
    }
  }


//---------------------------------------------------------------------Добавление новой задачи

var addInput = document.querySelector('.add');

addInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    newItem()
  }
});


function newItem(){
let Storagelength =window.localStorage.length
let items = "item"+ Storagelength
let valueITEM = document.querySelector(".add").value
    if(valueITEM.length <1){
        openAlert()
    }else{
        if(Storagelength >=1){
            while(window.localStorage.getItem(items) != null){
            Storagelength=Storagelength+1
            items = "item"+ Storagelength
        }}

         const item = {
         textx : valueITEM ,
         active : 'false'
         }
         window.localStorage.setItem(items,JSON.stringify(item))
         document.querySelector(".add").value = ""
         addItems(items)   
}}


//---------------------------------------------------------------------Добавление задач в интерфейс
function addItems(idItem){

    var keyitem = localStorage.getItem(idItem)
    console.log(keyitem)
    if(keyitem !== null){
        var div = document.createElement('div')
            div.classList = "item"
            div.id = "DIV"+idItem
   
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = JSON.parse(keyitem).textx;
        checkbox.id = idItem;
        checkbox.classList= "checkboxitem";
        
        var label = document.createElement('label')
        label.htmlFor = idItem; 
        label.classList = "checkboxtext"
        label.appendChild(document.createTextNode(JSON.parse(keyitem).textx));
        
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener('click', handleDeleteButtonClick);

        div.appendChild(checkbox);
        div.appendChild(label);
        div.appendChild(deleteButton);

        let activeItem = document.querySelector("#activeContainer")
        let completedItem = document.querySelector(".completedItem")

        const ScreenWidth = window.innerWidth;
        if(ScreenWidth>=1025){
            if(JSON.parse(keyitem).active == "true"){
                checkbox.checked = true
                completedItem.appendChild(div)
            }else{
                activeItem.appendChild(div)
            }
        }else{
            activeItem.appendChild(div)
            if(JSON.parse(keyitem).active == "true"){
                checkbox.checked = true
            }
        }
    }
}



//---------------------------------------------------------------------Прослушивание checkboxs
var activeContainer = document.getElementById('activeContainer');
var completedContainer = document.getElementById('completedContainer');


activeContainer.addEventListener('change', function(event) {
    EventListener(event)
});

completedContainer.addEventListener('change', function(event) {
    EventListener(event)
});

function EventListener(event){
    if (event.target.type === 'checkbox') {
        var ischeckbox = event.target.id;
        var isChecked = event.target.checked;
        var value = event.target.value;
        var getDiv =  document.getElementById("DIV"+ ischeckbox);
        const selection = document.querySelector(".selection")
        if (isChecked) { 
            console.log('checked');
            if(selection.value == "Unfulfilled"){
                getDiv.style.display = "none";
            }
            
            localStorage.setItem(ischeckbox,localStorage.getItem(ischeckbox).replace("false", "true" ))

            const blockToRemove = document.getElementById('DIV'+ischeckbox);
            if (blockToRemove) {
            const parentElement = blockToRemove.parentNode;
            parentElement.removeChild(blockToRemove);
            }
            addItems(ischeckbox)

            } else { 
            console.log('unchecked');
            if(selection.value == "Completed"){
                getDiv.style.display = "none";
            }
           
            localStorage.setItem(ischeckbox,localStorage.getItem(ischeckbox).replace("true", "false" ))

            const blockToRemove = document.getElementById('DIV'+ischeckbox);
            if (blockToRemove) {
            const parentElement = blockToRemove.parentNode;
            parentElement.removeChild(blockToRemove);}

            addItems(ischeckbox)
            
            }
        console.log('Значение: ' + value + ', отмечен: ' + ischeckbox);
        }
}



//---------------------------------------------------------------------Работа с Alert окном
function openAlert() {
    const alertContainer = document.querySelector('.alert-container');
  alertContainer.style.display = 'flex';
}

function closeAlert() {
    const alertContainer = document.querySelector('.alert-container');
  alertContainer.style.display = 'none';
}


//---------------------------------------------------------------------Удаление выбранной задачи

function handleDeleteButtonClick(event) {

  const block = event.target.closest('.item');
  if (block) {
    const checkbox = block.querySelector('input[type="checkbox"]');
    const checkboxId = checkbox.id;
   
    localStorage.removeItem(checkboxId);
    block.remove();
    console.log('Удален блок с id checkbox:', checkboxId);
  }
}


//---------------------------------------------------------------------Очистка
function clears(condit){
    clear(condit)
}

function clear(condition){
    
    switch(condition){
        case "false":
            Delete("activeContainer") 
         break;
        case "true":
            Delete("completedContainer")
        break;
    }
}

function Delete(idDiv){
    const ParentBlock = document.getElementById(idDiv);
    const ChildElements = ParentBlock.querySelectorAll('*');
    const BlockIds = [];
    ChildElements.forEach(element => {
    if (element.id) {
        BlockIds.push(element.id);
    }
    });
    console.log(BlockIds);
    while (ParentBlock.firstChild) {
        ParentBlock.removeChild(ParentBlock.firstChild);
    }
    for (let i = 1; i < BlockIds.length; i+=2) {
        window.localStorage.removeItem(BlockIds[i]); 
    }
}



//---------------------------------------------------------------------Отслеживание ширины экрана
window.addEventListener('resize', function() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if(screenWidth <= 1025){
        clearing(document.getElementById("activeContainer"))
        clearing(document.getElementById("completedContainer"))
        start()
     
    }
    if(screenWidth > 1025){
        clearing(document.getElementById("activeContainer"))
        clearing(document.getElementById("completedContainer"))
        start()
    }

  });
  
  function clearing(value) {
    while (value.firstChild) {
        value.removeChild(value.firstChild);
    }
    
  }

//---------------------------------------------------------------------Создаем одинаковую высоту для двух блоков
  function setEqualHeight() {
    var blocks = document.querySelectorAll('.titleaddItem');
    var maxHeight = 0;
  
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].style.height = 'auto'; 
      var height = blocks[i].offsetHeight;
      maxHeight = Math.max(maxHeight, height);
    }
  
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].style.height = maxHeight + 'px';
    }
  }
  
  window.addEventListener('load', setEqualHeight);
  window.addEventListener('resize', setEqualHeight);