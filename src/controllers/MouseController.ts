class MouseControl {
  private isMouseDown = false;
  
  mouseDown() {
    this.isMouseDown = true;
  }

  mouseUp() {
    this.isMouseDown = false;
  }

  isDown() {
    return this.isMouseDown;
  }
}

export const MouseController = new MouseControl();