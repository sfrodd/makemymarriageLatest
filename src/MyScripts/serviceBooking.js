$(function(){
    //Display All Services
   $("#servList").empty();
   for(let i=0;i<servNames.length;i++)
   if(i==0)
     $("#serviceList").append("<option selected id='op"+i+"'>Services</option>")
     else
     $("#serviceList").append("<option id='op"+i+"'>"+servNames[i]+"</option>")
    
    
    $("#fetchservData").on("click",function(){
    
        var category=$("#serviceList :selected").val().trim()
        
        //Select Date from Data picker and format it
        var myBkgDate = new Date($('#servDate').val());
        var day =myBkgDate.getDate();
        if(parseInt(day)<10) day='0'+day
        var month = myBkgDate.getMonth() + 1;
        var year = myBkgDate.getFullYear();
        let myBkgDate1=[year, month, day].join('-');

    $("#myservList").on("click","button",function(){
        var myBkgDate = new Date($('#servDate').val());
        var day =myBkgDate.getDate();
        if(parseInt(day)<10) day='0'+day
        var month = myBkgDate.getMonth() + 1;
        var year = myBkgDate.getFullYear();
        let myBkgDate1=[year, month, day].join('-');
        alert($(this).attr("id")+myBkgDate1)

    })
    //  $("#myList").append("<li>Getting from MySQL</li>")
    
  // Implement GET method to fetch data which matches a selected date
    $.ajax({
     url:"http://localhost:8000/api/getServices",
     type:"POST",
     data:{'myBkgDate':myBkgDate1,'serveCat':category},
     dataType:"json",
     success: function(result){
      $("#myservList").empty();
      $("#myservList").append("<li style='color:red;width:1200px;' class='list-group-item d-flex w-auto"+
           "justify-content-between align-items-left' ><i style='margin-right:10px;padding-top:10px' class='bi bi-circle-square'></i>"+
            "MID<div style='margin-left:20px;width:300px';padding-top:10px>"+
           "Service Company</div><span style='width:130px' class='badge bg-warning rounded-pill mx-3 py-3'>"+
           "<i class='bi bi-currency-rupee mx-2'></i>"+
           "Rate</span> "+
           "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-4'>Cell-Number</span>"+
          "<span id='status' style='width:140px' class='badge text-bg-success rounded-pill py-3 mx-2 w-60'>Person</span>"+
          "<span id='action' style='width:120px' class='badge text-bg-dark rounded-pill py-3 mx-3 w-60'>Action</span>"+
          "<span id='action' style='width:120px' class='badge text-bg-secondary rounded-pill py-3 mx-6 w-60'>Rating</span>"+
           "</li><li> </li>") 
      for(let i=0;i<result.length;i++){
          let Starrating=result[i].rating;
        
          var starRat="";
          for(let j=0;j<5;j++)
          {
              if(j<Starrating)
              starRat+="<span id="+j+" style='margin-top:5px' class='fa fa-star checked'></span>"
              else
              starRat+="<span id="+j+" style='margin-top:5px;color:black' class='fa fa-star'></span>"

          }
          
          $("#myservList").append("<li style='color:red;width:1200px;' class='list-group-item d-flex w-auto"+
          "justify-content-between align-items-left' ><i style='margin-right:10px;font-size:20px' class='bi bi-circle-square'></i>"+
          "<div style='margin-top:5px'>"+result[i].sid+"</div><div style='margin-left:20px;width:300px;margin-top:5px'>"+
          result[i].companyName+"</div><span style='width:140px' class='badge bg-warning rounded-pill mx-3 py-3'><i class='bi bi-currency-rupee mx-2'></i>"+
          result[i].price+"</span> "+
          "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-3'>"+ result[i].cellNum+"</span>"+
          "<span id='status"+i+"' style='width:140px' class='badge text-bg-success rounded-pill py-3 mx-3 w-60'>"+ result[i].ownerName+"</span>"+
          "<button id=btn"+i+" class='btn btn-danger mx-3'>Book Now</button>"+
          "<i id='chk"+i+"' style='margin-right:5px' class='bi bi-check'></i>"+starRat+" "+
          "</li>")
          $("#chk"+i).css({"color":"green"});

      }

         /*If Block ends here..
     
     else
         {
          $("#myservList").append("<li style='color:red;width:1200px' class='list-group-item d-flex w-auto"+
          "justify-content-between align-items-left'><i style='margin-right:10px' class='bi bi-bank'></i>"+
          result[i].mhid+"<div style='margin-left:20px;width:300px'>"+result[i].mhName+"</div><span style='width:140px' class='badge bg-warning rounded-pill py-3 mx-3'><i class='bi bi-currency-rupee mx-2'></i>"+
          result[i].price+"</span>"+
          "<span style='width:120px' class='badge bg-primary rounded-pill py-3 mx-3'>"+ result[i].capacity+"</span>"+
          "<span id='tatus'"+i+"' style='width:140px' class='badge text-bg-danger rounded-pill py-3 mx-3 w-60'>"+ result[i].hstatus+"</span>"+
          "<button id="+i+" class='btn btn-danger mx-3 act' disabled>Book Now</button>"+
          "<i id='chk"+i+"' class='bi bi-check'></i></li>")
          $("#chk"+i).css({"color":"red"}); 
         }  */
     } // End of Success Function

    });  //Ajax End.... 
    }); //End of Fetch Service
})