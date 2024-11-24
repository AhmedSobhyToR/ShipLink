export const PRODUCT_LIST_COLUMN = [
    {
      label: 'PRODUCT.ID',
      property : 'id'
    },
    {
      label: 'PRODUCT.NAME',
      property : 'name'
    },
    {
      label: 'CATEGORY.NAME',
      property : 'category',
      valueTransformation: (category: { name: string }) => category?.name,
    },
    {
      label: 'PRODUCT.PRICE',
      property : 'price'
    },
    {
      label: 'PRODUCT.DESCRIPTION',
      property : 'description'
    },
    {
      label: 'PRODUCT.STOCK',
      property : 'stock'
    }
  ]

export const Sizes = [10, 20, 30, 40,50]