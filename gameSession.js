class gameSession {
  
  constructor(cash = 10000) {
    this.cash = 0;
    this.cashString = '';
    this.phase = 'preDraw'
    this.hand = undefined;
    this.intervalID = 0;

    this.updateCash(cash, false);

  }
  
  startHand() {
    this.phase = 'preDraw'
    this.hand = new pokerHand(openingHand);
    this.updateCash(-5, false);
  }
  
  draw(holds) {
    
    for(let i = 0; i < this.hand.cards.length; i++) {
      if(!holds.includes(i)) {
        this.hand.cards[i] = this.hand.deck.drawCard();
      }
    }
    this.preDraw = false;
    
  }
  
  incrementCash() {
    if (this.intervalID) {
      if (this.cash == this.newCash) {
        this.interruptScoring()
      } else {
        this.cash++
        this.updateCashString();
      }
    }
  }
  
  updateCash(cashInc, win) {
    if (win) {
      // if this update is from post draw
      this.newCash = this.cash+cashInc;
      let speed = 75;
      if (cashInc >= 400) { speed = 10; }
      //runs every speed ms to give a running digit animation
      this.intervalID = setInterval( () =>
          this.incrementCash(this.intervalID, this.newCash), speed
      );
    } else {
      this.cash += cashInc;
      this.updateCashString();
    }
  }
  
  interruptScoring () {
    clearInterval(this.intervalID);
    this.cash = this.newCash
    this.updateCashString();
    this.phase = 'postDraw'
  }
  
  updateCashString() {
    this.cashString = this.cash.toLocaleString(undefined,
                                                {style: 'currency',
                                                 currency: 'USD',
                                                 maximumFractionDigits:0});
  }
  scoreHand() {
    this.hand.updateEval();
    this.phase = 'scoring'
    this.updateCash(HAND_REWARDS[this.hand.handIndex], true);
  }
  
  endHand() {
    this.hand = undefined;
    myScoreboard.resetBgs();
  }
 
}