// src/app/(store)/conta/page.tsx

export default function AccountPage() {
  // Por enquanto, vamos simular o nome do usuário
  const userName = "Amigo(a) dos Brinquedos";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Olá, {userName}!</h2>
      <p className="text-gray-600">
        Bem-vindo ao seu painel! Aqui você pode gerenciar seus pedidos,
        endereços e informações pessoais. Use o menu ao lado para navegar.
      </p>
    </div>
  );
}