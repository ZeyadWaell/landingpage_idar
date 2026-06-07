import { cn } from "@/lib/utils";

type AuthAlertProps = {
  variant: "error" | "success" | "info";
  message: string;
  details?: string;
};

export function AuthAlert({ variant, message, details }: AuthAlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        variant === "error" && "border-red-200 bg-red-50 text-red-700",
        variant === "success" && "border-green-200 bg-green-50 text-green-700",
        variant === "info" && "border-blue-200 bg-blue-50 text-blue-700",
      )}
    >
      <p>{message}</p>
      {details && <p className="mt-1 text-xs opacity-80">{details}</p>}
    </div>
  );
}
