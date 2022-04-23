class box {
  
  constructor(x, y, w, h, bg) {
    
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.bg = bg;

  }
  
  show() {
    fill(this.bg);
    rect(this.x, this.y, this.width, this.height);
  }
  
  ifClicked(x, y) {

    let boundaryLeft = this.x;
    let boundaryUp = this.y;
    let boundaryRight = boundaryLeft + this.width;
    let boundaryDown = boundaryUp + this.height;
    
    if (x > boundaryLeft && x < boundaryRight &&
        y > boundaryUp && y < boundaryDown) {
      return true;
    }
    return false
  }
  
  
}

class textBox extends box {
  constructor(x, y, w, h, bg, text, textColor, textAlignment='left') {
    super(x, y, w, h, bg);
    
    if (textAlignment == 'left') {
      this.hAlign = LEFT
      this.textX = this.x+5
    } else if (textAlignment == 'center') {
      this.hAlign = CENTER
      this.textX = this.x+(this.width/2)
    } else {
      throw new Error ('Invalid text alignment option')
    }
    this.text = text;
    this.vAlign=CENTER;
    this.textColor = textColor
  }
  
  show() {
    fill(this.bg);
    rect(this.x, this.y, this.width, this.height);
    fill(this.textColor);
    textAlign(this.hAlign, this.vAlign);
    text(this.text, this.textX, this.y + this.height/2);
  }
  
  updateBg(bg) {
    this.bg = bg
  }
  updateTextColor(color) {
    this.textColor = color;
  }
}
