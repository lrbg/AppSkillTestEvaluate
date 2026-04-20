import { useState, useEffect, useCallback } from 'react';
import {
  getToken, setToken, clearToken, hasToken, validateToken,
  getAllReportsFromGitHub, deleteReportFromGitHub, saveReportToGitHub
} from '../utils/githubStorage';
import { getAllReports } from '../utils/storage';
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

// ─── Token Setup Panel ───────────────────────────────────────────────────────
function TokenSetup({ onConfigured }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | validating | error
  const [errMsg, setErrMsg] = useState('');

  async function handleSave() {
    if (!input.trim()) return;
    setStatus('validating');
    setErrMsg('');
    try {
      await validateToken(input.trim());
      setToken(input.trim());
      onConfigured();
    } catch (e) {
      setStatus('error');
      setErrMsg(e.message);
    }
  }

  return (
    <div className="token-setup-page">
      <div className="token-setup-card">
        <div className="token-setup-icon">🔑</div>
        <h2>Configurar acceso a GitHub</h2>
        <p>
          Para guardar y leer reportes desde el repositorio, necesitas un
          <strong> Personal Access Token (PAT)</strong> de GitHub con permiso
          <code>Contents: Read &amp; Write</code> en el repo <code>AppSkillTestEvaluate</code>.
        </p>

        <div className="token-steps">
          <div className="token-step">
            <span className="step-num">1</span>
            <span>Ve a <strong>GitHub → Settings → Developer settings → Fine-grained tokens</strong></span>
          </div>
          <div className="token-step">
            <span className="step-num">2</span>
            <span>Crea un token para el repo <code>lrbg/AppSkillTestEvaluate</code> con permiso <strong>Contents: Read &amp; Write</strong></span>
          </div>
          <div className="token-step">
            <span className="step-num">3</span>
            <span>Pega el token aquí abajo y haz clic en <strong>Guardar</strong></span>
          </div>
        </div>

        <div className="token-input-row">
          <input
            type="password"
            className={`form-input ${status === 'error' ? 'input-error' : ''}`}
            placeholder="github_pat_..."
            value={input}
            onChange={e => { setInput(e.target.value); setStatus('idle'); }}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={!input.trim() || status === 'validating'}
          >
            {status === 'validating' ? 'Verificando...' : 'Guardar'}
          </button>
        </div>
        {status === 'error' && <p className="form-error" style={{ marginTop: '8px' }}>❌ {errMsg}</p>}
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
          El token se guarda solo en este navegador (localStorage). No se comparte con nadie.
        </p>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [tokenReady, setTokenReady] = useState(hasToken());
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [syncStatus, setSyncStatus] = useState(''); // message for sync feedback

  const loadReports = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await getAllReportsFromGitHub();
      setReports(data);
    } catch (e) {
      setLoadError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tokenReady) loadReports();
  }, [tokenReady, loadReports]);

  async function handleDelete(report) {
    try {
      await deleteReportFromGitHub(report);
      setReports(prev => prev.filter(r => r.id !== report.id));
      if (selected?.id === report.id) setSelected(null);
    } catch (e) {
      alert('Error al eliminar: ' + e.message);
    }
  }

  async function handleDeleteAll() {
    setShowDeleteAll(false);
    setSyncStatus('Eliminando todos los reportes...');
    try {
      await Promise.all(reports.map(r => deleteReportFromGitHub(r)));
      setReports([]);
      setSelected(null);
      setSyncStatus('✅ Todos los reportes eliminados.');
    } catch (e) {
      setSyncStatus('❌ Error al eliminar: ' + e.message);
    }
    setTimeout(() => setSyncStatus(''), 4000);
  }

  async function handleSyncLocal() {
    const local = getAllReports();
    if (local.length === 0) { setSyncStatus('No hay reportes locales para sincronizar.'); setTimeout(() => setSyncStatus(''), 3000); return; }
    setSyncStatus(`Sincronizando ${local.length} reporte(s) locales a GitHub...`);
    let ok = 0;
    for (const r of local) {
      try { await saveReportToGitHub(r); ok++; } catch (_) {}
    }
    setSyncStatus(`✅ ${ok}/${local.length} reportes sincronizados a GitHub.`);
    await loadReports();
    setTimeout(() => setSyncStatus(''), 5000);
  }

  function openHTMLReport(report) {
    const html = generateHTMLReport(report);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    window.open(URL.createObjectURL(blob), '_blank');
  }

  function downloadHTMLReport(report) {
    const html = generateHTMLReport(report);
    const safeName = report.candidateName.replace(/\s+/g, '-').toLowerCase();
    triggerDownload(html, `reporte-qa-${safeName}-${new Date(report.savedAt).toISOString().slice(0,10)}.html`);
  }

  function openGeneralReport() {
    const html = generateGeneralReport(reports);
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    window.open(URL.createObjectURL(blob), '_blank');
  }

  function downloadGeneralReport() {
    const html = generateGeneralReport(reports);
    if (!html) return;
    triggerDownload(html, `reporte-general-qa-${new Date().toISOString().slice(0,10)}.html`);
  }

  if (!tokenReady) {
    return <TokenSetup onConfigured={() => setTokenReady(true)} />;
  }

  const filtered = reports
    .filter(r => filter === 'all' || r.score.level.label === filter)
    .filter(r => !search || r.candidateName.toLowerCase().includes(search.toLowerCase()));

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
            <p>QA Skill Evaluator — Reportes desde GitHub · lrbg/AppSkillTestEvaluate</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="btn-secondary" style={{ fontSize: '13px', padding: '7px 14px' }} onClick={loadReports} disabled={loading}>
              {loading ? '⏳ Cargando...' : '🔄 Recargar'}
            </button>
            <button
              className="btn-danger-sm"
              onClick={() => { clearToken(); setTokenReady(false); setReports([]); }}
            >
              🔑 Cambiar token
            </button>
            <div className="admin-header-badge">🔒 Privado</div>
          </div>
        </div>
      </header>

      <div className="admin-body">

        {loadError && (
          <div className="admin-alert-error">
            ❌ Error al cargar desde GitHub: {loadError}
            <button onClick={loadReports} style={{ marginLeft: '12px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>Reintentar</button>
          </div>
        )}

        {syncStatus && (
          <div className="admin-alert-info">{syncStatus}</div>
        )}

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat">
            <span className="astat-n">{reports.length}</span>
            <span className="astat-l">Total</span>
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
          <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', flexWrap: 'wrap' }}>
            <button className="btn-action view" style={{ padding: '7px 14px', fontSize: '13px' }} onClick={handleSyncLocal} title="Sincroniza reportes guardados en este navegador (localStorage) hacia GitHub">
              ⬆ Sync local → GitHub
            </button>
            {reports.length > 0 && (<>
              <button className="btn-action view" style={{ padding: '7px 14px', fontSize: '13px' }} onClick={openGeneralReport}>📊 Reporte general</button>
              <button className="btn-action download" style={{ padding: '7px 14px', fontSize: '13px' }} onClick={downloadGeneralReport}>⬇ Descargar general</button>
              <button className="btn-danger-sm" onClick={() => setShowDeleteAll(true)}>🗑 Limpiar todo</button>
            </>)}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="admin-empty">⏳ Cargando reportes desde GitHub...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            {reports.length === 0
              ? '📭 No hay evaluaciones en GitHub aún. Los reportes aparecerán aquí cuando se completen evaluaciones.'
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
                      <span className="score-text" style={{ color: report.score.level.color }}>{report.score.percentage}%</span>
                      <span className="score-sub"> ({report.score.earned}/{report.score.total})</span>
                    </td>
                    <td>{formatDuration(report.durationSeconds)}</td>
                    <td className="td-date">
                      {new Date(report.savedAt).toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="action-btns">
                        <button className="btn-action view" onClick={() => openHTMLReport(report)}>👁 Ver</button>
                        <button className="btn-action download" onClick={() => downloadHTMLReport(report)}>⬇ HTML</button>
                        <button className="btn-action delete" onClick={() => handleDelete(report)}>🗑</button>
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
              <button className="btn-primary" onClick={() => openHTMLReport(selected)}>Ver Reporte Completo</button>
              <button className="btn-secondary" onClick={() => downloadHTMLReport(selected)}>Descargar HTML</button>
            </div>
          </div>
        )}
      </div>

      {showDeleteAll && (
        <div className="modal-overlay" onClick={() => setShowDeleteAll(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2>¿Eliminar todos los reportes?</h2>
            <p className="modal-warning">⚠️ Se eliminarán los {reports.length} archivos JSON del repositorio. Esta acción es irreversible.</p>
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
