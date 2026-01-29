import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { loadAndMergeData } from '../src/lib/csvParser';
import Papa from 'papaparse';

// Mock Papa.parse
vi.mock('papaparse', () => ({
    default: {
        parse: vi.fn()
    }
}));

describe('loadAndMergeData', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should parse and build a hierarchy', async () => {
        // Mock data
        const mockCatalogue = [
            { "Process ID": "L0-1", "Level 0": "ROOT", "Process Owner": "Owner 1" },
            { "Process ID": "L1-1", "Level 1": "CHILD", "Process Owner": "Owner 2" }
        ];

        // Setup the mock implementation for the 4 calls
        const parseMock = Papa.parse as unknown as Mock;
        parseMock.mockImplementation((url: unknown, config: unknown) => {
            const conf = config as { complete: (res: { data: unknown[] }) => void };
            const u = url as string;
            let data: unknown[] = [];
            if (u.includes('catalogue')) data = mockCatalogue;
            // Return empty for others by default

            conf.complete({ data });
        });

        const result = await loadAndMergeData();

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("ROOT");
        expect(result[0].children).toHaveLength(1);
        expect(result[0].children[0].title).toBe("CHILD");
    });
});
