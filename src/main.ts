import { defineCustomElement } from 'vue'
import MailSignature from "@/components/MailSignature.ce.vue";

console.log('hello')
console.log(MailSignature)

export function register () {
    customElements.define('mail-signature', defineCustomElement(MailSignature))
}
