export interface TemplateMeta{
    id: string,
    name: string,
    thumbnailUrl: string,
    supportsPhoto: boolean,
    supportedSections: ('languages' | 'hobbies' | 'summary')[];
}