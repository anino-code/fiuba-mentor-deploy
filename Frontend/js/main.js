const cardContainer = document.getElementById('grid-tarjetas');


async function cargarCard() {

    try{
    cardContainer.innerHTML = '<p>Cargando datos del servidor simulado...</p>';

    const response = await fetch('http://localhost:3000/api/forms');

    if(!response.ok){
        throw new Error('No se pudo conectar con el servidor');
    }
    const datos = await response.json();
    await new Promise(resolve => setTimeout(resolve, 500));

    renderizarCards(datos);

    } catch (error){
        console.error("Error critico: ", error);
        cardContainer.innerHTML = `<p style = "color:red"> Error al cargar los datos: ${error.message}</p>`;

    }
}


cardContainer.addEventListener('click', (e) => {

    const btnAura = e.target.closest('.btn-aura');
    if (btnAura) {
        const id = btnAura.dataset.id;
        manejarAura(id, btnAura);
    }

        
    
    const btnContactar = e.target.closest('.btn-contactar');
    if (btnContactar) {
        const id = btnContactar.dataset.id;
        manejarContacto(id);
    }

    
});

async function manejarContacto(id) {
    try {
        console.log(` Conectando con base de datos para buscar ID: ${id}...`);

        const response = await fetch('../js/data/data.json'); 
        
        if (!response.ok) throw new Error("No se pudo leer el archivo de datos");

        const listaMentores = await response.json();

        const contacto = listaMentores.find(item => item.id === Number(id));

        if (!contacto) {
            throw new Error(`No se encontró información para el ID ${id}`);
        }

        const mensaje = `
        CONTACTO RECIBIDO DE DATA.JSON:
        -------------------------------
        Mentor: ${contacto.mentor}
        Materia: ${contacto.materia}
        Email: ${contacto.email || "No especificado"}
        
        `;

        alert(mensaje);

    } catch (error) {
        console.error("Error de lógica:", error);
        alert("Hubo un error al intentar contactar al mentor.");
    }
}

async function manejarAura(id, boton) {
    
    boton.classList.add('is-loading');
    boton.disabled = true;

    try {
        
        await new Promise(r => setTimeout(r, 800)); 
        
        
        const tagAura = document.getElementById(`aura-tag-${id}`);
        
        let valorActual = parseInt(tagAura.innerText.split('+')[1]);
        let nuevoValor = valorActual + 10;


        tagAura.innerText = `Aura +${nuevoValor}`;
        tagAura.classList.remove('is-light'); 
        tagAura.classList.add('is-warning');

    } catch (error) {
        console.error("Error al dar aura", error);
    } finally {
        
        boton.classList.remove('is-loading');
        boton.disabled = false;
    }
}

const CATEGORIAS_IMAGENES = [
    {
        
        palabrasClave: ['Fundamentos de programación','introcamejo', 'punteros', 'memoria', 'malloc', 'segfault', 'linux', 'bash', 'terminal'],
        url: 'https://fi.ort.edu.uy/innovaportal/file/127831/1/lenguajes-de-programacion.jpg'
    },
    {
        
        palabrasClave: ['el backend', 'bd', 'sql', 'base de datos', 'postgres', 'node', 'express', 'api', 'servidor'],
        url: 'https://images.unsplash.com/photo-1667372393119-c85c020799dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        
        palabrasClave: ['front', 'css', 'html', 'diseño', 'flexbox', 'grid', 'javascript'],
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=60'
    },
    {
        
        palabrasClave: ['Gradientes', 'algo', 'algoritmos', 'matematica', 'calculo', 'algebra', 'grafos', 'logica','Analisis Matematico 2'],
        url: 'https://cms.fi.uba.ar/uploads/large_Galeria_PC_05_08c39ef5dd.jpg'
    }
];

const IMAGEN_DEFAULT = 'https://www.uba.ar/storage/VHmQvvhSdMb9fxh3k5e4At0XS2BAnOdx7n1PcYkJ.jpg';

function obtenerImagenPorTexto(textoUsuario) {
    
    if (!textoUsuario) return null; 

    
    const textoLimpio = textoUsuario.toLowerCase(); 

    for (const categoria of CATEGORIAS_IMAGENES) {
        const coincide = categoria.palabrasClave.some(palabra => textoLimpio.includes(palabra));
        
        if (coincide) {
            return categoria.url; 
        }
    }

    return null; 
}


function renderizarCards(publicaciones){
    cardContainer.innerHTML = ' ';

    let htmlAcomulado ='';

    publicaciones.forEach(pub => {
    
    const imagenPortada = pub.foto_form || 
                        obtenerImagenPorTexto(pub.materia) || 
                        obtenerImagenPorTexto(pub.tema) || 
                        obtenerImagenPorTexto(pub.descripcion) || 
                        IMAGEN_DEFAULT;
    
            htmlAcomulado += `
                <div class="masonry-item">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${imagenPortada}" alt="${pub.tema}" style="object-fit: cover;">
                            </figure>
                        </div>
                        
                        <div class="card-content">
                            <p class="is-size-7 has-text-weight-bold has-text-info is-uppercase mb-1">${pub.materia}</p>
                            <p class="title is-5 has-text-weight-bold mb-2">${pub.tema}</p>
                            <p class="content is-size-6 has-text-grey mb-4">
                                ${pub.descripcion}
                            </p>
                            
                        <div class="buttons are-small mt-3">
                            <button class="button is-link is-outlined btn-contactar " data-id="${pub.id_form}">
                                Contactar
                            </button>
                            
                        </div>

                            <div class="media is-vcentered border-top pt-3 footer-card">
                                <div class="media-left">
                                    <figure class="image is-32x32">
                                        <img class="author-avatar" src="${pub.usuario.foto_user}" alt="Avatar">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="is-size-7 has-text-weight-semibold has-text-dark">${pub.usuario.nombre} ${pub.usuario.apellido}</p>
                                </div>
                                <div class="media-right">
                                    <span 
                                        class="tag is-light is-rounded is-small aura-interactiva btn-aura" 
                                        data-id="${pub.id_form}"
                                        id="aura-tag-${pub.id_form}">
                                        Aura +${pub.usuario.aura || 10}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                cardContainer.innerHTML = htmlAcomulado;
        });
}

cargarCard();