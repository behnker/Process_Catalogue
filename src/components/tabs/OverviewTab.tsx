import React from 'react';
import type { ProcessNode } from '../../lib/types';
import { FileText, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface OverviewTabProps {
    node: ProcessNode;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ node }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={16} /> Description
                </h3>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-gray-700 leading-relaxed">
                    {node.description || "No description provided."}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={16} /> Process Owner
                </h3>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        {(node.owner || "U").charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900">{node.owner || "Unassigned"}</span>
                </div>
            </div>
        </motion.div>
    );
};
