let productos = [];

// Obtener los productos guardados en el almacenamiento local al cargar la página
window.onload = function () {
  const productosGuardados = localStorage.getItem("productos");
  if (productosGuardados) {
    productos = JSON.parse(productosGuardados);
  }

  const proveedoresGuardados = localStorage.getItem("proveedores");
  if (proveedoresGuardados) {
    proveedores = JSON.parse(proveedoresGuardados);
    MostrarProveedores(); 
  }

};



function MostrarFormulario() {
  document.getElementById("btnActualizar").style.display="none";
    document.getElementById("btnGuardar").style.display="";
  document.getElementById("ListaProductos").style.display = "none";
  document.getElementById("FormularioIngreso").style.display = "block";
  document.getElementById("registroProveedor").style.display = "none";
  LimpiarFormulario();
}

function MostrarProveedores() {
  const proveedoresSelect = document.getElementById("proveedoresSelect");

  // Limpiar el menú desplegable antes de agregar los proveedores
  proveedoresSelect.innerHTML = "";

  // Crear la opción predeterminada "Seleccionar"
  const defaultOption = document.createElement("option");
  defaultOption.text = "Seleccionar";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  proveedoresSelect.add(defaultOption);

  // Agregar cada proveedor al menú desplegable
  proveedores.forEach((proveedor) => {
    const option = document.createElement("option");
    option.text = proveedor;
    proveedoresSelect.add(option);
  });
}


// Función para mostrar la lista de productos
function MostrarListaProductos() {
  document.getElementById("FormularioIngreso").style.display = "none";
  document.getElementById("ListaProductos").style.display = "block";
  document.getElementById("registroProveedor").style.display = "none";
  const tbody = document.getElementById("tbodyDatosProductos");

  // Limpiar la tabla antes de mostrar los datos
  tbody.innerHTML = "";

  productos.forEach((producto) => {
    const fila = `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.total}</td>
        <td>${producto.fecha}</td>
        <td>${producto.Proveedor}</td>
        <td><button class="btn btn-danger" onclick="EliminarProducto('${producto.id}')">Eliminar</button></td>
        </td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
}

function Guardar() {
  const nombre = document.getElementById("txtNombreProducto").value;
  const categoria = document.getElementById("cbxCategoria").value;
  const precio = document.getElementById("txtPrecio").value;
  const cantidad = document.getElementById("txtCantidadProductos").value;
  const total = document.getElementById("txtTotalProductos").value;
  const fecha = document.getElementById("txtFechaPublicacion").value;
  //proveedor
  const Proveedor = document.getElementById("proveedoresSelect").value;
  // La siguiente función la creo con el fin de crear un ID único para el producto agregado
  const id = new Date().getTime().toString();

  // Objeto
  const producto = {
    id,
    nombre,
    categoria,
    precio,
    cantidad,
    total,
    fecha,
    Proveedor
  };

  // Agregar el producto a la lista
  productos.push(producto);

  // Guardar la lista actualizada en el almacenamiento local
  localStorage.setItem("productos", JSON.stringify(productos));

  LimpiarFormulario();

  // Alerta al navegador para mostrar que la acción fue realizada correctamente
  alert("Producto agregado correctamente.");

  MostrarListaProductos();
}

// Función para actualizar un producto existente a través del nombre del producto
function Actualizar() {
  document.getElementById("btnGuardar").style.display="none";
  document.getElementById("btnActualizar").style.display="";
  const nombreProducto = document.getElementById("txtNombreProducto").value;

  const producto = productos.find((producto) => producto.nombre === nombreProducto);

  if (producto) {
    producto.categoria = document.getElementById("cbxCategoria").value;
    producto.precio = document.getElementById("txtPrecio").value;
    producto.cantidad = document.getElementById("txtCantidadProductos").value;
    producto.total = document.getElementById("txtTotalProductos").value;
    producto.fecha = document.getElementById("txtFechaPublicacion").value;
    producto.proveedor = document.getElementById("proveedoresSelect").value;

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("productos", JSON.stringify(productos));

    LimpiarFormulario();

    // Alerta al navegador para mostrar que la acción fue realizada correctamente
    alert("Producto actualizado correctamente.");

    MostrarListaProductos();
  } else {
    alert("Nombre de producto inválido.");
  }
}

// Función para eliminar un producto
function EliminarProducto(id) {
  const index = productos.findIndex((producto) => producto.id === id);
  if (index !== -1) {
    productos.splice(index, 1);

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto eliminado correctamente.");

    MostrarListaProductos();
  }
}

function LimpiarFormulario() {
  document.getElementById("txtNombreProducto").value = "";
  document.getElementById("cbxCategoria").value = "";
  document.getElementById("txtPrecio").value = "";
  document.getElementById("txtCantidadProductos").value = "";
  document.getElementById("txtTotalProductos").value = "";
  document.getElementById("txtFechaPublicacion").value = "";
}

// Función para calcular el total de productos
function CalcularTotalProducto() {
  const precio = document.getElementById("txtPrecio").value;
  const cantidad = document.getElementById("txtCantidadProductos").value;
  const total = precio * cantidad;

  document.getElementById("txtTotalProductos").value = total;
}




//===========================================//

function MostrarListaProductoEditar() {
  MostrarListaProductos();

  const formulario = document.getElementById("FormularioIngreso");
  document.getElementById("btnGuardar").style.display = "none";
  document.getElementById("btnActualizar").style.display = "block";

  formulario.style.display = "block";
}



//================================//

// Función para guardar los datos en el almacenamiento local
function guardarDatosProveedor() {
  var proveedor = document.getElementById("proveedor").value;

  // Verificar si el navegador admite almacenamiento local
  if (typeof(Storage) !== "undefined") {
    // Obtener los proveedores existentes del almacenamiento local
    var proveedores = localStorage.getItem("proveedores");
    if (!proveedores) {
      proveedores = [];
    } else {
      proveedores = JSON.parse(proveedores);
    }

    // Agregar el nuevo proveedor a la lista
    proveedores.push(proveedor);

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("proveedores", JSON.stringify(proveedores));
    alert("El proveedor se ha guardado correctamente.");
    cargarProveedores();
  } else {
    alert("Lo siento, tu navegador no admite almacenamiento local.");
  }
}

// Función para cargar los proveedores desde el almacenamiento local
function cargarProveedores() {
  var proveedores = localStorage.getItem("proveedores");
  if (proveedores) {
    proveedores = JSON.parse(proveedores);

    var select = document.getElementById("proveedoresSelect");

    // Limpiar el menú desplegable antes de agregar los proveedores
    select.innerHTML = "";

    // Agregar la opción "Seleccione su proveedor"
    var defaultOption = document.createElement("option");
    defaultOption.text = "Seleccione su proveedor";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.add(defaultOption);

    // Agregar los proveedores al menú desplegable
    for (var i = 0; i < proveedores.length; i++) {
      var option = document.createElement("option");
      option.text = proveedores[i];
      select.add(option);
    }
  }
}

function ingresarDatosProveedor() {
  document.getElementById("registroProveedor").style.display = "block";
  document.getElementById("ListaProductos").style.display = "none";
  document.getElementById("FormularioIngreso").style.display = "none";
}

