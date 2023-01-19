$(function(){
$("#user").text($.session.get('user'))
$.session.set('logged',false);

$("#log").on("click",function(event){
    event.preventDefault()
    var login=$("#login").val();
    var pwd=$("#password").val();
    
   
    var usrName;
    var passWord;
    var cidoradmin;
    alert($.session.get('user'))
    $.ajax({
        url:"http://localhost:8000/api/getUser/"+$("#login").val().trim(),
        type:"GET",
        dataType:"json",
        success:function(result){
          //console.log('I am in success '+result[0].password)
          usrName=result[0].userName;
          passWord=result[0].password;     
          cidoradmin=result[0].cid_or_admin_id;
          if(login=="")
          {
          $("#msg").slideDown(10000,function(){
            $("#msg").slideUp(10000);
          }).html("<span style='color:red;margin-left:10px'>Please type Username</span>");
          return false;
          }
          if(passWord=="")
          {
          $("#msg").slideDown().html("<span style='color:red;margin-left:10px'> Please type Password</span>");
          return false;
          }
          console.log(pwd+"  "+passWord)
          if(login=="Admin" && passWord==pwd){
              $("#msg").text("Login Succesful..")
              $.session.set('logged',true)
              window.location="../src/AdminHome.html";
          }
          else
          if(login==usrName && passWord==pwd){
          $("#msg").text("Login Succesful..")
          $.session.set('logged',true)
          $.session.set('user',cidoradmin)
          $("#user").text(result[0].cidoradmin)
          window.location="../src/customerHome.html";
          
          }
          else{
              $("#msg").attr({"style":"color:red"})
              $("#msg").text("Login Failed...").slideToggle(1000)
          }      
        }
    })


})

})