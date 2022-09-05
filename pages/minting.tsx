import { Box, Flex, Heading, Image, Text, Stack } from "@chakra-ui/react";
import React from "react";

const Minting = () => {
	const imageArray = [
		{ number: 1, name: "one", image: "1" },
		{ number: 2, name: "two", image: "2" },
		{ number: 3, name: "three", image: "3" },
		{ number: 4, name: "four", image: "4" },
		{ number: 5, name: "five", image: "5" },
	];

	return (
		<Flex height="100vh" justifyContent="center">
			<Flex direction="column" background="gray.100" p={12} rounded={6} alignItems="center">
				<Heading mb={6}>Mint Your Monster NFT</Heading>
				<Stack direction="row">
					{imageArray.map((item, index) => (
						<Box key={index}>
							<Image
								boxSize="100px"
								objectFit="cover"
								src={`${item.image}.jpg`}
								alt={item.name}
							/>
							<Text>{item.number}</Text>
						</Box>
					))}
				</Stack>
			</Flex>
		</Flex>
	);
};

export default Minting;
