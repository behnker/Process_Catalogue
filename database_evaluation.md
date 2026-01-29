# Database Options Evaluation

## 1. Requirements Analysis
*   **Data Structure**: Hierarchical Process Tree (L0 -> L3) with Relational Satellites (RACI, KPIs, Policies linked to ProcessByID).
*   **Deployment**: Vercel (Serverless).
*   **Future Features (Phase 2)**:
    *   **Editing**: Requires Authentication & granular permissions (RBAC).
    *   **Filtering**: Complex queries (e.g., "Find all processes where Owner = X AND Status = Red").

## 2. Recommended Options

### Option A: Supabase (PostgreSQL) ⭐ RECOMMENDED
A fully managed Backend-as-a-Service wrapper around PostgreSQL.
*   **Why**: It provides the **Database** + **Authentication** + **API** in one suite.
*   **Pros**:
    *   **Relational**: Perfect for linking `Processes` to `RACI`/`KPIs`.
    *   **Auth**: Built-in User Management (Google/GitHub login) for the "Editing" feature.
    *   **Row Level Security (RLS)**: Secure data so only owners can edit specific trees.
    *   **Vercel Integration**: First-class support.
*   **Cons**: Relational schema requires strict definition (unlike flexible CSVs).

### Option B: Vercel Postgres (Neon) + Prisma
Native Serverless Postgres integration offered by Vercel.
*   **Why**: Extremely low friction setup if you are already on Vercel.
*   **Pros**:
    *   **Native**: Managed directly in Vercel dashboard.
    *   **ORM**: Use with Prisma or Drizzle for type-safety.
*   **Cons**:
    *   **Auth**: You need to implement Auth separately (e.g., via Clerk or Auth.js).
    *   **Management**: No built-in GUI like Supabase Studio.

### Option C: MongoDB Atlas (NoSQL)
Document-based store.
*   **Why**: The Process Tree is naturally a "document" structure.
*   **Pros**:
    *   **Flexibility**: Easy to dump the current JSON tree structure directly.
*   **Cons**:
    *   **Relations**: Managing "Linked Data" (RACI/KPIs) can become messy (foreign key enforcement is weaker).
    *   **Complex Queries**: "Find all Red processes" is harder if data is deeply nested in huge documents.

## 3. Implementation Path (Phase 2)
If we proceed with **Option A (Supabase)**:

1.  **Schema Design**:
    *   `processes` table (id, parent_id, ltrace_id, title...)
    *   `raci` table (process_id, ...)
    *   `kpis` table (process_id, ...)
2.  **Migration**: Create a script to parse the CSVs (using existing `csvParser`) and insert into Supabase once.
3.  **App Update**: Replace `loadAndMergeData` (CSV) with `supabase.from('processes').select(...)`.
