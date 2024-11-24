import { DatePipe } from "@angular/common"
import { addressDto } from "../models/shipment.model"

export const SHIPMENTS_LIST_COLUMNS = [
    {
        label: 'SHIPMENT.ID',
        property : 'id'
    },
    {
        label: 'SHIPMENT.CARRIER',
        property : 'carrier'
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
        valueTranfsormation: (shippedDate: string | Date) => {
            const datePipe = new DatePipe('en-US')
            return datePipe.transform(shippedDate, 'MM, dd, yyyy')
        }
    },
    {
        label: 'SHIPMENT.ESTIMATED_DELIVERY_DATE',
        property : 'estimatedDeliveryDate'
    }
]

export enum ShipmentStatus {
    Pending = 'Pending',
    Shipped = 'Shipped', 
    Delivered = 'Delivered',
    Canceled = 'Canceled',
    Returned = 'Returned',
  }
