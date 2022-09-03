class ShoppingSession < ApplicationRecord

    # validates that there is only one active session

    def total_price
        self.cart_items.sum {|item| item.quantity * item.toy.purchase_price}
    end

    def total_items
        self.cart_items.sum {|item| item.quantity}
    end

    belongs_to :user
    has_many :cart_items, dependent: :destroy
    has_many :toys, through: :cart_items, dependent: :destroy
end
