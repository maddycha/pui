//declaring number of items in cart and cart array
var cartNum = 0;
var cart = [];

//declares object for pillowchoice allowing it to store yarn and material information
function pillowChoice(yarn,material){ 
    this.yarn = yarn;
    this.material = material;
}

//for(var i=0; i<4; i++){
//    cart[i] = new pillowChoice("yarn-" + i, "material-" + i);
//}


//default as duck-down is the first option in select
pillowChoice.material ="duck-down";


//updates yarn choice
function yarn1(){
    pillowChoice.yarn = "yarn1";
}

function yarn2(){
    pillowChoice.yarn = "yarn2";
}

function yarn3(){
    pillowChoice.yarn = "yarn3";
}

function yarn4(){
    pillowChoice.yarn = "yarn4";
}

//affects border and opacity based on which yarn choice is made
function yarnChoice(){
    console.log(pillowChoice.yarn);
    //resets border to none
    document.getElementById("yarn1").style.border="none";
    document.getElementById("yarn2").style.border="none";
    document.getElementById("yarn3").style.border="none";
    document.getElementById("yarn4").style.border="none";
    //makes all other yarn choices lowered opacity
    document.getElementById("yarn1").style.opacity="0.2";
    document.getElementById("yarn2").style.opacity="0.2";
    document.getElementById("yarn3").style.opacity="0.2";
    document.getElementById("yarn4").style.opacity="0.2";
    document.getElementById(pillowChoice.yarn).style.border="solid 5px blue";
    document.getElementById(pillowChoice.yarn).style.opacity="1";
}

//checks to see if there is a yarn and material selected to add to cart
function allowAdd(){
    if (typeof pillowChoice.yarn !== 'undefined' && typeof pillowChoice.material !=='undefined'){
        document.getElementById("addCart").style.background = "#0000ff";
    }
}


//updates pillowChoice class with final yarn color and material choice
function addCart(){
    //for loop checks which material has been selected and updates object based on choice
    for(var i=1; i <= 3; i++){
        if(document.getElementById("materialChoice").value == i){
            pillowChoice.material = i;
            console.log(pillowChoice.material);
        }
    }
    console.log("added: " + pillowChoice.yarn + " , " +pillowChoice.material)
    //adds to number of items in cart and updates visually
    cartNum++;
    document.getElementById("cartNumber").style.display="inline-block";
    document.getElementById("cartNumber").innerHTML = cartNum;

    //adds new pillowchoice to cart array
    cart.push([pillowChoice.yarn, pillowChoice.material]);

    //console log all items in cart array
    for(var i=0; i<cart.length; i++){
        console.log(cart[i]);
    }
}

function test(){
    console.log("hello");
    console.log(cartNum);
    console.log("added: " + pillowChoice.yarn + " , " +pillowChoice.material)


    for(var i=0; i<cart.length; i++){
        console.log(cart[i]);
    }

}