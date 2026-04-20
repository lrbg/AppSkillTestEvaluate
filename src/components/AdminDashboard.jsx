import { useState, useEffect } from 'react';
import { getAllReports, deleteReport, clearAllReports } from '../utils/storage';
import { generateHTMLReport, generateGeneralReport } from '../utils/reportGenerator';
import { formatDuration } from '../utils/scoring';

function triggerDownload(html, filename) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  useEffect(() => {
    setReports(getAllReports());
  }, []);

  function refresh() { setReports(getAllReports()); }

  function handleDelete(id) {
    deleteReport(id);
    refresh();
    if (selected?.id === id) setSelected(null);
  }

  function handleDeleteAll() {
    clearAllReports();
    refresh();
    setSelected(null);
    setShowDeleteAll(false);
  }

  function openHTMLReport(report) {
    const html = generateHTMLReport(report);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  function downloadGeneralReport() {
    const html = generateGeneralReport(reports);
    if (!html) return;
    const date = new Date().toISOString().slice(0, 10);
    triggerDownload(html, `reporte-general-qa-${date}.html`);
  }

  function openGeneralReport() {
    const html = generateGeneralReport(reports);
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  function downloadHTMLReport(report) {
    const html = generateHTMLReport(report);
    const safeName = report.candidateName.replace(/\s+/g, '-').toLowerCase();
    triggerDownload(html, `reporte-qa-${safeName}-${new Date(report.savedAt).toISOString().slice(0,10)}.html`);
  }

  const filtered = reports
    .filter(r => filter === 'all' || r.score.level.label === filter)
    .filter(r => search ? r.candidateName.toLowerCase().includes(search.toLowerCase()) : true)
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  const levelCounts = reports.reduce((acc, r) => {
    acc[r.score.level.label] = (acc[r.score.level.label] || 0) + 1;
    return acc;
  }, {});

  const avgScore = reports.length > 0
    ? Math.round(reports.reduce((s, r) => s + r.score.percentage, 0) / reports.length)
    : 0;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Panel de Administración</h1>
            <p>QA Skill Evaluator — Reportes Privados</p>
          </div>
          <div className="admin-header-badge">🔒 Acceso Privado</div>
        </div>
      </header>

      <div className="admin-body">
        {/* Stats row */}
        <div className="admin-stats">
          <div className="admin-stat">
            <span className="astat-n">{reports.length}</span>
            <span className="astat-l">Total evaluados</span>
          </div>
          <div className="admin-stat">
            <span className="astat-n" style={{ color: '#10b981' }}>{levelCounts['Senior'] || 0}</span>
            <span className="astat-l">Senior</span>
          </div>
          <div className="admin-stat">
            <span className="astat-n" style={{ color: '#f59e0b' }}>{levelCounts['Semi-Senior'] || 0}</span>
            <span className="astat-l">Semi-Senior</span>
          </div>
          <div className="admin-stat">
            <span className="astat-n" style={{ color: '#3b82f6' }}>{levelCounts['Junior'] || 0}</span>
            <span className="astat-l">Junior</span>
          </div>
          <div className="admin-stat">
            <span className="astat-n">{avgScore}%</span>
            <span className="astat-l">Promedio</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="admin-toolbar">
          <input
            type="text"
            className="admin-search"
            placeholder="Buscar candidato..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="admin-filters">
            {['all', 'Senior', 'Semi-Senior', 'Junior', 'En Desarrollo'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'filter-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'Todos' : f}
              </button>
            ))}
          </div>
          {reports.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', flexWrap: 'wrap' }}>
              <button className="btn-action view" style={{ padding: '7px 14px', fontSize: '13px' }} onClick={openGeneralReport}>
                📊 Ver reporte general
              </button>
              <button className="btn-action download" style={{ padding: '7px 14px', fontSize: '13px' }} onClick={downloadGeneralReport}>
                ⬇ Descargar reporte general
              </button>
              <button className="btn-danger-sm" onClick={() => setShowDeleteAll(true)}>
                🗑 Limpiar todo
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="admin-empty">
            {reports.length === 0
              ? '📭 No hay evaluaciones guardadas aún.'
              : '🔍 No hay resultados para los filtros aplicados.'}
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Nivel</th>
                  <th>Puntaje</th>
                  <th>Duración</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(report => (
                  <tr
                    key={report.id}
                    className={selected?.id === report.id ? 'row-selected' : ''}
                    onClick={() => setSelected(selected?.id === report.id ? null : report)}
                  >
                    <td className="td-name">{report.candidateName}</td>
                    <td>
                      <span className="level-badge" style={{
                        background: report.score.level.color + '20',
                        color: report.score.level.color,
                        border: `1px solid ${report.score.level.color}40`
                      }}>
                        {report.score.level.icon} {report.score.level.label}
                      </span>
                    </td>
                    <td>
                      <span className="score-text" style={{ color: report.score.level.color }}>
                        {report.score.percentage}%
                      </span>
                      <span className="score-sub"> ({report.score.earned}/{report.score.total})</span>
                    </td>
                    <td>{formatDuration(report.durationSeconds)}</td>
                    <td className="td-date">
                      {new Date(report.savedAt).toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="action-btns">
                        <button className="btn-action view" onClick={() => openHTMLReport(report)} title="Ver reporte HTML">
                          👁 Ver
                        </button>
                        <button className="btn-action download" onClick={() => downloadHTMLReport(report)} title="Descargar HTML">
                          ⬇ HTML
                        </button>
                        <button className="btn-action delete" onClick={() => handleDelete(report.id)} title="Eliminar">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detail panel */}
        {selected && (
          <div className="admin-detail">
            <div className="detail-header">
              <h3>Detalle: {selected.candidateName}</h3>
              <button className="btn-icon" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="detail-blocks">
              {Object.entries(selected.score.blockScores).map(([block, data]) => {
                const pct = Math.round((data.earned / data.total) * 100);
                const color = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
                return (
                  <div key={block} className="detail-block-item">
                    <div className="detail-block-name">{block}</div>
                    <div className="detail-block-bar">
                      <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: '4px', transition: 'width .6s' }} />
                    </div>
                    <div className="detail-block-pct" style={{ color }}>{pct}%</div>
                  </div>
                );
              })}
            </div>
            <div className="detail-actions">
              <button className="btn-primary" onClick={() => openHTMLReport(selected)}>
                Ver Reporte Completo
              </button>
              <button className="btn-secondary" onClick={() => downloadHTMLReport(selected)}>
                Descargar HTML
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete all confirm */}
      {showDeleteAll && (
        <div className="modal-overlay" onClick={() => setShowDeleteAll(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2>¿Eliminar todos los reportes?</h2>
            <p className="modal-warning">⚠️ Esta acción es irreversible. Se perderán todos los datos guardados.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowDeleteAll(false)}>Cancelar</button>
              <button className="btn-danger" onClick={handleDeleteAll}>Sí, eliminar todo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
