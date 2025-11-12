export function obtenerColorPorRol(rol) {
    const coloresPorRol = {
        Consultor: {
            background:'#A3C8FF',
            border: '#006affff',
        },
        
        Consultora: {
            background:'#A3C8FF',
            border: '#006affff',
        },

        Manager: {
            background: '#FF8080',
            border: '#e00000ff',
        },
        
        Cliente: {
            background: '#9FDCAB',
            border: '#36a745ff',
        },
    };
    
    return coloresPorRol[rol] || '#CCCCCC';
}

export function temaPorRol(rol) {
    const temaPorRol = {
        Consultor: {
            background: '#4D96FF',
            border: '#006affff',
            text: '#ffff',
        },

        Consultora: {
            background: '#4D96FF',
            border: '#006affff',
            text: '#ffff',
        },

        Manager: {
            background: '#eb4040ff',
            border: '#e00000ff',
            text: '#ffff',
        },

        Cliente: {
            background: '#6BCB77',
            border: '#36a745ff',
            text: '#ffff',
        },
    };
    
    return temaPorRol[rol] || {
        background: '#F0F0F0',
        border: '#CCCCCC',
        text: '#333333',
    };
}