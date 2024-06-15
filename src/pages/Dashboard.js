import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Box,
  Flex,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import ActiveOrders from "../components/ActiveOrders";
import CompletedOrders from "../components/CompletedOrders";
import ThemeToggle from "../components/ThemeToggle";
import NewSaleOrderModal from "../components/NewSaleOrderModal";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  const handleNewOrder = (order) => {
    setActiveOrders([...activeOrders, order]);
    setSelectedOrder(order);
    setIsNewOrderModalOpen(false);
  };

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="4"
        bg="blue.500"
        color="white"
      >
        <Heading as="h1" size="lg" textAlign="center" mx="auto">
          Sale Order Management 
        </Heading>
      </Flex>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        p={4}
      >
        <Button colorScheme="blue" onClick={() => setIsNewOrderModalOpen(true)}>
          + Sale Order
        </Button>
        <ThemeToggle />
      </Box>

      <Box px={8}>
        <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
          <TabList>
            <Tab>Active Sale Orders</Tab>
            <Tab>Completed Sale Orders</Tab>
          </TabList>
          <Box
            height="500px"
            overflowY="scroll"
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
          >
            <TabPanels>
              <TabPanel>
                <ActiveOrders selectedOrder={selectedOrder} />
              </TabPanel>
              <TabPanel>
                <CompletedOrders />
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
      </Box>
      <NewSaleOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onSave={handleNewOrder}
        activeOrders={activeOrders}
      />
    </>
  );
}

export default Dashboard;
