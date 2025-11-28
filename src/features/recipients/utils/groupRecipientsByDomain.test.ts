import { groupRecipientsByDomain } from "./groupRecipientsByDomain";
import type { Recipient } from "../types";

describe("groupRecipientsByDomain", () => {
  it("groups recipients by their email domain", () => {
    const recipients: Recipient[] = [
      { email: "alice@example.com", isSelected: false },
      { email: "bob@example.com", isSelected: true },
      { email: "charlie@test.com", isSelected: false },
    ];

    const result = groupRecipientsByDomain(recipients);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result["example.com"]).toHaveLength(2);
    expect(result["test.com"]).toHaveLength(1);
  });

  it("handles empty array", () => {
    const recipients: Recipient[] = [];
    const result = groupRecipientsByDomain(recipients);

    expect(Object.keys(result)).toHaveLength(0);
    expect(result).toEqual({});
  });
});
