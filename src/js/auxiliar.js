
const avanzarCarrusel = (elemento) => {

  elemento.appendChild(elemento.firstElementChild);
};

const retrocederCarrusel = (elemento) => {
  elemento.insertBefore(elemento.lastElementChild, elemento.firstElementChild);
};

const solicitarDatos = async (email, password) => {
  let data = `email=${email.value}&password=${password.value}`;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  let respuesta = await fetch('https://primerapp-nodeudemy.herokuapp.com/login', {
    method: 'POST',
    headers: myHeaders,
    body: data,
  });

  const datos = await respuesta.json();
  const token = datos.token;
  const usuario = datos.Usuario.nombre;
  return {
    usuario,
    token
  };

};

const videojuegos = async (elemento, i) => {

  const respuesta = await fetch('https://primerapp-nodeudemy.herokuapp.com/producto');
  if (!respuesta.ok) {
    throw new Error('Error');
  }
  const datos = await respuesta.json();
  const imagenRespuesta = datos.productos[ i ].img;

  const div = document.createElement('div');

  div.innerHTML = `
    <table class="tabla" id="tabla-${i}">
              <thead>
                <tr>
                  <th colspan="3">${datos.productos[ i ].nombre}</th>
                </tr>
              </thead>
              <tbody>
                <tr id="imagen">
                  <td id="respImagen" colspan="3">
                  <img src="${imagenRespuesta}" alt="${datos.productos[ i ].descripcion}"/>
                  </td>
                </tr>
                <tr>
                  <td class="footer" colspan="2">${datos.productos[ i ].categoria.descripcion}</td>
                  <td class="footer">$${datos.productos[ i ].precioUni}</td>
                </tr>
              </tbody>`;
  elemento.firstElementChild.nextElementSibling.remove();
  elemento.appendChild(div.firstElementChild);

  return datos.productos;
};

export {
  avanzarCarrusel,
  retrocederCarrusel,
  solicitarDatos,
  videojuegos
};