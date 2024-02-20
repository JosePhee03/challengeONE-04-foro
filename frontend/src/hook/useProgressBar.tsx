import { useEffect, useState } from "preact/hooks";

export default function useProgressBar() {

  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);


  useEffect(() => {
    const handleFinishComponentLoad = () => {
      setLoading(false)
    };
    setWidth(100)


    const timer = setTimeout(handleFinishComponentLoad, 2000);


    return () => {
      clearTimeout(timer);
    };
  }, [])

  return { loading, setLoading, width, setWidth }
} 