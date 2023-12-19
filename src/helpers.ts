import { isValidElement } from 'react'

export function toArray<T>(items: T[] | T): T[] {
  return Array.isArray(items) ? items : [items]
}

export function isComponentOf<T extends Function>(
  Component: T,
  element: unknown,
): element is T {
  if (!isValidElement(element)) {
    return false
  }
  if (typeof element.type !== 'function') {
    return false
  }
  return element.type.name === Component.name
}
