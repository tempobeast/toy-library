class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :shopping_session_id, :quantity, :toy

  belongs_to :shopping_session
  belongs_to :toy
end
