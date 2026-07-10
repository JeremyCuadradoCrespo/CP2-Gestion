const COLUMNAS_ESPERADAS = ["nombre", "apellido", "telefono", "correo", "categoria", "notas"];

function parsearLinea(linea) {
  const campos = [];
  let actual = "";
  let dentroComillas = false;

  for (let i = 0; i < linea.length; i += 1) {
    const caracter = linea[i];

    if (caracter === '"') {
      if (dentroComillas && linea[i + 1] === '"') {
        actual += '"';
        i += 1;
      } else {
        dentroComillas = !dentroComillas;
      }
      continue;
    }

    if (caracter === "," && !dentroComillas) {
      campos.push(actual);
      actual = "";
      continue;
    }

    actual += caracter;
  }

  campos.push(actual);
  return campos.map((campo) => campo.trim());
}

/**
 * Convierte texto CSV (con encabezado) en una lista de objetos de contacto.
 * Encabezados esperados: nombre, apellido, telefono, correo, categoria, notas (opcional).
 */
export function parsearContactosCSV(textoCSV) {
  const lineas = textoCSV
    .split(/\r\n|\n|\r/)
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 0);

  if (lineas.length === 0) {
    return { contactos: [], errores: ["El archivo esta vacio."] };
  }

  const encabezado = parsearLinea(lineas[0]).map((campo) => campo.toLowerCase());
  const columnasFaltantes = COLUMNAS_ESPERADAS.filter(
    (columna) => columna !== "notas" && !encabezado.includes(columna)
  );

  if (columnasFaltantes.length > 0) {
    return {
      contactos: [],
      errores: [`Faltan columnas obligatorias en el encabezado: ${columnasFaltantes.join(", ")}.`]
    };
  }

  const contactos = [];
  const errores = [];

  for (let i = 1; i < lineas.length; i += 1) {
    const valores = parsearLinea(lineas[i]);
    const contacto = {};

    encabezado.forEach((columna, indice) => {
      if (COLUMNAS_ESPERADAS.includes(columna)) {
        contacto[columna] = valores[indice] ?? "";
      }
    });

    if (Object.values(contacto).every((valor) => !valor)) {
      continue;
    }

    contacto.notas = contacto.notas || "";
    contactos.push(contacto);
  }

  if (contactos.length === 0) {
    errores.push("No se encontraron filas de contactos validas en el archivo.");
  }

  return { contactos, errores };
}
