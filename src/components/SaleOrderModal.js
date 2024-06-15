import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const SaleOrderModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      lastModified: new Date().toLocaleString(),
    });
  };

  const handleSave = () => {
    onSave({
      ...formData,
      lastModified: new Date().toLocaleString(),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>ID</FormLabel>
            <Input name="id" value={formData.id} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Customer Name</FormLabel>
            <Input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price (₹)</FormLabel>
            <Input
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Modified</FormLabel>
            <Input
              name="lastModified"
              value={formData.lastModified}
              isReadOnly
            />{" "}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
