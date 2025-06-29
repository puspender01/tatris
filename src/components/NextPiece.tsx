import React from 'react';
import { Tetromino } from '../types/game';
import { CELL_SIZE } from '../game/constants';

interface NextPieceProps {
  piece: Tetromino | null;
}

export const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
  if (!piece) return null;

  const renderPiece = () => {
    return piece.shape.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className="border border-gray-700"
            style={{
              width: CELL_SIZE * 0.8,
              height: CELL_SIZE * 0.8,
              backgroundColor: cell ? piece.color : 'rgba(0, 0, 0, 0.3)',
              boxShadow: cell ? `0 0 8px ${piece.color}40` : 'none',
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
      <h3 className="text-white text-sm font-bold mb-2 text-center">NEXT</h3>
      <div className="flex justify-center">
        <div>{renderPiece()}</div>
      </div>
    </div>
  );
};