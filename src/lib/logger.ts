type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: unknown;
}

class Logger {
    private log(level: LogLevel, message: string, context?: unknown) {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            context
        };
        // In production, this might stream to a service. 
        // For now, console output structured as JSON-like string or object.
        console.log(JSON.stringify(entry));
    }

    info(message: string, context?: unknown) {
        this.log('info', message, context);
    }

    warn(message: string, context?: unknown) {
        this.log('warn', message, context);
    }

    error(message: string, context?: unknown) {
        this.log('error', message, context);
    }

    debug(message: string, context?: unknown) {
        // Could be filtered by env var
        this.log('debug', message, context);
    }
}

export const logger = new Logger();
