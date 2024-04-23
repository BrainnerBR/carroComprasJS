const productos = [
    {
        nombre: 'Mouse',
        imagen: 'https://assets2.razerzone.com/images/pnx.assets/89b592e45a60be05a671c021f3363ac0/razer-mamba-elite_500x500.png',
        descripcion: 'descripcion del mouse',
        descripcionL: 'Descripcion mas a detalle del producto',
        precio: 35,
        marca: 'razer'
    },
    {
        nombre: 'Teclado',
        imagen: 'https://assets2.razerzone.com/images/pnx.assets/9732ff8f142d1addf175aca151a7192d/razer-cynosa-v2-500x500.png',
        descripcion: 'Descripción del teclado',
        descripcionL: 'Descripcion mas a detalle del producto',
        precio: 45
    },
    {
        nombre: 'Headset',
        imagen: 'https://www.bestcell.com.ec/imgadmin/storage/imagenes_articulos/1111/4958.jpg.webp',
        descripcion: 'Descripción del headset',
        descripcionL: 'Descripcion mas a detalle del producto',
        precio: 40,
        marca: 'razer'
    },
    {
        nombre: 'Mousepad',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_671359-MLA27216746958_042018-O.webp',
        descripcion: 'Descripción del mousepad',
        descripcionL: 'Descripcion mas a detalle del producto',
        precio: 20,
        marca: 'razer'
    },
    {
        nombre: 'Parlante',
        imagen: 'https://www.jbl.co.cr/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw2aaf26a0/pdp//JBL_CHARGE5_BLACK_Box_Image_1605x1605px.png?sw=590&sfrm=png',
        descripcion: 'Descripción del Parlante',
        descripcionL: 'Descripcion mas a detalle del producto',
        precio: 100,
        marca: 'jbl'
    },
    {
        nombre: 'Monitor curvo',
        imagen: 'https://cyberteamcr.com/wp-content/uploads/2023/09/91-C8-CTFCk-BL-AC-UF894-1000-QL8-1.webp',
        descripcion: 'Descripción del Monitor',
        descripcionL: 'Descripcion mas a detalle del producto',
        precio: 90,
        marca: 'samsung'
    },


];

document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productosContainer');

    if (productosContainer) {
        productos.forEach(producto => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;

            const infoContainerDiv = document.createElement('div');
            infoContainerDiv.classList.add('infoContainer');

            const h2 = document.createElement('h2');
            h2.textContent = producto.nombre;

            const pDescripcion = document.createElement('p');
            pDescripcion.textContent = producto.descripcion;

            const pPrecio = document.createElement('p');
            pPrecio.textContent = `Precio: $${producto.precio}`;

            const button = document.createElement('button');
            button.textContent = 'Agregar al carrito';
            button.onclick = () => {
                agregarAlCarrito(producto);
                actualizarIconCarrito();
            };

            const buttonInfo = document.createElement('button');
            buttonInfo.textContent = 'Ver Producto'
            buttonInfo.onclick = () => {
                swal({
                    title: producto.nombre,
                    text: producto.descripcionL,
                    icon: producto.imagen,
                    buttons: {
                        cancel: "Volver",
                        comprar: {
                            text: "Agregar al Carrito",
                            value: "comprar"
                        }
                    }
                }).then((value) => {
                    if (value === "comprar") {
                        agregarAlCarrito(producto);
                        actualizarIconCarrito();
                    }
                });
            };
            
            infoContainerDiv.appendChild(h2);
            infoContainerDiv.appendChild(pDescripcion);
            infoContainerDiv.appendChild(pPrecio);
            //  infoContainerDiv.appendChild(button);
            infoContainerDiv.appendChild(buttonInfo);

            cardDiv.appendChild(img);
            cardDiv.appendChild(infoContainerDiv);

            productosContainer.appendChild(cardDiv); 
        });
    } else {
        console.error('El contenedor de productos no está definido en el HTML.');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productosContainer');

    if (productosContainer) {
        const btnContainer = document.getElementById('btnContainer');
        const cards = []; // Array para almacenar las tarjetas de producto

        // Crear las tarjetas de producto
        productos.forEach(producto => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.setAttribute('data-marca', producto.marca);

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;

            const infoContainerDiv = document.createElement('div');
            infoContainerDiv.classList.add('infoContainer');

            const h2 = document.createElement('h2');
            h2.textContent = producto.nombre;

            const pDescripcion = document.createElement('p');
            pDescripcion.textContent = producto.descripcion;

            const pPrecio = document.createElement('p');
            pPrecio.textContent = `Precio: $${producto.precio}`;

            const button = document.createElement('button');
            button.textContent = 'Agregar al carrito';
            button.onclick = () => {
                agregarAlCarrito(producto);
                actualizarIconCarrito();
            };

            const buttonInfo = document.createElement('button');
            buttonInfo.textContent = 'Ver Producto'
            buttonInfo.onclick = () => {
                swal({
                    title: producto.nombre,
                    text: producto.descripcionL,
                    icon: producto.imagen,
                    buttons: {
                        cancel: "Volver",
                        comprar: {
                            text: "Agregar al Carrito",
                            value: "comprar"
                        }
                    }
                }).then((value) => {
                    if (value === "comprar") {
                        agregarAlCarrito(producto);
                        actualizarIconCarrito();
                    }
                });
            };
            
            infoContainerDiv.appendChild(h2);
            infoContainerDiv.appendChild(pDescripcion);
            infoContainerDiv.appendChild(pPrecio);
            infoContainerDiv.appendChild(buttonInfo);

            cardDiv.appendChild(img);
            cardDiv.appendChild(infoContainerDiv);

            cards.push(cardDiv); // Agregar la tarjeta al array
        });

        // Mostrar todos los productos al cargar la página
        mostrarProductos(cards);

        // Filtrar productos al hacer clic en los botones
        btnContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn')) {
                const marca = event.target.getAttribute('data-marca');
                const filteredCards = marca === 'all' ? cards : cards.filter(card => card.getAttribute('data-marca') === marca);
                mostrarProductos(filteredCards);
            }
        });
    } else {
        console.error('El contenedor de productos no está definido en el HTML.');
    }
});

// Función para mostrar los productos en el contenedor
function mostrarProductos(cards) {
    const productosContainer = document.getElementById('productosContainer');
    productosContainer.innerHTML = ''; // Limpiar el contenedor
    cards.forEach(card => {
        productosContainer.appendChild(card);
    });
}















