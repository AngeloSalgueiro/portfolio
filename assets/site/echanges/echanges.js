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
    
        
        document.querySelectorAll(".cartes").forEach(img => {
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



displayCardOnClick();