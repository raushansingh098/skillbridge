/**
 * SkillBridge - Student Skill Gap Analyzer
 * Skill Gap Analysis Engine
 */

import { SkillItem, CareerRole, GapAnalysisItem, AnalysisSummary, Recommendation, GapPriority } from './types';
import { RECOMMENDATIONS_LIBRARY } from './data';

export class SkillGapAnalyzer {
    /**
     * Determines gap priority based on difference between target and current level
     */
    public static calculatePriority(gap: number): GapPriority {
        if (gap <= 0) return 'mastered';
        if (gap > 25) return 'high';
        if (gap > 10) return 'medium';
        return 'low';
    }

    /**
     * Evaluates a list of student skills against a target career benchmark
     */
    public static analyze(skills: SkillItem[], targetRole: CareerRole): AnalysisSummary {
        const gapItems: GapAnalysisItem[] = [];
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

        // Sort gap items: highest gap first
        gapItems.sort((a, b) => b.gap - a.gap);

        const overallReadiness = totalBenchmarked > 0 
            ? Math.round(cumulativeReadiness / totalBenchmarked) 
            : 0;

        // Select targeted recommendations based on skills with gaps
        const gapSkillNames = gapItems
            .filter(item => item.gap > 0)
            .map(item => item.skillName.toLowerCase());

        const matchedRecs: Recommendation[] = RECOMMENDATIONS_LIBRARY.filter(rec => {
            return gapSkillNames.some(name => 
                name.includes(rec.skillName.toLowerCase()) || 
                rec.skillName.toLowerCase().includes(name)
            );
        });

        // Always provide at least 3 relevant recommendations
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
