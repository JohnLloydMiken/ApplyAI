"use client";
import React from "react";
import Image from "next/image";
interface Profile {
  name?: string;
  imageUrl?: string;
}
// user-profile.tsx — centering happens ONCE, at the component that actually needs it
export default function UserProfile({ name, imageUrl }: Profile) {
  return (
    <div className="flex flex-col items-center text-center gap-2 max-w-md mx-auto mb-4">
      <div className="bg-primary-light rounded-full border-2 border-primary p-3">
        <div className="w-11 h-11 flex justify-center items-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name}'s profile photo`}
              width={88}
              height={88}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-primary-600 font-medium text-2xl">
              {name?.charAt(0)}
            </span>
          )}
        </div>
      </div>
      {name ? (
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Welcome back,{" "}
          <span className="bg-linear-to-r from-[#5B5FEF] to-[#8B5CF6] bg-clip-text text-transparent">
            {name}!
          </span>
        </h1>
      ) : (
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Welcome back,{" "}
          <span className="bg-linear-to-r from-[#5B5FEF] to-[#8B5CF6] bg-clip-text text-transparent">
            Guest!
          </span>
        </h1>
      )}
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
        “Your dream career is built one step at a time. Let AI handle the
        formatting so you can focus on leading.”
      </p>
    </div>
  );
}
