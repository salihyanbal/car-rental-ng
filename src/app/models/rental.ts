import { Time } from "@angular/common";

export interface Rental{
    id?:number;
    carId:number;
    userId?:number;
    rentDate?:string;
    rentStartDate:string;
    rentEndDate?:string;
    returnDate?:string;
    totalRentPrice?:number;

}