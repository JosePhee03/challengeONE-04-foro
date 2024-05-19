import { useState } from "preact/hooks";
import { HeaderProps } from "../components/Header";

export function useHeaderController() {
  const [variant, setVariant] = useState<HeaderProps["variant"]>("primary");
  const [text, setText] = useState<HeaderProps["text"]>();

  const setHeader = (
    variant: HeaderProps["variant"],
    text: HeaderProps["text"]
  ) => {
    setVariant(variant);
    setText(text);
  };

  return { variant, text, setHeader };
}
