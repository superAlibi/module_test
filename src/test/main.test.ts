import  {sayHello} from '../tools'
import { expect, test } from 'vitest'
test('sayhell name:test to hello test', () => {
  expect(sayHello({name: 'test'})).toBe('hello test')
})