var display;
var urlCurrent = window.location.href;
var urlSplitted = urlCurrent.split('?title=');
if (urlSplitted.length>1){
    var brokenTitle = urlSplitted[1];
    var fixedSplitted = brokenTitle.split("%20");
    var display = "Title : ";
    for (var i=0; i<fixedSplitted.length; i++){
        display += (fixedSplitted[i] + " ");
    }
}
else{
    display = "No query provided";
}
document.querySelector(".title").textContent = display;