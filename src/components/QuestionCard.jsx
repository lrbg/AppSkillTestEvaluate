export default function QuestionCard({ question, answer, onChange }) {
  const isMultiple = question.type === 'multiple';

  function toggle(optionIndex) {
    if (isMultiple) {
      const current = answer || [];
      const next = current.includes(optionIndex)
        ? current.filter(i => i !== optionIndex)
        : [...current, optionIndex];
      onChange(question.id, next.sort((a, b) => a - b));
    } else {
      onChange(question.id, [optionIndex]);
    }
  }

  const selected = answer || [];
  const diffLabel = ['', 'Junior', 'Semi-Senior', 'Senior'][question.difficulty];
  const diffColor = ['', '#3b82f6', '#f59e0b', '#10b981'][question.difficulty];

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="question-block">{question.block}</span>
        <span className="question-badge" style={{ background: diffColor + '20', color: diffColor, border: `1px solid ${diffColor}40` }}>
          {diffLabel}
        </span>
        <span className="question-pts">{question.points} pt{question.points > 1 ? 's' : ''}</span>
        {isMultiple && (
          <span className="question-multiple-hint">☑ Múltiple respuesta</span>
        )}
      </div>

      <p className="question-text">{question.question}</p>

      {question.code && (
        <pre className="question-code"><code>{question.code}</code></pre>
      )}

      <div className="options-list">
        {question.options.map((option, idx) => {
          const isSelected = selected.includes(idx);
          return (
            <button
              key={idx}
              className={`option-btn ${isSelected ? 'option-selected' : ''}`}
              onClick={() => toggle(idx)}
              type="button"
            >
              <span className={`option-indicator ${isMultiple ? 'checkbox' : 'radio'} ${isSelected ? 'checked' : ''}`}>
                {isMultiple ? (isSelected ? '☑' : '☐') : (isSelected ? '◉' : '○')}
              </span>
              <span className="option-text">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
