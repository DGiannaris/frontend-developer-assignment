import { RecipientsManagement } from "../features/recipients/RecipientsManagement";
import { RecipientsProvider } from "../features/recipients/providers/RecipientsProvider";

function App() {
  return (
    <RecipientsProvider>
      <RecipientsManagement />
    </RecipientsProvider>
  );
}

export default App;
