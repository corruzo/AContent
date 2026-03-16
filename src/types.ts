// src/types.ts

export interface SiteData {
    brandName: string;
    fullName: string;
    logo?: string;
    seoDescription: string;
}

export interface ContactData {
    email: string;
    phone: string;
    address: string;
    social: {
        instagram?: string;
        linkedin?: string;
    };
    footerTagline?: string;
}

export interface HeroData {
    title: string;
    subtitle: string;
    ctaText: string;
    image?: string;
}

export interface AboutData {
    mainTitle: string;
    description: string;
    experience: string;
    gallery?: string[];
}

export interface ServicesConfigData {
    backgroundImage?: string;
}

export interface ServiceData {
    title: string;
    subtitle: string;
    description: string;
    icon: 'camera' | 'video' | 'drone' | 'phone' | 'home' | 'branding';
    tag?: string;
}

export interface ProjectData {
    title: string;
    category: string;
    location: string;
    type: string;
    color?: string;
    wide?: boolean;
    image?: string;
    gallery?: string[];
}

export interface PartnerData {
    name: string;
    logo: string;
}
