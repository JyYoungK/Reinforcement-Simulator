// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAIwhUmj3u_h9lZPqSj2LCaPPLycN_L0nM",
    authDomain: "reinforcement-2ee5a.firebaseapp.com",
    databaseURL: "https://reinforcement-2ee5a.firebaseio.com",
    projectId: "reinforcement-2ee5a",
    storageBucket: "reinforcement-2ee5a.appspot.com",
    messagingSenderId: "271051565224",
    appId: "1:271051565224:web:631b5ae61a2f05a8b4ba9d",
    measurementId: "G-3RLHFHE721"
  };
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const roofRef = database.ref("users");

// Variables
var plus = 0;
var person = "";
var upgrading = new Audio('./SOUND/fast-upgrade.mp3');
var win = new Audio('./SOUND/success.mp3');
var lose = new Audio('./SOUND/fail.mp3');


$(document).ready(function() {
    window.onload = Leaderboard();
    function reinforcing(){
        $("#modal").show("closed");
        if (plus < 3){
            document.getElementById("updateMessage").innerHTML = "+"+ plus + "\xa0\xa0 Kaloso's First Weapon ";
            success();
        }
        else if (plus === 3){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            if (gamble < 90){
                success();
            }
            else{
                fail();
            }
        }
        else if (plus === 4){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 80){
                success();
            }
            else{
                fail();
            }
        }
        else if (plus === 5){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 70){
                success();
            }
            else{
                fail();
            }
        }
        else if (plus === 6){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 60){
                success();
            }
            else{
                fail();
            }
        }
        else if (plus === 7){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 50){
                success();
            }
            else{
                fail();
            }
        }
        else if (plus === 8){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 40){
                success();
            }
            else{
                fail();
            }
        }
        else if (plus === 9){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 30){
                success();
            }
            else{
                fail();
            }
        }
        else if (plus === 10){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 25){
                success();
            }
            else{
                fail2();
            }
        }
        else if (plus === 11){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 20){
                success();
            }
            else{
                fail2();
            }
        }
        else if (plus === 12){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 19){
                success();
            }
            else{
                reset();
            }
        }
        else if (plus === 13){
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 18){
                success();
            }
            else{
                reset();
            }
        }
        else {
            var gamble = Math.floor(Math.random() * Math.floor(100));
            // if (gamble < 99){
            if (gamble < 17){
                success();
            }
            else{
                reset();
            }
        }
    }

    $("#login-button").click(function (event){
        event.preventDefault();
        person = document.getElementById("username").value;
        roofRef.child(person).set({
            plus: plus
        });
        $('.successmsg').fadeOut(500);
    });

    function success(){
        win.play();
        plus++;
        var result = [];
        //Check if it makes it to the leaderboard
        roofRef.orderByChild("plus").limitToLast(3).on("value", snapshot => {
            snapshot.forEach(function(child){
                result.push([child.key, child.val().plus]);
            });
        });

        document.getElementById("upgradeMessage").innerHTML = "UPGRADE SUCCESSFUL!";
        $('#upgradeMessage').removeClass();
        $('#upgradeMessage').addClass("upgradeSuccess");
        document.getElementById("updateMessage").innerHTML = "+"+ plus + "\xa0\xa0 Kaloso's First Weapon ";

        if (plus > result[0][1]){
            $('.successmsg').fadeIn(500);
            document.getElementsByClassName("leaderboardmsg")[0].innerHTML = "Congratulations! Your weapon has reached " + plus +"! You can enroll on Leaderboard. Please type an appropriate name.";
        };
    }
    
    function fail(){
        lose.play();
        plus--;
        document.getElementById("upgradeMessage").innerHTML = "DOWNGRADED";
        $('#upgradeMessage').removeClass();
        $('#upgradeMessage').addClass("upgradeFail");
        document.getElementById("updateMessage").innerHTML = "+"+ plus + "\xa0\xa0 Kaloso's First Weapon ";
    }

    function fail2(){
        lose.play();
        plus = plus - 3;
        document.getElementById("upgradeMessage").innerHTML = "SUPER DOWNGRADED";
        $('#upgradeMessage').removeClass();
        $('#upgradeMessage').addClass("upgradeFail");
        document.getElementById("updateMessage").innerHTML = "+"+ plus + "\xa0\xa0 Kaloso's First Weapon ";
    }
    
    function reset(){
        lose.play();
        plus = 0;
        document.getElementById("upgradeMessage").innerHTML = "RESETTED";
        $('#upgradeMessage').removeClass();
        $('#upgradeMessage').addClass("upgradeReset");
        document.getElementById("updateMessage").innerHTML = "+"+ plus + "\xa0\xa0 Kaloso's First Weapon ";
    }

    function Leaderboard(){
        roofRef.orderByChild("plus").limitToLast(3).on("value", snapshot => {
            var result = [];
            snapshot.forEach(function(child){
                result.push([child.key, child.val().plus]);
            });
            document.getElementsByClassName("firstname")[0].innerHTML = "1st Place: " + result[2][0];
            document.getElementsByClassName("firstpoint")[0].innerHTML = "Upgrade " + result[2][1];
    
            document.getElementsByClassName("secondname")[0].innerHTML = "2nd Place: " + result[1][0];
            document.getElementsByClassName("secondpoint")[0].innerHTML = "Upgrade " + result[1][1];
    
            document.getElementsByClassName("thirdname")[0].innerHTML = "3rd Place: " + result[0][0];
            document.getElementsByClassName("thirdpoint")[0].innerHTML = "Upgrade " + result[0][1];
        });
    };
    
    $("#modal").hide();
    
    $(".open-modal").on("click", function(event){
        upgrading.play();
        event.preventDefault();
        event.stopPropagation();
        document.getElementById("part1").style.display = "inline-block";
        document.getElementById("part2").style.display = "inline-block";
        document.getElementById("part3").style.display = "inline-block";
        document.getElementById("part4").style.display = "inline-block";
        setTimeout(function() { reinforcing(); }, 100);
        // setTimeout(function() { reinforcing(); }, 4000);
        $(".reinforcePos").prop('disabled', true);
    });
    
    $("#ok").on("click", function(){
      document.getElementById("part1").style.display = "none";
      document.getElementById("part2").style.display = "none";
      document.getElementById("part3").style.display = "none";
      document.getElementById("part4").style.display = "none";
      document.getElementById("modal").style.display = "none";
      $("#modal").fadeOut();
      $(".reinforcePos").prop('disabled', false);
    });
    
});
