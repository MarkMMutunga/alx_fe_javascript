# Dynamic Quote Generator

A web application that displays random quotes with persistent storage, JSON import/export functionality, advanced content filtering, and server synchronization with conflict resolution.

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
- **🆕 Server Synchronization**: Automatic sync with JSONPlaceholder API simulation
- **🆕 Conflict Resolution**: Intelligent handling of data conflicts during sync
- **🆕 Real-time Sync Status**: Visual indicators for sync progress and conflicts
- **🆕 Manual Sync Control**: User-triggered synchronization on demand
- **Clean and Responsive Design**: Modern UI with smooth interactions

## Server Sync Features

### **Automatic Synchronization**
- **Periodic Sync**: Automatically syncs with server every 30 seconds
- **Background Processing**: Non-blocking sync operations
- **Error Handling**: Graceful handling of network failures
- **Status Indicators**: Real-time sync status in bottom-right corner

### **Conflict Resolution Strategy**
- **Server Priority**: Server data takes precedence during conflicts
- **Intelligent Merging**: Combines local and server data without duplication
- **User Notifications**: Clear notifications when conflicts are resolved
- **Data Integrity**: Ensures no data loss during sync operations

### **Manual Controls**
- **Sync Now Button**: Trigger immediate synchronization
- **Conflict Notifications**: Detailed information about resolved conflicts
- **Error Recovery**: Automatic retry mechanisms for failed syncs

## How to Use

### Basic Operations
1. Open `index.html` in your web browser
2. Click "Show New Quote" to see a random quote
3. Use the category filter dropdown to see quotes from specific categories
4. Click "Add New Quote" to add your own quotes
5. Click "🔄 Sync Now" to manually synchronize with server

### Filtering System
- **Category Filter**: Select a category from the dropdown to filter quotes
- **Real-time Updates**: The filter updates immediately when you select a category
- **Persistent Selection**: Your last selected filter is remembered between sessions
- **Auto-Population**: Categories are automatically extracted from your quotes

### Data Management
- **Export**: Use "Export Quotes" to download your quote collection as JSON
- **Import**: Use the file input to import quotes from a JSON file
- **Auto-Save**: All quotes and preferences are automatically saved locally
- **Server Sync**: Quotes are automatically synchronized with the server

### Sync Management
- **Automatic**: Sync happens every 30 seconds in the background
- **Manual**: Use the "🔄 Sync Now" button for immediate sync
- **Status**: Watch the sync indicator in the bottom-right corner
- **Conflicts**: Receive notifications when data conflicts are resolved

## Keyboard Shortcuts

- **Spacebar**: Show new quote (from current filter if applied)
- **Ctrl+A**: Toggle add quote form
- **Ctrl+E**: Export quotes to JSON
- **Escape**: Close add quote form

## Storage Features

- **Local Storage**: 
  - All quotes are automatically saved locally
  - Last selected category filter is preserved
  - Sync timestamps and conflict resolution data
- **Session Storage**: 
  - Last viewed quote is remembered during your session
- **Server Storage**: 
  - Simulated server interaction using JSONPlaceholder API
  - Conflict resolution with server-priority strategy
- **Data Persistence**: 
  - Your quotes and preferences will be available when you return

## Technical Implementation

### Core Functions
- `populateCategories()`: Dynamically extracts and populates category options
- `filterQuotes()`: Filters displayed quotes based on selected category
- `saveLastSelectedFilter()`: Persists filter selection to localStorage
- `loadLastSelectedFilter()`: Restores last filter selection on page load

### Server Sync Functions
- `initializeServerSync()`: Sets up automatic synchronization
- `performServerSync()`: Executes sync operations with conflict resolution
- `fetchServerData()`: Simulates fetching data from JSONPlaceholder API
- `syncWithServer()`: Merges local and server data with conflict detection
- `handleConflicts()`: Resolves data conflicts using server-priority strategy
- `manualSync()`: User-triggered synchronization function

### DOM Manipulation
- Dynamic category dropdown population
- Real-time quote filtering and display
- Interactive form creation and management
- Responsive error and success messaging
- Sync status indicators and conflict notifications

## Server Simulation

The application uses JSONPlaceholder (https://jsonplaceholder.typicode.com) to simulate server interactions:
- **Fetches posts** and converts them to quotes for demonstration
- **Simulates conflicts** by comparing local vs server data
- **Handles POST requests** when adding new quotes
- **Implements retry logic** for failed network requests

## Files

- `index.html` - The main webpage with filtering and sync interface
- `script.js` - JavaScript code with DOM manipulation, storage, filtering, and sync functionality
- `README.md` - This documentation
- `sample-quotes.json` - Example JSON file for testing import functionality
- `server-data-example.json` - Example server data format for reference

## Getting Started

Just open the `index.html` file in any web browser to start using the quote generator with full filtering and server sync capabilities. The application will automatically begin syncing with the simulated server.
