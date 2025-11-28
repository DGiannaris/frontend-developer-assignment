import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Recipient } from "../types";

type RecipientsContextType = {
  availableRecipients: Recipient[];
  selectedRecipients: Recipient[];
  onSelectRecipients: (recipients: Recipient[]) => void;
  onRemoveRecipients: (recipients: Recipient[]) => void;
  setRecipients: (recipients: Recipient[]) => void;
};

const RecipientsContext = createContext<RecipientsContextType | undefined>(
  undefined
);

export const RecipientsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  const onSelectRecipients = useCallback((recipientsToSelect: Recipient[]) => {
    const emailsToSelect = new Set(recipientsToSelect.map((r) => r.email));

    setRecipients((prev) =>
      prev.map((recipient) =>
        emailsToSelect.has(recipient.email)
          ? { ...recipient, isSelected: true }
          : recipient
      )
    );
  }, []);

  const onRemoveRecipients = useCallback((recipientsToRemove: Recipient[]) => {
    const emailsToRemove = new Set(recipientsToRemove.map((r) => r.email));

    setRecipients((prev) =>
      prev.map((recipient) =>
        emailsToRemove.has(recipient.email)
          ? { ...recipient, isSelected: false }
          : recipient
      )
    );
  }, []);

  const availableRecipients = useMemo(
    () => recipients.filter((recipient) => !recipient.isSelected),
    [recipients]
  );

  const selectedRecipients = useMemo(
    () => recipients.filter((recipient) => recipient.isSelected),
    [recipients]
  );

  const value = useMemo(
    () => ({
      availableRecipients,
      selectedRecipients,
      onSelectRecipients,
      onRemoveRecipients,
      setRecipients,
    }),
    [
      availableRecipients,
      selectedRecipients,
      onSelectRecipients,
      onRemoveRecipients,
      setRecipients,
    ]
  );

  return (
    <RecipientsContext.Provider value={value}>
      {children}
    </RecipientsContext.Provider>
  );
};

export const useRecipients = () => {
  const context = useContext(RecipientsContext);
  if (!context) {
    throw new Error("useRecipients must be used within a RecipientsProvider");
  }
  return context;
};
