const addBtn = document.getElementById("add-btn");
var m=0;
const addTxt = document.getElementById("add-txt");
const searchBtn = document.getElementById("search-btn");
const searchTxt = document.getElementById("search-text");
const titles = document.getElementById("titles");
const titleMessage = document.getElementById("title-message");
addBtn.addEventListener('click', handleAdd);
searchBtn.addEventListener('click',handleSearch);
let i = localStorage.length;
updateList();

function handleAdd(e,m){

    e.preventDefault();
    
    for (var j in localStorage) {
        if (localStorage[j] === addTxt.value) {
            //alert('no');
            m=1;
        }
    }
    //  duplicate();
    
    // function duplicate(req, res){
        if(m==1){
            //alert('no');
           
            document.getElementById("dupli").innerHTML ="<div class='alert alert-danger'>Title already exists. </div>";
            document.getElementById("success").innerHTML ="";

        //   req.flash("error", "Title already exits.");
        }
        else{
            document.getElementById("success").innerHTML ="<div class='alert alert-success'> Title added successfully </div>";
            document.getElementById("dupli").innerHTML ="";
           //req.flash("success", "Title successfully added");
            localStorage.setItem(i, addTxt.value);
            insertCard(addTxt.value);
            i++;
        }
    // }
   // return m;
    
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
