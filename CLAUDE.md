# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based character sheet editor for World of Darkness tabletop RPG. The application combines a frontend HTML/JavaScript interface with a Google Apps Script backend for cloud-based character storage. Users can create, edit, load, and manage Chronicles of Darkness character sheets with persistent cloud storage through Google Drive.

## Architecture

### Core Files

#### Frontend Files
- **index.html**: Main application entry point with character selector and sheet layout
- **main.html**: Core character sheet interface with complete form layout
- **json-editor.html**: Standalone JSON editor component implementation
- **conditions.html**: Conditions database and modal functionality for condition management
- **js/main.js**: Primary application logic, character data management, and UI interactions
- **js/json-editor.js**: Custom web component for editing character merits in JSON format
- **style.css**: Styling for the character sheet interface
- **example_json.json**: Sample character data structure

#### Backend Files
- **code.gs**: Google Apps Script backend for character storage, loading, and management
- **images/**: Visual assets including background image and logo

#### Development/Reference Files
- **example_sheet.png**: Visual reference of the character sheet layout

### Character Data Structure
The application uses a comprehensive JSON data structure to represent characters with these main sections:
- **Basic info**: name, age, player, concept, virtue, vice, chronicle, faction, group name
- **Physical description**: date of birth, hair, eyes, race, nationality, height, weight, sex, distinguishing characteristics
- **Attributes**: mental, physical, social categories with dot ratings (1-5)
- **Skills**: mental, physical, social categories with dot ratings (0-5) and specialty indicators
- **Specialties**: skill-specific specializations stored as key-value pairs
- **Merits**: JSON-formatted merits with dots, effects, and prerequisites
- **Health**: maximum health and visual damage tracking (bashing, lethal, aggravated)
- **Willpower**: maximum and current values with dot/box system
- **Integrity**: moral/mental stability rating
- **Derived stats**: size, speed, defense, armor, initiative modifier
- **Experience system**: beats tracking and total experience points
- **Conditions**: temporary character conditions
- **Aspirations**: character goals and motivations
- **Weapons**: detailed weapon statistics with damage, range, clip size, etc.
- **Equipment**: general character possessions

### Key Features
- **Cloud storage integration**: Characters stored and managed via Google Drive
- **Character management**: Create new characters, load existing ones from cloud storage
- **Interactive dot system**: Click dots to set attribute/skill values with visual feedback
- **Advanced health tracking**: Visual damage system for bashing/lethal/aggravated damage types
- **Skill specialties**: Modal-based system for adding skill specializations with dropdown selection
- **Enhanced conditions system**:
  - Modal-based condition selection with comprehensive database of 22 Chronicles of Darkness conditions
  - Hover tooltips showing detailed condition information (description, skills, resolution)
  - Structured condition data with persistent/temporary indicators
- **Weapons system**: Comprehensive weapon tracking with detailed statistics
- **JSON editor**: Custom web component for editing merits with syntax highlighting and validation
- **Inline editing**: Click-to-edit functionality for character information fields
- **Experience tracking**: Beats system that automatically converts to experience points
- **Dynamic status indicators**: Real-time save status with loading spinners and "Up to date" feedback
- **Conditions and aspirations**: Dynamic list management for character traits
- **Auto-save indicators**: Visual feedback when character data needs saving
- **Responsive layout**: Grid-based design that adapts to different screen sizes

## Development Workflow

### Running the Application

#### Local Development
For local development and testing, this is a static web application that can be served with any static file server:
```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js http-server (if installed)
npx http-server

# Or simply open index.html directly in browser
open index.html
```

#### Google Apps Script Deployment
The production application runs as a Google Apps Script web app:
1. **code.gs** contains the backend server functions
2. HTML files are served through Google's HtmlService
3. Character data is stored in Google Drive in a designated folder
4. Access the app through the Google Apps Script web app URL

### Google Apps Script Backend Architecture
The backend provides several key functions:
- `doGet()`: Serves the main application HTML
- `getCharacterFiles()`: Returns list of character files from Google Drive
- `loadCharacter(fileId)`: Loads character data from a specific file
- `saveCharacter(fileId, data)`: Saves character changes to Google Drive
- `createNewCharacter(name, data)`: Creates new character files
- `deleteCharacter(fileId)`: Moves characters to trash

Character data is stored as JSON files in a Google Drive folder with ID specified in `DATA_FOLDER_ID`.

### No Build Process
This project has no build, test, or lint commands - it's vanilla HTML/CSS/JavaScript designed to run directly in browsers or Google Apps Script environment.

## Code Conventions

- Uses ES6+ JavaScript features
- Vanilla JavaScript (no frameworks or external dependencies)
- Custom web components for reusable functionality
- Event-driven architecture with onclick handlers
- DOM manipulation for dynamic content rendering
- Modular CSS with grid layouts for responsive design

## Character Data Management

### Frontend Data Management
Character data is managed through several global variables and functions in `main.js`:

#### Global State
- `characterData`: Current character object loaded from cloud storage
- `currentCharacterFile`: Reference to the currently loaded character file
- `character_edited`: Boolean flag indicating if character has unsaved changes
- `healthDamageState`: Array tracking health damage visualization state

#### Core Functions
- `render()`: Main rendering function that populates the entire character sheet
- `populateSheet(data)`: Updates all form elements with character data
- `updateValue(category, subcategory, name, newValue)`: Handles dot/box clicking for attributes, skills, health, etc.
- `setEdited()`: Marks character as modified and shows save link
- `saveChanges()`: Validates merits JSON and saves character data to cloud
- `makeEditable(element, dataPath)`: Converts display text to inline editing inputs
- `setValueByPath(obj, path, value)`: Utility for setting nested object properties

#### Cloud Integration Functions
- `loadCharacterList()`: Fetches available characters from Google Drive
- `loadCharacter(fileId)`: Loads specific character from cloud storage
- `createNewCharacter()`: Creates new character and saves to cloud

#### Feature-Specific Functions
- `updateHealthDamage(boxIndex)`: Manages health damage state visualization
- `addListItem(category)`: Adds items to conditions, aspirations, weapons, etc.
- `deleteListItem(category, key)`: Removes items from character lists
- `openSpecialtyModal()`: Opens skill specialty selection interface
- `openConditionModal()`: Opens condition selection modal with database lookup
- `populateWeapons(weapons)`: Renders weapon statistics table
- `setUpToDate()`: Sets character status to "Up to date" when no changes pending

#### Condition Management Functions
- `populateConditionSelector()`: Populates condition dropdown with sorted list
- `displayConditionInfo(conditionName)`: Shows detailed condition information in modal
- `addSelectedCondition()`: Adds selected condition to character and updates UI
- `getConditionTooltip(conditionName)`: Generates tooltip content for condition hover

## Custom Components

### JSON Editor
The `json-editor` web component (`js/json-editor.js`) provides:
- Syntax-highlighted JSON editing
- Real-time validation
- Custom styling with color-coded elements
- Caret position management during formatting
- **Fix for formatting loss**: Editor content is only updated when merits data actually changes, preserving user formatting during other character edits

### Conditions Database
The `conditions.html` file contains:
- **CONDITIONS_DATA**: Complete database of 22 Chronicles of Darkness conditions
- Each condition includes:
  - `name`: Short condition name
  - `fullName`: Display name with persistent indicator
  - `isPersistent`: Boolean flag for long-lasting conditions
  - `description`: Complete rules description
  - `skills`: Example skills affected (if applicable)
  - `resolution`: How the condition can be resolved
- Modal functions for condition selection and information display
- Tooltip generation for hover functionality

## User Interface Improvements

### Visual Design Updates
- **Dark header**: Site header now uses #262e37 background with minimal padding
- **Text logo**: Replaced image logo with white "Chronicles of Darkness" text (each word on separate line)
- **Status indicators**: Character edit status always visible with either:
  - Red "Save changes" link (underlined) when edits pending
  - Green "Up to date" text when character is saved
- **Loading feedback**: Spinners appear during load and save operations
- **Improved spacing**: Added gaps between dots and boxes in Health, Willpower, and Integrity sections

### Enhanced Modals
- **Condition Selection Modal**: Comprehensive interface for adding conditions with:
  - Dropdown selector with all 22 conditions
  - Real-time information display showing description, skills, and resolution
  - Add button enabled only when valid condition selected
- **Hover Tooltips**: Rich tooltips for existing conditions showing full rules information
- **Modal Management**: Consistent close behavior (click outside, X button, Cancel button)