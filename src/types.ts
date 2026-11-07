/**
 * SkillBridge - Student Skill Gap Analyzer
 * TypeScript Type Definitions
 */

export type SkillCategory = 'technical' | 'soft' | 'professional';

export type GapPriority = 'high' | 'medium' | 'low' | 'mastered';

export interface SkillItem {
    id: string;
    name: string;
    category: SkillCategory;
    currentLevel: number; // 0 to 100
    targetLevel: number;  // 0 to 100
}

export interface CareerRole {
    id: string;
    title: string;
    description: string;
    requiredSkills: { [skillId: string]: number }; // skillId -> required benchmark level (0-100)
}

export interface AssessmentQuestion {
    id: string;
    category: SkillCategory;
    skillId: string;
    question: string;
    options: {
        text: string;
        score: number; // 0 to 100
    }[];
}

export interface GapAnalysisItem {
    skillId: string;
    skillName: string;
    category: SkillCategory;
    currentLevel: number;
    requiredLevel: number;
    gap: number; // requiredLevel - currentLevel (positive means gap)
    priority: GapPriority;
}

export interface AnalysisSummary {
    overallReadiness: number; // 0 to 100%
    targetRole: CareerRole;
    totalSkillsEvaluated: number;
    skillsMet: number;
    skillsWithGaps: number;
    gapItems: GapAnalysisItem[];
    recommendations: Recommendation[];
}

export interface Recommendation {
    id: string;
    title: string;
    skillName: string;
    category: SkillCategory;
    type: 'course' | 'practice' | 'project';
    description: string;
    url: string;
    platform: string;
}
