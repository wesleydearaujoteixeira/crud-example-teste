'use strict';


// Função adicionar e remover novo usuário criando e removendo classe
const modal = () => document.getElementById('modal').classList.add('active');
const CloseModal = () => {
    document.getElementById('modal').classList.remove('active')
    ClearFields();
    
};




const client = {
    nome: " Emanuel ",
    email: " falconmercurio287@gmail.com",
    celular: "4754854858",
    cidade: ' Sáo Paulo - SP'
}


const Delete = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)

}




const upddateClient = (index, client) => {
    const tempClient = readClient();
    tempClient[index] = client;
    setLocalStorage(tempClient)
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) =>  localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD Create read update delete


const readClient = () => getLocalStorage()


// CRUD - CREATE

const CreateClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
   
} 

// interação com o Layout do usuário com DOM 


const isValidFileds = () => {
   return  document.querySelector('.modal-form').reportValidity()
}

const ClearFields = () => {
    const campos = document.querySelectorAll('.modal-field');
    campos.forEach((item) => {
        item.value = ''
    })
}


const SaveClient = () => {
    if (isValidFileds()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }

        const index = document.getElementById('nome').dataset.index;

        if (index == 'new'){
             CreateClient(client);
             updateTable();
             ClearFields();

        }else{
            upddateClient(index, client);
            updateTable();
            CloseModal();

        }
        
    }

}

const Cleartable = () => {
    const rows = document.querySelectorAll('.records>tbody tr') 
    rows.forEach( row => row.parentNode.removeChild(row))
}



const updateTable = () => {
    const Client = readClient();
    Cleartable()
    Client.forEach((client, index) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        
        <td> ${client.nome} </td>
        <td> ${client.email}</td>
        <td> ${client.celular} </td>
        <td> ${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}"> Editar</button>
            <button type="button" class="button red"  id="excluir-${index}"> Excluir</button>
        </td>
        
        
        `

        document.querySelector('.records>tbody').appendChild(tr)
    })
}




updateTable()



const filField = (client) => {

    document.getElementById('nome').value,
    document.getElementById('email').value,
    document.getElementById('celular').value,
    document.getElementById('cidade').value,
    document.getElementById('nome').dataset.index = client.index
  

}

const editarClient = (index) => {
    const client = readClient()[index]
    client.index = index;
    filField(client)
    modal()

}




const EditDelet = (event) => {
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')

        if( action == 'edit'){
            editarClient(index)
        }else {
           
            const client = readClient()[index];
            const response = confirm (` Você quer mesmo excluir ${client.nome} da lista?`)
            if (response){
                Delete(index);
                updateTable();
            }
        }
}

}


// Eventos 

document.getElementById('cadastrarCliente').addEventListener('click', modal);
document.getElementById('modalClose').addEventListener('click', CloseModal);
document.getElementById('salvar').addEventListener('click', SaveClient)
document.querySelector('.records>tbody')
    .addEventListener('click', EditDelet)

