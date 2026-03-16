// src/types/index.ts
export interface SiteData {
    brandName: string;
    fullName: string;
    seoDescription: string;
    logo?: string;
}

export interface ContactData {
    email: string;
    phone: string;
    address: string;
    social: {
        instagram: string;
        linkedin: string;
    };
    footerTagline: string;
}

export interface HeroData {
    title: string;
    subtitle: string;
    ctaText: string;
    image: string;
}

export interface AboutData {
    mainTitle: string;
    description: string;
    experience: string;
    gallery?: string[];
}

export interface ServiceData {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    tag?: string;
}

export interface ServicesConfigData {
    backgroundImage?: string;
}

export interface ProjectData {
    id: string;
    title: string;
    category: string;
    image: string;
    location: string;
    gallery: string[];
    wide: boolean;
    color?: string;
}

export interface PartnerData {
    name: string;
    logo: string;
}

export interface TestimonialData {
    id: string;
    text: string;
    author: string;
    role: string;
    avatar: string;
}