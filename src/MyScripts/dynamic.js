$(function(){
  //Initialize Area List
  $("#area").empty();
  for(let i=0;i<allAreas.length;i++)
     $("#area").append("<option id='op"+i+"'>"+allAreas[i]+"</option>")
     // On Click of Booking... Show Booking status
    $("#myList").on("click","button",function(){
      let id=$(this).attr("id")
      $("#chk"+id).css({"color":"red"});
      $("#"+id).attr("disabled",true)
      $("#status"+id).text("Booked")
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
    
    console.log(myBkgDate1,mHarea) 

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

    // Implement POST method to fetch data which matches a selected date
    $.ajax({
      url:"http://localhost:8000/getData",
      type:"POST",
      data:{'bkgDate':myBkgDate1 ,'area':mHarea},
      dataType:"json",
      success: function(result){
       //Clear the list
       console.log(result)
       $("#myList").empty();
       for(let i=0;i<result.length;i++)
       
       if(result[i].hstatus=='Available')
       {   //Fill the list with Available MHs
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
 
     });  //Ajax POST End....
 
  }) //On Click Button

})  // Document Ready End