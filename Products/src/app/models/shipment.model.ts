export interface ShipmentsList{
    id: string;
    carrier: Carrier;
    origin:addressDto;
    destination:addressDto;
    shippedDate: Date | string;
    estimatedDeliveryDate:  Date | string;
    status: string;
    [key:string]: any;
}


export interface ShipmentDetails{
    id: string;
    trackingNumber: string;
    sender: personDto;
    receiver: personDto;
    products: productDto[];
    status: string;
    origin:addressDto;
    destination:addressDto;
    shippedDate:string;
    estimatedDeliveryDate: string;
    carrier: Carrier;
    notes: string;
}

export interface ShipmentFilter{
    shipmentId: string;
    shipmentCarrier: string;
    shipmentStatus: string;
    shipmentDateFrom: string;
    shipmentDateTo: string;
}

export interface personDto{
    name: string;
    phone: string;
}

export interface productDto{
    id: string;
    name: any;
    quantity: number;
    notes?: string;
}
export interface addressDto{
    street:string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface Carrier{
    id: string;
    name: string;
}