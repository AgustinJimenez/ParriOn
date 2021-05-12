import { ProductInterface } from '../interfaces'
import { MaskService } from 'react-native-masked-text'
import numberFormat from '../utils/numberFormat'

class Product implements ProductInterface {
  constructor(attributes: ProductInterface) {
    this['brand_id'] = attributes['brand_id']
    this['category_id'] = attributes['category_id']
    this['created_at'] = attributes['created_at']
    this['critical_stock'] = attributes['critical_stock']
    this['current_stock'] = attributes['current_stock']
    this['deleted_at'] = attributes['deleted_at']
    this['description'] = attributes['description']
    this['enabled'] = attributes['enabled']
    this['id'] = attributes['id']
    this['images'] = attributes['images']
    this['name'] = attributes['name']
    this['price'] = attributes['price']
    this['resource_url'] = attributes['resource_url']
    this['updated_at'] = attributes['updated_at']
    this['weight_controlled_product'] = attributes['weight_controlled_product']
  }
  brand_id: number | null = 0
  category_id: number = 0
  created_at!: string
  critical_stock!: number
  current_stock!: number
  deleted_at!: string | null
  description!: string
  enabled: boolean = false
  id: number = 0
  images: [{ url: string | undefined }] = [{ url: undefined }]
  name!: string
  price: number = 0
  resource_url!: string
  updated_at!: string
  weight_controlled_product!: boolean

  public get image_url() {
    return this?.images?.[0]?.['url']
  }
  public get price_formated() {
    return numberFormat(+this.price)
  }
}

export default Product
