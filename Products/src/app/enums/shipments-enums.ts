import { DatePipe } from "@angular/common"
import { addressDto, Carrier } from "../models/shipment.model"

export const SHIPMENTS_LIST_COLUMNS = [
    {
        label: 'SHIPMENT.ID',
        property : 'id'
    },
    {
        label: 'SHIPMENT.CARRIER',
        property : 'carrier',
        valueTransformation:(carrier: Carrier) => carrier.name

    },
    {
        label: 'SHIPMENT.ORIGIN',
        property : 'origin',
        valueTransformation:(origin: addressDto) => origin.street + ', ' + origin.state + ', ' + origin.city
    },
    {
        label: 'SHIPMENT.DESTINATION',
        property : 'destination',
        valueTransformation:(destination: addressDto) => destination.street + ', ' + destination.state + ', ' + destination.city
    },
    {
        label: 'SHIPMENT.SHIPPED_DATE',
        property : 'shippedDate',
        valueTransformation: (shippedDate: string) => {
           let [d,t] = shippedDate.split('T');
           d = d.replace('Z','');
           return [d]
        }
    },
    {
        label: 'SHIPMENT.ESTIMATED_DELIVERY_DATE',
        property : 'estimatedDeliveryDate',
        valueTransformation: (estimatedDeliveryDate: string) => {
            let [d,t] = estimatedDeliveryDate.split('T');
            d = d.replace('Z','');
            return [d]
         }
         
    },

    {
        label: 'SHIPMENT.STATUS',
        property : 'status',
    
    }
]

export const ShipmentsStatus  = [
    {label: 0, textAr:"قيد الانتظار",textEn:"Pending" },
    {label: 1, textAr:"تم الشحن",textEn:"Shipped" },
    {label: 2, textAr:"تم التوصيل",textEn:"Delivered" },
    {label: 3, textAr:"تم الالغاء",textEn:"Canceled" },
    {label: 4, textAr:"تمت الاعادة",textEn:"Returned" },

];

export enum ShipmentStatus {
    Pending = 'Pending',
    Shipped = 'Shipped', 
    Delivered = 'Delivered',
    Canceled = 'Canceled',
    Returned = 'Returned',
  }
