const SUITS = ["c", "s", "d", "h"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const HAND_NAMES = ['Royal Flush', 'Straight Flush', '4 Aces w 2,3,or 4', '4 2,3,or4 w A-4', '4 Aces', '4 2,3,or4', '4 5-K', 'Full House', 'Flush', 'Straight', '3 of a Kind', 'Two Pair', 'Jacks or Better', 'Nothing'];
const HAND_REWARDS = [4000, 250, 2000, 800, 800, 400, 250, 30, 25, 20, 15, 5, 5, 0];

const openingHand = 'random';