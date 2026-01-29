import React from 'react';
import type { ProcessNode } from '../lib/types';
import { ChevronRight, Info } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ProcessTileProps {
    node: ProcessNode;
    isActive: boolean;
    onSelect: () => void;
    onDetail: () => void; // Trigger detail modal
}

export const ProcessTile: React.FC<ProcessTileProps> = ({ node, isActive, onSelect, onDetail }) => {
    // Determine color classes
    // If it's L0, use the node's distinct color.
    // Otherwise default to white/gray, but verify if isActive.

    const baseClasses = "relative group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 w-full text-left shadow-sm hover:shadow-md cursor-pointer";

    const activeClasses = isActive
        ? "ring-2 ring-indigo-500 ring-offset-2 z-10"
        : "hover:border-indigo-300";

    // Use node.color if available (mostly for L0), else default styling
    const colorClasses = node.color || "bg-white border-gray-200 text-gray-800";

    return (
        <motion.div
            layoutId={`tile-${node.id}`}
            onClick={onSelect}
            className={clsx(baseClasses, colorClasses, activeClasses)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
        >
            <div className="flex-1 min-w-0 pr-2">
                {/* ID Pill if available */}
                {node.processId && node.processId !== "N/A" && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-black/5 text-black/60 mb-1">
                        {node.processId}
                    </span>
                )}
                <h3 className="text-sm font-semibold leading-snug break-words">
                    {node.title}
                </h3>
                {node.description && (
                    <p className="text-xs opacity-70 mt-1 line-clamp-2">
                        {node.description}
                    </p>
                )}
            </div>

            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onDetail(); }}
                    className="p-1.5 rounded-full hover:bg-black/10 text-current/60 hover:text-current transition-colors"
                    title="View Details"
                >
                    <Info size={16} />
                </button>
            </div>

            {/* Chevron indicating children */}
            {node.children && node.children.length > 0 && (
                <div className={clsx(
                    "ml-2 transition-transform duration-200 text-current/40",
                    isActive && "translate-x-1 text-indigo-600"
                )}>
                    <ChevronRight size={18} />
                </div>
            )}
        </motion.div>
    );
};
