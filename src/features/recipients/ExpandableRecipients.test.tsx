import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpandableRecipients } from "./ExpandableRecipients";

describe("ExpandableRecipients", () => {
  it("renders with simple title and starts in collapsed state", () => {
    render(
      <ExpandableRecipients title="example.com">
        <div>Child content</div>
      </ExpandableRecipients>
    );

    expect(screen.getByTestId("expandable-title-span")).toBeInTheDocument();
    expect(screen.queryByTestId("expandable-content")).not.toBeInTheDocument();
  });

  it("renders with simple title and starts in expanded state when defaultOpen is true", () => {
    render(
      <ExpandableRecipients title="example.com" defaultOpen>
        <div>Child content</div>
      </ExpandableRecipients>
    );

    expect(screen.getByTestId("expandable-title-span")).toBeInTheDocument();
    expect(screen.getByTestId("expandable-content")).toBeInTheDocument();
  });

  it("renders with button title", () => {
    render(
      <ExpandableRecipients title="example.com" onSelect={() => {}}>
        <div>Child content</div>
      </ExpandableRecipients>
    );

    const toggleButton = screen.getByTestId("expand-toggle-button");

    userEvent.click(toggleButton);

    expect(screen.getByTestId("expandable-title-button")).toBeInTheDocument();
  });

  it("collapses and hides children when toggle button is clicked", () => {
    render(
      <ExpandableRecipients title="example.com">
        <div>Child content</div>
      </ExpandableRecipients>
    );

    const toggleButton = screen.getByTestId("expand-toggle-button");

    userEvent.click(toggleButton);

    expect(screen.queryByTestId("expandable-content")).toBeInTheDocument();

    userEvent.click(toggleButton);

    expect(screen.queryByTestId("expandable-content")).not.toBeInTheDocument();
  });

  it("calls onSelect callback when title is clicked and onSelect is provided", () => {
    const mockOnSelect = jest.fn();

    render(
      <ExpandableRecipients title="example.com" onSelect={mockOnSelect}>
        <div>Child content</div>
      </ExpandableRecipients>
    );

    const titleButton = screen.getByRole("button", { name: "example.com" });

    userEvent.click(titleButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
