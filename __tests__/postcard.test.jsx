import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PostCard from "../components/ForumPage/PostCard";
import { mockPost } from "./mockdata";

describe("PostCard", () => {
  beforeEach(() => {
    render(<PostCard post={mockPost} themeId={1} />);
  });
  it("render link", () => {
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/forum/1/1");
  });
  it("render title", () => {
    const title = screen.getByText("title");
    expect(title).toBeInTheDocument();
  });
  it("render post createdAt", () => {
    const createdAt = screen.getByText("Створено 5/30/2024, 3:00:00 PM");
    expect(createdAt).toBeInTheDocument();
  });
});
