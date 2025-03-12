# Geometry Tutor for 8th Grade

An interactive educational app designed to teach 8th-grade students key geometry concepts through structured lessons, demonstrations, quizzes, and review sessions.

![Geometry Tutor Screenshot](public/images/app-screenshot.png)

## Features

- **Structured Learning Modules**: Eight comprehensive modules covering essential geometry concepts
- **Interactive Learning**: Each module includes:
  - Introductory lessons with clear explanations
  - Interactive demonstrations for hands-on exploration
  - Quizzes with immediate feedback
  - Spaced repetition reviews for better retention
- **Progress Tracking**: Monitor your progress across all modules
- **Personalized Experience**: Settings for theme, font size, and accessibility options
- **Mobile Responsive**: Learn on any device

## Modules

1. **Basic Shapes**: Properties of triangles, quadrilaterals, and circles
2. **Angles**: Types, measurements, and relationships
3. **Parallel and Perpendicular Lines**: Properties and applications
4. **Congruence and Similarity**: Identifying and comparing shapes
5. **Pythagorean Theorem**: Calculating side lengths in right triangles
6. **Area and Perimeter**: Formulas for 2D shapes
7. **Volume and Surface Area**: Calculations for 3D shapes
8. **Transformations**: Translations, rotations, reflections, and dilations

## Technology Stack

- **Next.js 13** with App Router for frontend framework
- **TypeScript** for type-safe code
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **Vercel** for deployment

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/geometry-tutor.git
   cd geometry-tutor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Deployment

The app is deployed on Vercel. See the [deployment guide](DEPLOY.md) for detailed instructions.

## Project Structure

```
geometry-tutor/
├── src/
│   ├── app/              # Next.js 13 App Router
│   │   ├── (auth)/       # Authentication routes
│   │   ├── (dashboard)/  # Main app routes
│   │   └── layout.tsx    # Root layout
│   ├── components/       # UI components
│   ├── lib/              # Utility functions & constants
│   ├── hooks/            # Custom React hooks
│   └── store/            # Zustand state management
├── public/               # Static assets
└── ...                   # Config files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Designed for educational purposes to help 8th-grade students learn geometry
- Built with Next.js, Tailwind CSS, and Framer Motion