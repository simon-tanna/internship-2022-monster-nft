import type { NextPage } from "next";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare let window: any;

const Index: NextPage = () => {
	const [currentAccount, setCurrentAccount] = useState<string | undefined>();
	const [chainId, setChainId] = useState<number | undefined>();
	const [balance, setBalance] = useState<string | undefined>();
	const [chainname, setChainName] = useState<string | undefined>();

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
	return (
		<Flex height="100vh" alignItems="center" justifyContent="center">
			<Flex direction="column" background="gray.100" p={12} rounded={6}>
				<Heading mb={6}>Index Page</Heading>
				<VStack>
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
							<Text>ETH Balance of current account: {balance}</Text>
							<Text>
								Chain Info: ChainId {chainId} name {chainname}
							</Text>
						</Box>
					) : (
						<></>
					)}
				</VStack>
			</Flex>
		</Flex>
	);
};

export default Index;
