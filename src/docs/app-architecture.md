// File structure for the Geometry Tutor app

src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Home/Dashboard)
│   │   ├── progress/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── modules/
│   │       ├── [moduleId]/
│   │       │   ├── page.tsx
│   │       │   ├── lesson/
│   │       │   │   └── page.tsx
│   │       │   ├── demonstration/
│   │       │   │   └── page.tsx
│   │       │   ├── quiz/
│   │       │   │   └── page.tsx
│   │       │   └── review/
│   │       │       └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress-bar.tsx
│   │   └── tabs.tsx
│   ├── modules/
│   │   ├── module-card.tsx
│   │   ├── quiz-question.tsx
│   │   └── interactive-demonstration.tsx
│   ├── layout/
│   │   ├── navigation-menu.tsx
│   │   ├── sidebar.tsx
│   │   └── header.tsx
│   └── shared/
│       ├── progress-tracker.tsx
│       └── user-profile.tsx
├── lib/
│   ├── constants.ts
│   ├── types.ts
│   └── utils.ts
├── hooks/
│   ├── use-module-progress.ts
│   └── use-quiz-state.ts
└── store/
    └── user-progress-store.ts