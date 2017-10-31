function logout(){
    var dataString = "";
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "logout.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		//var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		var HTMLstring = '<input type="text" id="username" placeholder="Username" /><input type="password" id="password" placeholder="Password" /><br> <button id="login_btn">Log In</button>';
		document.getElementById("loginout").innerHTML= HTMLstring;
		document.getElementById("login_btn").addEventListener("click", login, false);
		}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}

function login(){
    var username = document.getElementById("username").value; // Get the username from the form
    var password = document.getElementById("password").value; // Get the password from the form
 
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "login.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
		    var HTMLstring = "";
		    HTMLstring += '<p id="1234">' + jsonData.user + "</p>\n";
		    HTMLstring += '<button id="logout"> Logout </button>' + "\n";
		    document.getElementById("loginout").innerHTML = HTMLstring;
		    document.getElementById("logout").addEventListener("click", logout, false);
		    getScoresUser(jsonData.user);
		}else{
			alert("Username and password pair not found");
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}



function register(){
    
    var username = prompt("what is your username?", "");
    var password = prompt("enter new password","");
    
    var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "createUser.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		//var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
	
}

function getScoresUser(username){

var dataString = "";
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "getScores.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		jsonData.sort(sortFunction);
		
		var scoresString = '<ol>';
		var count = 0;
		for(var i = 0; i<jsonData.length; i++){
		    if(count < 5){
		        if(jsonData[i][0] == username){
		            scoresString+='<li>' + jsonData[i][1] +"</li>\n";
		            count++;
		        }
		    }
		}
		
		document.getElementById("myScores").innerHTML = scoresString;
		
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}

function getScoresAll(){
    var dataString = "";
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "getScores.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		jsonData.sort(sortFunction);
		
		var scoresString = '<ol>';
		
		for(var i = 0; i<10; i++){
		    if(i < jsonData.length){
		        scoresString+='<li>' + jsonData[i][1] + ' by ' + jsonData[i][0] + "</li>\n";
		    }
		}
		
		document.getElementById("scorez").innerHTML = scoresString;
		
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}

function sortFunction(a,b){//function for sorting the scores
    if(Number(a[1])==Number(b[1])){
        return 0;
    }
    else{
        return (Number(a[1]) > Number(b[1])) ? -1 : 1;
    }
}

function submitScoreLogged(score){
    var username = document.getElementById("1234").innerHTML;
    
    var dataString = "score=" + encodeURIComponent(score)+"&username=" + encodeURIComponent(username);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "sendScore.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		getScoresAll();
		getScoresUser(username);
		//var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data

}

function submitScoreNot(username, score){
    alert("hi2");
    var dataString = "score=" + encodeURIComponent(score)+"&username=" + encodeURIComponent(username);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "sendScore.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
	    getScoresAll();
		//var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data

}

		