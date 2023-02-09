<template>
  <div class="v-mail-signature-generator">
    <div class="fp-grid-container">
      <div class="fp-grid-coll-24-24">
        <h1>Générateur de signature mail&nbsp;ForPro</h1>

        <form
            class="v-mail-signature-generator__content fp-ui-form"
        >
          <input type="text" placeholder="prénom"   v-model="firstname">
          <input type="text" placeholder="nom"      v-model="name">
          <input type="text" placeholder="fonction" v-model="activity" >
          <input type="text" placeholder="numéro"   v-model="tel" >
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
                    style="font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height: 15px; color: black"
                >
                  {{getCleanedEmptyString(firstname, 'prénom')}} {{getCleanedEmptyString(name, '/ nom')}}
                  <br>
                  {{getCleanedEmptyString(activity, 'fonction')}}
                </td>
              </tr>
              <tr>
                <td
                    height="auto"
                    style="font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height: 15px; font-weight: normal; padding-top: 15px; color: black"
                >Fondation <strong>ForPro</strong>
                  <br>Fondation pour la promotion et la valorisation de&nbsp;la&nbsp;Formation&nbsp;Professionnelle
                </td>
              </tr>

              <tr style="padding-top: 15px" >
                <td height="auto"
                    style="font-family:Helvetica, Arial, sans-serif; padding-top: 15px; line-height: 15px; font-size:12px; color:black;"
                >
                  Route de la Galaise 17
                  <br>1228 Plan-les-Ouates
                </td>
              </tr>

              <tr>
                <td height="auto"
                    style="font-family:Helvetica, Arial, sans-serif; padding-top: 15px; line-height: 15px; font-size:12px; color:black;"
                >
                  <a :href="'tel:' + tel"
                     style="text-decoration: none"
                  >{{getCleanedEmptyString(tel, 'numéro')}}</a>
                </td>
              </tr>
              <tr>
                <td border="0"
                    cellpadding="0"
                    cellspacing="0"
                    height="auto"
                >
                  <img alt="logo forpro"
                       style="height: 30px; margin-top: 15px"
                       src="https://azertypow.github.io/forpro.webapp/images/logo.png" >
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
            @click="copySignatureInClipBoard"
            class="fp-ui-button"
        >Selectionner le texte de signature</button>
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

  font-family: sans-serif;
  min-height: calc(100vh - 200px);
  padding-bottom: var(--wcm-line-height);
  font-size:    var(--wcm-font-size);
  line-height:  var(--wcm-line-height);

  .v-mail-signature-generator__container {
    padding:        var(--wcm-line-height);
    margin-bottom:  var(--wcm-line-height);
    background: white;

    > table {
      pointer-events: none;
    }
  }
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
