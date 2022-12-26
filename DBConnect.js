const mySQL=require('mysql')


const myCon=mySQL.createConnection({
   host:"localhost",
   port:3306,
   user:"root",
   password:"",
   database :"makemymarriage"

})


myCon.connect(function(err){
  if(err) console.log(err);
  else 
  console.log("Connected to MySQL succesful...")

})

module.exports=myCon