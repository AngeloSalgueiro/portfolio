let text = "";

for (let i = 1; i < 100; i++) {
    text += `<div class="card">
    <img src="assets_cards/A1_0${i}.png" alt="" title="">
</div>\n`;
}

for (let i = 100; i <= 286; i++) {
    text += `<div class="card">
    <img src="assets_cards/A1_${i}.png" alt="" title="">
</div>\n`;
}


function changeColorOnClick() {
    let divRarity = document.querySelectorAll(".raretes_hover");

    divRarity.forEach(div => {
        
        div.style.backgroundColor = "#FFFFFF";  

        div.addEventListener("click", () => {
            
            if (div.style.backgroundColor === "rgb(168, 216, 240)") { 
                div.style.backgroundColor = "#FFFFFF"; 
                
            } else {
                div.style.backgroundColor = "#A8D8F0"; 
                
            }
        });
    });
}


function displayCardOnClick(){
    document.addEventListener("DOMContentLoaded", function () {
    
        const modal = document.createElement("div");
        modal.id = "modal";
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <img id="modal-image" src="" alt="Carte Pokémon">
            </div>
        `;
        document.body.appendChild(modal);
    
        const modalImage = document.getElementById("modal-image");
    
    
        function openModal(imageSrc) {
            modalImage.src = imageSrc;
            modal.style.display = "flex";
        }
    
        function closeModal() {
            modal.style.display = "none";
        }
    
        
        document.querySelectorAll(".pokedex .card img").forEach(img => {
            img.addEventListener("click", function () {
                const imageSrc = this.src;
                openModal(imageSrc);
            });
        });
    
    
        modal.addEventListener("click", function (event) {
            if (event.target === modal) closeModal();
        });
    });
}




changeColorOnClick();

displayCardOnClick();

