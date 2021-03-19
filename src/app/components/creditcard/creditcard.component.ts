import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { FakecardService } from 'src/app/services/fakecard.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditCardComponent implements OnInit {
  rental:Rental;
  nameOnTheCard:string;
  cardNumber:string;
  cardCvv:string;
  fakeCard:FakeCard;
  cardExist:Boolean = false;
  constructor(
    private activatedRoute:ActivatedRoute,
    private fakeCardService:FakecardService,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
      }
    })
  }

  async rentACar(){
    let fakeCard:FakeCard = {nameOnTheCard:this.nameOnTheCard,cardNumber:this.cardNumber,cardCvv:this.cardCvv}
    this.cardExist = await this.isCardExist(fakeCard)
    if(this.cardExist){
      this.fakeCard = await((this.getFakeCardByCardNumber(this.cardNumber))) 
      this.fakeCard.moneyInTheCard = this.fakeCard.moneyInTheCard - this.rental.totalRentPrice
      this.updateCard(fakeCard)
      this.rentalService.addRental(this.rental)
      this.toastrService.success("Arabayı kiraladınız","Işlem başarılı")
    }else{
      this.toastrService.error("Bankanız bilgilerinizi onaylamadı","Kart bulunamadı")
    }
  }

  async isCardExist(fakeCard:FakeCard){
    return (await this.fakeCardService.isCardExist(fakeCard).toPromise()).success
  }

  async getFakeCardByCardNumber(cardNumber:string){
    return (await (this.fakeCardService.getCardByNumber(cardNumber)).toPromise()).data[0]
  }

  updateCard(fakeCard:FakeCard){
    this.fakeCardService.updateCard(fakeCard);
  }

}
