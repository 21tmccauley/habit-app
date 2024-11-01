import { Toaster } from "@/components/ui/toaster";

export function ToastProvider() {
  return <Toaster />;
}

// Create a custom hook for using toast (src/hooks/use-toast.js)
export { useToast } from "@/components/ui/use-toast";