# Architecture Review & Methodology Evaluation

## 1. Executive Summary
The Surity Process Catalogue is a React-based data visualization tool that faithfully implements the "Swimlane" hierarchy defined in the methodology. The architecture is data-driven, relying on client-side CSV parsing to generate a canonical process tree.

## 2. User Personas (Inferred)
Based on the codebase analysis (`types.ts`, `constants.ts`, `csvParser.ts`), the following personas are supported:

### A. The Process Viewer (Primary User)
**Goal:** Navigate the process hierarchy to find specific procedures, policies, or KPIs.
**Architecture Support:**
*   **Swimlane Layout:** `Level0Group` -> `Level1Column` -> `Level2Card` component hierarchy directly maps to this user's mental model.
*   **Search & Discovery:** `SearchBar.tsx` and the hierarchical drill-down allow quick access to information.
*   **Visual RAG Status:** "Red/Amber/Green" signals (`ProcessNode.ragStatus`) allow users to quickly identify problem areas.

### B. The Process Owner (Data Subject)
**Goal:** Ensure their assigned processes are correctly defined and measured.
**Architecture Support:**
*   **Explicit Ownership:** The `ProcessNode` interface includes an owner field, which is parsed from the CSV (Process Owner column).
*   **RACI Matrix:** `RaciEntry` typings allow clear definition of Responsibilities, which users can view via the `DetailModal`.

### C. The Data Manager (Administrator)
**Goal:** Maintain the catalogue data without editing code.
**Architecture Support:**
*   **Decoupled Data:** The app ingests simple CSV files from `/public`. This allows non-developers to update the architecture by simply replacing a file (e.g., `process_data.csv`).
*   **Implicit Versioning:** While code versioning is in `constants.ts`, data versioning is handled by file replacement.

## 3. Evaluation Against Methodology

| Methodology Requirement | Implementation Status | Evidence |
| :--- | :--- | :--- |
| **Versioning Strategy** | ✅ Compliant | `constants.ts` defines `APP_CONFIG.APP.VERSION` as '1.0.1'. |
| **Component Structure** | ✅ Compliant | Components follow Atomic Design (`Level0Group`, `Level1Column`, `Level2Card`). |
| **Swimlane Layout** | ✅ Compliant | The component tree strictly enforces Level 0 (Group) -> Level 1 (Column) -> Level 2 (Card). |
| **Data Ingestion** | ✅ Compliant | `csvParser.ts` uses Papa Parse to load from `/public` and performs the required "grouping" logic to build the tree. |
| **Formatting** | ✅ Compliant | Tailwind colors in `constants.ts` map correctly to Departments (Strategy, Core, Support) and RAG statuses. |

## 4. Key Findings & Recommendations

### Architecture Strengths
*   **Clean Separation of Concerns:** The CSV parsing logic (`csvParser.ts`) is completely decoupled from the UI (`ProcessViewer.tsx`).
*   **Scalable Hierarchy:** The recursive nature of the data structure (Node -> Children) allows flexible deeper nesting if the methodology evolves (Level 3 is already supported).
*   **Resilience:** The parser handles missing parents gracefully by creating them if necessary (implied by the `map.get` logic), though `l0Map` primarily drives the root.

### Potential Gaps
*   **Data Validation:** While the parser works, invalid CSV rows (missing IDs) might be silently skipped or cause display issues.
*   **Performance:** Parsing large CSVs (10k+ rows) entirely on the client side at startup usually scales well, but could become a bottle neck.

## 5. Conclusion
The architecture is sound and fully aligned with `METHODOLOGY.md`. It effectively serves the Process Viewer by providing a strict, easy-to-navigate hierarchy, while allowing Process Owners to clearly define their domains via the data files.
