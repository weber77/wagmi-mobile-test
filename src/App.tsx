import {
  ConnectButton,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import React from "react";

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
    </div>
  );
};

export default App;
