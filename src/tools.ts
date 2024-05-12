export const sayHello = (p: Options) => {
  return (`hello ${p.name}`)
}
export interface Options {
  name: string
}