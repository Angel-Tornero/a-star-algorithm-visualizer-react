import GridMap from './GridMap';
import GridCell from './GridCell';
import GridMapDisplayer from './GridMapDisplayer';

const DISTANCE_BETWEEN_NODES = 1;


export default class AStarSearch {

  public static async solve(gridMap: GridMap, gridMapDisplayer: GridMapDisplayer): Promise<GridCell[] | null> {
    gridMapDisplayer.display(gridMap);
    const startNode: GridCell = gridMap.startingPoint;
    const endNode: GridCell = gridMap.endingPoint;
    const gScore: Map<GridCell, number> = new Map();
    const fScore: Map<GridCell, number> = new Map();
    const pathMap: Map<GridCell, GridCell> = new Map();
    const openSet: GridCell[] = [startNode];

    gScore.set(startNode, 0);
    fScore.set(startNode, this.heuristicFunction(startNode, endNode));

    while (openSet.length > 0) {
      await this.sleep(25);
      gridMapDisplayer.highlightCells(openSet, 'explored');
      this.putLowestAtFirst(openSet, fScore);
      const current = openSet[0];
      if (current === endNode) {
        return this.buildPath(pathMap, current);
      }

      openSet.shift();

      const neighbours = this.getNeighbours(current, gridMap);
      for (const neighbour of neighbours) {
        const tentativeGScore = (gScore.get(current) ?? Number.POSITIVE_INFINITY) + DISTANCE_BETWEEN_NODES;

        if (tentativeGScore < (gScore.get(neighbour) ?? Number.POSITIVE_INFINITY)) {
          pathMap.set(neighbour, current);
          gScore.set(neighbour, tentativeGScore);
          fScore.set(neighbour, tentativeGScore + this.heuristicFunction(neighbour, endNode));

          if (!openSet.includes(neighbour)) {
            openSet.push(neighbour);
          }
        }
      }
    }

    return null;
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static buildPath(pathMap: Map<GridCell, GridCell>, endNode: GridCell): GridCell[] {
    const path: GridCell[] = [endNode];
    let currentNode = endNode;
  
    while (pathMap.has(currentNode)) {
      currentNode = pathMap.get(currentNode)!;
      path.unshift(currentNode);
    }
  
    return path;
  }

  private static putLowestAtFirst(set: GridCell[], fScore: Map<GridCell, number>): void {
    if (set.length === 0) return;
  
    let minIndex: number = 0;
    let minValue: number = fScore.get(set[0]) ?? Infinity;
  
    for (let i = 1; i < set.length; i++) {
      const value: number = fScore.get(set[i]) ?? Infinity;
      if (value <= minValue) {
        minValue = value;
        minIndex = i;
      }
    }
  
    if (minIndex > 0) {
      [set[0], set[minIndex]] = [set[minIndex], set[0]];
    }
  }

  private static getNeighbours(node: GridCell, map: GridMap): GridCell[] {
    const neighbours: GridCell[] = [];
    const directions = [
      { x: -1, y: 0 }, // Up
      { x: 1, y: 0 },  // Down
      { x: 0, y: -1 }, // Left
      { x: 0, y: 1 }   // Right
    ];
  
    for (const { x, y } of directions) {
      const neighbourNode = map.getCellAtPos(node.posX + x, node.posY + y);
      if (neighbourNode && !neighbourNode.isObstacle) {
        neighbours.push(neighbourNode);
      }
    }
    return neighbours;
  }
  
  private static heuristicFunction(node: GridCell, finalNode: GridCell): number {
    return Math.sqrt(
        Math.pow(node.posX - finalNode.posX, 2) + Math.pow(node.posY - finalNode.posY, 2)
    );
}

}
