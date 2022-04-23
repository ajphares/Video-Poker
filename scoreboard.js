
class Scoreboard {
  constructor(x, y, w, h) {
    let bg = "#00004d"
    
    let labelW = w*0.7
    let valueW = w*0.3;
    let boxH = h/(HAND_NAMES.length - 1);


    this.labelHolder = new box(x, y, labelW, h, bg);
    this.valueHolder = new box(x+labelW+5, y, valueW-5, h, bg);
    this.labelBoxes = [];
    this.valueBoxes = [];
    
    
    for (let i = 0; i < HAND_NAMES.length; i++) {
      if (HAND_NAMES[i] != 'Nothing') {
        let label = new textBox(x, y + (boxH*i), labelW,
                                boxH, bg, HAND_NAMES[i], 'yellow', 'left')
        this.labelBoxes.push(label);
        
        let value = new textBox(x+labelW+5, y+ (boxH*i), valueW-5,
                                boxH, bg, HAND_REWARDS[i].toString(), 'yellow',
                                'center')
        this.valueBoxes.push(value);
      }
    }
      
  }
  
  show() {
    stroke('yellow');
    strokeWeight(3);
    this.labelHolder.show();
    this.valueHolder.show();
    noStroke();
    
    for(let i = 0; i < this.labelBoxes.length; i++) {
      textSize(this.labelBoxes[i].height*0.6);
      this.labelBoxes[i].show();
      this.valueBoxes[i].show();
      textSize(12);
    }
  }
  
  resetBgs() {
    for (let i = 0; i < this.labelBoxes.length; i++) {
      this.labelBoxes[i].bg = "#00004d";
      this.valueBoxes[i].bg = "#00004d";
    }
  }
}