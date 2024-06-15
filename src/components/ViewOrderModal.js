import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const ViewOrderModal = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>ID</FormLabel>
            <Input value={data.id} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Customer Name</FormLabel>
            <Input value={data.customerName} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Price (₹)</FormLabel>
            <Input value={data.price} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Last Modified</FormLabel>
            <Input value={data.lastModified} isReadOnly />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewOrderModal;
