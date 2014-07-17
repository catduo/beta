
    var url = "";
    var OSName="Unknown OS";
    function GetDownload(toDownload)
    {
       if (navigator.appVersion.indexOf("Win")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download Windows Game";
          url = "nPC.zip";
       }
       else if (navigator.appVersion.indexOf("Mac")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download MacOS Game";
          url = "nMac.zip";
       }
       else if (navigator.appVersion.indexOf("X11")!=-1) {
          document.getElementById(toDownload).innerHTML = "Nothing for Unix";
          url = "";
       }
       else if (navigator.appVersion.indexOf("Linux")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download Linux Game";
          url = "nLinux.zip";
       }
       else if (navigator.appVersion.indexOf("iPhone")!=-1 || navigator.appVersion.indexOf("iPod")!=-1 || navigator.appVersion.indexOf("iPad")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download iPhone Game";
          url = "n.ipa";
       }
       else if (navigator.appVersion.indexOf("Android")!=-1) {
          document.getElementById(toDownload).innerHTML = "Download Android Game";
          url = "n.apk";
       }
       else if (navigator.appVersion.indexOf("BlackBerry")!=-1) {
          document.getElementById(toDownload).innerHTML = "Nothing for BlackBerry";
          url = "";
       }
    }
    var controllerUrl = "";
    function GetDownloadController(){
        if (navigator.appVersion.indexOf("iPhone")!=-1 || navigator.appVersion.indexOf("iPod")!=-1 || navigator.appVersion.indexOf("iPad")!=-1) {
            document.getElementById("downloadController").innerHTML = "Download iPhone Controller";
            controllerUrl = "http://jovios.com/Controller.ipa";
         }
        else if (navigator.appVersion.indexOf("Android")!=-1) {
            document.getElementById("downloadController").innerHTML = "Download Android Controller";
            controllerUrl = "http://jovios.com/Controller.apk";
         }
        else{
        	var element = document.getElementById("downloadController");
        	element.parentNode.removeChild(element);
        }
    }
    function Download(toDownload){ 
        var iframe = document.createElement("iframe"); 
        if(url.length > 0){
     	   if(url[0] == 'n'){
     		   url = toDownload + url.substring(1);
     	   }
 	       iframe.src = url;
 	       iframe.style.display = "none"; 
 	       document.body.appendChild(iframe);
        }
     }
    function DownloadController(){ 
        var iframe = document.createElement("iframe"); 
        if(url.length > 0){
 	       iframe.src = controllerUrl;
 	       iframe.style.display = "none"; 
 	       document.body.appendChild(iframe);
        }
     }