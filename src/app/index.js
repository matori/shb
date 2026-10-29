import { mount } from "svelte"
import "./assets/styles/global.css"
import App from "./App.svelte"

const app = mount(App, {
  target: document.body,
  intro: true,
})

export default app
