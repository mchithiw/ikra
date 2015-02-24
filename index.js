$(function() {
    
    //initial settings
    $(".inp").val("");
    $(".number-container").hide();
    
    //set resizeable background
    $.backstretch("Blur/7.jpg");
    
    //initialize global variables
    var quranText = [];
    var k;
    var m;
    var sub;
    var keyword;
    
    //read Quran from file into array
    $.get('quran.txt', function(data) {
        quranText = data.split('\n');  
        console.log(quranText[0]);
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
                return false;
            }
    });
    });
}
};
    
    //initialize without button
    showQuran();
        
    
    //buttons to change between features
    $("#sura-button").click(function() {
        $(".key-container").hide();
        $(".number-container").show();
        showQuran();
        $("#sura-button").css("border-bottom", "4px solid maroon");
        $("#sura-button").css("cursor", "default");
        $("#sura-button").css("opacity", ".40");
        
        $("#key-button").css("border-bottom", "none");
        $("#key-button").css("cursor", "pointer");
        $("#key-button").css("opacity", "1.00");
    });
    
    $("#key-button").click(function() {
        $(".number-container").hide();
        $(".key-container").show();
        showQuran();
        $("#key-button").css("border-bottom", "4px solid maroon");
        $("#key-button").css("cursor", "default");
        $("#key-button").css("opacity", ".40");
        
        $("#sura-button").css("border-bottom", "none");
        $("#sura-button").css("cursor", "pointer");
        $("#sura-button").css("opacity", "1.00");
    });

});