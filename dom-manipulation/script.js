// Default quotes array
const defaultQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "motivation"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    category: "innovation"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    category: "life"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "dreams"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    category: "motivation"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "success"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    category: "motivation"
  },
  {
    text: "In the midst of winter, I found there was, within me, an invincible summer.",
    category: "resilience"
  }
];

// Initialize quotes array - load from localStorage or use defaults
let quotes = loadQuotes();

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const toggleFormBtn = document.getElementById('toggleForm');
const categoryFilter = document.getElementById('categoryFilter');
const exportBtn = document.getElementById('exportQuotes');
const importFileInput = document.getElementById('importFile');

// State variables
let currentFormVisible = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  populateCategories();
  setupEventListeners();
  loadLastSelectedFilter();
  loadLastViewedQuote();
  showRandomQuote();
});

// Function to display a random quote
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  let filteredQuotes = quotes;
  
  // Filter quotes by category if not "all"
  if (selectedCategory !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }
  
  if (filteredQuotes.length === 0) {
    displayQuote("No quotes available for this category.", "");
    return;
  }
  
  // Get random quote from filtered array
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  
  displayQuote(randomQuote.text, randomQuote.category);
  
  // Save the last viewed quote to session storage
  saveLastViewedQuote(randomQuote);
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  
  // Save the selected filter to localStorage
  saveLastSelectedFilter(selectedCategory);
  
  // Display a random quote from the selected category
  showRandomQuote();
}

// Function to display a quote with animation
function displayQuote(text, category) {
  // Clear existing content
  quoteDisplay.innerHTML = '';
  
  // Create quote container
  const quoteContainer = document.createElement('div');
  quoteContainer.className = 'quote-container';
  
  // Create quote text element
  const quoteText = document.createElement('p');
  quoteText.className = 'quote-text';
  quoteText.textContent = `"${text}"`;
  
  // Create category element if category exists
  if (category) {
    const quoteCategory = document.createElement('p');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(quoteCategory);
  } else {
    quoteContainer.appendChild(quoteText);
  }
  
  // Add fade-in animation
  quoteContainer.style.opacity = '0';
  quoteContainer.style.transition = 'opacity 0.5s ease-in-out';
  
  quoteDisplay.appendChild(quoteContainer);
  
  // Trigger animation
  setTimeout(() => {
    quoteContainer.style.opacity = '1';
  }, 100);
}

// Function to create and show the add quote form
function createAddQuoteForm() {
  // Check if form already exists
  let existingForm = document.getElementById('addQuoteForm');
  if (existingForm) {
    existingForm.remove();
    currentFormVisible = false;
    toggleFormBtn.textContent = 'Add New Quote';
    return;
  }
  
  // Create form container
  const formContainer = document.createElement('div');
  formContainer.id = 'addQuoteForm';
  formContainer.className = 'form-container';
  
  // Create form title
  const formTitle = document.createElement('h3');
  formTitle.textContent = 'Add a New Quote';
  formTitle.style.textAlign = 'center';
  formTitle.style.marginBottom = '20px';
  formTitle.style.color = '#333';
  
  // Create quote text input
  const quoteTextInput = document.createElement('input');
  quoteTextInput.type = 'text';
  quoteTextInput.id = 'newQuoteText';
  quoteTextInput.placeholder = 'Enter a new quote';
  quoteTextInput.required = true;
  
  // Create category input
  const quoteCategoryInput = document.createElement('input');
  quoteCategoryInput.type = 'text';
  quoteCategoryInput.id = 'newQuoteCategory';
  quoteCategoryInput.placeholder = 'Enter quote category';
  quoteCategoryInput.required = true;
  
  // Create add button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  
  // Create cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.style.backgroundColor = '#6c757d';
  cancelButton.onclick = function() {
    createAddQuoteForm(); // This will toggle the form off
  };
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.textAlign = 'center';
  buttonContainer.style.marginTop = '15px';
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(cancelButton);
  
  // Assemble the form
  formContainer.appendChild(formTitle);
  formContainer.appendChild(quoteTextInput);
  formContainer.appendChild(quoteCategoryInput);
  formContainer.appendChild(buttonContainer);
  
  // Add form to the page with animation
  formContainer.style.opacity = '0';
  formContainer.style.transform = 'translateY(-20px)';
  formContainer.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
  
  document.body.appendChild(formContainer);
  
  // Trigger animation
  setTimeout(() => {
    formContainer.style.opacity = '1';
    formContainer.style.transform = 'translateY(0)';
  }, 100);
  
  // Focus on the first input
  quoteTextInput.focus();
  
  // Update button text and state
  currentFormVisible = true;
  toggleFormBtn.textContent = 'Cancel';
  
  // Add Enter key functionality
  const handleEnterKey = function(event) {
    if (event.key === 'Enter') {
      addQuote();
    }
  };
  
  quoteTextInput.addEventListener('keypress', handleEnterKey);
  quoteCategoryInput.addEventListener('keypress', handleEnterKey);
}

// Function to add a new quote
function addQuote() {
  const quoteTextInput = document.getElementById('newQuoteText');
  const quoteCategoryInput = document.getElementById('newQuoteCategory');
  
  if (!quoteTextInput || !quoteCategoryInput) {
    alert('Please make sure all fields are filled out.');
    return;
  }
  
  const newQuoteText = quoteTextInput.value.trim();
  const newQuoteCategory = quoteCategoryInput.value.trim().toLowerCase();
  
  // Validate inputs
  if (newQuoteText === '' || newQuoteCategory === '') {
    alert('Please fill in both the quote text and category.');
    return;
  }
  
  // Create new quote object
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };
  
  // Add to quotes array
  quotes.push(newQuote);
  
  // Save to localStorage
  saveQuotes();
  
  // Update category filter with new categories
  populateCategories();
  
  // Show success message
  showSuccessMessage('Quote added successfully!');
  
  // Clear form and hide it
  const form = document.getElementById('addQuoteForm');
  if (form) {
    form.remove();
  }
  currentFormVisible = false;
  toggleFormBtn.textContent = 'Add New Quote';
  
  // Display the new quote
  displayQuote(newQuote.text, newQuote.category);
  
  console.log('New quote added:', newQuote);
  console.log('Total quotes:', quotes.length);
}

// Function to show success message
function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.textContent = message;
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  `;
  
  document.body.appendChild(successDiv);
  
  // Show with animation
  setTimeout(() => {
    successDiv.style.opacity = '1';
  }, 100);
  
  // Hide after 3 seconds
  setTimeout(() => {
    successDiv.style.opacity = '0';
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 300);
  }, 3000);
}

// Function to populate category filter dropdown
function populateCategoryFilter() {
  // Get unique categories
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categories.sort();
  
  // Save current selection
  const currentSelection = categoryFilter.value;
  
  // Clear existing options (except "All Categories")
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  // Add category options
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
  
  // Restore selection if it still exists
  if (categories.includes(currentSelection)) {
    categoryFilter.value = currentSelection;
  }
}

// Function to populate categories (required by task)
function populateCategories() {
  populateCategoryFilter();
}

// Function to setup event listeners
function setupEventListeners() {
  // New quote button
  newQuoteBtn.addEventListener('click', showRandomQuote);
  
  // Toggle form button
  toggleFormBtn.addEventListener('click', createAddQuoteForm);
  
  // Category filter change - remove this since we're using onchange in HTML
  // categoryFilter.addEventListener('change', showRandomQuote);
  
  // Export button
  if (exportBtn) {
    exportBtn.addEventListener('click', exportToJsonFile);
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    // Space bar for new quote
    if (event.code === 'Space' && !event.target.matches('input') && !event.target.matches('select')) {
      event.preventDefault();
      showRandomQuote();
    }
    
    // 'A' key to toggle add form
    if (event.key === 'a' && event.ctrlKey) {
      event.preventDefault();
      createAddQuoteForm();
    }
    
    // 'E' key to export quotes
    if (event.key === 'e' && event.ctrlKey) {
      event.preventDefault();
      exportToJsonFile();
    }
    
    // Escape key to close form
    if (event.key === 'Escape' && currentFormVisible) {
      createAddQuoteForm();
    }
  });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showRandomQuote,
    createAddQuoteForm,
    addQuote,
    quotes
  };
}

// Web Storage Functions
function saveQuotes() {
  try {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  } catch (error) {
    console.error('Error saving quotes to localStorage:', error);
    showErrorMessage('Failed to save quotes to local storage');
  }
}

function loadQuotes() {
  try {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      const parsedQuotes = JSON.parse(savedQuotes);
      // Validate that the loaded data is an array
      if (Array.isArray(parsedQuotes) && parsedQuotes.length > 0) {
        return parsedQuotes;
      }
    }
  } catch (error) {
    console.error('Error loading quotes from localStorage:', error);
    showErrorMessage('Failed to load quotes from local storage');
  }
  // Return default quotes if loading fails or no quotes exist
  return [...defaultQuotes];
}

function saveLastViewedQuote(quote) {
  try {
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  } catch (error) {
    console.error('Error saving last viewed quote to sessionStorage:', error);
  }
}

function loadLastViewedQuote() {
  try {
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
      const parsedQuote = JSON.parse(lastQuote);
      // Display the last viewed quote if it exists
      if (parsedQuote.text && parsedQuote.category) {
        displayQuote(parsedQuote.text, parsedQuote.category);
        return true;
      }
    }
  } catch (error) {
    console.error('Error loading last viewed quote from sessionStorage:', error);
  }
  return false;
}

// Function to save the last selected filter
function saveLastSelectedFilter(category) {
  try {
    localStorage.setItem('lastSelectedFilter', category);
  } catch (error) {
    console.error('Error saving last selected filter to localStorage:', error);
  }
}

// Function to load the last selected filter
function loadLastSelectedFilter() {
  try {
    const lastFilter = localStorage.getItem('lastSelectedFilter');
    if (lastFilter && categoryFilter) {
      // Set the filter after a short delay to ensure options are populated
      setTimeout(() => {
        if (lastFilter === 'all' || Array.from(categoryFilter.options).some(option => option.value === lastFilter)) {
          categoryFilter.value = lastFilter;
        }
      }, 100);
    }
  } catch (error) {
    console.error('Error loading last selected filter from localStorage:', error);
  }
}

// JSON Import/Export Functions
function exportToJsonFile() {
  try {
    const dataStr = JSON.stringify(quotes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.style.display = 'none';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    showSuccessMessage('Quotes exported successfully!');
  } catch (error) {
    console.error('Error exporting quotes:', error);
    showErrorMessage('Failed to export quotes');
  }
}

function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      
      // Validate imported data
      if (!Array.isArray(importedQuotes)) {
        throw new Error('Invalid file format: Expected an array of quotes');
      }
      
      // Validate each quote object
      const validQuotes = importedQuotes.filter(quote => {
        return quote && 
               typeof quote.text === 'string' && 
               typeof quote.category === 'string' &&
               quote.text.trim() !== '' &&
               quote.category.trim() !== '';
      });
      
      if (validQuotes.length === 0) {
        throw new Error('No valid quotes found in the file');
      }
      
      // Add imported quotes to existing quotes
      quotes.push(...validQuotes);
      
      // Save to localStorage
      saveQuotes();
      
      // Update UI with new categories
      populateCategories();
      
      // Clear the file input
      event.target.value = '';
      
      showSuccessMessage(`${validQuotes.length} quotes imported successfully!`);
      
      // Show a newly imported quote
      if (validQuotes.length > 0) {
        const randomImported = validQuotes[Math.floor(Math.random() * validQuotes.length)];
        displayQuote(randomImported.text, randomImported.category);
      }
      
    } catch (error) {
      console.error('Error importing quotes:', error);
      showErrorMessage(`Failed to import quotes: ${error.message}`);
      // Clear the file input on error
      event.target.value = '';
    }
  };
  
  fileReader.onerror = function() {
    showErrorMessage('Failed to read the file');
    event.target.value = '';
  };
  
  fileReader.readAsText(file);
}

function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #dc3545;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  `;
  
  document.body.appendChild(errorDiv);
  
  // Show with animation
  setTimeout(() => {
    errorDiv.style.opacity = '1';
  }, 100);
  
  // Hide after 5 seconds
  setTimeout(() => {
    errorDiv.style.opacity = '0';
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 300);
  }, 5000);
}
