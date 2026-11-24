
"use strict";

// Vendor data
const vendors = [
    {
        id: 1,
        name: "Royal Photography Studio",
        category: "Photographer",
        location: "Agra",
        minPrice: 20000,
        maxPrice: 80000,
        rating: 5.0
    },
    {
        id: 2,
        name: "Elegant Events Catering",
        category: "Caterer",
        location: "Agra",
        minPrice: 150,
        maxPrice: 600,
        rating: 4.5
    },
    {
        id: 3,
        name: "Dream Decor & Florals",
        category: "Decorator",
        location: "Mathura",
        minPrice: 30000,
        maxPrice: 120000,
        rating: 4.8
    },
    {
        id: 4,
        name: "Grand Palace Banquet",
        category: "Venue",
        location: "Agra",
        minPrice: 200000,
        maxPrice: 500000,
        rating: 4.6
    },
    {
        id: 5,
        name: "Beats & Beyond",
        category: "DJ",
        location: "Mathura",
        minPrice: 15000,
        maxPrice: 40000,
        rating: 4.3
    },
    {
        id: 6,
        name: "Glow Studio",
        category: "Makeup",
        location: "Agra",
        minPrice: 8000,
        maxPrice: 35000,
        rating: 4.9
    }
];

// Select HTML elements
const categoryInput = document.getElementById("category");
const locationInput = document.getElementById("location");
const minBudgetInput = document.getElementById("minBudget");
const maxBudgetInput = document.getElementById("maxBudget");

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const vendorGrid = document.getElementById("vendorGrid");

// Display vendor cards dynamically
function displayVendors(vendorList) {

    vendorGrid.innerHTML = "";

    if (vendorList.length === 0) {
        vendorGrid.innerHTML = `
            <p class="no-results">
                No vendors found. Try different filters!
            </p>
        `;
        return;
    }

    vendorList.forEach(vendor => {

        const vendorCard = document.createElement("div");

        vendorCard.className = "vendor-card";

        vendorCard.innerHTML = `
            <span class="tag">${vendor.category}</span>

            <h3>${vendor.name}</h3>

            <p class="muted">${vendor.location}</p>

            <p class="price">
                ₹${vendor.minPrice.toLocaleString("en-IN")}
                – ₹${vendor.maxPrice.toLocaleString("en-IN")}
            </p>

            <p class="rating">${vendor.rating} ★</p>

            <button class="btn-maroon"
                onclick="viewDetails(${vendor.id})">
                View details
            </button>
        `;

        vendorGrid.appendChild(vendorCard);
    });
}

// Filter vendors
function filterVendors() {

    const selectedCategory = categoryInput.value;
    const searchLocation = locationInput.value.trim().toLowerCase();

    const minBudget = minBudgetInput.value === ""
        ? 0
        : Number(minBudgetInput.value);

    const maxBudget = maxBudgetInput.value === ""
        ? Infinity
        : Number(maxBudgetInput.value);

    if (minBudget < 0 || maxBudget < 0 || minBudget > maxBudget) {
        alert("Please enter a valid budget range.");
        return;
    }

    const filteredVendors = vendors.filter(vendor => {

        const categoryMatch =
            selectedCategory === "All" ||
            vendor.category === selectedCategory;

        const locationMatch =
            vendor.location.toLowerCase().includes(searchLocation);

        // Check whether vendor's price range overlaps
        // with the user's selected budget range
        const budgetMatch =
            vendor.maxPrice >= minBudget &&
            vendor.minPrice <= maxBudget;

        return categoryMatch && locationMatch && budgetMatch;
    });

    displayVendors(filteredVendors);
}

// View vendor details
function viewDetails(vendorId) {

    const vendor = vendors.find(v => v.id === vendorId);

    if (vendor) {
        alert(
            `Vendor: ${vendor.name}\n` +
            `Category: ${vendor.category}\n` +
            `Location: ${vendor.location}\n` +
            `Price: ₹${vendor.minPrice} - ₹${vendor.maxPrice}\n` +
            `Rating: ${vendor.rating} ★`
        );
    }
}

// Search button
searchBtn.addEventListener("click", filterVendors);

// Reset filters
resetBtn.addEventListener("click", () => {

    categoryInput.value = "All";
    locationInput.value = "";
    minBudgetInput.value = "";
    maxBudgetInput.value = "";

    displayVendors(vendors);
});

// Initial vendor display
displayVendors(vendors);
