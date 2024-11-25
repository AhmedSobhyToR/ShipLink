export interface Column{
    label: string;
    property: string | number;
    valueTransformation?: (value: any) => any;
}