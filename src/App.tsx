import { useState } from 'react';

import SettingsPannel from './components/layout/SettingsPannel.tsx';
import GridMapCanvas from './components/map/GridMapCanvas.tsx';
import GridMap from './models/GridMap.ts';
import GridMapDisplayer from './models/GridMapDisplayer.ts';
import GridCell from './models/GridCell.ts';
import GridCellDisplayer from './models/GridCellDisplayer.ts';

import './App.css';



function App() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [editingObstacles, setEditingObstacles] = useState(false);
  const [obstacleEditRadius, setObstacleEditRadius] = useState(1);
  const [pathSolution, setPathSolution] = useState<GridCell[] | null>(null);
  const [gridMap] = useState(new GridMap(rows, columns));
  const [gridCellDisplayer] = useState(new GridCellDisplayer());
  const [gridMapDisplayer] = useState(new GridMapDisplayer(gridCellDisplayer));

  return (
    <>
      <div className="flex w-screen h-screen">
        <SettingsPannel
          rows={rows} setRows={setRows}
          columns={columns} setColumns={setColumns}
          editingObstacles={editingObstacles} setEditingObstacles={setEditingObstacles}
          obstacleEditRadius={obstacleEditRadius} setObstacleEditRadius={setObstacleEditRadius}
          pathSolution={pathSolution} setPathSolution={setPathSolution}
          gridMap={gridMap}
          gridMapDisplayer={gridMapDisplayer}/>
        <GridMapCanvas className="mt-10 mb-10 bg-bl"
          rows={rows}
          columns={columns}
          editingObstacles={editingObstacles}
          obstacleEditRadius={obstacleEditRadius}
          gridMap={gridMap}
          gridMapDisplayer={gridMapDisplayer}
          pathSolution={pathSolution}/>
      </div>
    </>
  )

}

export default App
