/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";

const DashboardTabNavigation = ({ tabs, selectedTab, setTab }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed z-30 left-0  px-3  right-0 mb-4 w-full border bg-background">
      <div className="container py-3 lg:px-5 lg:pl-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <div className="flex">
              {tabs.map((tab) => (
                <button      
                  key={tab?.id}
                  style={{ display: tab? 'block' : 'none' }}
                  className={`mr-2 rounded-xl border px-4 py-2 font-sans text-sm font-semibold no-underline focus:outline-none ${
                    selectedTab === tab?.id
                      ? "bg-white text-gray-900"
                      : "text-white"
                  }`}
                  onClick={() => setTab(tab.id)}
                >
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTabNavigation;
