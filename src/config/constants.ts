export const APP_CONFIG = {
    APP: {
        NAME: 'Surity Process Catalogue',
        VERSION: '1.0.2',
        DATA_SOURCE_LABEL: 'Surity Hierarchical Data',
    },
    FILES: {
        CATALOGUE: '/process_data.csv',
        RACI: '',
        KPIS: '',
        POLICIES: '',
    },
    COLORS: {
        LEVEL_0: {
            'SUPPORT': 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100',
            'CORE': 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100',
            'MANAGEMENT': 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100',
            'STRATEGY': 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100',
            'SALES': 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100',
            'MARKETING': 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100',
            'DEFAULT': 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100',
        },
        RAG: {
            RED: 'bg-red-500 shadow-sm shadow-red-200',
            AMBER: 'bg-amber-400 shadow-sm shadow-amber-200',
            GREEN: 'bg-emerald-500 shadow-sm shadow-emerald-200',
            GREY: 'bg-gray-300'
        },
        RACI: {
            R: 'border-red-500',
            A: 'border-amber-500',
            C: 'border-blue-500',
            I: 'border-gray-500'
        }
    },
    ANIMATION: {
        DURATION: 0.3,
        STAGGER: 0.05
    },
    UI: {
        Z_INDEX: {
            MODAL_BACKDROP: 40,
            MODAL_CONTENT: 50,
            HEADER: 20
        },
        TABS: {
            OVERVIEW: 'Overview',
            RACI: 'RACI',
            KPIS: 'KPIs',
            POLICIES: 'Policies & Standards'
        }
    }
};
