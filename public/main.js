

function init(){
    
    document.getElementsByClassName("container")[0].style.marginTop = "30px";
    console.log("Feroz choc");
    
}


    
    function search(dom){
        
        
    var d1 = document.getElementById("lb1");
    d1.firstChild.nodeValue = "Enter " + dom.value;   
    dom.parentNode.name = dom.value;
     console.log(dom.parentNode.name);   
        
    }

function desc(){
    console.log("fdsfsdf");
    window.location.assign("http://localhost:4000/desc.ejs");
    
}

 console.log("hello");
