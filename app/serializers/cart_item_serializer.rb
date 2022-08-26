class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :shopping_session_id, :toy_id, :quantity
end
