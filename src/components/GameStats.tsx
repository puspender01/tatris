import React from 'react';

interface GameStatsProps {
  score: number;
  lines: number;
  level: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ score, lines, level }) => {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-gray-600 space-y-4">
      <div className="text-center">
        <h3 className="text-cyan-400 text-lg font-bold mb-2">STATISTICS</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">SCORE</span>
          <span className="text-white font-mono text-lg">{score.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">LINES</span>
          <span className="text-white font-mono text-lg">{lines}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">LEVEL</span>
          <span className="text-white font-mono text-lg">{level}</span>
        </div>
      </div>
    </div>
  );
};