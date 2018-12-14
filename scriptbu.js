var currentPlayer=null;
var players = new Array();
var canvas=null;
var game=false;

// variables pour motus
var motmotus="emmanuel";
var mmarray=motmotus.split('');
var motmotuslu="";
var nbcoupMotus=0;
var ltrouve=new Array();
// variables pour motus

// variables pour mots melés
var motmeles1 = "informa"
var motmeles2 = "maxime"
var chars = new Array();
var elements = new Array();
var trouvemm = false;
var mDown = false;
// variables pour mots melés

// variables poour pendu
var motpendu="EMMANUEL";
var trouve=false;
var found=0;
var missed=0;
var end=false;
// variables pour pendu

var lettres = new Array("A","B","C","D","E","F","G","H","I",
"J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

class Player {
  constructor(name) {
    this.name = name;
    this.scoreP = 0;
	this.scoreMm = 0;
	this.scoreM = 0;
	this.scoreS = 0;
	this.scoreSl = 0;
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
			document.getElementById("btn2").innerHTML = "Log Out";
			document.getElementById("btn4").style.display = "inline";
			document.getElementById("btn4").innerHTML = nplayer.name;
		}
		
		for(var i=0;i<players.length;i++){
			console.log("All players " + players[i].name);
		}
		
        localStorage.setItem('currentPlayer', JSON.stringify(nplayer));

        
        
		
	}else{
		logout();
		document.getElementById("btn2").innerHTML = "Log In";
		document.getElementById("btn4").style.display = "none";
		//document.getElementById("btn4").innerHTML = nplayer.name;
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

	table = "<table id='table' style='border-style:solid;border-collapse:collapse;background-color:#36C;font-family:Helvetica,arial;font-size:30px;color:#fff;font-weight:bold;'>";
 	nbcases=1;
	for(i=0; i<9;i++){
		table += "<tr>";
		
		for(j=0; j<9;j++){
			
			table += "<td id='s"+((i+1)*10+j+1) + "'  style='text-align: center; width:40px;height:40px;border-style:solid;border-width:3px;border-color:#33f; font-size: 13;'> <input id="+((i+1)*10+j+1)+" onblur='onblursud(this)'   style='background-color: #3498db;text-align:center;color:; font-size: 15px; width: 30px; height: 30px;'  maxlength=1>"+((i+1)*10+j+1)+"  </td>";
			nbcases++;
		}
		
		table += "</tr>";
	}

	table+= "</table>";

}else{
	if(game == "p"){
		x=1;
		y=motpendu.length;

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
			table += "<td  id='" + ((i+1)*10+j) + "' onmousedown='addChar(this)'   style='text-align: center; width:40px;height:40px;border-style:solid;border-width:3px;border-color:#33f; font-size: 13;'>" + /*((i+1)*10+j)  +*/" </td>";
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

function onblursud(e){
	//console.log(e.value);
	var line;
	var col;
	
	if(!isNaN(e.value) && (e.value != "")){

		var line = ((e.id-(e.id % 10))/10);
	    var col  = (e.id % 10);
		console.log("line="+line+"-col="+col);

		if(checkl(e,line,col)&&(checkc(e,line,col))&&checkz(e, line,col)){
			//document.getElementById(e.id).value = Number(e.value);
			console.log("allowed");
		}else{
			alert("already present");
			document.getElementById(e.id).value = "";
		}	
	}else{
		console.log("not integer");
		e.value = "";
	}

}
function checkl(e,line,col){

	//console.log(e);
	var indice;
	
	for(var i=0;  i<col-1; i++){

		indice = (10*line)+i+1;
		//console.log(indice);

		if((document.getElementById(indice).value == e.value) ){
			return false;
		}
	}
	for(var j=col;  j<9; j++){

		indice = (10*line)+j+1;
		//console.log(indice);

		if((document.getElementById(indice).value == e.value) ){
			return false;
		}
	}
	return true;
}
function checkc(e,line,col){

	console.log(e);
	var indice;
	
	for(var i=0;  i<line-1; i++){

		indice = (i+1)*10+col;
		console.log("indice"+indice);

		if((document.getElementById(indice).value == e.value) ){
			return false;
		}
		
	}
	
	for(var j=line;  j<9; j++){

		indice = (j+1)*10+col;
		//console.log(indice);

		if((document.getElementById(indice).value == e.value) ){
			return false;
		}
		
	}
	
	return true;
}
function checkz(e,line,col){

	var zone;
	var indice;

	if(line<=3){
		if((col % 10 < 4) && (col % 10 >0) ) {
			zone=1;
		}
		if((col % 10 > 3) && (col % 10 < 7) ){
			zone=2;
		}
		if((col % 10 > 6) && (col % 10 < 10) ){
			zone=3;
		}
	}
	if((line > 3) && (line < 7) ){
		if((col % 10 < 4) && (col % 10 >0) ) {
			zone=4;
		}
		if((col % 10 > 3) && (col % 10 < 7) ){
			zone=5;
		}
		if((col % 10 > 6) && (col % 10 < 10) ){
			zone=6;
		}
	}
	if((line > 6) && (line < 10) ){
		if((col % 10 < 4) && (col % 10 >0) ) {
			zone=7;
		}
		if((col % 10 > 3) && (col % 10 < 7) ){
			zone=8;
		}
		if((col % 10 > 6) && (col % 10 < 10) ){
			zone=9;
		}
	}
	
	var liml;
	var limc;
	var debl;
	var debc;
	
	switch(zone){
		case 1:
			debl = 0;
			liml = 3;
			debc = 0;
			limc = 3;
			break;
			
		case 2:
			debl = 0;
			liml = 3;
			debc = 3;
			limc = 6;
			break;
			
		case 3:
			debl = 0;
			liml = 3;
			debc = 6;
			limc = 9;
			break;
			
		case 4:
			debl = 3;
			liml = 6;
			debc = 0;
			limc = 3;
			break;
			
		case 5:
			debl = 3;
			liml = 6;
			debc = 3;
			limc = 6;
			break;
			
		case 6:
			debl = 3;
			liml = 6;
			debc = 6;
			limc = 9;
			break;
			
		case 7:
			debl = 6;
			liml = 9;
			debc = 0;
			limc = 3;
			break;
			
		case 8:
			debl = 6;
			liml = 9;
			debc = 3;
			limc = 6;
			break;	
			
		case 9:
			debl = 6;
			liml = 9;
			debc = 6;
			limc = 9;
			break;	
	}
	
	console.log("liml-"+liml);
	console.log("limc-"+limc);
	
	var zonear=new Array();
	
	var occ = 0;

	for(var i=debl; i<liml;i++){
		
		for(var j=debc; j<limc;j++){

			indice = ((i+1)*10)+j+1;
			//console.log(indice);
			
			if(document.getElementById(indice).value != e.value){
				
				zonear.push(document.getElementById(indice).value)
				
			}else{
				
				if(occ == 0){
					zonear.push("");
					occ++;
				}else{
					zonear.push(document.getElementById(indice).value);
				}
			}
			
		}

	}
	
	//console.log(zone1);
	
	if(zonear.includes(e.value)){
		
		return false;
		
	}else{
		
		return true;
		
	}

}

function setGrille(game){

	document.getElementById("grille").innerHTML = createGrille(game);
	
	document.getElementById("grille").style.top="500px";
	document.getElementById("grille").style.left="500px";
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
		document.getElementById("grille").style.display="inline";
		
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
				
				//document.getElementById(table.rows[indexl1].cells[i].id).onclick = function(){   changeColor(table.rows[indexl1].cells[i],'');  };
				
				//table.rows[indexl1].cells[i].style.backgroundColor="";
				
				//table.rows[indexl1].cells[i].onclick = function(){   changeColor(table.rows[indexl1].cells[i],'');  };
				
			}
			
			
			for(var i=indexc2,j=0; i< (indexc2+motmeles2.length-1),j< motmeles2.length; i++,j++){
			
				table.rows[indexl2].cells[i].innerHTML = motmeles2.charAt(j);
				
				
				
			}
		
		}else{
			new Motsmeles();
		}
			
	}
}

function motsmelesf(){
	
	document.getElementById("btn0").style.display = "inline";
	game=true;
	var motmeles;
	
	motsmeles = new Motsmeles();

}

function arrayEqual(a,b){
	if(a.length != b.length){
		return false;
	}else{
		for(var i=0; i<a.length; i++){
			if(a[i] == b.charAt(i)){
				return true;
			}else{
				return false;
			}
		}
	}
}

function resetMM(){
	chars=[];
	for(var i=0; i<12; i++){
		for(var j=0; j<12; j++){
			table.rows[i].cells[j].style.backgroundColor="yellow";
		}
	}
	mDown = false;
}
function addChar(e){

	trouvemm = false;

	
	console.log(mDown);

	e.style.backgroundColor = "red";

	chars.push(e.innerHTML);
	elements.push(e);

	console.log(chars);

	if(arrayEqual(chars,motmeles1) || arrayEqual(chars,motmeles2) ){

		console.log("found");
		console.log(chars);
		console.log(elements);

		for(var i=0; i<elements.length; i++){
			elements[i].style.backgroundColor = "green";
		}

		alert("Congrats, you found "+chars);
		chars = [];
		trouvemm = true;

	}
	

	

}

function crClavier(){
	var cl = "<table id='clavier'>" ;
	for(var i=0; i<2; i++){
		cl+= "<tr>";
		for(var j=(9*i); j<(i+1)*9; j++){
			cl+= "<td style='color: white; font-size: 20px;' onclick='setChar(this);' >" + lettres[j] + "</td>";
		}
		cl+= "</tr>";
	}
	cl+= "<tr>";
		for(var j=18; j<3*9-1; j++){
			cl+= "<td style='color: white; font-size: 20px;' onclick='setChar(this);' >" + lettres[j] + "</td>";
		}
	cl+= "</tr>";

	cl+= "</table>"

	document.getElementById("clavier").innerHTML = cl;
	document.getElementById("clavierdiv").style.display="inline";

	return cl;
}

function setChar(e){
/*
	var motarray = motpendu.split('');
	var trouve=false;
	var found=0;
	var missed=0;
	var end=false;
	var letters=new Array();
*/	
	trouve = false;
	
	
	for(var i=0; i< motpendu.length; i++){
		
		if(motpendu.charAt(i) == e.innerHTML){
			document.getElementById("table").rows[0].cells[i].innerHTML = e.innerHTML;
			//console.log(letters);

			e.style.backgroundColor='green';
			e.style.border='green';
			trouve = true;
			found++;
			console.log("found="+found);
			//console.log("missed"+missed);
		}/*else{
			e.style.backgroundColor='';
			e.style.border='';
		}*/
	}
	
	if(!trouve){
		missed++;
		
		setImg(missed+1);
		
		console.log("missed="+missed);
		if(missed == 10){
			end = true;
			console.log("you lost");
		}
	}
	
	if(found == motpendu.length){
		alert("you won");
		end=true;
	}
	
	


}

function setImg(i){
	
	var img = document.getElementById("img");
	img.src = "p"+i+".png";
	
	
}

var Pendu = class{

	constructor(){
		
		this.player = localStorage.getItem("currentPlayer");
		this.grille = crGrille('p');
		this.clavier = crClavier();
		
	}
	go(){
		document.getElementById("card").style.display="none";
		document.getElementById("card1").style.display="none";
		document.getElementById("card2").style.display="none";
		document.getElementById("card3").style.display="none";
		document.getElementById("card4").style.display="none";
		document.getElementById("grille").style.display="inline";
		
		document.getElementById("penduimg").style.display="inline";

	}
}		

function penduf(){

	document.getElementById("btn0").style.display = "inline";
	var pendu;
	game=true;

	pendu = new Pendu();
	pendu.go();

}


function fillCells(){
	
	var count=0;
	var i;
	var j;
	var v;
	var id;
	
	
	while(count < 20){
		
		i=Math.floor((Math.random() * 9) + 1);
		j=Math.floor((Math.random() * 9) + 1);
		v=Math.floor((Math.random() * 9) + 1);
		
		id = ((i)*10+j);
		
		console.log("random i="+i);
		console.log("random j="+j);
		console.log("random v="+v);
		console.log("random id="+id);
		
		
		var elem = document.createElement("input");
		
		elem.id = id;
		elem.value = v;
		
		//console.log("elem  =  "+elem.id);
		
		onblursud(elem);
		
		count++;
		
	}
				
		
				
	
			
	
}
var Sudoku = class{

	constructor(){
		
		this.player = localStorage.getItem("currentPlayer");
		this.grille = crGrille('s');
		
		
	}
	go(){
		document.getElementById("card").style.display="none";
		document.getElementById("card1").style.display="none";
		document.getElementById("card2").style.display="none";
		document.getElementById("card3").style.display="none";
		document.getElementById("card4").style.display="none";
		
		fillCells();
		

	}
}		

function sudokuf(){

	document.getElementById("btn0").style.display = "inline";
	game=true;
	var sudoku;
	
	sudoku = new Sudoku();
	sudoku.go();

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

		document.getElementById("grille").style.display="inline";
		document.getElementById("inputdiv").style.display="inline";
		
		for(var i=0; i<8; i++){

		if(i == 3 || i == 1){

			table.rows[0].cells[i].innerHTML = motmotus.charAt(i);
			//table.rows[0].cells[i].style.backgroundColor = "";
		}else{

			table.rows[0].cells[i].innerHTML = "";

		}
		
	}
}		
}	

function motusf(){
	
	document.getElementById("btn0").style.display = "inline";
	game=true;

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

	if(motmotuslu.length == 8){
		
		if(motmotus == motmotuslu){
			alert("you won");
		}
		
		for(var i=0; i < motmotus.length; i++){
			
			if(motmotuslu.charAt(i) == motmotus.charAt(i) ){
					
				table.rows[nbcoupMotus-1].cells[i].innerHTML = motmotuslu.charAt(i);
				table.rows[nbcoupMotus-1].cells[i].style.backgroundColor="red";
				mmarray[i]="";
				console.log(mmarray);
				
			}else{
				if(mmarray.includes(motmotuslu.charAt(i))){
					table.rows[nbcoupMotus-1].cells[i].innerHTML = motmotuslu.charAt(i);
					table.rows[nbcoupMotus-1].cells[i].style.backgroundColor="yellow";
					mmarray[i]="";
					console.log(mmarray);
				}
			}
				
				
		}
				
	}
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





function setButtons(){
	
	var player = localStorage.getItem("currentPlayer");
	
	document.getElementById("btn1").style.display="inline";
	document.getElementById("btn3").style.display="inline";
	document.getElementById("btn2").style.display="inline";
	//document.getElementById("btn4").style.display="inline";
	
	if(player){
		document.getElementById("btn4").style.display="inline";
		document.getElementById("btn4").innerHTML = player.name;
	}
	
}

function reset(){
	game = false;
	var player = localStorage.getItem("currentPlayer");
	
	document.getElementById("btn1").style.display="inline";
	document.getElementById("btn3").style.display="inline";
	document.getElementById("btn2").style.display="inline";
	//document.getElementById("btn4").style.display="inline";
	
	if(player){
		document.getElementById("btn4").style.display="inline";
		document.getElementById("btn4").innerHTML = player.name;
	}

	document.getElementById("card").style.display="inline";
	document.getElementById("card1").style.display="inline";
	document.getElementById("card2").style.display="inline";
	document.getElementById("card3").style.display="inline";
	document.getElementById("card4").style.display="inline";

	document.getElementById("grille").style.display="none";
	document.getElementById("inputdiv").style.display="none";
	document.getElementById("penduimg").style.display="none";
	document.getElementById("img").style.display="none";
	document.getElementById("clavierdiv").style.display="none";

}








