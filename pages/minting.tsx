import {
	Box,
	Flex,
	Heading,
	Image,
	Text,
	Stack,
	Button,
	Spacer,
} from "@chakra-ui/react";
import React from "react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { nftContractAddress } from "../utils/contracts";
import MintMonsterNFT from "../components/MintNFT";

// Logic is needed to check if user is on correct network

declare let window: any;

const Minting: NextPage = () => {
	const [currentAccount, setCurrentAccount] = useState<string | undefined>();
	const [chainId, setChainId] = useState<number | undefined>();
	const [balance, setBalance] = useState<string | undefined>();
	const [chainname, setChainName] = useState<string | undefined>();

	// sets intitial values assigned to wallet owner. updates when wallet account status changes
	useEffect(() => {
		if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
		if (!window.ethereum) return;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		provider.getBalance(currentAccount).then((result) => {
			setBalance(ethers.utils.formatEther(result));
		});
		provider.getNetwork().then((result) => {
			setChainId(result.chainId);
			setChainName(result.name);
		});
	}, [currentAccount]);

	// The onClick functions allowing user to connect or disconnect metamask account
	const onConnect = () => {
		if (!window.ethereum) {
			console.log("Please install MetaMask");
			return;
		}
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		// MetaMask requires requesting permission to connect users accounts
		provider
			.send("eth_requestAccounts", [])
			.then((accounts) => {
				if (accounts.length > 0) setCurrentAccount(accounts[0]);
			})
			.catch((e) => console.log(e));
	};

	const onDisconnect = () => {
		console.log("onClickDisConnect");
		setBalance(undefined);
		setCurrentAccount(undefined);
	};

	const imageArray = [
		{ number: 1, name: "one", image: "1" },
		{ number: 2, name: "two", image: "2" },
		{ number: 3, name: "three", image: "3" },
		{ number: 4, name: "four", image: "4" },
		{ number: 5, name: "five", image: "5" },
	];

	return (
		<Flex height="100vh" justifyContent="center">
			<Flex
				direction="column"
				background="gray.100"
				p={12}
				rounded={6}
				alignItems="center"
			>
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
				<Box w="100%" my={1}>
					{currentAccount ? (
						<Button type="button" w="100%" onClick={onDisconnect}>
							Account:{currentAccount}
						</Button>
					) : (
						<Button type="button" w="100%" onClick={onConnect}>
							Connect to MetaMask
						</Button>
					)}
				</Box>
				{currentAccount ? (
					<Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
						<Heading my={4} fontSize="xl">
							Account info
						</Heading>
						<Text>Matic Balance of current account: {balance}</Text>
						<Text>
							Chain Info: ChainId {chainId} name {chainname}
						</Text>
					</Box>
				) : (
					<></>
				)}
				<MintMonsterNFT
					addressContract={nftContractAddress}
					currentAccount={currentAccount}
				/>
			</Flex>
		</Flex>
	);
};

export default Minting;
