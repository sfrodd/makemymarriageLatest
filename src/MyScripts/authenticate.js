$(function(){
$("#user").text($.session.get('user'))
$.session.set('logged',false);




$("#log").on("click",function(event){
    event.preventDefault()
    var login=$("#login").val();
    var pwd=$("#password").val();
    $.session.set('user',login)
   
    var usrName;
    var passWord;
   // alert($.session.get('user'))
    $.ajax({
        url:"http://localhost:8000/api/getUser/"+$("#login").val().trim(),
        type:"GET",
        dataType:"json",
        success:function(result){
          console.log('I am in success '+result[0].password)
          usrName=result[0].userName;
          passWord=result[0].password;     
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
          window.location="../src/customerHome.html";
          $("#user").text(usrName)
          }
          else{
              $("#msg").attr({"style":"color:red"})
              $("#msg").text("Login Failed...").slideToggle(1000)
          }      
        }
    })


})

})