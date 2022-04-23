let session, actionButton, myScoreboard;
let imgs = new Map();

function preload() {
  
  for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < RANKS.length; j++) {
        let path = 'zassets/' + RANKS[j]+SUITS[i]+'.png'
        let img = loadImage(path, function(loadedImage) {
               return loadedImage;
        });
        imgs.set(RANKS[j]+SUITS[i], img);
      }
    }
  
  
}
function setup() {
  createCanvas(400, 600);
  session = new gameSession(10000);
}

function draw() {
  background("#35654d");
  
  // IN VIDEO POKER THE "DRAW" IS THE PHASE OF THE GAME WHERE YOU 
  // DRAW CARDS FROM THE DECK. CODE/COMMENT REFERENCES TO "DRAWING" ARE 
  // REFERRING TO THE GAME MECHANIC, NOT THE P5.JS DRAW FUNCTION OR THE ACT 
  // OF DRAWING TO THE CANVAS (BESIDES THIS REQUIRED DRAW FUNCTION, OBV)

  //start the hand if there is not already a hand running
  if (session.hand == undefined) {
    session.startHand();
  }

  //display the cards in the hand
  for (let i = 0; i < session.hand.cards.length; i++) {
    session.hand.cards[i].showCard(i, session.hand.cards.length);
  }

  let txt;
  //display the button
  if (session.phase == 'preDraw') {
    txt = 'Draw'
  } else if (session.phase == 'scoring') {
    txt = ''
    //once the draw happens, reset the position of the cards to default
    session.hand.clearOffsets();
  } else if (session.phase == 'postDraw') {
    txt = 'Deal'
  }

  let maxCardYPos = session.hand.cards[0].img.height+10;
  let actionButtonY = height-maxCardYPos-50;
  
  actionButton = new textBox(width-100, actionButtonY,
                            90, 50, '#b51414', txt, 255, 'center');
  actionButton.show();
  
  myScoreboard = new Scoreboard(10, 10, width*0.95, actionButtonY-20 )
  session.hand.updateEval();
  myScoreboard.show();
  
  infoString = 'Cash: '+session.cashString
  infoBox = new textBox(10,height-maxCardYPos-50,
                       width-20-actionButton.width, actionButton.height,
                       "#00004d", infoString, 255, 'left');
  infoBox.show();
  
}

function mousePressed() {
  if (session.phase == 'preDraw') {
    
    // check each card to see if it was clicked
    for (let i = 0; i < session.hand.cards.length; i++) {
      if (session.hand.cards[i].ifClicked(mouseX, mouseY)) {
          // if clicked, change x offset so card shifts up 10 pixels
          // to indicate that it has been selected by the user
          session.hand.cards[i].onClicked();
          }
    }
    
    // check the button to see if it's been clicked
    if (actionButton.ifClicked(mouseX, mouseY)) {
      // if it's been clicked it's to draw. check which cards 
      // the user has selected by seeing if the x offset isn't 0
      let holds = [];
      for (let i = 0; i < session.hand.cards.length; i++) {
        if (session.hand.cards[i].xOffset != 0) {
          holds.push(i);
        }
      }
      session.draw(holds);
      session.scoreHand();

    }  
  } else if (session.phase == 'scoring') {
    session.interruptScoring();
  } else if (session.phase == 'postDraw') {
      if (actionButton.ifClicked(mouseX, mouseY)) {
        session.endHand();
      }
  }  
}

function touchMoved() {
  return false;
}
