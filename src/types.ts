export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    isAvailable: boolean;
    description?: string; // Описание товара, может быть необязательным
    images: string[];
}
