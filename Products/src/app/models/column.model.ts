export interface Column{
    label: string;
    property: string;
    valueTransformation?: (value: any) => string;
}