import MarketplaceList from './marketplace-list';

const MarketplaceListWrapper = () => {
  const items = [
    {
      id: '1',
      name: 'Channel 1',
      type: 'mc-app',
      region: 'gcp-us',
    },
    {
      id: '2',
      name: 'Channel 2',
      type: 'mc-view',
      region: 'gcp-eu',
    },
    {
      id: '3',
      name: 'Channel 3',
      type: 'connect-app',
      region: 'azure-eastus',
    },
  ];

  return <MarketplaceList items={items} />;
};

export default MarketplaceListWrapper;
