// useFirestoreCrud.js
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

export const useCloudStorage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const { firestoreEndpoint } = useApplicationContext(
    (context) => context.environment
  );

  // Helper function for API calls
  const apiCall = useCallback(async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await axios.request({
        url: `${firestoreEndpoint}${endpoint}`,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(data && { data: data }),
      });

      const result = await response.data;
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create an item
  const createItem = useCallback(
    async (item) => {
      return await apiCall('POST', '', item);
    },
    [apiCall]
  );

  // Get all items
  const getItems = useCallback(async () => {
    return await apiCall('GET', '');
  }, [apiCall]);

  // Get a single item
  const getItem = useCallback(
    async (id) => {
      return await apiCall('GET', `?id=${id}`);
    },
    [apiCall]
  );

  // Update an item
  const updateItem = useCallback(
    async (id, updates) => {
      return await apiCall('PUT', `?id=${id}`, updates);
    },
    [apiCall]
  );

  // Delete an item
  const deleteItem = useCallback(
    async (id) => {
      return await apiCall('DELETE', `?id=${id}`);
    },
    [apiCall]
  );

  useEffect(() => {
    console.log('Fetching items...');

    getItems().then(setItems);
  }, []);

  return {
    loading,
    error,
    items,
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
  };
};
