/**
 * SkillBridge - Student Skill Gap Analyzer
 * Assessment Engine & State Controller
 */

import { AssessmentQuestion, SkillCategory, SkillItem } from './types';
import { ASSESSMENT_QUESTIONS } from './data';

export class AssessmentController {
    private activeCategory: SkillCategory | 'all' = 'all';
    private currentQuestionIndex: number = 0;
    private userAnswers: Map<string, number> = new Map(); // questionId -> score

    constructor() {}

    public getQuestions(category: SkillCategory | 'all' = 'all'): AssessmentQuestion[] {
        if (category === 'all') {
            return ASSESSMENT_QUESTIONS;
        }
        return ASSESSMENT_QUESTIONS.filter(q => q.category === category);
    }

    public startAssessment(category: SkillCategory | 'all' = 'all'): void {
        this.activeCategory = category;
        this.currentQuestionIndex = 0;
        this.userAnswers.clear();
    }

    public getCurrentQuestion(): AssessmentQuestion | null {
        const questions = this.getQuestions(this.activeCategory);
        if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < questions.length) {
            return questions[this.currentQuestionIndex];
        }
        return null;
    }

    public getTotalQuestions(): number {
        return this.getQuestions(this.activeCategory).length;
    }

    public getCurrentIndex(): number {
        return this.currentQuestionIndex;
    }

    public answerQuestion(score: number): boolean {
        const currentQ = this.getCurrentQuestion();
        if (!currentQ) return false;

        this.userAnswers.set(currentQ.id, score);
        this.currentQuestionIndex++;
        return this.currentQuestionIndex >= this.getTotalQuestions(); // returns true if finished
    }

    public applyScoresToSkills(skills: SkillItem[]): SkillItem[] {
        const questions = this.getQuestions(this.activeCategory);
        const updatedSkills = [...skills];

        for (const q of questions) {
            const score = this.userAnswers.get(q.id);
            if (score !== undefined) {
                const targetSkillIndex = updatedSkills.findIndex(s => s.id === q.skillId);
                if (targetSkillIndex !== -1) {
                    updatedSkills[targetSkillIndex] = {
                        ...updatedSkills[targetSkillIndex],
                        currentLevel: score
                    };
                }
            }
        }

        return updatedSkills;
    }
}
