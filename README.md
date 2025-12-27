# React Singleton hook
Manage global state of your React app using hooks.

[![build status](https://github.com/BisNexus/react-use-singleton-hook/actions/workflows/ci.yml/badge.svg)](https://github.com/LegacyOfKain/react-use-singleton-hook/actions)
[![npm version](https://img.shields.io/npm/v/react-use-singleton-hook)](https://www.npmjs.com/package/react-use-singleton-hook)
[![npm downloads](https://img.shields.io/npm/dm/react-use-singleton-hook)](https://www.npmjs.com/package/react-use-singleton-hook)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub last commit](https://img.shields.io/github/last-commit/BisNexus/react-use-singleton-hook)

## Installation

To use React Singleton Hook with your React app, install it as a dependency:

```bash
# If you use npm:
npm install react-use-singleton-hook

# Or if you use Yarn:
yarn add react-use-singleton-hook

# Or if you use pnpm:
pnpm add react-use-singleton-hook
```

This assumes that you’re using [npm](http://npmjs.com/) package manager

## What is a singleton hook

- **Works like React Context**: A singleton hook encapsulates shared state logic and exposes it to any component that calls the hook, similar to how context provides values to consumers.
- **Mounts lazily**: The hook logic runs only when the first component uses it. After mounting, it stays active for the app’s lifetime unless configured to unmount.
- **No setup required**: No need for context providers or changes to your app structure. The hook uses React’s built-in hooks and a hidden DOM node for efficient, portable state management.

## Examples

#### dark/light mode switch
Whenever `Configurator` changes darkMode, all subscribed components are updated.

```javascript
/***************    file:src/services/darkMode.js    ***************/  
import { useState } from 'react';
import { createSingletonGlobalState } from 'react-use-singleton-hook';

const initDarkMode = false;
let globalSetMode = () => { throw new Error('you must useDarkMode before setting its state'); };

export const useDarkMode = createSingletonGlobalState(initDarkMode, () => {
  const [mode, setMode] = useState(initDarkMode);
  globalSetMode = setMode;
  return mode;
});

export const setDarkMode = mode => globalSetMode(mode);


/***************    file:src/compoents/App.js    ***************/

import  React from 'react';
import { useDarkMode, setDarkMode } from 'src/services/darkMode';

const Consumer1 = () => {
  const mode = useDarkMode();
  return <div className={`is-dark-${mode}`}>Consumer1 - {`${mode}`}</div>;
};

const Consumer2 = () => {
  const mode = useDarkMode();
  return <div className={`is-dark-${mode}`}>Consumer2 - {`${mode}`}</div>;
};

const Configurator = () => {
  const mode = useDarkMode();
  return <button onClick={() => setDarkMode(!mode)}>Toggle dark/light</button>;
};

```

### Compatibility

- ✅ Supports React 18.x and 19.x
- ✅ Works with Concurrent Mode
- ✅ Compatible with Server Components (client-side only)