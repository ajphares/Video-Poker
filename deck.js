class Deck {
  constructor() {
    this.cards = [];

    for (let i = 0; i < SUITS.length; i++) {
      for (let j = 0; j < RANKS.length; j++) {
        this.cards.push(new Card(RANKS[j], SUITS[i]));
      }
    }
    this.cards = shuffle(this.cards);
  }

  drawCard() {
    return this.cards.pop();
  }
  drawSpecificCard(cardString) {
    for (let i = 0; i < this.cards.length; i++) {
      if (cardString == this.cards[i].cardString) {
        return this.cards.splice(i, 1)[0]
      }
    }
    
  }
}

class Card {
  constructor(rank, suit) {
    let sRank = rank.toString().toUpperCase();
    let sSuit = suit.toString().toLowerCase();
    

    if (!RANKS.includes(sRank)) {
      throw new Error("Invalid rank");
    }
    if (!SUITS.includes(sSuit)) {
      throw new Error("Invalid suit");
    }
    
    this.imgX = undefined;
    this.imgY = undefined;
    this.xOffset = 0;
    
    this.rank = sRank;
    this.suit = sSuit;
    this.cardString = this.rank + this.suit;
    // numeric representation of the rank (in proper order)
    this.rankInt = RANKS.indexOf(this.rank)
    this.img = imgs.get(this.rank+this.suit);
    this.img.resize(width / 5, 0);
    
  }
  
  showCard(position, totalCards) {
    
    let targetWidth = width / totalCards;
    this.imgX = targetWidth * position
    this.imgY = height - this.img.height - this.xOffset
    image(this.img, this.imgX, this.imgY);
  
  }
  
  
  ifClicked(x, y) {

    let boundaryLeft = this.imgX;
    let boundaryUp = this.imgY;
    let boundaryRight = boundaryLeft + this.img.width;
    let boundaryDown = boundaryUp + this.img.height;
    
    if (x > boundaryLeft && x < boundaryRight &&
        y > boundaryUp && y < boundaryDown) {
      return true;
    } else {
      return false;
    }
  }
  
  onClicked() {
    this.toggleOffset();
  }
  
  toggleOffset() {
    if (!this.xOffset) {
      this.xOffset = 10;
    }
    else {
      this.xOffset = 0;
    }
  }
  
}