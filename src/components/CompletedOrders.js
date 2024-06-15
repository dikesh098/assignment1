import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ViewOrderModal from "./ViewOrderModal";

const fetchCompletedOrders = async () => {
  const { data } = await axios.get("/api/ActiveOrders.json");
  return data.completedOrders;
};

function CompletedOrders() {
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["completedOrders"],
    queryFn: fetchCompletedOrders,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  if (isLoading) return "Loading...";
  if (error) return "An error occurred";

  const handleView = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
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
            <Th>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customerName}</Td>
              <Td>{order.price}</Td>
              <Td>{order.lastModified}</Td>
              <Td>
                <Button onClick={() => handleView(order)}>...</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {currentOrder && (
        <ViewOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={currentOrder}
        />
      )}
    </Box>
  );
}

export default CompletedOrders;
