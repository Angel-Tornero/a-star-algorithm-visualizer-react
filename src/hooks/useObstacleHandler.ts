import { useEffect, useState } from "react";
import GridMap from "../models/GridMap";
import GridMapDisplayer from "../models/GridMapDisplayer";
import ObstacleCursor from "../assets/cursors/ObstacleCursor.png";

const useObstacleHandler = (
  canvas: HTMLCanvasElement | null,
  gridMap: GridMap,
  gridMapDisplayer: GridMapDisplayer,
  active: boolean,
  obstacleEditRadius: number
) => {
  const [cursorImageLoaded, setCursorImageLoaded] = useState<boolean>(false);
  const [obstacleCursorImage, setObstacleCursorImage] = useState<HTMLImageElement>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [initialObstacleState, setInitialObstacleState] = useState<boolean | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = ObstacleCursor;

    img.onload = () => {
      setObstacleCursorImage(img);
      setCursorImageLoaded(true);
    };

    img.onerror = () => {
      console.error("Failed to load the cursor image.");
    };
  }, []);

  useEffect(() => {
    if (!canvas || !active || !cursorImageLoaded) return;

    const getCellPosition = (event: MouseEvent) => {
      let rect = canvas.getBoundingClientRect();
      let cellX = Math.floor((event.clientX - rect.left) / gridMapDisplayer.cellSize);
      let cellY = Math.floor((event.clientY - rect.top) / gridMapDisplayer.cellSize);
      return { cellX, cellY };
    };

    const startDragging = (event: MouseEvent) => {
      setIsDragging(true);
      const { cellX, cellY } = getCellPosition(event);
      const cell = gridMap.getCellAtPos(cellX, cellY);
      if (cell) {
        setInitialObstacleState(cell.isObstacle);
        cell.isObstacle = !cell.isObstacle;
        gridMapDisplayer.display(gridMap);
      }
    };

    const dragToggleObstacle = (event: MouseEvent) => {
      if (!isDragging || initialObstacleState === null) return;
    
      const { cellX, cellY } = getCellPosition(event);
      const radius = obstacleEditRadius - 1;
    
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const distance = Math.sqrt(dx * dx + dy * dy);
    
          // Only modify cells within the circular radius
          if (distance <= radius) {
            const cell = gridMap.getCellAtPos(cellX + dx, cellY + dy);
            if (cell) {
              cell.isObstacle = !initialObstacleState;
            }
          }
        }
      }
    
      gridMapDisplayer.display(gridMap);
    };
    


    const stopDragging = () => {
      setIsDragging(false);
      setInitialObstacleState(null);
      canvas.removeEventListener("mousemove", dragToggleObstacle);
    };

    const changeCursorStyle = (event: MouseEvent) => {
      const { cellX, cellY } = getCellPosition(event);
      const pointingObstacle = gridMap.getCellAtPos(cellX, cellY)?.isObstacle;
      canvas.style.cursor = pointingObstacle
        ? "not-allowed"
        : `url(${(obstacleCursorImage as HTMLImageElement).src}), auto`;
    };

    canvas.addEventListener("mousedown", startDragging);
    canvas.addEventListener("mousemove", dragToggleObstacle);
    canvas.addEventListener("mouseleave", stopDragging);
    canvas.addEventListener("mouseup", stopDragging);
    canvas.addEventListener("mousemove", changeCursorStyle);

    return () => {
      canvas.removeEventListener("mousedown", startDragging);
      canvas.removeEventListener("mousemove", dragToggleObstacle);
      canvas.removeEventListener("mouseup", stopDragging);
      canvas.removeEventListener("mousemove", changeCursorStyle);
      canvas.style.cursor = "initial";
    };
  }, [canvas, gridMap, gridMapDisplayer, active, cursorImageLoaded, isDragging, initialObstacleState]);
};

export default useObstacleHandler;
