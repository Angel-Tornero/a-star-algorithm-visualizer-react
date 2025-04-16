import '../../App.css';

import InputNumber from '../ui/InputNumber';
import InputButton from '../ui/InputButton';
import GridMap from '../../models/GridMap';
import GridCell from '../../models/GridCell';
import AStarSearch from '../../models/AStarSearch';
import GridMapDisplayer from '../../models/GridMapDisplayer';
import InstructionsBox from './InstructionsBox';
import FooterInfo from './FooterInfo';


interface SettingsPannelProps {
	className?: string;
  rows: number;
  setRows: (value: number) => void;
  columns: number;
  setColumns: (value: number) => void;
  editingObstacles: boolean;
  setEditingObstacles: (value: boolean) => void;
  obstacleEditRadius: number;
  setObstacleEditRadius: (value: number) => void;
  pathSolution: GridCell[] | null,
  setPathSolution: (value: GridCell[] | null) => void;
  gridMap: GridMap;
  gridMapDisplayer: GridMapDisplayer,
}

const SettingsPannel: React.FC<SettingsPannelProps> = ({ 
  className = '',
  rows,
  setRows,
  columns,
  setColumns,
  editingObstacles,
  setEditingObstacles,
  obstacleEditRadius,
  setObstacleEditRadius,
  setPathSolution,
  gridMap,
  gridMapDisplayer
}) => {

  const handleSolve = async () => {
    try {
      const solution = await AStarSearch.solve(gridMap, gridMapDisplayer);
      setPathSolution(solution);
    } catch (error) {
      console.error("Error solving the path:", error);
      setPathSolution(null);
    }
  };

  return (
    <>
      <div
        id="settings-pannel"
        className={`
          flex flex-col
          border-r border-slate-700
          bg-slate-900 text-white
          px-6 py-8
          h-full
          fixed md:static top-0 left-0 z-40
          overflow-y-auto
          md:w-[450px] w-full
          min-w-[250px] max-w-full
          ${className}
        `}
      >
        <InstructionsBox />

        <InputNumber
          string="Rows"
          defaultValue={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="mb-5"
          min={5}
        />
        <InputNumber
          string="Columns"
          defaultValue={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className="mb-5"
          min={5}
        />
        <InputNumber
          string="Edit Radius"
          defaultValue={obstacleEditRadius}
          onChange={(e) => setObstacleEditRadius(Number(e.target.value))}
          className="mb-10"
          min={1}
        />

        <InputButton
          string={editingObstacles ? "Stop Editing Obstacles" : "Edit Obstacles"}
          onClick={() => setEditingObstacles(!editingObstacles)}
          className={editingObstacles
            ? "!text-sm !bg-green-700 hover:!bg-green-800"
            : "!text-sm !bg-gray-500 hover:!bg-gray-600"
          }
        />
        <InputButton
          string="Add Random Obstacles"
          onClick={() => {
            gridMap.addRandomObstacles();
            gridMapDisplayer.display(gridMap);
          }}
          className="!bg-amber-600 hover:!bg-amber-700 mt-5 !text-sm"
        />
        <InputButton
          string="Clear Obstacles"
          onClick={() => {
            gridMap.clearObstacles();
            gridMapDisplayer.display(gridMap);
          }}
          className="!bg-red-500 hover:!bg-red-600 mt-5 !text-sm"
        />
        <InputButton
          string="Solve Problem"
          onClick={handleSolve}
          className="!bg-blue-500 hover:!bg-blue-600 mt-5 !text-sm"
        />

        <FooterInfo />
      </div>
    </>
  )
}

export default SettingsPannel
