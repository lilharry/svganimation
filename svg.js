var svgc = document.getElementById("svgcontainer");

var stopButton = document.getElementById( "stop" );
var circleButton = document.getElementById( "circle" );
var dvdButton = document.getElementById( "dvd" );

var requestID;

var circle = function(){

    window.cancelAnimationFrame( requestID );
    svgc.removeChild(svgc.lastChild)
    //circle
    
    //init params for drawing dot
    var radius = 0;
    rect = svgc.getBoundingClientRect();
    var xcor = rect.width / 2;
    var ycor = rect.height / 2;
    var increase = true
    var c = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle");
    c.setAttribute("cx",xcor);
    c.setAttribute("cy",ycor);
    c.setAttribute("stroke-width","1");
    c.setAttribute("fill","red");
    
    var drawDot = function() {
        
        c.setAttribute("r",radius);
        svgc.appendChild(c);

        if (radius == xcor || radius == ycor){
            increase = false;
        }
        if (radius == 0){
            increase = true;
        }

        if (increase){
            radius++;
        }else{
            radius--;
        }

        requestID = window.requestAnimationFrame( drawDot );

    }
    drawDot();
};



var dvd = function(){

    window.cancelAnimationFrame( requestID );
    svgc.removeChild(svgc.lastChild)
    
    var increasex = true;
    var increasey = true;
    rect = svgc.getBoundingClientRect();

    var d = document.createElementNS("http://www.w3.org/2000/svg", "image");
    
    var imagewidth = 100
    var imageheight = 100
    
    //minor problem: providing one of these will autoscale the other. messes up bounce interaction.
    d.setAttribute("height",imageheight) 
    d.setAttribute("width",imagewidth)   
    
    d.setAttribute("href", "./DVD_logo.svg")

    //d.setAttribute("alt", "no image")

    var xcor = Math.round((rect.width - imagewidth)* Math.random())
    var ycor = Math.round((rect.height - imageheight)* Math.random())

    var drawDvd = function() {
        //console.log(d.width.animVal)
        //console.log(d.height.animVal)
        
        d.setAttribute("x",xcor);
        d.setAttribute("y",ycor);
        //console.log(d.getAttribute("y"))
        svgc.appendChild(d);
        if (xcor + imagewidth >= rect.width){
            increasex=false;
        }

        if (xcor <= 0){
            increasex=true;
        }

        if (ycor + imageheight >= rect.height){
            increasey=false;
        }

        if (ycor <= 0){
            increasey=true;
        }

        if (increasex){
            xcor++;
        }else{
            xcor--;
        }

        if (increasey){
            ycor++;
        }else{
            ycor--;
        }  

        requestID = window.requestAnimationFrame( drawDvd );

    }
    drawDvd();
};


var stop = function(e){
    window.cancelAnimationFrame( requestID );
}


circleButton.addEventListener("click",circle)
dvdButton.addEventListener("click",dvd)
stopButton.addEventListener("click",stop)
