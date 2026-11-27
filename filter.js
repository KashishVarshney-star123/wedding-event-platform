
"use strict";

// Vendor Data
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

// Wait until HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Select HTML elements
    const categoryInput = document.getElementById("category");
    const locationInput = document.getElementById("location");
    const minBudgetInput = document.getElementById("minBudget");
    const maxBudgetInput = document.getElementById("maxBudget");

    const searchBtn = document.getElementById("searchBtn");
    const resetBtn = document.getElementById("resetBtn");
    const vendorGrid = document.getElementById("vendorGrid");

    // Check whether all HTML elements exist
    if (
        !categoryInput ||
        !locationInput ||
        !minBudgetInput ||
        !maxBudgetInput ||
        !searchBtn ||
        !resetBtn ||
        !vendorGrid
    ) {
        console.error("Error: HTML elements not found. Check your IDs.");
        return;
    }

    console.log("WedVista JavaScript connected successfully!");

    // Display vendor cards
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

        vendorList.forEach(function (vendor) {

            const card = document.createElement("div");

            card.className = "vendor-card";

            card.innerHTML = `
                <span class="tag">${vendor.category}</span>

                <h3>${vendor.name}</h3>

                <p class="muted">${vendor.location}</p>

                <p class="price">
                    ₹${vendor.minPrice.toLocaleString("en-IN")}
                    - ₹${vendor.maxPrice.toLocaleString("en-IN")}
                </p>

                <p class="rating">${vendor.rating} ★</p>

                <button type="button"
                    class="btn-maroon details-btn"
                    data-id="${vendor.id}">
                    View details
                </button>
            `;

            vendorGrid.appendChild(card);
        });
    }

    // Filter vendors
    function filterVendors() {

        const category = categoryInput.value;
        const location = locationInput.value.trim().toLowerCase();

        const minBudget = minBudgetInput.value === ""
            ? 0
            : Number(minBudgetInput.value);

        const maxBudget = maxBudgetInput.value === ""
            ? Infinity
            : Number(maxBudgetInput.value);

        // Validate budget
        if (
            !Number.isFinite(minBudget) ||
            minBudget < 0 ||
            maxBudget < 0 ||
            minBudget > maxBudget
        ) {
            alert("Please enter a valid budget range.");
            return;
        }

        // Apply all filters
        const filteredVendors = vendors.filter(function (vendor) {

            const categoryMatch =
                category === "All" ||
                vendor.category.toLowerCase() === category.toLowerCase();

            const locationMatch =
                location === "" ||
                vendor.location.toLowerCase().includes(location);

            // Check budget range overlap
            const budgetMatch =
                vendor.maxPrice >= minBudget &&
                vendor.minPrice <= maxBudget;

            return categoryMatch && locationMatch && budgetMatch;
        });

        console.log("Filtered vendors:", filteredVendors);

        displayVendors(filteredVendors);
    }

    // View vendor details using event delegation
    vendorGrid.addEventListener("click", function (event) {

        const button = event.target.closest(".details-btn");

        if (!button) return;

        const vendorId = Number(button.dataset.id);

        const vendor = vendors.find(function (item) {
            return item.id === vendorId;
        });

        if (vendor) {
            alert(
                "Vendor: " + vendor.name +
                "\nCategory: " + vendor.category +
                "\nLocation: " + vendor.location +
                "\nPrice: ₹" + vendor.minPrice.toLocaleString("en-IN") +
                " - ₹" + vendor.maxPrice.toLocaleString("en-IN") +
                "\nRating: " + vendor.rating + " ★"
            );
        }
    });

    // Search button
    searchBtn.addEventListener("click", filterVendors);

    // Reset button
    resetBtn.addEventListener("click", function () {

        categoryInput.value = "All";
        locationInput.value = "";
        minBudgetInput.value = "";
        maxBudgetInput.value = "";

        displayVendors(vendors);

        console.log("All filters reset!");
    });

    // Show all vendors initially
    displayVendors(vendors);

});
