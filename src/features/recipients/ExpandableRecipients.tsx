import { ChevronRightIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "../../components/ui/Button";

export const ExpandableRecipients = ({
  title,
  onSelect,
  children,
  defaultOpen = false,
}: {
  title: string;
  onSelect?: () => void;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <li
      className="group flex flex-col gap-2 items-start max-w-full underline p-2"
      data-testid="expandable"
    >
      <div className="flex items-center max-w-full min-w-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="cursor-pointer"
          data-testid="expand-toggle-button"
          title="Toggle expand"
        >
          <ChevronRightIcon
            className={`size-4 text-gray-500 transition-transform duration-100 ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
            data-testid="chevron-icon"
          />
        </Button>

        <Title onSelect={onSelect}>{title}</Title>
      </div>
      {isExpanded && (
        <div className="w-full" data-testid="expandable-content">
          {children}
        </div>
      )}
    </li>
  );
};

const Title = ({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
}) => {
  if (onSelect) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="max-w-full min-w-0 shrink"
        onClick={onSelect}
        data-testid="expandable-title-button"
      >
        <span className="truncate">{children}</span>
      </Button>
    );
  }

  return (
    <span
      className="truncate font-medium px-4 py-2 text-sm block min-w-0"
      data-testid="expandable-title-span"
    >
      {children}
    </span>
  );
};
