import { Button } from "@ledgerhq/react-ui";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useMatch, useNavigate } from "react-router-dom";

export function WithNavigation({
  children,
}: PropsWithChildren<{ navigatePath?: string }>) {
  const navigate = useNavigate();
  const isRoot = useMatch("/");
  const { t } = useTranslation();

  return (
    <div>
      <nav>
        {!isRoot && (
          <Button ml={16} mt={8} variant="main" onClick={() => navigate(-1)}>
            {t("go_back")}
          </Button>
        )}
      </nav>
      {children}
    </div>
  );
}
