class PreviousOrder < Cart
    self.table_name = 'previous_orders'
    
    def order_number
        self.cart_items[0].shopping_session_id
    end

    def format_date(status_change_date)
        status_change_date[0..9].split("-").rotate(1).join("-")
    end


    belongs_to :user
    has_many :cart_items, dependent: :destroy
    has_many :toys, through: :cart_items, dependent: :destroy
end
