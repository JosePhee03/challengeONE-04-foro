import { useEffect } from "preact/hooks";
import useProgressBar from "../hook/useProgressBar";

export default function ProgressBar() {

  const { loading, setLoading, width, setWidth } = useProgressBar();

  useEffect(() => {
    const handleStartLoading = () => {
      setLoading(true);
      setWidth(70)
    };

    window.addEventListener('hashchange', handleStartLoading);
    window.addEventListener('popstate', handleStartLoading);

    return () => {
      window.removeEventListener('hashchange', handleStartLoading);
      window.removeEventListener('popstate', handleStartLoading);
    };
  }, []);

  return (
    <div class="relative bg-slate-600">
      {loading && <div class="fixed top-0 right-0 left-0  w-full h-1" role="progressbar" >
        <span class="transition-all duration-500 ease-out absolute h-full bg-primary" style={{ width: width + "%" }}></span>
      </div>}
    </div >
  )
}