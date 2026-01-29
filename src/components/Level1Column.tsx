import React from 'react';
import type { ProcessNode } from '../lib/types';
import { Level2Card } from './Level2Card';

interface Level1ColumnProps {
    node: ProcessNode;
    onViewInfo: (node: ProcessNode) => void;
}

export const Level1Column: React.FC<Level1ColumnProps> = ({ node, onViewInfo }) => {
    return (
        <div className="flex-shrink-0 w-72 flex flex-col gap-2">
            {/* Level 1 Header */}
            <div className="pb-2 border-b-2 border-gray-100 mb-2 flex justify-between items-center group">
                <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide truncate" title={node.title}>
                    {node.title}
                </h3>
                {/* Optional: Info button for L1 itself */}
                <button
                    onClick={() => onViewInfo(node)}
                    className="text-xs text-blue-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    Details
                </button>
            </div>

            {/* Level 2 Stack */}
            <div className="flex flex-col gap-1">
                {node.children.map(child => (
                    <Level2Card
                        key={child.id}
                        node={child}
                        onViewInfo={onViewInfo}
                    />
                ))}
            </div>
        </div>
    );
};
