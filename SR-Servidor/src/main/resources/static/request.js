
window.addEventListener('beforeunload', function (e) {
    desconectarse();
});

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
  
  $("#addName").click(function(){
		if($("#input-username").val()==""){
			alert("El nombre debe contener algun caracter");
		}else{
		    var name = $("#input-username").val();
		    //console.log(name);
		    postName(name);
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
	      //console.log(objJson);
	      post(objJson);
	      //get();
	      document.getElementById("input-message").value="";
	      }  
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
    
   setInterval(function(){ get(); }, 3000);
    
  function get(){
	$.ajax({
		type: "GET",
     	url: window.location + "/users",
     	dataType : "html",
     	success: function (data){
		//console.log(data);
		if(data == "[]"){
       		//console.log("no server data");
        }else{
		  
			let count = 0;
			for (let k in (JSON.parse(data))) if ((JSON.parse(data)).hasOwnProperty(k)) count++;
			updateObj.currentAux = JSON.parse(data)[count-1].name + ": " + JSON.parse(data)[count-1].message + "<br>";
			if( updateObj.currentAux != updateObj.current)
			document.getElementById("users").innerHTML += JSON.parse(data)[count-1].name + ": " + JSON.parse(data)[count-1].message + "<br>";
			
			updateObj.current = updateObj.currentAux;
	     	}
     	},
     	error : function() {
         	alert("Error: sin conexion");
     	}
    });
   }
	
	
	function postName(name){
		return $.ajax({
	          type: "POST",
	          url: window.location + "/nameList",
	          data: name,
	          contentType: 'text/plain',//'String; charset=utf-8',
	          success: function (response) {checkName(response);}
	       }); 
    }
        
        function checkName(response){
			if(response==false){
	      		alert("that name alredy exist");
	    	}
	    	if(response==true){
				//alert("connected");   
		      	userObj.name = $("#input-username").val();
		      	var obj = {name: userObj.name, message: " is connected"};
	      		var objJson = JSON.stringify(obj);
		      	post(objJson);
		      	//document.getElementById("user-div").hidden=true;
		      	//document.getElementById("chat-div").hidden=false;
    		}
		}
		
		$("#disconnect").click(function(){
			desconectarse();
		});
		
		function desconectarse(){
			var obj = {name: userObj.name, message: " is disconnected"};
	      		var objJson = JSON.stringify(obj);
		      	post(objJson);
			
			//console.log(userObj.name);
			  return $.ajax({
		          type: "DELETE",
		          url: window.location + "/nameList/"+userObj.name,
		          //data: userObj.name,
		          contentType: 'text/plain',//'String; charset=utf-8',
		          //success: function (response) {alert(response);}
	        });
	        
		}
		
      
      
      
