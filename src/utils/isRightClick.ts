/**
 * Узнает была ли нажата правая клавиша маши
 * @param event - событие из слушателя
 * @returns была ли нажата правая клавиша мыши
 */
export function isRightClick(event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) {
  if ("which" in event) return event.which === 3;
  else if ("button" in event) return event.button === 2;
  return false;
}
