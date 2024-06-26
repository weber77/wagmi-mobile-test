import { ChangeModalStyle } from "./modalStyle";
import { Connector, useChainId, useConnect } from "wagmi";
import { Button } from "../ui/button";

export function ConnectorButtonx() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();

  function connectWallet(connector: Connector) {
    if (connector) {
      connect({ connector, chainId });
      ChangeModalStyle();
    }
  }

  return (
    <Button onClick={() => connectWallet(connectors[1])}>Connect Wallet</Button>
  );
}
