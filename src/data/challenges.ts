import type { Challenge } from '@/types';

export const challenges: Challenge[] = [
  // HTML Challenges
  {
    id: 'chal-001',
    module_id: 'mod-002',
    title: 'Fix the Broken HTML',
    slug: 'fix-broken-html',
    description:
      'This HTML document has several errors preventing it from displaying correctly. Find and fix all the issues.',
    difficulty: 'beginner',
    type: 'fix_bug',
    estimated_time: 10,
    order_index: 1,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <title>My Page
</head>
<body>
  <h1>Welcome to My Website<h1>
  <p>This is a paragraph about my site.
  <img src="photo.jpg">
  <a href="https://example.com">Click here<a>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This is a paragraph about my site.</p>
  <img src="photo.jpg" alt="Photo description">
  <a href="https://example.com">Click here</a>
</body>
</html>`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'Title tag is properly closed',
        expected_output: 'title tag has closing tag',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'H1 tag is properly closed with </h1>',
        expected_output: 'h1 has proper closing tag',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Paragraph tag is properly closed',
        expected_output: 'p tag has closing tag',
        is_hidden: false,
      },
      {
        id: 'tc-004',
        description: 'Image has alt attribute for accessibility',
        expected_output: 'img has alt attribute',
        is_hidden: false,
      },
      {
        id: 'tc-005',
        description: 'Anchor tag is properly closed',
        expected_output: 'a tag has proper closing tag',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'Look carefully at each closing tag. Are they all written correctly?',
      },
      {
        level: 2,
        text: 'HTML closing tags use a forward slash: </tagname>. Also, images should have alt text for accessibility.',
      },
      {
        level: 3,
        text: 'The issues are: title needs </title>, h1 closing should be </h1> not <h1>, p needs </p>, img needs alt attribute, a closing should be </a>.',
      },
    ],
    learning_goals: [
      'Recognize and fix common HTML syntax errors',
      'Understand the importance of properly closing tags',
      'Learn about accessibility attributes like alt',
    ],
  },
  {
    id: 'chal-002',
    module_id: 'mod-002',
    title: 'Build a Contact Form',
    slug: 'build-contact-form',
    description:
      'Create a contact form with fields for name, email, message, and a submit button. Use proper semantic HTML and accessibility attributes.',
    difficulty: 'beginner',
    type: 'build_feature',
    estimated_time: 15,
    order_index: 2,
    starter_code: `<!-- Build a contact form with:
     - Name field (text input)
     - Email field (email input)
     - Message field (textarea)
     - Submit button
     Include labels for accessibility! -->

<form>
  <!-- Your code here -->
</form>`,
    solution_code: `<form action="/submit" method="POST">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

  <button type="submit">Send Message</button>
</form>`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'Form contains a text input for name',
        expected_output: 'has input type text',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'Form contains an email input',
        expected_output: 'has input type email',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Form contains a textarea for message',
        expected_output: 'has textarea element',
        is_hidden: false,
      },
      {
        id: 'tc-004',
        description: 'All inputs have associated labels',
        expected_output: 'labels properly associated',
        is_hidden: false,
      },
      {
        id: 'tc-005',
        description: 'Form has a submit button',
        expected_output: 'has submit button',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'Remember to use the correct input types: "text" for name, "email" for email, and a textarea for the message.',
      },
      {
        level: 2,
        text: 'Labels should use the "for" attribute that matches the input\'s "id" attribute. This makes the form accessible.',
      },
      {
        level: 3,
        text: 'Structure each field in a div with label + input. Use <textarea> for multi-line input. The button should have type="submit".',
      },
    ],
    learning_goals: [
      'Build accessible forms with proper labels',
      'Use appropriate input types for different data',
      'Understand form structure and submission',
    ],
  },
  // CSS Challenges
  {
    id: 'chal-003',
    module_id: 'mod-003',
    title: 'Center a Div',
    slug: 'center-a-div',
    description:
      'The classic challenge! Center the box both horizontally and vertically in the container using Flexbox.',
    difficulty: 'beginner',
    type: 'build_feature',
    estimated_time: 10,
    order_index: 1,
    starter_code: `<style>
  .container {
    height: 300px;
    border: 2px dashed #ccc;
    /* Add your Flexbox styles here */
  }

  .box {
    width: 100px;
    height: 100px;
    background: #6366f1;
    border-radius: 8px;
  }
</style>

<div class="container">
  <div class="box"></div>
</div>`,
    solution_code: `<style>
  .container {
    height: 300px;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    width: 100px;
    height: 100px;
    background: #6366f1;
    border-radius: 8px;
  }
</style>

<div class="container">
  <div class="box"></div>
</div>`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'Container uses display: flex',
        expected_output: 'display flex is set',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'Box is horizontally centered',
        expected_output: 'justify-content center',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Box is vertically centered',
        expected_output: 'align-items center',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'To use Flexbox, start by setting display: flex on the container.',
      },
      {
        level: 2,
        text: 'Flexbox has two alignment properties: one for the main axis (horizontal by default) and one for the cross axis (vertical).',
      },
      {
        level: 3,
        text: 'Use justify-content: center for horizontal and align-items: center for vertical centering.',
      },
    ],
    learning_goals: [
      'Use Flexbox for centering elements',
      'Understand justify-content and align-items',
      'Master the most common CSS layout task',
    ],
  },
  {
    id: 'chal-004',
    module_id: 'mod-003',
    title: 'Build a Card Component',
    slug: 'build-card-component',
    description:
      'Create a styled card component with an image, title, description, and a button. Apply the box model, typography, and hover effects.',
    difficulty: 'intermediate',
    type: 'build_feature',
    estimated_time: 20,
    order_index: 2,
    starter_code: `<style>
  .card {
    /* Add your styles here */
  }

  .card img {
    /* Image styles */
  }

  .card-content {
    /* Content area styles */
  }

  .card h3 {
    /* Title styles */
  }

  .card p {
    /* Description styles */
  }

  .card button {
    /* Button styles */
  }
</style>

<div class="card">
  <img src="https://picsum.photos/300/200" alt="Card image">
  <div class="card-content">
    <h3>Card Title</h3>
    <p>This is a description of the card content that explains what this card is about.</p>
    <button>Learn More</button>
  </div>
</div>`,
    solution_code: `<style>
  .card {
    width: 300px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: white;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;
  }

  .card h3 {
    margin: 0 0 12px 0;
    font-size: 1.25rem;
    color: #111;
  }

  .card p {
    margin: 0 0 16px 0;
    color: #666;
    line-height: 1.5;
  }

  .card button {
    width: 100%;
    padding: 12px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
  }

  .card button:hover {
    background: #4f46e5;
  }
</style>

<div class="card">
  <img src="https://picsum.photos/300/200" alt="Card image">
  <div class="card-content">
    <h3>Card Title</h3>
    <p>This is a description of the card content that explains what this card is about.</p>
    <button>Learn More</button>
  </div>
</div>`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'Card has border-radius for rounded corners',
        expected_output: 'border-radius applied',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'Card has box-shadow for depth',
        expected_output: 'box-shadow applied',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Image covers the card width',
        expected_output: 'image width 100%',
        is_hidden: false,
      },
      {
        id: 'tc-004',
        description: 'Content has proper padding',
        expected_output: 'padding applied',
        is_hidden: false,
      },
      {
        id: 'tc-005',
        description: 'Button has hover effect',
        expected_output: 'button hover styles',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'Start with the card container: set a width, border-radius for rounded corners, and overflow: hidden to clip the image corners.',
      },
      {
        level: 2,
        text: 'For the image, use width: 100% to fill the card and object-fit: cover to maintain aspect ratio. Add padding to the content area.',
      },
      {
        level: 3,
        text: 'Add box-shadow for depth, transitions for smooth hover effects, and use :hover pseudo-class for interactive states.',
      },
    ],
    learning_goals: [
      'Apply the CSS box model in practice',
      'Create hover effects with transitions',
      'Build reusable UI components',
    ],
  },
  // JavaScript Challenges
  {
    id: 'chal-005',
    module_id: 'mod-004',
    title: 'Fix the Counter Bug',
    slug: 'fix-counter-bug',
    description:
      'This counter should increment when clicking + and decrement when clicking -, but nothing happens. Debug and fix the code.',
    difficulty: 'beginner',
    type: 'debug',
    estimated_time: 10,
    order_index: 1,
    starter_code: `<div id="counter">
  <button id="decrement">-</button>
  <span id="count">0</span>
  <button id="increment">+</button>
</div>

<script>
let count = 0;
const countDisplay = document.querySelector('#count');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');

incrementBtn.onClick = function() {
  count = count + 1;
  countDisplay.innerHtml = count;
};

decrementBtn.onClick = function() {
  count = count - 1;
  countDisplay.innerHtml = count;
};
</script>`,
    solution_code: `<div id="counter">
  <button id="decrement">-</button>
  <span id="count">0</span>
  <button id="increment">+</button>
</div>

<script>
let count = 0;
const countDisplay = document.querySelector('#count');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');

incrementBtn.onclick = function() {
  count = count + 1;
  countDisplay.innerHTML = count;
};

decrementBtn.onclick = function() {
  count = count - 1;
  countDisplay.innerHTML = count;
};
</script>`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'onclick property is lowercase',
        expected_output: 'onclick not onClick',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'innerHTML property is correct case',
        expected_output: 'innerHTML not innerHtml',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Clicking + increments the count',
        expected_output: 'increment works',
        is_hidden: false,
      },
      {
        id: 'tc-004',
        description: 'Clicking - decrements the count',
        expected_output: 'decrement works',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'JavaScript is case-sensitive. Check if the property names are written correctly.',
      },
      {
        level: 2,
        text: 'DOM properties like onclick and innerHTML have specific casing. onclick is all lowercase, and innerHTML has a capital H.',
      },
      {
        level: 3,
        text: 'Change onClick to onclick (lowercase) and innerHtml to innerHTML (capital H and capital L).',
      },
    ],
    learning_goals: [
      'Debug JavaScript case-sensitivity issues',
      'Understand DOM property naming conventions',
      'Practice reading error messages',
    ],
  },
  {
    id: 'chal-006',
    module_id: 'mod-004',
    title: 'Build a Todo List',
    slug: 'build-todo-list',
    description:
      'Create a simple todo list where users can add items and mark them as complete. Use JavaScript to manage the list.',
    difficulty: 'intermediate',
    type: 'build_feature',
    estimated_time: 25,
    order_index: 2,
    starter_code: `<div id="todo-app">
  <h2>My Todos</h2>
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="Add a new todo...">
    <button type="submit">Add</button>
  </form>
  <ul id="todo-list">
    <!-- Todos will be added here -->
  </ul>
</div>

<script>
// Your JavaScript code here
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

// Handle form submission
// Add the todo to the list
// Allow clicking to toggle completion

</script>`,
    solution_code: `<div id="todo-app">
  <h2>My Todos</h2>
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="Add a new todo...">
    <button type="submit">Add</button>
  </form>
  <ul id="todo-list">
    <!-- Todos will be added here -->
  </ul>
</div>

<script>
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;
  li.style.cursor = 'pointer';

  li.addEventListener('click', function() {
    li.style.textDecoration =
      li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
  });

  list.appendChild(li);
  input.value = '';
  input.focus();
});
</script>`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'Form submission adds a new todo to the list',
        expected_output: 'todo added to list',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'Input is cleared after adding todo',
        expected_output: 'input cleared',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Clicking a todo toggles completion style',
        expected_output: 'toggle works',
        is_hidden: false,
      },
      {
        id: 'tc-004',
        description: 'Empty todos are not added',
        expected_output: 'validation works',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'Use addEventListener on the form to catch the submit event. Remember to call preventDefault() to stop the page from refreshing.',
      },
      {
        level: 2,
        text: 'Create new list items with document.createElement(\'li\'), set their text content, and append them to the list with appendChild().',
      },
      {
        level: 3,
        text: 'For the toggle, add a click listener to each li that changes its textDecoration style between \'none\' and \'line-through\'.',
      },
    ],
    learning_goals: [
      'Handle form submissions in JavaScript',
      'Create and append DOM elements dynamically',
      'Implement toggle functionality with event listeners',
    ],
  },
  // React Challenges
  {
    id: 'chal-007',
    module_id: 'mod-005',
    title: 'Fix the useState Bug',
    slug: 'fix-usestate-bug',
    description:
      'This React counter component should work, but clicking the button does nothing. Find and fix the bug.',
    difficulty: 'beginner',
    type: 'fix_bug',
    estimated_time: 10,
    order_index: 1,
    starter_code: `import { useState } from 'react';

function Counter() {
  let count = 0;

  const increment = () => {
    count = count + 1;
    console.log('Count:', count);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}`,
    solution_code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'Uses useState hook instead of regular variable',
        expected_output: 'useState is used',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'Uses state setter function to update count',
        expected_output: 'setCount is called',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Counter increments when button is clicked',
        expected_output: 'counter works',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'In React, regular variables don\'t cause re-renders when they change. You need something special to track state.',
      },
      {
        level: 2,
        text: 'The useState hook returns an array with two elements: the current value and a function to update it.',
      },
      {
        level: 3,
        text: 'Change "let count = 0" to "const [count, setCount] = useState(0)" and use "setCount(count + 1)" in the increment function.',
      },
    ],
    learning_goals: [
      'Understand why regular variables don\'t trigger re-renders',
      'Use useState correctly for component state',
      'Call the state setter function to update state',
    ],
  },
  {
    id: 'chal-008',
    module_id: 'mod-005',
    title: 'Build a Theme Toggler',
    slug: 'build-theme-toggler',
    description:
      'Create a React component that toggles between light and dark themes. The theme should affect the background and text colors.',
    difficulty: 'intermediate',
    type: 'build_feature',
    estimated_time: 15,
    order_index: 2,
    starter_code: `import { useState } from 'react';

function ThemeToggler() {
  // Add state for theme (light/dark)

  // Define styles for each theme

  return (
    <div>
      {/* Apply theme styles to this container */}
      <h1>Theme Toggler</h1>
      <p>Current theme: {/* show current theme */}</p>
      <button>
        Toggle Theme
      </button>
    </div>
  );
}`,
    solution_code: `import { useState } from 'react';

function ThemeToggler() {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
    color: isDark ? '#ffffff' : '#1a1a2e',
    padding: '40px',
    minHeight: '200px',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={theme}>
      <h1>Theme Toggler</h1>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </button>
    </div>
  );
}`,
    test_cases: [
      {
        id: 'tc-001',
        description: 'Uses useState to track theme state',
        expected_output: 'useState is used',
        is_hidden: false,
      },
      {
        id: 'tc-002',
        description: 'Clicking button toggles the theme',
        expected_output: 'theme toggles',
        is_hidden: false,
      },
      {
        id: 'tc-003',
        description: 'Background color changes between themes',
        expected_output: 'background changes',
        is_hidden: false,
      },
      {
        id: 'tc-004',
        description: 'Text color changes between themes',
        expected_output: 'text color changes',
        is_hidden: false,
      },
    ],
    hints: [
      {
        level: 1,
        text: 'Use a boolean state like isDark to track whether dark mode is active. Toggle it with setIsDark(!isDark).',
      },
      {
        level: 2,
        text: 'Create a style object that uses the isDark state to conditionally set backgroundColor and color properties.',
      },
      {
        level: 3,
        text: 'Apply the style object to the container div using the style attribute. Use ternary operators: isDark ? darkValue : lightValue.',
      },
    ],
    learning_goals: [
      'Use boolean state for toggles',
      'Apply conditional styling in React',
      'Understand how state changes trigger re-renders',
    ],
  },
];

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug);
}

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}

export function getChallengesByModule(moduleId: string): Challenge[] {
  return challenges
    .filter((c) => c.module_id === moduleId)
    .sort((a, b) => a.order_index - b.order_index);
}

export function getNextChallenge(currentId: string): Challenge | undefined {
  const current = challenges.find((c) => c.id === currentId);
  if (!current) return undefined;

  const moduleChallenges = getChallengesByModule(current.module_id);
  const currentIndex = moduleChallenges.findIndex((c) => c.id === currentId);

  return moduleChallenges[currentIndex + 1];
}
