import { groupRecipientsByDomain } from "./utils/groupRecipientsByDomain";
import { useMemo, useState } from "react";
import { useRecipients } from "./providers/RecipientsProvider";
import { SearchRecipients } from "./SearchRecipients";
import { EmptyState } from "./EmptyState";
import { RecipientsList } from "./RecipientsList";

export const AvailableRecipients = () => {
  const { availableRecipients, onSelectRecipients } = useRecipients();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipients = useMemo(() => {
    const queryTrimmed = searchQuery.trim().toLowerCase();

    if (!queryTrimmed) {
      return availableRecipients;
    }

    const filtered = availableRecipients.filter(({ email }) =>
      email.split("@")[1].toLowerCase().includes(queryTrimmed)
    );

    return filtered;
  }, [searchQuery, availableRecipients]);

  const groupedRecipients = useMemo(
    () => groupRecipientsByDomain(filteredRecipients),
    [filteredRecipients]
  );

  const hasRecipients = filteredRecipients.length > 0;

  return (
    <section className="w-full max-w-md border border-gray-300 rounded-md p-4 flex flex-col gap-4 shadow-md h-96">
      <h2 className="text-lg font-medium pb-4">Available recipients</h2>
      <SearchRecipients onSearch={setSearchQuery} />
      <div className="overflow-y-auto h-full">
        {hasRecipients ? (
          <RecipientsList
            groupedRecipients={groupedRecipients}
            onSelect={onSelectRecipients}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};
