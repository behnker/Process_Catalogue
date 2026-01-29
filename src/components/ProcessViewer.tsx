import React, { useEffect, useState, useMemo } from 'react';
import type { ProcessNode } from '../lib/types';
import { loadAndMergeData } from '../lib/csvParser';
import { SwimlaneLayout } from './SwimlaneLayout';
import { DetailModal } from './DetailModal';
import { AlertCircle } from 'lucide-react';

interface ProcessViewerProps {
    searchTerm: string;
}

export const ProcessViewer: React.FC<ProcessViewerProps> = ({ searchTerm }) => {
    const [data, setData] = useState<ProcessNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [detailNode, setDetailNode] = useState<ProcessNode | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                setLoading(true);
                const nodes = await loadAndMergeData();
                console.log('Data loaded:', nodes);
                setData(nodes);
                setError(null);
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Failed to load process data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter logic (Top down)
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        const lowerTerm = searchTerm.toLowerCase();

        const searchRecursive = (nodes: ProcessNode[]): ProcessNode[] => {
            return nodes.reduce((acc, node) => {
                const matchesSelf = node.title.toLowerCase().includes(lowerTerm) ||
                    (node.processId && node.processId.toLowerCase().includes(lowerTerm));

                const matchingChildren = searchRecursive(node.children);

                if (matchesSelf || matchingChildren.length > 0) {
                    acc.push({
                        ...node,
                        children: matchingChildren
                    });
                }
                return acc;
            }, [] as ProcessNode[]);
        };

        return searchRecursive(data);
    }, [data, searchTerm]);

    const handleShowDetails = (node: ProcessNode) => {
        setDetailNode(node);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-indigo-600 gap-3">
                <div className="animate-spin h-8 w-8 border-4 border-current border-t-transparent rounded-full" />
                <span className="font-medium animate-pulse">Loading Process Catalogue...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-600 gap-2">
                <AlertCircle className="h-10 w-10" />
                <p className="font-medium">{error}</p>
            </div>
        );
    }

    if (filteredData.length === 0) {
        if (searchTerm) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p>No processes match "{searchTerm}"</p>
                    <button
                        onClick={() => {/* no-op - search is controlled by parent usually or just clear input */ }}
                        className="mt-2 text-indigo-500 hover:underline"
                    >
                        Clear search
                    </button>
                </div>
            );
        }
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                No process data found.
            </div>
        );
    }

    return (
        <>
            <SwimlaneLayout
                nodes={filteredData}
                onViewInfo={handleShowDetails}
            />

            {/* Modal */}
            <DetailModal
                node={detailNode}
                onClose={() => setDetailNode(null)}
            />
        </>
    );
};
