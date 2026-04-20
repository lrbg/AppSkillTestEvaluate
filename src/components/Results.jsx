import { formatDuration } from '../utils/scoring';

export default function Results({ reportData, onRestart }) {
  const { candidateName, score, durationSeconds } = reportData;
  const { earned, total, percentage, level, blockScores } = score;
  const duration = formatDuration(durationSeconds);

  const levelMessages = {
    Senior: 'Excelente desempeño. Dominas los conceptos avanzados de QA y automatización. Eres un recurso valioso para cualquier equipo.',
    'Semi-Senior': 'Buen conocimiento base con áreas de crecimiento. Tienes experiencia sólida y potencial para avanzar al nivel Senior.',
    Junior: 'Conoces los fundamentos del QA. Con práctica y estudio de los temas avanzados, podrás crecer rápidamente.',
    'En Desarrollo': 'Hay fundamentos importantes por fortalecer. Te recomendamos estudiar los conceptos básicos de QA y testing.'
  };

  return (
    <div className="results-page">
      <div className="results-container">

        {/* Hero */}
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

        {/* Block breakdown */}
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

        {/* CTA */}
        <div className="results-footer">
          <div className="results-note">
            <span>✅</span>
            <span>Tu resultado ha sido guardado. El evaluador podrá revisar el reporte detallado.</span>
          </div>
          <button className="btn-primary" onClick={onRestart}>
            Nueva Evaluación
          </button>
        </div>

      </div>
    </div>
  );
}
