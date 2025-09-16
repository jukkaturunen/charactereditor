# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based character sheet editor for World of Darkness tabletop RPG. The application is a single-page HTML/JavaScript application that allows users to create, edit, and manage Chronicles of Darkness character sheets.

## Architecture

### Core Files
- **index.html**: Main page structure with character sheet layout
- **js/main.js**: Primary application logic, character data management, and UI interactions
- **js/json-editor.js**: Custom web component for editing character merits in JSON format
- **style.css**: Styling for the character sheet interface
- **example_json.json**: Sample character data structure

### Character Data Structure
The application uses a comprehensive JSON data structure to represent characters with these main sections:
- Basic info (name, age, player, concept, virtue, vice)
- Attributes (mental, physical, social) with dot ratings
- Skills (mental, physical, social) with specialties
- Merits (stored as JSON with dots, effects, and prerequisites)
- Health/damage tracking with visual damage indicators
- Willpower, integrity, and other derived stats
- Conditions, aspirations, weapons, and equipment

### Key Features
- **Interactive dot system**: Click dots to set attribute/skill values
- **Health damage tracking**: Visual system for bashing/lethal/aggravated damage
- **Skill specialties**: Modal-based system for adding skill specialties
- **JSON editor**: Custom web component for editing merits with syntax highlighting
- **Character persistence**: Save/load functionality for character data

## Development Workflow

### Running the Application
This is a static web application. Simply open `index.html` in a web browser or serve it with any static file server:
```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js http-server (if installed)
npx http-server

# Or simply open index.html directly in browser
open index.html
```

### No Build Process
This project has no build, test, or lint commands - it's vanilla HTML/CSS/JavaScript designed to run directly in browsers.

## Code Conventions

- Uses ES6+ JavaScript features
- Vanilla JavaScript (no frameworks or external dependencies)
- Custom web components for reusable functionality
- Event-driven architecture with onclick handlers
- DOM manipulation for dynamic content rendering
- Modular CSS with grid layouts for responsive design

## Character Data Management

The main character data is stored in the `characterData` object in `main.js`. Key functions:
- `render()`: Main rendering function that populates the entire character sheet
- `updateValue()`: Handles dot/box clicking for attributes, skills, health, etc.
- `setEdited()`: Marks character as modified and shows save link
- `saveChanges()`: Validates and saves character data changes

## Custom Components

### JSON Editor
The `json-editor` web component (`js/json-editor.js`) provides:
- Syntax-highlighted JSON editing
- Real-time validation
- Custom styling with color-coded elements
- Caret position management during formatting