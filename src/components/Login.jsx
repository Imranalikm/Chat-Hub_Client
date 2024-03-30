import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { validateEmail } from "../Util/valid";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { email, password } = userData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);

    if (!email || !password) {
      toast.warn("Please enter all the required fields");
    }
    if (!validateEmail(email)) {
      toast.warn("Invalid Email");
    }
    try {
      const config = {
        baseURL:"https://chathub.imranalikm.online",
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      toast.success("User Logged In successfully");
      localStorage.setItem("deLinkUser", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      toast.error("Login Failed: Either the email or password is incorrect");
      setLoading(false);
      return;
    }
  };
  return (
    <VStack spacing="30px">
      <FormControl id="loginEmail" isRequired>
        <FormLabel mb="0px">Email</FormLabel>
        <Input
          onChange={handleChange}
          name="email"
          value={email}
          size="md"
          placeholder="eg. John.Doe@outlook.com"
        />
      </FormControl>
      <FormControl id="loginPassword" isRequired>
        <FormLabel mb="0px">Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={handleChange}
            name="password"
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              onClick={handleClick}
              isDisabled={email === "guest@deLink.com"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
  style={{
    background: "hsla(33, 100%, 53%, 1)",
    backgroundImage: "linear-gradient(90deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)",
    background: "-moz-linear-gradient(90deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)",
    background: "-webkit-linear-gradient(90deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)",
    filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF930F', endColorstr='#FFF95B', GradientType=1)",
    color: "#fff",
    width: "100%",
    marginTop: "40px"
  }}
  onClick={handleSubmit}
>
  Login
</Button>

      <Button
        variant="outline"
        bg={"black"}
        colorScheme={"white"}
        color="#fff"
        width="100%"
        style={{ marginTop: "10px" }}
        onClick={() => {
          setUserData({
            email: "imranalikm@gmail.com",
            password: "123456789",
          });
        }}
        isLoading={loading}
      >
        Demo login
      </Button>
    </VStack>
  );
};

export default Login;
