import type { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";

const Index: NextPage = () => {
	return (
    
		<Flex height="100vh" alignItems="center" justifyContent="center">
			<Flex direction="column" background="gray.100" p={12} rounded={6} >
        <Heading mb={6}>
          Index Page
        </Heading>
      </Flex>
		</Flex>
	);
};

export default Index;
