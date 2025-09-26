import { Loader } from "lucide-react";

export default function Spinner(props: any) {

  return (
    <Loader
      size={props.size || 16}
      className={`animate-spin  z-9999 dark:text-blue-600 ${props.className || 'text-white'}`}
    />
  );
}
