class ShoppingSessionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :total_items, :cart_items, :when_created, :last_update

  has_many :cart_items
  has_one :user, serializer: ShoppingSessionUserSerializer
  
end
