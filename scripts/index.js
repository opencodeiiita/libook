const addBtn = document.getElementById("add-btn");
const addTxt = document.getElementById("add-txt");
const searchBtn = document.getElementById("search-btn");
const searchTxt = document.getElementById("search-text");
const titles = document.getElementById("titles");
const titleMessage = document.getElementById("title-message");
addBtn.addEventListener('click', handleAdd);
searchBtn.addEventListener('click',handleSearch);
let i = localStorage.length;

updateList();

function handleAdd(e){
    var m;
    e.preventDefault();
    if(addTxt.value!==''){
        for (var j in localStorage) {
            if (localStorage[j] === addTxt.value) {
               
                m=1;
                break;
            }
        }
            
    
        if(m==1){
           
            document.getElementById("dupli").innerHTML ="<div class='alert alert-danger'>Title already exists. </div>";
            document.getElementById("success").innerHTML ="";
            setTimeout(function() {document.getElementById('dupli').innerHTML='';},3000);
        }
        else {
            document.getElementById("success").innerHTML ="<div class='alert alert-success'> Title added successfully </div>";
            document.getElementById("dupli").innerHTML ="";
            setTimeout(function() {document.getElementById('success').innerHTML='';},3000);
            localStorage.setItem(i, addTxt.value);
            if(localStorage.length ==1) titles.removeChild(titleMessage);
            insertCard(addTxt.value);
            addTxt.value="";
            i++;
        }
    }
    else
    {
        console.log()
        document.getElementById("add-txt").blur();
        addTxt.classList.add('active');
        setTimeout(RemoveClass, 1000);
        addTxt.placeholder="Cannot Be Blank!!!!";
        function RemoveClass() {
        document.getElementById("add-txt").focus();
        addTxt.classList.remove('active');
        addTxt.placeholder="Enter title";

        }
        }
}
   // localStorage.setItem(i, addTxt.value);
    //Removing 'Your title will appear here' message after first input
   // if(localStorage.length ==1) titles.removeChild(titleMessage);
   // insertCard(addTxt.value);
    //addTxt.value="";
    //i++;
    // console.log(localStorage);


function handleSearch(e){
    e.preventDefault();
    var str = searchTxt.value;
    var arr = new Array();
    for(let j = 0; j < localStorage.length; j++){
      var str2=localStorage.getItem(j);
      var re = new RegExp(str,"gi");
      if(re.test(str2)){
        arr.push(str2);
      }
    }
    var child = titles.lastElementChild;
        while (child) {
            titles.removeChild(child);
            child = titles.lastElementChild;
        }
    for(let k = 0; k < arr.length; k++){
        insertCard(arr[k]);
    }
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
