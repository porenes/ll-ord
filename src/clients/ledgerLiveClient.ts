import LedgerLiveClient, {
  WindowMessageTransport,
} from "@ledgerhq/live-app-sdk";

const transport = new WindowMessageTransport();
const ledgerLiveClient = new LedgerLiveClient(transport);

export { ledgerLiveClient };
