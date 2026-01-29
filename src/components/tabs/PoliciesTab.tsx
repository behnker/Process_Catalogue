import React from 'react';
import type { ProcessNode } from '../../lib/types';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface PoliciesTabProps {
    node: ProcessNode;
}

export const PoliciesTab: React.FC<PoliciesTabProps> = ({ node }) => {
    if (node.policies.length === 0) {
        return <div className="text-center py-10 text-gray-400">No specific policies documented.</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="space-y-4">
                {node.policies.map((pol, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
                        {pol.mandatory && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-bl-lg">
                                Mandatory
                            </div>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">{pol.category}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{pol.name}</h4>
                        {pol.description && (
                            <p className="text-sm text-gray-600 mb-3">{pol.description}</p>
                        )}
                        {pol.referenceDoc && (
                            <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                <FileText size={12} /> Ref: {pol.referenceDoc}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
