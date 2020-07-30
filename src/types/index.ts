export interface IItem {
  id: number
  title: string
  image_url: string
}

export interface IPoint {
  id: number
  name: string
  street: string
  number: number
  city: string
  uf: string
  image_url: string
}

export interface IPointRepoCreateDTO {
  name: string
  street: string
  number: number
  city: string
  uf: string
  image_url: string
}

export interface IPointServiceStoreDTO {
  name: string
  street: string
  number: number
  city: string
  uf: string
  image: string
  items: string
}

export interface IPointServiceIndexDTO {
  uf: string
  city: string
}
