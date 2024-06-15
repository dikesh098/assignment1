

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import SaleOrderModal from './SaleOrderModal';


const fetchOrders = async () => {
  const { data } = await axios.get('api/ActiveOrders.json');
  return data.activeOrders;
};

function ActiveOrders({ selectedOrder }) {
  const { data: orders, error, isLoading } = useQuery({
    queryKey: ['activeOrders'],
    queryFn: fetchOrders,
  });
  const [activeOrders, setActiveOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    if (orders) {
      setActiveOrders(orders);
    }
  }, [orders]);

  useEffect(() => {
    if (selectedOrder) {
      setActiveOrders((prevOrders) => [...prevOrders, selectedOrder]);
    }
  }, [selectedOrder]);

  if (isLoading) return 'Loading...';
  if (error) return 'An error occurred';

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleSave = (updatedOrder) => {
    setActiveOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price (₹)</Th>
            <Th>Last Modified</Th>
            <Th>Edit/View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {activeOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>👤{order.customerName}</Td>
              <Td>{order.price}</Td>
              <Td>{order.lastModified}</Td>
              <Td>
                <Button onClick={() => handleEdit(order)}>...</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {currentOrder && (
        <SaleOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={currentOrder}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}

export default ActiveOrders;
