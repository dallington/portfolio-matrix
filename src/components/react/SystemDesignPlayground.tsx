import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Play, Pause, Database, Server } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { mode } from '../../store';

interface Job {
  id: number;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  workerId: number | null;
  progress: number;
}

interface Worker {
  id: number;
  active: boolean;
  currentJobId: number | null;
}

export const SystemDesignPlayground = () => {
  const currentMode = useStore(mode);
  const isDev = currentMode === 'dev';
  
  const [workerCount, setWorkerCount] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [throughput, setThroughput] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Initialize workers and some starting jobs
  useEffect(() => {
    setWorkers(Array.from({ length: 8 }, (_, i) => ({ id: i + 1, active: i < workerCount, currentJobId: null })));
    setJobs(Array.from({ length: 20 }, (_, i) => ({ id: i + 1, status: 'queued', workerId: null, progress: 0 })));
  }, []);

  // Sync worker active state with slider
  useEffect(() => {
    setWorkers(prev => prev.map((w, i) => ({ ...w, active: i < workerCount })));
  }, [workerCount]);

  // Main Simulation Loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setJobs(prevJobs => {
        const nextJobs = [...prevJobs];
        
        // 1. Assign queued jobs to idle active workers
        workers.filter(w => w.active && !w.currentJobId).forEach(worker => {
          const firstQueued = nextJobs.find(j => j.status === 'queued');
          if (firstQueued) {
            firstQueued.status = 'processing';
            firstQueued.workerId = worker.id;
            worker.currentJobId = firstQueued.id;
          }
        });

        // 2. Process active jobs
        nextJobs.filter(j => j.status === 'processing').forEach(job => {
          job.progress += Math.random() * 5;
          if (job.progress >= 100) {
            job.status = 'completed';
            job.progress = 100;
            const worker = workers.find(w => w.id === job.workerId);
            if (worker) worker.currentJobId = null;
            setCompletedCount(c => c + 1);
          } else if (Math.random() < 0.005) { // Random failure chance
            job.status = 'failed';
            const worker = workers.find(w => w.id === job.workerId);
            if (worker) worker.currentJobId = null;
          }
        });

        // 3. Keep the queue filled
        if (nextJobs.filter(j => j.status === 'queued').length < 5) {
          const lastId = nextJobs.length > 0 ? nextJobs[nextJobs.length - 1].id : 0;
          nextJobs.push({ id: lastId + 1, status: 'queued', workerId: null, progress: 0 });
        }

        return nextJobs;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, workers]);

  // Calculate Throughput (Jobs per second)
  useEffect(() => {
    if (!isRunning) return;
    const startCount = completedCount;
    const interval = setInterval(() => {
      setThroughput(completedCount - startCount);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, completedCount]);

  return (
    <div className={`p-8 border-2 transition-all ${isDev ? 'bg-black border-[var(--accent)]/20 mono' : 'bg-gray-50 dark:bg-[#0D0D0D] border-gray-100 dark:border-[#1A1A1A] rounded-2xl'}`}>
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Queue Visualization */}
        <div className="flex-1 min-h-[400px] flex flex-col gap-6">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-3">
               <Database size={18} className="text-gray-400" />
               <h5 className="text-sm font-black uppercase tracking-widest">Main_Task_Queue</h5>
             </div>
             <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] mono text-gray-500 uppercase">Queued</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-[10px] mono text-gray-500 uppercase">Processing</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] mono text-gray-500 uppercase">Success</span>
               </div>
             </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 flex-1 content-start">
            <AnimatePresence>
              {jobs.slice(-50).map(job => (
                <motion.div 
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`aspect-square rounded-sm border transition-colors flex items-center justify-center text-[8px] font-black ${
                    job.status === 'queued' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' :
                    job.status === 'processing' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-600' :
                    job.status === 'completed' ? 'bg-green-500/20 border-green-500/50 text-green-600' :
                    'bg-red-500/20 border-red-500/50 text-red-600'
                  }`}
                >
                  {job.id}
                  {job.status === 'processing' && (
                    <div className="absolute inset-0 bg-yellow-500/20 origin-bottom transition-all" style={{ height: `${job.progress}%` }} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Orchestration Metrics */}
        <div className="w-full lg:w-80 space-y-8">
          <section>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={14} /> Systems_Telemetry
            </h4>
            <div className="space-y-4">
              {[
                { label: 'THROUGHPUT', value: `${throughput} jobs/s`, color: isRunning ? 'text-green-500' : 'text-gray-500' },
                { label: 'COMPLETED', value: completedCount.toString(), color: 'text-white' },
                { label: 'FAILED_JOBS', value: jobs.filter(j => j.status === 'failed').length.toString(), color: 'text-red-500' },
                { label: 'ACTIVE_WORKERS', value: workers.filter(w => w.active && w.currentJobId).length.toString(), color: 'text-[var(--accent)]' }
              ].map(m => (
                <div key={m.label} className="flex justify-between items-end border-b border-gray-100 dark:border-[#1A1A1A] pb-2">
                  <span className="text-[10px] text-gray-500 font-bold">{m.label}</span>
                  <span className={`text-xl font-black ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Scaling_Controls</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Worker_Pool_Size</label>
                <span className="text-[10px] font-black text-[var(--accent)]">{workerCount} active</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={workerCount}
                onChange={(e) => setWorkerCount(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
              <div className="flex justify-between gap-1 mt-2">
                 {workers.map(w => (
                   <div key={w.id} className={`flex-1 h-6 border flex items-center justify-center rounded-sm transition-all ${w.active ? (w.currentJobId ? 'bg-yellow-500/20 border-yellow-500' : 'bg-[var(--accent)]/10 border-[var(--accent)]/40') : 'bg-gray-100 dark:bg-gray-900 border-transparent opacity-20'}`}>
                      <Server size={10} className={w.currentJobId ? 'animate-pulse text-yellow-500' : 'text-gray-400'} />
                   </div>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`p-3 border flex items-center justify-center gap-2 transition-all uppercase text-[10px] font-black ${isRunning ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}
              >
                {isRunning ? <><Pause size={14} /> Shutdown_Systems</> : <><Play size={14} /> Initialize_Cluster</>}
              </button>
            </div>
          </section>

          {isDev && (
            <div className="pt-6 border-t border-gray-800">
              <div className="text-[9px] text-gray-400 italic space-y-2 leading-relaxed">
                <p>// Log: Worker pool uses "FOR UPDATE SKIP LOCKED" to prevent race conditions during job fetch.</p>
                <p>// Log: Redis Pub/Sub synchronizes state changes across geo-distributed nodes.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
