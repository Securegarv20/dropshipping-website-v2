// *****************************
// Chart JS
// *****************************

document.addEventListener("DOMContentLoaded", () => {
    const productRows = document.querySelectorAll(".product-row");

    let currentlyOpenRow = null; // Track the currently open graph row

    productRows.forEach((row) => {
        row.addEventListener("click", () => {
            const productId = row.getAttribute("data-id");
            const graphRow = document.querySelector(`.graph-row[data-id="${productId}"]`);
            const chartCanvas = document.getElementById(`chart-${productId}`);

            // If there is a currently open graph row, close it
            if (currentlyOpenRow && currentlyOpenRow !== graphRow) {
                currentlyOpenRow.style.display = "none";
            }

            // Toggle the visibility of the clicked graph row
            if (graphRow.style.display === "none" || !graphRow.style.display) {
                graphRow.style.display = "table-row";
                initializeGraph(chartCanvas, productId); // Initialize the graph
                currentlyOpenRow = graphRow; // Update the currently open row
            } else {
                graphRow.style.display = "none";
                currentlyOpenRow = null; // No row is open now
            }
        });
    });
});

function initializeGraph(canvas, productId) {
    // Check if the canvas already has a chart instance attached
    if (!canvas.chart) {
        // Example sales data; replace this with actual product-specific data
        const data = {
            labels: [
                "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
                "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"
            ], // Time in 24-hour format
            datasets: [
                {
                    label: `Sales Data for Product ${productId}`,
                    data: getSalesData(productId), // Get sales data dynamically
                    borderColor: "rgba(75, 192, 192, 1)", // Line color
                    borderWidth: 2,
                    tension: 0.3, // Smooth curve
                },
            ],
        };

        // Initialize a Chart.js instance
        canvas.chart = new Chart(canvas.getContext("2d"), {
            type: "line",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Time (24-hour format)",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Sales",
                        },
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.raw} units sold`;
                            },
                        },
                    },
                },
            },
        });
    }
}

function getSalesData(productId) {
    // Dummy sales data for different products (replace with real data)
    const salesData = {
        "1": [12, 19, 3, 5, 2, 8, 15, 10, 12, 9, 7, 6, 4],
        "2": [8, 15, 10, 12, 9, 5, 6, 7, 8, 9, 10, 11, 12],
        "3": [5, 6, 8, 9, 10, 12, 15, 18, 20, 22, 24, 25, 30],
        "4": [20, 25, 30, 22, 18, 12, 10, 8, 6, 5, 3, 2, 1],
        "5": [10, 14, 18, 16, 12, 8, 6, 5, 4, 3, 2, 1, 0],
    };

    // Return data for the given product ID or default data if not found
    return salesData[productId] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// --------------------
// Search Filter
// --------------------
// Expand or Collapse Search Bar on Click
document.getElementById("search-icon").addEventListener("click", () => {
    const searchContainer = document.querySelector(".search-container");
    const searchBar = document.getElementById("search-bar");

    // Check if the search container is already active
    if (searchContainer.classList.contains("active")) {
        searchContainer.classList.remove("active"); // Collapse the search bar
        searchBar.style.display = "none"; // Hide the input
        searchBar.value = ""; // Clear the search input
    } else {
        searchContainer.classList.add("active"); // Expand the search bar
        searchBar.style.display = "block"; // Show the input
        searchBar.focus(); // Focus on the input field
    }
});

// ---------------------
// Filter Drop Down
// ---------------------
// Select the toggle button and dropdown menu
const toggleBtn = document.getElementById('filtersToggleBtn');
const dropdown = document.getElementById('filtersDropdown');

// Add event listener to toggle visibility
toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    dropdown.classList.toggle('active'); // Toggle the active class on the dropdown
});

// Close dropdown if clicked outside
document.addEventListener("click", (event) => {
    // Check if the clicked element is not within the dropdown or toggle button
    if (!dropdown.contains(event.target) && event.target !== toggleBtn) {
        dropdown.classList.remove("active");
    }
});



// -------------------
// SEARCH BAR
// --------------------
// Filter Table Rows as User Types
document.getElementById("search-bar").addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();

    // Loop through all rows in the table with ID 'productTable'
    document.querySelectorAll("#productTable tbody tr").forEach(row => {
        const productName = row.children[1].textContent.toLowerCase(); // Product Name column
        row.style.display = productName.includes(searchText) ? "" : "none"; // Toggle row visibility
    });
});



// --------------------
// Sort Filter
// --------------------
document.getElementById("sortFilter").addEventListener("change", (e) => {
    const rows = Array.from(document.querySelectorAll("#productTable tbody tr"));
    const sortValue = e.target.value;

    // Sort rows based on the selected filter
    rows.sort((a, b) => {
        let valueA = 0;
        let valueB = 0;

        if (sortValue === "price") {
            // Sort by price
            valueA = parseFloat(a.children[2]?.textContent.trim()) || 0; // Price is in column index 2
            valueB = parseFloat(b.children[2]?.textContent.trim()) || 0;
        } else if (sortValue === "stock") {
            // Sort by stock
            valueA = parseInt(a.children[3]?.textContent.trim(), 10) || 0; // Stock is in column index 3
            valueB = parseInt(b.children[3]?.textContent.trim(), 10) || 0;
        }

        // Determine sort order
        if (sortValue === "price" || sortValue === "stock") {
            return valueA - valueB; // Ascending order
        }

        return 0; // Default option (no sorting)
    });

    // Append sorted rows back to the table body without modifying other parts of the theme
    const tbody = document.querySelector("#productTable tbody");
    rows.forEach(row => tbody.appendChild(row));
});


// --------------------
// Date Filter
// --------------------
document.getElementById("dateFilter").addEventListener("input", (e) => {
    const selectedDate = e.target.value;
    document.querySelectorAll("#productTable tbody tr").forEach(row => {
        const rowDate = row.children[5].textContent.trim();
        row.style.display = rowDate === selectedDate ? "" : "none";
    });
});



// --------------------
// Reset Filters
// --------------------
document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    // Reset the Search Bar
    const searchBar = document.getElementById("search-bar");
    searchBar.value = ""; // Clear search input
    document.querySelectorAll("#productTable tbody tr").forEach(row => {
        row.style.display = ""; // Show all rows
    });

    // Reset the Sort Filter
    const sortFilter = document.getElementById("sortFilter");
    sortFilter.value = "default"; // Set the dropdown to the default value

    // Revert table rows to their original order
    const tbody = document.querySelector("#productTable tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.sort((a, b) => a.dataset.originalIndex - b.dataset.originalIndex);
    rows.forEach(row => tbody.appendChild(row));

    // Add logic for any additional filters here (e.g., date filters)
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter) {
        dateFilter.value = ""; // Clear date filter input
        document.querySelectorAll("#productTable tbody tr").forEach(row => {
            row.style.display = ""; // Show all rows
        });
    }

    console.log("Filters reset!");
});
// Assign data-original-index to each row on page load
document.querySelectorAll("#productTable tbody tr").forEach((row, index) => {
    row.setAttribute("data-original-index", index);
});


// --------------------
// Pagination Configuration
// --------------------
const productsPerPage = 10; // Number of products per page
const productRows = document.querySelectorAll('#productTable tbody .product-row'); // Select only product rows
const totalPages = Math.ceil(productRows.length / productsPerPage);
let currentPage = 1;

// --------------------
// Function to display the current page of products
// --------------------
function showPage(page) {
  // Hide all rows (both product and graph rows)
  const allRows = document.querySelectorAll('#productTable tbody tr');
  allRows.forEach((row) => {
    row.style.display = 'none';
  });

  // Show product rows for the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  for (let i = startIndex; i < endIndex && i < productRows.length; i++) {
    const productRow = productRows[i];
    productRow.style.display = ''; // Show the product row

    // Also show its corresponding hidden graph row (if any)
    const graphRow = document.querySelector(`#productTable tbody .graph-row[data-id="${productRow.dataset.id}"]`);
    if (graphRow) {
      graphRow.style.display = '';
    }
  }

  // Update the pagination controls
  updatePagination();
}

// --------------------
// Function to update the pagination controls
// --------------------
function updatePagination() {
  const paginationList = document.getElementById('paginationList');
  paginationList.innerHTML = ''; // Clear existing pagination numbers

  // Create page numbers dynamically
  const maxPagesToShow = 5; // Number of page numbers to show at once
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust start page if there are fewer pages than maxPagesToShow
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Create the page number links
  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('pagination-item');
    if (i === currentPage) {
      pageItem.classList.add('current');
    }

    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.textContent = i;

    pageLink.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      showPage(currentPage);
    });

    pageItem.appendChild(pageLink);
    paginationList.appendChild(pageItem);
  }

  // Update previous/next button disabled state
  document.getElementById('prevPageBtn').classList.toggle('disabled', currentPage === 1);
  document.getElementById('nextPageBtn').classList.toggle('disabled', currentPage === totalPages);
}

// --------------------
// Event listeners for prev and next buttons
// --------------------
document.getElementById('prevPageBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
});

// --------------------
// Initialize the first page and pagination controls
// --------------------
showPage(currentPage);


// ------------------
// Dark Mode Toggle
// ------------------
// Get the theme toggle button and body element
const themeToggleBtn = document.getElementById('themeToggleBtn'); // Reference the button
const root = document.documentElement; // Reference the root for CSS variables

// Helper function to set the theme
function setTheme(mode) {
    if (mode === 'dark') {
        root.style.setProperty('--primary-color', '#1e7b50');
        root.style.setProperty('--primary-color-light', '#0c8195');
        root.style.setProperty('--hover-color', '#3d9a44');
        root.style.setProperty('--accent-color', '#f1f1f1');
        root.style.setProperty('--background-dark', '#1e1e1e');
        root.style.setProperty('--background-light-color', '#333');
        root.style.setProperty('--font-color', '#E0E0E0');
        root.style.setProperty('--font-color-dark', '#333');
        themeToggleBtn.textContent = '🌙'; // Moon icon for dark mode
        localStorage.setItem('theme', 'dark'); // Save theme preference
    } else {
        root.style.setProperty('--primary-color', '#0c8195');
        root.style.setProperty('--primary-color-light', '#1e7b50');
        root.style.setProperty('--hover-color', '#f1c111');
        root.style.setProperty('--accent-color', '#f1f1f1');
        root.style.setProperty('--background-dark', '#FFFFFF');
        root.style.setProperty('--background-light-color', '#E0E0E0');
        root.style.setProperty('--font-color', '#2c3e50');
        root.style.setProperty('--font-color-dark', '#E0E0E0');
        themeToggleBtn.textContent = '☀️'; // Sun icon for light mode
        localStorage.setItem('theme', 'light'); // Save theme preference
    }
}

// Check and apply the saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
setTheme(savedTheme);

// Add event listener to the toggle button
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme'); // Get the current theme
    setTheme(currentTheme === 'dark' ? 'light' : 'dark'); // Toggle theme
});

// ------------------
// Hamburger Menu Functionality
// ------------------
// Get the hamburger button and nav links
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

// Track the sidebar's open/close state
let isSidebarOpen = false;

// Toggle the sidebar's visibility on hamburger click
hamburger.addEventListener('click', () => {
    if (isSidebarOpen) {
        sideMenu.style.left = '-250px'; // Close the sidebar
        isSidebarOpen = false;
    } else {
        sideMenu.style.left = '0'; // Open the sidebar
        isSidebarOpen = true;
    }
});

// Close the sidebar if clicked outside of it
document.addEventListener('click', (event) => {
    if (
        isSidebarOpen && // Sidebar must be open
        !sideMenu.contains(event.target) && // Click is outside the sidebar
        !hamburger.contains(event.target) // Click is outside the hamburger button
    ) {
        sideMenu.style.left = '-250px'; // Close the sidebar
        isSidebarOpen = false;
    }
});






