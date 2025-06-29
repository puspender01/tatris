import React from 'react';

export const GameControls: React.FC = () => {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
      <h3 className="text-cyan-400 text-sm font-bold mb-3 text-center">CONTROLS</h3>
      <div className="space-y-2 text-xs text-gray-300">
        <div className="flex justify-between">
          <span>Move:</span>
          <span className="text-white">← →</span>
        </div>
        <div className="flex justify-between">
          <span>Rotate:</span>
          <span className="text-white">↑</span>
        </div>
        <div className="flex justify-between">
          <span>Soft Drop:</span>
          <span className="text-white">↓</span>
        </div>
        <div className="flex justify-between">
          <span>Hard Drop:</span>
          <span className="text-white">SPACE</span>
        </div>
        <div className="flex justify-between">
          <span>Hold:</span>
          <span className="text-white">C</span>
        </div>
        <div className="flex justify-between">
          <span>Pause:</span>
          <span className="text-white">P</span>
        </div>
      </div>
    </div>
  );
};