const addBtn = document.getElementById("add-btn");
const addTxt = document.getElementById("add-txt");
const titles = document.getElementById("titles");
const titleMessage = document.getElementById("title-message");
addBtn.addEventListener('click', handleAdd);
let i = localStorage.length;
updateList();

function handleAdd(e){
    e.preventDefault();
    localStorage.setItem(i, addTxt.value);
    //Removing 'Your title will appear here' message after first input  
    if(localStorage.length ==1) titles.removeChild(titleMessage);
    insertCard(addTxt.value);
    addTxt.value="";
    i++;
    console.log(localStorage);
}

function updateList(){

    if(localStorage.length > 0) titles.removeChild(titleMessage);
    for(let j = 0; j < localStorage.length; j++){
        insertCard(localStorage.getItem(j));
    }
}

function insertCard(text){
    
    let myCard = document.createElement('div');
        myCard.className = "card";
        let myCardBody = document.createElement('div');
        myCardBody.className = "card-body text-center";
        myCardBody.appendChild(document.createTextNode(text));
        myCard.appendChild(myCardBody);
        titles.appendChild(myCard);
}