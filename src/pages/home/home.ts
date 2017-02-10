import { Component } from '@angular/core';

import {  NavController
        , AlertController
        , ModalController
        , ToastController
        } from 'ionic-angular';

import { Storage } from '@ionic/storage';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ListaDeCompras: Array<Object>;
  CarrinhoDeCompras: Array<Object>;
  total_da_compra: Number;
  novoItem: String;
  constructor(
      public navCtrl: NavController, 
      public alertCtrl: AlertController,
      public modalCtrl: ModalController,
      public db: Storage,
      public toastCtrl: ToastController) {



    this.ListaDeCompras = [];

    this.db.get("ListaDeCompras").then( (data) => {

      console.log(data);

      this.ListaDeCompras = data || []
    } )
     
    this.CarrinhoDeCompras = [];
    this.total_da_compra = 0;
    
  }

  atualizarCarrinho(){
    this.db.set("ListaDeCompras",this.ListaDeCompras);
  }

  reorderItems(indexes) {
    let element = this.ListaDeCompras[indexes.from];
    this.ListaDeCompras.splice(indexes.from, 1);
    this.ListaDeCompras.splice(indexes.to, 0, element);
  }

  novoItemLista(nome){

    let item = { nome : nome, no_carrinho: false, valor: 0, qtd: 0};
    this.ListaDeCompras.push(item);
    this.atualizarCarrinho();
    this.novoItem = "";
    
	}

  removaItemLista(item){
    if(item.no_carrinho){
      if(!isNaN(item.valor) || !isNaN(item.qtd)){ 
        let valor:any = Number(item.valor * item.qtd);
        let total:any = Number(this.total_da_compra);
        this.total_da_compra =  Number(total -  valor.toFixed(2));  
      }
    }

    let index = this.ListaDeCompras.indexOf(item);

		if(index > -1){      
			this.ListaDeCompras.splice(index, 1);
		}

    let toast = this.toastCtrl.create({
      message: 'Item removido !!',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: `Desfazer`
    });
    
    toast.present();

  }


  


  limparLista(){

    this.ListaDeCompras = [];
    this.db.clear();

    let toast = this.toastCtrl.create({
      message: 'Lista de compras limpa, vamos fazer uma nova ? !!',
      duration: 3000
    });
    toast.present();

  }


  AdicionarAoCarrinho(item){
    
      if(isNaN(item.valor) || isNaN(item.qtd)){ return; }

      let valor:any = Number(item.valor * item.qtd);
      let total:any = Number(this.total_da_compra);
      
      if(item.no_carrinho){
        this.total_da_compra =  Number(total +  valor.toFixed(2));  
      }else{
        this.total_da_compra =  Number(total -  valor.toFixed(2));  
      }
      
  }

  ValorItem(item) {
    
    let prompt = this.alertCtrl.create({
      title: item.nome,
      message: "Coloque o valor da unidade",
      inputs: [
        {
          name: 'valor',
          placeholder: 'R$ 00,00',
          value: item.valor,
          type:"number"
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let index = this.ListaDeCompras.indexOf(item);
            item.valor = data.valor
            // atualizando os dados no carrinho
            this.ListaDeCompras[index] = item;
            
          }
        }
      ]

    });

    prompt.present();
    
  }
  QuantidadeItem(item){

     let prompt = this.alertCtrl.create({
      title: item.nome,
      message: "Qual a quantidade",
      inputs: [
        {
          name: 'qtd',
          placeholder: '10',
          value: item.qtd,
          type:"number"
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            
            let index = this.ListaDeCompras.indexOf(item);
            item.qtd = data.qtd
            // atualizando os dados no carrinho
            this.ListaDeCompras[index] = item;
          }
        }
      ]

    });

    prompt.present();

  }

}


