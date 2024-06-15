import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Center,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

function LoginPage({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.200", "gray.700");

  const validateCredentials = () => {
    let isValid = true;

    if (!username.trim()) {
      setError("Username cannot be empty.");
      isValid = false;
    }

    if (!password.trim()) {
      setError("Password cannot be empty.");
      isValid = false;
    }

    if (username.includes(" ")) {
      setError("Username cannot contain spaces.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateCredentials()) {
      if (username === "admin" && password === "password") {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <Center minH="100vh" bg={bgColor} py={8}>
      <Box
        maxW="md"
        w="full"
        mx="auto"
        p={5}
        borderRadius="lg"
        shadow="card"
        borderWidth="1px"
      >
        <Text fontSize="xl" textAlign="center" mb={4}>
          Login
        </Text>
        <VStack spacing={4}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="lg"
            autoFocus
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
          />
          {error && <Text color="red.500">{error}</Text>}
          <Button colorScheme="teal" width="full" mt={4} onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginPage;
