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
    let bdate=req.params.bkgDate;
myCon.query("select mh.mhid,mhName,area,price,bkgdate,hstatus,capacity from marriagehall mh, mhallbooking mb where mh.mhid=mb.mhid and date(bkgdate)=?",[bdate],function(err,result){
    if(err) console.log(err);
    else
  res.send(result)
})
})

App.post("/setData",(req,res)=>{
    var mhId = (req.body.mhId).trim();
    var bkgDate =("'"+ req.body.bkgDate+"'").trim();
    let mquery="update mhallbooking set hstatus='Booked' where mhid="+mhId+" and bkgDate='"+bkgDate+"'"
    //myCon.query("select mh.mhid,mhName,area,price,bkgdate,hstatus,capacity from marriagehall mh, mhallbooking mb where mh.mhid=mb.mhid and Area=? and bkgdate=?",[area,bkgDate],function(err,result){
    myCon.query(query,function(err,result){ 
     if(err) console.log(err);
        else{
            console.log(result)
     // res.send(result) 
        }
    })   
})


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

App.listen(PORT,function(err){
    if(err) throw err;
    else
    console.log("Server Running at.."+PORT)
})


