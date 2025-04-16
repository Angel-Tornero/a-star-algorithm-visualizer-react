import React from 'react';

const InstructionsBox: React.FC = () => {
  return (
    <div className="text-left bg-slate-800 text-sm text-slate-200 p-4 rounded-xl mb-6 border border-slate-700">
      <h3 className="font-semibold mb-2 text-white">🧭 How to use the simulator:</h3>
      <ul className="list-inside space-y-2">
        <li>
          Set the number of <strong>rows</strong>, <strong>columns</strong>, and the <strong>edit radius</strong>.
          <ul className="list-inside ml-4 mt-1 text-slate-400 text-xs">
            <li><strong>Edit Radius</strong> determines how many cells around the clicked cell will be turned into obstacles.</li>
          </ul>
        </li>
        <li>
          Enable <span className="italic">Edit Obstacles</span> to place or drag obstacles on the grid.
          <ul className="list-inside ml-4 mt-1 text-slate-400 text-xs">
            <li>Click to place one, or click and drag to place multiple obstacles.</li>
          </ul>
        </li>
        <li>
          You can move the <strong>start</strong> and <strong>goal</strong> points by dragging them on the grid.
          <ul className="list-inside ml-4 mt-1 text-slate-400 text-xs">
            <li>This is only possible when <span className="italic">Edit Obstacles</span> is disabled.</li>
          </ul>
        </li>
        <li>
          Use <span className="italic">Add Random Obstacles</span> to generate a randomized obstacle layout.
        </li>
        <li>
          Use <span className="italic">Clear Obstacles</span> to remove all obstacles from the grid.
        </li>
        <li>
          Press <span className="italic">Solve Problem</span> to run the A* algorithm and visualize the computation of the shortest path.
        </li>
      </ul>
    </div>
  );
};

export default InstructionsBox;
