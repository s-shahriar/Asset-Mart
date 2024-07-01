import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading: isRoleLoading, error } = useQuery({
    queryKey: [user?.email, 'role', 'companyName', 'companyLogo'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return { 
        role: res.data?.role || 'guest', 
        companyName: res.data?.companyName || '',
        companyLogo: res.data?.companyLogo || ''
      };
    },
    onError: (err) => {
      console.error("Failed to fetch user data:", err);
    }
  });

  return [data?.role, data?.companyName, data?.companyLogo, isRoleLoading, error];
};

export default useRole;
