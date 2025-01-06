import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";
import LoginForm from "@/components/forms/login-form";
function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex justify-center mb-[90px]">
        <Image src={logo} alt="logo" height={278} width={210} loading="lazy" />
      </div>
      
      <LoginForm />
     
    </div>
  );
}

export default LoginPage;
