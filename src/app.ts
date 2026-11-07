/**
 * SkillBridge - Student Skill Gap Analyzer
 * Main TypeScript Application Controller
 */

import { SkillItem, CareerRole, AnalysisSummary, SkillCategory } from './types';
import { INITIAL_SKILLS, CAREER_ROLES } from './data';
import { SkillGapAnalyzer } from './analyzer';
import { AssessmentController } from './assessment';

export class SkillBridgeApp {
    private skills: SkillItem[] = [];
    private selectedRole: CareerRole = CAREER_ROLES[0];
    private assessment: AssessmentController = new AssessmentController();
    private storageKey: string = 'skillbridge_student_data_v1';

    constructor() {
        this.loadState();
        this.initEventListeners();
        this.renderAll();
    }

    private loadState(): void {
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
        } catch {
            this.skills = [...INITIAL_SKILLS];
        }
    }

    private saveState(): void {
        try {
            const payload = {
                skills: this.skills,
                selectedRoleId: this.selectedRole.id,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(payload));
        } catch (e) {
            console.error('Failed to save to localStorage', e);
        }
    }

    private getAnalysis(): AnalysisSummary {
        return SkillGapAnalyzer.analyze(this.skills, this.selectedRole);
    }

    private initEventListeners(): void {
        // Career role dropdown selector
        const roleSelect = document.getElementById('targetRoleSelect') as HTMLSelectElement | null;
        if (roleSelect) {
            roleSelect.innerHTML = CAREER_ROLES.map(role => 
                `<option value="${role.id}" ${role.id === this.selectedRole.id ? 'selected' : ''}>${role.title}</option>`
            ).join('');

            roleSelect.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                const found = CAREER_ROLES.find(r => r.id === target.value);
                if (found) {
                    this.selectedRole = found;
                    this.saveState();
                    this.renderAll();
                }
            });
        }

        // Assessment buttons on cards
        document.querySelectorAll<HTMLButtonElement>('[data-assess-category]').forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-assess-category') as SkillCategory;
                this.openAssessmentModal(cat || 'all');
            });
        });

        // "Start Assessment" hero button
        const heroStartBtn = document.getElementById('heroStartAssessment');
        if (heroStartBtn) {
            heroStartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openAssessmentModal('all');
            });
        }

        // "View Detailed Gap Analysis" button
        const viewAnalysisBtn = document.getElementById('viewAnalysisBtn');
        if (viewAnalysisBtn) {
            viewAnalysisBtn.addEventListener('click', () => {
                const breakdownElem = document.getElementById('detailedBreakdownSection');
                if (breakdownElem) {
                    breakdownElem.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Reset Assessment Data
        const resetBtn = document.getElementById('resetDataBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Reset all assessment scores back to initial defaults?')) {
                    this.skills = [...INITIAL_SKILLS];
                    this.saveState();
                    this.renderAll();
                    this.showToast('Data reset to default benchmarks.');
                }
            });
        }

        // Modal close button
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modalOverlay = document.getElementById('assessmentModal');
        if (closeModalBtn && modalOverlay) {
            closeModalBtn.addEventListener('click', () => {
                modalOverlay.classList.add('hidden');
            });
        }

        // Export Report Button
        const exportBtn = document.getElementById('exportReportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }
    }

    private openAssessmentModal(category: SkillCategory | 'all'): void {
        this.assessment.startAssessment(category);
        const modal = document.getElementById('assessmentModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            this.renderAssessmentQuestion();
        }
    }

    private renderAssessmentQuestion(): void {
        const questionContainer = document.getElementById('modalQuestionBody');
        const progressIndicator = document.getElementById('modalProgressIndicator');
        const q = this.assessment.getCurrentQuestion();

        if (!q) {
            // Completed!
            this.skills = this.assessment.applyScoresToSkills(this.skills);
            this.saveState();
            this.renderAll();

            if (questionContainer) {
                questionContainer.innerHTML = `
                    <div class="text-center py-6">
                        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✓</div>
                        <h3 class="text-2xl font-bold text-slate-800 mb-2">Assessment Complete!</h3>
                        <p class="text-slate-600 mb-6">Your skills and gap metrics have been dynamically updated.</p>
                        <button id="finishAssessmentBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition">
                            View Updated Results
                        </button>
                    </div>
                `;

                document.getElementById('finishAssessmentBtn')?.addEventListener('click', () => {
                    const modal = document.getElementById('assessmentModal');
                    if (modal) {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                    }
                    this.showToast('Skill profile updated successfully!');
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
                        ${q.category.toUpperCase()} SKILL
                    </span>
                    <h3 class="text-xl font-bold text-slate-800 leading-snug">${q.question}</h3>
                </div>
                <div class="space-y-3 mt-6">
                    ${q.options.map((opt, i) => `
                        <button data-option-score="${opt.score}" class="quiz-option-btn w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition flex items-start gap-3 group">
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

            questionContainer.querySelectorAll<HTMLButtonElement>('.quiz-option-btn').forEach(btn => {
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

    private renderAll(): void {
        const analysis = this.getAnalysis();

        // 1. Update Hero Journey Circle and Readiness
        const circleElem = document.querySelector('.hero-card .circle');
        if (circleElem) {
            circleElem.textContent = `${analysis.overallReadiness}%`;
        }
        const journeyTextElem = document.querySelector('.hero-card p');
        if (journeyTextElem) {
            journeyTextElem.textContent = analysis.overallReadiness >= 80 
                ? 'Ready for Industry Roles!' 
                : analysis.overallReadiness >= 60 
                ? 'Solid Foundation, Closing Gaps!' 
                : 'Keep practicing and bridging gaps!';
        }

        // 2. Update Career Description
        const roleDescElem = document.getElementById('selectedRoleDescription');
        if (roleDescElem) {
            roleDescElem.textContent = this.selectedRole.description;
        }

        // 3. Update Skill Gap Section Progress Bars
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
                        <div class="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
                            <div class="${colorClass} h-2.5 rounded-full transition-all duration-500" style="width: ${item.currentLevel}%"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 4. Update Gap Info Summary
        const gapStatsElem = document.getElementById('gapStatsSummary');
        if (gapStatsElem) {
            gapStatsElem.innerHTML = `
                <div class="grid grid-cols-2 gap-3 mb-4 text-center">
                    <div class="p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <span class="block text-2xl font-bold text-blue-600">${analysis.skillsMet}</span>
                        <span class="text-xs text-slate-500">Skills Benchmarked Met</span>
                    </div>
                    <div class="p-3 bg-amber-50 rounded-xl border border-amber-100">
                        <span class="block text-2xl font-bold text-amber-600">${analysis.skillsWithGaps}</span>
                        <span class="text-xs text-slate-500">Skill Gaps to Bridge</span>
                    </div>
                </div>
            `;
        }

        // 5. Render Full Breakdown Table
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
                        <td class="py-3 px-4 text-xs font-semibold capitalize text-slate-500">${item.category}</td>
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
                                class="w-24 accent-blue-600 cursor-pointer" />
                        </td>
                    </tr>
                `;
            }).join('');

            // Bind live slider updates
            breakdownBody.querySelectorAll<HTMLInputElement>('input[data-skill-slider]').forEach(slider => {
                slider.addEventListener('input', (e) => {
                    const target = e.target as HTMLInputElement;
                    const skillId = target.getAttribute('data-skill-slider');
                    const val = Number(target.value);
                    const idx = this.skills.findIndex(s => s.id === skillId);
                    if (idx !== -1) {
                        this.skills[idx].currentLevel = val;
                        this.saveState();
                        this.renderAll();
                    }
                });
            });
        }

        // 6. Render Dynamic Recommendations
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

    private exportReport(): void {
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

    private showToast(message: string): void {
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

// Auto-boot application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new SkillBridgeApp();
});
