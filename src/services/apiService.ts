import axios from 'axios';

// Define the order data type
export interface OrderData {
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    total: number;
    address: string;
    status: string;
}

// API URL
const API_URL = 'http://localhost:8080/api/'; // Update with your actual backend API URL

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}products`);
    return response.data;
};

// Function to place an order
export const placeOrder = async (orderData: OrderData) => {
    try {
        const response = await axios.post(`${API_URL}orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};
