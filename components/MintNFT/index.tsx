import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
// ABI imported from artifact.
import NFT from "../../abi/svgNFT.json";
import { Contract, ethers } from "ethers";
import { nftContractAddress } from "../../utils/contracts";
import {
	TransactionResponse,
	TransactionReceipt,
} from "@ethersproject/abstract-provider";

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
	async function requestNFT(event: React.FormEvent) {
		event.preventDefault();
		if (!window.ethereum) return;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const erc721: Contract = new ethers.Contract(
			addressContract,
			NFT.abi,
			signer
		);

		erc721
			.createsvgNFT()
			.then((tr: TransactionResponse) => {
				console.log(`Minting Monster... ${tr.hash}`);
				tr.wait().then((receipt: TransactionReceipt) => {
					console.log(`Your Monster Receipt: ${receipt}`);
				});
			})
			.catch((e: Error) => console.log(e));
	}
}

// contract address is 0x222830B9f06464971d0C63Bf36FBE81664Ea8A66
