class PreviousOrderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :total_items, :cart_items, :when_created, :order_number, :ship_date, :return_date, :restock_date

  has_many :cart_items
  has_one :user, serializer: ShoppingSessionUserSerializer
end
