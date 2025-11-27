import { useQuery } from '@tanstack/react-query';
import { getProfileApi } from '../APIs/getApi';
import { userAuth } from '../components/store/Store';

// profile related
export function profileData() {
  const { user } = userAuth();
  return useQuery({
    queryKey: ['profile', user],
    queryFn: () => getProfileApi(user),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}