import {
  useMcQuery,
} from '@commercetools-frontend/application-shell-connectors';
import MyCustomViews from './fetch-my-custom-views.setting.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { MyCustomView } from './types/view';
export const useCustomViews = () => {
  const {
    data: myViewsData,
    loading: myViewsLoading,
    refetch: updateViews,
  } = useMcQuery<{
    myCustomViews: MyCustomView[];
  }>(MyCustomViews, {
    context: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  });

  return {
    myViewsLoading,
    refreshMyViews: updateViews,
    myCustomViews: myViewsData?.myCustomViews || [],
  };
};
