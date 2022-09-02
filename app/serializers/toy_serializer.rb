class ToySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :sku, :purchase_price, :inventory, :age_range, :img_url

  has_many :watch_lists
end
