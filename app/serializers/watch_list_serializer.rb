class WatchListSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :toy_id

  belongs_to :toy
end
