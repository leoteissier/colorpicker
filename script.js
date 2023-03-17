const colorPreview = document.querySelector(".colorPreview");
const colorPicker = document.getElementById("colorPicker");
const saveColorBtn = document.getElementById("saveColor");
const colorList = document.getElementById("colorList");
const clearColorsBtn = document.getElementById("clearColors");

// Fonction pour sauvegarder les couleurs dans le localStorage
function saveColors(colors) {
    try {
        localStorage.setItem("colors", JSON.stringify(colors));
    } catch (e) {
        console.error("Impossible de sauvegarder les couleurs", e);
    }
}

// Fonction pour charger les couleurs enregistrées depuis le localStorage
function loadColors() {
    const savedColors = localStorage.getItem("colors");
    if (savedColors) {
        const colors = JSON.parse(savedColors);
        colors.forEach((color) => {
            const newColor = document.createElement("div");
            newColor.classList.add("colorItem");
            newColor.style.backgroundColor = color;
            colorList.appendChild(newColor);
        });
        return colors;
    }
    return [];
}

// Tableau pour stocker les couleurs des colorItem
let colors = loadColors();

colorPicker.addEventListener("input", () => {
    const selectedColor = colorPicker.value;
    colorPreview.style.backgroundColor = selectedColor;
});

colorList.addEventListener("click", (event) => {
    const colorItem = event.target;
    if (colorItem.classList.contains("colorItem")) {
        const color = colorItem.style.backgroundColor;
        colorPreview.style.backgroundColor = color;
        colorPicker.value = color;
    }
});

saveColorBtn.addEventListener("click", () => {
    const selectedColor = colorPreview.style.backgroundColor;
    // Vérifie si la couleur sélectionnée existe déjà dans le tableau colors
    if (colors.includes(selectedColor)) {
        alert("Cette couleur est déjà enregistrée !");
        return;
    }
    const newColor = document.createElement("div");
    newColor.classList.add("colorItem");
    newColor.style.backgroundColor = selectedColor;
    colorList.appendChild(newColor);
    colors.push(selectedColor);
    saveColors(colors); // Sauvegarde les couleurs dans le localStorage
});

clearColorsBtn.addEventListener("click", () => {
    colorList.innerHTML = "<div class=\"colorItem\" style=\"background-color: #ff0000;\"></div>\n" +
        "        <div class=\"colorItem\" style=\"background-color: #00ff00;\"></div>\n" +
        "        <div class=\"colorItem\" style=\"background-color: #0000ff;\"></div>"; // Vide la div colorList
    colors = []; // Vide le tableau colors
    localStorage.removeItem("colors"); // Supprime les couleurs enregistrées du localStorage
});
