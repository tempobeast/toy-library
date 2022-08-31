class CartItem < ApplicationRecord

    def update_inventory
        new_inventory = self.toy.inventory - self.quantity
        self.toy.update(inventory: new_inventory)
    end

    belongs_to :shopping_session
    belongs_to :toy
end
