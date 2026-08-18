import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft } from 'lucide-react';

export default function RemoteTerminal({ onClose }) {
  const [history, setHistory] = useState([
    { text: 'NovaDesktop Remote PowerShell v7.3.6', type: 'system' },
    { text: 'Type "help" or "systeminfo" to view host node diagnostics.\n', type: 'info' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newLogs = [...history, { text: `PS C:\\Users\\Administrator> ${cmd}`, type: 'input' }];
    const cmdLower = cmd.toLowerCase();

    if (cmdLower === 'clear' || cmdLower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmdLower === 'help') {
      newLogs.push({ text: 'Available: systeminfo, ipconfig, ping, dir, tasklist, whoami, cls', type: 'output' });
    } else if (cmdLower === 'systeminfo') {
      newLogs.push({ text: 'Host: NOVA-WORKSTATION-01 | OS: Windows 11 Pro 64-Bit | RAM: 64GB DDR5 | WebRTC Encrypted', type: 'output' });
    } else if (cmdLower === 'ipconfig') {
      newLogs.push({ text: 'IPv4 Address: 192.168.1.104 | Subnet: 255.255.255.0 | Gateway: 192.168.1.1', type: 'output' });
    } else if (cmdLower.startsWith('ping')) {
      newLogs.push({ text: 'Reply from 192.168.1.104: bytes=32 time=12ms TTL=128 (3 packets sent, 0 lost)', type: 'output' });
    } else if (cmdLower === 'dir' || cmdLower === 'ls') {
      newLogs.push({ text: 'Directory of C:\\Users\\Administrator\\Desktop\n- Projects\n- Documents\n- NovaDesktop_Host.log', type: 'output' });
    } else {
      newLogs.push({ text: `'${cmd}' is not recognized. Type "help" for list.`, type: 'error' });
    }

    setHistory(newLogs);
    setInputVal('');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 7, 15, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="glass-panel-glow" style={{ width: '100%', maxWidth: '720px', height: '480px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={20} color="var(--accent-green)" />
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>Remote PowerShell Console</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {history.map((item, idx) => (
            <pre key={idx} style={{ whiteSpace: 'pre-wrap', margin: 0, color: item.type === 'input' ? 'var(--primary-cyan)' : item.type === 'error' ? '#ff6688' : item.type === 'info' ? 'var(--accent-green)' : '#cbd5e1' }}>
              {item.text}
            </pre>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleCommandSubmit} style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(5, 8, 18, 0.9)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
          <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>PS C:\&gt;</span>
          <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="Type command (systeminfo, ping, dir)..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', outline: 'none' }} autoFocus />
          <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--primary-cyan)', cursor: 'pointer' }}><CornerDownLeft size={16} /></button>
        </form>
      </div>
    </div>
  );
}
