import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { NftListType } from "../utils/client/types/clientType";
import useClient from "../utils/hooks/useClient";

const NftList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [numberOfNfts, setNumberOfNfts] = useState(0);
  const [nftLists, setNftLists] = useState<NftListType[]>();
  const [selectedNftList, setSelectedNftList] = useState<NftListType>();
  const [mints, setMints] = useState<string[]>();

  const client = useClient();

  const showFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      // @ts-ignore
      const text = e.currentTarget.result;
      setMints(text.split(/\r?\n/));
    };
    // @ts-ignore
    reader.readAsText(e.currentTarget.files[0]);
  };

  const onCollectionNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCollectionName(e.currentTarget.value);
  };

  const onNumberOfNftsChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNumberOfNfts(parseInt(e.currentTarget.value));
  };

  const createNftList = async () => {
    await client?.createNftList({ numberOfNfts, collectionName });
  };

  const updateNftList = async () => {
    const chunkSize = 20;
    if (selectedNftList) {
      console.log(
        await Promise.all(
          _.chunk(mints, chunkSize).map(
            async (mints: string[], index: number) => {
              await client?.updateNftList({
                nftList: new PublicKey(selectedNftList.nftListAddress),
                mints: mints.map((mint: string, innerIndex: number) => ({
                  index: index * chunkSize + innerIndex,
                  mint: new PublicKey(mint),
                })),
              });
            }
          )
        )
      );
    }
  };

  useEffect(() => {
    const getNftLists = async () => {
      const lists = await client?.fetchNftListAcc();
      setNftLists(lists);
    };

    getNftLists();
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                NFT List ✨
              </h1>
            </div>
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white p-2"
                type="button"
                onClick={() => setShowModal(true)}
              >
                + Add New NFT List
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative mt-6">
              <header className="px-5 py-4">
                <h2 className="font-semibold text-gray-800">
                  All NFT Lists{" "}
                  <span className="text-gray-400 font-medium">
                    {nftLists?.length}
                  </span>
                </h2>
              </header>
              {/* Table */}
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {/* Table header */}
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="py-3 px-6">
                        <div className="font-semibold text-left">
                          Collection Name
                        </div>
                      </th>
                      <th className="py-3 px-6">
                        <div className="font-semibold text-left">Address</div>
                      </th>
                      <th className="py-3 px-6">
                        <div className="font-semibold text-left">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  {nftLists?.map((nftList) => (
                    <tr
                      className="bg-white border-b"
                      key={nftList.nftListAddress}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {nftList.collectionName}
                      </th>
                      <td className="py-4 px-6">{nftList.nftListAddress}</td>
                      <td className="py-4 px-6">
                        <button
                          className="bg-slate-200 p-1"
                          onClick={() => {
                            setSelectedNftList(nftList);
                            setShowUpdateModal(true);
                          }}
                        >
                          Update List
                        </button>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            {/* update nft list modal */}
            {showUpdateModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Add New NFT List
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                          <div className="mb-6">
                            <input type="file" onChange={(e) => showFile(e)} />
                          </div>
                        </div>
                        <div className="h-52 w-full overflow-auto">
                          {mints?.map((mint) => (
                            <li>{mint}</li>
                          ))}
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setMints(undefined);
                            setShowUpdateModal(false);
                          }}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            updateNftList();
                            setShowUpdateModal(false);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
            {/* create nft list modal */}
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Add New NFT List
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                          <div>
                            {/* collection name */}
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Collection Name
                            </label>
                            <input
                              type="text"
                              id="pool_name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="CasinoCats"
                              value={collectionName}
                              onChange={onCollectionNameChange}
                            />
                          </div>
                          <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                              {/* number of nfts */}
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Number of NFTs
                              </label>
                              <input
                                type="text"
                                id="pool_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="CasinoCats"
                                value={numberOfNfts}
                                onChange={onNumberOfNftsChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            createNftList();
                            setShowModal(false);
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NftList;
