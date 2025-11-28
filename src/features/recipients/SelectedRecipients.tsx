import { groupRecipientsByDomain } from "./utils/groupRecipientsByDomain";
import { useMemo } from "react";
import { useRecipients } from "./providers/RecipientsProvider";
import { EmptyState } from "./EmptyState";
import { RecipientsList } from "./RecipientsList";

export const SelectedRecipients = () => {
  const { selectedRecipients, onRemoveRecipients } = useRecipients();

  const groupedRecipients = useMemo(
    () => groupRecipientsByDomain(selectedRecipients),
    [selectedRecipients]
  );

  const hasRecipients = selectedRecipients.length > 0;

  return (
    <section className="w-full max-w-md border border-gray-300 rounded-md p-4 flex flex-col gap-4 shadow-md h-96">
      <h2 className="text-lg font-medium pb-4">Selected recipients</h2>
      <div className="overflow-y-auto h-full">
        {hasRecipients ? (
          <RecipientsList
            groupedRecipients={groupedRecipients}
            onSelect={onRemoveRecipients}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};
