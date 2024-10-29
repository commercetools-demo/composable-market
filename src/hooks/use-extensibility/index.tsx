/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import FetchLoggedInUser from './fetch-logged-in-user.backend.graphql';
import { User } from './types/user';
import { useCustomApplications } from './use-custom-applications';
import { useConnect } from './use-connect';
import { useCustomViews } from './use-custom-views';

export const useExtensibility = () => {
  const {
    myCustomApplications,
  } = useCustomApplications();
  const {
    myCustomViews,
  } = useCustomViews();
  const {
    myConnectors,
  } = useConnect();

  const { data: userData, loading: userLoading } = useMcQuery<{ user: User }>(
    FetchLoggedInUser,
    {
      context: {
        target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      },
    }
  );

  return {
    user: userData?.user,
    myApps: myCustomApplications,
    myViews: myCustomViews,
    myConnectApps: myConnectors,
  };
};
