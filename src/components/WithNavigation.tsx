import { Button } from "@ledgerhq/react-ui";
import { PropsWithChildren } from "react";
import {  useMatch, useNavigate } from "react-router-dom";

export function WithNavigation({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const isRoot = useMatch("/");

  return (
    <div>
      <nav>
        {!isRoot && (
          <Button ml={16} mt={8} variant="main" onClick={() => navigate("/")}>
            Go back
          </Button>
        )}
      </nav>
      {children}
    </div>
  );
}
