import React, { useState } from 'react';
import type { ProcessNode } from '../lib/types';
import { APP_CONFIG } from '../config/constants';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface Level2CardProps {
    node: ProcessNode;
    onViewInfo: (node: ProcessNode) => void;
}

export const Level2Card: React.FC<Level2CardProps> = ({ node, onViewInfo }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.children.length > 0;

    return (
        <div className="mb-2">
            {/* Level 2 Main Row */}
            <div
                className={clsx(
                    "relative p-3 rounded-lg border bg-white hover:border-blue-300 transition-all shadow-sm flex items-center justify-between cursor-pointer group",
                    isExpanded ? "ring-2 ring-blue-100 border-blue-400" : "border-gray-200"
                )}
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {/* Expand/Collapse Chevron */}
                    {hasChildren ? (
                        <div className="text-gray-400">
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </div>
                    ) : (
                        <div className="w-3.5" /> // Spacer
                    )}

                    {/* Title */}
                    <span className="text-sm font-medium text-gray-700 truncate select-none">
                        {node.title}
                    </span>
                </div>

                <div className="flex items-center gap-2 pl-2">
                    {/* RAG Status Dot */}
                    {node.ragStatus && (
                        <div
                            className={clsx(
                                "w-2.5 h-2.5 rounded-full",
                                node.ragStatus === 'red' && APP_CONFIG.COLORS.RAG.RED,
                                node.ragStatus === 'amber' && APP_CONFIG.COLORS.RAG.AMBER,
                                node.ragStatus === 'green' && APP_CONFIG.COLORS.RAG.GREEN,
                                node.ragStatus === 'grey' && APP_CONFIG.COLORS.RAG.GREY
                            )}
                            title={`Status: ${node.ragStatus}`}
                        />
                    )}

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewInfo(node);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="View Details"
                    >
                        <Info size={14} />
                    </button>
                </div>
            </div>

            {/* Level 3 Accordion Body */}
            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-6 pr-1 pt-1 space-y-1"
                    >
                        {node.children.map(child => (
                            <div
                                key={child.id}
                                className="p-2 rounded bg-gray-50 border border-gray-100 text-sm text-gray-600 hover:bg-white hover:border-blue-200 transition-colors flex items-center justify-between group/l3"
                            >
                                <span>{child.title}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onViewInfo(child);
                                    }}
                                    className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-blue-600 opacity-0 group-hover/l3:opacity-100 transition-opacity"
                                >
                                    <Info size={12} />
                                </button>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
