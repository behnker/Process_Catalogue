import Papa from 'papaparse';
import type { ProcessNode, CatalogueRow } from './types';
import { APP_CONFIG } from '../config/constants';

// Simple logger replacement
const logger = {
    info: console.log,
    error: console.error,
    warn: console.warn
};

// Helper to wrap Papa.parse in a Promise
const parseCsv = <T>(url: string): Promise<T[]> => {
    if (!url) return Promise.resolve([]);
    return new Promise((resolve) => {
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data as T[]),
            error: (err) => {
                console.warn(`Failed to fetch ${url}`, err);
                resolve([]); // Resolve empty on error to handle missing files gracefully
            }
        });
    });
};

export const loadAndMergeData = async (): Promise<ProcessNode[]> => {
    try {
        logger.info("Starting CSV fetch sequence...");

        // We only key off the catalogue for now
        const catalogueData = await parseCsv<CatalogueRow>(APP_CONFIG.FILES.CATALOGUE);

        // Placeholder empty maps until we have real data files
        const raciMap = new Map();
        const kpiMap = new Map();
        const policyMap = new Map();

        // Helper to parse RAG status
        const parseRag = (status: string | undefined): 'red' | 'amber' | 'green' | 'grey' => {
            const s = (status || "").toLowerCase().trim();
            if (s.includes('red')) return 'red';
            if (s.includes('amber') || s.includes('yellow')) return 'amber';
            if (s.includes('green')) return 'green';
            return 'grey';
        };

        // Build Hierarchy with Deduplication
        const rootNodes: ProcessNode[] = [];
        const l0Map = new Map<string, ProcessNode>();
        const l1Map = new Map<string, ProcessNode>();
        const l2Map = new Map<string, ProcessNode>();

        // Helper to create basic node
        const createNode = (pid: string, title: string, level: number, owner: string, desc: string): ProcessNode => {
            const nodeId = pid || `auto-${title}-${Math.random()}`;
            let colorClass = undefined;
            if (level === 0) {
                // Approximate matching for keys (case-insensitive)
                const normalizedTitle = title.toUpperCase();
                let matchedColor = APP_CONFIG.COLORS.LEVEL_0.DEFAULT;

                // Try to find a partial match in keys
                for (const key in APP_CONFIG.COLORS.LEVEL_0) {
                    if (normalizedTitle.includes(key)) {
                        matchedColor = APP_CONFIG.COLORS.LEVEL_0[key as keyof typeof APP_CONFIG.COLORS.LEVEL_0];
                        break;
                    }
                }
                colorClass = matchedColor;
            }
            return {
                id: nodeId,
                processId: pid || "N/A",
                title,
                level,
                owner,
                description: desc,
                children: [],
                raci: raciMap.get(pid),
                kpis: kpiMap.get(pid) || [],
                policies: policyMap.get(pid) || [],
                color: colorClass
            };
        };

        catalogueData.forEach((row) => {
            const l0Title = row["Level 0"]?.trim();
            const l1Title = row["Level 1"]?.trim();
            const l2Title = row["Level 2"]?.trim();
            const l3Title = row["Level 3"]?.trim();

            const pid = row["Process ID"]?.trim();
            const owner = row["Process Owner"]?.trim();
            const desc = row["Description"]?.trim(); // Assuming generic description field

            // For now, map the specific "Description/Comments" from CSV to our desc
            // The CSV header in the example was "Description/Comments"
            const specialDesc = row["Description/Comments"]?.trim() || desc;

            const rag = parseRag(row["RAG Status"]);

            // 1. Handle Level 0
            if (!l0Title) return; // Skip invalid rows

            let l0Node = l0Map.get(l0Title);
            if (!l0Node) {
                // Create new L0
                l0Node = createNode(pid && !l1Title ? pid : "", l0Title, 0, owner, specialDesc);
                if (rag !== 'grey' && !l1Title) l0Node.ragStatus = rag;
                l0Map.set(l0Title, l0Node);
                rootNodes.push(l0Node);
            }

            // 2. Handle Level 1
            if (!l1Title) return;

            const l1Key = `${l0Title}|${l1Title}`;
            let l1Node = l1Map.get(l1Key);
            if (!l1Node) {
                l1Node = createNode(pid && !l2Title ? pid : "", l1Title, 1, owner, specialDesc);
                if (rag !== 'grey' && !l2Title) l1Node.ragStatus = rag;
                l1Map.set(l1Key, l1Node);
                l0Node.children.push(l1Node);
            }

            // 3. Handle Level 2
            if (!l2Title) return;

            const l2Key = `${l1Key}|${l2Title}`;
            let l2Node = l2Map.get(l2Key);
            if (!l2Node) {
                l2Node = createNode(pid && !l3Title ? pid : "", l2Title, 2, owner, specialDesc);
                if (rag !== 'grey' && !l3Title) l2Node.ragStatus = rag;
                l2Map.set(l2Key, l2Node);
                l1Node.children.push(l2Node);
            }

            // 4. Handle Level 3
            if (!l3Title) return;

            const l3Node = createNode(pid, l3Title, 3, owner, specialDesc);
            if (rag !== 'grey') l3Node.ragStatus = rag;
            l2Node.children.push(l3Node);
        });

        logger.info(`Parsed ${rootNodes.length} root nodes.`);
        return rootNodes;

    } catch (error) {
        logger.error("Failed to load or parse CSVs", error);
        return [];
    }
};
