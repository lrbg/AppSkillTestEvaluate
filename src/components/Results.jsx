import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '../utils/scoring';
import { generateHTMLReport } from '../utils/reportGenerator';
import { saveReportToGitHub, hasToken } from '../utils/githubStorage';

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

export default function Results({ reportData, onRestart }) {
  const done = useRef(false);
  const [githubStatus, setGithubStatus] = useState('idle'); // idle | saving | saved | error
  const { candidateName, score, durationSeconds } = reportData;
  const { earned, total, percentage, level, blockScores } = score;
  const duration = formatDuration(durationSeconds);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    // Auto-download HTML report
    const html = generateHTMLReport(reportData);
    const safeName = candidateName.replace(/\s+/g, '-').toLowerCase();
    const date = new Date().toISOString().slice(0, 10);
    triggerDownload(html, `reporte-qa-${safeName}-${date}.html`);

    // Auto-push JSON to GitHub if token is configured
    if (hasToken()) {
      setGithubStatus('saving');
      saveReportToGitHub(reportData)
        .then(() => setGithubStatus('saved'))
        .catch(() => setGithubStatus('error'));
    }
  }, [reportData, candidateName]);

  const levelMessages = {
    Senior: 'Excelente desempeño. Dominas los conceptos avanzados de QA y automatización.',
    'Semi-Senior': 'Buen conocimiento base con áreas de crecimiento. Tienes experiencia sólida.',
    Junior: 'Conoces los fundamentos del QA. Con práctica y estudio crecerás rápidamente.',
    'En Desarrollo': 'Hay fundamentos importantes por fortalecer. Estudia los conceptos básicos de QA.',
  };

  const githubMessage = {
    idle: null,
    saving: { text: '⏳ Guardando en GitHub...', color: '#f59e0b' },
    saved: { text: '✅ Reporte guardado en GitHub', color: '#10b981' },
    error: { text: '⚠️ No se pudo guardar en GitHub (token no configurado en este navegador)', color: '#ef4444' },
  }[githubStatus];

  return (
    <div className="results-page">
      <div className="results-container">

        <div className="results-hero" style={{ borderTop: `6px solid ${level.color}` }}>
          <div className="results-name">Evaluación completada: {candidateName}</div>
          <div className="results-score-ring">
            <svg viewBox="0 0 120 120" width="180" height="180">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke={level.color} strokeWidth="8"
                strokeDasharray="314"
                strokeDashoffset={314 - (314 * percentage / 100)}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 1.5s ease' }}
              />
              <text x="60" y="55" textAnchor="middle" fill={level.color} fontSize="28" fontWeight="800">{percentage}%</text>
              <text x="60" y="75" textAnchor="middle" fill="#64748b" fontSize="12">{earned}/{total} pts</text>
            </svg>
          </div>
          <div className="results-level" style={{ color: level.color }}>
            {level.icon} {level.label}
          </div>
          <p className="results-message">{levelMessages[level.label]}</p>
          <div className="results-meta">
            <span>⏱ Tiempo: {duration}</span>
            <span>📅 {new Date().toLocaleDateString('es-MX', { day:'numeric', month:'long', year:'numeric' })}</span>
          </div>
        </div>

        <div className="results-blocks">
          <h2>Resultados por Bloque</h2>
          <div className="blocks-grid">
            {Object.entries(blockScores).map(([block, data]) => {
              const pct = Math.round((data.earned / data.total) * 100);
              const color = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
              return (
                <div key={block} className="block-item">
                  <div className="block-name">{block}</div>
                  <div className="block-bar-wrap">
                    <div className="block-bar-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <div className="block-score" style={{ color }}>
                    {pct}% <span>({data.correct}/{data.count})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="results-footer">
          <div style={{ flex: 1 }}>
            <div className="results-note">
              <span>📄</span>
              <span>Reporte HTML descargado automáticamente.</span>
            </div>
            {githubMessage && (
              <div style={{ marginTop: '8px', fontSize: '13px', color: githubMessage.color, fontWeight: 500 }}>
                {githubMessage.text}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="btn-secondary"
              onClick={() => {
                const html = generateHTMLReport(reportData);
                const safeName = candidateName.replace(/\s+/g, '-').toLowerCase();
                triggerDownload(html, `reporte-qa-${safeName}-${new Date().toISOString().slice(0,10)}.html`);
              }}
            >
              ⬇ Descargar HTML
            </button>
            <button className="btn-primary" onClick={onRestart}>
              Nueva Evaluación
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
