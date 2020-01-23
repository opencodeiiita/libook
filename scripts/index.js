const addBtn = document.getElementById("add-btn");
const addTxt = document.getElementById("add-txt");
const addAuthor = document.getElementById("add-txt-author");
const addDetails = document.getElementById("add-txt-details");
const searchBtn = document.getElementById("search-btn");
const searchTxt = document.getElementById("search-text");
const titles = document.getElementById("titles");
const titleMessage = document.getElementById("title-message");
addBtn.addEventListener('click', handleAdd);
searchBtn.addEventListener('click',handleSearch);
let i = localStorage.length;


updateList();

var Details=function(title,details,author,Pages,img,addTime,startTime,finishTime){
    this.title=title;
    this.details=details;
    this.img=img;
    this.addTime=addTime;
    this.startTime=startTime;
    this.finishTime=finishTime;
    this.author=author;
    this.Pages=Pages;
}
var Titles=[];

function handleAdd(e){
    var m,key,newTitle;
    e.preventDefault();
    if(addTxt.value!=='' && addAuthor.value!=='' && addDetails.value!==''){
        for (var j=0;j<localStorage.length;j++) {
            if(localStorage.length>0)
            {
                key=localStorage.key(j);
                if ((JSON.parse(localStorage.getItem(key))).title === addTxt.value) {
                    m=1;
                    console.log('dsa');
                    break;
                }
            }
        }
        if(m==1){
            document.getElementById("dupli").innerHTML ="<div class='alert alert-danger'>Title already exists. </div>";
            document.getElementById("success").innerHTML ="";
            setTimeout(function() {document.getElementById('dupli').innerHTML='';},3000);
        }
        else{      
            document.getElementById("success").innerHTML ="<div class='alert alert-success'> Title added successfully </div>";
            document.getElementById("dupli").innerHTML ="";
            setTimeout(function() {document.getElementById('success').innerHTML='';},3000);
            newTitle=new Details(addTxt.value,addDetails.value,addAuthor.value);
            localStorage.setItem(newTitle.title, JSON.stringify(newTitle));
            if(localStorage.length ==1) titles.removeChild(titleMessage);
            insertCard(newTitle.title);
            addTxt.value="";
            addAuthor.value="";
            addDetails.value="";
        }
    }
    else{
        if(addTxt.value==='') handleEmpty(addTxt);
        if(addAuthor.value==='') handleEmpty(addAuthor);
        if(addDetails.value==='') handleEmpty(addDetails);
    }
}

function handleEmpty(elem) {
    elem.blur();
    elem.classList.add('active');
    setTimeout(RemoveClass, 1000);
    elem.placeholder="Cannot Be Blank";
    function RemoveClass() {
        elem.focus();
        elem.classList.remove('active');
        if(elem===addTxt) elem.placeholder="Enter Title";
        if(elem===addAuthor) elem.placeholder="Enter Author";
        if(elem===addDetails) elem.placeholder="Enter Summary";
    }
}

function handleSearch(e){
    e.preventDefault();
    var str = searchTxt.value;
    var arr = new Array();
    for(let j = 0; j < localStorage.length; j++){
        var key=localStorage.key(j);
        var str2=(JSON.parse(localStorage.getItem(key))).title;
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
    if(arr.length == 0){
        document.getElementById("dupli").innerHTML ="<div class='alert alert-danger'>No Results Found</div>";
        document.getElementById("success").innerHTML ="";
        }
    else{
        document.getElementById("dupli").innerHTML ="";
        document.getElementById("success").innerHTML ="";
        for(let k = 0; k < arr.length; k++){
            insertCard(arr[k]);
        }
    }
}

function updateList(){
    if(localStorage.length > 0) 
    {
        titles.removeChild(titleMessage);
        for(var j = 0; j <localStorage.length; j++){
            var key=localStorage.key(j);
            insertCard((JSON.parse(localStorage.getItem(key))).title);
        }
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

