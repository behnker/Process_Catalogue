import React from 'react';
import type { ProcessNode } from '../../lib/types';
import { APP_CONFIG } from '../../config/constants';
import { motion } from 'framer-motion';

interface RaciTabProps {
    node: ProcessNode;
}

export const RaciTab: React.FC<RaciTabProps> = ({ node }) => {
    if (!node.raci) {
        return <div className="text-center py-10 text-gray-400">No RACI data defined for this process.</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3">Role Type</th>
                            <th className="px-4 py-3">Assigned To</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className={`px-4 py-3 font-semibold text-gray-900 border-l-4 ${APP_CONFIG.COLORS.RACI.R}`}>Responsible</td>
                            <td className="px-4 py-3">{node.raci.responsible || "-"}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className={`px-4 py-3 font-semibold text-gray-900 border-l-4 ${APP_CONFIG.COLORS.RACI.A}`}>Accountable</td>
                            <td className="px-4 py-3">{node.raci.accountable || "-"}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className={`px-4 py-3 font-semibold text-gray-900 border-l-4 ${APP_CONFIG.COLORS.RACI.C}`}>Consulted</td>
                            <td className="px-4 py-3">{node.raci.consulted || "-"}</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className={`px-4 py-3 font-semibold text-gray-900 border-l-4 ${APP_CONFIG.COLORS.RACI.I}`}>Informed</td>
                            <td className="px-4 py-3">{node.raci.informed || "-"}</td>
                        </tr>
                    </tbody>
                    {node.raci.comments && (
                        <tfoot className="bg-gray-50 text-xs text-gray-500">
                            <tr>
                                <td colSpan={2} className="px-4 py-2 italic border-t border-gray-100"> Note: {node.raci.comments}</td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </motion.div>
    );
};
