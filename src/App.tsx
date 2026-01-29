import { useState } from 'react';
import { ProcessViewer } from './components/ProcessViewer';
import { APP_CONFIG } from './config/constants';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchBar } from './components/SearchBar';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col font-sans text-gray-900 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-20 shadow-sm relative gap-4">
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">P</div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 hidden md:block">Process Catalogue</h1>
        </div>

        <div className="flex-1 max-w-2xl flex justify-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="text-sm text-gray-500 whitespace-nowrap min-w-[100px] text-right">
          <div className="font-mono text-xs text-gray-400">v{APP_CONFIG.APP.VERSION}</div>
          {APP_CONFIG.APP.DATA_SOURCE_LABEL}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative bg-dots">
        <ErrorBoundary>
          <ProcessViewer searchTerm={searchTerm} />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
