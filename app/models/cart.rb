class Cart < ApplicationRecord


    def total_items
        self.cart_items.sum {|item| item.quantity}
    end

    

    def when_created
        date = self.created_at.to_s
        split_date = date[0..9].split("-").rotate(1).join("-")
    end

    def restock
        self.cart_items.map do |item|
            new_inventory = item.toy.inventory + item.quantity
            item.toy.update(inventory: new_inventory)
        end
    end
    
end
