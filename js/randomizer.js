document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const display = document.getElementById("display");
    const assembleButton = document.getElementById("assemble-btn");
    let selectedCategories = ["vanguard", "strategist", "duelist"];
    let isPicking = false;
    let characters = {};
    let isDataLoaded = false;

    // Load character data
    fetch("./js/characters.json")
        .then(response => response.json())
        .then(data => {
            characters = data;
            isDataLoaded = true; // Data is fully loaded
        })
        .catch(error => console.error("Error loading character data:", error));

    // Toggle categories
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            this.classList.toggle("active");

            if (selectedCategories.includes(category)) {
                selectedCategories = selectedCategories.filter(c => c !== category);
            } else {
                selectedCategories.push(category);
            }

            // Ensure at least one category is always active
            if (selectedCategories.length === 0) {
                selectedCategories.push(category);
                this.classList.add("active");
            }
        });
    });

    // Assemble function
    assembleButton.addEventListener("click", () => {
        if (!isDataLoaded) {
            alert("Character data is still loading. Please wait a moment!");
            return;
        }
        if (isPicking) return;

        // Combine characters from selected categories
        const combinedCharacters = selectedCategories.flatMap(category => characters[category] || []);

        if (combinedCharacters.length === 0) {
            alert("Please select at least one category!");
            return;
        }

        isPicking = true;
        let iterations = 0;
        const totalSteps = 35;
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * combinedCharacters.length);
            display.textContent = combinedCharacters[randomIndex];

            iterations++;
            if (iterations >= totalSteps) {
                clearInterval(interval);
                isPicking = false;
            }
        }, 50 + iterations * 4);
    });
});
