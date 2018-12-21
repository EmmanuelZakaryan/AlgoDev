var currentPlayer=null;
var players = new Array();
var canvas=null;
var game=false;
var motmotus="emmanuel";
var motarray=motmotus.split('');

var motmotuslu="";
var mot="Emmanuel";
var nbcoupMotus=0;
var ltrouve=new Array();

var motmeles1 = "informa"
var motmeles2 = "maxime"


var lettres = new Array("A","B","C","D","E","F","G","H",
"J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

function clickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
		
		var name = prompt("Please enter your name:", "Harry Potter");
		
		var player = new Player(name);
		
		console.log(player);
		
		alert();
		
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}

function chargeArray(){
	for ( var i = 0, len = localStorage.length; i < len; ++i ) {
		players.push(JSON.parse(localStorage.getItem( localStorage.key( i ) ) ));
	}
}



function login(){

	currentPlayer = JSON.parse(localStorage.getItem('currentPlayer'));
	

	if(currentPlayer == null){
	
		var name = prompt("Please enter your name:", "Harry Potter");
		if(name ==null || name == ""){
			login();
		}else{
			var nplayer = new Player(name);
			currentPlayer = nplayer;
			players.push(nplayer);
			console.log(nplayer);
			localStorage.setItem(nplayer.name, JSON.stringify(nplayer));
		}
		
		for(var i=0;i<players.length;i++){
			console.log("All players " + players[i].name);
		}
		
        localStorage.setItem('currentPlayer', JSON.stringify(nplayer));

        
        
		
	}else{
		alert(currentPlayer.name + " is already playing");
	}
}

function logout(){

	currentPlayer = null;
	//document.getElementById("result").innerHTML = "";
	localStorage.removeItem('currentPlayer');
	
	console.log("CurrentPlayer=");
	console.log("AllPlayers="+players);
	
}

function main(){

	
	if(currentPlayer == null){
		alert("Please Log In to play")
	}else{
		alert(currentPlayer.name + " is playing");
		//document.getElementById("result").innerHTML = currentPlayer.name + " is playing";
	}
	
	
}

function showCurrent(){

	var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
	
	if(currentPlayer == null){
	
		alert("No player logged in");
		
	}else{
	
		alert(currentPlayer.name + "")
		
	}
	
}

function showAll(){

	console.log(players);

}
/*
function up(x){

    var currentPlayer = localStorage.getItem("currentPlayer");

	if(currentPlayer != null){
		console.log(currentPlayer);
	
		currentPlayer.score += x;

		//console.log(currentPlayer.score);

		localStorage.setItem("currentPlayer",JSON.stringify(currentPlayer));
		localStorage.setItem(currentPlayer.name,JSON.stringify(currentPlayer));
	} else{
		console.log("No player error");
	}
    
    
    //Number(localStorage.getItem(currentPlayer))

}

*/
function down(){

    var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));

	if(currentPlayer !== null){
		console.log(currentPlayer);
	
		currentPlayer.score -= 1;

		console.log(currentPlayer.score);

		localStorage.setItem("currentPlayer",JSON.stringify(currentPlayer));
		localStorage.setItem(currentPlayer.name,JSON.stringify(currentPlayer));
	}
    console.log("No player error");
    
    //Number(localStorage.getItem(currentPlayer))

}
/*
window.onload = function(){


	window.onclick = function(e){

		var e = window.e || e;
		console.log("x=" + e.clientX + "y=" + e.clientY);
		if(e.clientX < 50 && e.clientY < 50){
			();
		}
	}
}
*/

function loadMe()
{
	var canvas = document.getElementById("canvas1");
    if (canvas.getContext) { // Canvas Support
       	var ctx = canvas.getContext("2d");
      	ctx.rect(2,2,ctx.canvas.width,ctx.canvas.height);
      	ctx.fill();
	}
	  
}


function crc(){
	var canvas = document.createElement('canvas');
	canvas.style.border = "1px solid";
	//canvas.style.display="none";

	canvas.id = "CursorLayer";
	canvas.width = 1100;
	canvas.height = 600;
	canvas.style.zIndex = 8;
	canvas.style.position = "center";
	canvas.style.top="200px";


	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);

	cursorLayer = document.getElementById("CursorLayer");

	console.log(cursorLayer);

	// below is optional

	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgba(255, 120, 0, 0.2)";
}

function currentPlayer(){
	currentPlayer = localStorage.getItem("currentPlayer");
	console.log("CurrentPlayer = " + currentPlayer);
}


function crGrille(game){
	var x=0;
	var y=0;
	var i;
	var j;
	var k;
	var m;
	var table=null;
	var stable=null;
	var nbcases=0;

if(game == 's' || game =='sl'){

	x,y=3;
	k,m=3;

	table = "<table id='table'  style='border-style:solid;border-collapse:collapse;background-color:#36C;font-family:Helvetica,arial;font-size:30px;color:#fff;font-weight:bold;'>";
 	nbcases=1;
	for(i=0; i<3;i++){
		table += "<tr>";
		
		for(j=0; j<3;j++){
			table+="<td style='width:40px;height:40px;border-style:solid;border-width:3px;border-color:#33f;'>";

			table+="<table id='stable"+((i+1)*10+j)+"' >";
			
			for(k=0; k<3; k++){
				table+="<tr>";
				
				for(m=0; m<3; m++){
					table += "<td id='" + nbcases + "' style='text-align: center; width:40px;height:40px;border-style:solid;border-width:3px;border-color:#33f; font-size: 13;'>" + /*((k+1)*10+m)*/nbcases + " </td>";
					nbcases++;
				}
				table+="</tr>";
			}

			table+="</table>";

			table+="</td>";
		}
		table += "</tr>";
	}

	table+= "</table>";

}else{
	if(game == "p"){
		x=1;
		y=mot.length;
	}
	if(game == "m"){
		x=6;
		y=8;
	}
	
	if(game == "mm"){
		x=12;
		y=12;
	}

	table = "<table id='table'  style='border-style:solid;border-collapse:collapse;background-color:#36C;font-family:Helvetica,arial;font-size:30px;color:#fff;font-weight:bold;'>";

	for(i=0;i<x;i++){
		table += "<tr>";
		for(j=0;j<y;j++){
			table += "<td  id='" + ((i+1)*10+j) + "'  style='text-align: center; width:40px;height:40px;border-style:solid;border-width:3px;border-color:#33f; font-size: 13;'>" + ((i+1)*10+j)  +" </td>";
		}
		table += "</tr>";
	}

	table += "</table>"
}
	
	document.getElementById("grille").innerHTML = table;
	
	return table;
	
	document.getElementById("grille").style.top="500px";
	document.getElementById("grille").style.left="500px";
}

function setGrille(game){

	document.getElementById("grille").innerHTML = createGrille(game);
	
	document.getElementById("grille").style.top="500px";
	document.getElementById("grille").style.left="500px";
}

function vendu(){

	crGrille('p');

	document.getElementById("card").style.display="none";
	document.getElementById("card1").style.display="none";
	document.getElementById("card2").style.display="none";
	document.getElementById("card3").style.display="none";
	document.getElementById("card4").style.display="none";

}

function changeColor(cell, color){
	cell.style.backgroundColor=color;
}

var Motsmeles = class{

	constructor(){
		this.grille = crGrille('mm');
		this.mot1 = motmeles1;
		this.mot2 = motmeles2;
		this.player = localStorage.getItem("currentPlayer");
		//document.getElementById("grille").innerHTML = this.grille;
		document.getElementById("card").style.display="none";
		document.getElementById("card1").style.display="none";
		document.getElementById("card2").style.display="none";
		document.getElementById("card3").style.display="none";
		document.getElementById("card4").style.display="none";
		
		var randl1 = Math.floor(Math.random() * (11)) + 1;
		var randl2 = Math.floor(Math.random() * (11)) + 1;
	
		var rand = ( Math.floor(Math.random() * 10));
		var rand2 = ( Math.floor(Math.random() * 10));
		
		if( rand < (11 - motmeles1.length) && (rand != rand2) &&(randl1 != randl2) && rand2 < (11 - motmeles2.length) ){
		
			var indexc1 = rand;
			var indexc2 = rand2;
			var indexl1 = randl1;
			var indexl2 = randl2;
			var indexarray1 = new Array();
			var indexarray2 = new Array();
			
			for(var i=indexc1,j=0; i< (indexc1+motmeles1.length-1),j< motmeles1.length; i++,j++){
			
				table.rows[indexl1].cells[i].innerHTML = motmeles1.charAt(j);
				
				document.getElementById(table.rows[indexl1].cells[i].id).onclick = function(){   changeColor(table.rows[indexl1].cells[i],'red');  };
				
				//table.rows[indexl1].cells[i].style.backgroundColor="red";
				
				//table.rows[indexl1].cells[i].onclick = function(){   changeColor(table.rows[indexl1].cells[i],'red');  };
				
			}
			
			
			for(var i=indexc2,j=0; i< (indexc2+motmeles2.length-1),j< motmeles2.length; i++,j++){
			
				table.rows[indexl2].cells[i].innerHTML = motmeles2.charAt(j);
				//table.rows[indexl2].cells[i].style.backgroundColor="red";
				
				//table.rows[indexl2].cells[i].onclick = function(){   changeColor(table.rows[indexl2].cells[i],'yellow');  };
				
				
				
			}
		
		}else{
			new Motsmeles();
		}
			
	}
}

function motsmelesf(){
	
	var motmeles;
	
	motsmeles = new Motsmeles();

}

		
var Motus = class{
	
	constructor(){
		
		this.player = localStorage.getItem("currentPlayer");
		this.grille = crGrille('m');
		
	}
			
	go(){
		document.getElementById("card").style.display="none";
		document.getElementById("card1").style.display="none";
		document.getElementById("card2").style.display="none";
		document.getElementById("card3").style.display="none";
		document.getElementById("card4").style.display="none";

		document.getElementById("inputdiv").style.display="inline";
		
		for(var i=0; i<8; i++){

		if(i == 3 || i == 1){

			table.rows[0].cells[i].innerHTML = motmotus.charAt(i);
			//table.rows[0].cells[i].style.backgroundColor = "red";
		}else{

			table.rows[0].cells[i].innerHTML = "";

		}
	}
}		
}	

function motusf(){
	
	var motus;
	motus = new Motus();
	motus.go();

}


function getText(){
	var i;

	nbcoupMotus++;
	console.log("nbcoup="+nbcoupMotus);
	

	x = document.getElementById("input");

	if(x.value.length > 8 || x.value.length < 8){
		alert("Bad Word Length");
		document.getElementById("input").value = "";
	}else{
		motmotuslu = x.value;
		document.getElementById("input").value = "";
	
	}

	if(motmotus == motmotuslu){
		console.log("you won");
		
	}

	

	if(motmotuslu.length == 8){
		
		for(var i=0; i<8; i++){
			if(motmotus.charAt(i) == motmotuslu.charAt(i)){
				table.rows[nbcoupMotus-1].cells[i].innerHTML = motmotuslu.charAt(i);
				table.rows[nbcoupMotus-1].cells[i].style.backgroundColor = "red";
				
				ltrouve.push(table.rows[nbcoupMotus-1].cells[i].innerHTML = motmotuslu.charAt(i));
				
				
				//currentPlayer.score+=2;
				
			}else{
				if(motmotus.includes(motmotuslu.charAt(i))){
					table.rows[nbcoupMotus-1].cells[i].innerHTML = motmotuslu.charAt(i);
					table.rows[nbcoupMotus-1].cells[i].style.backgroundColor = "yellow";
					//currentPlayer.score+=1;
					
				}else{
					table.rows[nbcoupMotus-1].cells[i].innerHTML = table.rows[nbcoupMotus-1].cells[i].innerHTML;

					
					
				}
			}
			
		}
		
	}
	if(motmotus == motmotuslu){
		console.log("you won");
		//up();
	}
	console.log("lettres found - "+ltrouve);

	
}


function difarray (array1, array2) {
	var temp = [];
	array1 = array1.toString().split(',').map(String);
	array2 = array2.toString().split(',').map(String);

	for (var i in array1) {
		if(array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
	}
	for(i in array2) {
		if(array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
	}
	return temp.sort((a,b) => a-b);
}



function getWord(){
	
	var fs = require('fs');
	var readline = require('readline');
	var stream = require('stream');

	var instream = fs.createReadStream('mots.txt');
	var outstream = new stream;
	var rl = readline.createInterface(instream, outstream);

	var arr = [];

rl.on('line', function(line) {
  // process line here
  arr.push(line);
});

rl.on('close', function() {
  // do something on finish here
  console.log('arr', arr);
});
	
	
	
}