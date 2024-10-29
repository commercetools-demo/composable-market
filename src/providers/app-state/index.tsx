import React, { useContext, useEffect, useState } from 'react';

interface AppStateContextReturn {
  // connectApps: any[];
  // mcApps: any[];
  myApps: any[];
  refreshMyData?: () => void;
  isLoading?: boolean;
}

const initialData = {
  // connectApps: [],
  // mcApps: [],
  myApps: [],
  isLoading: false,
};

const AppStateContext = React.createContext<AppStateContextReturn>(initialData);

const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  // const [connectApps, setConnectApps] = useState<PagedQueryResponse<any>>();
  // const [mcApps, setMcApps] = useState<PagedQueryResponse<any>>();
  const [allMyApps, setAllMyApps] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);
  // const { fetchAllApps } = useExtensibilityApps();

  const getMyApps = async () => {
    setIsLoading(true);

    // const appResult = await fetchAllApps();
    // setAllMyApps(appResult);
    setIsLoading(false);
  };

  const refreshMyData = () => {
    getMyApps();
  };

  useEffect(() => {
    getMyApps();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        myApps: allMyApps,
        refreshMyData,
        isLoading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppStateContext = () => useContext(AppStateContext);
