import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, KeyRound } from 'lucide-react';
import { useMode } from '../../hooks/useMode';
import { clsx } from 'clsx';

interface AdminGuardProps {
    children: React.ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
    const { isDev } = useMode();
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // The password from env
    const ADMIN_PASS = import.meta.env.PUBLIC_ADMIN_PASS || 'dev';

    useEffect(() => {
        const token = sessionStorage.getItem('admin_auth_token');
        if (token === 'true') {
            setIsAuthorized(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASS) {
            sessionStorage.setItem('admin_auth_token', 'true');
            setIsAuthorized(true);
            setError(false);
        } else {
            setError(true);
            setPassword('');
            // Shake effect or feedback
            setTimeout(() => setError(false), 2000);
        }
    };

    if (isLoading) return null;

    if (isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0A0A0A] px-6">
            <div className={clsx(
                "w-full max-w-md p-8 border transition-all duration-500",
                isDev 
                    ? "bg-black border-[var(--accent)]/30 mono" 
                    : "bg-white dark:bg-[#111] border-gray-200 dark:border-[#222] rounded-2xl shadow-xl"
            )}>
                <div className="flex flex-col items-center text-center mb-8">
                    <div className={clsx(
                        "p-4 rounded-full mb-6",
                        isDev ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                    )}>
                        <Lock size={32} />
                    </div>
                    <h1 className={clsx(
                        "text-2xl font-black uppercase tracking-tight mb-2",
                        isDev ? "text-[var(--accent)]" : "text-gray-900 dark:text-white"
                    )}>
                        {isDev ? "RESTRICTED_ACCESS" : "Admin Area"}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please enter your access code to proceed.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={isDev ? "INPUT_AUTH_TOKEN..." : "Access Code"}
                            className={clsx(
                                "w-full pl-12 pr-4 py-4 border-2 transition-all outline-none",
                                error ? "border-red-500 animate-shake" : "",
                                isDev 
                                    ? "bg-black border-[#222] focus:border-[var(--accent)] text-[var(--accent)] text-xs mono" 
                                    : "bg-gray-50 dark:bg-black border-gray-100 dark:border-[#222] focus:border-blue-600 rounded-xl"
                            )}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className={clsx(
                            "w-full py-4 font-black uppercase text-sm transition-all flex items-center justify-center gap-2",
                            isDev 
                                ? "bg-[var(--accent)] text-black hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,255,136,0.2)]" 
                                : "bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
                        )}
                    >
                        {isDev ? "EXECUTE_AUTH" : "Authorize"}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-red-500 text-xs font-bold mono uppercase animate-pulse">
                        <ShieldAlert size={14} /> INVALID_CREDENTIALS
                    </div>
                )}

                {isDev && (
                    <div className="mt-12 pt-6 border-t border-[var(--accent)]/10 opacity-20 text-[9px] text-center">
                        KERNEL_AUTH_SUBSYSTEM_V2.1 // TRACE_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                    </div>
                )}
            </div>
        </div>
    );
};
