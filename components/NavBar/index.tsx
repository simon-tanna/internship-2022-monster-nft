import {
	Box,
	Button,
	chakra,
	Flex,
	HStack,
	Link,
	Spacer,
	useDisclosure,
	IconButton,
	Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const NavBar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<NavBarContainer>
			<NavBarOptionsContainer spacing="25px" justifyContent="flex-start">
				<IconButton
					size={"md"}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={"Open Menu"}
					display={{ md: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{NavBarData.map((linkItem) => (
								<Link key={linkItem.link} href={linkItem.link}>
									{linkItem.title}
								</Link>
							))}
						</Stack>
					</Box>
				) : null}
				<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
					{NavBarData.map((linkItem) => (
						<Link key={linkItem.link} href={linkItem.link}>
							{linkItem.title}
						</Link>
					))}
				</HStack>
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
		backgroundColor: "#e44949",
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
	{ title: "Minting", link: "/minting" },
];

export default NavBar;
