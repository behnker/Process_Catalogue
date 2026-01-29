import React from 'react';
import type { ProcessNode } from '../lib/types';
import { ProcessTile } from './ProcessTile';


interface LevelColumnProps {
    level: number;
    nodes: ProcessNode[];
    activeNodeId?: string;
    onSelect: (node: ProcessNode) => void;
    onDetail: (node: ProcessNode) => void;
}

export const LevelColumn: React.FC<LevelColumnProps> = ({ level, nodes, activeNodeId, onSelect, onDetail }) => {
    return (
        <div className="flex flex-col w-80 h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex-shrink-0">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between flex-shrink-0">
                <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Level {level}
                </h2>
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                    {nodes.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {nodes.map((node) => (
                    <ProcessTile
                        key={node.id}
                        node={node}
                        isActive={node.id === activeNodeId}
                        onSelect={() => onSelect(node)}
                        onDetail={() => onDetail(node)}
                    />
                ))}
            </div>
        </div>
    );
};
