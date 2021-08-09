interface UserAddresses {
  address_1: string
  address_2: string
  created_at: string
  deleted_at: string | null
  house_number: string
  latitude: string
  longitude: string
  reference: string
  updated_at: string
  user_id: number
}

export interface UserInterface {
  created_at: string
  email: string
  email_verified_at: string | null | undefined
  id: number
  name: string
  last_name?: string
  cellphone?: string
  birthdate?: string
  updated_at: string
  image?: string
  addresses: UserAddresses[]
  avatar?: string
}

export interface ProductInterface {
  brand_id: number | null
  category_id: number
  created_at: string
  critical_stock: number
  current_stock: number
  deleted_at: string | null
  description: string
  enabled: boolean
  id: number
  images: [{ url: string | undefined }]
  name: string
  price: number
  resource_url: string
  updated_at: string
  weight_controlled_product: boolean
}
