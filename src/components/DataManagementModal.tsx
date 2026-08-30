import React, { useRef, useState } from 'react';
import {
  Database,
  Download,
  Upload,
  Trash2,
  RotateCcw,
  X,
  HardDrive,
  FileCheck,
  AlertTriangle,
  FileJson,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface DataManagementModalProps {
  logsCount: number;
  pbsCount: number;
  favoritesCount: number;
  onExportData: () => void;
  onImportData: (file: File) => void;
  onClearData: () => void;
  onResetData: () => void;
  onClose: () => void;
}

export const DataManagementModal: React.FC<DataManagementModalProps> = ({
  logsCount,
  pbsCount,
  favoritesCount,
  onExportData,
  onImportData,
  onClearData,
  onResetData,
  onClose
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleFileSelection = (file: File | undefined) => {
    if (!file) return;
    onImportData(file);
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="data-management-modal"
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0E0E0E] border border-[#262626] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
      >
        {/* Hidden File Input for JSON Upload */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".json,application/json"
          onChange={e => {
            handleFileSelection(e.target.files?.[0]);
            if (e.target) e.target.value = '';
          }}
          className="hidden"
        />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#222222] bg-[#121212] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D1FF00]/15 border border-[#D1FF00]/30 text-[#D1FF00] flex items-center justify-center shadow-inner">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-wide flex items-center gap-2">
                Data &amp; Storage Management
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Local storage archive, import/export backups &amp; state control
              </p>
            </div>
          </div>
          <button
            id="close-data-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1f1f1f] transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Storage Summary Strip */}
          <div className="bg-[#141414] border border-[#222222] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-[#D1FF00] shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Browser LocalStorage
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Persistent on this device &middot; No account or server required
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
              <div className="px-2.5 py-1 rounded-lg bg-[#1c1c1c] border border-[#2b2b2b] text-center">
                <span className="block text-sm font-bold text-[#D1FF00]">{logsCount}</span>
                <span className="text-[10px] text-zinc-500">Logs</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#1c1c1c] border border-[#2b2b2b] text-center">
                <span className="block text-sm font-bold text-amber-400">{pbsCount}</span>
                <span className="text-[10px] text-zinc-500">PBs</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#1c1c1c] border border-[#2b2b2b] text-center">
                <span className="block text-sm font-bold text-sky-400">{favoritesCount}</span>
                <span className="text-[10px] text-zinc-500">Saved</span>
              </div>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Action 1: Export Data */}
            <div className="bg-[#141414] border border-[#222222] hover:border-zinc-700 transition rounded-xl p-4 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#D1FF00]">
                  <Download className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-mono tracking-wide text-white">
                    Export Backup (JSON)
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Download all your workout logs, PB milestones, and custom favorites as a standalone JSON backup file.
                </p>
              </div>

              <button
                id="modal-export-data-btn"
                onClick={() => {
                  onExportData();
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg bg-[#1a1a1a] hover:bg-[#D1FF00] text-zinc-200 hover:text-black border border-[#2e2e2e] hover:border-[#D1FF00] text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>Download Backup JSON</span>
              </button>
            </div>

            {/* Action 2: Import Data */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-[#141414] border transition rounded-xl p-4 flex flex-col justify-between gap-3 ${
                isDragging
                  ? 'border-[#D1FF00] bg-[#D1FF00]/5'
                  : 'border-[#222222] hover:border-zinc-700'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sky-400">
                  <Upload className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-mono tracking-wide text-white">
                    Import Backup (JSON)
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Upload and restore from a previously exported JSON backup file. Merges or replaces workout records.
                </p>
              </div>

              <button
                id="modal-import-data-btn"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 rounded-lg bg-[#1a1a1a] hover:bg-sky-500 text-zinc-200 hover:text-black border border-[#2e2e2e] hover:border-sky-500 text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{isDragging ? 'Drop File Here' : 'Select JSON File'}</span>
              </button>
            </div>

            {/* Action 3: Reset to Sample Data */}
            <div className="bg-[#141414] border border-[#222222] hover:border-zinc-700 transition rounded-xl p-4 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <RotateCcw className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-mono tracking-wide text-white">
                    Reset to Sample Data
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Restore pre-loaded demo progressions and workout logs to preview analytics, graphs, and skill tree levels.
                </p>
              </div>

              {showResetConfirm ? (
                <div className="flex items-center gap-2 animate-in fade-in duration-150">
                  <button
                    onClick={() => {
                      onResetData();
                      setShowResetConfirm(false);
                      onClose();
                    }}
                    className="flex-1 py-2 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold transition cursor-pointer"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="py-2 px-3 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-zinc-300 text-xs font-mono transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  id="modal-reset-data-btn"
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2 px-3 rounded-lg bg-[#1a1a1a] hover:bg-amber-500 text-zinc-200 hover:text-black border border-[#2e2e2e] hover:border-amber-500 text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Sample Data</span>
                </button>
              )}
            </div>

            {/* Action 4: Clear All Data */}
            <div className="bg-[#141414] border border-[#222222] hover:border-rose-900/40 transition rounded-xl p-4 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400">
                  <Trash2 className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-mono tracking-wide text-white">
                    Clear All Stored Data
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Permanently delete all workouts, tracked personal records, and custom favorites. Start with an empty canvas.
                </p>
              </div>

              {showClearConfirm ? (
                <div className="flex items-center gap-2 animate-in fade-in duration-150">
                  <button
                    onClick={() => {
                      onClearData();
                      setShowClearConfirm(false);
                      onClose();
                    }}
                    className="flex-1 py-2 px-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition cursor-pointer"
                  >
                    Confirm Wipe
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="py-2 px-3 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-zinc-300 text-xs font-mono transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  id="modal-clear-data-btn"
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full py-2 px-3 rounded-lg bg-[#1a1a1a] hover:bg-rose-600 text-zinc-200 hover:text-white border border-[#2e2e2e] hover:border-rose-600 text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Records</span>
                </button>
              )}
            </div>
          </div>

          {/* Safe Storage Notice */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-3.5 flex items-start gap-3 text-xs text-zinc-400 font-sans">
            <Sparkles className="w-4 h-4 text-[#D1FF00] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-300 font-mono">Tip:</span> We recommend exporting a JSON backup periodically to keep a permanent record of your personal bests and training journey.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
