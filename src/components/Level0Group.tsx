import React from 'react';
import type { ProcessNode } from '../lib/types';
import { Level1Column } from './Level1Column';
import { APP_CONFIG } from '../config/constants';
import clsx from 'clsx';
import { Info } from 'lucide-react';

interface Level0GroupProps {
    node: ProcessNode;
    onViewInfo: (node: ProcessNode) => void;
}

export const Level0Group: React.FC<Level0GroupProps> = ({ node, onViewInfo }) => {
    // Resolve color class
    const colorClass = node.color || APP_CONFIG.COLORS.LEVEL_0.DEFAULT;

    return (
        <div className="flex flex-col gap-4">
            {/* Level 0 Header Box */}
            <div className={clsx("p-4 rounded-lg border shadow-sm min-w-[300px]", colorClass)}>
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-bold opacity-60 uppercase tracking-widest block mb-1">Level 0</span>
                        <h2 className="text-xl font-bold leading-tight">{node.title}</h2>
                    </div>
                    <button
                        onClick={() => onViewInfo(node)}
                        className="p-1.5 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                        title="View Details"
                    >
                        <Info size={18} />
                    </button>
                </div>
            </div>

            {/* Level 1 Columns Container (Horizontal) */}
            <div className="flex flex-row gap-6 pl-2">
                {node.children.map(child => (
                    <Level1Column
                        key={child.id}
                        node={child}
                        onViewInfo={onViewInfo}
                    />
                ))}
            </div>
        </div>
    );
};
