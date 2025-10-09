"use client";
import { useState, useEffect } from "react";
import { Banner } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PlusCircle, Trash2 } from "lucide-react";
import { Popup } from "@/components/ui/Popup";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const API_URL = 'http://localhost:8080/api/banners';

export default function AdminBannersPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [titulo, setTitulo] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [deletingBanner, setDeletingBanner] = useState<Banner | null>(null);
    const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

    const fetchBanners = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Falha ao carregar banners.");
            setBanners(await res.json());
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        }
    };

    useEffect(() => { fetchBanners(); }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const body = new FormData();
        body.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                method: 'POST', body: body,
            });
            if (!response.ok) throw new Error('Falha no upload da imagem.');
            const result = await response.json();
            setImagemUrl(result.data.display_url);
        } catch (error) {
            alert('Não foi possível enviar a imagem.');
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imagemUrl || !titulo) {
            setPopup({ show: true, type: 'error', message: 'Preencha o título e envie uma imagem.'});
            return;
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo, imagemUrl }),
            });
            if (!response.ok) throw new Error("Falha ao salvar banner.");
            setPopup({ show: true, type: 'success', message: 'Banner adicionado com sucesso!' });
            setTitulo('');
            setImagemUrl('');
            fetchBanners();
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        }
    };

    const handleDelete = async () => {
        if (!deletingBanner) return;
        try {
            const response = await fetch(`${API_URL}/${deletingBanner.id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Falha ao excluir banner.");
            setPopup({ show: true, type: 'success', message: 'Banner excluído com sucesso!' });
            setDeletingBanner(null);
            fetchBanners();
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        }
    };

    return (
        <>
            {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
            <ConfirmationModal isOpen={!!deletingBanner} onClose={() => setDeletingBanner(null)} onConfirm={handleDelete} title="Confirmar Exclusão" message={`Tem certeza que deseja excluir o banner "${deletingBanner?.titulo}"?`} />

            <div>
                <h1 className="text-3xl font-bold mb-6">Gerenciar Banners do Carrossel</h1>

                <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md my-6 space-y-4">
                    <h2 className="text-xl font-bold mb-4">Adicionar Novo Banner</h2>
                    <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título do banner (para identificação)" required />
                    <Input type="file" onChange={handleImageUpload} accept="image/*" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    {isUploading && <p className="text-sm text-blue-600">Enviando imagem...</p>}
                    {imagemUrl && !isUploading && <img src={imagemUrl} alt="Pré-visualização" className="rounded-lg border max-h-32 mt-2" />}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isUploading}>{isUploading ? 'Aguarde...' : 'Salvar Banner'}</Button>
                    </div>
                </form>

                <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Pré-visualização</th><th className="px-6 py-3 text-left">Título</th><th className="px-6 py-3 text-right">Ações</th></tr></thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {banners.map(banner => (
                                <tr key={banner.id}>
                                    <td className="px-6 py-4"><img src={banner.imagemUrl} alt={banner.titulo} className="h-16 w-32 object-cover rounded"/></td>
                                    <td className="px-6 py-4">{banner.titulo}</td>
                                    <td className="px-6 py-4 text-right"><button onClick={() => setDeletingBanner(banner)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}