// src/lib/constants.ts
import { Module } from './types';

export const MODULES: Module[] = [
  {
    id: 'basic-shapes',
    title: 'Basic Shapes',
    description: 'Properties of triangles, quadrilaterals, and circles',
    order: 1,
    sections: {
      lesson: {
        title: 'Introduction to Basic Shapes',
        description: 'Learn about the properties of fundamental geometric shapes',
        content: '# Basic Shapes\n\nIn this lesson, we will learn about basic geometric shapes including triangles, quadrilaterals, and circles.\n\n## Triangles\nA triangle is a polygon with three edges and three vertices. Triangles can be classified by their sides:\n- Equilateral: All sides are equal\n- Isosceles: Two sides are equal\n- Scalene: No sides are equal\n\nOr by their angles:\n- Acute: All angles are less than 90°\n- Right: One angle is exactly 90°\n- Obtuse: One angle is greater than 90°\n\n## Quadrilaterals\nA quadrilateral is a polygon with four edges and four vertices. Types include:\n- Square: All sides equal and all angles 90°\n- Rectangle: Opposite sides equal and all angles 90°\n- Rhombus: All sides equal\n- Parallelogram: Opposite sides are parallel\n- Trapezoid: Exactly one pair of opposite sides are parallel\n\n## Circles\nA circle is the set of all points in a plane that are at a fixed distance (radius) from a fixed point (center).\n- Radius: Distance from center to any point on the circle\n- Diameter: Distance across the circle through the center\n- Circumference: Distance around the circle',
        images: ['/images/basic-shapes.png']
      },
      demonstration: {
        title: 'Explore Basic Shapes',
        description: 'Interact with different shapes to understand their properties',
        type: 'interactive',
        interactiveProps: {
          shapes: ['triangle', 'square', 'rectangle', 'circle']
        }
      },
      quiz: {
        title: 'Basic Shapes Quiz',
        description: 'Test your knowledge of basic shapes',
        questions: [
          {
            id: 'bs-q1',
            type: 'multiple-choice',
            text: 'How many sides does a quadrilateral have?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '4',
            explanation: 'Quadrilaterals, by definition, have exactly 4 sides.',
            difficulty: 'easy'
          },
          {
            id: 'bs-q2',
            type: 'multiple-choice',
            text: 'Which of the following is NOT a type of triangle classified by its sides?',
            options: ['Equilateral', 'Isosceles', 'Scalene', 'Obtuse'],
            correctAnswer: 'Obtuse',
            explanation: 'Obtuse is a classification of triangles by angles (having one angle > 90°), not by sides.',
            difficulty: 'medium'
          },
          {
            id: 'bs-q3',
            type: 'true-false',
            text: 'A square is also a rectangle.',
            correctAnswer: true,
            explanation: 'A square is a special case of a rectangle where all sides are equal.',
            difficulty: 'medium'
          }
        ]
      },
      review: {
        title: 'Basic Shapes Review',
        description: 'Reinforce your understanding of basic shapes',
        questions: [
          {
            id: 'bs-r1',
            type: 'multiple-choice',
            text: 'What is the relationship between a square and a rhombus?',
            options: [
              'A square is always a rhombus, but a rhombus is not always a square',
              'A rhombus is always a square, but a square is not always a rhombus',
              'A square and a rhombus are different shapes with no relationship',
              'A square and a rhombus are the same shape'
            ],
            correctAnswer: 'A square is always a rhombus, but a rhombus is not always a square',
            explanation: 'A square has all sides equal (like a rhombus) and all angles equal to 90° (unlike a general rhombus).',
            difficulty: 'hard'
          },
          {
            id: 'bs-r2',
            type: 'fill-in-blank',
            text: 'The distance around a circle is called the ____.',
            correctAnswer: 'circumference',
            explanation: 'The circumference is the distance around a circle.',
            difficulty: 'easy'
          }
        ],
        reviewInterval: 3 // Review after 3 days
      }
    }
  },
  {
    id: 'angles',
    title: 'Angles',
    description: 'Types, measurements, and relationships',
    order: 2,
    sections: {
      lesson: {
        title: 'Understanding Angles',
        description: 'Learn about different types of angles and how to measure them',
        content: '# Angles\n\nAn angle is formed when two rays share a common endpoint (vertex). Angles are measured in degrees.\n\n## Types of Angles\n- Acute angle: Less than 90° (e.g., 45°)\n- Right angle: Exactly 90°\n- Obtuse angle: Between 90° and 180° (e.g., 120°)\n- Straight angle: Exactly 180°\n- Reflex angle: Between 180° and 360° (e.g., 270°)\n\n## Angle Relationships\n- Complementary angles: Two angles that sum to 90°\n- Supplementary angles: Two angles that sum to 180°\n- Vertical angles: Opposite angles formed by intersecting lines (always equal)\n- Alternate angles: Equal angles on opposite sides of a transversal crossing parallel lines\n- Corresponding angles: Equal angles in corresponding positions when a transversal crosses parallel lines',
        images: ['/images/angles.png']
      },
      demonstration: {
        title: 'Angle Explorer',
        description: 'Adjust angles to see different types and relationships',
        type: 'interactive',
        interactiveProps: {
          initialAngle: 45
        }
      },
      quiz: {
        title: 'Angles Quiz',
        description: 'Test your understanding of angles',
        questions: [
          {
            id: 'ang-q1',
            type: 'multiple-choice',
            text: 'What type of angle is 135°?',
            options: ['Acute', 'Right', 'Obtuse', 'Straight'],
            correctAnswer: 'Obtuse',
            explanation: 'An obtuse angle is between 90° and 180°. 135° falls in this range.',
            difficulty: 'easy'
          },
          {
            id: 'ang-q2',
            type: 'true-false',
            text: 'Complementary angles sum to 180°.',
            correctAnswer: false,
            explanation: 'Complementary angles sum to 90°. Supplementary angles sum to 180°.',
            difficulty: 'medium'
          }
        ]
      },
      review: {
        title: 'Angles Review',
        description: 'Reinforce your understanding of angles',
        questions: [
          {
            id: 'ang-r1',
            type: 'fill-in-blank',
            text: 'If two angles are complementary, they sum to ____ degrees.',
            correctAnswer: '90',
            explanation: 'Complementary angles sum to 90 degrees.',
            difficulty: 'easy'
          }
        ],
        reviewInterval: 3
      }
    }
  },
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem',
    description: 'Calculating side lengths in right triangles',
    order: 5,
    sections: {
      lesson: {
        title: 'The Pythagorean Theorem',
        description: 'Learn how to calculate side lengths in right triangles',
        content: '# Pythagorean Theorem\n\nThe Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².\n\n## Understanding the Formula\nIn a right triangle:\n- a and b are the lengths of the legs (the sides that form the right angle)\n- c is the length of the hypotenuse (the side opposite the right angle)\n\nThe formula states: a² + b² = c²\n\n## Using the Theorem\nYou can use the Pythagorean theorem to:\n1. Find the hypotenuse when you know the two legs: c = √(a² + b²)\n2. Find a leg when you know the hypotenuse and the other leg: a = √(c² - b²)\n\n## Example\nIf a = 3 and b = 4, then:\nc² = 3² + 4²\nc² = 9 + 16\nc² = 25\nc = √25 = 5\n\nThis creates a 3-4-5 right triangle, which is one of the common Pythagorean triples.',
        videoUrl: '/videos/pythagorean-theorem.mp4',
        images: ['/images/pythagorean-theorem.png']
      },
      demonstration: {
        title: 'Pythagorean Theorem Explorer',
        description: 'Adjust the sides of a right triangle to see the Pythagorean Theorem in action',
        type: 'interactive',
        interactiveProps: {
          initialValues: { a: 3, b: 4 }
        }
      },
      quiz: {
        title: 'Pythagorean Theorem Quiz',
        description: 'Test your understanding of the Pythagorean Theorem',
        questions: [
          {
            id: 'pt-q1',
            type: 'fill-in-blank',
            text: 'If a = 5 and b = 12, what is c?',
            correctAnswer: '13',
            explanation: 'Using the Pythagorean Theorem: c² = a² + b² = 5² + 12² = 25 + 144 = 169, so c = √169 = 13',
            difficulty: 'medium'
          },
          {
            id: 'pt-q2',
            type: 'true-false',
            text: 'The Pythagorean theorem works for all triangles.',
            correctAnswer: false,
            explanation: 'The Pythagorean theorem only works for right triangles (triangles with a 90° angle).',
            difficulty: 'easy'
          },
          {
            id: 'pt-q3',
            type: 'multiple-choice',
            text: 'Which of these is a Pythagorean triple?',
            options: ['3-4-5', '2-3-4', '5-6-7', '4-7-8'],
            correctAnswer: '3-4-5',
            explanation: '3-4-5 is a Pythagorean triple because 3² + 4² = 9 + 16 = 25 = 5²',
            difficulty: 'medium'
          }
        ]
      },
      review: {
        title: 'Pythagorean Theorem Review',
        description: 'Reinforce your understanding of the Pythagorean Theorem',
        questions: [
          {
            id: 'pt-r1',
            type: 'fill-in-blank',
            text: 'If c = 10 and a = 6, find b.',
            correctAnswer: '8',
            explanation: 'Using the Pythagorean Theorem: a² + b² = c², so 6² + b² = 10², 36 + b² = 100, b² = 64, b = 8',
            difficulty: 'medium'
          },
          {
            id: 'pt-r2',
            type: 'multiple-choice',
            text: 'What is the formula for finding a leg of a right triangle if you know the hypotenuse (c) and the other leg (b)?',
            options: ['a = c + b', 'a = c - b', 'a = √(c² + b²)', 'a = √(c² - b²)'],
            correctAnswer: 'a = √(c² - b²)',
            explanation: 'From the Pythagorean theorem: a² + b² = c². Solving for a: a² = c² - b², so a = √(c² - b²)',
            difficulty: 'hard'
          }
        ],
        reviewInterval: 3 // Review after 3 days
      }
    }
  },
  {
    id: 'area-perimeter',
    title: 'Area and Perimeter',
    description: 'Formulas for 2D shapes',
    order: 6,
    sections: {
      lesson: {
        title: 'Area and Perimeter of 2D Shapes',
        description: 'Learn how to calculate the area and perimeter of different shapes',
        content: '# Area and Perimeter\n\nArea is the amount of space inside a 2D shape, measured in square units (like cm², m², etc.). Perimeter is the distance around a shape, measured in linear units (like cm, m, etc.).\n\n## Rectangle\n- Area = length × width\n- Perimeter = 2 × (length + width)\n\n## Square\n- Area = side² (side × side)\n- Perimeter = 4 × side\n\n## Triangle\n- Area = ½ × base × height\n- Perimeter = side1 + side2 + side3\n\n## Circle\n- Area = π × radius²\n- Circumference (perimeter) = 2 × π × radius\n\n## Parallelogram\n- Area = base × height\n- Perimeter = 2 × (base + side)\n\n## Trapezoid\n- Area = ½ × (base1 + base2) × height\n- Perimeter = base1 + base2 + side1 + side2',
        images: ['/images/area-perimeter.png']
      },
      demonstration: {
        title: 'Area and Perimeter Calculator',
        description: 'Adjust dimensions to see how area and perimeter change',
        type: 'interactive',
        interactiveProps: {
          shapes: ['rectangle', 'triangle', 'circle']
        }
      },
      quiz: {
        title: 'Area and Perimeter Quiz',
        description: 'Test your knowledge of area and perimeter formulas',
        questions: [
          {
            id: 'ap-q1',
            type: 'fill-in-blank',
            text: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
            correctAnswer: '40',
            explanation: 'Area = length × width = 8 × 5 = 40 cm²',
            difficulty: 'easy'
          },
          {
            id: 'ap-q2',
            type: 'multiple-choice',
            text: 'What is the perimeter of a square with a side length of 6 m?',
            options: ['12 m', '18 m', '24 m', '36 m'],
            correctAnswer: '24 m',
            explanation: 'Perimeter = 4 × side = 4 × 6 = 24 m',
            difficulty: 'easy'
          }
        ]
      },
      review: {
        title: 'Area and Perimeter Review',
        description: 'Reinforce your understanding of area and perimeter',
        questions: [
          {
            id: 'ap-r1',
            type: 'fill-in-blank',
            text: 'The area of a circle with radius 4 cm is ___ π cm². (Enter the number multiplying π)',
            correctAnswer: '16',
            explanation: 'Area = π × radius² = π × 4² = 16π cm²',
            difficulty: 'medium'
          }
        ],
        reviewInterval: 3
      }
    }
  },
  {
    id: 'transformations',
    title: 'Transformations',
    description: 'Translations, rotations, reflections, and dilations',
    order: 8,
    sections: {
      lesson: {
        title: 'Geometric Transformations',
        description: 'Learn about different ways to transform shapes in a coordinate plane',
        content: '# Geometric Transformations\n\nGeometric transformations are operations that change the position, size, or orientation of a shape. The four main types are:\n\n## Translation (Slide)\nMoving a shape from one location to another without changing its size, shape, or orientation. A translation is specified by how far to move horizontally and vertically.\n\n## Rotation (Turn)\nTurning a shape around a fixed point (the center of rotation). A rotation is specified by an angle and direction (clockwise or counterclockwise).\n\n## Reflection (Flip)\nCreating a mirror image of a shape across a line (the line of reflection).\n\n## Dilation (Resize)\nMaking a shape larger or smaller by a scale factor from a center point. The shape remains similar to the original.',
        images: ['/images/transformations.png']
      },
      demonstration: {
        title: 'Transformation Explorer',
        description: 'Apply different transformations to shapes on a coordinate grid',
        type: 'interactive',
        interactiveProps: {
          transformations: ['translation', 'rotation', 'reflection', 'dilation']
        }
      },
      quiz: {
        title: 'Transformations Quiz',
        description: 'Test your understanding of geometric transformations',
        questions: [
          {
            id: 'tr-q1',
            type: 'multiple-choice',
            text: 'Which transformation moves a shape to a new location without changing its size or orientation?',
            options: ['Translation', 'Rotation', 'Reflection', 'Dilation'],
            correctAnswer: 'Translation',
            explanation: 'A translation (slide) moves a shape to a new position without changing its size, shape, or orientation.',
            difficulty: 'easy'
          },
          {
            id: 'tr-q2',
            type: 'true-false',
            text: 'A dilation always changes the size of a shape.',
            correctAnswer: true,
            explanation: 'A dilation changes the size of a shape by a scale factor. The shape gets larger if the scale factor is greater than 1 and smaller if the scale factor is between 0 and 1.',
            difficulty: 'medium'
          }
        ]
      },
      review: {
        title: 'Transformations Review',
        description: 'Reinforce your understanding of geometric transformations',
        questions: [
          {
            id: 'tr-r1',
            type: 'multiple-choice',
            text: 'If you reflect a shape across the y-axis, what happens to the x-coordinates of all points?',
            options: [
              'They remain the same',
              'They change sign (positive becomes negative and vice versa)',
              'They all become zero',
              'They all double in value'
            ],
            correctAnswer: 'They change sign (positive becomes negative and vice versa)',
            explanation: 'When reflecting across the y-axis, the x-coordinate of each point changes from x to -x, while the y-coordinate stays the same.',
            difficulty: 'hard'
          }
        ],
        reviewInterval: 3
      }
    }
  }
];

// Get all modules in order
export const getOrderedModules = () => {
  return [...MODULES].sort((a, b) => a.order - b.order);
};

// Get a specific module by ID
export const getModuleById = (id: string) => {
  return MODULES.find(module => module.id === id);
};