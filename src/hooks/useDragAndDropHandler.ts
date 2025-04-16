import { useEffect, useRef, useState } from 'react';
import GridCell from '../models/GridCell';
import GridMap from '../models/GridMap';
import GridMapDisplayer from '../models/GridMapDisplayer';
import AvatarCursor from '../assets/cursors/AvatarCursor.png';
import GoalCursor from '../assets/cursors/GoalCursor.png';

interface PointAttributes {
  boolean: string;
  setter: string;
  cursorImage: HTMLImageElement;
}


const useDragAndDropHandler = (
  canvas: HTMLCanvasElement | null,
  gridMap: GridMap,
  gridMapDisplayer: GridMapDisplayer,
  editingObstacle: boolean,
) => {
  const [startingCursorImageLoaded, setStartingCursorImageLoaded] = useState<boolean>(false);
  const [startingCursorImage, setStartingCursorImage] = useState<HTMLImageElement>();
  const [endingCursorImageLoaded, setEndingCursorImageLoaded] = useState<boolean>(false);
  const [endingCursorImage, setEndingCursorImage] = useState<HTMLImageElement>();
  const draggingElement = useRef<PointAttributes | null>(null);
  const dragOriginCell = useRef<GridCell | null>(null);

  const startingPointAttributes: PointAttributes = {
    boolean: "isStartingPoint",
    setter: "setStartingPoint",
    cursorImage: startingCursorImage as HTMLImageElement,
  }

  const endingPointAttributes: PointAttributes = {
    boolean: "isEndingPoint",
    setter: "setEndingPoint",
    cursorImage: endingCursorImage as HTMLImageElement,
  }


  useEffect(() => {
    const img = new Image();
    img.src = AvatarCursor;

    img.onload = () => {
      setStartingCursorImage(img);
      setStartingCursorImageLoaded(true);
    };

    img.onerror = () => {
      console.error("Failed to load the cursor image.");
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = GoalCursor;

    img.onload = () => {
      setEndingCursorImage(img);
      setEndingCursorImageLoaded(true);
    };

    img.onerror = () => {
      console.error("Failed to load the cursor image.");
    };
  }, []);

  const dragEventFunction = useRef<(event: MouseEvent) => void>(() => {});
  const dropEventFunction = useRef<(event: MouseEvent) => void>(() => {});
  const changeCursorEventFunction = useRef<(event: MouseEvent) => void>(() => {});

  useEffect(() => {
    if (!canvas || !startingCursorImageLoaded || !endingCursorImageLoaded) return;
    const getCellPosition = (event: MouseEvent): [number, number] => {
      const rect = canvas?.getBoundingClientRect();
      const scaleX = canvas?.width / (rect?.width || 1);
      const scaleY = canvas?.height / (rect?.height || 1);
      const x = (event.clientX - (rect?.left || 0)) * scaleX!;
      const y = (event.clientY - (rect?.top || 0)) * scaleY!;
      const cellSize: number = gridMapDisplayer.cellSize;
      return [Math.floor(x / cellSize), Math.floor(y / cellSize)];
    };

    const dragItem = (event: MouseEvent): void => {
      let [cellX, cellY] = getCellPosition(event);
      const cell: GridCell = gridMap.getCellAtPos(cellX, cellY)!;
      if (cell.isStartingPoint) {
        handleDragStart(cell, startingPointAttributes);
      } else if (cell.isEndingPoint) {
        handleDragStart(cell, endingPointAttributes);
      }
    };

    const handleDragStart = (cell: GridCell, attributes: PointAttributes) => {
      draggingElement.current = attributes;
      dragOriginCell.current = cell;
      cell[attributes.boolean] = false;
      gridMapDisplayer.display(gridMap);
      canvas.removeEventListener('mousemove', changeCursorEventFunction.current);
      canvas.style.cursor = `url(${attributes.cursorImage.src}), auto`;
      canvas.addEventListener('mouseup', dropEventFunction.current);
    };

    const dropItem = (event: MouseEvent): void => {
      let [cellX, cellY] = getCellPosition(event);
      const cell: GridCell = gridMap.getCellAtPos(cellX, cellY)!;
      if (!cell.isObstacle && !cell.isStartingPoint && !cell.isEndingPoint) {
        gridMap[draggingElement.current!.setter](cell);
      } else {
        dragOriginCell.current![draggingElement.current!.boolean] = true;
      }
      
      gridMapDisplayer.display(gridMap);
      canvas.removeEventListener('mouseup', dropEventFunction.current);
      canvas.addEventListener('mousemove', changeCursorEventFunction.current);
      canvas.style.cursor = 'pointer';
    };

    const changeCursor = (event: MouseEvent): void => {
      let [cellX, cellY] = getCellPosition(event);
      const cell: GridCell = gridMap.getCellAtPos(cellX, cellY)!;
      if (cell.isStartingPoint || cell.isEndingPoint) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'initial';
      }
    };

    dragEventFunction.current = dragItem;
    dropEventFunction.current = dropItem;
    changeCursorEventFunction.current = changeCursor;

    const activateHandler = (): void => {
      if (canvas && !editingObstacle) {
        canvas.addEventListener('mousedown', dragEventFunction.current);
        canvas.addEventListener('mousemove', changeCursorEventFunction.current);
      }
    };

    const removeHandler = (): void => {
      if (canvas) {
        canvas.removeEventListener('mousedown', dragEventFunction.current);
        canvas.removeEventListener('mousemove', changeCursorEventFunction.current);
        canvas.style.cursor = 'initial';
      }
    };

    // Only activate if we are not editing obstacles
    if (!editingObstacle) {
      activateHandler();
    } else {
      removeHandler();
    }

    return () => {
      removeHandler(); // clean when the component is dismounted
    };
  }, [canvas, gridMap, gridMapDisplayer, editingObstacle, startingCursorImageLoaded, endingCursorImageLoaded]);

};

export default useDragAndDropHandler;
