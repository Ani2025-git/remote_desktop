import React, { useState } from 'react';
import { HardDrive, UploadCloud, DownloadCloud, CheckCircle2, X } from 'lucide-react';

export default function FileTransferModal({ onClose }) {
  const [transfers, setTransfers] = useState([
    { id: 1, name: 'Project_Architecture_v2.pdf', size: '14.2 MB', direction: 'download', progress: 100, status: 'Completed' }
  ]);

  const simulateFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(f => {
      const newTransfer = {
        id: Date.now() + Math.random(),
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        direction: 'upload',
        progress: 0,
        status: 'Transferring'
      };

      setTransfers(prev => [newTransfer, ...prev]);

      let prog = 0;
      const interval = setInterval(() => {
        prog += 25;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setTransfers(current => current.map(t => t.id === newTransfer.id ? { ...t, progress: 100, status: 'Completed' } : t));
        } else {
          setTransfers(current => current.map(t => t.id === newTransfer.id ? { ...t, progress: prog } : t));
        }
      }, 300);
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 7, 15, 0.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="glass-panel-glow" style={{ width: '100%', maxWidth: '640px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HardDrive size={24} color="var(--accent-amber)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>File Transfer Drawer</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', border: '2px dashed rgba(0, 242, 254, 0.3)', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.03)', cursor: 'pointer', marginBottom: '1.5rem' }}>
          <UploadCloud size={40} color="var(--primary-cyan)" style={{ marginBottom: '0.5rem' }} />
          <span style={{ fontWeight: 600, color: '#fff' }}>Click or drag files to send to host</span>
          <input type="file" multiple onChange={simulateFileUpload} style={{ display: 'none' }} />
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto' }}>
          {transfers.map(item => (
            <div key={item.id} className="glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <UploadCloud size={18} color="var(--primary-cyan)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.size}</div>
                </div>
              </div>
              <span style={{ color: 'var(--accent-green)', fontSize: '0.8rem' }}>{item.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
