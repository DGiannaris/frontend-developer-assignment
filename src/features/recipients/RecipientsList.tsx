import { Recipient } from "./types";
import { ExpandableRecipients } from "./ExpandableRecipients";
import { RecipientItem } from "./RecipientItem";

type Props = {
  groupedRecipients: Record<string, Recipient[]>;
  onSelect: (recipients: Recipient[]) => void;
};

export const RecipientsList = ({ groupedRecipients, onSelect }: Props) => {
  return (
    <ul className="flex flex-col gap-2">
      {Object.entries(groupedRecipients).map(([domain, recipients]) =>
        recipients.length > 1 ? (
          <ExpandableRecipients
            key={`domain-${domain}`}
            title={domain}
            onSelect={() => onSelect(recipients)}
            defaultOpen
          >
            <ul className="flex flex-col gap-2 pl-14 w-full">
              {recipients.map((recipient) => (
                <RecipientItem
                  key={recipient.email}
                  recipient={recipient}
                  onSelect={onSelect}
                />
              ))}
            </ul>
          </ExpandableRecipients>
        ) : (
          <RecipientItem
            key={recipients[0].email}
            recipient={recipients[0]}
            onSelect={onSelect}
          />
        )
      )}
    </ul>
  );
};
