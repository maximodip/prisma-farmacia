import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SimpleProduct {
  id: number
  name: string
  price: string
}

interface ProductSelectProps {
  index: number
  products: SimpleProduct[]
  value: string
  onChange: (index: number, field: string, value: string) => void
}

export function ProductSelect({ index, products, value, onChange }: ProductSelectProps) {
  return (
    <Select
      required
      value={value}
      onValueChange={(newValue) => onChange(index, 'productId', newValue)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Product" />
      </SelectTrigger>
      <SelectContent>
        {products.map((product) => (
          <SelectItem key={product.id} value={product.id.toString()}>
            {product.name} (${product.price})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// Usage Example:
{
  /* <ProductSelect
    index={index}
    products={products}
    value={item.productId}
    onChange={handleItemChange}
  /> */
}
