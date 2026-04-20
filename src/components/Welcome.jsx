import { useState } from 'react';
import { QUESTIONS, MAX_TIME_MINUTES } from '../data/questions';

export default function Welcome({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setError('Por favor ingresa tu nombre completo (mínimo 3 caracteres).');
      return;
    }
    if (trimmed.split(' ').length < 2) {
      setError('Por favor ingresa tu nombre Y apellido.');
      return;
    }
    onStart(trimmed);
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#1e293b"/>
            <path d="M12 16h24M12 24h16M12 32h20" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="36" cy="32" r="6" fill="#10b981"/>
            <path d="M33 32l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="welcome-title">QA Skill Evaluator</h1>
        <p className="welcome-subtitle">Evaluación de Conocimientos en QA & Testing</p>

        <div className="welcome-stats">
          <div className="stat-item">
            <span className="stat-number">{QUESTIONS.length}</span>
            <span className="stat-label">Preguntas</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">{MAX_TIME_MINUTES}</span>
            <span className="stat-label">Minutos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Niveles</span>
          </div>
        </div>

        <div className="welcome-topics">
          <h3>Temas evaluados:</h3>
          <div className="topics-grid">
            {['Fundamentos QA', 'Testing Manual', 'Automatización', 'API Testing', 'CI/CD & DevOps', 'Metodologías Ágiles', 'Performance & Seguridad', 'Ejercicios Prácticos'].map(t => (
              <span key={t} className="topic-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="welcome-info">
          <p>⏱️ Tienes <strong>{MAX_TIME_MINUTES} minutos</strong> para completar la evaluación.</p>
          <p>📝 Las preguntas son de opción múltiple (algunas tienen más de una respuesta correcta).</p>
          <p>🔒 Puedes navegar entre preguntas antes de enviar.</p>
          <p>🏆 Al finalizar verás tu nivel: <strong>Junior</strong>, <strong>Semi-Senior</strong> o <strong>Senior</strong>.</p>
        </div>

        <form onSubmit={handleSubmit} className="welcome-form">
          <label htmlFor="fullname" className="form-label">Nombre completo del candidato</label>
          <input
            id="fullname"
            type="text"
            className={`form-input ${error ? 'input-error' : ''}`}
            placeholder="Ej: María García López"
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            autoFocus
          />
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-primary btn-lg" disabled={!name.trim()}>
            Comenzar Evaluación →
          </button>
        </form>
      </div>
    </div>
  );
}
