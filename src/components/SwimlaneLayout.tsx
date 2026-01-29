import React from 'react';
import type { ProcessNode } from '../lib/types';
import { Level0Group } from './Level0Group';

interface SwimlaneLayoutProps {
    nodes: ProcessNode[];
    onViewInfo: (node: ProcessNode) => void;
}

export const SwimlaneLayout: React.FC<SwimlaneLayoutProps> = ({ nodes, onViewInfo }) => {
    return (
        <div className="flex flex-row overflow-x-auto h-full p-6 gap-12 snap-x">
            {nodes.map(node => (
                <div key={node.id} className="snap-start flex-shrink-0">
                    <Level0Group node={node} onViewInfo={onViewInfo} />
                    {/* Visual Separator */}
                    <div className="h-full border-r border-dashed border-gray-200 mx-6 absolute top-0 -right-6 h-[90%] mt-[5%] hidden last:hidden" />
                </div>
            ))}

            {/* Padding at end */}
            <div className="w-20 flex-shrink-0" />
        </div>
    );
};
