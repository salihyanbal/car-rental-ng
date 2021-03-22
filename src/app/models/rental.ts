import { Time } from "@angular/common";

export interface Rental{
    id?:number;
    carId:number;
    customerId?:string;
    rentDate?:string;
    rentStartDate:string;
    rentEndDate?:string;
    returnDate?:string;
    totalRentPrice?:number;

}