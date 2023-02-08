import { defineCustomElement } from 'vue'
import MailSignature from "@/components/MailSignature.ce.vue";

export function register () {
    customElements.define('mail-signature', defineCustomElement(MailSignature))
}
