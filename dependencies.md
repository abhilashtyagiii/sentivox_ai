# Interview Analysis Application Dependencies

## Node.js Dependencies (automatically installed with npm install)

### Core Framework
- express: Web application framework
- typescript: TypeScript support
- tsx: TypeScript execution engine
- vite: Build tool and development server

### AI & Analysis
- @google/generative-ai: Gemini AI integration
- @google/genai: Gemini AI client

### Database & Storage
- @neondatabase/serverless: Serverless PostgreSQL client
- drizzle-orm: Type-safe ORM
- drizzle-kit: Database migrations
- drizzle-zod: Zod schema integration

### PDF Generation
- jspdf: PDF document generation
- jspdf-autotable: Table support for PDFs

### Frontend Framework
- react: React library
- react-dom: React DOM rendering
- wouter: Lightweight router
- @tanstack/react-query: Data fetching and caching

### UI Components
- @radix-ui/*: Accessible UI components
- lucide-react: Icon library
- tailwindcss: CSS framework
- framer-motion: Animation library

### Forms & Validation
- react-hook-form: Form handling
- @hookform/resolvers: Form validation
- zod: Schema validation
- zod-validation-error: Error handling

### File Handling
- multer: File upload handling
- react-dropzone: Drag & drop file uploads

### Session Management
- express-session: Session middleware
- connect-pg-simple: PostgreSQL session store
- memorystore: Memory session store
- passport: Authentication middleware
- passport-local: Local authentication strategy

### Development Tools
- @types/*: TypeScript type definitions
- autoprefixer: CSS post-processor
- postcss: CSS transformation tool
- esbuild: JavaScript bundler

## System Requirements
- Node.js 18+ or Node.js 20+
- npm or yarn package manager
- 2GB+ RAM recommended
- 1GB+ free disk space

## Optional Dependencies
- PostgreSQL database (for persistent storage)
- Redis (for advanced session management)