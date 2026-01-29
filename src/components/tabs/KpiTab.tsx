import React from 'react';
import type { ProcessNode } from '../../lib/types';
import { motion } from 'framer-motion';

interface KpiTabProps {
    node: ProcessNode;
}

export const KpiTab: React.FC<KpiTabProps> = ({ node }) => {
    if (node.kpis.length === 0) {
        return <div className="text-center py-10 text-gray-400">No KPIs tracked for this process.</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                {node.kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h4 className="font-bold text-gray-900">{kpi.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">Owner: {kpi.owner} | Freq: {kpi.frequency}</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <div className="text-xs text-gray-500 mb-1">Target</div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">
                                {kpi.target}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
