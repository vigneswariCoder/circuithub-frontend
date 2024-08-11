import React from 'react';
import { useSelector } from 'react-redux';

const OrderPage: React.FC = () => {
  const orders = useSelector((state: any) => state.orders.orders);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order: any) => (
          <li key={order.id}>
            Order ID: {order.id}
            <ul>
              {order.items.map((item: any) => (
                <li key={item.id}>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>
            Total: ${order.total.toFixed(2)}
            Address: {order.address}
            Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
