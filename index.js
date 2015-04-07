$(function() {
    
    //initial settings
    $(".inp").val("");
    $(".number-container").hide();
    $(".sura-container").hide();
    
    //set resizeable background
    $.backstretch("Blur/7.jpg");
    
    //initialize global variables
    var quranText = [];
    var suraList = [];
    var k;
    var m;
    var sub;
    var keyword;
    var sura;
    var suraSelected;
    var suraStr;
    var chk;
    var selStr;
    
    //read Quran from file into array
   /* var getQuran = function() {
    $.get('quran.txt', function(data) {
        quranText = data.split('\n');  
    });
    } */
    
    
    $.get('sura.txt', function(data) {
        suraList = data.split('\n'); 
        //console.log(suraList[0]);
        
    $.each(suraList, function(key, value) {   
     $('.suras')
         .append($("<option></option>")
         .attr("value",key)
         .text(value)); 
});
    
    $(".suras").prepend($("<option/>", {
        value: "Error",
        text: "Pick a Sura",
        selected: "selected"
      }));
        
    });
    
    $(".sura-text").html("Either type a Sura number or select one from the drop down menu! Note: If you type a Sura, it will take preference over the drop down selection.");
    
    
    $("#sura-sub").click(function () {
        
        if (quranText.length < 1) {
            $.get('quran.txt', function(data) {
                quranText = data.split('\n');  
            });
        }
        chk = false;
        
        $(".sura-text").html("Please enter a valid sura (1-114). Thanks!");
        $("#sura-type").html("Complete Sura");
        
        suraSelected = $(".suras").val();
        if (suraSelected != "Error") {
            suraSelected = parseInt(suraSelected) + 1;
        }
        console.log(suraSelected);
        sura = $("#sura-inp").val();
        var suraName = $(".suras option:selected").text();
        
        
        if (sura != "") {
            chk = true;
        } 
        suraStr = " " + sura + "|";
        var part;
        var ctr = 0;
        $.each(quranText, function( key, value) {
            if (chk && value.indexOf(suraStr) >= 0) {
                if (ctr === 0) {
                    $(".sura-text").html("");
                    ctr++;
                }
                part = value.slice(value.indexOf("|") + 1, value.length);
                $(".sura-text").append(part);
                $(".sura-text").append('<br/>' + '<br/>');
            }
            else if (chk === false && (suraSelected != "Error")) {
                selStr = " " + suraSelected + "|";
                console.log(selStr);
                
                if (value.indexOf(selStr) >= 0) {
                    if (ctr === 0) {
                    $(".sura-text").html("");
                    ctr++;
                }
                    
                    $("#sura-type").html(suraName);
                   part = value.slice(value.indexOf("|") + 1, value.length);
                $(".sura-text").append(part);
                $(".sura-text").append('<br/>' + '<br/>'); 
                }
                
                     
            }
            
            
        });
        
    });
    
    $(".key-text").html("Note: Keywords ARE Case Sensitive.");
     //$(".num-text").html("Note: Please enter a valid Sura and Ayat Number. Thanks!"); 
    
    //function to run both the states and display the Quran
    var showQuran = function() {
    if ($(".number-container").css("display") === "none") {
            
            $("#key-sub").click(function() {
                
                if (quranText.length < 1) {
                    $.get('quran.txt', function(data) {
                        quranText = data.split('\n');  
                     });
                }
                
                $(".key-text").html("Note: Keywords ARE Case Sensitive.");
            
             keyword = $("#key").val();
             console.log(keyword);
                
                var ctr = 0;
                
            $.each(quranText, function(index, value) {
            
            var s = value.lastIndexOf("|") + 1;
            var temp = value.slice(s, value.length);
            var num = value.substr(0, s - 1);
            
            if ( (keyword != "") && temp.indexOf(keyword) >= 0) {
                if (ctr === 0) {
                    $(".key-text").html("");
                }
                ctr++;
                $(".key-text").append(num + ": " + temp);
                $(".key-text").append('<br/>' + '<br/>');
                //return false;
            }
            });
            
       });     
            
} else {
    
            $("#num-sub").click(function() {
                
                if (quranText.length < 1) {
                    $.get('quran.txt', function(data) {
                        quranText = data.split('\n');  
                    });
                }
                
             $(".num-text").html("Note: Please enter a valid Sura and Ayat number. Thanks!");   
            var ctr = 0;
            k = $("#sura").val();
            m = $("#aya").val();
            sub = " " + k + "|" + m + "|";
            var check = false;
            
        if ((k != "") && (m != ""))
        {
            check = true;
        }
            
            $.each(quranText, function(index, value) {
            
            if (check && value.indexOf(sub) >= 0) {
                var tempStr;
                tempStr = value.slice((value.indexOf(sub) + sub.length), value.length);
                $(".num-text").html("");
                $(".num-text").append("Sura: " + k + " Ayat: " + m + ":     " + tempStr);
                $(".num-text").append('<br/>' + '<br/>');
                //return false;
            }
    });
    });
}
};
    
    //initialize without button
    showQuran();
        
    
    //buttons to change between features
    $("#sura-button").click(function() {
        $(".key-container, .sura-container").hide();
        $(".number-container").show();
        showQuran();
        $("#sura-button").css("border-bottom", "6px solid maroon");
        $("#sura-button").css("cursor", "default");
        $("#sura-button").css("opacity", ".50");
        
        $("#key-button, #full-button").css("border-bottom", "none");
        $("#key-button, #full-button").css("cursor", "pointer");
        $("#key-button, #full-button").css("opacity", "1.00");
    });
    
    $("#key-button").click(function() {
        $(".number-container, .sura-container").hide();
        $(".key-container").show();
        showQuran();
        $("#key-button").css("border-bottom", "6px solid maroon");
        $("#key-button").css("cursor", "default");
        $("#key-button").css("opacity", ".50");
        
        $("#sura-button, #full-button").css("border-bottom", "none");
        $("#sura-button, #full-button").css("cursor", "pointer");
        $("#sura-button, #full-button").css("opacity", "1.00");
    });
    
    $("#full-button").click(function() {
        $(".key-container, .number-container").hide();
        $(".sura-container").show();
        showQuran();
        $("#full-button").css("border-bottom", "6px solid maroon");
        $("#full-button").css("cursor", "default");
        $("#full-button").css("opacity", ".50");
        
        $("#key-button, #sura-button").css("border-bottom", "none");
        $("#key-button, #sura-button").css("cursor", "pointer");
        $("#key-button, #sura-button").css("opacity", "1.00");
    });

});