import React, { useState, useEffect } from "react";
import TelegramLoginButton, {
  TelegramUser,
} from "@v9v/ts-react-telegram-login";
import {
  saveUser,
  getCount,
  ListUsers,
  fetcWhitelist,
  getClaimedNFTs,
  updateNFTTrial,
} from "../../utils/firebaseUtils";
import Tutorial from "../Tutorial";
import { ClaimedNFT, NFT } from "@/lib/types";
import {
  ConnectButton,
  Locale,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";
import { getUserNFTs } from "../../utils/openseaUtils";
import { TG_BOT_NAME, TRIAL_DAYS } from "@/utils/env";
import { useParams } from "react-router-dom";
import { promiseToast, updateToast } from "@/utils/toastNotifications";
import { nftNotFound } from "./nftComponent";

const LandingPage: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [count, setCount] = useState<number | null>(null);
  const [countError, setCountError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [_, setUsersError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [whiteListStatus, setWhiteListStatus] = useState<string | null>(null);
  const [supportMessage, setSupportMessage] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  //const [url, setUrl] = useState<string>('');
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);

  const { address, chain, isConnected } = useAccount();

  const [paalNFTs, setPaalNFTs] = useState<NFT[] | null>(null);
  const [claimedNFTs, setClaimedNFTs] = useState<ClaimedNFT[]>([]);
  const { locale } = useParams() as { locale: Locale };

  useEffect(() => {
    if (address && chain) {
      handleIsConnected(address, chain?.name.toLocaleLowerCase());
    }
  }, [address, chain, isConnected]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const claimed_nfts = await getClaimedNFTs();
        console.log("claimed nfts:", claimed_nfts);

        setClaimedNFTs(claimed_nfts.results);
      } catch (error) {
        setUsersError("Error fetching claimed NFTs");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {}, [claimedNFTs]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await ListUsers();
        setUsers(usersResponse.results);
      } catch (error) {
        setUsersError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const countResponse = await getCount();
        setCount(countResponse.data.total_count);
      } catch (error) {
        setCountError("Error fetching count");
      }
    };

    fetchCount();
  }, []);

  const handleIsConnected = async (
    walletAddress: string,
    chainName: string
  ) => {
    const paalNFTs = await getUserNFTs(chainName, walletAddress);

    setPaalNFTs(paalNFTs);
  };

  const handleNFTTrial = async (nft_identifier: string) => {
    const msgId = promiseToast("Claim in progress...");

    if (paalNFTs && paalNFTs?.length > 0) {
      try {
        const response = await updateNFTTrial(
          loggedInUser.id,
          TRIAL_DAYS.toString(),
          nft_identifier
        );
        updateToast("Claim completed", msgId, "success");
        setClaimedNFTs([
          ...claimedNFTs,
          {
            nft_identifier: nft_identifier,
            user_id: "",
            timestamp: "",
          },
        ]);
        console.log(response); // implement nft access here :)
      } catch (error) {
        updateToast("Claim Failde", msgId, "error");
        console.log(error);
      }
    }
  };

  const handleDisableNFT = (nft_identifier: string) => {
    return claimedNFTs?.find(
      (claimed: ClaimedNFT) => claimed.nft_identifier === nft_identifier
    )
      ? true
      : false;
  };

  const handleTelegramResponse = async (user: TelegramUser) => {
    const userData = {
      id: user.id.toString(),
      hash: user.hash,
      firstName: user.first_name,
    };
    setLoggedInUser(userData);

    try {
      const response = await saveUser(userData);
      if (response.status === 200) {
        // Check if the user is allowed to buy and call CallCoinBase immediately
        const usersResponse = await ListUsers();
        setUsers(usersResponse.results);

        const userFromList = usersResponse.results.find(
          (u: any) => u.id === userData.id
        );
        if (userFromList) {
          const createdAt = new Date(userFromList.created_at);
          const formattedDate = `${
            createdAt.getMonth() + 1
          }/${createdAt.getDate()}/${createdAt.getFullYear()}`;

          setStatus(
            `🙌 Hi, ${userData.firstName} I’m from Paal AI support team, I see you have registered for Paal AI sniper on ${formattedDate}.<br/>Here’s your access link! Let us know if you have any questions! 📋✅`
          );

          if (userFromList.allow_to_buy) {
            //const data = await CallCoinBase(userData.id);
            //if (data && data.url) {
            //    setUrl(data.url);
            //}
          }
        }
      }
    } catch (error) {
      setStatus("Error saving user data");
    }
  };

  {
    /*

    const handleBuy = () => {
        if (url) {
            window.open(url, '_blank');
            setShowTutorial(true);
        } else {
            console.error('No URL available for the purchase.');
        }
    };

    */
  }

  const handleWhiteListClick = async () => {
    if (loggedInUser) {
      try {
        const response = await fetcWhitelist(loggedInUser.id);
        const position = response[0]?.position;
        console.log("position", position);
        setWaitlistPosition(position);
      } catch (error) {
        setWhiteListStatus("Error fetching whitelist data");
      }
    }
  };

  const handleStartClick = () => {
    setShowTutorial(true);
  };

  const handleSupportClick = () => {
    setSupportMessage(
      "For support, contact sniper@paal.ai. Include your telegram ID in subject line of the email"
    );
    setTimeout(() => {
      setSupportMessage(null);
    }, 5000);
  };

  const isUserAllowedToBuy = () => {
    if (loggedInUser && users.length > 0) {
      const user = users.find((u) => u.id === loggedInUser.id);
      return user ? user.allow_to_buy === true : false;
    }
    return false;
  };

  {
    /*
    useEffect(() => {
        if (loggedInUser && isUserAllowedToBuy()) {
            const setPurchaseUrl = async () => {
                const data = await CallCoinBase(loggedInUser.id);
                if (data && data.url) {
                    setUrl(data.url);
                }
            };
            setPurchaseUrl();
        }
    }, [loggedInUser, users]);

    */
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-white">
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
        locale={locale}
      >
        <ConnectButton
          label={`Connect Wallet`}
          showBalance={false}
          chainStatus="icon"
        />
      </RainbowKitProvider>
      <header className="w-full bg-paalBackground bg-opacity-90 flex flex-col items-center">
        <img
          src="/paalx_logo.svg"
          alt="Paal Sniper Logo"
          className="w-60 mt-[-1.5rem] mr-4 md:mr-6"
        />
        <h1 className="text-2xl md:text-4xl font-lato font-bold text-center mt-[-2rem]">
          Paal <b className="text-colorAI">AI</b> Sniper
        </h1>
      </header>
      <div className="flex flex-col items-center w-full justify-center bg-paalBackground flex-1 text-center">
        <div className="mb-8 px-4 pt-10 md:pt-0 md:px-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center">
            <div className="md:mr-8">
              <p className="text-2xl md:text-3xl mb-4 font-lato font-black max-w-4xl">
                Who’s ready to ape with <b className="text-colorAI">AI</b>?
              </p>
              <p className="text-md md:text-lg mb-4 font-lato font-medium max-w-xl">
                Join the <b className="text-colorAI">early access list</b> for
                exclusive <b className="text-colorAI">Paal AI Sniper alerts</b>.
                We're currently accepting only the first{" "}
                <b className="text-colorAI">1,000</b> applicants as part of our
                initial Paal alpha group to limit market influence and optimize
                algorithms for maximum returns.
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl mb-0 font-lato font-semibold max-w-4xl">
                How does it work?
              </p>
              <p className="text-md md:text-lg mb-0 md:mb-6 font-lato font-medium max-w-xl">
                The Paal AI Sniper leverages Paal's exclusive AI technology to{" "}
                <b className="text-colorAI">
                  identify, assess, and suggest emerging tokens with growth
                  potential.
                </b>{" "}
                It relies on two main data sources for recommendations:{" "}
                <b className="text-colorAI">Blockchain and Social data</b>.
                Through rule sets and dynamic real-time data parameters, the AI
                conducts thorough analyses on both blockchain and social data,
                constantly refining its strategies. By learning from these
                inputs and results, the AI{" "}
                <b className="text-colorAI">
                  enhances its buying recommendations progressively
                </b>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-4">
          {loggedInUser && (
            <div className="w-full overflow-x-auto">
              <table className="w-full max-w-8xl mx-auto text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="p-2 text-left">AI Model</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Trading Strategy</th>
                    <th className="p-2 text-left">Delivery method</th>
                    <th className="p-2 text-left">Frequency</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 text-left">px-sol-1</td>
                    <td className="p-2 text-left">
                      This model uses an advanced combination of Machine
                      Learning, Filters and Definitions
                      <br /> to select Solana coins with the highest growth
                      potential.
                    </td>
                    <td className="p-2 text-left">
                      Short-term trading; buy/sell within first 6 hrs of
                      receiving AI alpha call from the model
                    </td>
                    <td className="p-2 text-left">
                      DM via{" "}
                      <a
                        href="https://t.me/PaalSniperBot?start=sniper"
                        target="a_blank"
                        className="text-colorAI"
                      >
                        PaalSniperBot
                      </a>
                    </td>
                    <td className="p-2 text-left">Daily</td>
                    <td className="p-2 text-left">$300 USD per MTH</td>
                    <td className="p-2 text-right">
                      {loggedInUser && isUserAllowedToBuy() ? (
                        <button className="bg-purple-700 text-white px-4 py-2 rounded ml-2 shadow-sm shadow-purple-500">
                          Comming Soon
                        </button>
                      ) : waitlistPosition !== null ? (
                        <>
                          <p className="text-white text-md mt-2">
                            You are the {waitlistPosition} in the waitlist
                          </p>
                        </>
                      ) : (
                        <div className="flex">
                          <button
                            className="bg-purple-700 text-white px-4 py-2 rounded ml-2 shadow-sm shadow-purple-500"
                            onClick={handleWhiteListClick}
                          >
                            WaitList
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {whiteListStatus && (
            <p className="text-xl md:text-2xl px-4 md:px-0 font-lato text-white font-semibold mt-4">
              {whiteListStatus}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center pb-6 md:py-0">
          {!status && !loggedInUser && (
            <>
              <p className="text-2xl md:text-2xl md:text-3xl font-lato font-semibold mb-4">
                Join Early Access List! 👇
              </p>
              <TelegramLoginButton
                dataOnAuth={(user: TelegramUser) =>
                  handleTelegramResponse(user)
                }
                botName={TG_BOT_NAME}
              />
            </>
          )}
          {status && (
            <p
              className="text-xl md:text-2xl px-4 md:px-0 font-lato text-white font-semibold mt-4"
              dangerouslySetInnerHTML={{ __html: status }}
            ></p>
          )}
          <div className="mt-4 flex items-center">
            <p className="text-xl md:text-4xl font-lato font-semibold mr-2">
              People Waiting:
            </p>
            {countError ? (
              <p className="text-red-500">{countError}</p>
            ) : (
              <p className="text-xl md:text-4xl font-lato font-bold">{count}</p>
            )}
          </div>

          {loggedInUser && (
            <div className="mt-2 mb-2 flex flex-col items-center">
              <div>
                NFT Holders: Connect your wallet and claim one month of Sniper
                Access per NFT!
              </div>
              <div className="mt-2 mb-2 flex flex-row gap-2">
                {paalNFTs && paalNFTs.length === 0 && address && (
                  <button
                    className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-xl opacity-50 cursor-not-allowed"
                    disabled
                  >
                    No Paal NFTs owned.
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {loggedInUser &&
          address &&
          paalNFTs &&
          (paalNFTs.length > 0 ? (
            <div className="flex flex-col items-center ">
              <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 p-4 max-w-screen-lg mx-auto ">
                {paalNFTs.map((paalNFT: NFT) => {
                  return (
                    <div
                      key={paalNFT.identifier}
                      className="bg-gray-800 rounded-xl shadow-lg border border-colorAI border-opacity-50"
                    >
                      <div
                        className="w-full h-0"
                        style={{ paddingBottom: "83%", position: "relative" }}
                      >
                        <img
                          className="rounded-xl w-full h-auto object-cover"
                          style={{ maxHeight: "200px" }}
                          src={paalNFT.image_url}
                          alt={paalNFT.collection}
                        />
                      </div>
                      <div className="p-4 group relative">
                        <h5 className="text-lg font-semibold mb-2">
                          {paalNFT.name}
                        </h5>
                        <p className="text-sm text-gray-400">
                          {paalNFT.collection}
                        </p>
                        <button
                          onClick={() => handleNFTTrial(paalNFT.identifier)}
                          // hover:bg-purple-700
                          className={`bg-colorAI  text-white font-bold py-2 px-4 rounded-xl ${
                            handleDisableNFT(paalNFT.identifier)
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          disabled={handleDisableNFT(paalNFT.identifier)}
                        >
                          {handleDisableNFT(paalNFT.identifier)
                            ? `Claimed ${TRIAL_DAYS} days Access`
                            : `Claim ${TRIAL_DAYS} days Access`}
                        </button>
                        {/* <div className="hidden group-hover:block absolute bg-gray-900 text-white px-2 py-1 rounded-md text-sm top-0 right-0 mt-8">
                          Disabled: Ongoing Maintance 🛠️
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            nftNotFound()
          ))}
      </div>
      <footer className="w-full py-4 bg-paalBackground bg-opacity-95 text-center relative">
        <p className="text-sm font-lato font-medium hidden md:block">
          &copy; 2024 Paal AI Sniper. All rights reserved.
        </p>
        <div className="absolute right-4 bottom-2 flex space-x-2">
          <button
            onClick={handleStartClick}
            className="bg-transparent text-white px-4 py-2 rounded shadow-sm"
          >
            Tutorial: First Access
          </button>
          <button
            onClick={handleSupportClick}
            className="bg-transparent text-white px-4 py-2 rounded shadow-md"
          >
            Support
          </button>
        </div>
        {supportMessage && (
          <div className="absolute right-4 bottom-16 bg-purple-800 text-white px-4 py-2 rounded shadow-lg animate-bounce">
            {supportMessage}
          </div>
        )}
      </footer>
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </div>
  );
};

export default LandingPage;
