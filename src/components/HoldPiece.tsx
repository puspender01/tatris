import React from 'react';
import { Tetromino } from '../types/game';
import { CELL_SIZE } from '../game/constants';

interface HoldPieceProps {
  piece: Tetromino | null;
  canHold: boolean;
}

export const HoldPiece: React.FC<HoldPieceProps> = ({ piece, canHold }) => {
  const renderPiece = () => {
    if (!piece) {
      return (
        <div className="w-24 h-16 flex items-center justify-center text-gray-500 text-xs">
          Empty
        </div>
      );
    }

    return piece.shape.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`border border-gray-700 transition-opacity ${
              !canHold ? 'opacity-50' : ''
            }`}
            style={{
              width: CELL_SIZE * 0.8,
              height: CELL_SIZE * 0.8,
              backgroundColor: cell ? piece.color : 'rgba(0, 0, 0, 0.3)',
              boxShadow: cell && canHold ? `0 0 8px ${piece.color}40` : 'none',
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
      <h3 className="text-white text-sm font-bold mb-2 text-center">HOLD</h3>
      <div className="flex justify-center">
        <div>{renderPiece()}</div>
      </div>
    </div>
  );
};