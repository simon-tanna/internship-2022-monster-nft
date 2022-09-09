import React, { useState } from "react";
import { VStack, Box, Heading, Button, Image } from "@chakra-ui/react";
// ABI imported from artifact.
import NFT from "../../abi/svgNFT.json";
import { Contract, ethers } from "ethers";
// import { nftContractAddress } from "../../utils/contracts";
// import {
// 	TransactionResponse,
// 	TransactionReceipt,
// } from "@ethersproject/abstract-provider";
import axios from "axios";

interface Props {
	addressContract: string;
	currentAccount: string | undefined;
}

declare let window: any;

export default function MintMonsterNFT(props: Props) {
	const addressContract = props.addressContract;
	const currentAccount = props.currentAccount;
	const [monsterNFT, setMonsterNFT] = useState<string | null>(null);

	// function that invokes mint NFT
	async function requestNFT() {
		if (!window.ethereum) return;
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const erc721: Contract = new ethers.Contract(
				addressContract,
				NFT.abi,
				signer
			);

			// erc721
			// 	.createsvgNFT()
			// 	.then((tr: TransactionResponse) => {
			// 		console.log(`Minting Monster... ${tr.hash}`);
			// 		tr.wait().then((receipt: TransactionReceipt) => {
			// 			console.log(`Your Monster Receipt: ${receipt}`);
			// 		});
			// 	})
			// 	.catch((e: Error) => console.log(e));

			let nftTransaction = await erc721.createknft();
			console.log("Minting Monster....", nftTransaction.hash);
			// set minting status here if required

			let newMonster = await nftTransaction.wait();
			// set loading status here if required
			console.log("Minted: ", newMonster);
			// assign tokenID
			let mintingEvent = newMonster.events[0];
			let value = mintingEvent.args[2];
			let tokenId = value.toNumber();

			console.log(
				`Minted: See transaction at https://mumbai.polygonscan.com/address/${nftTransaction.hash}`
			);

			getNFTData(tokenId);
		} catch (error) {
			console.log("Minting Error", error);
			//set error message here if needed
		}
	}

	// function that returns the minted NFT Data
	const getNFTData = async (tokenId: string) => {
		if (!window.ethereum) return;
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const erc721: Contract = new ethers.Contract(
				addressContract,
				NFT.abi,
				signer
			);

			let tokenUri = await erc721.tokenURI(tokenId);
			let data = await axios.get(tokenUri);
			let metadata = data.data;

			// set minting status here if necessary
			setMonsterNFT(metadata.image);
		} catch (error) {
			console.log(error);
			// set error status in state if necessary
		}
	};

	return (
		<VStack>
			<Box w="100%" my={1}>
				<Heading my={3} fontSize="l">
					Mint Your Monster
				</Heading>
				<Button type="button" onClick={requestNFT}>
					Mint Your Monster
				</Button>
			</Box>
			<Box w="100%" my={1}>
				<Heading my={3} fontSize="l">
					Your Monster
				</Heading>
				{monsterNFT !== null ? (
					<Image src={monsterNFT} alt="a Monster" />
				) : (
					<></>
				)}
			</Box>
		</VStack>
	);
}

// contract address is 0x222830B9f06464971d0C63Bf36FBE81664Ea8A66
