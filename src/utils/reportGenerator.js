import { formatDuration } from './scoring';

export function generateHTMLReport(reportData) {
  const { candidateName, score, startTime, endTime, durationSeconds, answers } = reportData;
  const { earned, total, percentage, level, details, blockScores } = score;
  const date = new Date(endTime).toLocaleString('es-MX');
  const duration = formatDuration(durationSeconds);

  const blockRows = Object.entries(blockScores).map(([block, data]) => {
    const pct = Math.round((data.earned / data.total) * 100);
    const color = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
    return `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">${block}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;text-align:center;">${data.correct}/${data.count}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;text-align:center;">${data.earned}/${data.total}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">
          <div style="background:#e2e8f0;border-radius:4px;height:8px;width:120px;display:inline-block;vertical-align:middle;">
            <div style="background:${color};height:8px;border-radius:4px;width:${pct}%;"></div>
          </div>
          <span style="margin-left:8px;color:${color};font-weight:600;">${pct}%</span>
        </td>
      </tr>`;
  }).join('');

  const questionRows = details.map((d, idx) => {
    const bg = d.isCorrect ? '#f0fdf4' : '#fff7f7';
    const icon = d.isCorrect ? '✅' : '❌';
    const diffLabel = ['', 'Junior', 'Semi-Senior', 'Senior'][d.difficulty];
    const userOpts = d.userAnswer.map(i => d.options[i]).join(', ') || '(sin respuesta)';
    const correctOpts = d.correctAnswer.map(i => d.options[i]).join(', ');
    const codeBlock = d.code ? `<pre style="background:#1e293b;color:#e2e8f0;padding:12px;border-radius:6px;font-size:12px;overflow-x:auto;white-space:pre-wrap;margin:8px 0;">${escapeHtml(d.code)}</pre>` : '';
    return `
      <tr style="background:${bg};">
        <td style="padding:14px;border-bottom:1px solid #e2e8f0;vertical-align:top;font-weight:600;white-space:nowrap;">${icon} P${idx + 1}</td>
        <td style="padding:14px;border-bottom:1px solid #e2e8f0;vertical-align:top;">
          <div style="font-size:11px;color:#64748b;margin-bottom:4px;">[${d.block}] · Nivel: ${diffLabel} · ${d.points} pt${d.points > 1 ? 's' : ''}</div>
          <div style="font-weight:500;margin-bottom:6px;">${d.question}</div>
          ${codeBlock}
          <div style="font-size:13px;margin-top:6px;">
            <span style="color:#64748b;">Tu respuesta:</span> <span style="color:${d.isCorrect ? '#16a34a' : '#dc2626'}">${userOpts}</span>
          </div>
          ${!d.isCorrect ? `<div style="font-size:13px;margin-top:4px;"><span style="color:#64748b;">Respuesta correcta:</span> <span style="color:#16a34a;font-weight:500;">${correctOpts}</span></div>` : ''}
          <div style="font-size:12px;color:#475569;background:#f8fafc;border-left:3px solid #94a3b8;padding:8px 12px;margin-top:8px;border-radius:0 4px 4px 0;">
            <strong>Explicación:</strong> ${d.explanation}
          </div>
        </td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Reporte QA — ${candidateName}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f1f5f9; color: #1e293b; }
    .container { max-width: 900px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.08); padding: 28px; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 700; }
    h2 { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #334155; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 10px 14px; background: #f8fafc; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 2px solid #e2e8f0; }
    @media print { body { background: #fff; } .container { padding: 0; } }
  </style>
</head>
<body>
<div class="container">

  <!-- Header -->
  <div class="card" style="background:linear-gradient(135deg,#1e293b 0%,#334155 100%);color:#fff;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
      <div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;opacity:.7;margin-bottom:4px;">Reporte de Evaluación QA</div>
        <h1 style="color:#fff;font-size:28px;">${candidateName}</h1>
        <div style="opacity:.8;margin-top:6px;font-size:14px;">Evaluado el ${date} · Duración: ${duration}</div>
      </div>
      <div style="text-align:center;background:rgba(255,255,255,.1);border-radius:12px;padding:20px 28px;">
        <div style="font-size:48px;font-weight:800;color:${level.color};">${percentage}%</div>
        <div style="font-size:20px;font-weight:700;color:${level.color};margin-top:4px;">${level.icon} ${level.label}</div>
        <div style="font-size:13px;opacity:.7;margin-top:4px;">${earned} / ${total} puntos</div>
      </div>
    </div>
  </div>

  <!-- Resumen por bloque -->
  <div class="card">
    <h2>Desempeño por Bloque</h2>
    <table>
      <thead><tr>
        <th>Bloque</th>
        <th style="text-align:center;">Correctas</th>
        <th style="text-align:center;">Puntos</th>
        <th>Progreso</th>
      </tr></thead>
      <tbody>${blockRows}</tbody>
    </table>
  </div>

  <!-- Detalle preguntas -->
  <div class="card">
    <h2>Detalle de Respuestas</h2>
    <table>
      <thead><tr><th style="width:60px;">#</th><th>Pregunta y Evaluación</th></tr></thead>
      <tbody>${questionRows}</tbody>
    </table>
  </div>

  <div style="text-align:center;font-size:12px;color:#94a3b8;padding:16px;">
    Generado por QA Skill Evaluator · Confidencial
  </div>
</div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
