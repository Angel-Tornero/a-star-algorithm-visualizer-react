import GridCell from './GridCell.ts';


export default class GridCellDisplayer {
  private _obstacleImage: HTMLImageElement;
  private _startingPointImage: HTMLImageElement;
  private _endingPointImage: HTMLImageElement;
  private _cellImage: HTMLImageElement;

  public constructor(
    obstacleImage: HTMLImageElement = new Image(),
    startingPointImage: HTMLImageElement = new Image(),
    endingPointImage: HTMLImageElement = new Image(),
    cellImage: HTMLImageElement = new Image()
  ) {
    this._obstacleImage = obstacleImage;
    this._startingPointImage = startingPointImage;
    this._endingPointImage = endingPointImage;
    this._cellImage = cellImage;
  }

	public display(context: CanvasRenderingContext2D, cell: GridCell, cellSize: number): void {
    const posX = cell.posX * cellSize;
    const posY = cell.posY * cellSize;

    context.drawImage(this._cellImage, posX, posY, cellSize, cellSize);

    context.strokeStyle = "rgba(255,0,0,0.2)";
    context.strokeRect(posX, posY, cellSize, cellSize);

    if (cell.isStartingPoint) {
        context.drawImage(this._startingPointImage, posX, posY, cellSize, cellSize);
    }
    else if (cell.isEndingPoint) {
        context.drawImage(this._endingPointImage, posX, posY, cellSize, cellSize);
    }
    else if (cell.isObstacle) {
        context.drawImage(this._obstacleImage, posX, posY, cellSize, cellSize);
    }
}

  public setObstacleImage(image: HTMLImageElement): void {
    this._obstacleImage = image;
  }

  public setStartingPointImage(image: HTMLImageElement): void {
    this._startingPointImage = image;
  }

  public setEndingPointImage(image: HTMLImageElement): void {
    this._endingPointImage = image;
  }

  public highlightCell(context: CanvasRenderingContext2D, cell: GridCell, cellSize: number, color: string): void {
    context.fillStyle = color;
    context.fillRect(cell.posX * cellSize, cell.posY * cellSize, cellSize, cellSize);
  }

    public setCellImage(image: HTMLImageElement): void {
      this._cellImage = image;
    }
  
}
