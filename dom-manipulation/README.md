# Dynamic Quote Generator

A web application that displays random quotes with persistent storage, JSON import/export functionality, and advanced content filtering.

## Features

- **Dynamic Content Display**: Show random quotes from different categories
- **Advanced Filtering System**: Filter quotes by categories with real-time updates
- **Category Management**: Dynamically populated category dropdown from existing quotes
- **Persistent Filter Preferences**: Remembers your last selected filter across sessions
- **Add Custom Quotes**: Add new quotes through an intuitive form interface
- **Local Storage**: Quotes are automatically saved and persist between browser sessions
- **Session Storage**: Remembers the last viewed quote during your session
- **JSON Export**: Download all quotes as a JSON file
- **JSON Import**: Upload and import quotes from a JSON file
- **Real-time Category Updates**: New categories automatically appear in the filter
- **Clean and Responsive Design**: Modern UI with smooth interactions

## How to Use

### Basic Operations
1. Open `index.html` in your web browser
2. Click "Show New Quote" to see a random quote
3. Use the category filter dropdown to see quotes from specific categories
4. Click "Add New Quote" to add your own quotes

### Filtering System
- **Category Filter**: Select a category from the dropdown to filter quotes
- **Real-time Updates**: The filter updates immediately when you select a category
- **Persistent Selection**: Your last selected filter is remembered between sessions
- **Auto-Population**: Categories are automatically extracted from your quotes

### Data Management
- **Export**: Use "Export Quotes" to download your quote collection as JSON
- **Import**: Use the file input to import quotes from a JSON file
- **Auto-Save**: All quotes and preferences are automatically saved locally

## Keyboard Shortcuts

- **Spacebar**: Show new quote (from current filter if applied)
- **Ctrl+A**: Toggle add quote form
- **Ctrl+E**: Export quotes to JSON
- **Escape**: Close add quote form

## Storage Features

- **Local Storage**: 
  - All quotes are automatically saved locally
  - Last selected category filter is preserved
- **Session Storage**: 
  - Last viewed quote is remembered during your session
- **Data Persistence**: 
  - Your quotes and preferences will be available when you return

## Technical Implementation

### Core Functions
- `populateCategories()`: Dynamically extracts and populates category options
- `filterQuotes()`: Filters displayed quotes based on selected category
- `saveLastSelectedFilter()`: Persists filter selection to localStorage
- `loadLastSelectedFilter()`: Restores last filter selection on page load

### DOM Manipulation
- Dynamic category dropdown population
- Real-time quote filtering and display
- Interactive form creation and management
- Responsive error and success messaging

## Files

- `index.html` - The main webpage with filtering interface
- `script.js` - JavaScript code with DOM manipulation, storage, and filtering functionality
- `README.md` - This documentation
- `sample-quotes.json` - Example JSON file for testing import functionality

## Getting Started

Just open the `index.html` file in any web browser to start using the quote generator with full filtering capabilities.
