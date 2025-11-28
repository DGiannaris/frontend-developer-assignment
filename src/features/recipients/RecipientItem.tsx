import { Button } from "../../components/ui/Button";
import type { Recipient } from "./types";

export const RecipientItem = ({
  recipient,
  onSelect,
}: {
  recipient: Recipient;
  onSelect: (recipients: Recipient[]) => void;
}) => {
  return (
    <li className="min-w-0 p-2">
      <Button
        variant="ghost"
        onClick={() => onSelect([recipient])}
        className="justify-start max-w-full min-w-0"
      >
        <span className="truncate">{recipient.email}</span>
      </Button>
    </li>
  );
};
