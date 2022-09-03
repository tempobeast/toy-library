class ShoppingSessionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :total_price, :total_items

  has_many :cart_items
end
