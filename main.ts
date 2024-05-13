import { render } from './src/webgpu'
const canvasEle = document.querySelector('canvas')
const adapter = await navigator.gpu.requestAdapter()
const device = await adapter?.requestDevice()!
render(canvasEle!, device!)