import type { Recipient } from "../types";

export const groupRecipientsByDomain = (recipients: Recipient[]) => {

  const grouped = recipients.reduce((acc, recipient) => {
    const domain = recipient.email.split("@")[1];
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(recipient);
    return acc;
  }, {} as Record<string, Recipient[]>);


  return grouped;
};
