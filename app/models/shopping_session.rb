class ShoppingSession < ApplicationRecord

    # validates :status, uniqueness: true, if: :status_active?

    # def status_active?
    #     status == "active"
    # end

    def total_price
        self.cart_items.sum {|item| item.quantity * item.toy.purchase_price}
    end

    def total_items
        self.cart_items.sum {|item| item.quantity}
    end

    def last_update
        date = self.updated_at.to_s
        split_date = date[0..9].split("-").rotate(1).join("-")
        
    end

    belongs_to :user
    has_many :cart_items, dependent: :destroy
    has_many :toys, through: :cart_items, dependent: :destroy
end
