const addBtn = document.getElementById("add-btn");
const addTxt = document.getElementById("add-txt");
const addAuthor = document.getElementById("add-txt-author");
const addDetails = document.getElementById("add-txt-details");
const searchBtn = document.getElementById("search-btn");
const searchTxt = document.getElementById("search-text");
const titles = document.getElementById("titles");
const titleMessage = document.getElementById("title-message");
const filter=document.getElementById("filter");
addBtn.addEventListener('click', handleAdd);
searchBtn.addEventListener('click',handleSearch);
filter.addEventListener('click',handleFilter);
let i = localStorage.length;
var type,book;
// localStorage.clear();



(function(){
var fileUploader =  document.getElementById("fileUploader");
var drag=document.querySelector('.drag');
fileUploader.addEventListener('change', handleFileUpload, false);
fileUploader.addEventListener('dragover',highlight);
fileUploader.addEventListener('dragleave',unhighlight);

function highlight(){
    drag.style.background='#eee';
    
}

function unhighlight(){
    drag.style.background='#fff';
}



function handleFileUpload(event){
    var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
  
    book=e.target.result;
  };

  reader.readAsText(file,'base64');
}
    

})()




updateList();

var Details=function(title,details,author,book,Pages,img,addTime,startTime,finishTime){
    this.title=title;
    this.details=details;
    this.img=img;
    this.addTime=addTime;
    this.startTime=startTime;
    this.finishTime=finishTime;
    this.author=author;
    this.Pages=Pages;
    this.book=book;
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
                try{
                    if ((JSON.parse(localStorage.getItem(key))).title === addTxt.value) {
                        m=1;
                        break;
                    }
                } catch (error){
                    console.log(error);
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
            newTitle=new Details(addTxt.value,addDetails.value,addAuthor.value,book);
            console.log(newTitle);
            localStorage.setItem(newTitle.title, JSON.stringify(newTitle));
            if(localStorage.length ==1) 
                titles.removeChild(titleMessage);
            insertCard(newTitle.title, newTitle.details,newTitle.author);
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
function handleFilter(e){
    e.preventDefault();
    var by,splitby;
    by=e.target.id;
    splitby=by.split('-');
    type=(splitby[1]);
    if(type==='title')
    {
        searchTxt.placeholder='Search Title';
        document.getElementById('drop-title').classList.remove('selected');
        document.getElementById('drop-title').classList.add('selected');
        document.getElementById('drop-author').classList.remove('selected');
    }
    else if(type==='author')
    {
        searchTxt.placeholder='Search Author';
        document.getElementById('drop-title').classList.remove('selected');
        document.getElementById('drop-author').classList.remove('selected');
        document.getElementById('drop-author').classList.add('selected');
    }

}

function handleSearch(e){
    e.preventDefault();
    if(!type)
        type='title';
    var str = searchTxt.value;
    var arr = new Array();
    for(let j = 0; j < localStorage.length; j++){
        var key=localStorage.key(j);
        try {
            console.log(type);
            var str1=(JSON.parse(localStorage.getItem(key))).title;
            var str2=(JSON.parse(localStorage.getItem(key))).author; 
            var str3=(JSON.parse(localStorage.getItem(key))).details;
            // var str4= (JSON.parse(localStorage.getItem(key))).book;
            var re = new RegExp(str,"gi");
            if(type==='title')
            {
                if(re.test(str1)){
                    arr.push({title: str1, author: str2, details: str3});
                }
            }
            else
            {
                if (re.test(str2)){
                    arr.push({title: str1, author: str2, details: str3});
                }
            }

        } catch (error){
            console.log(error);
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

            insertCard(arr[k].title, arr[k].author, arr[k].details);
        }
    }
}

function updateList(){
    if(localStorage.length > 0) 
    {
        titles.removeChild(titleMessage);
        for(var j = 0; j <localStorage.length; j++){
            var key=localStorage.key(j);
            try {

                insertCard((JSON.parse(localStorage.getItem(key))).title,(JSON.parse(localStorage.getItem(key))).author,(JSON.parse(localStorage.getItem(key))).details);
            } catch (error){
                console.log(error);
            }
        }
    }
}

function insertCard(title,author,text){
    let myCard = document.createElement('div');
        myCard.className = "row";

        let myCardHeader = document.createElement('div');
        myCardHeader.className = "card-header text-center";
        let myCardHeaderImg=document.createElement('img');
        myCardHeaderImg.className="Imgg";
        myCardHeaderImg.src="../resources/img/dummy.jpg ";
        myCardHeader.appendChild(myCardHeaderImg);
        // var html="<img  src=\"../resources/img/dummy.jpg\" height=\"100px\" width=\"100%\"></img>";
        myCardHeaderspa=document.createElement('br');
        myCardHeaderspa1=document.createElement('br');
        myCardHeaderspa2=document.createElement('br');
        myCardHeaderspa3=document.createElement('br');
        myCardHeaderspa4=document.createElement('br');

        myCardHeader.appendChild(myCardHeaderspa1);
        myCardHeader.appendChild(myCardHeaderspa2);
        myCardHeader.appendChild(myCardHeaderspa);
        myCardHeader.appendChild(myCardHeaderspa3);
        myCardHeader.appendChild(myCardHeaderspa4);

        myCardHeader.appendChild(document.createTextNode(title));



        let myCardFooter = document.createElement('div');
        let myCardfooterImg=document.createElement('img');
        myCardfooterImg.className="Imgg";
        myCardfooterImg.src="../resources/img/dummy.jpg ";
        myCardFooter.className = "card-footer text-center ";
        myCardFooter.appendChild(myCardfooterImg);
        myCardFooterspa=document.createElement('br');
        myCardFooterspa1=document.createElement('br');
        myCardFooterspa2=document.createElement('br');
        myCardFooterspa3=document.createElement('br');
        myCardFooterspa4=document.createElement('br');

        myCardFooter.appendChild(myCardFooterspa1);
        myCardFooter.appendChild(myCardFooterspa2);
        myCardFooter.appendChild(myCardFooterspa);
        myCardFooter.appendChild(myCardFooterspa3);
        myCardFooter.appendChild(myCardFooterspa4);

        myCardFooter.appendChild(document.createTextNode(author));

        let myCardBody = document.createElement('div');
        let myCardBodyImg=document.createElement('img');
        myCardBodyImg.className="Imgg";
        myCardBodyImg.src="../resources/img/dummy.jpg ";
        myCardBody.className = "card-body text-center ";
        myCardBody.appendChild(myCardBodyImg);
        myCardBodyspa=document.createElement('br');
        myCardBodyspa1=document.createElement('br');
        myCardBodyspa2=document.createElement('br');
        myCardBodyspa3=document.createElement('br');
        myCardBodyspa4=document.createElement('br');

        myCardBody.appendChild(myCardBodyspa1);
        myCardBody.appendChild(myCardBodyspa2);
        myCardBody.appendChild(myCardBodyspa);
        myCardBody.appendChild(myCardBodyspa3);
        myCardBody.appendChild(myCardBodyspa4);

        myCardBody.appendChild(document.createTextNode(text));

        
        let titleLink = document.createElement('a');
        titleLink.href = "book.html?title="+title;
        
        myCard.appendChild(myCardHeader);
        
        myCard.appendChild(myCardBody);
        myCard.appendChild(myCardFooter);
        titles.appendChild(myCard);
        titleLink.appendChild(myCard);
        titles.appendChild(titleLink);
        // document.querySelector('.card-header text-center').insertAdjacentHTML('beforeend',html);
}

