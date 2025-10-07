// src/app/(auth)/layout.tsx

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50"> {/* Fundo mais claro e suave */}
      {children}
    </div>
  );
}