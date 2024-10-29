import {
  useApplicationContext,
  useMcQuery,
} from '@commercetools-frontend/application-shell-connectors';
import { buildUrlWithParams } from '../../utils/utils';
import { ConnectorResponse, ConnectorDraft } from './types/connector';
import FetchMyOrganizationsQuery from './fetch-my-organization.admin.graphql';
import {
  useAsyncDispatch,
  actions,
  TSdkAction,
} from '@commercetools-frontend/sdk';
import { useEffect, useState } from 'react';
import { OrganizationResponse } from './types/organization';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

export const useConnect = () => {
  const [myConnectors, setMyConnectors] = useState<
    ConnectorDraft[] | undefined
  >([]);

  const dispatchAppsRead = useAsyncDispatch<TSdkAction, ConnectorResponse>();

  const getConnectors = async (
    organizationId: string
  ): Promise<ConnectorDraft[]> => {
    const result = await dispatchAppsRead(
      actions.get({
        // @ts-ignore
        mcApiProxyTarget: 'connect',
        uri: buildUrlWithParams(`/${organizationId}/connectors`, {
          private: true,
          limit: 100,
        }),
      })
    );

    return result?.results as ConnectorDraft[];
  };

  const { data: organizationData, loading: organizationLoading } = useMcQuery<{
    myOrganizations: OrganizationResponse;
  }>(FetchMyOrganizationsQuery, {
    context: {
      target: GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
    },
  });

  const getAllConnectors = async () => {
    if (organizationData?.myOrganizations?.results?.length) {
      const myOrgs = organizationData?.myOrganizations?.results;
      const myConnectors = await Promise.all(
        myOrgs.map(async (org) => {
          const connectors = await getConnectors(org.id);
          return connectors;
        })
      );
      return myConnectors.flat();
    }
  };

  useEffect(() => {
    if (!!organizationData?.myOrganizations?.results?.length && !organizationLoading) {
      getAllConnectors().then((res) => setMyConnectors(res));
    }
  }, [organizationData, organizationLoading]);

  return {
    myConnectors,
  };
};
