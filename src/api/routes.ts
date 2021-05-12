import { api_domain } from './config'

let apiRoute = (suffix: string) => `${api_domain}/${suffix}`

export const loginApiRoute: string = apiRoute('auth/login')
export const profileApiRoute: string = apiRoute('auth/profile')
export const registerApiRoute: string = apiRoute('auth/register')

export const brandsApiRoute: string = apiRoute('data/brands')
export const productsApiRoute: string = apiRoute('data/products')
export const categoriesApiRoute: string = apiRoute('data/categories')
