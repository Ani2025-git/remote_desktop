import React, { useState, useEffect } from 'react';
import { Activity, X } from 'lucide-react';

export default function RemoteTaskManager({ onClose }) {
  const [cpuUsage, setCpuUsage] = useState(24);
  const [ramUsage, setRamUsage] = useState(48);

  const [processes, setProcesses] = useState([
    { id: 1042, name: 'NovaDesktop Host Stream.exe', cpu: '8.4%', ram: '480 MB' },
    { id: 2180, name: 'Chrome Browser (12 tabs).exe', cpu: '12.1%', ram: '1,420 MB' },
    { id: 3412, name: 'PowerShell Diagnostic Service', cpu: '1.2%', ram: '94 MB' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(20 + Math.random() * 15));
      setRamUsage(Math.floor(45 + Math.random() * 8));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const terminateProcess = (id) => setProcesses(processes.filter(p => p.id !== id));

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 7, 15, 0.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="glass-panel-glow" style={{ width: '100%', maxWidth: '640px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Activity size={24} color="var(--primary-cyan)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Remote Task Manager</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CPU UTILIZATION</span>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--primary-cyan)' }}>{cpuUsage}%</p>
          </div>
          <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RAM MEMORY</span>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--accent-purple)' }}>{ramUsage}%</p>
          </div>
        </div>

        <div style={{ background: 'rgba(8, 12, 24, 0.8)', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.6rem 1rem' }}>PID</th>
                <th style={{ padding: '0.6rem 1rem' }}>Process Name</th>
                <th style={{ padding: '0.6rem 1rem' }}>CPU</th>
                <th style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((proc) => (
                <tr key={proc.id}>
                  <td style={{ padding: '0.6rem 1rem', fontFamily: 'var(--font-mono)' }}>{proc.id}</td>
                  <td style={{ padding: '0.6rem 1rem', color: '#fff' }}>{proc.name}</td>
                  <td style={{ padding: '0.6rem 1rem', color: 'var(--primary-cyan)' }}>{proc.cpu}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>
                    <button onClick={() => terminateProcess(proc.id)} style={{ background: 'rgba(255, 51, 102, 0.15)', border: '1px solid rgba(255, 51, 102, 0.3)', color: '#ff6688', borderRadius: '6px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>
                      End Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
