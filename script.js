/**
 * SkillBridge - Student Skill Gap Analyzer
 * Client-Side JavaScript Application (Vanilla ES6+ implementation)
 * Transpiled & aligned with src/app.ts, src/analyzer.ts, src/assessment.ts, src/data.ts
 */

(() => {
    'use strict';

    // 1. Data Store & Configuration
    const INITIAL_SKILLS = [
        { id: 'html', name: 'HTML5 & Web Standards', category: 'technical', currentLevel: 80, targetLevel: 90 },
        { id: 'css', name: 'CSS3, Flexbox & Grid', category: 'technical', currentLevel: 65, targetLevel: 85 },
        { id: 'javascript', name: 'JavaScript & ES6+', category: 'technical', currentLevel: 60, targetLevel: 85 },
        { id: 'typescript', name: 'TypeScript & Type Safety', category: 'technical', currentLevel: 40, targetLevel: 80 },
        { id: 'tailwind', name: 'Tailwind CSS & Utility-First Styling', category: 'technical', currentLevel: 55, targetLevel: 80 },
        { id: 'python', name: 'Python Programming', category: 'technical', currentLevel: 45, targetLevel: 75 },
        { id: 'git', name: 'Git & GitHub Version Control', category: 'technical', currentLevel: 50, targetLevel: 80 },
        { id: 'communication', name: 'Effective Verbal & Written Communication', category: 'soft', currentLevel: 70, targetLevel: 85 },
        { id: 'teamwork', name: 'Team Collaboration & Empathy', category: 'soft', currentLevel: 75, targetLevel: 85 },
        { id: 'time_management', name: 'Time Management & Organization', category: 'soft', currentLevel: 60, targetLevel: 80 },
        { id: 'problem_solving', name: 'Problem Solving & Algorithmic Thinking', category: 'professional', currentLevel: 55, targetLevel: 85 },
        { id: 'project_delivery', name: 'Project Planning & Agile Practices', category: 'professional', currentLevel: 50, targetLevel: 75 }
    ];

    const CAREER_ROLES = [
        {
            id: 'frontend_dev',
            title: 'Frontend Developer',
            description: 'Designs and builds responsive, interactive web user interfaces using modern web technologies.',
            requiredSkills: {
                html: 90,
                css: 85,
                javascript: 85,
                typescript: 80,
                tailwind: 85,
                git: 80,
                problem_solving: 80,
                communication: 75,
                teamwork: 80
            }
        },
        {
            id: 'fullstack_dev',
            title: 'Full-Stack Developer',
            description: 'Builds end-to-end applications spanning user interfaces, backend APIs, and database structures.',
            requiredSkills: {
                html: 85,
                css: 80,
                javascript: 90,
                typescript: 85,
                tailwind: 75,
                python: 80,
                git: 85,
                problem_solving: 85,
                project_delivery: 80
            }
        },
        {
            id: 'data_scientist',
            title: 'Data & AI Analyst',
            description: 'Analyzes structured/unstructured datasets, builds predictive models, and extracts actionable insights.',
            requiredSkills: {
                python: 90,
                problem_solving: 90,
                git: 75,
                communication: 85,
                time_management: 80,
                project_delivery: 75
            }
        },
        {
            id: 'software_engineer',
            title: 'General Software Engineer',
            description: 'Engineers robust software solutions, scalable architecture, and reliable system algorithms.',
            requiredSkills: {
                javascript: 80,
                typescript: 80,
                python: 80,
                problem_solving: 90,
                git: 85,
                teamwork: 85,
                project_delivery: 80
            }
        }
    ];

    const ASSESSMENT_QUESTIONS = [
        // Technical
        {
            id: 'q_js',
            category: 'technical',
            skillId: 'javascript',
            question: 'How comfortably do you work with modern JavaScript (ES6+, Promises, Async/Await)?',
            options: [
                { text: 'I am just starting out with basic syntax and loops', score: 30 },
                { text: 'I can manipulate the DOM and fetch APIs with some guidance', score: 60 },
                { text: 'I comfortably use closures, async/await, and array methods', score: 85 },
                { text: 'Advanced: I understand event loop, prototypes, and performance profiling', score: 100 }
            ]
        },
        {
            id: 'q_ts',
            category: 'technical',
            skillId: 'typescript',
            question: 'What is your experience level with TypeScript & static typing?',
            options: [
                { text: 'Never used TypeScript before', score: 15 },
                { text: 'Basic interfaces and primitives (string, number, boolean)', score: 45 },
                { text: 'Generics, union types, type guards, and configuring tsconfig', score: 80 },
                { text: 'Advanced conditional types, mapped types, and strict type design', score: 95 }
            ]
        },
        {
            id: 'q_css_tw',
            category: 'technical',
            skillId: 'tailwind',
            question: 'How do you approach modern styling (CSS Grid, Flexbox, Tailwind CSS)?',
            options: [
                { text: 'I struggle with layouts and positioning elements', score: 25 },
                { text: 'I use basic regular CSS styles and standard margin/padding', score: 55 },
                { text: 'I build fluid responsive layouts with Tailwind utility classes & CSS Flex/Grid', score: 85 },
                { text: 'I design design-systems, responsive themes, custom plugins and animations', score: 100 }
            ]
        },
        {
            id: 'q_git',
            category: 'technical',
            skillId: 'git',
            question: 'How do you handle source code control and Git workflows?',
            options: [
                { text: 'I upload zip files or only know git clone', score: 20 },
                { text: 'I use git add, commit, push, and pull on main branch', score: 50 },
                { text: 'I create feature branches, handle pull requests, and resolve basic merge conflicts', score: 80 },
                { text: 'I manage rebasing, cherry-picking, interactive workflows, and CI/CD pipelines', score: 95 }
            ]
        },
        // Soft
        {
            id: 'q_comm',
            category: 'soft',
            skillId: 'communication',
            question: 'How do you explain technical obstacles or proposals to teammates or non-technical peers?',
            options: [
                { text: 'I find it challenging to explain technical concepts simply', score: 30 },
                { text: 'I can communicate my points with some preparation and diagrams', score: 65 },
                { text: 'I write clear documentation and communicate technical decisions effectively', score: 85 },
                { text: 'I easily tailor technical presentations to any executive or peer audience', score: 95 }
            ]
        },
        {
            id: 'q_team',
            category: 'soft',
            skillId: 'teamwork',
            question: 'When a teammate has a differing approach or review feedback, how do you respond?',
            options: [
                { text: 'I feel defensive or reluctant to change my code', score: 35 },
                { text: 'I accept feedback but sometimes feel uncertain about tradeoffs', score: 65 },
                { text: 'I welcome code reviews, discuss tradeoffs objectively, and support teammates', score: 90 },
                { text: 'I mentor peers, build consensus, and foster collaborative team culture', score: 100 }
            ]
        },
        // Professional
        {
            id: 'q_prob',
            category: 'professional',
            skillId: 'problem_solving',
            question: 'When encountering an unfamiliar bug or requirement, how do you proceed?',
            options: [
                { text: 'I get stuck easily and randomly try code snippets', score: 30 },
                { text: 'I search stack overflow and console log until something works', score: 60 },
                { text: 'I break the problem into smaller testable units, read docs, and isolate root causes', score: 85 },
                { text: 'I construct systematic test reproductions, profile bottlenecks, and architect clean solutions', score: 95 }
            ]
        },
        {
            id: 'q_agile',
            category: 'professional',
            skillId: 'project_delivery',
            question: 'How do you organize your project tasks, milestones, and deadlines?',
            options: [
                { text: 'I work with no clear schedule and often scramble before deadlines', score: 25 },
                { text: 'I use simple to-do lists to keep track of tasks', score: 60 },
                { text: 'I break features into milestones, estimate effort, and prioritize deliverables', score: 85 },
                { text: 'I run structured sprints, manage backlogs, track velocity, and ship on time', score: 95 }
            ]
        }
    ];

    const RECOMMENDATIONS_LIBRARY = [
        {
            id: 'rec_ts',
            title: 'Master Modern TypeScript & Type Safety',
            skillName: 'TypeScript',
            category: 'technical',
            type: 'course',
            description: 'Understand interfaces, generics, union types, and strict mode compiler options.',
            url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
            platform: 'Official TypeScript Handbook'
        },
        {
            id: 'rec_tailwind',
            title: 'Modern Responsive Design with Tailwind CSS',
            skillName: 'Tailwind CSS',
            category: 'technical',
            type: 'course',
            description: 'Speed up UI development with utility-first classes, dark mode, responsive breakpoints and animations.',
            url: 'https://tailwindcss.com/docs',
            platform: 'Tailwind CSS Documentation'
        },
        {
            id: 'rec_js',
            title: 'JavaScript: The Hard Parts & Asynchronous Patterns',
            skillName: 'JavaScript',
            category: 'technical',
            type: 'practice',
            description: 'Deep dive into event loop, closures, microtask queues, and modern ES2024 features.',
            url: 'https://javascript.info/',
            platform: 'The Modern JavaScript Tutorial'
        },
        {
            id: 'rec_git',
            title: 'Git Version Control & Open Source Collaboration',
            skillName: 'Git',
            category: 'technical',
            type: 'project',
            description: 'Practice branching strategies, pull requests, conventional commits, and merge conflict resolution.',
            url: 'https://learngitbranching.js.org/',
            platform: 'Learn Git Branching Interactive'
        },
        {
            id: 'rec_python',
            title: 'Python for Data Structures & Problem Solving',
            skillName: 'Python',
            category: 'technical',
            type: 'course',
            description: 'Strengthen core programming concepts, data structures, and automation scripting.',
            url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
            platform: 'freeCodeCamp'
        },
        {
            id: 'rec_comm',
            title: 'Tech Communication & Collaborative Code Reviews',
            skillName: 'Communication',
            category: 'soft',
            type: 'practice',
            description: 'Learn constructive pull request reviews, clear RFC writing, and technical presentation skills.',
            url: 'https://www.coursera.org/learn/effective-communication-for-engineers',
            platform: 'Coursera'
        },
        {
            id: 'rec_problem',
            title: 'Algorithmic Thinking & Systematic Debugging',
            skillName: 'Problem Solving',
            category: 'professional',
            type: 'practice',
            description: 'Tackle structured computational problems and learn step-by-step root-cause analysis.',
            url: 'https://leetcode.com/explore/',
            platform: 'LeetCode / HackerRank'
        }
    ];

    // 2. Skill Gap Analyzer Core
    class SkillGapAnalyzer {
        static calculatePriority(gap) {
            if (gap <= 0) return 'mastered';
            if (gap > 25) return 'high';
            if (gap > 10) return 'medium';
            return 'low';
        }

        static analyze(skills, targetRole) {
            const gapItems = [];
            let totalBenchmarked = 0;
            let cumulativeReadiness = 0;
            let metCount = 0;
            let gapCount = 0;

            for (const [skillId, requiredScore] of Object.entries(targetRole.requiredSkills)) {
                totalBenchmarked++;
                const studentSkill = skills.find(s => s.id === skillId);
                const currentScore = studentSkill ? studentSkill.currentLevel : 0;
                const category = studentSkill ? studentSkill.category : 'technical';
                const skillName = studentSkill ? studentSkill.name : skillId.toUpperCase();

                const gap = requiredScore - currentScore;
                const priority = this.calculatePriority(gap);

                if (gap <= 0) {
                    metCount++;
                    cumulativeReadiness += 100;
                } else {
                    gapCount++;
                    const ratio = Math.max(0, Math.min(100, Math.round((currentScore / requiredScore) * 100)));
                    cumulativeReadiness += ratio;
                }

                gapItems.push({
                    skillId,
                    skillName,
                    category,
                    currentLevel: currentScore,
                    requiredLevel: requiredScore,
                    gap: Math.max(0, gap),
                    priority
                });
            }

            gapItems.sort((a, b) => b.gap - a.gap);

            const overallReadiness = totalBenchmarked > 0 
                ? Math.round(cumulativeReadiness / totalBenchmarked) 
                : 0;

            const gapSkillNames = gapItems
                .filter(item => item.gap > 0)
                .map(item => item.skillName.toLowerCase());

            const matchedRecs = RECOMMENDATIONS_LIBRARY.filter(rec => {
                return gapSkillNames.some(name => 
                    name.includes(rec.skillName.toLowerCase()) || 
                    rec.skillName.toLowerCase().includes(name)
                );
            });

            const finalRecs = matchedRecs.length >= 3 
                ? matchedRecs 
                : Array.from(new Set([...matchedRecs, ...RECOMMENDATIONS_LIBRARY])).slice(0, 4);

            return {
                overallReadiness,
                targetRole,
                totalSkillsEvaluated: totalBenchmarked,
                skillsMet: metCount,
                skillsWithGaps: gapCount,
                gapItems,
                recommendations: finalRecs
            };
        }
    }

    // 3. Assessment Controller
    class AssessmentController {
        constructor() {
            this.activeCategory = 'all';
            this.currentQuestionIndex = 0;
            this.userAnswers = new Map();
        }

        getQuestions(category = 'all') {
            if (category === 'all') return ASSESSMENT_QUESTIONS;
            return ASSESSMENT_QUESTIONS.filter(q => q.category === category);
        }

        startAssessment(category = 'all') {
            this.activeCategory = category;
            this.currentQuestionIndex = 0;
            this.userAnswers.clear();
        }

        getCurrentQuestion() {
            const questions = this.getQuestions(this.activeCategory);
            if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < questions.length) {
                return questions[this.currentQuestionIndex];
            }
            return null;
        }

        getTotalQuestions() {
            return this.getQuestions(this.activeCategory).length;
        }

        getCurrentIndex() {
            return this.currentQuestionIndex;
        }

        answerQuestion(score) {
            const currentQ = this.getCurrentQuestion();
            if (!currentQ) return false;
            this.userAnswers.set(currentQ.id, score);
            this.currentQuestionIndex++;
            return this.currentQuestionIndex >= this.getTotalQuestions();
        }

        applyScoresToSkills(skills) {
            const questions = this.getQuestions(this.activeCategory);
            const updated = [...skills];
            for (const q of questions) {
                const score = this.userAnswers.get(q.id);
                if (score !== undefined) {
                    const idx = updated.findIndex(s => s.id === q.skillId);
                    if (idx !== -1) {
                        updated[idx] = {
                            ...updated[idx],
                            currentLevel: score
                        };
                    }
                }
            }
            return updated;
        }
    }

    // 4. Main Application Class
    class SkillBridgeApp {
        constructor() {
            this.skills = [];
            this.selectedRole = CAREER_ROLES[0];
            this.assessment = new AssessmentController();
            this.storageKey = 'skillbridge_student_data_v1';

            this.loadState();
            this.initEventListeners();
            this.renderAll();
        }

        loadState() {
            try {
                const raw = localStorage.getItem(this.storageKey);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed.skills && Array.isArray(parsed.skills)) {
                        this.skills = parsed.skills;
                    } else {
                        this.skills = [...INITIAL_SKILLS];
                    }
                    if (parsed.selectedRoleId) {
                        const foundRole = CAREER_ROLES.find(r => r.id === parsed.selectedRoleId);
                        if (foundRole) this.selectedRole = foundRole;
                    }
                } else {
                    this.skills = [...INITIAL_SKILLS];
                }
            } catch (err) {
                console.warn('LocalStorage error:', err);
                this.skills = [...INITIAL_SKILLS];
            }
        }

        saveState() {
            try {
                const payload = {
                    skills: this.skills,
                    selectedRoleId: this.selectedRole.id,
                    updatedAt: new Date().toISOString()
                };
                localStorage.setItem(this.storageKey, JSON.stringify(payload));
            } catch (err) {
                console.error('Failed to save to localStorage:', err);
            }
        }

        getAnalysis() {
            return SkillGapAnalyzer.analyze(this.skills, this.selectedRole);
        }

        initEventListeners() {
            // Target Role Select dropdown
            const roleSelect = document.getElementById('targetRoleSelect');
            if (roleSelect) {
                roleSelect.innerHTML = CAREER_ROLES.map(role => 
                    `<option value="${role.id}" ${role.id === this.selectedRole.id ? 'selected' : ''}>${role.title}</option>`
                ).join('');

                roleSelect.addEventListener('change', (e) => {
                    const found = CAREER_ROLES.find(r => r.id === e.target.value);
                    if (found) {
                        this.selectedRole = found;
                        this.saveState();
                        this.renderAll();
                        this.showToast(`Target role switched to ${found.title}`);
                    }
                });
            }

            // Assessment Card Buttons
            document.querySelectorAll('[data-assess-category]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const cat = btn.getAttribute('data-assess-category');
                    this.openAssessmentModal(cat || 'all');
                });
            });

            // Hero Start Assessment Button
            const heroStartBtn = document.getElementById('heroStartAssessment');
            if (heroStartBtn) {
                heroStartBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openAssessmentModal('all');
                });
            }

            // View Analysis Button
            const viewAnalysisBtn = document.getElementById('viewAnalysisBtn');
            if (viewAnalysisBtn) {
                viewAnalysisBtn.addEventListener('click', () => {
                    const breakdownElem = document.getElementById('detailedBreakdownSection');
                    if (breakdownElem) {
                        breakdownElem.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }

            // Reset Data Button
            const resetBtn = document.getElementById('resetDataBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (confirm('Reset all assessment scores back to default benchmarks?')) {
                        this.skills = [...INITIAL_SKILLS];
                        this.saveState();
                        this.renderAll();
                        this.showToast('Data reset to default benchmarks.');
                    }
                });
            }

            // Modal Close
            const closeModalBtn = document.getElementById('closeModalBtn');
            const modalOverlay = document.getElementById('assessmentModal');
            if (closeModalBtn && modalOverlay) {
                closeModalBtn.addEventListener('click', () => {
                    modalOverlay.classList.add('hidden');
                    modalOverlay.classList.remove('flex');
                });
            }

            // Export Report
            const exportBtn = document.getElementById('exportReportBtn');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => this.exportReport());
            }

            // Mobile menu toggle if present
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const navMenu = document.querySelector('header nav');
            if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('nav-open');
                });
            }
        }

        openAssessmentModal(category) {
            this.assessment.startAssessment(category);
            const modal = document.getElementById('assessmentModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                this.renderAssessmentQuestion();
            }
        }

        renderAssessmentQuestion() {
            const questionContainer = document.getElementById('modalQuestionBody');
            const progressIndicator = document.getElementById('modalProgressIndicator');
            const q = this.assessment.getCurrentQuestion();

            if (!q) {
                this.skills = this.assessment.applyScoresToSkills(this.skills);
                this.saveState();
                this.renderAll();

                if (questionContainer) {
                    questionContainer.innerHTML = `
                        <div class="text-center py-6">
                            <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-inner animate-bounce">✓</div>
                            <h3 class="text-2xl font-bold text-slate-800 mb-2">Assessment Completed!</h3>
                            <p class="text-slate-600 mb-6">Your customized skill metrics and target role gaps are now recalculated.</p>
                            <button id="finishAssessmentBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                View Updated Analysis
                            </button>
                        </div>
                    `;

                    document.getElementById('finishAssessmentBtn')?.addEventListener('click', () => {
                        const modal = document.getElementById('assessmentModal');
                        if (modal) {
                            modal.classList.add('hidden');
                            modal.classList.remove('flex');
                        }
                        this.showToast('Profile updated!');
                        const section = document.getElementById('analysis');
                        if (section) section.scrollIntoView({ behavior: 'smooth' });
                    });
                }
                return;
            }

            const totalQ = this.assessment.getTotalQuestions();
            const currentIdx = this.assessment.getCurrentIndex() + 1;

            if (progressIndicator) {
                progressIndicator.textContent = `Question ${currentIdx} of ${totalQ}`;
            }

            if (questionContainer) {
                questionContainer.innerHTML = `
                    <div class="mb-4">
                        <span class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-100 text-blue-800 mb-3">
                            ${q.category.toUpperCase()} DOMAIN
                        </span>
                        <h3 class="text-xl font-bold text-slate-800 leading-snug">${q.question}</h3>
                    </div>
                    <div class="space-y-3 mt-6">
                        ${q.options.map((opt, i) => `
                            <button data-option-score="${opt.score}" class="quiz-option-btn w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/60 transition flex items-start gap-3.5 group">
                                <span class="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-sm font-semibold text-slate-600 shrink-0 transition">
                                    ${String.fromCharCode(65 + i)}
                                </span>
                                <span class="text-slate-700 font-medium group-hover:text-blue-900 leading-relaxed text-sm md:text-base">
                                    ${opt.text}
                                </span>
                            </button>
                        `).join('')}
                    </div>
                `;

                questionContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const score = Number(btn.getAttribute('data-option-score') || '50');
                        const isDone = this.assessment.answerQuestion(score);
                        if (isDone) {
                            this.skills = this.assessment.applyScoresToSkills(this.skills);
                            this.saveState();
                            this.renderAll();
                        }
                        this.renderAssessmentQuestion();
                    });
                });
            }
        }

        renderAll() {
            const analysis = this.getAnalysis();

            // 1. Update Hero Card
            const circleElem = document.querySelector('.hero-card .circle');
            if (circleElem) {
                circleElem.textContent = `${analysis.overallReadiness}%`;
                // Animate circular border color depending on readiness
                if (analysis.overallReadiness >= 80) {
                    circleElem.style.borderColor = '#10B981';
                    circleElem.style.color = '#059669';
                } else if (analysis.overallReadiness >= 60) {
                    circleElem.style.borderColor = '#2563EB';
                    circleElem.style.color = '#1D4ED8';
                } else {
                    circleElem.style.borderColor = '#F59E0B';
                    circleElem.style.color = '#D97706';
                }
            }

            const journeyTextElem = document.querySelector('.hero-card p');
            if (journeyTextElem) {
                journeyTextElem.textContent = analysis.overallReadiness >= 80 
                    ? 'Ready for Industry Roles!' 
                    : analysis.overallReadiness >= 60 
                    ? 'Solid Foundation, Closing Gaps!' 
                    : 'Keep learning and improving!';
            }

            // 2. Update Career Description
            const roleDescElem = document.getElementById('selectedRoleDescription');
            if (roleDescElem) {
                roleDescElem.textContent = this.selectedRole.description;
            }

            // 3. Progress Bars in Main Analysis Card
            const progressListElem = document.getElementById('skillProgressContainer');
            if (progressListElem) {
                progressListElem.innerHTML = analysis.gapItems.slice(0, 5).map(item => {
                    const colorClass = item.gap === 0 ? 'bg-emerald-500' : item.gap > 25 ? 'bg-amber-500' : 'bg-blue-600';
                    return `
                        <div class="mb-4">
                            <div class="flex justify-between items-center text-sm mb-1.5">
                                <span class="font-medium text-slate-700">${item.skillName}</span>
                                <span class="text-xs font-semibold text-slate-500">Current: ${item.currentLevel}% / Target: ${item.requiredLevel}%</span>
                            </div>
                            <div class="w-full bg-blue-100/70 rounded-full h-2.5 overflow-hidden">
                                <div class="${colorClass} h-2.5 rounded-full transition-all duration-700" style="width: ${item.currentLevel}%"></div>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            // 4. Update Gap Info Statistics
            const gapStatsElem = document.getElementById('gapStatsSummary');
            if (gapStatsElem) {
                gapStatsElem.innerHTML = `
                    <div class="grid grid-cols-2 gap-3 mb-4 text-center">
                        <div class="p-3 bg-blue-50/80 rounded-xl border border-blue-100">
                            <span class="block text-2xl font-bold text-blue-600">${analysis.skillsMet}</span>
                            <span class="text-xs text-slate-500">Skills Benchmarked Met</span>
                        </div>
                        <div class="p-3 bg-amber-50/80 rounded-xl border border-amber-100">
                            <span class="block text-2xl font-bold text-amber-600">${analysis.skillsWithGaps}</span>
                            <span class="text-xs text-slate-500">Skill Gaps to Bridge</span>
                        </div>
                    </div>
                `;
            }

            // 5. Render Breakdown Table & Live Sliders
            const breakdownBody = document.getElementById('breakdownTableBody');
            if (breakdownBody) {
                breakdownBody.innerHTML = analysis.gapItems.map(item => {
                    const badgeClass = item.priority === 'mastered' 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                        : item.priority === 'high' 
                        ? 'bg-rose-100 text-rose-700 border-rose-200' 
                        : item.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : 'bg-blue-100 text-blue-700 border-blue-200';

                    return `
                        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
                            <td class="py-3 px-4 font-medium text-slate-800">${item.skillName}</td>
                            <td class="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">${item.category}</td>
                            <td class="py-3 px-4 text-slate-700 font-semibold">${item.currentLevel}%</td>
                            <td class="py-3 px-4 text-slate-600">${item.requiredLevel}%</td>
                            <td class="py-3 px-4">
                                <span class="inline-block px-2.5 py-1 text-xs font-bold rounded-md border ${badgeClass}">
                                    ${item.gap > 0 ? `-${item.gap}% Gap` : 'Benchmark Met ✓'}
                                </span>
                            </td>
                            <td class="py-3 px-4">
                                <input type="range" min="0" max="100" value="${item.currentLevel}" 
                                    data-skill-slider="${item.skillId}" 
                                    class="w-28 accent-blue-600 cursor-pointer" />
                            </td>
                        </tr>
                    `;
                }).join('');

                breakdownBody.querySelectorAll('input[data-skill-slider]').forEach(slider => {
                    slider.addEventListener('input', (e) => {
                        const skillId = e.target.getAttribute('data-skill-slider');
                        const val = Number(e.target.value);
                        const idx = this.skills.findIndex(s => s.id === skillId);
                        if (idx !== -1) {
                            this.skills[idx].currentLevel = val;
                            this.saveState();
                            this.renderAll();
                        }
                    });
                });
            }

            // 6. Render Recommendations
            const recGrid = document.getElementById('dynamicRecommendationsGrid');
            if (recGrid) {
                recGrid.innerHTML = analysis.recommendations.map(rec => `
                    <div class="card p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <span class="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                                    ${rec.type}
                                </span>
                                <span class="text-xs font-medium text-slate-400">${rec.platform}</span>
                            </div>
                            <h3 class="text-lg font-bold text-slate-900 mb-2 leading-tight">${rec.title}</h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">${rec.description}</p>
                        </div>
                        <a href="${rec.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 text-sm mt-2 group">
                            Explore Resource <span class="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                `).join('');
            }
        }

        exportReport() {
            const analysis = this.getAnalysis();
            const report = {
                title: 'SkillBridge Student Skill Gap Report',
                generatedDate: new Date().toLocaleDateString(),
                targetRole: analysis.targetRole.title,
                overallReadiness: `${analysis.overallReadiness}%`,
                skillsMetCount: analysis.skillsMet,
                skillsWithGapsCount: analysis.skillsWithGaps,
                skillsBreakdown: analysis.gapItems.map(g => ({
                    skill: g.skillName,
                    category: g.category,
                    current: `${g.currentLevel}%`,
                    required: `${g.requiredLevel}%`,
                    gap: `${g.gap}%`,
                    status: g.priority
                })),
                recommendedNextSteps: analysis.recommendations.map(r => ({
                    resource: r.title,
                    platform: r.platform,
                    link: r.url
                }))
            };

            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SkillBridge-Report-${this.selectedRole.id}.json`;
            a.click();
            URL.revokeObjectURL(url);
            this.showToast('Skill gap report downloaded!');
        }

        showToast(message) {
            let toast = document.getElementById('skillToast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'skillToast';
                toast.className = 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-opacity duration-300 text-sm font-medium';
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            toast.style.opacity = '1';
            setTimeout(() => {
                if (toast) toast.style.opacity = '0';
            }, 3000);
        }
    }

    // Launch app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new SkillBridgeApp());
    } else {
        new SkillBridgeApp();
    }
})();
