import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MyLink from "../../components/CommonComponents/MyLink.tsx";

describe("MyLink", () => {
  beforeEach(() => {
    render(<MyLink href="/" title="title" size="default" />);
  });
  it("renders a link", () => {
    const anchor = screen.getByRole("link");
    expect(anchor).toBeInTheDocument();
  });
  it("renders correct title", () => {
    const title = screen.getByText("title");
    expect(title).toBeInTheDocument();
  });
});
