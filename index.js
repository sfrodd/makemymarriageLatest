const express=require('express')
const cors=require('cors')
const bp=require('body-parser')
const myCon=require('./DBConnect')
const App=new express();
const PORT=8000

App.use(cors({
    origin:"*"
}))
App.use(express.urlencoded({
    extended: false,
  }));
App.use(express.json())

App.get("/:bkgDate",(req,res)=>{
    let uname=req.params.usrName;
myCon.query("select mh.mhid,mhName,area,price,bkgdate,hstatus,capacity from marriagehall mh, mhallbooking mb where mh.mhid=mb.mhid and date(bkgdate)=?",[uname],function(err,result){
    if(err) console.log(err);
    else
  res.send(result)
})
})

App.get("/api/getUser/:usrName",(req,res)=>{
    let uname=req.params.usrName;
    console.log("I am here "+uname)
myCon.query("select * from allUsers where userName=?",[uname] ,function(err,result){
    if(err) console.log(err);
    else{
  res.send(result);
  console.log(result);
    }
})
})
//Reserve MHall
App.post("/setData",(req,res)=>{
    console.log("I am in SetDATA..")
    var mhId = (req.body.mhid).trim();
    var bkgDate =(req.body.bkgDate).trim();
    console.log(mhId,bkgDate)
    let mquery="update mhallbooking set hstatus='Booked' where mhid="+mhId+" and bkgDate='"+bkgDate+"'"
    //myCon.query("select mh.mhid,mhName,area,price,bkgdate,hstatus,capacity from marriagehall mh, mhallbooking mb where mh.mhid=mb.mhid and Area=? and bkgdate=?",[area,bkgDate],function(err,result){
    myCon.query(mquery,function(err,result){ 
     if(err) console.log(err);
        else{
            console.log(result+"1 row updated...")
     res.send("<h1>1 Row updated..</h1>") 
        }
    })   
})

//Get all MH in a given area and on a given date
App.post("/getData",(req,res)=>{
        var area = ("'"+req.body.area+"'").trim();
        var bkgDate =("'"+ req.body.bkgDate+"'").trim();
        console.log("I am here...)",area,bkgDate)
        let query="select mh.mhid,mhName,area,price,bkgdate,hstatus,capacity from marriagehall mh, mhallbooking mb where mh.mhid=mb.mhid and Area="+area+" and bkgdate="+bkgDate
        //myCon.query("select mh.mhid,mhName,area,price,bkgdate,hstatus,capacity from marriagehall mh, mhallbooking mb where mh.mhid=mb.mhid and Area=? and bkgdate=?",[area,bkgDate],function(err,result){
        myCon.query(query,function(err,result){ 
         if(err) console.log(err);
            else{
                console.log(result)
          res.send(result) 
            }
        })   
    })
         // Additional Services of Marriage Hall
    App.post("/getService",(req,res)=>{
        var mhSid =("'"+ req.body.mhId+"'").trim();
        console.log(mhSid)
        let query="select mhId,servName, charges from mhservice where mhid="+mhSid ;
        //myCon.query("select mh.mhid,mhName,area,price,bkgdate,hstatus,capacity from marriagehall mh, mhallbooking mb where mh.mhid=mb.mhid and Area=? and bkgdate=?",[area,bkgDate],function(err,result){
        myCon.query(query,function(err,result){ 
         if(err) console.log(err);
            else{
                console.log(result)
          res.send(result) 
            }
        })   

            })        // Other Services like Photographer, Beautician etc..
        App.post("/api/getServices",(req,res)=>{
            var cat =("'"+ req.body.serveCat+"'").trim();
            var bkgDate =("'"+ req.body.bkgDate1+"'").trim();
            console.log(cat+ "   "+bkgDate)
            let query="select sid, servCategory, ownerName, price,cellNum, companyName,rating from services where servCategory="+cat ;
           
            myCon.query(query,function(err,result){ 
             if(err) console.log(err);
                else{
                    console.log(result)
              res.send(result) 
                }
            })   
    })
    
App.listen(PORT,function(err){
    if(err) throw err;
    else
    console.log("Server Running at.."+PORT)
})


