
class pokerHand {
  constructor(hand_type = "random") {
    //hand_type: allow user to choose a type of hand (for debugging purposes)
    this.deck = new Deck();
    this.cards = [];
    this.handIndex = undefined;
    this.handName = undefined;

    if (hand_type == "random") {
      for (let i = 0; i < 5; i++) {
        this.cards.push(this.deck.drawCard());
      }
    } else if (hand_type == "flush") {
      this.cards = [
        this.deck.drawSpecificCard('3s'),
        this.deck.drawSpecificCard('5s'),
        this.deck.drawSpecificCard('4s'),
        this.deck.drawSpecificCard('6s'),
        this.deck.drawSpecificCard('9s')
      ];
    } else if (hand_type == "straight") {
      this.cards = [
        this.deck.drawSpecificCard('2s'),
        this.deck.drawSpecificCard('Ad'),
        this.deck.drawSpecificCard('5c'),
        this.deck.drawSpecificCard('3d'),
        this.deck.drawSpecificCard('4h')
      ];
    } else if (hand_type == "royal") {
      this.cards = [
        this.deck.drawSpecificCard('Ks'),
        this.deck.drawSpecificCard('Qs'),
        this.deck.drawSpecificCard('As'),
        this.deck.drawSpecificCard('Ts'),
        this.deck.drawSpecificCard('Js')
      ];
    } else if (hand_type == 'arb') {
      this.cards = [
        this.deck.drawSpecificCard('Qs'),
        this.deck.drawSpecificCard('Jc'),
        this.deck.drawSpecificCard('6d'),
        this.deck.drawSpecificCard('3h'),
        this.deck.drawSpecificCard('Ts')
      ];
    } else {
      throw new Error("hand_type "+hand_type+" not implemented.")
    }
    
    this.updateEval();
    
  }
  
  updateEval() {
    this.handIndex = this.evalHand();
    this.handName = HAND_NAMES[this.handIndex];
    if (myScoreboard != undefined && this.handIndex != 13) {
      myScoreboard.labelBoxes[this.handIndex].updateBg('#b51414');
      myScoreboard.valueBoxes[this.handIndex].updateBg('#b51414');
    }
  }

  clearOffsets() {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].xOffset = 0;
    }
  }

  isFlush() {
    let suits = [];
    for (let i = 0; i < this.cards.length; i++) {
      suits.push(this.cards[i].suit);
    }
    
    // check for number of unique suits
    return [...new Set(suits)].length == 1

  }

  isStraight() {
    let rankInts = [];
    for (let i = 0; i < this.cards.length; i++) {
      rankInts.push(this.cards[i].rankInt);
    }
    let minRank = Math.min(...rankInts);
    let maxRank = Math.max(...rankInts);

    // check for 5 distinct ranks where max rank - min rank == 4.
    if ([...new Set(rankInts)].length == 5) {
      if (maxRank - minRank == 4) {
        return true;
      }
      if (minRank == 0) {
        // Handle edge case for Ace being high or low.
        // change the rankInt of an Ace from 0 to 13 and
        // then run the same check again
        rankInts.splice(rankInts.indexOf(0), 1, 13);
        let minRank = Math.min(...rankInts);
        let maxRank = Math.max(...rankInts);
        if (maxRank - minRank == 4) {
          return true;
        }
      }
    }

    return false;
  }
  
  isXoak(x) {
    // is X of a kind
    for (let i = 0; i < this.cards.length; i++) {
      if (this.countRank(this.cards[i].rank) == x) {
        return true;
      }
    }
    return false;
  }
  
  countRank(inputRank) {
    let count = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].rank == inputRank) {
        count++;
      }
    }
    return count;
  }
  
  
  evalHand() {
    //nasty business
    let handRanks = [];

    for (let card of this.cards) {
      handRanks.push(card.rank);
    }
    if (this.isFlush() && this.isStraight()) {
      if (handRanks.includes('A') && handRanks.includes('K')) {
        return 0
      } else {
        return 1
      }
    }
    if(this.countRank('A') == 4) {
      if (handRanks.includes('2') ||
          handRanks.includes('3') ||
          handRanks.includes('4')) {
        return 2
      } else {
        return 4
      }
    }
    if (this.countRank('2') == 4 ||
        this.countRank('3') == 4 ||
        this.countRank('4') == 4) {
      if (handRanks.includes('A') ||
          handRanks.includes('2') ||
          handRanks.includes('3') ||
          handRanks.includes('4')) {
          return 3
        
      } else {
        return 5
      }
    }
    if (this.isXoak(4)) {
      // all of the special 4 of a kinds have been checked above
      // so if we've reached this code and it is 4oak it's rank 5-K
      return 6
    }
    
    if ([...new Set(handRanks)].length == 2) {
      // a hand that is not 4oak that has only 2 unique ranks
      // must be a full house
      return 7
    }
    if (this.isFlush()) {
      return 8
    }
    if (this.isStraight()) {
      return 9
    }
    if (this.isXoak(3)) {
      return 10
    }
    if ([...new Set(handRanks)].length == 3) {
      return 11
    }
    for (let rank of ['J', 'K', 'Q', 'A']) {
      if (this.countRank(rank) == 2) {
        return 12
      }
    }
       
    return 13
  }
  
}