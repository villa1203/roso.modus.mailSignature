<template>
  <div class="v-mail-signature-generator">
    <div class="fp-grid-container">
      <div class="fp-grid-coll-24-24 v-mail-signature-generator__child-no-margin">
        <h1>Générateur<br/>de signature mail&nbsp;pour<br/>la Fondation&nbsp;Plaza</h1>

        <form
            class="v-mail-signature-generator__content fp-ui-form"
        >
          <input type="text" placeholder="prénom"   v-model="firstname">
          <input type="text" placeholder="nom"      v-model="name">
          <input type="text" placeholder="fonction" v-model="activity" >
          <input type="text" placeholder="numéro"   v-model="tel" >
          <input type="text" placeholder="mail"     v-model="mail" >
        </form>

        <div
            @click="copySignatureInClipBoard"
            class="v-mail-signature-generator__container"
        >
          <div
              dir="ltr"
              ref="htmlContent"
              style="width: 100%"
          >
            <table
                style="width:100%; font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height: 15px; color: black"
            >
              <tbody>
              <tr>
                <td height="auto"
                    style="font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height: 15px; color: black; padding: 0"
                >
                  {{getCleanedEmptyString(firstname, 'Votre prénom')}} {{getCleanedEmptyString(name, '/ Votre nom')}}
                  <br>
                  {{getCleanedEmptyString(activity, 'Votre fonction')}}
                </td>
              </tr>
              <tr>
                <td
                    height="auto"
                    style="font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height: 15px; font-weight: normal; padding: 15px 0 0;color: black"
                ><strong>Fondation Plaza</strong>
                </td>
              </tr>

              <tr>
                <td height="auto"
                    style="font-family:Helvetica, Arial, sans-serif; padding: 0; line-height: 15px; font-size:12px; color:black;"
                >
                  Rue de Chantepoulet 1–3
                  <br>1201 Genève
                </td>
              </tr>

              <tr>
                <td height="auto"
                    style="font-family:Helvetica, Arial, sans-serif; padding: 15px 0 0; line-height: 15px; font-size:12px; color:black;"
                >
                  <a :href="'tel:' + tel"
                     style="text-decoration: none; color: black;"
                  >T {{getCleanedEmptyString(tel, 'Votre numéro')}}</a>
                  <br><a :href="'mailto:' + mail"
                     style="text-decoration: none; color: black;"
                  >{{getCleanedEmptyString(mail, 'Votre adresse mail')}}</a>
                  <br><a
                    href="https://leplaza-cinema.ch/"
                    style="text-decoration: none; color: black;"
                >www.leplaza-cinema.ch</a>
                </td>
              </tr>
              <tr>
                <td border="0"
                    cellpadding="0"
                    cellspacing="0"
                    height="auto"
                    style="padding: 15px 0 0; border: 0;"
                >
                  <img alt="logo plaza"
                       style="height: 45px; margin: 0; width: 144px; max-width: 144px"
                       src="https://fondation-plaza.github.io/mail.signature/LOGO@0-5x.svg" >
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
            @click="copySignatureInClipBoard"
            class="fp-ui-button"
        >Sélectionner le texte de signature</button>
        <p>
          Une fois le texte sélectionné (le texte devient vert quand il est sélectionné), copiez-le et collez-le dans votre
          <br>outil de messagerie mail, dans les paramètres de signatures automatiques.
        </p>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({

  data() {
    return {
      firstname: '',
      name: '',
      activity: '',
      tel: '',
      mail: '',
    }
  },

  methods: {
    copySignatureInClipBoard() {
      /* Get the text field */
      const htmlContentToCopy = this.$refs.htmlContent;

      if(!( htmlContentToCopy instanceof HTMLElement)) return

      const selection = window.getSelection()
      const range = document.createRange()

      range.selectNodeContents(htmlContentToCopy)

      if(! selection) return
      selection.removeAllRanges()
      selection.addRange(range)

      // todo: can't copy style (html is string when past content in mail app)
      // function setClipboard(text) {
      //   const type = "text/html";
      //   const blob = new Blob(['<h1>'+text+'</h1>'], { type });
      //   const data = [new ClipboardItem({ [type]: blob })];
      //
      //   navigator.clipboard.write(data).then(
      //       function () {
      //         /* success */
      //         console.log('succcess')
      //       },
      //       function (e) {
      //         /* failure */
      //         console.log('failed')
      //         console.log(e)
      //       }
      //   );
      // }

    },

    getCleanedEmptyString(value: string, placeholder: string):string {
      if(value.length > 0) return value
      return placeholder + ' doit être rempli'
    }
  },

})</script>

<style lang="scss" scoped>
.v-mail-signature-generator {
  --wcm-line-height:  20px;
  --wcm-font-size:    18px;

  max-width: 30em;
  font-family: sans-serif;
  min-height: calc(100vh - 200px);
  padding-bottom: var(--wcm-line-height);
  font-size:    var(--wcm-font-size);
  line-height:  var(--wcm-line-height);
  margin: auto;

  .v-mail-signature-generator__container {
    padding:        var(--wcm-line-height);
    margin-bottom:  var(--wcm-line-height);
    background: white;

    > *::-moz-selection { /* Code for Firefox */
      color: lightseagreen;
      background: #b0fdf6;
    }

    >* ::selection {
      color: lightseagreen;
      background: #b0fdf6;
    }

    > table {
      pointer-events: none;
    }
  }
}

h1 {
  font-size: calc( var(--wcm-font-size) * 2);
  line-height: calc( var(--wcm-line-height) * 2);
}

.v-mail-signature-generator__child-no-margin {
  > *:first-child {margin-top: 0}
  > *:last-child {margin-bottom: 0}
}

.fp-grid-container {
  display: flex;
  flex-wrap: wrap;
}

.fp-ui-form {
  display: flex;
  flex-wrap: wrap;

  > input {
    all: unset;
    display: block;
    position: relative;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
    box-shadow: inset 0 0 0 2px currentColor;
    padding: calc(var(--wcm-line-height) / 2 );
    margin-bottom: var(--wcm-line-height);
  }

}

.fp-grid-coll-24-24 { width: calc(100% / 24 * 24);}

.fp-ui-button {
  all: unset;
  line-height: var(--wcm-line-height);
  font-size: var(--wcm-font-size);
  font-weight: 400;
  margin: 0 auto;
  cursor: pointer;
  display: block;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 2px currentColor;
  padding: calc(var(--wcm-line-height) / 2 ) calc(var(--wcm-line-height) );
}

</style>
