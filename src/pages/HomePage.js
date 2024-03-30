import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Login";
import Register from "../components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logoAnimation from '../components/animatedLogo.json'
import Lottie from "lottie-react";

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("deLinkUser"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <div className="bg-container">
       <Container 
  maxW={"xl"} 
  centerContent 
  
  borderRadius={"10px"} 
  margin={"5px auto"} 
  s
>
        <Box
        display="flex"
        justifyContent="center"
        p={3}
        backgroundColor={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        >
            <div style={{height:"60px", width:"60px"}}>
                <Lottie
                animationData={logoAnimation}
                />
            </div>
            <Text fontFamily={"'Cairo Play', sans-serif"} fontSize="4xl">
                Chat-Hub
            </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs isFitted variant="" >
        <TabList mb="1em" bg="black">
          <Tab color="black" bg="white" _selected={{ color: 'white', bg: 'black' }}>
            Login
          </Tab>
          <Tab color="black" bg="white" _selected={{ color: 'white', bg: 'black' }}>
            Sign Up
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    </Container>
    </div>
  );
};

export default Homepage;
