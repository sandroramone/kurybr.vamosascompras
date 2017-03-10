import { Component } from '@angular/core';

import {  NavController
        , AlertController
        , ModalController
        , ToastController
        , Platform} from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AdMob } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ListaDeCompras: Array<Object>;
  CarrinhoDeCompras: Array<Object>;
  total_da_compra: any;
  novoItem: String;
  admobId: any;

  constructor(
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      public modalCtrl: ModalController,
      public db: Storage,
      public toastCtrl: ToastController,
      private platform: Platform) {



    this.ListaDeCompras = [];

    this.db.get("ListaDeCompras").then( (data) => {

      console.log(data);

      this.ListaDeCompras = data || [];
      
      let soma: number = 0;
      for(let i in data){
        soma += data[i].valor * data[i].qtd;
      };
      
      this.total_da_compra = soma;
    } )

    this.CarrinhoDeCompras = [];
    this.total_da_compra = 0;

     this.admobId = {
            banner: 'ca-app-pub-8038270863375546/',
            interstitial: 'ca-app-pub-8038270863375546/5307794718'
    };

     this.platform.ready().then(() => {


            if(AdMob) {
              console.log("rum")
                AdMob.createBanner({
                    adId: this.admobId.banner,
                    autoShow: true
                }).then(function(){
                  AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
                });




                AdMob.prepareInterstitial({
                    adId: this.admobId.interstitial,
                    autoShow: true
                }).then(function(){ AdMob.showInterstitial(); });

            }
        });


  }

  atualizarCarrinho(){
    this.db.set("ListaDeCompras",this.ListaDeCompras);
  }

  reorderItems(indexes) {
    var element = this.ListaDeCompras[indexes.from];
    this.ListaDeCompras.splice(indexes.from, 1);
    this.ListaDeCompras.splice(indexes.to, 0, element);
    this.atualizarCarrinho();
  }

  novoItemLista(nome){

    var item = { nome : nome, no_carrinho: false, valor: 0, qtd: 1};
    this.ListaDeCompras.push(item);
    this.atualizarCarrinho();
    this.novoItem = "";

	}

  removaItemLista(item){

    if(item.no_carrinho){

      this.AdicionarAoCarrinho(item); // Faz o papel de remoção !

    }

    var index = this.ListaDeCompras.indexOf(item);

		if(index > -1){
			this.ListaDeCompras.splice(index, 1);
		}

    var toast = this.toastCtrl.create({
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
    this.total_da_compra = 0;
    var toast = this.toastCtrl.create({
      message: 'Lista de compras limpa, vamos fazer uma nova ? !!',
      duration: 3000
    });
    toast.present();

  }


  AdicionarAoCarrinho(item){

      if(isNaN(item.valor)
      || isNaN(item.qtd)
      || item.valor <= 0
      || item.qtd <= 0){ return; }


      console.log(`Quantidade é ${item.valor} * ${item.qtd}`, item.valor * item.qtd)

      var valor:any = item.valor * item.qtd;
      var total:any = this.total_da_compra;

      valor = parseFloat(valor);
      total = parseFloat(total);




      if(item.no_carrinho){

        console.log(`Soma ${total} - ${valor} = `,total +  valor);
        this.total_da_compra =  total +  valor ;

      }else{

        console.log(`Subtrai ${total} - ${valor} = `,total -  valor);
        this.total_da_compra =  total -  valor;
        this.total_da_compra = this.total_da_compra.toFixed(2);
      }


      this.total_da_compra = this.total_da_compra;
      console.log(this.total_da_compra)

  }

  ValorItem(item) {

    var prompt = this.alertCtrl.create({
      title: item.nome,
      message: "Coloque o valor da unidade",
      inputs: [
        {
          name: 'valor',
          placeholder: 'R$ 00,00',
          value: item.valor > 0 ? item.valor : "",
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
            var index = this.ListaDeCompras.indexOf(item);
            item.valor = Number(data.valor);
            // atualizando os dados no carrinho
            this.ListaDeCompras[index] = item;
            this.atualizarCarrinho();
          }
        }
      ]

    });

    prompt.present();

  }


  QuantidadeItem(item){

     var prompt = this.alertCtrl.create({
      title: item.nome,
      message: "Qual a quantidade",
      inputs: [
        {
          name: 'qtd',
          placeholder: '10',
          value: item.qtd > 0 ? item.qtd : "",
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

            var index = this.ListaDeCompras.indexOf(item);
            item.qtd = Number(data.qtd)
            // atualizando os dados no carrinho
            this.ListaDeCompras[index] = item;
            this.atualizarCarrinho();
          }
        }
      ]

    });

    prompt.present();

  }

}


