// --------------------
// Chart.js Initialization
// --------------------
const ctx = document.getElementById('productChart').getContext('2d');

// Sample data for the chart (adjust values as needed)
const data = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'
    ], // Time intervals from 12 AM to 12 PM
    datasets: [{
        label: 'Product Sales',
        data: [12, 19, 3, 5, 2, 3, 15, 23, 17, 8, 4, 12, 5], // Sample sales data
        fill: false,
        borderColor: getChartLineColor(), // Dynamic line color
        tension: 0.1 // Smooth curve
    }]
};

// Chart configuration
const config = {
    type: 'line', // Line chart type
    data: data,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (24-hour format)' // X-axis title
                },
                ticks: {
                    autoSkip: false, // Ensures all labels show up
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Count' // Y-axis title
                },
                beginAtZero: true // Start Y-axis from 0
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.raw + ' units'; // Custom tooltip label
                    }
                }
            }
        }
    }
};

// Create the chart
const productChart = new Chart(ctx, config);

// Function to get the chart line color based on the theme
function getChartLineColor() {
    return getComputedStyle(document.documentElement).getPropertyValue(
        document.body.classList.contains('dark-mode') 
        ? '--chart-line-dark' 
        : '--chart-line-light'
    ).trim();
}

// Function to get the chart background color based on the theme
function getChartBackgroundColor() {
    return getComputedStyle(document.documentElement).getPropertyValue(
        document.body.classList.contains('dark-mode') 
        ? '--chart-background-dark' 
        : '--chart-background-light'
    ).trim();
}

// Function to update chart colors based on theme
function updateChartColors() {
    // Update chart line color
    productChart.data.datasets[0].borderColor = getChartLineColor();
    // Update chart background color
    document.getElementById('productChart').style.backgroundColor = getChartBackgroundColor();
    productChart.update(); // Re-render the chart with updated settings
}

// When the theme is toggled, update the chart's line color and background color
document.querySelector('.btn-theme').addEventListener('click', function() {
    updateChartColors();
});


// --------------------
// Table Row Click Event
// --------------------
document.querySelectorAll('#productTable tbody tr').forEach(row => {
    row.addEventListener('click', () => {
        // Get product-specific data for chart (using dummy data for now)
        const productId = row.getAttribute('data-id');
        let salesData;
        // Dummy sales data for each product ID

if (productId === "1") {
    salesData = [15, 18, 4, 6, 3, 4, 16, 25, 20, 10, 6, 13, 7]; // LED Desk Lamp
} else if (productId === "2") {
    salesData = [10, 14, 8, 5, 4, 5, 18, 22, 15, 7, 3, 12, 6]; // Lamp Digital
} else if (productId === "3") {
    salesData = [12, 19, 3, 5, 2, 3, 15, 23, 17, 8, 4, 12, 5]; // Toothpaste Dispenser
} else if (productId === "4") {
    salesData = [25, 30, 20, 15, 18, 22, 40, 50, 45, 35, 25, 40, 33]; // Wireless Earphones
} else if (productId === "5") {
    salesData = [9, 14, 5, 7, 8, 6, 16, 18, 12, 7, 9, 10, 8]; // Bluetooth Speaker
} else if (productId === "6") {
    salesData = [25, 20, 15, 14, 18, 20, 30, 40, 28, 18, 20, 24, 22]; // Smartphone Case
} else if (productId === "7") {
    salesData = [30, 35, 40, 45, 32, 33, 40, 55, 50, 38, 42, 46, 48]; // Smartwatch
} else if (productId === "8") {
    salesData = [50, 60, 55, 45, 50, 53, 70, 80, 75, 68, 60, 72, 69]; // LED TV
} else if (productId === "9") {
    salesData = [20, 25, 10, 12, 15, 18, 25, 30, 20, 15, 18, 22, 17]; // Desk Fan
} else if (productId === "10") {
    salesData = [8, 10, 15, 12, 6, 5, 15, 20, 18, 8, 5, 10, 7]; // Portable Heater
} else if (productId === "11") {
    salesData = [22, 18, 25, 20, 30, 35, 40, 45, 35, 28, 33, 25, 30]; // Electric Kettle
} else if (productId === "12") {
    salesData = [14, 16, 12, 10, 8, 7, 20, 18, 16, 14, 12, 15, 18]; // Air Purifier
} else if (productId === "13") {
    salesData = [18, 20, 25, 30, 28, 32, 40, 50, 45, 38, 33, 42, 35]; // Electric Toothbrush
} else if (productId === "14") {
    salesData = [10, 8, 15, 12, 10, 7, 20, 25, 18, 15, 14, 12, 16]; // Air Conditioner
} else if (productId === "15") {
    salesData = [25, 20, 30, 40, 50, 45, 38, 32, 28, 35, 30, 36, 40]; // Refrigerator
} else if (productId === "16") {
    salesData = [22, 18, 12, 17, 16, 14, 18, 25, 30, 20, 15, 18, 21]; // Washing Machine
} else if (productId === "17") {
    salesData = [5, 8, 7, 10, 9, 6, 12, 15, 14, 9, 10, 11, 13]; // Microwave Oven
} else if (productId === "18") {
    salesData = [10, 12, 9, 7, 5, 4, 15, 18, 13, 9, 10, 12, 14]; // Blender
} else if (productId === "19") {
    salesData = [25, 28, 22, 20, 18, 21, 28, 30, 26, 20, 22, 30, 27]; // Induction Cooktop
} else if (productId === "20") {
    salesData = [20, 18, 25, 15, 12, 20, 28, 25, 30, 22, 18, 24, 20]; // Hair Dryer
} else {
    salesData = [10, 12, 8, 7, 5, 6, 15, 18, 14, 10, 7, 12, 8]; // Default dummy data
}

        // Update the chart with new data
        productChart.data.datasets[0].data = salesData;
        productChart.update();
    });
});


// --------------------
// Search Filter
// --------------------
document.getElementById("search-bar").addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();

    // Loop through each row in the product table
    document.querySelectorAll("#productTable tbody tr").forEach(row => {
        // Get the text content of the product name column (index 1)
        const productName = row.children[1].textContent.toLowerCase();

        // If the product name includes the search text, show the row, otherwise hide it
        row.style.display = productName.includes(searchText) ? "" : "none";
    });
});


// --------------------
// Sort Filter
// --------------------
document.getElementById("sortFilter").addEventListener("change", (e) => {
    const rows = Array.from(document.querySelectorAll("#productTable tbody tr"));
    const sortValue = e.target.value;

    rows.sort((a, b) => {
        const priceA = parseFloat(a.children[2].textContent);
        const priceB = parseFloat(b.children[2].textContent);

        if (sortValue === "price-low-high") return priceA - priceB;
        if (sortValue === "price-high-low") return priceB - priceA;
        return 0;
    });

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
// Pagination Configuration
// --------------------
const productsPerPage = 5; // Number of products per page (adjust as needed)
const products = document.querySelectorAll('#productTable tbody tr');
const totalPages = Math.ceil(products.length / productsPerPage);
let currentPage = 1;

// --------------------
// Function to display the current page of products
// --------------------
function showPage(page) {
  // Hide all products
  products.forEach((product) => {
    product.style.display = 'none';
  });

  // Show products for the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  for (let i = startIndex; i < endIndex && i < products.length; i++) {
    products[i].style.display = '';
  }

  // Update the page number display
  updatePagination();
}

// --------------------
// Function to update the pagination controls
// --------------------
function updatePagination() {
  const paginationList = document.getElementById('paginationList');
  paginationList.innerHTML = ''; // Clear existing pagination numbers

  // Create page numbers dynamically
  const maxPagesToShow = 5; // Number of page numbers to show at once (e.g., 1 2 3 4 5)
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
        root.style.setProperty('--hover-color', '#5bd763');
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
// NAVBAR FUNCTIONALITY
// ------------------
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const sideMenu = document.getElementById("sideMenu"); // Sidebar menu
    const closeMenuBtn = document.getElementById("closeMenu"); // Close button for the sidebar
    const nav = document.querySelector("nav"); // Navbar for scroll effect
    const navLinks = sideMenu.querySelectorAll("a"); // Sidebar links
    const mainContent = document.querySelector("body"); // Body or a specific content wrapper
    const searchIcon = document.querySelector(".search-icon"); // Search icon
    const searchContainer = document.querySelector(".search-container"); // Search bar container
    const searchBar = document.getElementById("search-bar"); // Search input
    const themeButton = document.querySelector(".theme-toggle"); // Theme toggle button

    // ------------------------
    // Toggle Sidebar Menu
    // ------------------------
    if (hamburger && sideMenu) {
        hamburger.addEventListener("click", () => {
            sideMenu.classList.toggle("active"); // Toggle sidebar visibility
            hamburger.classList.toggle("hamburger-active");
        });
    }

    // Close Sidebar Menu on Close Button
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", () => {
            sideMenu.classList.remove("active");
            hamburger.classList.remove("hamburger-active");
        });
    }

    // Close Sidebar Menu on Link Click
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                sideMenu.classList.remove("active");
                hamburger.classList.remove("hamburger-active");
            });
        });
    }

    // Close Sidebar Menu on Outside Click
    mainContent.addEventListener("click", (e) => {
        if (
            sideMenu &&
            hamburger &&
            !sideMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            sideMenu.classList.remove("active");
            hamburger.classList.remove("hamburger-active");
        }
    });

    // ------------------------
    // Navbar Scroll Effect
    // ------------------------
    if (nav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        });
    }

    // ------------------------
// Toggle Search Bar
// ------------------------
if (searchIcon && searchContainer && searchBar) {
    // Toggle search bar visibility on icon click
    searchIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event bubbling
        searchContainer.classList.toggle("active");

        if (searchContainer.classList.contains("active")) {
            searchBar.focus(); // Automatically focus on the search bar
        }
    });

    // Close search bar on outside click
    document.addEventListener("click", (e) => {
        if (!searchContainer.contains(e.target) && e.target !== searchIcon) {
            searchContainer.classList.remove("active");
        }
    });

    // Optional: Close search bar with the "Escape" key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchContainer.classList.contains("active")) {
            searchContainer.classList.remove("active");
        }
    });
}

    

    // ------------------------
    // Toggle Theme
    // ------------------------
    if (themeButton) {
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
        });
    }
});
