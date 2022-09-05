import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { ERC20ABI as abi } from "../../abi/ERC20ABI";
import { ethers } from "ethers";

interface Props {
	addressContract: string;
	currentAccount: string | undefined;
}

declare let window: any;

export default function ERC20(props: Props) {
	const addressContract = props.addressContract;
	const currentAccount = props.currentAccount;
	const [totalSupply, setTotalSupply] = useState<string>();
	const [symbol, setSymbol] = useState<string>("");
	const [balance, setBalance] = useState<number | undefined>(undefined);

	async function queryTokenBalance(window: any) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const erc20 = new ethers.Contract(addressContract, abi, provider);

		erc20
			.balanceOf(currentAccount)
			.then((result: string) => {
				setBalance(Number(ethers.utils.formatEther(result)));
			})
			.catch("error", console.error);
	}

	useEffect(() => {
		if (!window.ethereum) return;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const erc20 = new ethers.Contract(addressContract, abi, provider);

		erc20
			.symbol()
			.then((result: string) => {
				setSymbol(result);
			})
			.catch("error", console.error);

		erc20
			.totalSupply()
			.then((result: string) => {
				setTotalSupply(ethers.utils.formatEther(result));
			})
			.catch("error", console.error);
	}, []);

	useEffect(() => {
		if (!window.ethereum) return;
		if (!currentAccount) return;

		queryTokenBalance(window);
	}, [currentAccount]);

	return (
		<div>
			<Text>
				<b>ERC20 Contract:</b> {addressContract}
			</Text>
			<Text>
				<b>ClassToken totalSupply:</b> {totalSupply} {symbol}
			</Text>
			<Text my={4}>
				<b>ClassToken in current account:</b> {balance} {symbol}
			</Text>
		</div>
	);
}
