export function obtenerIniciales(nombre) {
    return nombre.split(' ').map(p => p[0].toUpperCase()).join('');
}