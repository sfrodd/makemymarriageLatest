$(function(){
let custId=$("#user").text();
$.Session.set('cid',custId);

$.ajax({
   url:"http://localhost:8000/api/getCart/"+custId,
   type:"GET",
   dataType:"json",
   success:function(result){
    for(let i=0;i<result.length;i++)
    $("#myCart").append("<li class='list-group-item d-flex w-auto"+
    "justify-content-between align-items-left mt-2'>"+result[i].service+" "+result[i].price+"  "+result[i].serv_date+"</li>"); 
   }
})    

})