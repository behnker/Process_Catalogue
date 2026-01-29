import React, { useState } from 'react';
import type { ProcessNode } from '../lib/types';
import { X, Activity, ShieldCheck, Users, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { OverviewTab } from './tabs/OverviewTab';
import { RaciTab } from './tabs/RaciTab';
import { KpiTab } from './tabs/KpiTab';
import { PoliciesTab } from './tabs/PoliciesTab';
import { APP_CONFIG } from '../config/constants';

interface DetailModalProps {
    node: ProcessNode | null;
    onClose: () => void;
}

type TabKey = 'overview' | 'raci' | 'kpis' | 'policies';

export const DetailModal: React.FC<DetailModalProps> = ({ node, onClose }) => {
    const [activeTab, setActiveTab] = useState<TabKey>('overview');

    React.useEffect(() => {
        setActiveTab('overview');
    }, [node]);

    if (!node) return null;

    const tabs: { key: TabKey, label: string, icon: React.ReactNode, count?: number }[] = [
        { key: 'overview', label: APP_CONFIG.UI.TABS.OVERVIEW, icon: <Layout size={16} /> },
        { key: 'raci', label: APP_CONFIG.UI.TABS.RACI, icon: <Users size={16} />, count: node.raci ? 1 : 0 },
        { key: 'kpis', label: APP_CONFIG.UI.TABS.KPIS, icon: <Activity size={16} />, count: node.kpis.length },
        { key: 'policies', label: APP_CONFIG.UI.TABS.POLICIES, icon: <ShieldCheck size={16} />, count: node.policies.length },
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden pointer-events-auto"
                >
                    {/* Header */}
                    <div className="flex-shrink-0 relative p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <X size={20} className="text-gray-500" />
                        </button>
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase tracking-wider">
                                {node.processId}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase tracking-wider">
                                Level {node.level}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{node.title}</h2>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex overflow-x-auto border-b border-gray-100 px-6 space-x-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={clsx(
                                    "py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap",
                                    activeTab === tab.key
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {tab.icon}
                                {tab.label}
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className="ml-1 bg-gray-100 text-gray-600 text-xs py-0.5 px-1.5 rounded-full">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                        {activeTab === 'overview' && <OverviewTab node={node} />}
                        {activeTab === 'raci' && <RaciTab node={node} />}
                        {activeTab === 'kpis' && <KpiTab node={node} />}
                        {activeTab === 'policies' && <PoliciesTab node={node} />}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
