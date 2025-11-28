# Timescale Frontend Programming Assignment

Thank you for taking the time to apply for a frontend position at Timescale!
We hope you'll enjoy this small coding assignment that was designed to illustrate your coding skills. It should take around
3 hours to complete at a time of your choosing. If you have any questions, feel free to reach out to us and we'll be happy
to help. Happy hacking!

## Assignment

Implement a React component that allows managing email addresses. The component displays two lists: available recipients and selected recipients.

<img src="./src/assets/wireframe.png" height="50%" width="50%" />

Use the included `recipientsData.json` file to populate the lists within the component.

### Use cases

As a user, I can
- See the list of all available recipients. A recipient is either an email or a group of emails sharing the same company domain
- Select an individual recipient or a company domain. When a company domain is selected, all emails with the domain are added to the selected recipients' list
- Enter the name of a company into the autocomplete and select a recipient from the available suggestions
- Enter any email in the autocomplete. If the email passes validation it is possible to add it to the list of available recipients
- See the list of the selected recipients that are grouped into company and email recipients. The groups are expandable and show the contained members
- Remove the recipients from the selected list. It is possible to remove an individual email or all emails sharing a domain at once

### The rules

- The component should have a simple and clean design
- You can use a component library of your choice (we use Chakra UI) 
- The component should work in the latest Chrome on Mac OS
- We don't expect a full test coverage, but a couple of unit tests would be nice to have
- Fork the repo to your own account, make it public and send us the repo url when you are completed. We will
  clone and run the site on our local.

---

# My implementation

I tried to keep things simple and finish within the 3-hour window. I managed to complete most of the requirements, with one exception:

**Not implemented:**
> Enter any email in the autocomplete. If the email passes validation it is possible to add it to the list of available recipients

I figured it is better to fully polish the existing features rather than deliver the last one with less shine overall

### State management

I went with React Context + `useState` since the app's state is pretty straightforward. The whole state lives in a single `recipients` array where each item has an `isSelected` flag to track whether it's been picked or not, staying close to the original source of truth

The data comes from the `recipientsData.json` file directly, but if this were a real app hitting an API, I'd probably reach for TanStack Query or something similarinstead of wiring up `useEffect` manually

### Styling

I used `Tailwind CSS` for styling with `shadcn/ui`. It's fast to work with, I'm familiar with it and has the added benefit of keeping the components in the codebase

The design is minimal and functional. Nothing fancy, but something easy on the eyes

### Some of the features

- **Domain grouping**: Recipients are grouped by their email domain
- **Expandable groups**: Domains with multiple emails show up as expandable groups
- **Bulk operations**: You can select/remove an entire domain at once by clicking on the domain name
- **Searching**: You can search for a recipient by domain name

### Testing

I added a few unit tests covering:

- `RecipientsProvider.test.tsx` - Tests the context provider (selecting, removing, initial state)
- `ExpandableRecipients.test.tsx` - Tests the expandable component behavior (toggle, callbacks)
- `groupRecipientsByDomain.test.ts` - Tests the grouping utility function

Not full coverage by any means, but enough to show the testing approach

### Project structure

```
src/
├── components/
│   └── ui/           # Reusable shadcn components (Button, Input)
├── features/
│   └── recipients/
│       ├── providers/    # React Context for state
│       ├── utils/        # Helper functions
│       └── ...           # Feature components
└── lib/
    └── utils.ts      # Tailwind merge utility
```

### Running the project

```bash
yarn install
yarn start
```

### Running tests

```bash
yarn test
```
