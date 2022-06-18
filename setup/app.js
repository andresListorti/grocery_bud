// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')
const deleteBtn = document.querySelector('.delete-btn')

// edit option
let editElement;
let editFlag = false;
let editId = '';

// ****** EVENT LISTENERS **********

// submit form

form.addEventListener('submit', addItem);

// clear items

clearBtn.addEventListener('click', clearItems);



// ****** FUNCTIONS **********

function addItem(e) {
    e.preventDefault();
    const value = grocery.value 
    const id = new Date().getTime().toString();
   

    if(value && !editFlag) {
        const elementoCrear = document.createElement('article');
        // agregarle clase al elemento creado
        elementoCrear.classList.add('grocery-item');
        // crcear y agregar id como atributo en el camino desde js, para dataset
        const atributoData = document.createAttribute('data-id');
        console.log(atributoData.value);
        atributoData.value =  id;
        elementoCrear.setAttributeNode(atributoData);
        elementoCrear.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"> </i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"> </i>
              </button>
            </div>`;
                // aprovecho aca que tengo acceso al elemento creado con los edit y delete y los targeteo ahora, para los event listener a disponibilidad luegio de la carga dinamica del elemento
                const deleteBtn = elementoCrear.querySelector('.delete-btn');
                const editBtn = elementoCrear.querySelector('.edit-btn');
                     deleteBtn.addEventListener('click', deleteItem);
                        editBtn.addEventListener('click', editItem);
            

            // appen child ppal
            list.appendChild(elementoCrear);
            // display alert
            displayAlert('Valor agregado', 'success');
            // mostrar lista
            container.classList.add('show-container');
            // agregar al local storage
            addToLocalStorage(id, value);
            // set back to default
            setBackToDefault();

    } else if(value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('valor cambiado', 'success');
        editLocalStorage(editId, value)
        setBackToDefault();
    } else {
        displayAlert('Ingrese Un valor', 'danger');
    }
}

// display alert
function displayAlert(text, action) {
        alert.textContent = text;
        alert.classList.add(`alert-${action}`);
        // remove alert
        setTimeout(function(){
            alert.textContent = '';
            alert.classList.remove(`alert-${action}`);
        }, 1000)
}

// clear items

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    console.log(items);
    if(items.length > 0){
        items.forEach(function(item){ 
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('lista vacia', 'success');
    setBackToDefault();
    localStorage.removeItem('list');
}


// delete function 
function deleteItem(e){
    const elemento = e.currentTarget.parentElement.parentElement;
    console.log(elemento);
    const id = elemento.dataset.id;
    console.log(id);
    list.removeChild(elemento);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}

// edit function
function editItem(e){
    const elemento = e.currentTarget.parentElement.parentElement;
    // set edit element
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = elemento.dataset.id;
    submitBtn.textContent = 'edit';
}





// set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id, value}; 
    
    let items = getLocalStorage();
        console.log(items);
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items))
}


// 
// 
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    
    items = items.filter(function(item){
        if(item.id!== id) {
            return item 
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
    
}

// 
// 

function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id) {
            item.value = value;
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items));

}


function getLocalStorage(){
     return localStorage.getItem('list')
        ? JSON.parse(localStorage.getItem('list')) 
        : [];
     
}
// localStorage API
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem('naranjas', JSON.stringify(['naranjaitem', 'naranjaitem2']))
// const naranjas = JSON.parse(localStorage.getItem('naranjas'))
// console.log(naranjas);
// localStorage.removeItem('naranjas')

// ****** SETUP ITEMS **********
