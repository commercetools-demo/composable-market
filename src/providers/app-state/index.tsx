import React, { useContext, useEffect, useState } from 'react';
import { useExtensibility } from '../../hooks/use-extensibility';
import { ConnectorDraft } from '../../hooks/use-extensibility/types/connector';
import { MyCustomApplication } from '../../hooks/use-extensibility/types/app';
import { MyCustomView } from '../../hooks/use-extensibility/types/view';
import { User } from '../../hooks/use-extensibility/types/user';
import { useCloudStorage } from '../../hooks/use-cloud-storage';

interface AppStateContextReturn {
  // connectApps: any[];
  // mcApps: any[];
  myConnectApps?: ConnectorDraft[];
  myApps?: MyCustomApplication[];
  myViews?: MyCustomView[];
  user?: User;
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
  const { items } = useCloudStorage();
  const { myConnectApps, myApps, myViews, user } = useExtensibility();

  return (
    <AppStateContext.Provider
      value={{
        myConnectApps,
        myApps,
        myViews,
        user,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppStateContext = () => useContext(AppStateContext);
