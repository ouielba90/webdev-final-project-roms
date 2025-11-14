export function obtenerEstilosPorRol(rol) {
    const estilosPorRol = {
        Consultor: {
            color: {
                background:'#68a4ffff',
                border: '#006affff',
            },
            tema: {
                background: '#8cbcffff',
                border: '#006affff',
                text: '#ffff',
            },
        },
        
        Consultora: {
            color: {
                background:'#68a4ffff',
                border: '#006affff',
            },
            tema: {
                background: '#8cbcffff',
                border: '#006affff',
                text: '#ffff',
            },
        },

        Manager: {
            color: {
                background: '#ff6969ff',
                border: '#e00000ff',
            },
            tema: {
                background: '#ff8080',
                border: '#e00000ff',
                text: '#ffff',
            },
        },
        
        Cliente: {
            color: {
                background: '#6ccb79ff',
                border: '#36a745ff',
            },
            tema: {
                background: '#9FDCAB',
                border: '#36a745ff',
                text: '#ffff',
            },
        },
    };
    
    return estilosPorRol[rol] || {
        color: {
            background: '#DDDDDD',
            border: '#CCCCCC',
        },

        tema: {
            background: '#F0F0F0',
            border: '#CCCCCC',
            text: '#333333',
        },
    };
}