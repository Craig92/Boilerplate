function refreshPage(){
    
   var page = window.location.hash; 
 
    if(page === "#tasks"){ 
        initializeTask(); 
    } else if (page === "#status") { 
        initializeStatus(); 
    } 
    
};

