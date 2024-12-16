import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger>Product Details</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-semibold mb-1">Full Description</h4>
                  <p className="text-sm text-gray-600">{product.fullDescription}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Usage Instructions</h4>
                  <p className="text-sm text-gray-600">{product.usage}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Side Effects</h4>
                  <p className="text-sm text-gray-600">{product.sideEffects}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="text-lg font-bold mt-4">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};