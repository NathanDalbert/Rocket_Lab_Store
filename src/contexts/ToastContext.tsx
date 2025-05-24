import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { createContext, type ReactNode, useCallback, useContext, useState } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface ToastContextType {
  showToast: (message: string, type: Toast["type"]) => void;
}


const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"]) => {
    const id = Math.random().toString(36).substring(2, 9); 
    const newToast = { id, message, type };

    setToasts((prevToasts) => [...prevToasts, newToast]);

   
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const getToastConfig = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500 dark:bg-green-600",
          icon: CheckCircle,
          text: "text-white",
        };
      case "error":
        return {
          bg: "bg-red-500 dark:bg-red-600",
          icon: AlertCircle,
          text: "text-white",
        };
      case "warning":
        return {
          bg: "bg-yellow-500 dark:bg-yellow-600", 
          icon: AlertTriangle,
          text: "text-white dark:text-gray-900",
        };
      case "info":
        return {
          bg: "bg-blue-500 dark:bg-blue-600",
          icon: Info,
          text: "text-white",
        };
      default: 
        return {
          bg: "bg-gray-500 dark:bg-gray-400",
          icon: Info,
          text: "text-white dark:text-gray-900",
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

     
      <div className="fixed top-4 right-4 z-[100] space-y-3 w-auto max-w-sm"> 
        {toasts.map((toast) => {
          const config = getToastConfig(toast.type);
          const IconComponent = config.icon;

          return (
            <div
              key={toast.id}
            
              className={`flex items-center gap-3 p-4 rounded-lg shadow-2xl min-w-[300px] sm:min-w-[320px] animate-fadeIn ${config.bg} ${config.text}`}
              role="alert"
              aria-live="assertive"
            >
              <IconComponent className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="flex-1 text-sm font-medium sm:text-base">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 ml-2 transition-opacity rounded-full hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white"
                aria-label="Fechar notificação"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
}