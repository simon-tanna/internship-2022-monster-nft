import React, { useEffect, useState } from "react";
import {
	Text,
	Button,
	Input,
	NumberInput,
	NumberInputField,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";

interface Props {
	addressContract: string;
	currentAccount: string | undefined;
}

export default function TransferERC20(props: Props) {
	const addressContract = props.addressContract;
	const currentAccount = props.currentAccount;
	const [amount, setAmount] = useState<string>("100");
	const [toAddress, setToAddress] = useState<string>("");

	async function submitTransfer(event: React.FormEvent) {
		event.preventDefault();
		console.log("transfer requested");
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
					Get Coin
				</Button>
			</FormControl>
		</form>
	);
}
