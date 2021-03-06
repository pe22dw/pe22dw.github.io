"use strict";


// Spelets gång från början av en runda till slutet av rundan.

var Game = {
    
    container: document.getElementById("container"),
    gameArea: document.getElementById("gamearea"),
    dealerArea: document.getElementById("dealerarea"),
    startButton: document.getElementById("startbutton"),
    betButton: document.getElementById("betbutton"),
    hitButton: document.getElementById("hitbutton"),
    standButton: document.getElementById("standbutton"),
    doubleButton: document.getElementById("doublebutton"),
    chipCount: document.getElementById("chipcount"),
    chips: document.getElementById("chips"),
    betAmount: document.getElementById("betamount"),
    betSlider: document.getElementById("betslider"),
    betNumber: document.getElementById("betnumber"),
    tinyMessage: document.getElementById("tinymessage"),
    strategyTips: document.getElementById("strategytips"),
    toggleStrategy: document.getElementById("togglestrategy"),
    loadingImage: document.getElementById("loadingimage"),
    loading: document.getElementById("loading"),
    totalWin: document.getElementById("totalwin"),
    totalWinAmountP: document.getElementById("totalwinamount"),
    extraButtons: document.getElementById("extrabuttons"),
    back: document.getElementById("back"),
    backButton: document.getElementById("backbutton"),
    strategyButton: document.getElementById("strategybutton"),
    tutorialDiv: document.getElementById("tutorialdiv"),
    tutorialText: document.getElementById("tutorialtext"),
    nextButton: document.getElementById("nextbutton"),
    closeButton: document.getElementById("closebutton"),
    resumeGameButton: document.getElementById("resumegamebutton"),
    newGameButton: document.getElementById("newgamebutton"),
    sizeButton1: document.getElementById("sizebutton1"),
    sizeButton2: document.getElementById("sizebutton2"),
    tutorialButton: document.getElementById("tutorialbutton"),
    soundsButton: document.getElementById("soundsbutton"),
    ambianceButton: document.getElementById("ambiancebutton"),
    applicationInfo: document.getElementById("applicationinfo"),

    playerScore: 0,
    dealerScore: 0,
    playerChips: 0,
    playerBet: 0,
    playerCardCounter: 0,
    dealerCardCounter: 0,
    playerHasAce: 0,
    dealerHasAce: 0,
    playerHasDoubled: false,
    totalWinAmount: 0,
    soundOn: true,
    ambianceOn: true,

    init: function() {
        
        // Döljer "loading" meddelandet.
        Game.loadingImage.className = "inactive";
        Game.loading.className = "inactive";
        
        // Gör hela innehållet synligt.
        Game.container.style.visibility = "visible";
        
        Game.dealerArea.style.backgroundImage = "url('../pics/blackjackbanner.jpg')";
        
        // Döljer och visar aktuella divs och knappar.
        Game.resumeGameButton.className = "inactive";
        Game.newGameButton.className = "active";
        
        Game.extraButtons.className = "active2";
        Game.tutorialButton.style.backgroundColor = "green";
        
        Game.applicationInfo.className = "active2";
        
        if(Game.soundOn === true) {
            
            Game.soundsButton.innerHTML = "GAME-SOUNDS: ON";
            
        } else {
            
            Game.soundsButton.innerHTML = "GAME-SOUNDS: OFF";
        }
        
        if(Game.ambianceOn === true) {
            
            Sound.ambianceStart();
            Game.ambianceButton.innerHTML = "CASINO-AMBIANCE: ON";
            
        } else {
            
            Game.ambianceButton.innerHTML = "CASINO-AMBIANCE: OFF";
        }
        
        Game.tutorialDiv.className = "inactive";
        Game.nextButton.style.backgroundColor = "green";
    
        Game.betButton.className = "inactive";
        Game.hitButton.className = "inactive";
        Game.standButton.className = "inactive";
        Game.doubleButton.className = "inactive";
        
        Game.betAmount.className = "inactive";
        Game.chipCount.className = "inactive";
        
        Game.back.className = "inactive";
        Game.toggleStrategy.className = "inactive";
        Game.strategyButton.style.backgroundColor = "green";
        
        // Ser till att det alltid kommer skapas en ny kortlek vid spelbordet sedan.
        Deck.usedCards.length = 0;
        
        Table.fadeTable();
        
        // Resume-knappen visas bara om det finns ett gammalt spel att återuppta.
        GameProgress.retrieve();
        
        if(Game.playerChips > 0) {
            
            Game.resumeGameButton.innerHTML = "RESUME GAME ($" + Game.playerChips + ")";
            Game.resumeGameButton.className = "active";
        } 
        
        Game.resumeGameButton.onclick = function () {
                
                Sound.clickStart();
                Game.dealerArea.style.backgroundImage = "none";
                Game.resumeGameButton.className = "inactive";
                Game.newGameButton.className = "inactive";
                Game.extraButtons.className = "inactive";
                Game.applicationInfo.className = "inactive";
                Sound.welcomebackStart();
                Game.newGame();
            };
        
        Game.newGameButton.onclick = function () {
            
            Sound.clickStart();
            
            // Om det finns ett gammalt spel så måste spelaren bekräfta att det skrivs över innan ett nytt spel startar.
            
            if(Game.playerChips > 0) {
                
                // Visar en bekräfta-ruta på samma ställe som tutorial visas.
                
                Game.newGameButton.className = "inactive";
                Game.dealerArea.style.backgroundImage = "none";
                Game.resumeGameButton.className = "inactive";
                Game.extraButtons.className = "inactive";
                Game.applicationInfo.className = "inactive";
                Game.tutorialDiv.className = "active2";
                Game.tutorialText.innerHTML = "Overwrite existing game?<br /><br />";
                Game.tutorialDiv.style.textAlign = "center";
                Game.tutorialText.style.fontWeight = "bold";
                Game.tutorialText.style.color = "white";
                Game.closeButton.innerHTML = "CANCEL";
                Game.nextButton.innerHTML = "OVERWRITE";
                
                document.getElementById("playercards").className = "inactive"; // Lösning för att dölja bakomliggande canvas när fönstret visas, annars störde det interaktionen med knapparna.
                
                Game.closeButton.onclick = function() {
                    
                    Sound.clickStart();
                    
                    Game.init();
                    Game.tutorialDiv.style.textAlign = "left";
                    Game.tutorialText.style.fontWeight = "normal";
                    Game.tutorialText.style.color = "white";
                    Game.closeButton.innerHTML = "CLOSE";
                    Game.nextButton.innerHTML = "NEXT";
                    document.getElementById("playercards").className = "active2";
                };
                
                Game.nextButton.onclick = function() {
                    
                    Sound.clickStart();
                    
                    Game.tutorialDiv.style.textAlign = "left";
                    Game.tutorialText.style.fontWeight = "normal";
                    Game.tutorialText.style.color = "white";
                    Game.closeButton.innerHTML = "CLOSE";
                    Game.nextButton.innerHTML = "NEXT";
                    document.getElementById("playercards").className = "active2";
                    Game.tutorialDiv.className = "inactive";
                    Game.playerChips = 1000;
                    GameProgress.save();
                    Game.newGame();
                };
                
            } else {
                
                Game.dealerArea.style.backgroundImage = "none";    
                Game.newGameButton.className = "inactive";
                Game.resumeGameButton.className = "inactive";
                Game.extraButtons.className = "inactive";
                Game.applicationInfo.className = "inactive";
                Game.playerChips = 1000;
                GameProgress.save();
                Game.newGame();
            } 
        };
        
        Game.sizeButton1.onclick = function () {
            
            Sound.clickStart();
            
            Game.container.style.zoom = "1";
            Game.container.style.marginTop = "40px";
        };
        
        Game.sizeButton2.onclick = function () {
            
            Sound.clickStart();
            
            Game.container.style.zoom = "1.2";
            Game.container.style.marginTop = "30px";
        };
        
        Game.tutorialButton.onclick = function () {
            
            Sound.clickStart();
            
            if(Game.tutorialDiv.className === "inactive") {
                
                Game.dealerArea.style.backgroundImage = "none";
                Game.newGameButton.className = "inactive";
                Game.resumeGameButton.className = "inactive";
                Game.tutorialDiv.className = "active2";
                Game.tutorialButton.style.backgroundColor = "red";
                Game.tutorialText.innerHTML = "* Get a higher score than the dealer without exceeding 21.<br />* Aces are worth 11 or 1 points.<br />* Kings, queens, jacks and tens are worth 10 points.<br />* All cards from 2-9 are worth their specific value in points.<br />* Dealer must stand on 17 points and higher.<br />* 21 points with two cards beats 21 points with several.<br />* You can choose to stand, hit or double.<br />* Doubling is only avaliable on the first two cards.";
                Game.nextButton.innerHTML = "NEXT";
                Game.nextButton.style.backgroundColor = "green";
                
            } else {
                
                Game.init();
            }
        };
        
        Game.nextButton.onclick = function() {
            
            Sound.clickStart();
            
            if(Game.nextButton.style.backgroundColor === "green") {
                
                Game.tutorialText.innerHTML = "* All winning hands pays out 2:1.<br />* Tied hands returns the betamount.<br />* 21 points with two cards (blackjack) pays out 2.5:1.<br />* If both you and the dealer has a blackjack it is a tie.<br />* The deck is reshuffled as soon as it runs out.<br />* Optional strategytips are available during gameplay.<br />* You can leave and return with the same amount of chips.";
                Game.nextButton.innerHTML = "PREV";
                Game.nextButton.style.backgroundColor = "red";
                
            } else {
                
                Game.tutorialText.innerHTML = "* Get a higher score than the dealer without exceeding 21.<br />* Aces are worth 11 or 1 points.<br />* Kings, queens, jacks and tens are worth 10 points.<br />* All cards from 2-9 are worth their specific value in points.<br />* Dealer must stand on 17 points and higher.<br />* 21 points with two cards beats 21 points with several.<br />* You can choose to stand, hit or double.<br />* Doubling is only avaliable on the first two cards.";
                Game.nextButton.innerHTML = "NEXT";
                Game.nextButton.style.backgroundColor = "green";
            }
        };
        
        Game.closeButton.onclick = function() {
            
            Sound.clickStart();
            
            Game.init();
        };
        
        Game.soundsButton.onclick = function() {
            
            Sound.clickStart();
            
            if(Game.soundOn === true) {
                
                Sound.allStop();
                Game.soundsButton.innerHTML = "GAME-SOUNDS: OFF";
            
            } else {
                
                Sound.allStart();
                Game.soundsButton.innerHTML = "GAME-SOUNDS: ON";
            }
        };
        
        Game.ambianceButton.onclick = function() {
            
            Sound.clickStart(); 
            
            if(Game.ambianceOn === true) {
                
                Sound.ambianceStop();
                Game.ambianceButton.innerHTML = "CASINO-AMBIANCE: OFF";
            
            } else {
                
                Sound.ambianceStart();
                Game.ambianceButton.innerHTML = "CASINO-AMBIANCE: ON";
            }
        };
    },
     
    newGame: function() {
        
        // Startar ett nytt spel.
        
        Table.showTable();
        
        Deck.createDeck();
        Deck.shuffleDeck();
        
        Game.back.className = "active2";
        
        Game.backButton.disabled = false;
        Game.backButton.style.opacity = 1;
        
        Game.chips.innerHTML = "$" + Game.playerChips;
        Game.chipCount.className = "active2";
        
        Game.statusColor();
        
        Table.showBetSelect();
        Game.betButton.className = "active";
        Game.betAmount.className = "active2";
        
        // Sätter rätt värden på bet-slidern.
        Game.betSlider.max = Game.playerChips;
        Game.betSlider.min = Game.playerChips / 20;
        Game.betSlider.step = Game.playerChips / 20;
        Game.betSlider.value = Game.playerChips / 20;
        Game.playerBet = Math.ceil(Game.betSlider.value);
        Game.betNumber.innerHTML = "$" + Math.ceil(Game.betSlider.value);
        
        Game.betSlider.oninput = function() {
            
            Game.playerBet = Math.ceil(Game.betSlider.value);
            Game.betNumber.innerHTML = "$" + Math.ceil(Game.betSlider.value);
        };
        
        Game.betButton.onclick = function () {
            
            Game.betButton.className = "inactive";
            Table.fadeBetSelect();
            Game.newRound();
        };
        
        Game.strategyButton.onclick = function() {
            
            Sound.clickStart();
            
            if(Game.toggleStrategy.className === "inactive") {
                
                Game.toggleStrategy.className = "active2";
                Game.strategyButton.style.backgroundColor = "red";
                
            } else {
        
                Game.toggleStrategy.className = "inactive";
                Game.strategyButton.style.backgroundColor = "green";
            }
        };
        
        Game.backButton.onclick = function() {
            
            Sound.clickStart();
            
            Game.init();
        };
    },
    
    newRound: function() {
        
        // Sker alltid vid varje ny spelrunda!
        
        Game.backButton.disabled = true;
        Game.backButton.style.opacity = 0.3;
        
        // Bestämmer vilken färg det ska vara på texten ovanför betchipet och dubbelknappen.
        if(Game.playerBet >= 1 && Game.playerBet < 250) {
            
            Chip.textColor = "cyan";
        
        } else if(Game.playerBet >= 250 && Game.playerBet < 500) {
            
            Chip.textColor = "greenyellow";
            
        } else if(Game.playerBet >= 500 && Game.playerBet < 1000) {
            
            Chip.textColor = "yellow";
            
        } else if(Game.playerBet >= 1000) {
            
            Chip.textColor = "fuchsia";
        
        } else {
            
            Chip.textColor = "white";
        }
        
        Game.playerChips -= Game.playerBet;
        Game.chips.innerHTML = "$" + Game.playerChips;
        
        // Sparar markerantalet i localstorage.    
        GameProgress.save();
            
        Game.statusColor();
            
        Chip.displayChip();
        
        setTimeout(function(){
                
            Game.playerHits();
            Game.dealerHits();
                        
        },500); 
            
        setTimeout(function(){
                        
            Game.playerHits();
            Strategy.calculate();
                
        },1500); 
        
        // Om spelaren får blackjack så är det automatiskt vinst (om inte dealern har A eller 10), annars dyker spelknapparna upp och spelaren får göra sitt val.
            
        setTimeout(function(){
                
            if(Game.playerScore === 21 && Game.dealerScore !== 11 && Game.dealerScore !== 10) {
                    
                Score.blackJack();
                    
            } else {
                    
                Game.hitButton.className = "active";
                Game.standButton.className = "active";
                Game.doubleButton.className = "active";
                Game.doubleButton.disabled = false;
                Game.doubleButton.style.backgroundColor = Chip.textColor;
                Game.doubleButton.style.opacity = 1;
            }
                    
        },2000); 
    
        // Härifrån bestämmer spelaren vad som händer.
            
        Game.hitButton.onclick = function () {
                
            Game.playerHits();
            Strategy.calculate();
            Game.doubleButton.disabled = true;
            Game.doubleButton.style.opacity = 0.3;
        };
            
        Game.standButton.onclick = function () {
                
            Sound.clickStart();
            Game.hitButton.className = "inactive";
            Game.standButton.className = "inactive";
            Game.doubleButton.className = "inactive";
            Game.strategyTips.innerHTML = "";
                
            Game.dealerHits();
        };
            
        Game.doubleButton.onclick = function () {
                
            if(Game.playerChips < Game.playerBet) {
            
                var noChips = "NOT ENOUGH CHIPS!";
                Messages.textColor = "red";
                Messages.displayMessage(noChips);
                    
            } else {
                    
                Game.playerDoubles();
            }
        };
    },
    
    playerHits: function() {
        
        Deck.drawCard();
        Game.playerCardCounter += 1;
        Card.displayPlayerCard(Deck.currentCard);
        
        if(Deck.currentCard.substring(1) === "1") {
            
            Game.playerHasAce += 1;
        }
        
        if(Game.playerScore > 21) {
            
            // Kollar om det finns ett ess som kan göras om från 11 till 1.
            if(Game.playerHasAce > 0) {
                            
                Game.playerScore -= 10;
                Score.displayPlayerScore();
                Game.playerHasAce -= 1;
                
                if(Game.playerScore === 22) {
                    
                    Game.hitButton.className = "inactive";
                    Game.standButton.className = "inactive";
                    Game.doubleButton.className = "inactive";
                    Score.compare();
                }
                        
            } else {
                
                Game.hitButton.className = "inactive";
                Game.standButton.className = "inactive";
                Game.doubleButton.className = "inactive";
                
                Score.compare();
            }
        }
    },
    
    dealerHits: function() {
        
        setTimeout(function () { 
            
            Deck.drawCard();
            Game.dealerCardCounter += 1;
            Card.displayDealerCard(Deck.currentCard);
            
            if(Deck.currentCard.substring(1) === "1") {
            
                Game.dealerHasAce += 1;
            }
        
            // Körs bara när dealern har minst två kort.
            if(Game.dealerCardCounter >= 2) {
            
                // Dealern drar fler kort så länge poängen är under 17.
                if(Game.dealerScore < 17) {
                        
                    Game.dealerHits();
                        
                } else {
                    
                    if(Game.dealerScore > 21) {
                        
                        // Kollar om det finns ett ess som kan göras om från 11 till 1.
                        if(Game.dealerHasAce > 0) {
                            
                             Game.dealerScore -= 10;
                             Score.displayDealerScore();
                             Game.dealerHasAce -= 1;
                             
                             if(Game.dealerScore === 17) {
                                 
                                 Score.compare();
                                 
                             } else {
                                 
                                 Game.dealerHits();
                             }
                        
                        } else {
                            
                            Score.compare();
                        }
                        
                    } else {
                        
                        Score.compare();
                    }
                }
            }
        }, 500);
    },
    
    playerDoubles: function() {
        
        Game.hitButton.className = "inactive";
        Game.standButton.className = "inactive";
        Game.doubleButton.className = "inactive";
        Game.strategyTips.innerHTML = "";
            
        Game.playerChips -= Game.playerBet;
        Game.chips.innerHTML = "$" + Game.playerChips;
            
        GameProgress.save();
            
        Game.statusColor();
            
        Game.playerBet = Game.playerBet * 2;
        Game.playerHasDoubled = true;
            
        Chip.displayDoubleChip();
        
        setTimeout(function(){
                
            Deck.drawCard();
            Game.playerCardCounter += 1;
            Card.displayPlayerCard(Deck.currentCard);
        
            if(Deck.currentCard.substring(1) === "1") {
            
                Game.playerHasAce += 1;
            }
        
            if(Game.playerScore > 21) {
            
                // Kollar om det finns ett ess som kan göras om från 11 till 1.
                if(Game.playerHasAce > 0) {
                            
                    Game.playerScore -= 10;
                    Score.displayPlayerScore();
                    Game.playerHasAce -= 1;
                
                    if(Game.playerScore === 22) {
                    
                        Score.compare();
                        
                    } else {
                            
                        Game.dealerHits();
                    }
                        
                } else {
                
                    Score.compare();
                }
                    
            } else {
                
                Game.dealerHits();
            }
                
        },500);
    },
    
    roundIsOver: function() {
        
        // Rensar canvas, nollställer variabler och sparar antalet marker i localstorage.
        
        Game.strategyTips.innerHTML = ""; // Extra rensning av strategitips för om spelaren tryckt på hit-knappen för snabbt flera gånger så det inte har hunnit ske.
        
        if(Messages.textColorP === "chartreuse" || Messages.textColorP === "gold" || Messages.textColorP === "dodgerblue") {
       
            setTimeout(function() {
                
                Sound.cashingStart();
                
                // Rensar bort den första marken samt extramarkerna för Blackjack.
                var temp3 = document.getElementById("playercards");
                temp3.getContext('2d').clearRect(0, 20, 80, 60);
                
                // Denna del rensar bort det lilla som annars blir kvar efter en dubbling.
                var temp8 = document.getElementById("playercards");
                temp8.getContext('2d').clearRect(62, 65, 32, 27);
                var temp9 = document.getElementById("playercards");
                temp9.getContext('2d').clearRect(22, 58, 32, 35);
                
                var temp5 = document.getElementById("playercards");
                temp5.getContext('2d').clearRect(0, 0, 55, 60);
                
                var temp6 = document.getElementById("dealercards");
                temp6.getContext('2d').clearRect(0, 60, 60, 40);
                
                Game.chips.style.fontWeight = "bold";
                Game.chips.innerHTML = "$" + Game.playerChips;
                Game.chips.style.color = Chip.textColor;
            
                Game.totalWinAmountP.style.webkitAnimation = 'none'; 
            
                // http://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element
            
                setTimeout(function() {
                    
                    Game.totalWin.style.visibility = "visible";
                    Game.totalWinAmountP.style.color = Chip.textColor;
                    Game.totalWinAmountP.innerHTML = "+$" + Game.totalWinAmount;
                
                    Game.totalWinAmountP.style.webkitAnimation = '';
                    
                    Game.chips.style.fontWeight = "normal";
                    Game.chips.style.color = "white";
                
                },400);
                
                Game.statusColor();
           
            },500);
        
        } else {
            
            setTimeout(function() {
                
                Sound.chipStart();
                
                // Rensar bort den första marken.
                var temp4 = document.getElementById("playercards");
                temp4.getContext('2d').clearRect(0, 20, 80, 60);
                
                // Denna del rensar bort det lilla som annars blir kvar efter en dubbling.
                var temp7 = document.getElementById("playercards");
                temp7.getContext('2d').clearRect(62, 65, 32, 27);
                
            },500);
        } 
        
        setTimeout(function(){
            
            Sound.swipeStart();
            
            // "Samlar" in alla kort, dvs rensar canvas.
            var temp1 = document.getElementById("playercards");
            temp1.getContext('2d').clearRect(0, 0, temp1.width, temp1.height);
        
            var temp2 = document.getElementById("dealercards");
            temp2.getContext('2d').clearRect(0, 0, temp2.width, temp2.height);
            
        },1000);
        
        setTimeout(function(){
                    
            // Flyttar de kort som varit i spel till en egen array.
            for (var i = 0; i < Deck.cardsInPlay.length; i+=1) {
            
                Deck.usedCards.push(Deck.cardsInPlay[i]);
            }
        
            // Rensar arrayen för kort i spel.
            Deck.cardsInPlay.length = 0;
        
            // Nollställer poäng, aktuellt kort och korträknare.
            Game.playerScore = 0;
            Game.dealerScore = 0;
            Deck.currentCard = null;
            Game.playerCardCounter = 0;
            Game.dealerCardCounter = 0;
            Game.playerHasAce = 0;
            Game.dealerHasAce = 0;
            Messages.textColorP = "";
            Game.playerHasDoubled = false;
            Game.totalWinAmount = 0;
            
            if(Game.playerChips <= 0) {
                
                Game.gameOver();
                
            } else {
                
                // Sparar markerantalet i localstorage.
                GameProgress.save();
                
                Table.showBetSelect();
                Game.betButton.className = "active";
                
                Game.backButton.disabled = false;
                Game.backButton.style.opacity = 1;
                
                // Sätter rätt värden på bet-slidern.
                Game.betSlider.max = Game.playerChips;
                Game.betSlider.min = Game.playerChips / 20;
                Game.betSlider.step = Game.playerChips / 20;
                Game.betSlider.value = Game.playerChips / 20;
                Game.playerBet = Math.ceil(Game.betSlider.value);
                Game.betNumber.innerHTML = "$" + Math.ceil(Game.betSlider.value);
                
                Game.betSlider.oninput = function() {
                    
                    Game.playerBet = Math.ceil(Game.betSlider.value);
                    Game.betNumber.innerHTML = "$" + Math.ceil(Game.betSlider.value);
                };
            
                Game.betButton.onclick = function () {
            
                    Game.betButton.className = "inactive";
                    Table.fadeBetSelect();
                    Game.newRound();
                };
            }
            
        },1500);
        
        setTimeout(function(){
            
            Game.totalWin.style.visibility = "hidden";
            
        },2500);
    },
    
    gameOver: function() {
        
        GameProgress.erase();
        Game.init();
        
        // Visar en tack-ruta på samma ställe som tutorial visas.
        
        Game.dealerArea.style.backgroundImage = "none";
        Game.newGameButton.className = "inactive";
        Game.extraButtons.className = "inactive";
        Game.applicationInfo.className = "inactive";
        Game.tutorialDiv.className = "active2";
        Game.tutorialText.innerHTML = "Thank you for playing!<br /><br />";
        Game.tutorialDiv.style.textAlign = "center";
        Game.tutorialText.style.fontWeight = "bold";
        Game.tutorialText.style.color = "white";
        Game.nextButton.className ="inactive";
        Game.closeButton.className ="inactive";
        
        setTimeout(function() {
            
            Game.init();
            Game.tutorialDiv.style.textAlign = "left";
            Game.tutorialText.style.fontWeight = "normal";
            Game.tutorialText.style.color = "white";
            Game.nextButton.className ="active";
            Game.closeButton.className ="active";
            
        },2000);
    },
    
    statusColor: function() {
        
        // Bestämmer vilken färg det ska vara på ramen runt totala markerna.
        if(Game.playerChips >= 1 && Game.playerChips < 2500) {
    
            Game.chips.style.borderColor = "dodgerblue";
            
        } else if(Game.playerChips >= 2500 && Game.playerChips < 5000) {
                
            Game.chips.style.borderColor = "chartreuse";
                
        } else if(Game.playerChips >= 5000 && Game.playerChips < 10000) {
                
            Game.chips.style.borderColor = "gold";
            
        } else if(Game.playerChips >= 10000) {
            
            Game.chips.style.borderColor = "magenta";
                
        } else {
                
            Game.chips.style.borderColor = "red";
        }
    },
};

window.onload = Game.init;