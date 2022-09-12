class ShoppingSessionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :total_price, :total_items, :cart_items, :last_update

  has_many :cart_items
  
end
