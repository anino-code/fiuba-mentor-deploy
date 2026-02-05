const cardContainer = document.getElementById('grid-tarjetas-review');

function abrirPopupCrearReview() {
    const popup = document.getElementById('popupOverlayCrearReview');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function cerrarPopupCrearReview() {
    const popup = document.getElementById('popupOverlayCrearReview');
    const form = document.getElementById('formCrearReview');
    if (form) {
        form.reset();
    }
    if (popup) {
        popup.style.display = 'none';
    }
}

function abrirPopupModificarReview(id) {
    const popup = document.getElementById('popupOverlayModificarReview' + id);
    if (popup) {
        popup.style.display = 'flex';
    }
}

function cerrarPopupModificarReview(id) {
    const popup = document.getElementById('popupOverlayModificarReview' + id);
    const form = document.getElementById('formModificarReview');
    if (form) {
        form.reset();
    }
    if (popup) {
        popup.style.display = 'none';
    }
}

function confirmacionEliminarReview(id_review, boton) {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este review?");
    if (confirmar) {
        eliminarReview(id_review, boton);
    }
}

async function eliminarReview(id_review, boton) {
    if (!id_review) return console.error("Error: No hay ID de Review");
    try {
        console.log(`Eliminando review ${id_review}...`);
        const response = await fetch(`http://localhost:3000/api/reviews/${id_review}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Error en servidor");
        }
        const masonryItem = boton.closest(".masonry-item");
        if (masonryItem) {
            masonryItem.remove();
        }
        const review = await response.json();
        console.log("Review eliminada:", review);
    } catch (error) {
        console.error("Fallo eliminar review:", error);
        alert(error.message); 
    }
}

function renderizarReviews(reviews){
    cardContainer.innerHTML = ' ';
    let htmlAcomulado ='';
    reviews.forEach(review => {
        const cardHTML = `
            <div class="masonry-item" data-id="${review.id_review}">
                <div class="card">
                    <div class="card-content has-text-centered">
                        <p class="content is-size-6 has-text-black mb-4">
                            ${review.descripcion}
                        </p>
                        <p class="is-size-7 mb-2">Aura: ${review.aura}</p>
                    </div>
                    <div class="media is-vcentered has-text-centered border-top pt-1 mb-2 footer-card">
                        <div class="media-content">
                            <figure class="image is-32x32 is-inline-block">
                                <img class="author-avatar" src="${review.puntuador.foto_user}" alt="Avatar">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="is-size-6 has-text-weight-semibold mt-2 has-text-dark">${review.puntuador.nombre} ${review.puntuador.apellido}</p>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item button is-white is-small" onclick="confirmacionEliminarReview(${review.id_review}, this)">Eliminar review</a>
                        <a class="card-footer-item button is-white is-small" onclick="abrirPopupModificarReview(${review.id_review})">Modificar review</a>
                    </footer>
                </div>
                <div class="popup-overlay" id="popupOverlayModificarReview${review.id}">
                    <div class="popup-content" id="popupContent">
                        <h2 class="tituloPopup">Modificar review</h2>
                        <form id="formModificarReview">
                            <div class="field">
                                <label class="label" for="Nombre">Nombre:</label>
                                <div class="control">
                                    <input class="input" type="text" id="Nombre" value="${review.nombre}" name="Nombre" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="Apellido">Apellido:</label>
                                <div class="control">
                                    <input class="input" type="text" id="Apellido" value="${review.apellido}" name="Apellido" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="Carrera">Carrera:</label>
                                <div class="control">
                                    <input class="input" type="text" id="Carrera" value="${review.carrera}" name="Carrera" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="Email">Email:</label>
                                <div class="control">
                                    <input class="input" type="email" id="Email" value="${review.email}" name="Email" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="Foto">Foto de review:</label>
                                <div class="control">
                                    <input class="input" type="url" id="Foto" value="${review.fotoreview}" name="Foto" required>
                                </div>
                            </div>
                        </form>
                        <div class="botones-popup">
                            <button class="button botonPopup is-link is-normal" onclick="cerrarPopupModificarReview(${review.id})">
                                Cancelar
                            </button>
                            <button class="button botonPopup is-link is-normal" type="submit" id="botonModificar" form="formModificarReview">
                                Modificar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
    });
}

async function cargarCard() {
    try{
    const response = await fetch('http://localhost:3000/api/reviews');
    const datos = await response.json();
    renderizarReviews(datos);
    } catch (error){
        console.error("Error critico: ", error);
        cardContainer.innerHTML = `<p style = "color:red"> Error al cargar los datos: ${error.message}</p>`;
    }
}

cargarCard();