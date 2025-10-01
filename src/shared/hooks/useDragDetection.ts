import {useEffect, useState} from 'react';

/**
 * Threshold from which mouse movement with pressed mouse button
 * is considered a drag instead of a click.
 */
const MoveDragThreshold = 10;

export const useDragDetection = (): {
  onMouseDown: () => void;
  isDragging: boolean;
} => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let mouseMove = 0;

    function handleMouseUp(): void {
      setIsMouseDown(false);
    }

    function handleMouseMove(e: MouseEvent): void {
      mouseMove += Math.abs(e.movementX) + Math.abs(e.movementY);
      setIsDragging(mouseMove > MoveDragThreshold);
    }

    if (isMouseDown) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseDown]);

  function handleMouseDown(): void {
    setIsMouseDown(true);
    setIsDragging(false);
  }

  return {
    onMouseDown: handleMouseDown,
    isDragging,
  };
};
