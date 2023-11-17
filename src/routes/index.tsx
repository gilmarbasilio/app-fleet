import { useAuthStore } from "../shared/store/useAuthStore";
import PrivateRoutes from "./private.routes";
import PublicRoutes from "./public.routes";

export default function Routes() {
  const user = useAuthStore((state) => state.user);
  console.log({ user });
  return <>{user?.id ? <PrivateRoutes /> : <PublicRoutes />}</>;
}
