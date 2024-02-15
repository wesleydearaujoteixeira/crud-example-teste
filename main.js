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

        const dataindex = document.getElementById('nome').dataset.dataindex

        if(dataindex == 'new'){
            Create(client)
            UpdateTable()
            location.reload()
            closeModal()

        }else{
            Update(dataindex, client.nome, client.email, client.celular, client.cidade)
            UpdateTable()
            location.reload()
            closeModal()

        }


    }else {
        console.log('Infelizmente não é possivel cadastrar')
    }
}






function clearTable() {
    const rows = document.querySelectorAll('#tableClient > tbody > tr')
    rows.forEach((rows) => rows.parentNode.removeChild(rows))
}

const UpdateTable = () => {
    const valores = Read()
    clearTable()
    valores.forEach((client, index) => {
        const newRow = document.createElement('tr')
        newRow.innerHTML = `
    
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}" > Edit </button>
            <button type="button" class="button red" id="delete-${index}" > Delete </button>
    
        `
    
        document.querySelector('#tableClient > tbody').appendChild(newRow)
    
    })

}



function editingFileds (clientes) {

    document.querySelector('#nome').value = clientes.nome
    document.querySelector('#email').value = clientes.email
    document.querySelector('#celular').value = clientes.celular
    document.querySelector('#cidade').value = clientes.cidade
    document.querySelector('#nome').dataset.dataindex = clientes.index

}



function EditClient (index) {
    const localStorage = Read()[index]
    localStorage.index = index
    editingFileds(localStorage)
    openModal()
}



const editDelete = (event) => {
    if(event.target.type === 'button'){
        const [action, index] = event.target.id.split('-')
        if(action == 'edit') {
            console.log('editando um post')
            EditClient(index)

        } else {
            console.log('Excluindo um post')
            addEventListener('click', (event) => {
              document.querySelector('.modalDelete').classList.add('activeDelete')

                const person = Read()[index]
                document.querySelector('#person').textContent = ` Você quer mesmo deletar o cliente ${person.nome} ?`

              document.querySelector('#apagar').addEventListener('click', () => {
                Delete(index)
                location.reload()
              })

              document.querySelector('#cancelar').addEventListener('click', () => {
                document.querySelector('.modalDelete').classList.remove('activeDelete')
                location.reload()

              })
                
              
            })
          

        }
        
    }else {
        console.log('não é um button')
    }

}

UpdateTable()


// Eventos de click

document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', SaveClient)
document.querySelector('#tableClient > tbody').addEventListener('click', editDelete)
document.querySelector('#cancelar-info').addEventListener('click', closeModal)
