// QA Evaluation Questions
// difficulty: 1=Junior, 2=Semi-Senior, 3=Senior
// type: 'single' | 'multiple' | 'code'
// points: based on difficulty

export const QUESTIONS = [
  // ─── BLOQUE 1: FUNDAMENTOS DE QA ───────────────────────────────────────────
  {
    id: 1,
    block: "Fundamentos de QA",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "¿Cuál es la diferencia principal entre Verificación y Validación en QA?",
    options: [
      "Verificación = el producto hace lo correcto; Validación = el producto está bien construido",
      "Verificación = el producto está bien construido (¿Lo estamos construyendo correctamente?); Validación = el producto hace lo correcto (¿Estamos construyendo el producto correcto?)",
      "Son sinónimos, ambas significan revisar que el software funcione",
      "Verificación aplica solo en testing manual; Validación solo en automatizado"
    ],
    correct: [1],
    explanation: "Verificación responde '¿Lo estamos construyendo correctamente?' (proceso). Validación responde '¿Estamos construyendo el producto correcto?' (producto vs. necesidad del usuario)."
  },
  {
    id: 2,
    block: "Fundamentos de QA",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "¿Cuál es el orden correcto del ciclo de vida de un defecto?",
    options: [
      "Nuevo → Asignado → Abierto → Fijo → Retest → Cerrado",
      "Reportado → Revisado → Cerrado → Reabierto",
      "Nuevo → Abierto → Asignado → Fijo → Retest → Cerrado / Reabierto",
      "Detectado → Rechazado → Resuelto → Aprobado"
    ],
    correct: [2],
    explanation: "El ciclo estándar: Nuevo → Abierto → Asignado → Fijo → Retest → Cerrado. Si el fix no funciona, va a Reabierto."
  },
  {
    id: 3,
    block: "Fundamentos de QA",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "Un bug bloquea completamente una funcionalidad crítica de producción. ¿Qué combinación Severidad/Prioridad le asignas?",
    options: [
      "Severidad: Baja — Prioridad: Alta",
      "Severidad: Alta — Prioridad: Alta",
      "Severidad: Alta — Prioridad: Baja",
      "Severidad: Media — Prioridad: Media"
    ],
    correct: [1],
    explanation: "Severidad indica el impacto técnico (Alto: bloquea funcionalidad crítica). Prioridad indica cuán rápido debe resolverse (Alto: producción afectada). Ambas son altas."
  },
  {
    id: 4,
    block: "Fundamentos de QA",
    difficulty: 2,
    points: 2,
    type: "multiple",
    timeEstimate: 3,
    question: "¿Cuáles de las siguientes son técnicas de diseño de casos de prueba de caja negra? (Selecciona TODAS las correctas)",
    options: [
      "Partición de equivalencia",
      "Análisis de valor límite",
      "Cobertura de sentencias",
      "Tabla de decisión",
      "Prueba de mutación"
    ],
    correct: [0, 1, 3],
    explanation: "Caja negra: Partición de equivalencia, Análisis de valor límite, Tabla de decisión, Casos de uso. Cobertura de sentencias y prueba de mutación son técnicas de caja blanca."
  },
  {
    id: 5,
    block: "Fundamentos de QA",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "¿Qué es la 'Pirámide de Testing' y cuál es su layer más amplio (base)?",
    options: [
      "E2E tests en la base, unitarios arriba — porque los E2E prueban más escenarios",
      "Pruebas unitarias en la base, integración en el medio, E2E en la cima",
      "Pruebas manuales en la base, automatizadas arriba",
      "Regresión en la base, smoke en la cima"
    ],
    correct: [1],
    explanation: "La pirámide de Mike Cohn: Unitarias (base, más rápidas, más baratas) → Integración → E2E (cima, más lentas, más caras). Debe haber más unitarias que E2E."
  },
  {
    id: 6,
    block: "Fundamentos de QA",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "En Partición de Equivalencia, para un campo que acepta edades entre 18 y 65 años (inclusive), ¿cuáles son las clases de equivalencia CORRECTAS?",
    options: [
      "Válidas: {18–65}. Inválidas: {<18}, {>65}",
      "Válidas: {0–18}, {18–65}. Inválidas: {66–100}",
      "Solo la clase válida: {18–65}",
      "Válidas: {18}, {65}. Inválidas: {17}, {66}"
    ],
    correct: [0],
    explanation: "Partición correcta: 1 clase válida {18–65} y 2 clases inválidas {<18} y {>65}. Los valores 18 y 65 son parte de la clase válida, no clases separadas."
  },

  // ─── BLOQUE 2: TESTING MANUAL ──────────────────────────────────────────────
  {
    id: 7,
    block: "Testing Manual",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "¿Qué información es INDISPENSABLE en un buen reporte de bug?",
    options: [
      "Título, descripción, pasos para reproducir, resultado esperado, resultado actual, ambiente, evidencia",
      "Solo el título y la captura de pantalla",
      "El código que causó el error y el nombre del desarrollador responsable",
      "La fecha del bug y el módulo afectado"
    ],
    correct: [0],
    explanation: "Un bug report completo debe tener: título claro, descripción, steps to reproduce, expected vs actual result, ambiente (OS, browser, versión), severidad/prioridad y evidencia (screenshot/video)."
  },
  {
    id: 8,
    block: "Testing Manual",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "¿Cuál es la diferencia entre Smoke Testing y Sanity Testing?",
    options: [
      "Son exactamente lo mismo, solo cambia el nombre según la empresa",
      "Smoke: prueba superficial del build completo para ver si es estable. Sanity: prueba específica de un área tras un fix puntual",
      "Smoke: prueba profunda de funcionalidades críticas. Sanity: prueba rápida de todo el sistema",
      "Smoke aplica en producción; Sanity solo en ambientes de desarrollo"
    ],
    correct: [1],
    explanation: "Smoke Testing verifica que el build completo sea estable (¿prende?). Sanity Testing verifica que un fix específico o nueva funcionalidad funcione correctamente, sin regresiones en esa área."
  },
  {
    id: 9,
    block: "Testing Manual",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "Estás a 2 días del release y tienes 200 casos de prueba pendientes. ¿Qué estrategia aplicas?",
    options: [
      "Ejecutas todos los casos en orden, sin importar el tiempo",
      "Aplicas Risk-Based Testing: priorizas casos de alto riesgo, funcionalidades críticas y cambios recientes",
      "Ejecutas solo smoke testing y liberas",
      "Pides que se postpone el release hasta terminar todos los casos"
    ],
    correct: [1],
    explanation: "Risk-Based Testing permite priorizar según impacto del negocio y probabilidad de falla. Se priorizan: funcionalidades críticas del negocio, áreas con cambios recientes, y módulos con historial de bugs."
  },
  {
    id: 10,
    block: "Testing Manual",
    difficulty: 2,
    points: 2,
    type: "multiple",
    timeEstimate: 4,
    question: "¿Cuáles de los siguientes elementos forman parte de un Plan de Pruebas? (Selecciona TODAS las correctas)",
    options: [
      "Alcance y objetivos del testing",
      "Estrategia de pruebas y tipos de testing a aplicar",
      "Código fuente de los casos de prueba automatizados",
      "Criterios de entrada y salida (entry/exit criteria)",
      "Recursos, roles y responsabilidades",
      "Lista de tareas del desarrollador"
    ],
    correct: [0, 1, 3, 4],
    explanation: "Un Test Plan incluye: alcance, objetivos, estrategia, tipos de prueba, criterios de entrada/salida, recursos/roles, cronograma, riesgos y métricas. El código de automatización y las tareas del dev no pertenecen al Test Plan."
  },

  // ─── BLOQUE 3: AUTOMATIZACIÓN DE PRUEBAS ──────────────────────────────────
  {
    id: 11,
    block: "Automatización",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "¿Qué es el Page Object Model (POM) en automatización?",
    options: [
      "Un framework de testing para móviles",
      "Un patrón de diseño que separa la lógica del test de la interacción con la UI, creando clases que representan páginas",
      "Una herramienta para generar reportes automáticos de pruebas",
      "Un modelo para calcular el número de casos de prueba necesarios"
    ],
    correct: [1],
    explanation: "POM es un patrón de diseño donde cada página web tiene una clase que encapsula sus elementos y acciones. Mejora la mantenibilidad: si cambia un selector, solo se actualiza la clase de esa página."
  },
  {
    id: 12,
    block: "Automatización",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "¿Cuándo NO deberías automatizar un caso de prueba?",
    options: [
      "Cuando es un test de regresión que se ejecuta con cada deploy",
      "Cuando la UI cambia frecuentemente, el test se ejecuta 1 sola vez, o es exploratorio",
      "Cuando el test tarda más de 5 minutos en ejecutarse manualmente",
      "Cuando el test involucra múltiples módulos del sistema"
    ],
    correct: [1],
    explanation: "No automatizar cuando: el ROI es bajo (se ejecuta poco), la UI es muy inestable (costo de mantenimiento alto), pruebas exploratorias (requieren criterio humano), o pruebas de usabilidad."
  },
  {
    id: 13,
    block: "Automatización",
    difficulty: 2,
    points: 2,
    type: "code",
    timeEstimate: 8,
    question: "Analiza este test de Cypress. ¿Cuál es el problema principal?",
    code: `describe('Login Test', () => {
  it('should login successfully', () => {
    cy.visit('https://app.example.com/login');
    cy.wait(5000);
    cy.get('#username').type('admin');
    cy.wait(3000);
    cy.get('#password').type('password123');
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.url().should('include', '/dashboard');
  });
});`,
    options: [
      "El test usa cy.visit() con una URL absoluta, debería usar una relativa",
      "Abuso de cy.wait() con tiempos fijos — debería usar assertions dinámicas o cy.intercept() para esperar elementos/requests",
      "No tiene beforeEach() para navegar a la página",
      "Las credenciales deberían estar en variables de entorno (problema menor pero el principal es otro)"
    ],
    correct: [1],
    explanation: "El problema principal es el uso de cy.wait() con valores fijos (anti-pattern 'flaky test'). Cypress es asíncrono y tiene retry automático. Se debe reemplazar con: cy.get('#username').should('be.visible'), cy.intercept() para requests, etc. Las credenciales en variables de entorno también es importante pero secundario."
  },
  {
    id: 14,
    block: "Automatización",
    difficulty: 3,
    points: 3,
    type: "code",
    timeEstimate: 10,
    question: "¿Qué problema tiene este selector XPath en un test de Selenium? ¿Cómo lo mejorarías?",
    code: `// Selector actual:
driver.findElement(By.xpath("/html/body/div[3]/div[1]/div[2]/form/div[4]/input[2]"))
  .sendKeys("test@email.com");

// Contexto: es el campo de email en un formulario de registro`,
    options: [
      "El XPath es demasiado corto, debería incluir más niveles del DOM",
      "XPath absoluto extremadamente frágil — cualquier cambio en el DOM lo rompe. Usar: By.id('email'), By.name('email'), By.xpath(\"//input[@type='email']\") o By.cssSelector(\"input[name='email']\")",
      "Debería usar CSS Selector en lugar de XPath siempre, ya que XPath no es válido en Selenium",
      "El problema es sendKeys(), debería usarse clear() antes"
    ],
    correct: [1],
    explanation: "XPath absoluto (/html/body/div[3]/...) es el anti-pattern más común. Es extremadamente frágil: si se agrega cualquier div o se reestructura el HTML, el test falla. La mejor práctica: usar atributos únicos (id, data-testid, name) o XPath relativo con atributos específicos."
  },
  {
    id: 15,
    block: "Automatización",
    difficulty: 3,
    points: 3,
    type: "single",
    timeEstimate: 5,
    question: "¿Cuál es la diferencia entre un test 'flaky' y un test inestable por ambiente?",
    options: [
      "Son lo mismo: cualquier test que falla intermitentemente",
      "Flaky: falla intermitentemente en el mismo ambiente sin cambios en código. Por ambiente: falla consistentemente en un ambiente específico por diferencias de config/datos",
      "Flaky: solo ocurre en CI/CD. Por ambiente: solo ocurre localmente",
      "No hay diferencia, ambos deben eliminarse del suite"
    ],
    correct: [1],
    explanation: "Flaky test: non-deterministic, falla sin razón aparente (race conditions, timeouts variables, orden de ejecución). Test inestable por ambiente: falla predeciblemente en staging pero no en local por diferencias de datos, versiones o config. Tienen soluciones distintas."
  },
  {
    id: 16,
    block: "Automatización",
    difficulty: 2,
    points: 2,
    type: "multiple",
    timeEstimate: 4,
    question: "¿Cuáles son características de un buen framework de automatización? (Selecciona TODAS las correctas)",
    options: [
      "Mantenible: cambios en UI requieren modificar en un solo lugar (POM)",
      "Reportes claros con evidencia de fallas",
      "Ejecuta todos los tests en un solo hilo para garantizar orden",
      "Independencia entre tests (cada test puede correr aislado)",
      "Integración con CI/CD pipeline",
      "Los tests deben ejecutarse siempre en el mismo orden"
    ],
    correct: [0, 1, 3, 4],
    explanation: "Un buen framework tiene: mantenibilidad (POM), reportes con evidencia, independencia entre tests (no dependen del estado de otros), integración CI/CD. La ejecución en un hilo único y el orden fijo son anti-patterns que reducen paralelismo y crean dependencias."
  },

  // ─── BLOQUE 4: API TESTING ─────────────────────────────────────────────────
  {
    id: 17,
    block: "API Testing",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "Al probar un endpoint POST /api/users que crea un usuario, ¿qué código HTTP esperarías en una creación exitosa?",
    options: [
      "200 OK",
      "201 Created",
      "204 No Content",
      "202 Accepted"
    ],
    correct: [1],
    explanation: "201 Created es el código correcto para una creación exitosa. 200 es para operaciones exitosas generales (GET/PUT). 204 es para operaciones sin body de respuesta. 202 es para operaciones asíncronas que aún no se completaron."
  },
  {
    id: 18,
    block: "API Testing",
    difficulty: 2,
    points: 2,
    type: "multiple",
    timeEstimate: 4,
    question: "¿Qué validaciones debes incluir al testear un endpoint de API REST? (Selecciona TODAS las correctas)",
    options: [
      "Status code correcto",
      "Schema/estructura del response body",
      "Tiempo de respuesta dentro del SLA",
      "Que el servidor use Nginx o Apache",
      "Headers de respuesta (Content-Type, Auth tokens)",
      "Manejo de errores (400, 401, 404, 500)"
    ],
    correct: [0, 1, 2, 4, 5],
    explanation: "En API testing se valida: status code, schema del response, performance (tiempo de respuesta), headers correctos, y manejo de errores. El servidor web usado (Nginx/Apache) no es relevante para las pruebas funcionales."
  },
  {
    id: 19,
    block: "API Testing",
    difficulty: 2,
    points: 2,
    type: "code",
    timeEstimate: 7,
    question: "Analiza este script de prueba de API en JavaScript. ¿Qué está MAL?",
    code: `// Test: Verificar que se puede crear un usuario
const response = await fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Juan', email: 'juan@test.com' })
});

// Assertions
console.assert(response.status === 200, 'Status should be 200');
console.assert(response.body.id !== null, 'Should return user ID');`,
    options: [
      "Debería usar PUT en lugar de POST para crear recursos",
      "Dos errores: (1) el status esperado debería ser 201 no 200, (2) response.body no existe — hay que hacer await response.json() para parsear el body",
      "Falta el header Content-Type en el request",
      "console.assert no es válido para pruebas, solo funciona en el browser"
    ],
    correct: [1],
    explanation: "Dos bugs críticos: (1) POST exitoso devuelve 201 Created, no 200. (2) fetch no expone response.body directamente como objeto — se debe llamar await response.json() para parsear el JSON. Además, falta el header Content-Type: application/json."
  },
  {
    id: 20,
    block: "API Testing",
    difficulty: 3,
    points: 3,
    type: "single",
    timeEstimate: 5,
    question: "¿Qué es 'Contract Testing' en el contexto de microservicios y por qué es importante?",
    options: [
      "Es una forma de probar los contratos legales del software con los clientes",
      "Es verificar que el contrato (acuerdo de interface) entre un consumer y un provider se cumple — usando herramientas como Pact para detectar breaking changes sin necesidad de integration tests completos",
      "Son pruebas que garantizan que los SLAs del contrato de hosting se cumplen",
      "Es una técnica para probar APIs que requieren autenticación OAuth"
    ],
    correct: [1],
    explanation: "Contract Testing (Pact, Spring Cloud Contract) verifica el 'contrato' entre servicios: el consumer define qué espera del provider, y se verifica independientemente. Es clave en microservicios para detectar breaking changes sin costosos integration tests end-to-end."
  },

  // ─── BLOQUE 5: CI/CD Y DEVOPS PARA QA ─────────────────────────────────────
  {
    id: 21,
    block: "CI/CD y DevOps",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "En un pipeline de CI/CD, ¿en qué etapa deben ejecutarse las pruebas de regresión automatizadas?",
    options: [
      "Solo en producción después del deploy",
      "Solo antes del merge al branch principal",
      "En múltiples etapas: unitarios en build, integración en staging, E2E completo en pre-prod, smoke en prod",
      "Solo los fines de semana para no bloquear el desarrollo"
    ],
    correct: [2],
    explanation: "Las pruebas deben ejecutarse en capas: unitarios/fast tests en build (fail fast), integración en staging, regresión completa en pre-prod, y smoke tests en prod post-deploy. Esto balancea velocidad de feedback y cobertura."
  },
  {
    id: 22,
    block: "CI/CD y DevOps",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "¿Qué es 'Shift Left Testing' y cuál es su principal beneficio?",
    options: [
      "Mover todos los testers al equipo de frontend",
      "Involucrar QA desde las etapas tempranas del desarrollo (requisitos, diseño) para detectar defectos antes — reduciendo costo de fix exponencialmente",
      "Ejecutar los tests de la derecha del pipeline primero",
      "Automatizar el 100% de las pruebas manuales"
    ],
    correct: [1],
    explanation: "Shift Left = QA participa desde el inicio: revisión de requisitos, diseño de pruebas en paralelo con dev. El costo de corregir un bug en producción es ~100x mayor que en requisitos. También incluye ATDD, BDD y pruebas continuas."
  },
  {
    id: 23,
    block: "CI/CD y DevOps",
    difficulty: 3,
    points: 3,
    type: "multiple",
    timeEstimate: 5,
    question: "En GitHub Actions, ¿cuáles de estas configuraciones son correctas para un job de testing? (Selecciona TODAS las correctas)",
    options: [
      "needs: [build] — para ejecutar tests solo si el build pasó",
      "continue-on-error: true — siempre, para que el pipeline nunca falle",
      "strategy: matrix — para correr tests en múltiples versiones de Node/navegadores en paralelo",
      "timeout-minutes: 30 — para evitar que tests colgados bloqueen el pipeline",
      "if: github.event_name == 'push' — para ejecutar solo en push, no en PRs"
    ],
    correct: [0, 2, 3],
    explanation: "Correctas: needs (dependency entre jobs), matrix strategy (paralelismo en múltiples entornos), timeout-minutes (evitar cuelgues). continue-on-error:true oculta fallas reales. El if dependiendo del caso puede ser válido o no, pero no es una 'best practice' general."
  },

  // ─── BLOQUE 6: METODOLOGÍAS Y AGILIDAD ─────────────────────────────────────
  {
    id: 24,
    block: "Metodologías Ágiles",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "En Scrum, ¿cuándo debería involucrarse el equipo de QA en una historia de usuario?",
    options: [
      "Solo al final del sprint para ejecutar las pruebas",
      "Solo cuando el desarrollador dice que terminó",
      "Desde el refinamiento/planning, participando en definición de criterios de aceptación y pruebas",
      "QA no participa en Scrum, tiene su propio proceso separado"
    ],
    correct: [2],
    explanation: "En Scrum, QA debe participar desde el refinamiento para: co-crear criterios de aceptación, identificar edge cases antes del desarrollo, y preparar pruebas. Esto evita el 'testing como última fase' que crea cuellos de botella."
  },
  {
    id: 25,
    block: "Metodologías Ágiles",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "¿Qué es BDD (Behavior-Driven Development) y cuál es su sintaxis más común?",
    options: [
      "Es lo mismo que TDD pero para bases de datos",
      "Una metodología donde los tests se escriben en lenguaje natural (Gherkin: Given/When/Then), fomentando colaboración entre negocio, dev y QA",
      "Un framework de testing para aplicaciones móviles",
      "Una técnica para diseñar pruebas de carga y estrés"
    ],
    correct: [1],
    explanation: "BDD usa lenguaje Gherkin (Given/When/Then) para describir comportamientos en lenguaje natural. Herramientas: Cucumber, SpecFlow, Behave. Facilita que negocio, QA y dev hablen el mismo idioma y los scenarios sirven como documentación viva."
  },
  {
    id: 26,
    block: "Metodologías Ágiles",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "¿Qué métricas de QA son más útiles para un equipo ágil? ¿Por qué?",
    options: [
      "Solo el número de bugs encontrados — más bugs = mejor QA",
      "Defect Escape Rate, Test Coverage, Mean Time to Detect (MTTD) y Mean Time to Resolve (MTTR) — porque miden calidad real del producto y efectividad del proceso",
      "Solo el porcentaje de tests automatizados — más automatización = mejor calidad",
      "El número de casos de prueba ejecutados por sprint sin importar si detectaron bugs"
    ],
    correct: [1],
    explanation: "Métricas útiles: Defect Escape Rate (bugs que llegan a prod), Test Coverage, MTTD/MTTR, Flaky test rate, Test execution time. El número de bugs encontrados puede ser manipulado; el número de tests ejecutados sin más contexto no mide efectividad real."
  },

  // ─── BLOQUE 7: PERFORMANCE Y SEGURIDAD ─────────────────────────────────────
  {
    id: 27,
    block: "Performance y Seguridad",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 3,
    question: "¿Cuál es la diferencia entre Load Testing, Stress Testing y Spike Testing?",
    options: [
      "Son sinónimos, todos prueban que el sistema aguanta carga",
      "Load: carga esperada normal. Stress: más allá del límite para encontrar punto de quiebre. Spike: incremento repentino y extremo de carga",
      "Load: solo para APIs. Stress: solo para bases de datos. Spike: solo para frontend",
      "Load y Stress son lo mismo; Spike es para testing de seguridad"
    ],
    correct: [1],
    explanation: "Load Testing: comportamiento bajo carga esperada (¿rinde bien normalmente?). Stress Testing: superar límites para encontrar el punto de quiebre y cómo se recupera. Spike Testing: picos repentinos y masivos de carga (ej: Black Friday, trending en redes)."
  },
  {
    id: 28,
    block: "Performance y Seguridad",
    difficulty: 3,
    points: 3,
    type: "multiple",
    timeEstimate: 5,
    question: "¿Cuáles son vulnerabilidades que un QA debe conocer del OWASP Top 10? (Selecciona TODAS las correctas)",
    options: [
      "SQL Injection — datos maliciosos que manipulan consultas a BD",
      "Broken Access Control — acceder a recursos sin autorización",
      "CSRF (Cross-Site Request Forgery) — aunque ahora está en OWASP bajo Insecure Design",
      "Lentitud del servidor — más de 2 segundos de respuesta",
      "Insecure Direct Object References (IDOR)",
      "Mala documentación del código"
    ],
    correct: [0, 1, 2, 4],
    explanation: "Del OWASP Top 10: SQL Injection, Broken Access Control (incluye IDOR), CSRF/Insecure Design son vulnerabilidades reales de seguridad que QA debe probar. La lentitud del servidor es un problema de performance, no de seguridad. La documentación es una preocupación de mantenimiento."
  },

  // ─── BLOQUE 8: EJERCICIOS PRÁCTICOS AVANZADOS ──────────────────────────────
  {
    id: 29,
    block: "Ejercicio Práctico",
    difficulty: 2,
    points: 2,
    type: "code",
    timeEstimate: 8,
    question: "Lee este código de prueba con Jest. Identifica el bug en el test (no en el código de producción):",
    code: `// Función a probar
function calcularDescuento(precio, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) throw new Error('Porcentaje inválido');
  return precio - (precio * porcentaje / 100);
}

// Test
describe('calcularDescuento', () => {
  test('descuento del 20% en $100 = $80', () => {
    expect(calcularDescuento(100, 20)).toBe(80);
  });

  test('porcentaje inválido lanza error', () => {
    expect(calcularDescuento(100, -5)).toBe(Error('Porcentaje inválido'));
  });

  test('descuento del 0% no cambia el precio', () => {
    expect(calcularDescuento(100, 0)).toBe(100);
  });
});`,
    options: [
      "El primer test está mal, 100 - 20% = 80 es incorrecto",
      "El segundo test está mal: para verificar que se lanza un error se debe usar expect(...).toThrow('Porcentaje inválido'), no .toBe(Error(...))",
      "El tercer test falla porque 0% de descuento debería devolver 0",
      "describe() no puede usarse con test(), solo con it()"
    ],
    correct: [1],
    explanation: "El bug está en el segundo test. Para verificar que una función lanza un error en Jest se debe usar: expect(() => calcularDescuento(100, -5)).toThrow('Porcentaje inválido'). La función debe envolverse en una arrow function; .toBe(Error()) compara referencias de objetos, no el error lanzado."
  },
  {
    id: 30,
    block: "Ejercicio Práctico",
    difficulty: 3,
    points: 3,
    type: "code",
    timeEstimate: 10,
    question: "Tienes este test de Playwright. ¿Qué mejoras aplicarías para hacerlo más robusto y mantenible?",
    code: `import { test, expect } from '@playwright/test';

test('checkout flow', async ({ page }) => {
  await page.goto('https://shop.example.com');
  await page.click('text=Laptop Gaming');
  await page.click('#add-to-cart');
  await page.waitForTimeout(3000);
  await page.click('.cart-icon');
  await page.fill('input[placeholder="Enter email"]', 'user@test.com');
  await page.fill('input[placeholder="Enter card number"]', '4111111111111111');
  await page.click('button:has-text("Complete Purchase")');
  await page.waitForTimeout(5000);
  expect(await page.textContent('h1')).toBe('Order Confirmed!');
});`,
    options: [
      "El test está bien, Playwright maneja automáticamente los tiempos",
      "Mejoras: (1) Reemplazar waitForTimeout con waitForSelector/waitForResponse, (2) Usar data-testid en lugar de text/placeholder frágiles, (3) Separar en múltiples tests o usar test.step(), (4) Externalizar datos de prueba, (5) Agregar assertions intermedias",
      "Solo hay que cambiar el timeout de 3000 a 1000ms",
      "Usar beforeAll para inicializar la página una sola vez"
    ],
    correct: [1],
    explanation: "Mejoras necesarias: (1) Eliminar waitForTimeout → usar await page.waitForSelector() o await page.waitForResponse(). (2) Usar data-testid para selectores estables. (3) Separar en pasos o múltiples tests. (4) Datos en fixtures o env vars. (5) Assertions en cada paso crítico para diagnóstico más fácil."
  },
  {
    id: 31,
    block: "Ejercicio Práctico",
    difficulty: 3,
    points: 3,
    type: "single",
    timeEstimate: 8,
    question: "Diseña mentalmente la estrategia de pruebas para un sistema de pagos (checkout). ¿Cuál de estas estrategias es más completa?",
    options: [
      "Solo probar que el botón 'Pagar' funcione correctamente con una tarjeta válida",
      "Probar únicamente flujos de error (tarjeta rechazada, datos incorrectos)",
      "Happy path + edge cases (montos límite, timeouts de red, reintentos), pruebas de seguridad (OWASP), tests de concurrencia, integración con pasarela de pagos, y validación de notificaciones",
      "Automatizar 100% del flujo E2E con Selenium y probar solo en Chrome"
    ],
    correct: [2],
    explanation: "Un sistema de pagos requiere: happy path (transacción exitosa), edge cases (montos $0.01, $9999.99, decimales), errores de red/timeout, tarjetas rechazadas/vencidas, pruebas de seguridad (IDOR, double-charge), concurrencia, reconciliación con pasarela, y notificaciones (email/webhook)."
  },
  {
    id: 32,
    block: "Ejercicio Práctico",
    difficulty: 2,
    points: 2,
    type: "single",
    timeEstimate: 5,
    question: "Un test automatizado E2E pasa localmente pero falla consistentemente en CI. ¿Cuál es el primer paso de diagnóstico?",
    options: [
      "Deshabilitar el test en CI ya que en local funciona bien",
      "Aumentar todos los timeouts al doble",
      "Revisar diferencias entre entorno local y CI: versión de browser/driver, datos de prueba, variables de entorno, velocidad de red, y revisar los screenshots/logs del CI",
      "Reescribir el test completo desde cero"
    ],
    correct: [2],
    explanation: "El debugging sistemático de fallas en CI incluye: (1) Comparar versiones de herramientas. (2) Revisar artifacts del CI (screenshots, videos, logs). (3) Verificar datos de prueba en el ambiente CI. (4) Headless vs headed mode. (5) Variables de entorno y configuración. Nunca deshabilitar ni aumentar timeouts sin diagnóstico."
  },
  {
    id: 33,
    block: "Herramientas y Ecosistema",
    difficulty: 1,
    points: 1,
    type: "single",
    timeEstimate: 2,
    question: "¿Para qué se usa Postman/Insomnia en el contexto de QA?",
    options: [
      "Para automatizar pruebas de UI en navegadores",
      "Para probar y documentar APIs REST/GraphQL: enviar requests, verificar responses, crear colecciones y correr suites de pruebas de API",
      "Para hacer load testing de aplicaciones web",
      "Para gestionar casos de prueba y reportar bugs"
    ],
    correct: [1],
    explanation: "Postman/Insomnia son herramientas para API testing: enviar HTTP requests (GET/POST/PUT/DELETE), inspeccionar responses, escribir tests con assertions, crear colecciones organizadas, y correr suites automatizadas vía CLI (Newman para Postman)."
  },
  {
    id: 34,
    block: "Herramientas y Ecosistema",
    difficulty: 2,
    points: 2,
    type: "multiple",
    timeEstimate: 4,
    question: "¿Qué herramientas usarías para cada tipo de prueba? (Selecciona las combinaciones CORRECTAS)",
    options: [
      "E2E Web: Playwright, Cypress, Selenium WebDriver",
      "Load Testing: JMeter, k6, Gatling",
      "Unit Testing JavaScript: JUnit, NUnit",
      "API Testing: Postman, REST Assured, Karate",
      "Mobile Testing: Appium, Espresso, XCUITest"
    ],
    correct: [0, 1, 3, 4],
    explanation: "Correctas: E2E Web (Playwright/Cypress/Selenium), Load (JMeter/k6/Gatling), API (Postman/REST Assured/Karate), Mobile (Appium/Espresso/XCUITest). JUnit y NUnit son para Java y .NET respectivamente — para unit testing JavaScript se usa Jest, Vitest, Mocha."
  },
  {
    id: 35,
    block: "Herramientas y Ecosistema",
    difficulty: 3,
    points: 3,
    type: "single",
    timeEstimate: 5,
    question: "En un proyecto con microservicios, un cambio en el servicio de 'Usuarios' rompe el servicio de 'Pedidos'. ¿Qué estrategia de testing hubiera prevenido esto?",
    options: [
      "Más pruebas unitarias en el servicio de Usuarios",
      "Contract Testing (Pact) para verificar que el contrato de la API entre servicios se mantiene, detectando breaking changes antes del deploy",
      "Probar manualmente los dos servicios juntos en cada deploy",
      "Integration testing tradicional en un ambiente donde todos los servicios están desplegados"
    ],
    correct: [1],
    explanation: "Contract Testing (Pact) es la solución ideal: el consumer (Pedidos) define qué espera de la API del provider (Usuarios). Si Usuarios cambia algo que rompe el contrato, el pipeline de CI falla antes del deploy. Es más rápido y confiable que integration tests E2E con todos los servicios levantados."
  }
];

export const TOTAL_POINTS = QUESTIONS.reduce((sum, q) => sum + q.points, 0);
export const MAX_TIME_MINUTES = 120;

export const LEVELS = {
  SENIOR: { min: 75, label: 'Senior', color: '#10b981', icon: '🏆' },
  SEMI_SENIOR: { min: 50, label: 'Semi-Senior', color: '#f59e0b', icon: '⭐' },
  JUNIOR: { min: 25, label: 'Junior', color: '#3b82f6', icon: '🌱' },
  BEGINNER: { min: 0, label: 'En Desarrollo', color: '#6b7280', icon: '📚' }
};

export function getLevel(percentage) {
  if (percentage >= LEVELS.SENIOR.min) return LEVELS.SENIOR;
  if (percentage >= LEVELS.SEMI_SENIOR.min) return LEVELS.SEMI_SENIOR;
  if (percentage >= LEVELS.JUNIOR.min) return LEVELS.JUNIOR;
  return LEVELS.BEGINNER;
}
