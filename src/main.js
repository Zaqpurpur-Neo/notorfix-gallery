import { mount } from 'svelte'
import Content from './Content.svelte'

const content = mount(Content, {
  target: document.getElementById('#content'),
})

export default content
