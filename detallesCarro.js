document.addEventListener('DOMContentLoaded', () => {
    const productosSeleccionadosContainer = document.getElementById('productosSeleccionados');
    const productosSeleccionadosString = localStorage.getItem('productosSeleccionados');

    if (productosSeleccionadosString) {
        const productosSeleccionados = JSON.parse(productosSeleccionadosString);

        if (productosSeleccionados.length > 0) {
            productosSeleccionados.forEach(producto => {
                const li = document.createElement('li');
                li.classList.add('producto');

                const img = document.createElement('img');
                img.src = producto.imagen;
                img.alt = producto.nombre;

                const h3 = document.createElement('h3');
                h3.textContent = producto.nombre;

                const pDescripcion = document.createElement('p');
                pDescripcion.textContent = producto.descripcion;

                const pPrecio = document.createElement('p');
                pPrecio.textContent = `Precio: $${producto.precio.toFixed(2)}`;

                const pCantidad = document.createElement('p');
                pCantidad.textContent = `Cantidad: ${producto.cantidad}`;

                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.onclick = () => eliminarProducto(producto.nombre);
                
                li.appendChild(img);
                li.appendChild(h3);
                li.appendChild(pDescripcion);
                li.appendChild(pPrecio);
                li.appendChild(pCantidad);
                li.appendChild(btnEliminar);
                productosSeleccionadosContainer.appendChild(li);
            });
        } else {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No hay productos seleccionados';
            productosSeleccionadosContainer.appendChild(mensaje);
        }
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay productos seleccionados';
        productosSeleccionadosContainer.appendChild(mensaje);
    }
});

function eliminarProducto(nombreProducto) {
    let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];
    const index = productosSeleccionados.findIndex(producto => producto.nombre === nombreProducto);

    if (index !== -1) {
        // Reducir la cantidad del producto en 1 si hay más de uno
        if (productosSeleccionados[index].cantidad > 1) {
            productosSeleccionados[index].cantidad--;
        } else {
            // Eliminar el producto si solo hay uno
            productosSeleccionados.splice(index, 1);
        }
        localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const priceBox = document.querySelector('.priceBox');
    const productosSeleccionadosString = localStorage.getItem('productosSeleccionados');

    if (productosSeleccionadosString) {
        const productosSeleccionados = JSON.parse(productosSeleccionadosString);
        
        // Calcular el total a pagar
        const total = productosSeleccionados.reduce((accumulator, producto) => accumulator + (producto.precio * producto.cantidad), 0); 
        
        // Crear la estructura HTML
        const priceDetails = productosSeleccionados.map(producto => {
            return `
                <p>${producto.nombre} - Precio: $${(producto.precio * producto.cantidad).toFixed(2)} </br> Cantidad: ${producto.cantidad}</p>`; 
        }).join('');
        
        // Agregar los detalles de precio y productos al priceBox
        if (priceBox) {
            if (total > 0) {
                priceBox.innerHTML = `
                    <div class="priceDetails">
                        ${priceDetails}
                        <hr>
                        <p>Total a pagar: $${total.toFixed(2)}</p>
                    </div>
                    <div class="pagoBtns">                    
                        <div class="pagarBtnBox">
                            <button class="pagarBtn">Realizar pago</button>
                        </div>
                        <div class="cancelarBtnBox">
                            <button class="cancelarBtn">Cancelar Compra</button>
                        </div>
                    </div>
                `;
            } else {
                priceBox.innerHTML = ''; // Vaciar el contenido del priceBox
                priceBox.innerHTML = '<p>No hay productos seleccionados</p>'; // Mostrar mensaje cuando no hay productos
            }
        } else {
            console.error('El elemento priceBox no está definido en el HTML.');
        }
    } else {
        console.error('No hay productos seleccionados');
    }
});