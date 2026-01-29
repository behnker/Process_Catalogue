import { logger } from './logger';

interface BenchmarkResult {
    name: string;
    durationMs: number;
    timestamp: string;
}

export class Benchmark {
    private static results: BenchmarkResult[] = [];

    /**
     * Measure the execution time of a synchronous function
     */
    static measure<T>(name: string, fn: () => T): T {
        const start = performance.now();
        try {
            const result = fn();
            const duration = performance.now() - start;
            this.record(name, duration);
            return result;
        } catch (e) {
            const duration = performance.now() - start;
            this.record(name + "_FAILED", duration);
            throw e;
        }
    }

    /**
     * Measure the execution time of an asynchronous function
     */
    static async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
        const start = performance.now();
        try {
            const result = await fn();
            const duration = performance.now() - start;
            this.record(name, duration);
            return result;
        } catch (e) {
            const duration = performance.now() - start;
            this.record(name + "_FAILED", duration);
            throw e;
        }
    }

    private static record(name: string, durationMs: number) {
        const result: BenchmarkResult = {
            name,
            durationMs,
            timestamp: new Date().toISOString()
        };
        this.results.push(result);
        // Log immediately as per methodology requirement for JSON output
        logger.info(`BENCHMARK`, result);
    }

    static getResults() {
        return this.results;
    }
}
