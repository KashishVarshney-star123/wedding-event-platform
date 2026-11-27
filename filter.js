"use strict";

// Vendor data
const vendors = [
    { id: 1, name: "Royal Photography Studio", category: "Photographer", location: "Agra",    minPrice: 20000,  maxPrice: 80000,  rating: 5.0 },
    { id: 2, name: "Elegant Events Catering",  category: "Caterer",      location: "Agra",    minPrice: 150,    maxPrice: 600,    rating: 4.5, unit: "/ plate" },
    { id: 3, name: "Dream Decor & Florals",    category: "Decorator",    location: "Mathura", minPrice: 30000,  maxPrice: 120000, rating: 4.8 },
    { id: 4, name: "Grand Palace Banquet",     category: "Venue",        location: "Agra",    minPrice: 200000, maxPrice: 500000, rating: 4.6 },
    { id: 5, name: "Beats & Beyond",           category: "DJ",           location: "Mathura", minPrice: 15000,  maxPrice: 40000,  rating: 4.3 },
    { id: 6, name: "Glow Studio",              category: "Makeup",       location: "Agra",    minPrice: 8000,   maxPrice: 35000,  rating: 4.9 }
];

// Select HTML elements
const ids = ["category", "location", "minBudget", "maxBudget", "searchBtn", "resetBtn", "vendorGrid"];
const missing = ids.filter(id => !document.getElementById(id));

if (missing.length > 0) {
    // Console me dikhega ki HTML me kaunsi ID missing hai
    console.error("HTML me ye IDs missing hain:", missing.join(", "));
} else {
    init();
}

function init() {
    const categoryInput  = document.getElementById("category");
    const locationInput  = document.getElementById("location");
    const minBudgetInput = document.getElementById("minBudget");
    const maxBudgetInput = document.getElementById("maxBudget");
    const searchBtn      = document.getElementById("searchBtn");
    const resetBtn       = document.getElementById("resetBtn");
    const vendorGrid     = document.getElementById("vendorGrid");

    const formatPrice = n => "₹" + n.toLocaleString("en-IN");

    // Display vendor cards
    function displayVendors(list) {
        vendorGrid.innerHTML = "";

        if (list.length === 0) {
            vendorGrid.innerHTML = `<p class="no-results">No vendors found. Try different filters!</p>`;
            return;
        }

        list.forEach(vendor => {
            const card = document.createElement("div");
            card.className = "vendor-card";
            card.innerHTML = `
                <span class="tag">${vendor.category}</span>
                <h3>${vendor.name}</h3>
                <p class="muted">${vendor.location}</p>
                <p class="price">
                    ${formatPrice(vendor.minPrice)} – ${formatPrice(vendor.maxPrice)} ${vendor.unit || ""}
                </p>
                <p class="rating">${vendor.rating.toFixed(1)} ★</p>
                <button type="button" class="btn-maroon" data-id="${vendor.id}">View details</button>
            `;
            vendorGrid.appendChild(card);
        });
    }

    // Filter vendors
    function filterVendors() {
        const selectedCategory = categoryInput.value;
        const searchLocation   = locationInput.value.trim().toLowerCase();

        const minBudget = minBudgetInput.value === "" ? 0        : Number(minBudgetInput.value);
        const maxBudget = maxBudgetInput.value === "" ? Infinity : Number(maxBudgetInput.value);

        if (minBudget < 0 || maxBudget < 0 || minBudget > maxBudget) {
            alert("Please enter a valid budget range.");
            return;
        }

        const filtered = vendors.filter(vendor => {
            const categoryMatch = selectedCategory === "All" || vendor.category === selectedCategory;
            const locationMatch = vendor.location.toLowerCase().includes(searchLocation);
            // Vendor ki price range user ki budget range se overlap kare
            const budgetMatch   = vendor.maxPrice >= minBudget && vendor.minPrice <= maxBudget;

            return categoryMatch && locationMatch && budgetMatch;
        });

        displayVendors(filtered);
    }

    // View details (event delegation)
    vendorGrid.addEventListener("click", e => {
        const btn = e.target.closest("button[data-id]");
        if (!btn) return;

        const vendor = vendors.find(v => v.id === Number(btn.dataset.id));
        if (vendor) {
            alert(
                `Vendor: ${vendor.name}\n` +
                `Category: ${vendor.category}\n` +
                `Location: ${vendor.location}\n` +
                `Price: ${formatPrice(vendor.minPrice)} - ${formatPrice(vendor.maxPrice)} ${vendor.unit || ""}\n` +
                `Rating: ${vendor.rating.toFixed(1)} ★`
            );
        }
    });

    // Search button + Enter key
    searchBtn.addEventListener("click", filterVendors);
    [locationInput, minBudgetInput, maxBudgetInput].forEach(input => {
        input.addEventListener("keydown", e => {
            if (e.key === "Enter") filterVendors();
        });
    });

    // Reset
    resetBtn.addEventListener("click", () => {
        categoryInput.value  = "All";
        locationInput.value  = "";
        minBudgetInput.value = "";
        maxBudgetInput.value = "";
        displayVendors(vendors);
    });

    // Initial display
    displayVendors(vendors);
}