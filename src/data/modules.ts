import type { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'mod-001',
    title: 'Introduction to Web Development',
    slug: 'intro-to-web-dev',
    description:
      'Start your coding journey by understanding how websites work and the fundamental technologies behind them.',
    order_index: 1,
    difficulty: 'beginner',
    estimated_duration: 30,
    prerequisites: [],
    category: 'fundamentals',
    icon: 'globe',
    is_free: true,
    content: {
      introduction:
        "Welcome to your coding journey! In this module, we'll explore how the web actually works - from the moment you type a URL to when the page appears on your screen. Understanding these fundamentals will give you a solid foundation for everything that follows.",
      learning_objectives: [
        'Understand how the internet and web browsers work',
        'Learn the difference between frontend and backend development',
        'Identify the core technologies that power websites (HTML, CSS, JavaScript)',
        'Set up your development environment',
      ],
      sections: [
        {
          id: 'sec-001',
          title: 'How the Web Works',
          content:
            "When you visit a website, a fascinating chain of events happens in milliseconds. Your browser sends a request to a server somewhere in the world, that server processes your request and sends back files, and your browser transforms those files into the page you see. Think of it like ordering food: you (the browser) place an order (HTTP request), the kitchen (server) prepares it, and delivers it back to your table (your screen).",
        },
        {
          id: 'sec-002',
          title: 'Frontend vs Backend',
          content:
            "Frontend is everything you can see and interact with - buttons, text, images, animations. It's the 'face' of the application. Backend is the behind-the-scenes logic - user authentication, database operations, business logic. Think of a restaurant: the dining area is the frontend (what customers see), and the kitchen is the backend (where the magic happens).",
        },
        {
          id: 'sec-003',
          title: 'The Core Technologies',
          content:
            "Three languages form the foundation of every website: HTML structures your content (like the skeleton of a body), CSS styles it (like clothing and makeup), and JavaScript adds interactivity (like muscles that enable movement). Every website you've ever visited uses these three technologies.",
          code_example: {
            language: 'html',
            code: `<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 { color: blue; }
    </style>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <script>
      console.log('Welcome!');
    </script>
  </body>
</html>`,
            explanation:
              'This simple example shows all three technologies working together: HTML provides the structure, CSS (in the style tag) adds color, and JavaScript (in the script tag) logs a message.',
          },
        },
      ],
      summary:
        'You now understand the fundamentals: how web requests work, the difference between frontend and backend, and the three core technologies (HTML, CSS, JavaScript) that power every website. These concepts will be the foundation for everything else you learn.',
      next_steps: [
        'Set up your code editor (VS Code recommended)',
        'Create your first HTML file',
        'Practice viewing page source on your favorite websites',
      ],
    },
  },
  {
    id: 'mod-002',
    title: 'HTML Essentials',
    slug: 'html-essentials',
    description:
      'Learn HTML from scratch - the language that structures every webpage on the internet.',
    order_index: 2,
    difficulty: 'beginner',
    estimated_duration: 45,
    prerequisites: ['mod-001'],
    category: 'frontend',
    icon: 'file-code',
    is_free: true,
    content: {
      introduction:
        "HTML (HyperText Markup Language) is the backbone of every webpage. It's not a programming language - it's a markup language that tells browsers what content to display and how to structure it. By the end of this module, you'll be able to create well-structured web pages from scratch.",
      learning_objectives: [
        'Write valid HTML5 documents',
        'Use semantic elements to structure content meaningfully',
        'Create forms for user input',
        'Embed images, links, and media',
        'Understand accessibility basics',
      ],
      sections: [
        {
          id: 'sec-001',
          title: 'HTML Document Structure',
          content:
            "Every HTML document follows a consistent structure. The `<!DOCTYPE html>` declaration tells the browser we're using HTML5. The `<html>` element wraps everything, `<head>` contains metadata (title, styles, scripts), and `<body>` contains the visible content.",
          code_example: {
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>`,
            explanation:
              'This is a complete, valid HTML5 document. The meta viewport tag makes it mobile-friendly, and the charset ensures text displays correctly.',
          },
        },
        {
          id: 'sec-002',
          title: 'Semantic HTML',
          content:
            'Semantic elements describe their meaning to both the browser and developers. Instead of using `<div>` for everything, use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>`. This improves accessibility and SEO.',
          code_example: {
            language: 'html',
            code: `<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</main>
<footer>
  <p>&copy; 2024 My Website</p>
</footer>`,
            explanation:
              'Each element clearly describes its purpose. Screen readers and search engines can understand the page structure much better.',
          },
        },
        {
          id: 'sec-003',
          title: 'Forms and Input',
          content:
            'Forms are how users interact with your website - login forms, search boxes, contact forms. The `<form>` element groups inputs, and various input types handle different data: text, email, password, checkbox, radio, etc.',
          code_example: {
            language: 'html',
            code: `<form action="/submit" method="POST">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>

  <button type="submit">Sign In</button>
</form>`,
            explanation:
              'This form uses proper labels for accessibility, appropriate input types for validation, and the required attribute for basic form validation.',
          },
          mini_challenge: {
            question:
              "What input type would you use for a phone number field that should only accept numbers?",
            expected_answer_keywords: ['tel', 'number'],
            hint: "There's a specific type for telephone numbers, or you could use 'number' with a pattern.",
          },
        },
      ],
      summary:
        "You've learned HTML document structure, semantic elements for meaningful markup, and how to create forms. HTML is your foundation - every website starts here. Practice by recreating simple pages from sites you visit.",
      next_steps: [
        'Recreate your favorite website\'s structure using semantic HTML',
        'Build a contact form with various input types',
        'Learn about HTML accessibility (ARIA labels)',
      ],
    },
  },
  {
    id: 'mod-003',
    title: 'CSS Fundamentals',
    slug: 'css-fundamentals',
    description:
      'Transform plain HTML into beautiful, styled web pages with CSS.',
    order_index: 3,
    difficulty: 'beginner',
    estimated_duration: 60,
    prerequisites: ['mod-002'],
    category: 'frontend',
    icon: 'palette',
    is_free: true,
    content: {
      introduction:
        "CSS (Cascading Style Sheets) is what makes websites beautiful. If HTML is the skeleton, CSS is the skin, clothes, and makeup. You'll learn to control colors, layouts, typography, and create responsive designs that work on any device.",
      learning_objectives: [
        'Understand CSS selectors and specificity',
        'Apply colors, typography, and spacing',
        'Use Flexbox for layouts',
        'Create responsive designs with media queries',
        'Understand the CSS box model',
      ],
      sections: [
        {
          id: 'sec-001',
          title: 'Selectors and Specificity',
          content:
            "CSS selectors target HTML elements to style. You can select by element name, class (.), ID (#), or attributes. Specificity determines which styles win when multiple rules apply: inline styles > IDs > classes > elements.",
          code_example: {
            language: 'css',
            code: `/* Element selector */
p { color: gray; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector (avoid overuse) */
#header { height: 60px; }

/* Combining selectors */
.card .title { font-weight: bold; }`,
            explanation:
              'Classes are the most commonly used selectors because they\'re reusable. IDs should be used sparingly since they have high specificity.',
          },
        },
        {
          id: 'sec-002',
          title: 'The Box Model',
          content:
            "Every element is a box with content, padding (space inside), border, and margin (space outside). Understanding this model is crucial for layouts. Use `box-sizing: border-box` to make sizing more intuitive.",
          code_example: {
            language: 'css',
            code: `* {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 10px;
  /* Total width is exactly 300px thanks to border-box */
}`,
            explanation:
              'With border-box, the width you set includes padding and border. Without it, they would add to the width (300 + 40 + 2 = 342px).',
          },
        },
        {
          id: 'sec-003',
          title: 'Flexbox Layouts',
          content:
            'Flexbox is a powerful layout system for arranging elements in rows or columns. Set `display: flex` on a container, then control alignment, spacing, and wrapping with simple properties.',
          code_example: {
            language: 'css',
            code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card-grid > .card {
  flex: 1 1 300px;
  /* Grow, shrink, base width of 300px */
}`,
            explanation:
              'justify-content controls horizontal alignment, align-items controls vertical. The flex shorthand is powerful for responsive grids.',
          },
          mini_challenge: {
            question:
              'How would you center a single element both horizontally and vertically using Flexbox?',
            expected_answer_keywords: ['justify-content', 'center', 'align-items'],
            hint: 'You need two properties: one for horizontal, one for vertical alignment.',
          },
        },
      ],
      summary:
        "You've learned CSS fundamentals: selectors, the box model, and Flexbox layouts. CSS is vast - you'll keep learning new techniques throughout your career. The key is understanding these core concepts deeply.",
      next_steps: [
        'Practice Flexbox with Flexbox Froggy game',
        'Build a responsive navigation bar',
        'Learn CSS Grid for complex layouts',
      ],
    },
  },
  {
    id: 'mod-004',
    title: 'JavaScript Basics',
    slug: 'javascript-basics',
    description:
      'Add interactivity to your websites with JavaScript - the programming language of the web.',
    order_index: 4,
    difficulty: 'beginner',
    estimated_duration: 90,
    prerequisites: ['mod-003'],
    category: 'frontend',
    icon: 'code',
    is_free: false,
    content: {
      introduction:
        "JavaScript is what makes websites interactive. It's a real programming language - unlike HTML and CSS which are markup and styling languages. You'll learn to manipulate web pages, handle user events, and write logic that responds to actions.",
      learning_objectives: [
        'Understand variables, data types, and operators',
        'Write functions and understand scope',
        'Work with arrays and objects',
        'Handle events and manipulate the DOM',
        'Use modern ES6+ syntax',
      ],
      sections: [
        {
          id: 'sec-001',
          title: 'Variables and Data Types',
          content:
            "Variables store data. Use `const` for values that won't change, `let` for values that will. JavaScript has primitive types (string, number, boolean, null, undefined) and reference types (objects, arrays, functions).",
          code_example: {
            language: 'javascript',
            code: `// Constants (can't be reassigned)
const PI = 3.14159;
const APP_NAME = 'My App';

// Variables (can be reassigned)
let count = 0;
let isLoggedIn = false;

// Data types
const name = 'Alice';        // string
const age = 25;              // number
const isAdmin = true;        // boolean
const items = ['a', 'b'];    // array
const user = { name, age };  // object`,
            explanation:
              "Always prefer const unless you need to reassign. This makes your code more predictable. Notice how the object uses shorthand when property names match variable names.",
          },
        },
        {
          id: 'sec-002',
          title: 'Functions',
          content:
            'Functions are reusable blocks of code. Modern JavaScript uses arrow functions for cleaner syntax. Functions can take parameters, return values, and be passed around like any other value.',
          code_example: {
            language: 'javascript',
            code: `// Arrow function (modern)
const add = (a, b) => a + b;

// With function body
const greet = (name) => {
  const message = \`Hello, \${name}!\`;
  return message;
};

// Array methods use functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]`,
            explanation:
              "Arrow functions are concise. Single expressions can skip braces and return. Template literals (backticks) allow embedded variables.",
          },
        },
        {
          id: 'sec-003',
          title: 'DOM Manipulation',
          content:
            'The DOM (Document Object Model) is how JavaScript interacts with HTML. You can select elements, change their content, styles, and attributes, and respond to user events.',
          code_example: {
            language: 'javascript',
            code: `// Select elements
const button = document.querySelector('#submit-btn');
const input = document.querySelector('#email-input');
const form = document.querySelector('form');

// Add event listener
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Stop page refresh
  const email = input.value;
  console.log('Submitted:', email);
});

// Change content
const title = document.querySelector('h1');
title.textContent = 'New Title';
title.style.color = 'blue';`,
            explanation:
              'querySelector is powerful - use any CSS selector. Always prevent default on forms to handle submission with JavaScript.',
          },
          mini_challenge: {
            question:
              'How would you add a class "active" to an element when it\'s clicked?',
            expected_answer_keywords: ['addEventListener', 'classList', 'add'],
            hint: 'You need an event listener and the classList property.',
          },
        },
      ],
      summary:
        "You've learned JavaScript fundamentals: variables, functions, and DOM manipulation. JavaScript is deep - there's always more to learn. Focus on practicing these basics until they're second nature.",
      next_steps: [
        'Build an interactive to-do list',
        'Learn about async JavaScript (promises, async/await)',
        'Explore browser developer tools for debugging',
      ],
    },
  },
  {
    id: 'mod-005',
    title: 'Introduction to React',
    slug: 'intro-to-react',
    description:
      'Build modern user interfaces with React, the most popular JavaScript framework.',
    order_index: 5,
    difficulty: 'intermediate',
    estimated_duration: 120,
    prerequisites: ['mod-004'],
    category: 'frontend',
    icon: 'component',
    is_free: false,
    content: {
      introduction:
        "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state. Instead of manipulating the DOM directly, you describe what you want, and React handles the updates efficiently.",
      learning_objectives: [
        'Understand component-based architecture',
        'Create functional components with JSX',
        'Manage state with useState hook',
        'Handle side effects with useEffect',
        'Pass data with props',
      ],
      sections: [
        {
          id: 'sec-001',
          title: 'Components and JSX',
          content:
            "React apps are built from components - reusable pieces of UI. Components are JavaScript functions that return JSX, which looks like HTML but lets you embed JavaScript expressions in curly braces.",
          code_example: {
            language: 'jsx',
            code: `// A simple component
function Greeting({ name }) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

// Using the component
function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}`,
            explanation:
              "Components are functions that return JSX. Props (like 'name') let you pass data in. Notice className instead of class - that's a JSX thing.",
          },
        },
        {
          id: 'sec-002',
          title: 'State with useState',
          content:
            "State is data that changes over time. When state changes, React re-renders the component. The useState hook lets you add state to functional components.",
          code_example: {
            language: 'jsx',
            code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
            explanation:
              'useState returns [currentValue, setterFunction]. Never modify state directly - always use the setter. This ensures React knows to re-render.',
          },
        },
        {
          id: 'sec-003',
          title: 'Effects with useEffect',
          content:
            'useEffect handles side effects - things that happen outside the render cycle, like API calls, subscriptions, or document changes. It runs after render and can clean up when the component unmounts.',
          code_example: {
            language: 'jsx',
            code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs when userId changes
    setLoading(true);

    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Dependency array

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return <h1>{user.name}</h1>;
}`,
            explanation:
              'The dependency array [userId] means "re-run this effect when userId changes." Empty array [] means "run once on mount." No array means "run after every render."',
          },
          mini_challenge: {
            question:
              'What would happen if you called setCount inside the component body (outside useEffect) without any conditions?',
            expected_answer_keywords: ['infinite', 'loop', 're-render'],
            hint: 'Think about what happens when state changes and what triggers another state change...',
          },
        },
      ],
      summary:
        "You've learned React fundamentals: components, props, state, and effects. React's component model is powerful - you can build complex UIs from simple, reusable pieces. Practice by building small apps and combining these concepts.",
      next_steps: [
        'Build a weather app that fetches data from an API',
        'Learn about React context for global state',
        'Explore React Router for multi-page apps',
      ],
    },
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getNextModule(currentId: string): Module | undefined {
  const currentModule = modules.find((m) => m.id === currentId);
  if (!currentModule) return undefined;
  return modules.find((m) => m.order_index === currentModule.order_index + 1);
}

export function getModulesByCategory(category: string): Module[] {
  return modules.filter((m) => m.category === category);
}
