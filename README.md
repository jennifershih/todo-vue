# ✅ todo-vue

[![ci](https://github.com/jennifershih/todo-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/jennifershih/todo-vue/actions/workflows/ci.yml)
[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Live demo](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f)](https://jennifershih.github.io/todo-vue/)

An accessible to-do list built with Vue 3. Started from the [MDN Vue tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Vue_getting_started) and extended.

**[Try it →](https://jennifershih.github.io/todo-vue/)**

## Features

- Add, complete, rename and delete tasks
- Filter all / active / completed, and clear completed tasks
- Tasks are saved in your browser (localStorage)
- Keyboard and screen-reader friendly: focus moves sensibly after edits and deletes, `Esc` cancels editing

## Built with

- Vue 3.5 (`<script setup>`, a `useTodos` composable) + Vite + TypeScript
- Vitest + Vue Test Utils, ESLint + oxlint, Prettier

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check and build |
| `npm run test:unit` | Unit tests |
| `npm run lint` | Lint |
