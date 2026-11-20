const content = document.querySelector('#view-content');
const breadcrumb = document.querySelector('#breadcrumb-title');
const toast = document.querySelector('#toast');
const navButtons = [...document.querySelectorAll('.nav-item')];
let activeView = 'dashboard';
let toastTimer;
let flashIndex = 0;
let showAnswer = false;

const flashcards = [
  { front: 'What is active recall?', back: 'A learning technique where you retrieve information from memory instead of rereading it.' },
  { front: 'What does spaced repetition do?', back: 'It schedules reviews over increasing intervals to improve long-term retention.' },
  { front: 'What is the Pomodoro technique?', back: 'A focus method using short work intervals (often 25 minutes) followed by brief breaks.' }
];
const tasks = [
  { text: 'Review cell biology notes', time: '9:00 AM', done: true },
  { text: 'Practice algebra problems', time: '11:30 AM', done: false },
  { text: 'Create flashcards for Unit 4', time: '2:00 PM', done: false }
];

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function setView(view) {
  activeView = view;
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.view === view));
  breadcrumb.textContent = ({ dashboard: 'Dashboard', tutor: 'AI Tutor', pdf: 'PDF Assistant', quiz: 'Quiz Generator', flashcards: 'Flashcards', planner: 'Study Planner' })[view];
  document.querySelector('#sidebar').classList.remove('open');
  render();
  content.focus({ preventScroll: true });
}
function heading(eyebrow, title, description, button = '') {
  return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>${button}</div>`;
}
function dashboard() {
  return `${heading('THURSDAY, YOUR STUDY SPACE', 'Good morning, Adi 👋', 'You’re building a great habit. Ready for your next focused session?', '<button class="primary-button" data-view="planner">＋ Plan a study session</button>')}
    <section class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">YOUR WEEKLY MOMENTUM</p><h2>You’re on a 4-day study streak!</h2><p>Keep showing up for your goals. You’re closer than you think.</p><button class="primary-button" data-view="planner">See today’s plan&nbsp; →</button></div><div class="welcome-art" aria-hidden="true"><div class="art-orbit"><span class="art-book">📚</span></div></div></section>
    <section class="stats-grid" aria-label="Study statistics"><article class="stat-card"><div class="stat-top">Study time <span class="stat-icon">◷</span></div><div class="stat-value">8.5 hrs</div><div class="stat-note"><span class="positive">↑ 12%</span> vs last week</div></article><article class="stat-card"><div class="stat-top">Tasks completed <span class="stat-icon">✓</span></div><div class="stat-value">12 <span class="muted">/ 16</span></div><div class="stat-note">You’re making progress</div></article><article class="stat-card"><div class="stat-top">Quiz average <span class="stat-icon">◇</span></div><div class="stat-value">86%</div><div class="stat-note"><span class="positive">↑ 5%</span> this month</div></article><article class="stat-card"><div class="stat-top">Current streak <span class="stat-icon">♨</span></div><div class="stat-value">4 days</div><div class="stat-note">Your best is 7 days</div></article></section>
    <section class="dashboard-grid"><article class="panel"><div class="panel-heading"><div><h3>Study activity</h3><p>Your focused hours this week</p></div><select class="week-select" aria-label="Study activity period"><option>This week</option><option>Last week</option></select></div><div class="chart-area" aria-label="Hours studied from Monday to Sunday"><div class="bar-group"><i class="bar" style="height:34%"></i><i class="bar primary" style="height:52%"></i><span class="bar-day">Mon</span></div><div class="bar-group"><i class="bar" style="height:48%"></i><i class="bar primary" style="height:67%"></i><span class="bar-day">Tue</span></div><div class="bar-group"><i class="bar" style="height:28%"></i><i class="bar primary" style="height:43%"></i><span class="bar-day">Wed</span></div><div class="bar-group"><i class="bar" style="height:62%"></i><i class="bar primary" style="height:83%"></i><span class="bar-day">Thu</span></div><div class="bar-group"><i class="bar" style="height:42%"></i><i class="bar primary" style="height:59%"></i><span class="bar-day">Fri</span></div><div class="bar-group"><i class="bar" style="height:20%"></i><i class="bar primary" style="height:31%"></i><span class="bar-day">Sat</span></div><div class="bar-group"><i class="bar" style="height:14%"></i><i class="bar primary" style="height:23%"></i><span class="bar-day">Sun</span></div></div><div class="chart-foot"><strong>8.5 hours</strong> focused this week <span class="positive"> · 12% more than last week</span></div></article><article class="panel focus-panel"><div class="panel-heading"><div><h3>Weekly goal</h3><p>You’re doing great</p></div><span class="stat-icon">✦</span></div><div class="focus-ring"><span>68%</span></div><p class="focus-caption">17 of 25 study hours</p><button class="primary-button" data-view="planner">Continue your plan</button></article></section>
    <h2 class="section-title">Your AI study tools <button data-view="tutor">Explore all tools →</button></h2><section class="feature-grid"><button class="feature-card" data-view="tutor"><span class="feature-icon">✳</span><h3>AI Tutor</h3><p>Ask questions and learn at your own pace.</p><span class="feature-link">Start learning →</span></button><button class="feature-card" data-view="pdf"><span class="feature-icon">▤</span><h3>PDF Assistant</h3><p>Turn your study documents into clear notes.</p><span class="feature-link">Explore documents →</span></button><button class="feature-card" data-view="quiz"><span class="feature-icon">☑</span><h3>Quiz Generator</h3><p>Practice with a quiz made for your topic.</p><span class="feature-link">Make a quiz →</span></button><button class="feature-card" data-view="flashcards"><span class="feature-icon">▣</span><h3>Flashcards</h3><p>Remember more with quick study cards.</p><span class="feature-link">Review cards →</span></button></section>`;
}
function tutor() {
  return `${heading('LEARN YOUR WAY', 'Meet your AI Tutor', 'A friendly place to ask questions, unpack tricky ideas, and keep learning.', '<span class="nav-new">MOCK DEMO</span>')}<div class="tool-layout"><section class="tool-card"><h2>What are you curious about?</h2><p>Ask a study question or choose a suggestion to get started. Responses are sample demo content.</p><div class="chat-messages" id="chat-messages"><div class="message">Hi Adi! 👋 I’m here to help you understand concepts step by step. What are you studying today?</div></div><form id="tutor-form"><label class="form-label" for="tutor-question">Your question</label><textarea class="text-area" id="tutor-question" placeholder="For example: Can you explain photosynthesis in simple terms?" required></textarea><div class="form-row"><button class="primary-button" type="submit">Ask your tutor&nbsp; →</button><span class="muted" style="font-size:9px">✦ AI responses are simulated for this demo</span></div></form></section><aside class="side-column"><section class="tool-card"><h2>Try asking</h2><p>Pick a prompt to add it to your question.</p>${['Explain a difficult concept in simple terms','Give me a real-world example','Help me make a study plan for this topic'].map(q => `<button class="answer-option prompt-suggestion" type="button">✧ <span>${q}</span></button>`).join('')}</section><section class="side-note"><h3>Learning tip</h3><p>Try explaining an idea in your own words. Your tutor can help you find gaps in your understanding.</p></section></aside></div>`;
}
function pdf() {
  return `${heading('YOUR DOCUMENTS, MADE SIMPLE', 'PDF Assistant', 'Get a head start on your reading with summaries and study questions.', '<span class="nav-new">MOCK DEMO</span>')}<div class="tool-layout"><section class="tool-card"><h2>Upload a study document</h2><p>Choose a PDF to see a sample document summary. Files are not sent to a server in this demo.</p><label class="upload-zone" for="pdf-file"><span>⇧</span><p><strong>Choose a PDF from your device</strong><br>PDF format · file stays in your browser</p><input id="pdf-file" type="file" accept="application/pdf,.pdf"></label><div class="response-box" id="pdf-response"></div></section><aside class="side-column"><section class="tool-card"><h2>What you can do</h2><p>Use your course material to make studying more focused.</p><div class="side-note"><h3>✧ Quick summaries</h3><p>Turn long reading into a short overview of key ideas.</p></div><div class="side-note"><h3>☑ Practice questions</h3><p>Review a topic with questions based on what you read.</p></div><div class="side-note"><h3>▣ Key terms</h3><p>Identify the important vocabulary in your material.</p></div></section></aside></div>`;
}
function quiz() {
  return `${heading('PRACTICE MAKES PROGRESS', 'Quiz Generator', 'Create a quick knowledge check from any topic you’re studying.', '<span class="nav-new">MOCK DEMO</span>')}<div class="tool-layout"><section class="tool-card"><h2>Build a practice quiz</h2><p>Choose a subject and we’ll create a short sample quiz for you.</p><form id="quiz-form"><label class="form-label" for="quiz-topic">What topic are you studying?</label><input id="quiz-topic" class="text-input" placeholder="e.g. The solar system" required><div class="form-row"><label class="form-label" for="quiz-level">Level</label><select class="select-input" id="quiz-level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div><div class="form-row"><button class="primary-button" type="submit">✧ Generate quiz</button><span class="muted" style="font-size:9px">Sample questions, no AI connection</span></div></form><div id="quiz-result"></div></section><aside class="side-column"><section class="tool-card"><h2>Quiz tip</h2><p>Try answering from memory before checking your notes. It helps you see what you really know.</p><div class="side-note"><h3>Your recent result</h3><p><strong style="color:var(--ink);font-size:20px">86%</strong> <span class="positive">↑ 5%</span><br>Average score this month</p></div></section></aside></div>`;
}
function flashcardView() {
  const card = flashcards[flashIndex];
  return `${heading('REMEMBER MORE, EFFORTLESSLY', 'Flashcards', 'A quick review session to strengthen what you’ve learned.', '<span class="nav-new">3 SAMPLE CARDS</span>')}<div style="max-width:650px;margin:20px auto"><div class="panel-heading"><div><h3>Biology · Core concepts</h3><p>Card ${flashIndex + 1} of ${flashcards.length}</p></div><span class="muted" style="font-size:10px">Click card to flip</span></div><button class="flashcard" id="flashcard" type="button"><span><span class="flash-label">${showAnswer ? 'ANSWER' : 'QUESTION'}</span><h2>${showAnswer ? card.back : card.front}</h2><small>Tap to ${showAnswer ? 'see question' : 'reveal answer'}</small></span></button><div class="flash-controls"><button class="secondary-button" id="flash-prev" type="button">← Previous</button><button class="primary-button" id="flash-next" type="button">Next card →</button></div><section class="side-note"><h3>Study tip</h3><p>Say the answer out loud before flipping the card. Retrieval practice makes it stick.</p></section></div>`;
}
function planner() {
  const done = tasks.filter(task => task.done).length;
  return `${heading('MAKE TIME FOR WHAT MATTERS', 'Study Planner', 'A simple plan turns your goals into manageable next steps.', '<button class="primary-button" id="add-task">＋ Add a task</button>')}<div class="tool-layout"><section class="tool-card"><div class="panel-heading"><div><h2>Today’s plan</h2><p>${done} of ${tasks.length} tasks completed</p></div><span class="nav-new">THURSDAY</span></div><div class="planner-list">${tasks.map((task, index) => `<label class="planner-task ${task.done ? 'done' : ''}"><input type="checkbox" data-task="${index}" ${task.done ? 'checked' : ''}><span>${task.text}</span><small>${task.time}</small></label>`).join('')}</div></section><aside class="side-column"><section class="tool-card"><h2>Stay in rhythm</h2><p>Short, focused sessions can be easier to fit into your day.</p><div class="focus-ring"><span>25:00</span></div><p class="focus-caption">Pomodoro focus session</p><button class="primary-button" id="focus-start" style="width:100%">Start focus timer</button></section><section class="side-note"><h3>This week</h3><p>17 of 25 planned study hours complete. You’re on track for your weekly goal.</p></section></aside></div>`;
}
function render() {
  content.innerHTML = ({ dashboard, tutor, pdf, quiz, flashcards: flashcardView, planner })[activeView]();
  bindCurrentView();
}
function bindCurrentView() {
  content.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  const tutorForm = content.querySelector('#tutor-form');
  if (tutorForm) {
    const messages = content.querySelector('#chat-messages');
    content.querySelectorAll('.prompt-suggestion').forEach(button => button.addEventListener('click', () => { content.querySelector('#tutor-question').value = button.textContent.trim().replace(/^✧\s*/, ''); content.querySelector('#tutor-question').focus(); }));
    tutorForm.addEventListener('submit', event => {
      event.preventDefault();
      const question = content.querySelector('#tutor-question').value.trim();
      if (!question) return;
      messages.insertAdjacentHTML('beforeend', `<div class="message user"></div><div class="message">That’s a thoughtful question! Start by breaking <strong>${escapeHTML(question)}</strong> into smaller parts. Write down what you already know, then look for how each idea connects. This is sample tutor guidance for the frontend demo.</div>`);
      messages.querySelector('.message.user:last-of-type').textContent = question;
      tutorForm.reset(); messages.scrollTop = messages.scrollHeight;
    });
  }
  const pdfFile = content.querySelector('#pdf-file');
  if (pdfFile) pdfFile.addEventListener('change', () => {
    const file = pdfFile.files[0]; if (!file) return;
    const output = content.querySelector('#pdf-response'); output.classList.add('visible');
    output.innerHTML = `<strong>Document ready: ${escapeHTML(file.name)}</strong><br><br>This demo doesn’t read or upload your file. In the complete product, this space can show a concise summary, key terms, and practice questions based on your PDF.<br><br><strong>Suggested next step:</strong> Note the three main ideas from your reading and ask the AI Tutor to explain anything unclear.`;
  });
  const quizForm = content.querySelector('#quiz-form');
  if (quizForm) quizForm.addEventListener('submit', event => {
    event.preventDefault();
    const topic = content.querySelector('#quiz-topic').value.trim();
    content.querySelector('#quiz-result').innerHTML = `<div class="response-box visible"><strong>Practice quiz: ${escapeHTML(topic)}</strong><p class="muted">Sample question · 1 of 1</p><div class="quiz-question"><h3>Which approach is most helpful when learning about ${escapeHTML(topic)}?</h3>${['Try to explain the main idea in your own words','Read the same paragraph without pausing','Skip anything that seems unfamiliar'].map((answer, i) => `<label class="answer-option" data-answer="${i}"><input type="radio" name="quiz-answer" value="${i}"><span>${answer}</span></label>`).join('')}<button class="primary-button" id="check-answer" type="button">Check answer</button><p id="quiz-feedback" aria-live="polite"></p></div></div>`;
    content.querySelector('#check-answer').addEventListener('click', () => {
      const chosen = content.querySelector('input[name="quiz-answer"]:checked');
      if (!chosen) { notify('Choose an answer first.'); return; }
      content.querySelectorAll('.answer-option').forEach(option => { if (option.dataset.answer === '0') option.classList.add('correct'); else if (option.contains(chosen)) option.classList.add('incorrect'); });
      content.querySelector('#quiz-feedback').textContent = Number(chosen.value) === 0 ? 'Correct! Explaining ideas in your own words supports active recall.' : 'Not quite. Try explaining a concept in your own words to strengthen recall.';
    });
  });
  const flashcard = content.querySelector('#flashcard');
  if (flashcard) {
    flashcard.addEventListener('click', () => { showAnswer = !showAnswer; render(); });
    content.querySelector('#flash-prev').addEventListener('click', () => { flashIndex = (flashIndex - 1 + flashcards.length) % flashcards.length; showAnswer = false; render(); });
    content.querySelector('#flash-next').addEventListener('click', () => { flashIndex = (flashIndex + 1) % flashcards.length; showAnswer = false; render(); });
  }
  content.querySelectorAll('[data-task]').forEach(input => input.addEventListener('change', () => { tasks[Number(input.dataset.task)].done = input.checked; render(); }));
  const addTask = content.querySelector('#add-task');
  if (addTask) addTask.addEventListener('click', () => {
    const text = window.prompt('What would you like to study?');
    if (!text || !text.trim()) return;
    tasks.push({ text: text.trim(), time: 'Anytime', done: false }); render(); notify('Study task added to your plan.');
  });
  const focusStart = content.querySelector('#focus-start');
  if (focusStart) focusStart.addEventListener('click', () => notify('Focus session started — you’ve got this!'));
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
navButtons.forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
document.querySelector('#menu-toggle').addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('open'));
document.querySelector('#today-label').textContent = new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date());
render();
