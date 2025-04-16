import GridCell from './GridCell';

export default class GridMap {
	[key: string]: any;
	private _rows: number;
	private _columns: number;
	private _grid: Array<Array<GridCell>>;
	private _startingPoint: GridCell | null = null;
  private _endingPoint: GridCell | null = null;

	public constructor(rows: number = 10, columns: number = 10) {
		this._rows = rows;
		this._columns = columns;
		this._grid = this.createGrid(rows, columns);
		this._startingPoint = this.getCellAtPos(0, 0);
		this._endingPoint = this.getCellAtPos(columns - 1, rows - 1);
		
	}

	private createGrid(rows: number, columns: number): Array<Array<GridCell>> {
		let grid: Array<Array<GridCell>> = [];
		for (let i: number = 0; i < rows; i++) {
			let row: Array<GridCell> = [];
			for (let j: number = 0; j < columns; j++) {
				row.push(new GridCell(j, i));
			}
			grid.push(row);
		}
		return grid;
	}

	private updateGrid(newRows: number, newColumns: number): void {
		if (newColumns < this._columns) {
			this._grid.forEach((row) => {
				row.splice(newColumns);
			});
		}
		if (newColumns > this._columns) {
			this._grid.forEach((row, i) => {
				for (let j: number = this._columns; j < newColumns; j++) {
					row.push(new GridCell(j, i));
				}
			});
		}
		if (newRows < this._rows) {
			this._grid.splice(newRows);
		}
		if (newRows > this._rows) {
			for (let i: number = this._rows; i < newRows; i++) {
				let row: Array<GridCell> = [];
				for (let j: number = 0; j < newColumns; j++) {
					row.push(new GridCell(j, i));
				}
				this._grid.push(row);
			}
		}
		this.moveStartingPoint(newRows, newColumns);
		this.moveEndingPoint(newRows, newColumns);
	}

	private moveStartingPoint(newRows: number, newColumns: number): void {
		if (this._startingPoint!.posX >= newColumns) {
			this._startingPoint!.posX = newColumns - 1;
		}
		if (this._startingPoint!.posY >= newRows) {
			this._startingPoint!.posY = newRows - 1;
		}
		const newStartingPoint = this.getCellAtPos(this._startingPoint!.posX, this._startingPoint!.posY);
		if (newStartingPoint) {
			newStartingPoint.isObstacle = false;
			newStartingPoint.isStartingPoint = true;
		}	
	}

	private moveEndingPoint(newRows: number, newColumns: number): void {
		if (this._endingPoint!.posX >= newColumns) {
			this._endingPoint!.posX = newColumns - 1;
		}
		if (this._endingPoint!.posY >= newRows) {
			this._endingPoint!.posY = newRows - 1;
		}
		const newEndingPoint = this.getCellAtPos(this._endingPoint!.posX, this._endingPoint!.posY);
		if (newEndingPoint) {
			newEndingPoint.isObstacle = false;
			newEndingPoint.isEndingPoint = true;
		}	
	}

	public get rows(): number {
		return this._rows;
	}

	public set rows(rows: number) {
		if (rows < 5) rows = 5;
		this.updateGrid(rows, this._columns);
		this._rows = rows;
	}

	public get columns(): number {
		return this._columns;
	}

	public set columns(columns: number) {
		if (columns < 5) columns = 5;
		this.updateGrid(this._rows, columns);
		this._columns = columns;
	}

	public get grid(): Array<Array<GridCell>> {
		return this._grid;
	}

	public getCellAtPos(posX: number, posY: number): GridCell | null {
		if (posX >= 0 &&
				posX < this._columns &&
				posY >= 0 &&
				posY < this._rows
			)
			return this._grid[posY][posX];
		return null;
	}

	public toggleObstacle(posX: number, posY: number): void {
		if (this._grid.length <= posY) {
			return;
		}
		if (this._grid[posY].length <= posX) {
			return;
		}
		this._grid[posY][posX].toggleObstacle();
	}

	public setStartingPoint(gridCell: GridCell): void {
		this._startingPoint!.isStartingPoint = false;
		this._startingPoint = gridCell;
		this._startingPoint!.isStartingPoint = true;
	}

	public setEndingPoint(gridCell: GridCell): void {
		this._endingPoint!.isEndingPoint = false;
		this._endingPoint = gridCell;
		this._endingPoint!.isEndingPoint = true;
	}

	public get startingPoint(): GridCell {
		return this._startingPoint!;
	}

	public get endingPoint(): GridCell {
		return this._endingPoint!;
	}

	public clearObstacles(): void {
		for (let i: number = 0; i < this._rows; i++) {
			for (let j: number = 0; j < this._columns; j++) {
				this._grid[i][j].isObstacle = false;
			}
		}
	}

	public addRandomObstacles(): void {
    const obstaclesToCreate = Math.floor(this._rows * this._columns * 0.2);
    
    for (let i = 0; i < obstaclesToCreate; i++) {
        const randomRow = Math.floor(Math.random() * this._rows);
        const randomCol = Math.floor(Math.random() * this._columns);
        const gridCell = this._grid[randomRow][randomCol];
				if (!gridCell.isStartingPoint && !gridCell.isEndingPoint)
        	this._grid[randomRow][randomCol].isObstacle = true;
    }
	}

}
