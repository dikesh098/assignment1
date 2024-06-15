import React, { useState } from "react";
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
  NumberInputField,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import products from "../data/products.json";

const productOptions = products.map((product) => ({
  label: product.name,
  value: product.id.toString(),
}));

const NewSaleOrderModal = ({ isOpen, onClose, onSave, activeOrders }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    selected_products: [],
    paid: false,
    invoice_no: "",
    invoice_date: new Date(),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, invoice_date: date });
  };

  const handleProductChange = (selectedProducts) => {
    setFormData({ ...formData, selected_products: selectedProducts });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customer_name)
      newErrors.customer_name = "Customer Name is required";
    if (formData.selected_products.length === 0)
      newErrors.selected_products = "At least one product must be selected";
    if (!formData.invoice_no) newErrors.invoice_no = "Invoice No is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newOrder = {
        id: activeOrders.length + 422,
        customerName: formData.customer_name,
        price: Math.floor(Math.random() * 1000000),
        lastModified: new Date().toISOString(),
        ...formData,
      };
      onSave(newOrder);
      setFormData({
        customer_name: "",
        selected_products: [],
        paid: false,
        invoice_no: "",
        invoice_date: new Date(),
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sale Order </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={errors.customer_name}>
            <FormLabel>Customer Name</FormLabel>
            <Input
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
            />
            {errors.customer_name && (
              <FormErrorMessage>{errors.customer_name}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired mt={4} isInvalid={errors.selected_products}>
            <FormLabel>All Products</FormLabel>
            <MultiSelect
              options={productOptions}
              value={formData.selected_products}
              labelledBy={"Select"}
              onChange={handleProductChange}
              disableSearch
            />
            {errors.selected_products && (
              <FormErrorMessage>{errors.selected_products}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4}>
            <Checkbox
              isChecked={formData.paid}
              onChange={(e) =>
                setFormData({ ...formData, paid: e.target.checked })
              }
            >
              Paid
            </Checkbox>
          </FormControl>

          <FormControl isRequired mt={4} isInvalid={errors.invoice_no}>
            <FormLabel>Invoice No</FormLabel>
            <Input
              name="invoice_no"
              value={formData.invoice_no}
              onChange={handleChange}
            />
            {errors.invoice_no && (
              <FormErrorMessage>{errors.invoice_no}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Invoice Date</FormLabel>
            <DatePicker
              selected={formData.invoice_date}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy, hh:mm:ss aa"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
          <Button ml={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewSaleOrderModal;
