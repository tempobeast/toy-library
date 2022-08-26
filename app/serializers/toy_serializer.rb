class ToySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :sku, :purchase_price, :inventory, :age_range
end
