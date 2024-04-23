let contadorCarrito = parseInt(localStorage.getItem('contadorCarrito')) || 0;

window.onload = function() {
    actualizarIconCarrito();
};

function agregarAlCarrito(producto) {
    let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

    const index = productosSeleccionados.findIndex(p => p.nombre === producto.nombre);

    if (index !== -1) {
        productosSeleccionados[index].cantidad++;
    } else {
        producto.cantidad = 1; 
        productosSeleccionados.push(producto); 
    }

    localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));

    contadorCarrito++;
    localStorage.setItem('contadorCarrito', contadorCarrito);

    swal({
        title: 'Producto Agregado',
        icon: 'success'
    });
}

function actualizarIconCarrito() {
    const productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];
    const contador = productosSeleccionados.reduce((total, producto) => total + producto.cantidad, 0); 
    const bubbleAlert = document.getElementById('bubbleAlert');
    
    if (bubbleAlert) {
        if (contador === 0) {
            bubbleAlert.style.display = 'none';
        } else {
            bubbleAlert.style.display = 'inline-block';
            bubbleAlert.textContent = contador > 9 ? '9+' : contador;
        }
    } else {
        console.error('El elemento bubbleAlert no está definido en el HTML.');
    }
}
