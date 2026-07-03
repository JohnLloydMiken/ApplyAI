"use client"
import React from 'react'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottieAnimationProps = {
    src: string,
    className: string,
    loop?: boolean,
    autoplay?: boolean
}
export default function LottieAnimation({src, className,loop,autoplay}:LottieAnimationProps) {
  return (
   <DotLottieReact
   src={src}
   className={className}
   loop = {loop}
   autoplay ={autoplay}
   />
  )
}
