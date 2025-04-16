export default class GridCell {
  [key: string]: any;
  private _posX: number;
  private _posY: number;
  private _isObstacle: boolean;
  private _isStartingPoint: boolean;
  private _isEndingPoint: boolean;

  public constructor(posX: number, posY: number) {
    this._posX = posX;
    this._posY = posY;
    this._isObstacle = false;
    this._isStartingPoint = false;
    this._isEndingPoint = false;
  }

  public get posX(): number {
    return this._posX;
  }

  public set posX(posX: number) {
    this._posX = posX;
  }

  public get posY(): number {
    return this._posY;
  }

  public set posY(posY: number) {
    this._posY = posY;
  }

  public get isObstacle(): boolean {
    return this._isObstacle;
  }

  public set isObstacle(isObstacle: boolean) {
    this._isObstacle = isObstacle;
  }

  public get isStartingPoint(): boolean {
    return this._isStartingPoint;
  }

  public set isStartingPoint(isStartingPoint: boolean) {
    this._isStartingPoint = isStartingPoint;
  }

  public get isEndingPoint(): boolean {
    return this._isEndingPoint;
  }

  public set isEndingPoint(isEndingPoint: boolean) {
    this._isEndingPoint = isEndingPoint;
  }

  public toggleObstacle(): void {
    if (this._isStartingPoint || this._isEndingPoint) {
      return;
    }
    
    this._isObstacle = !this._isObstacle;
  }
}
