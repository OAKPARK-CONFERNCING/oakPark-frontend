Of course! Here is comprehensive documentation on how to integrate and use a sandbox IDE in a React + TypeScript application, specifically designed to be used as a follow-along guide for a live session on a video conferencing platform.

This guide will use **`@codesandbox/sandpack`**, the library that powers CodeSandbox, as it's incredibly powerful, easy to set up, and provides a fantastic out-of-the-box IDE experience.

---

# Live Coding in Your App: Integrating a Sandbox IDE with React & TypeScript

Hello everyone, and welcome! In this session, we'll learn how to embed a fully functional, live-coding environment directly into our React and TypeScript application. This is perfect for creating interactive tutorials, component documentation, or a live playground for your users.

We'll be using **Sandpack**, the magic behind CodeSandbox. Let's get started!

### What We're Building

By the end of this session, you'll have a React component that looks and feels like a mini-VS Code, allowing you to edit and preview React code in real-time.



---

## 1. Prerequisites

Before we begin, make sure you have a basic React + TypeScript project set up. If you don't have one, you can create one quickly:

```bash
npx create-react-app my-sandbox-app --template typescript
# or with Vite (recommended)
# npm create vite@latest my-sandbox-app -- --template react-ts

cd my-sandbox-app
```

---

## 2. Part 1: Your First Sandbox (The "Hello World")

Our first goal is to get a simple sandbox running. This will show us the core concepts of Sandpack.

### Step 1: Install Sandpack

First, let's add the Sandpack library to our project.

```bash
npm install @codesandbox/sandpack-react
# or
yarn add @codesandbox/sandpack-react
```

### Step 2: Create the Sandbox Component

Now, let's create a new component for our IDE.

1.  Create a new file: `src/components/MySandpack.tsx`
2.  Add the following code:

```tsx
// src/components/MySandpack.tsx
import { Sandpack } from "@codesandbox/sandpack-react";

export const MySandpack = () => {
  return (
    <Sandpack
      template="react-ts" // We're using the React + TypeScript template
      theme="dark"        // You can also use "light" or "auto"
      options={{
        editorHeight: 550, // Custom editor height
      }}
    />
  );
};
```

### Step 3: Add the Component to Your App

Now, let's render this component in our main `App.tsx` file to see it in action.

```tsx
// src/App.tsx
import { MySandpack } from './components/MySandpack';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Live IDE!</h1>
        <p>Edit the code below and see the changes live.</p>
      </header>
      <main>
        <MySandpack />
      </main>
    </div>
  );
}

export default App;
```

**What just happened?**

When you run your app (`npm start`), you should see a complete IDE! It includes a default `App.tsx` file and a live preview. By simply using the `<Sandpack />` component and telling it our `template` is `"react-ts"`, it automatically sets up a full, runnable environment.

You can now edit the code in the editor, and the preview will update instantly!

---

## 3. Part 2: Customizing Your IDE

The default template is great, but what if we want to provide our own code, use multiple files, and customize the layout? Sandpack makes this easy.

### Step 1: Providing Custom Files

Let's pre-populate the sandbox with our own set of files. This is the most powerful feature for creating tutorials.

We'll modify `MySandpack.tsx` to use the `files` prop. The `files` prop is an object where keys are filenames (including the path) and values are the code content.

```tsx
// src/components/MySandpack.tsx
import { Sandpack } from "@codesandbox/sandpack-react";

// Let's define the code for our files
const appCode = `import Button from './Button';

export default function App() {
    return (
        <div>
            <h1>Custom Component Playground</h1>
            <p>This is a custom button. Try changing its text!</p>
            <Button />
        </div>
    )
}`;

const buttonCode = `export default function Button() {
    return <button onClick={() => alert("Button Clicked!")}>Click Me!</button>
}`;


export const MySandpack = () => {
  return (
    <Sandpack
      template="react-ts"
      theme="dark"
      options={{
        editorHeight: 550,
      }}
      files={{
        // The key is the file name
        // The value is the code
        "/App.tsx": appCode,
        "/Button.tsx": {
          code: buttonCode,
          active: true, // This makes the file active on load
        },
      }}
    />
  );
};
```

**Key Concepts:**

*   **`files` prop**: This object defines the entire file system of your sandbox.
*   **File Paths**: Use paths like `/App.tsx` or `/components/Button.tsx` to structure your project.
*   **Active File**: By setting `active: true` on a file, you control which file is open by default when the component loads.
*   **Entry Point**: Sandpack is smart enough to figure out that `/App.tsx` or `/index.tsx` is the entry point for a React project.

Now, your IDE will load with two files: `App.tsx` and `Button.tsx`, with `Button.tsx` being the active tab.

### Step 2: Customizing the Layout

What if you want the editor on the right and the preview on the left? Or maybe you want to add your own components into the layout? For this, we use Sandpack's provider pattern.

Let's update `MySandpack.tsx` again.

```tsx
// src/components/MySandpack.tsx
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

// ... (keep the appCode and buttonCode from before)

export const MySandpack = () => {
  return (
    <SandpackProvider // 1. Use the Provider
      template="react-ts"
      theme="dark"
      files={{
        "/App.tsx": appCode,
        "/Button.tsx": {
          code: buttonCode,
          active: true,
        },
      }}
    >
      {/* 2. Use the Layout component */}
      <SandpackLayout>
        {/* We can place components in any order we want! */}
        <SandpackPreview style={{ height: 550 }} />
        <SandpackCodeEditor style={{ height: 550 }} />
      </SandpackLayout>
    </SandpackProvider>
  );
};
```

**What did we do?**

1.  **`<SandpackProvider>`**: We wrapped everything in a `SandpackProvider`. This component holds all the state (files, theme, etc.) but doesn't render anything itself.
2.  **`<SandpackLayout>`**: This is a flexbox container that arranges its children.
3.  **`<SandpackCodeEditor />` & `<SandpackPreview />`**: These are the individual components for the editor and the preview.

By using this pattern, we have full control over the layout. We just swapped the order of the preview and editor!

---

## 4. Part 3: Advanced Usage

Let's cover two more advanced—but very common—use cases.

### Step 1: Adding External Dependencies

What if your code example needs a library like `axios` or `framer-motion`? You can define this in the `customSetup` prop.

Let's add the `canvas-confetti` library to our `Button` component for a fun effect.

```tsx
// src/components/MySandpack.tsx

// ... (imports remain the same)

const appCode = `...`; // No change to appCode

// UPDATE the Button code to use the new dependency
const buttonCodeWithConfetti = `import confetti from 'canvas-confetti';

export default function Button() {
    const handleClick = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    return <button onClick={handleClick}>Click for Confetti!</button>
}`;

export const MySandpack = () => {
  return (
    <SandpackProvider
      template="react-ts"
      theme="dark"
      files={{
        "/App.tsx": appCode,
        "/Button.tsx": {
          code: buttonCodeWithConfetti,
          active: true,
        },
      }}
      // Add dependencies here!
      customSetup={{
        dependencies: {
          "canvas-confetti": "latest",
        },
        // For TypeScript, we might need types too!
        devDependencies: {
          "@types/canvas-confetti": "latest"
        }
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor style={{ height: 550 }} />
        <SandpackPreview style={{ height: 550 }} />
      </SandpackLayout>
    </SandpackProvider>
  );
};
```

**How it works:**

The bundler inside Sandpack will see the `dependencies` in `customSetup` and automatically run `npm install` for them inside the sandbox environment. Now, when you click the button in the preview, you'll see a confetti explosion!

### Step 2: Hiding and Protecting Files

Sometimes, you want to include a file that is necessary for the example to run, but you don't want the user to see or edit it. For example, some styling or utility functions.

You can do this by adding the `hidden: true` property to a file.

```tsx
// src/components/MySandpack.tsx
// ...

const stylesCss = `
body {
  font-family: sans-serif;
  background-color: #242424;
  color: white;
}
button {
  background-color: #646cff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}
button:hover {
  background-color: #535bf2;
}
`;

export const MySandpack = () => {
  return (
    <SandpackProvider
      // ... (rest of the props)
      files={{
        "/App.tsx": `import './styles.css';\n${appCode}`, // Make sure to import it
        "/Button.tsx": buttonCodeWithConfetti,
        "/styles.css": {
          code: stylesCss,
          hidden: true, // This file will not appear in the editor tabs
        },
      }}
    >
      {/* ... layout ... */}
    </SandpackProvider>
  );
};
```

Now the `styles.css` file is part of the sandbox but is invisible to the user, cleaning up the interface.

---

## 5. Conclusion & Best Practices

You've successfully integrated a powerful, live-coding IDE into your React application!

**Key Takeaways:**

1.  **Start Simple**: The basic `<Sandpack />` component is great for quick setups.
2.  **Customize with `files`**: Define your own code examples using the `files` prop to create rich, multi-file tutorials.
3.  **Control the Layout**: Use the `<SandpackProvider>` pattern for full control over the position and appearance of the editor and preview.
4.  **Extend with Dependencies**: Easily add any npm package your example needs via the `customSetup` prop.
5.  **Keep it Clean**: Use `hidden: true` to include necessary but irrelevant files without cluttering the user's view.

This tool opens up a world of possibilities for creating engaging and interactive experiences. Happy coding