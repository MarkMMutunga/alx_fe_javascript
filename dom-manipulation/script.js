// Array of quote objects with text and category
let quotes = [
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

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const toggleFormBtn = document.getElementById('toggleForm');
const categoryFilter = document.getElementById('categoryFilter');

// State variables
let currentFormVisible = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  populateCategoryFilter();
  setupEventListeners();
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
  
  // Update category filter
  populateCategoryFilter();
  
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
  
  // Clear existing options (except "All Categories")
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  // Add category options
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Function to setup event listeners
function setupEventListeners() {
  // New quote button
  newQuoteBtn.addEventListener('click', showRandomQuote);
  
  // Toggle form button
  toggleFormBtn.addEventListener('click', createAddQuoteForm);
  
  // Category filter change
  categoryFilter.addEventListener('change', showRandomQuote);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    // Space bar for new quote
    if (event.code === 'Space' && !event.target.matches('input')) {
      event.preventDefault();
      showRandomQuote();
    }
    
    // 'A' key to toggle add form
    if (event.key === 'a' && event.ctrlKey) {
      event.preventDefault();
      createAddQuoteForm();
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
