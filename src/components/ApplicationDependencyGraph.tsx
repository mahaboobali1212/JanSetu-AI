import React, { useState } from 'react';
import { DependencyNode } from '../types/preflight';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Building, 
  Zap, 
  FileCheck2, 
  ExternalLink, 
  GraduationCap, 
  Award,
  ChevronRight,
  Info,
  Sparkles
} from 'lucide-react';

interface ApplicationDependencyGraphProps {
  nodes: DependencyNode[];
  onRemediateNode?: (nodeId: string) => void;
}

export const ApplicationDependencyGraph: React.FC<ApplicationDependencyGraphProps> = ({
  nodes,
  onRemediateNode
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    nodes.find(n => n.status === 'BLOCKED')?.id || nodes[0]?.id || ''
  );

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Building': return Building;
      case 'Zap': return Zap;
      case 'FileCheck2': return FileCheck2;
      case 'ExternalLink': return ExternalLink;
      case 'GraduationCap': return GraduationCap;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  const getStatusBadge = (status: DependencyNode['status']) => {
    switch (status) {
      case 'COMPLETED':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
          label: 'Completed ✓'
        };
      case 'IN_PROGRESS':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-300',
          icon: Clock,
          iconColor: 'text-amber-600',
          label: 'In Progress ⏳'
        };
      case 'BLOCKED':
        return {
          bg: 'bg-rose-50 text-rose-900 border-rose-300',
          icon: XCircle,
          iconColor: 'text-rose-600',
          label: 'Blocked ✗'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: Clock,
          iconColor: 'text-slate-400',
          label: 'Upcoming'
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DFB738]/40 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#DFB738]/40 font-mono">
              Statutory Lifecycle
            </span>
            <span className="text-xs text-slate-500 font-serif">Aadhaar ➔ Bank ➔ DBT ➔ Portal ➔ Sanction</span>
          </div>
          <h3 className="text-lg font-bold font-serif text-[#0B1B4F] mt-1">
            Application Statutory Dependency Graph
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 font-medium text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed
          </span>
          <span className="flex items-center gap-1 font-medium text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> In Progress
          </span>
          <span className="flex items-center gap-1 font-medium text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Blocked
          </span>
        </div>
      </div>

      {/* Horizontal Interactive Node Train */}
      <div className="overflow-x-auto pb-3 pt-1 no-scrollbar">
        <div className="flex items-center gap-2 min-w-[760px]">
          {nodes.map((node, index) => {
            const Icon = getIcon(node.iconName);
            const statusInfo = getStatusBadge(node.status);
            const isSelected = selectedNode?.id === node.id;
            const isBlocked = node.status === 'BLOCKED';

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <button
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`flex-1 min-w-[130px] p-3 rounded-2xl border text-left transition-all relative cursor-pointer group ${
                    isSelected
                      ? 'bg-[#0B1B4F] text-white border-[#DFB738] shadow-md ring-2 ring-[#DFB738]/40'
                      : isBlocked
                      ? 'bg-rose-50/60 border-rose-300 hover:border-rose-400'
                      : node.status === 'COMPLETED'
                      ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                      : 'bg-[#FAF7F2] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Step Number Tag */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-white/20 text-[#F5E29F]' : 'bg-slate-200 text-slate-700'
                    }`}>
                      0{node.stageNumber}
                    </span>
                    <statusInfo.icon className={`w-3.5 h-3.5 ${
                      isSelected ? (node.status === 'COMPLETED' ? 'text-emerald-300' : isBlocked ? 'text-rose-300' : 'text-amber-300') : statusInfo.iconColor
                    }`} />
                  </div>

                  <div className={`text-xs font-bold leading-tight truncate ${
                    isSelected ? 'text-white' : 'text-[#0B1B4F]'
                  }`}>
                    {node.label}
                  </div>

                  <div className={`text-[10px] truncate mt-0.5 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {node.subLabel}
                  </div>
                </button>

                {/* Connector Arrow */}
                {index < nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Dive Card */}
      {selectedNode && (
        <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          selectedNode.status === 'BLOCKED'
            ? 'bg-rose-50/80 border-rose-300 text-rose-950'
            : selectedNode.status === 'COMPLETED'
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            : 'bg-[#FAF7F2] border-[#DFB738]/40 text-[#0B1B4F]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/10">
                  STAGE 0{selectedNode.stageNumber}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  getStatusBadge(selectedNode.status).bg
                }`}>
                  {getStatusBadge(selectedNode.status).label}
                </span>
                <span className="text-xs text-slate-600 font-sans">
                  Authority: <strong>{selectedNode.statutoryAuthority}</strong>
                </span>
              </div>
              <h4 className="text-base font-bold font-serif">
                {selectedNode.label}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedNode.details}
              </p>
              {selectedNode.blockerReason && (
                <div className="mt-2 text-xs font-semibold text-rose-800 bg-rose-100/90 border border-rose-300 p-2.5 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span><strong>Blocker Identified:</strong> {selectedNode.blockerReason}</span>
                </div>
              )}
            </div>

            <div className="shrink-0 text-left sm:text-right space-y-1.5">
              <div className="text-[11px] text-slate-500 font-mono">
                SLA Turnaround: <strong>{selectedNode.estimatedTurnaround}</strong>
              </div>
              {selectedNode.status === 'BLOCKED' && onRemediateNode && (
                <button
                  onClick={() => onRemediateNode(selectedNode.id)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <span>Fix Stage Blocker</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
