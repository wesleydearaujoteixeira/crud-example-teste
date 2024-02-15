'use strict'



const openModal = () => document.getElementById('modal')
        .classList.add('active')
    
const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    LimparCampos()
 } 

    

// Create

function Create(client) {
    const dataBase = JSON.parse(localStorage.getItem('enviado')) ?? [] // Se não tiver nada no LocalStorage ele armazena em um array
    dataBase.push(client)
    localStorage.setItem('enviado', JSON.stringify(dataBase)) // atualiza o banco de dados no localStorage
}


function Read() {
    return JSON.parse(localStorage.getItem('enviado')) ?? [] 
}


// Update


function Update(newIndex, name, email, celular, cidade) {

    const valores = JSON.parse(localStorage.getItem('enviado')) ?? []  

    valores[newIndex].nome = name
    valores[newIndex].email = email
    valores[newIndex].celular = celular
    valores[newIndex].cidade = cidade

    localStorage.setItem('enviado', JSON.stringify(valores))


}

// Delete

function Delete(index) {
    const valores = JSON.parse(localStorage.getItem('enviado')) ?? []
    valores.splice(index, 1)
    localStorage.setItem('enviado', JSON.stringify(valores))



}

// Verification fields

const isValidField = () => {
    return document.getElementById('form').reportValidity()

    
}


function LimparCampos () {
    const inputs = document.querySelectorAll('.modal-field')
    inputs.forEach((filds) => filds.value = '')
}



function SaveClient () {
    if(isValidField()) {

        const client = {
            nome: document.querySelector('#nome').value,
            email: document.querySelector('#email').value,
            celular: document.querySelector('#celular').value,
            cidade: document.querySelector('#cidade').value
        }

        const index = document.getElementById('nome').dataset.index

        if(index == 'new'){
            Create(client)
            UpdateTable()
            closeModal()
        }else{
            Update(index, client.nome, client.email, client.celular, client.cidade)
            closeModal()
            UpdateTable()
        }

       


    }else {
        console.log('Infelizmente não é possivel cadastrar')
    }
}

function createRow (client, index) {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `

    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}" >editar</button>
        <button type="button" class="button red" id="delete-${index}" >excluir</button>

    `

    document.querySelector('#tableClient > tbody').appendChild(newRow)

}


function clearTable() {
    const rows = document.querySelectorAll('#tableClient > tbody > tr')
    rows.forEach((rows) => rows.parentNode.removeChild(rows))
}

const UpdateTable = () => {
    const valores = Read()
    clearTable()
    valores.forEach(createRow)

}



function editingFileds (clientes) {

    document.querySelector('#nome').value = clientes.nome
    document.querySelector('#email').value = clientes.email
    document.querySelector('#celular').value = clientes.celular
    document.querySelector('#cidade').value = clientes.cidade
    document.querySelector('#nome').dataset.index = clientes.index

}



function EditClient (index) {
    const values = Read()[index]
    values.index = index
    editingFileds(values)
    openModal()


}



const editDelete = (event) => {
    if(event.target.type === 'button'){
        const [action, index] = event.target.id.split('-')
        if(action == 'edit') {
            console.log('editando um post')
            EditClient(index)

        } else {
            console.log('excluindo um post')
            Delete(index)
            location.reload();

        }
        
    }else {
        console.log(' n é um button')
    }

}

UpdateTable()


// Eventos de click


document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', SaveClient)
document.querySelector('#tableClient > tbody').addEventListener('click', editDelete)
