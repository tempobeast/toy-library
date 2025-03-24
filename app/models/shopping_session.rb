class ShoppingSession < Cart
   

    def last_update
        date = self.updated_at.to_s
        split_date = date[0..9].split("-").rotate(1).join("-")
    end
    
    belongs_to :user
    has_many :cart_items
    has_many :toys, through: :cart_items, dependent: :destroy
    
end
