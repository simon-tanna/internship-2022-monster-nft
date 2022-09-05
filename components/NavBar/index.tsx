import { Box, Button, chakra, Flex, HStack, Spacer } from "@chakra-ui/react";


const NavBar = () => {


	return (
		<NavBarContainer>
			<NavBarOptionsContainer spacing="25px" justifyContent="flex-start">
				{NavBarData.map((linkItem) => (
					<Button key={linkItem.link} href={linkItem.link}>
						{linkItem.title}
					</Button>
				))}
			</NavBarOptionsContainer>
			<Spacer />
			<NavBarOptionsContainer spacing="25px" justifyContent="flex-end">
				<Box>
					<Button>Connect to MetaMask</Button>
				</Box>
			</NavBarOptionsContainer>
		</NavBarContainer>
	);
};

const NavBarContainer = chakra(Flex, {
	baseStyle: {
		justifyContent: "space-between",
		alignItems: "center",
		position: "sticky",
		height: "80px",
		paddingX: "25px",
		marginX: "50px",
		backgroundColor: "#F3F2ED",
		rounded: "15px",
		flexGrow: 1,
		top: "10px",
		boxShadow: " 0 1px 3px rgba(0,0,0,0.12), 0 0.5px 1px rgba(0,0,0,0.24)",
	},
});

const NavBarOptionsContainer = chakra(HStack, {
	baseStyle: {
		width: "40%",
		height: "100%",
	},
});

const NavBarData = [
	{ title: "Monster Bios", link: "/monster-bios" },
	{ title: "About", link: "/about" },
	{ title: "All Monsters", link: "/all-monsters" },
];

export default NavBar;
