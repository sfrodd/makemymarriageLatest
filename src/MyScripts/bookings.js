$(function(){
    
if($.session.get('logged')) 
{
$("#myCart").append("<li style='color:red;width:900px;' class='list-group-item d-flex w-auto"+
"justify-content-between align-items-left'>Marriage Hall - Ashirwad Mangal Karyala 12/9/2023 - Pending Confirmation</li>");
$("#myCart").append("<li style='color:red;width:900px;' class='list-group-item d-flex w-auto"+
"justify-content-between align-items-left'>Photographer - Ajay Kamkar - 12/09/2023 - Confirmed ");
}
else {
    window.location="./Login.html";  
}
});