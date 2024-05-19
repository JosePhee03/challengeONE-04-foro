import { MutableRef, useEffect, useRef, useState } from "preact/hooks";

export default function useNearScreen({
  distance = "16px",
  externalRef,
  once = true,
}: {
  distance?: string;
  externalRef: MutableRef<Element | null> | null;
  once?: boolean;
}) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer: IntersectionObserver;

    const element = externalRef ? externalRef.current : fromRef.current;

    const onChange: IntersectionObserverCallback = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        once && observer.disconnect();
      } else {
        !once && setShow(false);
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    if (element) observer.observe(element);

    return () => observer && observer.disconnect();
  }, []);

  return { isNearScreen, fromRef };
}
