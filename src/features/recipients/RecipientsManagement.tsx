import { AvailableRecipients } from "./AvailableRecipients";
import { SelectedRecipients } from "./SelectedRecipients";
import { MailIcon } from "lucide-react";
import recipientsData from "../../assets/recipientsData.json";
import { useRecipients } from "./providers/RecipientsProvider";
import { useEffect } from "react";

export const RecipientsManagement = () => {
  const { setRecipients } = useRecipients();

  // TODO: pass real data from the API to inittialise the provider
  useEffect(() => {
    setRecipients(recipientsData);
  }, [setRecipients]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 px-4">
        <h1 className="text-2xl font-bold">Recipients Management</h1>
        <MailIcon className="size-6 text-gray-500 motion-safe:animate-spin motion-safe:[animation-iteration-count:1]" />
      </div>
      <div className="flex items-start gap-11 px-4 py-6 flex-wrap flex-col md:flex-row">
        <AvailableRecipients />
        <SelectedRecipients />
      </div>
    </div>
  );
};
