const addBtn = document.getElementById("add-btn");
const addTxt = document.getElementById("add-txt");
const addAuthor = document.getElementById("add-txt-author");
const addPages = document.getElementById("add-txt-pages");
const addDetails = document.getElementById("add-txt-details");
const searchBtn = document.getElementById("search-btn");
const searchTxt = document.getElementById("search-text");
const titles = document.getElementById("titles");
const titleMessage = document.getElementById("title-message");
addBtn.addEventListener('click', handleAdd);
searchBtn.addEventListener('click',handleSearch);
let i = localStorage.length;
// localStorage.clear();


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
    if(addTxt.value!==''){
        for (var j=0;j<localStorage.length;j++) {
            key=localStorage.key(j);
            if ((JSON.parse(localStorage.getItem(key))).title === addTxt.value) {
               
                m=1;
                console.log('dsa');
                break;
            }
        }
            if(m==1){
               
                document.getElementById("dupli").innerHTML ="<div class='alert alert-danger'>Title already exists. </div>";
                document.getElementById("success").innerHTML ="";
            }
            else{
                
                document.getElementById("success").innerHTML ="<div class='alert alert-success'> Title added successfully </div>";
                document.getElementById("dupli").innerHTML ="";
                newTitle=new Details(addTxt.value,addDetails.value,addAuthor.value,addPages.value)
                localStorage.setItem(newTitle.title, JSON.stringify(newTitle));

                if(localStorage.length ==1) titles.removeChild(titleMessage);
                insertCard(newTitle.title);
                addTxt.value="";
                addAuthor.value="";
                addDetails.value="";
                addPages.value="";

            }
    }
    else
    {
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
   // localStorage.setItem(i, addTxt.value);
    //Removing 'Your title will appear here' message after first input
   // if(localStorage.length ==1) titles.removeChild(titleMessage);
   // insertCard(addTxt.value);
    //addTxt.value="";
    //i++;
    // console.log(localStorage);
}

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
    for(var j = localStorage.length-1; j >=0; j--){
        var key=localStorage.key(j);
        insertCard((JSON.parse(localStorage.getItem(key))).title);
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
