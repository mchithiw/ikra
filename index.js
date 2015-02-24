$(function() {
    
    //initial settings
    $(".inp").val("");
    $(".number-container").hide();
    $(".sura-container").hide();
    
    //set resizeable background
    $.backstretch("Blur/7.jpg");
    
    //initialize global variables
    var quranText = [];
    var k;
    var m;
    var sub;
    var keyword;
    var sura;
    var suraStr;
    var chk;
    
    //read Quran from file into array
    $.get('quran.txt', function(data) {
        quranText = data.split('\n');  
        console.log(quranText[0]);
    });
       
    $("#sura-sub").click(function () {
        chk = false;
        
        $(".sura-text").html("Please enter a valid sura (1-114). Thanks!");
        
        sura = $("#sura-inp").val();
        
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
        });
        
    });
    
    console.log(quranText[0]);
    $(".key-text").html("Note: Keywords ARE Case Sensitive.");
     //$(".num-text").html("Note: Please enter a valid Sura and Ayat Number. Thanks!"); 
    
    //function to run both the states and display the Quran
    var showQuran = function() {
    if ($(".number-container").css("display") === "none") {
            
            $("#key-sub").click(function() {
                
                $(".key-text").html("Note: Keywords ARE Case Sensitive.");
            
             keyword = $("#key").val();
                
                var ctr = 0;
                
            $.each(quranText, function(index, value) {
            
            if ( (keyword != "") && value.indexOf(keyword) >= 0) {
                var s = value.lastIndexOf("|") + 1;
                var temp = value.slice(s, value.length);
                var num = value.substr(0, s - 1);
                if (ctr === 0) {
                    $(".key-text").html("");
                }
                ctr++;
                $(".key-text").append(num + " " + temp);
                $(".key-text").append('<br/>' + '<br/>');
                //return false;
            }
            });
            
       });     
            
} else {
    
            $("#num-sub").click(function() {
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
                $(".num-text").append("Sura: " + k + " Ayat: " + m + "     " + tempStr);
                $(".num-text").append('<br/>' + '<br/>');
                //return false;
            }
    });
    });
}
};
    
    //initialize without button
    //showQuran();
        
    
    //buttons to change between features
    $("#sura-button").click(function() {
        $(".key-container, .sura-container").hide();
        $(".number-container").show();
        showQuran();
        $("#sura-button").css("border-bottom", "4px solid maroon");
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
        $("#key-button").css("border-bottom", "4px solid maroon");
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
        $("#full-button").css("border-bottom", "4px solid maroon");
        $("#full-button").css("cursor", "default");
        $("#full-button").css("opacity", ".50");
        
        $("#key-button, #sura-button").css("border-bottom", "none");
        $("#key-button, #sura-button").css("cursor", "pointer");
        $("#key-button, #sura-button").css("opacity", "1.00");
    });

});