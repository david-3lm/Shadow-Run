function user(){
  this.name = " ";
  this.message = " ";
  }
  
  function update(){
  this.current = " ";
  this.currentAux = " ";
  }
  
  var updateObj = new update();
  var required = "debe introducir usuario";
  var userObj = new user();
  //this.current = " ";
  //this.currentAux;
  
  $("#addName").click(function(){
	if($("#input-username").val()==""){
		alert("El nombre debe contener algun caracter");
	}else{
		userObj.name = $("#input-username").val();      
      //post(name);
      document.getElementById("user-div").hidden=true;
      document.getElementById("chat-div").hidden=false;
	}
    });
    
    
    
	$("#addMessage").click(function(){
	if(userObj.name == " "){
		alert(required);
	}else if(document.getElementById("input-message").value==""){
		
	}else{
	      userObj.message = $("#input-message").val();
	      var obj = {name: userObj.name, message: userObj.message};
	      var objJson = JSON.stringify(obj);
	      console.log(objJson);
	      post(objJson);
	      document.getElementById("input-message").value="";
	      }
      });
	
    
    
    
    $("#get").click(function(){
      get();
    });
  
    function post(objJson){
      $.ajax({
          type: "POST",
          url: window.location + "/users",
          data: objJson,
          contentType: 'application/json; charset=utf-8',
          //success: function (response) {alert(response);}
        });   
    }
    
    setInterval(function(){ get(); }, 1000);
    
    function get(){
	console.log("hola");
	$.ajax({
		type: "GET",
     	url: window.location + "/users",
     	dataType : "html",
     	success: function (data){
		//alert(data);
		  
		  //data.forEach(e=>document.getElementById("users").innerHTML = JSON.parse(e).name + ": " + JSON.parse(e).message);
		  
		  //for(var d=0; d<3;d++){document.getElementById("users").innerHTML += JSON.parse(data)[d].name + ": " + JSON.parse(data)[d].message + "<br>";}
		  
		let count = 0;
		for (let k in (JSON.parse(data))) if ((JSON.parse(data)).hasOwnProperty(k)) count++;
		updateObj.currentAux = JSON.parse(data)[count-1].name + ": " + JSON.parse(data)[count-1].message + "<br>";
		console.log(updateObj.currentAux);
		console.log(updateObj.current);
		if( updateObj.currentAux != updateObj.current)
		document.getElementById("users").innerHTML += JSON.parse(data)[count-1].name + ": " + JSON.parse(data)[count-1].message + "<br>";
		
		updateObj.current = updateObj.currentAux;
		//current = JSON.parse(data)[count-1].name + ": " + JSON.parse(data)[count-1].message + "<br>";
		//for(var d=0; d<count;d++){document.getElementById("users").innerHTML += JSON.parse(data)[d].name + ": " + JSON.parse(data)[d].message + "<br>";}
		  console.log(JSON.parse(data));
		  
		  
		  //document.getElementById("users").innerHTML = JSON.parse(data)[0].name + ": " + JSON.parse(data)[0].message;
		  //document.getElementById("users").innerHTML = JSON.parse(data)[1].name + ": " + JSON.parse(data)[1].message + "<br>";
		  //document.getElementById("users").innerHTML+=JSON.parse(data)[2].name + ": " + JSON.parse(data)[2].message;
		 //$('#users').html($('#users',JSON.parse(data)).html());
         //$('#showresults').html($('#showresults',data).html());
         // similar to $(data).find('#showresults')
     	}
    });
}