function toggleButton(buttonID) {             
2   if (document.getElementById(buttonID).innerHTML == "Start") { 
3     if(sendStatus(buttonID, true)) { 
4       document.getElementById(buttonID).innerHTML = "Stop"; 
5       document.getElementById(buttonID).style.background = "yellow"; 
6       showInfo("start"); 
7     } else { 
8       showInfo("error"); 
9     } 
10   } else { 
11     if(sendStatus(buttonID, false)) { 
12       document.getElementById(buttonID).innerHTML = "Start"; 
13       document.getElementById(buttonID).style.background = "blue"; 
14       showInfo("stop"); 
15     } else { 
16       showInfo("error"); 
17     } 
18   } 
19 }; 
