import { render, screen, cleanup } from "@testing-library/react";
import Index from "../pages";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("Index", () => {
	it("renders heading text", () => {
		render(<Index />);

		const contractHeader = screen.getByRole("heading", {
			name: "Monster Coin Faucet",
		});
		expect(contractHeader).toBeInTheDocument();
	});

    // it()
});
