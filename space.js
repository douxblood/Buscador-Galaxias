document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar'); 
    const inputBuscar = document.getElementById('inputBuscar'); 
    const contenedor = document.getElementById('contenedor'); 

    // Evento al botón de búsqueda que se ejecuta al hacer clic
    btnBuscar.addEventListener('click', () => {
        const query = inputBuscar.value.trim(); 
        if (query) { 
            fetchImagenes(query); // Llamamos a la función para buscar las imágenes
        }
    });

    // Función para hacer la solicitud a la API de NASA
    function fetchImagenes(query) {
        const url = `https://images-api.nasa.gov/search?q=${query}`; 

        // Realizamos la solicitud a la API usando fetch
        fetch(url)
            .then(response => {
                if (!response.ok) { 
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json(); 
            })
            .then(data => mostrarImagenes(data)) 
            .catch(error => console.error('Error al obtener los datos de la API:', error)); // Mostramos el error en consola
    }

    // Función para mostrar las imágenes en el contenedor
    function mostrarImagenes(data) {
        contenedor.innerHTML = ''; 
        const items = data.collection.items;  

        // Iteramos sobre cada elemento (imagen) devuelto por la API
        items.forEach(item => {
            const imagen = item.links[0]?.href || ''; // Obtenemos la URL de la imagen
            const titulo = item.data[0]?.title || 'Sin título';  // Obtenemos el título
            const descripcion = item.data[0]?.description || 'Sin descripción'; // Obtenemos la descripción
            const fecha = new Date(item.data[0]?.date_created).toLocaleDateString(); // Formateamos la fecha

            // Creamos una tarjeta de Bootstrap para cada imagen
            const tarjeta = `
                <div class="col-md-4 mb-4">  
                    <div class="card text-center"> 
                        <img src="${imagen}" class="card-img-top" alt="${titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5> 
                            <div class="card-text overflow-auto flex-grow-1" style="max-height: 100px;">
                                ${descripcion}
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">Fecha: ${fecha}</small>
                        </div>
                    </div>
                </div>
            `;
            // Añadimos la tarjeta al contenedor
            contenedor.innerHTML += tarjeta;  
        });
    }
});
