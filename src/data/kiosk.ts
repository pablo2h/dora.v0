export interface KioskProductProps {
    id: number;
    name: string;
    price: number;
    description: string;
    category: 'bebidas' | 'snacks';
    details: {
        brand?: string;
        size: string;
    };
}

export const kioskProducts: KioskProductProps[] = [
    {
        id: 1,
        name: "Botella de Agua",
        price: 1499,
        description: "Botella de Agua Nuestra",
        category: 'bebidas',
        details: {
            brand: "Agua Nuestra",
            size: "500ml"
        }
    },
    {
        id: 2,
        name: "Fernet",
        price: 6999,
        description: "Fernet Branca",
        category: 'bebidas',
        details: {
            brand: "Branca",
            size: "500ml"
        }
    },
    {
        id: 3,
        name: "Gin",
        price: 6499,
        description: "Gin Herederos",
        category: 'bebidas',
        details: {
            brand: "Herederos",
            size: "500ml"
        }
    },
    {
        id: 4,
        name: "Maní",
        price: 1499,
        description: "Maní Julicroc",
        category: 'snacks',
        details: {
            brand: "Julicroc",
            size: "100gr"
        }
    },
    {
        id: 5,
        name: "Anillos de Maíz",
        price: 1699,
        description: "Anillos de Maíz Julicroc",
        category: 'snacks',
        details: {
            brand: "Julicroc",
            size: "200gr"
        }
    },
    {
        id: 6,
        name: "Papas Fritas",
        price: 2999,
        description: "Papas Fritas Clásicas Julicroc",
        category: 'snacks',
        details: {
            brand: "Julicroc",
            size: "70gr"
        }
    }
];