import { api_domain } from './config'

let apiRoute = (suffix: string) => `${api_domain}/${suffix}`

export const loginApiRoute: string = apiRoute('auth/login')
export const profileApiRoute: string = apiRoute('auth/profile')
export const registerApiRoute: string = apiRoute('auth/register')
export const addressesApiRoute: string = apiRoute('auth/addresses')
export const changePasswordApiRoute: string = apiRoute('auth/change-password')

export const brandsApiRoute: string = apiRoute('data/brands')
export const brandsSearchApiRoute: string = apiRoute('data/brand/search')

export const productsApiRoute: string = apiRoute('data/products')
export const productsSearchApiRoute: string = apiRoute('data/product/search')

export const categoriesApiRoute: string = apiRoute('data/categories')
export const categoriesSearchApiRoute: string = apiRoute('data/category/search')
