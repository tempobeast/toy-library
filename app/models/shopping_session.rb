class ShoppingSession < ApplicationRecord

    def total
        self.cart_items.sum {|item| item.quantity * item.toy.purchase_price}
    end

    belongs_to :user
    has_many :cart_items
    has_many :toys, through: :cart_items
end
