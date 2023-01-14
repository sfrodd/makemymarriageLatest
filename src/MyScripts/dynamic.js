$(function(){
  //Initialize Area List
   var tempResult=[]; 
   $("#area").empty();
   for(let i=0;i<allAreas.length;i++)
     $("#area").append("<option id='op"+i+"'>"+allAreas[i]+"</option>")
 
     // On Click of Booking... Show Facility Details
    $("#myList").on("click","i",function(){
      let id=$(this).attr("id");
      let idx=id.substring(id.length-1)
      idx="mhx"+idx;
      var mhid=$("#myList li").find("span#"+idx).text()
      $.ajax({
      url:"http://localhost:8000/getService",
      type:"POST",
      data:{'mhId':mhid},
      dataType:"json",
      success: function(result){
       //Clear the Facilities list
       //console.log(result)
       //Add Heading..
       $("#myDetails").empty();      
       $("#myDetails").append("<li style='margin-left:20px;margin-bottom:10px;color:yellow;font-style:bold'>"+
       "<div style='display:flex;margin-left:15px'>"+
       "<i style='color:yellow;margin-right:15px' class='bi bi-plus-circle'>"+
       "</i>Additional Facilities @MHID - "+result[0].mhId+"</li>")
       //Display Additional Facilities at Marriage Hall
       for(let i=0;i<result.length;i++){
        $("#myDetails").append("<li  style='margin-left:40px' id=item'"+i+"'><div  style='display:flex;width:350px;left-margin:60px'>"+
        "<div style='width:200px;color:red'>"+(i+1) +"<span style='margin-left:20px'>"+result[i].servName+"</span><i class='bi bi-currency-rupee mx-2'></i>"+result[i].charges+"</div><div style='margin-left:20px'><input style='left-margin:40px;'"+
         "class='form-check-input mt-2' type='checkbox'></div>"+ "</div></li>")
       }
      }
      })
    })
    //Update MhBooking Table..  
    $("#myList").on("click","button",function(){
      let id=$(this).attr("id")
      $("#chk"+id).css({"color":"red"});
      $("#"+id).attr("disabled",true)
      $("#status"+id).text("Booked")
      var myBkgDate = new Date($('#bDate').val());
      var day =myBkgDate.getDate();
      if(parseInt(day)<10) day='0'+day
      var month = myBkgDate.getMonth() + 1;
      var year = myBkgDate.getFullYear();
      let myBkgDate1=[year, month, day].join('-');
      let idx=id.substring(id.length-1)
      idx="mhx"+idx;
      var mhid=$("#myList li").find("span#"+idx).text()

      // Update booking table.. and change booking status to 'Booked'
      $.ajax({
       url:"http://localhost:8000/setData",
       type:"POST",
       dataType:"json",
       data :{'mhid':mhid,'bkgDate':myBkgDate1},
       success:function(result){
       console.log("Reserved.."+result)
       }
      })
      //Toggle Button Status..  
      $("#status"+id).fadeOut(1000,function(){
          $("#status"+id).fadeIn(1000)
      });      
    }) //End of Button Click Event

    //On Click of GetData button fetch Data from MySQL and Display
  $("#fetchData").on("click",function(){
    var mHarea=$("#area").val().trim()
    
    //Select Date from Data picker and format it
    var myBkgDate = new Date($('#bDate').val());
    var day =myBkgDate.getDate();
    if(parseInt(day)<10) day='0'+day
    var month = myBkgDate.getMonth() + 1;
    var year = myBkgDate.getFullYear();
    let myBkgDate1=[year, month, day].join('-');
    
    //console.log(myBkgDate1,mHarea) 

  //  $("#myList").append("<li>Getting from MySQL</li>")
    
  // Implement GET method to fetch data which matches a selected date
  /*  $.ajax({
     url:"http://localhost:8000/"+myBkgDate1,
     type:"GET",
     dataType:"json",
     success: function(result){
      $("#myList").empty();
      for(let i=0;i<result.length;i++)

      if(result[i].hstatus=='Available')
      {
          $("#myList").append("<li style='color:red;width:1200px;' class='list-group-item d-flex w-auto"+
          "justify-content-between align-items-left' ><i style='margin-right:10px' class='bi bi-bank'></i>"+
          result[i].mhid+"<div style='margin-left:20px;width:300px'>"+
          result[i].mhName+"</div><span style='width:140px' class='badge bg-warning rounded-pill mx-3 py-3'><i class='bi bi-currency-rupee mx-2'></i>"+
          result[i].price+"</span> "+
          "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-3'>"+ result[i].capacity+"</span>"+
          "<span id='status"+i+"' style='width:140px' class='badge text-bg-success rounded-pill py-3 mx-3 w-60'>"+ result[i].hstatus+"</span>"+
          "<button id="+i+" class='btn btn-danger mx-3'>Book Now</button>"+
          "<i id='chk"+i+"' class='bi bi-check'></i></li>")
          $("#chk"+i).css({"color":"green"});
        } //If Block ends here..

     else
         {
          $("#myList").append("<li style='color:red;width:1200px' class='list-group-item d-flex w-auto"+
          "justify-content-between align-items-left'><i style='margin-right:10px' class='bi bi-bank'></i>"+
          result[i].mhid+"<div style='margin-left:20px;width:300px'>"+result[i].mhName+"</div><span style='width:140px' class='badge bg-warning rounded-pill py-3 mx-3'><i class='bi bi-currency-rupee mx-2'></i>"+
          result[i].price+"</span>"+
          "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-3'>"+ result[i].capacity+"</span>"+
          "<span id='tatus'"+i+"' style='width:140px' class='badge text-bg-danger rounded-pill py-3 mx-3 w-60'>"+ result[i].hstatus+"</span>"+
          "<button id="+i+" class='btn btn-danger mx-3 act' disabled>Book Now</button>"+
          "<i id='chk"+i+"' class='bi bi-check'></i></li>")
          $("#chk"+i).css({"color":"red"}); 
         }  //End of Else Block
     } // End of Success Function

    });  //Ajax End.... */

    // Implement POST method to fetch data which matches 
    //a selected date and Area..
    $.ajax({
      url:"http://localhost:8000/getData",
      type:"POST",
      data:{'bkgDate':myBkgDate1 ,'area':mHarea},
      dataType:"json",
      success: function(result){
       //Clear the list
       console.log(result)
      tempResult=result;
      //Clear Display List and Add Table Heading
       $("#myList").empty();
       $("#myList").append("<li style='color:red;width:1200px;' class='list-group-item d-flex w-auto"+
           "justify-content-between align-items-left' ><i style='margin-right:10px' class='bi bi-bank'></i>"+
            "MID<div style='margin-left:20px;width:300px'>"+
           "MH-Name</div><span style='width:130px' class='badge bg-warning rounded-pill mx-3 py-3'><i class='bi bi-currency-rupee mx-2'></i>"+
           "Price</span> "+
           "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-4'>Capacity</span>"+
          "<span id='status' style='width:140px' class='badge text-bg-success rounded-pill py-3 mx-2 w-60'>Status</span>"+
          "<span id='action' style='width:120px' class='badge text-bg-dark rounded-pill py-3 mx-3 w-60'>Action</span>"+
          "<span id='action' style='width:120px' class='badge text-bg-secondary rounded-pill py-3 mx-3 w-60'>Facilities</span>"+
           "</li>") 

       for(let i=0;i<result.length;i++)
       
       if(result[i].hstatus=='Available')
       {   //Fill the list with Available MHs
           $("#myList").append("<li style='color:red;width:1200px;' class='list-group-item d-flex w-auto"+
           "justify-content-between align-items-left' ><i style='margin-right:10px' class='bi bi-bank'></i>"+
           "<span id='mhx"+i+"'>"+result[i].mhid+"</span><div style='margin-left:20px;width:300px'>"+
           result[i].mhName+"</div><span style='width:140px' class='badge bg-warning rounded-pill mx-3 py-3'><i class='bi bi-currency-rupee mx-2'></i>"+
           result[i].price+"</span> "+
           "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-3'>"+ result[i].capacity+"</span>"+
           "<span id='status"+i+"' style='width:140px' class='badge text-bg-success rounded-pill py-3 mx-3 w-60'>"+ result[i].hstatus+"</span>"+
           "<button id="+i+" class='btn btn-danger mx-3'>Book Now</button>"+
           "<i id='chk"+i+"' class='bi bi-check'></i>"+
           "<i id='dwn"+i+"' style='color:red;' class='bi bi-box-arrow-in-down mx-5'></i>"+
           "</li>")
           $("#chk"+i).css({"color":"green"});
         } //If Block ends here..
 
      else
          {
           $("#myList").append("<li style='color:red;width:1200px' class='list-group-item d-flex w-auto"+
           "justify-content-between align-items-left'><i style='margin-right:10px' class='bi bi-bank'></i>"+
           "<span id='mhx"+i+"'>"+result[i].mhid+"</span><div style='margin-left:20px;width:300px'>"+result[i].mhName+"</div><span style='width:140px' class='badge bg-warning rounded-pill py-3 mx-3'><i class='bi bi-currency-rupee mx-2'></i>"+
           result[i].price+"</span>"+
           "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-3'>"+ result[i].capacity+"</span>"+
           "<span id='tatus'"+i+"' style='width:140px' class='badge text-bg-danger rounded-pill py-3 mx-3 w-60'>"+ result[i].hstatus+"</span>"+
           "<button id="+i+" class='btn btn-danger mx-3 act' disabled>Book Now</button>"+
           "<i id='chk"+i+"' class='bi bi-check'></i>"+
           "<i id='dwn"+i+"' style='color:red;' class='bi bi-box-arrow-in-down mx-5'></i>"+
           "</li>")
           $("#chk"+i).css({"color":"red"}); 
          }  //End of Else Block
      } // End of Success Function
 
     });  //Ajax POST End....

    /* $.ajax({
      url:"http://localhost:8000/setData",
      type:"POST",
      data:{'bkgDate':myBkgDate1 ,'mhId':mHId},
      dataType:"json",
      success: function(result){
       //Clear the list
       console.log(result)
      }
    });*/ //End of Update POST
  }) //On Click Button

})  // Document Ready End