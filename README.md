# SkillBridge - Student Skill Gap Analyzer

SkillBridge is an interactive career preparation web application designed for students to evaluate their existing skill competencies, benchmark against industry role expectations (e.g. Frontend Developer, Full-Stack Developer, Data & AI Analyst, Software Engineer), identify gaps, and receive tailored learning roadmaps.

## 🚀 Built With

- **TypeScript (`src/`)**: Clean, modular, type-safe architecture with defined interfaces (`types.ts`), benchmarks & question banks (`data.ts`), calculation engines (`analyzer.ts`), assessment state machines (`assessment.ts`), and application controller (`app.ts`).
- **JavaScript (`script.js`)**: Standalone client-side application running natively in modern browsers with zero setup required.
- **Tailwind CSS**: Modern utility-first styling for grid layouts, responsive flexboxes, badges, modal overlays, and quick styling classes.
- **Regular CSS (`style.css`)**: Custom brand styling, glassmorphism, glowing meters, hover micro-interactions, responsive media queries, and smooth animations.

---

## 📁 Project Structure

```
skillbridge-student-skill-gap-analyzer/
├── index.html            # Main web page with Tailwind & regular CSS integration
├── style.css             # Regular CSS stylesheet with custom animations & layout rules
├── script.js             # Native browser JavaScript application
├── package.json          # Node scripts for TypeScript compilation and Tailwind builds
├── tsconfig.json         # TypeScript compiler configuration
├── tailwind.config.js    # Tailwind CSS custom theme & brand colors
├── src/
│   ├── types.ts          # TypeScript interfaces (SkillItem, CareerRole, AssessmentQuestion, etc.)
│   ├── data.ts           # Career benchmark requirements, question bank & learning library
│   ├── analyzer.ts       # Gap calculation algorithms & priority sorting
│   ├── assessment.ts     # Assessment quiz engine & scoring logic
│   ├── app.ts            # Main application controller
│   └── tailwind.css      # Tailwind base and component classes
└── README.md             # Project documentation
```

---

## ✨ Features

1. **Target Career Benchmark Switching**:
   - Compare skills against target roles including Frontend Developer, Full-Stack Developer, Data & AI Analyst, and General Software Engineer.
2. **Interactive Skill Assessments**:
   - Technical, Soft, and Professional skill quizzes that calculate accurate scores and dynamically update current abilities.
3. **Real-Time Skill Gap Engine**:
   - Categorizes gaps into High Priority, Medium, Low, or Mastered.
   - Calculates overall career readiness percentage displayed on the hero circular gauge.
4. **Interactive Skill Matrix & Sliders**:
   - Adjust proficiency sliders (0–100%) to immediately preview how learning a specific technology impacts overall job readiness.
5. **Personalized Recommendations**:
   - Curated courses, practice platforms, and open-source projects (freeCodeCamp, TypeScript docs, Tailwind docs, LeetCode, Coursera) dynamically mapped to identified gaps.
6. **Data Persistence & Export**:
   - Automatically saves state to `localStorage`.
   - One-click "Export JSON Report" for student portfolios and resumes.

---

## 🛠️ How to Run

### Direct in Browser (No build tools required)
Simply open `index.html` in any web browser. Everything is loaded seamlessly via the compiled `script.js` and Tailwind CSS CDN.

### TypeScript & Tailwind Developer Workflow
If you have Node.js installed and wish to edit TypeScript or rebuild Tailwind styles:

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build:ts

# Build Tailwind CSS
npm run build:css

# Watch for TypeScript changes
npm run watch:ts
```

---

## 📄 License
MIT License.
