import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { FakecardService } from 'src/app/services/fakecard.service';
import { RentalService } from 'src/app/services/rental.service';
import { CustomerCard } from 'src/app/models/customerCard';
import { CustomercardService } from 'src/app/services/customercard.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditCardComponent implements OnInit  {
  rental:Rental;
  nameOnTheCard:string;
  cardNumber:string;
  cardCvv:string;
  expirationDate:string;
  cardExist:Boolean = false;
  savedCards: FakeCard[] = [];
  selectedCard: FakeCard;
  creditCardForm: FormGroup;
  constructor(
    private fakeCardService:FakecardService,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private customerCardService:CustomercardService,
    private authService:AuthService,
    private confirmationService: ConfirmationService,
    private config: DynamicDialogConfig,
    private formBuilder:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.getRental()
    this.getSavedCards()
    this.setCreditCardForm()
  }

  setCreditCardForm(){
    this.creditCardForm = this.formBuilder.group({
      savedCards: [""],
      nameOnTheCard: ["",Validators.required],
      cardNumber: ["", Validators.required],
      cardCvv: ["", Validators.required],
      expirationDate: ["", Validators.required],
    })
  }

  getRental(){
    this.rental = this.config.data.rental
  }

  async rent(){
    if(this.creditCardForm.valid){
      let fakeCard:FakeCard = Object.assign({},this.creditCardForm.value)
      this.cardExist = await this.isCardExist(fakeCard)
      if(this.cardExist){
        let newFakeCard = await((this.getFakeCardByCardNumber(this.cardNumber))) 
        let wannaSave = await this.isSaved(newFakeCard)
        if(!wannaSave){
          this.rentACar(newFakeCard)
        }
      }else{
        this.toastrService.error("Bankanız bilgilerinizi onaylamadı","Hata")
      }
    }else{
      this.toastrService.error("Formu doldurmanız gerekli","Hata")
    }
    
  }

  async isCardExist(fakeCard:FakeCard){
    return (await this.fakeCardService.isCardExist(fakeCard).toPromise()).success
  }

  async getFakeCardByCardNumber(cardNumber:string):Promise<FakeCard>{
    return (await (this.fakeCardService.getCardByNumber(cardNumber)).toPromise()).data[0]
  }

  updateCard(fakeCard:FakeCard){
    this.fakeCardService.updateCard(fakeCard).subscribe();
  }

  async isSaved(fakeCard:FakeCard):Promise<boolean>{
    let result = false
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerCardService.getByCustomerId(customerId).toPromise()).data
    let isContains = customerCards.map(cc => cc.cardId).includes(fakeCard.id)
    if(!isContains){
      this.wannaSave(fakeCard)
      result =  true
    }
    return result
  }

  wannaSave(fakeCard:FakeCard){
    this.confirmationService.confirm({
      message:   'Kartınız sistemde kayıtlı değil kaydetmek ister misiniz?',
      accept: () => {
        this.saveCard(fakeCard)
        this.rentACar(fakeCard)
      },
      reject: () => {
        this.rentACar(fakeCard)
      }
    })
  }

  saveCard(fakeCard:FakeCard){
    this.customerCardService.saveCard(fakeCard).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
    });
  }
  
  async rentACar(fakeCard:FakeCard){
    if(fakeCard.moneyInTheCard>=this.rental.totalRentPrice){
      fakeCard.moneyInTheCard = fakeCard.moneyInTheCard - this.rental.totalRentPrice
      this.updateCard(fakeCard)
      this.rentalService.addRental(this.rental)
      this.toastrService.success("Arabayı kiraladınız","Işlem başarılı")
      setTimeout(function(){
        location.reload()
      },400)
    }else {
      this.toastrService.error("Kartınızda yeterli para bulunmamaktadır","Hata")
    }
  }

  async getSavedCards(){
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerCardService.getByCustomerId(customerId).toPromise()).data
    customerCards.forEach(card => {
      this.fakeCardService.getCardById(card.cardId).subscribe(response => {
        this.savedCards.push(response.data)
      })
    });
  }

  setCardInfos(){
    this.creditCardForm.patchValue(
      this.selectedCard
    )
  }
}
