import {
  ConnectButton,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import React from "react";
import { ConnectorButtonx } from "./components/MobileConnect/ConnectorButton";

const App: React.FC = () => {
  return (
    <div>
      <RainbowKitProvider
        appInfo={{
          appName: "Paalx Limit",
          learnMoreUrl: "",
        }}
        modalSize="compact"
        theme={darkTheme({
          accentColor: "#aa54df",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <ConnectButton showBalance={false} chainStatus="icon" />
      </RainbowKitProvider>
      <ConnectorButtonx />
    </div>
  );
};

export default App;
