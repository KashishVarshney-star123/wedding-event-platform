
// =====================================
// WEDVISTA - SMART FAVORITES SYSTEM
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    // Existing saved favorites are preserved
    let favorites = [];

    try {
        const saved = JSON.parse(
            localStorage.getItem("wedvistaFavorites")
        );

        favorites = Array.isArray(saved) ? saved : [];
    } catch (error) {
        favorites = [];
    }

    // Identify service names
    const serviceNames = [
        "Venue Planning",
        "Vendor Management",
        "Guest Management",
        "Budget Planning"
    ];

    // Show notification
    function showToast(message) {

        let toast = document.querySelector("#favorite-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "favorite-toast";
            toast.className = "favorite-toast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.favoriteToastTimer);

        window.favoriteToastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2500);
    }

    // Save favorites
    function saveFavorites() {
        localStorage.setItem(
            "wedvistaFavorites",
            JSON.stringify(favorites)
        );
    }

    // Create and update favorites section
    function updateFavoritesSection() {

        let section = document.querySelector("#my-favorites");

        if (!section) {
            section = document.createElement("section");
            section.id = "my-favorites";
            section.className = "my-favorites";

            const categorySection =
                document.querySelector(".event-categories");

            if (categorySection) {
                categorySection.appendChild(section);
            } else {
                return;
            }
        }

        const eventFavorites = favorites.filter(
            name => !serviceNames.includes(name)
        );

        const serviceFavorites = favorites.filter(
            name => serviceNames.includes(name)
        );

        section.innerHTML = `
            <h2>♥ My Favorites (<span id="favorite-count">${favorites.length}</span>)</h2>

            <p class="favorite-description">
                Your favourite events and services, all in one place.
            </p>

            <div class="favorite-controls">

                <input
                    type="search"
                    id="favorite-search"
                    placeholder="Search your favorites..."
                    aria-label="Search favorites"
                >

                <div class="favorite-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="events">Events</button>
                    <button class="filter-btn" data-filter="services">Services</button>
                </div>

                <button type="button" id="remove-all-favorites">
                    Remove All
                </button>

            </div>

            <div class="favorite-list" id="favorite-results"></div>
        `;

        const searchInput = section.querySelector("#favorite-search");
        const filterButtons = section.querySelectorAll(".filter-btn");
        const results = section.querySelector("#favorite-results");

        let currentFilter = "all";

        function renderFavorites() {

            const searchText = searchInput.value.toLowerCase();

            const filtered = favorites.filter(function (name) {

                const isService = serviceNames.includes(name);

                const matchesFilter =
                    currentFilter === "all" ||
                    (currentFilter === "services" && isService) ||
                    (currentFilter === "events" && !isService);

                return matchesFilter &&
                    name.toLowerCase().includes(searchText);
            });

            results.innerHTML = "";

            if (filtered.length === 0) {
                results.textContent = favorites.length
                    ? "No matching favorites found."
                    : "You haven't saved any favorites yet. Click a heart to add one!";

                return;
            }

            filtered.forEach(function (name) {

                const item = document.createElement("div");
                item.className = "favorite-item";

                const title = document.createElement("span");
                title.textContent = "♥ " + name;

                const removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.className = "remove-favorite";
                removeButton.textContent = "×";
                removeButton.setAttribute(
                    "aria-label",
                    "Remove " + name + " from favorites"
                );

                removeButton.addEventListener("click", function () {

                    favorites = favorites.filter(
                        item => item !== name
                    );

                    saveFavorites();
                    updateHearts();
                    showToast(name + " removed from favorites!");
                });

                item.appendChild(title);
                item.appendChild(removeButton);
                results.appendChild(item);
            });
        }

        searchInput.addEventListener("input", renderFavorites);

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                currentFilter = button.dataset.filter;

                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                renderFavorites();
            });
        });

        section.querySelector("#remove-all-favorites")
            .addEventListener("click", function () {

                if (favorites.length === 0) {
                    showToast("Your favorites list is already empty!");
                    return;
                }

                const confirmed = confirm(
                    "Are you sure you want to remove all favorites?"
                );

                if (confirmed) {
                    favorites = [];
                    saveFavorites();
                    updateHearts();
                    showToast("All favorites removed!");
                }
            });

        renderFavorites();
    }

    // Update all heart buttons
    function updateHearts() {

        favoriteButtons.forEach(function (button) {

            const name = button.dataset.favorite;
            const isFavorite = favorites.includes(name);

            button.classList.toggle("active", isFavorite);
            button.textContent = isFavorite ? "♥" : "♡";
            button.setAttribute("aria-pressed", isFavorite);

            button.setAttribute(
                "aria-label",
                isFavorite
                    ? "Remove " + name + " from favorites"
                    : "Add " + name + " to favorites"
            );
        });

        updateFavoritesSection();
    }

    // Add or remove favorites
    favoriteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.favorite;

            if (!name) return;

            if (favorites.includes(name)) {

                favorites = favorites.filter(
                    item => item !== name
                );

                showToast(name + " removed from favorites!");

            } else {

                favorites.push(name);

                showToast(name + " added to favorites!");
            }

            saveFavorites();
            updateHearts();
        });
    });

    // Restore saved favorites on page load
    updateHearts();

});
