import GridMap from './GridMap.ts';
import GridCell from './GridCell.ts';
import GridCellDisplayer from './GridCellDisplayer.ts';

interface ColorCodes {
	explored: string,
	finalPath: string,
}

const COLOR_CODES: ColorCodes = {
  'explored': "rgba(255,0,0,0.4)",
  'finalPath': "rgba(255,255,0,0.4)",
}


export default  class GridMapDisplayer {
	private _canvas: HTMLCanvasElement | null;
	private _gridCellDisplayer: GridCellDisplayer;
	private _cellSize: number = 0;

	public constructor(gridCellDisplayer: GridCellDisplayer, canvas: HTMLCanvasElement | null = null) {
		this._gridCellDisplayer = gridCellDisplayer;
		this._canvas = canvas;
	}

	public display(gridMap: GridMap) {
		const widthLimit: number = this._canvas!.parentElement?.offsetWidth as number;
		const heightLimit: number = this._canvas!.parentElement?.offsetHeight as number;
		const columnRowRatio = gridMap.columns / gridMap.rows;
		let finalWidth: number = 0;
		let finalHeight: number = 0;

		if (widthLimit / heightLimit > columnRowRatio) {
			finalHeight = heightLimit;
			finalWidth = finalHeight * columnRowRatio;
		} else {
			finalWidth = widthLimit;
			finalHeight = finalWidth / columnRowRatio;
		}

		this._canvas!.width = finalWidth;
		this._canvas!.height = finalHeight;
		const context: CanvasRenderingContext2D = this._canvas!.getContext("2d") as CanvasRenderingContext2D;
		this._cellSize = finalHeight / gridMap.rows;
		gridMap.grid.forEach((row) => {
			row.forEach((gridCell) => {
				this._gridCellDisplayer.display(context, gridCell, this._cellSize);
			})
		})
	}

	public get gridCellDisplayer(): GridCellDisplayer {
		return this._gridCellDisplayer;
	}

  public get cellSize(): number {
		return this._cellSize;
	}

	public set cellSize(cellSize: number) {
		this._cellSize = cellSize;
	}

	public set canvas(canvas: HTMLCanvasElement) {
		this._canvas = canvas;
	}

	public highlightCells(cellsArray: GridCell[], type: 'explored' | 'finalPath'): void {
		const context: CanvasRenderingContext2D = this._canvas!.getContext("2d") as CanvasRenderingContext2D;
		const color: string = COLOR_CODES[type];
		cellsArray.forEach((gridCell) => {
			this._gridCellDisplayer.display(context, gridCell, this._cellSize);
			this._gridCellDisplayer.highlightCell(context, gridCell, this._cellSize, color);
		})
	}
}
