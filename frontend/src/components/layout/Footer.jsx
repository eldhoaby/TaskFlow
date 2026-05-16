import { CheckSquare, GitBranch, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/50 py-8 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <div className="flex items-center gap-2">
            <CheckSquare size={16} className="text-indigo-600" strokeWidth={2.5} />
            <span className="text-sm font-semibold tracking-tight text-slate-900">TaskFlow</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} TaskFlow. A modern productivity app.
          </p>
        </div>

        {/* Links & Socials */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-xs font-semibold text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">React 19</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Spring Boot</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">MongoDB</a>
          </div>
          <div className="hidden h-4 w-px bg-slate-200 sm:block"></div>
          <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-indigo-600 hover:-translate-y-0.5 transition-all" aria-label="GitHub"><GitBranch size={16} /></a>
            <a href="#" className="hover:text-indigo-600 hover:-translate-y-0.5 transition-all" aria-label="Website"><Globe size={16} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
