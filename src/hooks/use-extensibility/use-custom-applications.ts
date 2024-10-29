import { useMcQuery } from '@commercetools-frontend/application-shell-connectors';
import MyCustomApps from './fetch-my-custom-apps.setting.graphql';
import { MyCustomApplication } from './types/app';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
export const useCustomApplications = () => {
  const {
    data: myAppsData,
    loading: myAppsLoading,
    refetch: updateApps,
  } = useMcQuery<{
    myCustomApplications: MyCustomApplication[];
  }>(MyCustomApps, {
    context: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });

  return {
    myAppsLoading,
    myCustomApplications: myAppsData?.myCustomApplications,
    refreshMyApps: updateApps,
  };
};
