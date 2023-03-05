/**
 * Класс, отслеживающий зажата ли мышь у пользователя
 */
class MouseController {
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

export const mouseController = new MouseController();
