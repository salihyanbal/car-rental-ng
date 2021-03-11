import { RentalDetail } from "./rentalDetail";
import { ResponseModel } from "./responseModel";

export interface RentalDetailResponseModel extends ResponseModel{
    data:RentalDetail[];
}