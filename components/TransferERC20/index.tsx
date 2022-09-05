import React, { useState } from "react";
import {
	Button,
	Input,
	NumberInput,
	NumberInputField,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ERC20ABI as abi } from "../../abi/ERC20ABI";
import { Contract } from "ethers";
import {
	TransactionResponse,
	TransactionReceipt,
} from "@ethersproject/abstract-provider";
import { sign } from "crypto";

interface Props {
	addressContract: string;
	currentAccount: string | undefined;
}

declare let window: any;

export default function TransferERC20(props: Props) {
	const addressContract = props.addressContract;
	const currentAccount = props.currentAccount;
	const [amount, setAmount] = useState<string>("100");
	const [toAddress, setToAddress] = useState<string>("");

	async function submitTransfer(event: React.FormEvent) {
		event.preventDefault();
		if (!window.ethereum) return;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const erc20: Contract = new ethers.Contract(addressContract, abi, signer);

		erc20
			.transfer(toAddress, parseEther(amount))
			.then((tr: TransactionResponse) => {
				console.log(`TransactionResponse TX hash: ${tr.hash}`);
				tr.wait().then((receipt: TransactionReceipt) => {
					console.log("Transaction Receipt", receipt);
				});
			})
			.catch((e: Error) => console.log(e));
	}

	const handleChange = (value: string) => setAmount(value);

	return (
		<form onSubmit={submitTransfer}>
			<FormControl>
				<FormLabel htmlFor="amount">Amount: </FormLabel>
				<NumberInput
					defaultValue={amount}
					min={15}
					max={100}
					onChange={handleChange}
				>
					<NumberInputField />
				</NumberInput>
				<FormLabel htmlFor="toaddress">To Address: </FormLabel>
				<Input
					id="toaddress"
					type="text"
					required
					onChange={(e) => setToAddress(e.target.value)}
					my={2}
				/>
				<Button type="submit" isDisabled={!currentAccount}>
					Get Monster Coin
				</Button>
			</FormControl>
		</form>
	);
}
