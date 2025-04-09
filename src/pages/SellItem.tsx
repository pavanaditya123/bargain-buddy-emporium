
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProduct } from "@/services/api";
import { Category } from "@/types";
import { useToast } from "@/hooks/use-toast";

const SellItem = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  
  const categories: Category[] = [
    "Clothing", "Accessories", "Home Goods", "Electronics", "Books", 
    "Vintage", "Collectibles", "Art", "Other"
  ];
  
  const conditions = ["New", "Like New", "Good", "Fair", "Used"];
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // In a real app, we would upload image to storage first
      const productData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as Category,
        condition: formData.get("condition") as "New" | "Like New" | "Good" | "Fair" | "Used",
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1613338027484-57b8061f3d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=646&q=80"
      };
      
      const newProduct = await createProduct(productData);
      
      toast({
        title: "Item Listed Successfully!",
        description: "Your item is now available for sale.",
      });
      
      // In a real app, we would redirect to the new product page
      // or to a seller dashboard
      
    } catch (error) {
      console.error("Failed to list item:", error);
      toast({
        title: "Error",
        description: "Failed to list your item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we would handle file upload to storage
    // For now, let's just use a placeholder or URL input
    const imageUrl = e.target.value;
    setImageUrl(imageUrl);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">List an Item for Sale</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Info */}
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" name="name" placeholder="Enter item name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe your item in detail..." 
                  rows={5}
                  required
                />
              </div>
            </div>
            
            {/* Category and Condition */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required defaultValue="Clothing">
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select name="condition" required defaultValue="Good">
                <SelectTrigger>
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                step="0.01" 
                min="0.01" 
                placeholder="0.00" 
                required 
              />
            </div>
            
            {/* Image URL (in a real app, this would be a file upload) */}
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                type="text" 
                placeholder="Enter image URL" 
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">Enter a URL to an image of your item</p>
            </div>
            
            {/* Image Preview */}
            <div className="md:col-span-2">
              {imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <img 
                    src={imageUrl} 
                    alt="Item preview" 
                    className="max-h-60 rounded-lg object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1613338027484-57b8061f3d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=646&q=80";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <Button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Listing Item..." : "List Item for Sale"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellItem;
