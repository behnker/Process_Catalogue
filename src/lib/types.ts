export interface RaciEntry {
    responsible: string;
    accountable: string;
    consulted: string;
    informed: string;
    comments?: string;
}

export interface KpiEntry {
    name: string;
    target: string;
    frequency: string;
    owner: string;
    dataSource?: string;
}

export interface PolicyEntry {
    name: string;
    category: string;
    mandatory: boolean; // converted from string "Mandatory"
    description: string;
    referenceDoc?: string;
}

export interface ProcessNode {
    id: string; // The UI logic id (can be same as processId or hierarchical)
    processId: string; // The official ID (e.g. L2-36)
    title: string;
    level: number;
    owner: string;
    description: string;
    children: ProcessNode[];

    // Linked Data
    raci?: RaciEntry;
    kpis: KpiEntry[];
    policies: PolicyEntry[];

    // Visual metadata
    ragStatus?: 'red' | 'amber' | 'green' | 'grey';
    color?: string;
}

export interface CatalogueRow {
    "Process ID": string;
    "Level 0": string;
    "Level 1": string;
    "Level 2": string;
    "Level 3": string;
    "Process Owner": string;
    "Description": string;
    "RAG Status": string;
    [key: string]: string;
}

export interface RaciRow {
    "Process ID": string;
    "Responsible": string;
    "Accountable": string;
    "Consulted": string;
    "Informed": string;
    "Comments": string;
}

export interface KpiRow {
    "Process ID": string;
    "KPI Name": string;
    "Target": string;
    "Frequency": string;
    "Owner": string;
    "Data Source": string;
}

export interface PolicyRow {
    "Process ID": string;
    "Policy Name": string;
    "Category": string;
    "Mandatory": string;
    "Description": string;
    "Ref Document": string;
}
