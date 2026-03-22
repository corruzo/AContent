// src/utils/data.ts
import type { ContactData, HeroData, ProjectData, PartnerData, SiteData, AboutData, ServiceData, ServicesConfigData, TestimonialData } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function getSiteData(): Promise<SiteData> {
    try {
        if (!isSupabaseConfigured) throw new Error('Supabase not configured');
        const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single();
        if (error || !data) throw new Error('no data');
        return {
            brandName: data.brand_name || 'Anais Content',
            fullName: data.full_name || 'Anais Cruz',
            seoDescription: data.seo_description || '',
            logo: data.logo_url
        };
    } catch {
        return {
            brandName: 'Anais Content',
            fullName: 'Anais Cruz',
            seoDescription: 'Estrategia visual y marketing de impacto para el sector inmobiliario.'
        };
    }
}

export async function getSiteLogo(): Promise<string | null> {
    try {
        const siteData = await getSiteData();
        return siteData.logo || null;
    } catch {
        return null;
    }
}

export async function getContactData(): Promise<ContactData> {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('email, phone, address, instagram_url, linkedin_url, footer_tagline')
            .eq('id', 1)
            .single();
        if (error || !data) throw new Error('no data');
        return {
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            social: {
                instagram: data.instagram_url || '',
                linkedin: data.linkedin_url || ''
            },
            footerTagline: data.footer_tagline || ''
        };
    } catch {
        return {
            email: 'contacto@acontent.net',
            phone: '+506 0000 0000',
            address: 'Costa Rica',
            social: { instagram: '', linkedin: '' },
            footerTagline: 'Estrategia visual para activos inmobiliarios.'
        };
    }
}

export async function getHeroData(): Promise<HeroData> {
    try {
        const { data, error } = await supabase.from('hero').select('*').eq('id', 1).single();
        if (error || !data) throw new Error('no data');
        return {
            title: data.title || 'Anais Cruz',
            subtitle: data.subtitle || '',
            ctaText: data.cta_text || 'Ver Mi Trabajo',
            image: data.image_url
        };
    } catch {
        return {
            title: 'Anais Cruz',
            subtitle: 'Marketing Inmobiliario de Lujo',
            ctaText: 'Ver Mi Trabajo',
        };
    }
}

export async function getAboutData(): Promise<AboutData> {
    try {
        const { data, error } = await supabase.from('about').select('*').eq('id', 1).single();
        if (error || !data) throw new Error('no data');
        return {
            mainTitle: data.main_title || '',
            description: data.description || '',
            experience: data.experience || '',
            gallery: data.gallery || []
        };
    } catch {
        return {
            mainTitle: 'Estrategia & narrativa visual',
            description: 'Como periodista y estratega visual...',
            experience: 'Costa Rica • Real Estate Marketing Expert'
        };
    }
}

export async function getServices(): Promise<ServiceData[]> {
    try {
        const { data, error } = await supabase.from('services').select('*').order('id');
        if (error || !data) return [];
        return data.map(s => ({
            id: s.id,
            icon: s.icon,
            title: s.title,
            subtitle: s.subtitle || '',
            description: s.description || '',
            tag: s.tag || ''
        }));
    } catch {
        return [];
    }
}

export async function getServicesConfig(): Promise<ServicesConfigData> {
    try {
        const { data, error } = await supabase.from('site_settings').select('services_bg_url').eq('id', 1).single();
        if (error || !data) return { backgroundImage: '' };
        return { backgroundImage: data.services_bg_url || '' };
    } catch {
        return { backgroundImage: '' };
    }
}

export async function getProjects(): Promise<ProjectData[]> {
    try {
        const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
        if (error || !data) return [];
        return data.map(p => ({
            ...p,
            id: p.id,
            wide: p.is_wide,
            image: p.image_url,
            gallery: p.gallery || []
        }));
    } catch {
        return [];
    }
}

export async function getPartners(): Promise<PartnerData[]> {
    try {
        const { data, error } = await supabase.from('partners').select('*').order('id');
        if (error || !data) return [];
        return data.map(p => ({
            name: p.name,
            logo: p.logo_url
        }));
    } catch {
        return [];
    }
}

// ─── FIX: Mapeo correcto de columnas DB → interfaz ──────────────────────────
// Columnas reales en DB: id, name, role, content, image_url, created_at
// La interfaz espera:    id, author, role, text,    avatar
export async function getTestimonials(): Promise<TestimonialData[]> {
    try {
        const { data, error } = await supabase.from('testimonials').select('*').order('id');
        if (error || !data) return [];
        return data.map(t => ({
            id:     t.id,
            text:   t.content  || '',          // DB: content  → interface: text
            author: t.name     || '',          // DB: name     → interface: author
            role:   t.role     || '',
            // DB: image_url almacena las iniciales (ej: "RA")
            // Si está vacío, genera iniciales automáticamente del nombre
            avatar: t.image_url || (
                t.name
                    ? t.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                    : '?'
            )
        }));
    } catch {
        return [];
    }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
export function normalizeAssetPath(path: string | undefined): string {
    if (!path) return '';
    return path;
}

export function getFilenameFromPath(path: string | undefined): string {
    if (!path) return '';
    return path.split('/').pop() || '';
}

export function getBasenameFromPath(path: string | undefined): string {
    if (!path) return '';
    const filename = path.split('/').pop() || '';
    return filename.split('.')[0] || '';
}

export function cleanWhatsAppNumber(phone: string | undefined): string {
    if (!phone) return '';
    return phone.replace(/\D/g, '');
}

// ─── Util: btoa seguro con caracteres Unicode / español ──────────────────────
// Usar en TODOS los admin pages en lugar de btoa(JSON.stringify(data))
export function safeEncode(obj: unknown): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

export function safeDecode(str: string): unknown {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
}