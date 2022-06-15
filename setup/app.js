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
    const valorIngresado = grocery.value 
    const idMundoTimeDelUniverso = new Date().getTime().toString();
    if(valorIngresado && !editFlag) {
        const elementoCrear = document.createElement('article');
        // agregarle clase al elemento creado
        elementoCrear.classList.add('grocery-item');
        // crcear y agregar id como atributo en el camino desde js, para dataset
        const atributoData = document.createAttribute('data-id');
        atributoData.valorIngresado =  idMundoTimeDelUniverso;
        elementoCrear.setAttributeNode(atributoData);
        elementoCrear.innerHTML = `<p class="title">${valorIngresado}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"> </i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"> </i>
              </button>
            </div>`;
            // appen child
            list.appendChild(elementoCrear);
            // display alert
            displayAlert('Valor agregado', 'success');
            // mostrar lista
            container.classList.add('show-container');
            // agregar al local storage
            addToLocalStorage(idMundoTimeDelUniverso, valorIngresado);
            // set back to default
            setBackToDefault();

    } else if(valorIngresado && editFlag) {
        console.log('editando');
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
}

// set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(idMundoTimeDelUniverso, valorIngresado){
    console.log('agregando al local storage');
}

// ****** SETUP ITEMS **********
