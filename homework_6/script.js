//declaring number of items in cart and cart array
var cartNum = 0;
//will not add to cart unless yarn and material have been declared
var allowAddB = false;
var cart = [];
var wishlist = [];
var materialChoices = ["duck-down", "hypoallergenic poly-blend", "memory foam"];

var similarItems = [{img: "img/3.jpg", type: "Couch Pillow", price: "$24.99"}, {img: "img/4.jpg", type: "Decorative Pillow", price: "$8.99"}, {img: "img/5.jpg", type: "Casual Pillow", price: "$14.99"}, {img: "img/2.jpg", type: "Bed Pillow", price: "$19.99"}, {img: "img/3.jpg", type: "Couch Pillow", price: "$24.99"}, {img: "img/4.jpg", type: "Decorative Pillow", price: "$8.99"}, {img: "img/5.jpg", type: "Casual Pillow", price: "$14.99"}, {img: "img/2.jpg", type: "Bed Pillow", price: "$19.99"}];

//generates content in html file for the carousel
//img for image, h2 for type of bed pillow, h3 for price
function similarItemsList(){
    document.getElementById("carousel").innerHTML = ""; 
    for (var i = 0; i < similarItems.length; i++){
        var carouselItem = document.createElement("div");
        carouselItem.setAttribute("class", "carouselitem");
        var carouselImg = document.createElement("img");
        carouselImg.setAttribute("src", similarItems[i].img);
        var carouselType = document.createElement("h2");
        var carouselTypeText = document.createTextNode(similarItems[i].type);
        carouselType.appendChild(carouselTypeText);
        carouselType.setAttribute("class", "itemname");
        var carouselPrice = document.createElement("h3");
        var carouselPriceText = document.createTextNode(similarItems[i].price);
        carouselPrice.setAttribute("class", "price");
        carouselPrice.appendChild(carouselPriceText);
        carouselItem.appendChild(carouselImg);
        carouselItem.appendChild(carouselType);
        carouselItem.appendChild(carouselPrice);
        var carouselList = document.getElementById("carousel");
        carouselList.appendChild(carouselItem);
    }
}

//resets cart on index page
function resetCart(){
    var cart = [];
    var wishlist = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    console.log(cart);
    console.log(localStorage.getItem("cart"));
}

//declares object for pillowchoice allowing it to store yarn and material information
function pillowChoice(yarn,material){ 
    this.yarn = yarn;
    this.material = material;
}

//default as duck-down is the first option in select
pillowChoice.material ="1";


//updates yarn choice
function yarn1(){
    pillowChoice.yarn = "red";
}

function yarn2(){
    pillowChoice.yarn = "yellow";
}

function yarn3(){
    pillowChoice.yarn = "blue";
}

function yarn4(){
    pillowChoice.yarn = "gray";
}

//affects border and opacity based on which yarn choice is made
function yarnChoice(){
    console.log(pillowChoice.yarn);
    //resets border to none
    document.getElementById("red").style.border="none";
    document.getElementById("yellow").style.border="none";
    document.getElementById("blue").style.border="none";
    document.getElementById("gray").style.border="none";
    //makes all other yarn choices lowered opacity
    document.getElementById("red").style.opacity="0.2";
    document.getElementById("yellow").style.opacity="0.2";
    document.getElementById("blue").style.opacity="0.2";
    document.getElementById("gray").style.opacity="0.2";
    document.getElementById(pillowChoice.yarn).style.border="solid 5px blue";
    document.getElementById(pillowChoice.yarn).style.opacity="1";
}

//checks to see if there is a yarn and material selected to add to cart
function allowAdd(){
    if (typeof pillowChoice.yarn !== 'undefined' && typeof pillowChoice.material !=='undefined'){
        document.getElementById("addCart").style.background = "#0000ff";
        document.getElementById("addWishlist").style.background = "#0000ff";
        document.getElementById("addCart").style.cursor = "pointer";
        document.getElementById("addWishlist").style.cursor = "pointer";
        allowAddB = true;
    }
    else{
        allowAddB = false;
    }

    console.log(allowAddB);
}


//updates pillowChoice class with final yarn color and material choice
function addCart(){
    var cart = JSON.parse(localStorage.getItem("cart"));
    var cartNum = cart.length+1;
    //for loop checks which material has been selected and updates object based on choice
    for(var i=1; i <= 3; i++){
        if(document.getElementById("materialChoice").value == i){
            pillowChoice.material = i-1;
        }
    }

    //adds new pillowchoice to cart array
    if(allowAddB == true){
        cart.push([pillowChoice.yarn, pillowChoice.material]);
        //adds to number of items in cart and updates visually
        document.getElementById("cartNumber").style.display="inline-block";
        document.getElementById("cartNumber").innerHTML = cartNum;
        console.log(cart);
    }
    else{
        cartNum = 0;
    }

    //stores cart and length to localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartLength", JSON.stringify(cart.length));
}


//populates cart using localstorage upon loading cart.htmls
function populateCart(){
    //declares the cart array using local storage
    var cart = JSON.parse(localStorage.getItem("cart"));
    //re-styles cart number and populates innerhtml based on length of cart array
    document.getElementById("cartNumber").style.display = "inline-block";
    document.getElementById("cartNumber").innerHTML = JSON.parse(localStorage.getItem("cartLength"));

    document.getElementById("cart").innerHTML = ""; 

    //if no items, display text
    if(cart.length == 0){
        document.getElementById("cart").innerHTML = "You have no items in your cart.";
    }

    //if items, loop through cart to populate nodes
    for(var i=0; i<cart.length; i++){

        //creates img for itemlisting
        var itemImg = document.createElement("img");
        itemImg.setAttribute("src", "img/2.jpg");
        itemImg.setAttribute("class", "cartimg");

        //creates new p element and populates with type of pillow
        var pillowString = document.createElement("p");
        var pillowNode = document.createTextNode("bed pillow");
        pillowString.appendChild(pillowNode);
        pillowString.setAttribute("class", "pillowType");

        //creates new p element and populates with yarn type
        var yarnString = document.createElement("p");
        var yarnNode = document.createTextNode("yarn: "+cart[i][0]);
        yarnString.appendChild(yarnNode);
        yarnString.setAttribute("id", "yarn"+i);

        //creates new p element and populates with material type
        var materialString = document.createElement("p");
        var materialNode = document.createTextNode("material: "+materialChoices[cart[i][1]]);
        materialString.appendChild(materialNode);
        materialString.setAttribute("id", "material"+i);
        materialString.setAttribute("class", "materialType");

        //creates trashcan item and sets the onclick attribute to remove items from cart
        var trashString = document.createElement("a");        
        trashString.innerHTML = "&#128465;";
        trashString.setAttribute("class", "trashIcon");
        trashString.setAttribute("value", i);
        trashString.setAttribute("id", "trash"+i);
        trashString.setAttribute("onclick", "removeFromCart(this)");

        //makes item
        //        var item = document.getElementById("cart");
        var item = document.createElement("div");
        item.appendChild(itemImg);
        item.appendChild(pillowString);
        item.appendChild(yarnString);
        item.appendChild(materialString);
        item.appendChild(trashString);
        item.setAttribute("class", "cartItem");

        var itemList = document.getElementById("cart");
        itemList.appendChild(item);
    }
    console.log(cart);
    document.getElementById("price").innerHTML = "$"+ Math.round(19.99*cart.length*100)/100;
}


//deletes part of the array
function removeFromCart(element){ 

    var removedItem = element.getAttribute("value");
    var cart = JSON.parse(localStorage.getItem("cart"));

    console.log(removedItem);

    //removes cart based on index of trash can value
    cart.splice(removedItem, 1);
    console.log(cart);
    //restores new cart
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartLength", JSON.stringify(cart.length));
    populateCart();
}

function calculateCart(){
    //declares the cart array using local storage
    var cart = JSON.parse(localStorage.getItem("cart"));
    //re-styles cart number and populates innerhtml based on length of cart array
    document.getElementById("cartNumber").style.display = "inline-block";
    localStorage.setItem("cart", JSON.stringify(cart));

    if(cart.length == 0){
        document.getElementById("cartNumber").innerHTML = "0";
    }
    else{
        document.getElementById("cartNumber").innerHTML = JSON.parse(localStorage.getItem("cartLength"));
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}


function addWishlist(){
    var wishlist = JSON.parse(localStorage.getItem("wishlist"));
    for(var i=1; i <= 3; i++){
        if(document.getElementById("materialChoice").value == i){
            pillowChoice.material = i-1;
            console.log(pillowChoice.material);
        }
    }

    //adds new yarn and material to wishlist item
    wishlist.push([pillowChoice.yarn, pillowChoice.material]);

    //stores wishlist and length to localstorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("wishlistLength", JSON.stringify(wishlist.length));

}

function populateWishlist(){
    var wishlist = JSON.parse(localStorage.getItem("wishlist"));
    document.getElementById("wishlist").innerHTML = ""; 

    for(var i=0; i<wishlist.length; i++){
        var itemImg = document.createElement("img");
        itemImg.setAttribute("src", "img/2.jpg");
        itemImg.setAttribute("class", "cartimg");

        var pillowString = document.createElement("p");
        var pillowNode = document.createTextNode("bed pillow");
        pillowString.appendChild(pillowNode);
        pillowString.setAttribute("class", "pillowType");

        var yarnString = document.createElement("p");
        var yarnNode = document.createTextNode("yarn: "+wishlist[i][0]);
        yarnString.appendChild(yarnNode);
        yarnString.setAttribute("id", "yarn"+i);

        var materialString = document.createElement("p");
        var materialNode = document.createTextNode("material: "+materialChoices[wishlist[i][1]]);
        materialString.appendChild(materialNode);
        materialString.setAttribute("id", "material"+i);
        materialString.setAttribute("class", "materialType");

        var item = document.getElementById("cart");
        var item = document.createElement("div");
        item.appendChild(itemImg);
        item.appendChild(pillowString);
        item.appendChild(yarnString);
        item.appendChild(materialString);
        item.setAttribute("class", "wishlistItem");

        var itemList = document.getElementById("wishlist");
        itemList.appendChild(item);
    }
}


//left button of carousel takes the last item of the array and moves it to the front
function leftcarousel(){
    var e = similarItems[7];
    similarItems.splice(similarItems.length-1, 1);
    similarItems.unshift(e);
    similarItemsList();
}

//right button of carousel takes the first item of the array and moves it to the end
function rightcarousel(){
    similarItems.push(similarItems.shift());
    similarItemsList();
}