
    var url = "";
    var OSName="Unknown OS";
    function GetDownload(toDownload)
    {
       if (navigator.appVersion.indexOf("Win")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download Windows Game";
          url = "/PCgame.zip";
       }
       if (navigator.appVersion.indexOf("Mac")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download MacOS Game";
          url = "/game.app";
       }
       if (navigator.appVersion.indexOf("X11")!=-1) {
          document.getElementById(toDownload).innerHTML = "Nothing for Unix";
          url = "";
       }
       if (navigator.appVersion.indexOf("Linux")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download Linux Game";
          url = "/Linuxgame.zip";
       }
       if (navigator.appVersion.indexOf("iPhone")!=-1 || navigator.appVersion.indexOf("iPod")!=-1 || navigator.appVersion.indexOf("iPad")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download iPhone Controller";
          url = "Controller.ipa";
       }
       if (navigator.appVersion.indexOf("Android")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download Android Controller";
          url = "Controller.apk";
       }
       if (navigator.appVersion.indexOf("BlackBerry")!=-1) {
          document.getElementById(toDownload).innerHTML = "Nothing for BlackBerry";
          url = "";
       }
    }
    function Download(toDownload){ 
       var iframe = document.createElement("iframe"); 
       if(url.length > 0){
    	   if(url.charAt(0) == "/"){
    	       iframe.src = toDownload + url;
    	       iframe.style.display = "none"; 
    	       document.body.appendChild(iframe);
    	   }
       }
    }