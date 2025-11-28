import { renderHook, act } from "@testing-library/react";
import { RecipientsProvider, useRecipients } from "./RecipientsProvider";
import type { Recipient } from "../types";

const mockRecipients: Recipient[] = [
  { email: "user1@example.com", isSelected: false },
  { email: "user2@example.com", isSelected: false },
  { email: "user3@test.com", isSelected: false },
];

describe("RecipientsProvider", () => {
  it("provides initial empty state", () => {
    const { result } = renderHook(() => useRecipients(), {
      wrapper: RecipientsProvider,
    });

    expect(result.current.availableRecipients).toEqual([]);
    expect(result.current.selectedRecipients).toEqual([]);
  });

  it("sets recipients correctly", () => {
    const { result } = renderHook(() => useRecipients(), {
      wrapper: RecipientsProvider,
    });

    act(() => {
      result.current.setRecipients(mockRecipients);
    });

    expect(result.current.availableRecipients).toHaveLength(3);
    expect(result.current.selectedRecipients).toHaveLength(0);
  });

  it("selects recipients correctly", () => {
    const { result } = renderHook(() => useRecipients(), {
      wrapper: RecipientsProvider,
    });

    act(() => {
      result.current.setRecipients(mockRecipients);
    });

    const recipientsToSelect = [mockRecipients[0], mockRecipients[1]];

    act(() => {
      result.current.onSelectRecipients(recipientsToSelect);
    });

    expect(result.current.selectedRecipients).toHaveLength(2);
    expect(result.current.availableRecipients).toHaveLength(1);
  });

  it("removes recipients correctly", () => {
    const { result } = renderHook(() => useRecipients(), {
      wrapper: RecipientsProvider,
    });

    act(() => {
      result.current.setRecipients(mockRecipients);
    });

    const recipientsToSelect = [mockRecipients[0], mockRecipients[1]];

    act(() => {
      result.current.onSelectRecipients(recipientsToSelect);
    });

    expect(result.current.selectedRecipients).toHaveLength(2);

    const recipientsToRemove = [mockRecipients[0]];

    act(() => {
      result.current.onRemoveRecipients(recipientsToRemove);
    });

    expect(result.current.selectedRecipients).toHaveLength(1);
    expect(result.current.availableRecipients).toHaveLength(2);
  });
});
