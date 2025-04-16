import { useEffect, useRef, useState } from "react";
import "../../App.css";

import GridMap from "../../models/GridMap.ts";
import GridCell from "../../models/GridCell.ts";
import GridMapDisplayer from "../../models/GridMapDisplayer.ts";

import useObstacleHandler from "../../hooks/useObstacleHandler";
import useDragAndDropHandler from "../../hooks/useDragAndDropHandler";

import GrassTop from "../../assets/GrassTop.png";
import Obstacle from "../../assets/Obstacle.png";
import Avatar from "../../assets/Avatar.png";
import Goal from "../../assets/Goal.png";


interface GridMapCanvasProps {
  className?: string;
  rows: number;
  columns: number;
  editingObstacles: boolean;
  obstacleEditRadius: number;
  gridMap: GridMap;
  gridMapDisplayer: GridMapDisplayer,
  pathSolution: GridCell[] | null;
}

const GridMapCanvas: React.FC<GridMapCanvasProps> = ({ className = '', rows, columns, editingObstacles, obstacleEditRadius, gridMap, gridMapDisplayer, pathSolution }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Init objects
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const gridCellDisplayer = gridMapDisplayer.gridCellDisplayer;

  useObstacleHandler(canvasRef.current, gridMap, gridMapDisplayer, editingObstacles, obstacleEditRadius);
  useDragAndDropHandler(canvasRef.current, gridMap, gridMapDisplayer, editingObstacles);

  // Init images
  const grassTextureImage: HTMLImageElement = new Image();
  const obstacleImage: HTMLImageElement = new Image();
  const avatarImage: HTMLImageElement = new Image();
  const goalImage: HTMLImageElement = new Image();
  grassTextureImage.src = GrassTop;
  obstacleImage.src = Obstacle;
  avatarImage.src = Avatar;
  goalImage.src = Goal;

  // Manage image loading

  useEffect(() => {
    let imagesToLoad = 4;
    const onImageLoad = () => {
      imagesToLoad -= 1;
      if (imagesToLoad === 0) {
        setImagesLoaded(true);
      }
    };

    grassTextureImage.onload = onImageLoad;
    obstacleImage.onload = onImageLoad;
    avatarImage.onload = onImageLoad;
    goalImage.onload = onImageLoad;
  }, []);

  // Update the images in GridCellDisplayer when they are loaded

  useEffect(() => {
    if (imagesLoaded) {
      gridCellDisplayer.setObstacleImage(obstacleImage);
      gridCellDisplayer.setStartingPointImage(avatarImage);
      gridCellDisplayer.setEndingPointImage(goalImage);
      gridCellDisplayer.setCellImage(grassTextureImage);
    }
  }, [imagesLoaded]);

  // Manage re-drawing of canvas when any parameter is updated

  useEffect(() => {
    if (!canvasRef.current || !imagesLoaded) return;
    gridMap.rows = rows;
    gridMap.columns = columns;
    gridMapDisplayer.display(gridMap);
  }, [rows, columns, imagesLoaded]);

  // Highlight path when it is computed

  useEffect(() => {
    if (!pathSolution) return;
    gridMapDisplayer.highlightCells(pathSolution, 'finalPath');
  }, [pathSolution]);

  useEffect(() => {
    if (!canvasRef.current) return;
    gridMapDisplayer.canvas = canvasRef.current;
  }, [canvasRef.current]);

  return (
    <div className={`flex-grow inline-block align-middle ${className}`}>
      <canvas className="ml-auto mr-auto" ref={canvasRef} />
    </div>
  );
}

export default GridMapCanvas;
