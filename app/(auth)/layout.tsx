import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  try {
    const isUserAuthenticated = await isAuthenticated();
    if (isUserAuthenticated) redirect("/");
  } catch (error: any) {
    console.error("Error in AuthLayout:", error.message || error);
  }

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
